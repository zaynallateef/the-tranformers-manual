import { describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import App from '../src/App'
import { glossary, lessons } from '../src/content'
import { glossaryAr, lessonsAr } from '../src/content.ar'
import { applyReadingPreferences, readingLink, readingPreferences } from '../src/reading'
import type { Language } from '../src/reading'

describe.each([
  ['en', lessons, glossary],
  ['ar', lessonsAr, glossaryAr],
] as const)('%s reading edition', (language, chaptersData, termsData) => {
  it('presents every chapter and its complete explanation without opening panels', () => {
    render(<App language={language} />)
    const chapters = screen.getAllByRole('article')
    expect(chapters).toHaveLength(10)
    chaptersData.forEach((lesson, index) => {
      const chapter = within(chapters[index])
      expect(chapter.getByRole('heading', { name: lesson.title })).toBeTruthy()
      for (const text of [lesson.intro, lesson.analogy, ...lesson.steps.map(step => step.text), lesson.technical, lesson.takeaway]) {
        expect(chapter.getByText((_, element) => element?.tagName === 'P' && element.textContent === text)).toBeTruthy()
      }
    })
  })

  it('has no app controls, hidden reading panels, forms, or stored progress', () => {
    const { container } = render(<App language={language} />)
    expect(container.querySelectorAll('button, input, textarea, select, form, dialog, details, [role="tab"], [role="tabpanel"], [hidden]')).toHaveLength(0)
    expect(localStorage.length).toBe(0)
  })

  it('preserves the reference, left-to-right calculations, and complete glossary', () => {
    const { container } = render(<App language={language} />)
    const image = container.querySelector<HTMLImageElement>('img[src="/attention-research.png"]')!
    expect(image.alt.length).toBeGreaterThan(20)
    expect(screen.getByText('softmax([2, 1]) ≈ [0.731, 0.269]').getAttribute('dir')).toBe('ltr')
    expect(screen.getByText('≈ [7.31, 2.69]').getAttribute('dir')).toBe('ltr')
    const section = document.getElementById('glossary')!
    expect(within(section).getAllByRole('term')).toHaveLength(termsData.length)
    termsData.forEach(([term, definition]) => {
      expect(within(section).getByText(term, { selector: 'dt' }).getAttribute('dir')).toBe('ltr')
      expect(within(section).getByText((_, element) => element?.tagName === 'DD' && element.textContent === definition)).toBeTruthy()
    })
  })

  it('has unique IDs and valid destinations for all chapter links', () => {
    const { container } = render(<App language={language} />)
    const ids = Array.from(container.querySelectorAll('[id]')).map(element => element.id)
    expect(new Set(ids).size).toBe(ids.length)
    screen.getAllByRole('link').forEach(link => {
      const href = link.getAttribute('href')!
      if (href.startsWith('#')) expect(document.getElementById(href.slice(1))).toBeTruthy()
    })
  })

  it('keeps the language and theme choices independent through ordinary links', () => {
    render(<App language={language} theme="dark" />)
    const preferences = screen.getByRole('navigation', { name: language === 'ar' ? 'لغة القراءة' : 'Reading language' })
    expect(within(preferences).getByRole('link', { name: 'EN' }).getAttribute('href')).toBe('?lang=en&theme=dark')
    const themeNav = screen.getByRole('navigation', { name: language === 'ar' ? 'مظهر الصفحة' : 'Color theme' })
    expect(within(themeNav).getByRole('link', { name: language === 'ar' ? 'فاتح' : 'Light' }).getAttribute('href')).toBe('?lang=' + language + '&theme=light')
  })
})

describe('reading preferences and mixed-direction text', () => {
  it('defaults to Arabic and light, regardless of unsupported query values', () => {
    expect(readingPreferences()).toEqual({ language: 'ar', theme: 'light' })
    expect(readingPreferences('?lang=unknown&theme=unknown')).toEqual({ language: 'ar', theme: 'light' })
    expect(readingPreferences('?lang=en&theme=dark')).toEqual({ language: 'en', theme: 'dark' })
    expect(readingLink('ar', 'light')).toBe('?lang=ar&theme=light')
  })

  it.each(['ar', 'en'] as Language[])('sets the document language, direction, and explicit theme for %s', language => {
    applyReadingPreferences(language, 'light')
    expect(document.documentElement.lang).toBe(language)
    expect(document.documentElement.dir).toBe(language === 'ar' ? 'rtl' : 'ltr')
    expect(document.documentElement.dataset.theme).toBe('light')
  })

  it('isolates important English terms inside the Arabic explanation', () => {
    const { container } = render(<App language="ar" />)
    expect(container.querySelector('.site')?.getAttribute('dir')).toBe('rtl')
    const keywords = Array.from(container.querySelectorAll('bdi[lang="en"][dir="ltr"]')).map(node => node.textContent)
    for (const term of ['Attention', 'Tokens', 'Embeddings', 'Encoder', 'Decoder']) expect(keywords).toContain(term)
  })
})
