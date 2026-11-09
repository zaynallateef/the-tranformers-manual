import type { ReactNode } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, Asterisk, Code, Lightbulb } from '@phosphor-icons/react'
import { architecture, glossary, lessons } from './content'
import { architectureAr, glossaryAr, lessonsAr } from './content.ar'
import { readingLink } from './reading'
import type { Language, Theme } from './reading'

const chapterId = (index: number) => 'chapter-' + (index + 1)
const translate = (language: Language) => (en: string, ar: string) => language === 'ar' ? ar : en

/** Isolate English technical terms so mixed Arabic text retains a readable order. */
export function TechnicalText({ children }: { children: string }) {
  return <>{children.split(/([A-Za-z][A-Za-z0-9]*(?:[ \t/&-]+[A-Za-z0-9]+)*)/g).map((part, i) =>
    /^[A-Za-z]/.test(part) ? <bdi className="english-term" lang="en" dir="ltr" key={i}>{part}</bdi> : part,
  )}</>
}

function Label({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>
}

function ConnectionIllustration({ language }: { language: Language }) {
  const t = translate(language)
  return <figure className="connection-figure">
    <div className="window-bar" dir="ltr"><span className="mono">context.txt</span><span className="mono">THE TRANSFORMERS MANUAL</span></div>
    <div className="connection-paper">
      <p className="diagram-title">{t('A pronoun needs its context.', 'لفهم الضمير، نرجع إلى السياق.')}</p>
      <div className="sentence-diagram" dir="ltr">
        <svg viewBox="0 0 600 170" aria-hidden="true"><path d="M150 148 C150 0 350 0 350 148" /><path className="secondary-connection" d="M350 148 C350 45 550 45 550 148" /></svg>
        <span className="connection-caption" dir="auto">{t('“It” refers back to “cat”', 'الضمير It يعود إلى cat')}</span>
        <div className="sentence-words" lang="en">{['The', 'cat', 'slept.', 'It', 'was', 'tired.'].map((word, i) => <span className={i === 1 || i === 3 ? 'word-emphasis' : ''} key={i}>{word}</span>)}</div>
      </div>
      <p className="connection-explanation"><TechnicalText>{t('The earlier “cat” helps interpret “It”.', 'تساعد كلمة cat السابقة على تفسير الضمير It، أي «هو» هنا.')}</TechnicalText></p>
      <figcaption>{t('An illustration of context, not measured attention from a model.', 'توضيح لفكرة السياق، وليس قياسا فعليا لأوزان Attention في نموذج.')}</figcaption>
    </div>
  </figure>
}

function Flow({ items, caption }: { items: string[]; caption?: string }) {
  return <figure className="flow-figure"><div className="flow-items">{items.map((item, i) => <div className="flow-part" key={item}><span className={'flow-box tone-' + i % 4}><TechnicalText>{item}</TechnicalText></span>{i < items.length - 1 && <ArrowRight size={20} aria-hidden="true" />}</div>)}</div>{caption && <figcaption><TechnicalText>{caption}</TechnicalText></figcaption>}</figure>
}

function ReferenceDiagram({ language }: { language: Language }) {
  const t = translate(language)
  const blocks = language === 'ar' ? architectureAr : architecture
  return <section className="reference-section" aria-labelledby="reference-heading">
    <h4 id="reference-heading">{t('Read from the bottom up.', 'اقرأ المخطط من الأسفل إلى الأعلى.')}</h4>
    <p><TechnicalText>{t('The encoder reads the source. The decoder builds the output, using the source information carried by the long connecting arrow.', 'تقرأ مجموعة Encoder المصدر. وتبني مجموعة Decoder المخرج، مستعينة بمعلومات المصدر التي ينقلها السهم الطويل بينهما.')}</TechnicalText></p>
    <figure className="original-diagram"><img src="/attention-research.png" width="727" height="1024" loading="lazy" alt={t('Original transformer architecture: source embeddings and positions enter the encoder; earlier target tokens enter the decoder; encoder outputs feed decoder cross-attention; linear and softmax produce output probabilities.', 'المخطط الأصلي لـ Transformer: تدخل Embeddings ومعلومات الموقع إلى Encoder، وتدخل الأجزاء السابقة من الهدف إلى Decoder، ثم تصل معلومات Encoder إلى Cross-Attention، وتنتج Linear وSoftmax احتمالات المخرج.')} /><figcaption><TechnicalText>{t('The supplied reference follows Figure 1 in Vaswani et al., “Attention Is All You Need” (2017). N× marks repeated blocks.', 'يتبع المرجع المرفق الشكل الأول في ورقة Attention Is All You Need، لفريق Vaswani وآخرين عام 2017. يشير N× إلى تكرار Blocks.')}</TechnicalText></figcaption></figure>
    <div className="architecture-legend">{blocks.map(item => <div className="architecture-entry" key={item.id}><span className={'block-swatch ' + item.color} aria-hidden="true" /><div><h4><TechnicalText>{item.title}</TechnicalText></h4><p className="block-simple"><TechnicalText>{item.simple}</TechnicalText></p><p><TechnicalText>{item.detail}</TechnicalText></p></div></div>)}</div>
    <div className="variant-comparison"><h4>{t('Three common arrangements', 'ثلاثة ترتيبات شائعة')}</h4>{[
      ['Encoder only', t('Build input representations. BERT is an example.', 'يبني تمثيلات للمدخلات. مثال: BERT.'), 'lilac'],
      ['Decoder only', t('Predict continuations with causal attention. GPT-2 is an example.', 'يتوقع استمرار النص باستخدام Causal Attention. مثال: GPT-2.'), 'lime'],
      ['Encoder + decoder', t('Turn a source sequence into a target sequence. T5 is an example.', 'يحوّل سلسلة مصدر إلى سلسلة هدف. مثال: T5.'), 'peach'],
    ].map(([title, text, color]) => <div key={title}><span className={'variant-label ' + color} dir="ltr" lang="en">{title}</span><p><TechnicalText>{text}</TechnicalText></p></div>)}</div>
  </section>
}

function WorkedExample({ index, language }: { index: number; language: Language }) {
  const t = translate(language)
  switch (index) {
    case 0:
      return <div className="context-example"><h4>{t('One word, two contexts', 'كلمة واحدة، ومعنيان مختلفان')}</h4><div><p lang="en" dir="ltr">“We sat beside the river <strong>bank.</strong>”</p><span>{t('the edge of a river', 'هنا تعني ضفة النهر.')}</span></div><div><p lang="en" dir="ltr">“I deposited money at the <strong>bank.</strong>”</p><span>{t('a financial institution', 'هنا تعني مؤسسة مالية.')}</span></div><p className="figure-note"><TechnicalText>{t('Surrounding words help the model build a different representation of “bank” in each sentence.', 'تساعد الكلمات المحيطة على بناء تمثيل مختلف لكلمة bank في كل جملة.')}</TechnicalText></p></div>
    case 1:
      return <figure className="number-example"><h4>{t('From a sentence to a vector', 'من الجملة إلى Vector')}</h4><dl><div><dt>{t('Text', 'النص')}</dt><dd dir="ltr" lang="en">“A cat.”</dd></div><div><dt>Tokens</dt><dd dir="ltr"><span className="token lilac">A</span><span className="token lime">cat</span><span className="token peach">.</span></dd></div><div><dt>Token IDs</dt><dd className="mono" dir="ltr">[12, 47, 3]</dd></div><div><dt><TechnicalText>{t('Vector for “cat”', 'Vector للجزء cat')}</TechnicalText></dt><dd className="mono" dir="ltr">[0.2, -0.4, 0.8]</dd></div></dl><figcaption><TechnicalText>{t('Illustrative IDs and coordinates, not a real vocabulary. Real tokenizers may split words further, and vectors usually have many more coordinates.', 'هذه معرّفات وإحداثيات للتوضيح فقط. قد يقسّم Tokenizer الحقيقي الكلمات إلى أجزاء أصغر، وتحتوي Vectors عادة على أبعاد أكثر بكثير.')}</TechnicalText></figcaption></figure>
    case 2:
      return <div className="order-example"><h4>{t('Same words. Different story.', 'الكلمات نفسها، لكن الحدث مختلف.')}</h4><p lang="en" dir="ltr"><span className="lilac">The dog</span> chased <span className="peach">the cat.</span></p><p lang="en" dir="ltr"><span className="peach">The cat</span> chased <span className="lilac">the dog.</span></p><p className="figure-note">{t('Position information makes order available; it does not give each position a fixed grammatical role.', 'في الأولى يطارد الكلب القط، وفي الثانية يطارد القط الكلب. تجعل معلومات الموقع ترتيب الكلمات متاحا، لكنها لا تعطي كل موضع وظيفة نحوية ثابتة.')}</p></div>
    case 3:
      return <figure className="attention-example"><h4>{t('Attention, with tiny numbers', 'حساب Attention بأعداد صغيرة')}</h4><p><TechnicalText>{t('Suppose one query has two keys available. Their already-scaled scores are 2 and 1.', 'لنفترض أن لدى Query واحد قيمتي Key متاحتين، وأن درجتي المقارنة بعد ضبط المقياس هما 2 و1.')}</TechnicalText></p><div className="math-steps"><div><h5>{t('Convert scores to weights', 'تحويل الدرجات إلى أوزان')}</h5><code dir="ltr">softmax([2, 1]) ≈ [0.731, 0.269]</code><p><TechnicalText>{t('e² / (e² + e¹) ≈ 0.731. The other weight is about 0.269. The constant e is approximately 2.718.', 'يكون الوزن الأول نحو 0.731، والثاني نحو 0.269، ومجموعهما واحد. الثابت الرياضي e يساوي تقريبا 2.718.')}</TechnicalText></p><code dir="ltr">e² / (e² + e¹) ≈ 0.731</code></div><div><h5>{t('Combine the value vectors', 'دمج Value vectors')}</h5><code dir="ltr">0.731 × [10, 0] + 0.269 × [0, 10]</code><code dir="ltr">≈ [7.31, 2.69]</code><p>{t('The first value contributes more. The result is an information mixture, not a chosen word.', 'تساهم القيمة الأولى أكثر من الثانية. الناتج مزيج عددي للمعلومات، وليس كلمة اختارها النموذج.')}</p></div></div><figcaption>{t('A teaching example with two options. Real attention processes many vectors in parallel, often with masks.', 'مثال تعليمي بخيارين فقط. تتعامل العملية الحقيقية مع متجهات كثيرة بالتوازي، وقد تستخدم أقنعة للحجب.')}</figcaption></figure>
    case 4:
      return <div className="heads-example"><div className="parallel-heads" dir="ltr"><span className="lilac">Head A: Q, K, V</span><span className="peach">Head B: Q, K, V</span></div><ArrowDown className="merge-arrow" size={24} aria-hidden="true" /><Flow items={['Concatenation', 'Output projection']} caption={t('Heads compute in parallel. Their outputs are joined, then projected. Their patterns are learned; jobs are not manually assigned.', 'تعمل Heads بالتوازي. ثم تُوصل نتائجها عبر Concatenation وتُدمج عبر Projection. تتعلم الرؤوس أنماطها؛ لا نعيّن لها وظائف محددة يدويا.')} /></div>
    case 5:
      return <Flow items={['Attention', 'Add + Norm', 'Feed Forward', 'Add + Norm']} caption={t('An original encoder block, in computation order. The whole block repeats. Many later models normalize before sublayers instead.', 'ترتيب المعالجة داخل Encoder Block الأصلي. تتكرر المجموعة كاملة. تستخدم نماذج لاحقة Normalization قبل Sublayers بدلا من بعدها.')} />
    case 6:
      return <ReferenceDiagram language={language} />
    case 7:
      return <div className="training-example"><Flow items={language === 'ar' ? ['توقع Token', 'حساب Loss', 'حساب Gradients', 'تحديث Parameters'] : ['Predict a token', 'Measure the loss', 'Calculate gradients', 'Update parameters']} caption={t('Repeat over training batches. Evaluate on separate data to check generalization.', 'تتكرر الدورة على Training Batches. ويُقيّم النموذج على بيانات منفصلة لفحص قدرته على التعميم.')} /><div className="training-pair"><p><span>{t('Available prefix', 'الأجزاء المتاحة')}</span><bdi dir="ltr" lang="en">“The sky is”</bdi></p><ArrowRight size={22} aria-hidden="true" /><p><span>{t('Target next token', 'الجزء التالي المطلوب')}</span><bdi dir="ltr" lang="en">“blue”</bdi></p></div><p className="figure-note"><TechnicalText>{t('If the model assigns low probability to “blue” here, the loss increases. Training updates parameters to improve this prediction objective.', 'إذا أعطى النموذج blue احتمالا منخفضا في هذا المثال، يزداد Loss. يعدّل Training قيم Parameters لتحسين هدف التوقع.')}</TechnicalText></p></div>
    case 8:
      return <figure className="generation-example"><h4>{t('Building a sentence, one token at a time', 'بناء جملة، جزءا بعد آخر')}</h4><div className="generation-lines">{[
        [t('Prefix', 'المدخل المتاح'), 'The cat'],
        [t('Next token', 'Token التالي'), 'sat'],
        [t('New prefix', 'المدخل المحدّث'), 'The cat sat'],
        [t('Next token', 'Token التالي'), 'on'],
        [t('Continue', 'بعد التكرار'), 'The cat sat on the mat.'],
      ].map(([label, value], i) => <p key={i}><span><TechnicalText>{label}</TechnicalText></span><bdi dir="ltr" lang="en" className={i === 1 ? 'lilac' : i === 3 ? 'lime' : ''}>{value}</bdi></p>)}</div><figcaption><TechnicalText>{t('An illustrative sequence shown all at once. Each generation step calculates a new vocabulary distribution. Real tokens may be smaller than the words shown.', 'التسلسل كله معروض هنا للتوضيح. تحسب كل خطوة Generation توزيعا جديدا على Vocabulary. وقد تكون Tokens الحقيقية أصغر من الكلمات الظاهرة.')}</TechnicalText></figcaption></figure>
    default:
      return <div className="limits-example"><div><h4>{t('Useful for patterns', 'مفيد لتعلّم الأنماط')}</h4><p>{t('Drafting, translation, classification, and analyzing sequences, when the model is trained for the task.', 'كتابة المسودات والترجمة والتصنيف وتحليل السلاسل، عندما يكون النموذج مدرّبا للمهمة.')}</p></div><div><h4>{t('Still needs evidence', 'الإجابة تحتاج إلى دليل')}</h4><p>{t('A fluent answer can be wrong. Verify important claims with independent, reliable sources.', 'قد تكون الإجابة طليقة وخاطئة. تحقق من الادعاءات المهمة باستخدام مصادر مستقلة وموثوقة.')}</p></div></div>
  }
}

function Chapter({ index, language }: { index: number; language: Language }) {
  const t = translate(language)
  const lesson = (language === 'ar' ? lessonsAr : lessons)[index]
  return <article className="chapter" id={chapterId(index)} aria-labelledby={'heading-' + (index + 1)}>
    <header className="chapter-heading"><span className={'chapter-number ' + lesson.color} aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><div><h2 id={'heading-' + (index + 1)}><TechnicalText>{lesson.title}</TechnicalText></h2><p><TechnicalText>{lesson.subtitle}</TechnicalText></p></div></header>
    <p className="chapter-intro"><TechnicalText>{lesson.intro}</TechnicalText></p>
    <div className="analogy"><Lightbulb size={25} aria-hidden="true" /><div><h3>{t('Think of it this way', 'لتقريب الفكرة')}</h3><p><TechnicalText>{lesson.analogy}</TechnicalText></p></div></div>
    <div className="explanation-steps">{lesson.steps.map((step, i) => <section key={step.title}><span className="step-index mono" aria-hidden="true">{i + 1}</span><div><h3><TechnicalText>{step.title}</TechnicalText></h3><p><TechnicalText>{step.text}</TechnicalText></p></div></section>)}</div>
    <WorkedExample index={index} language={language} />
    {index === 3 && <div className="attention-formula"><p>{t('The full scaled dot-product attention formula', 'الصيغة الكاملة لحساب Scaled Dot-Product Attention')}</p><code dir="ltr">Attention(Q, K, V) = softmax(QKᵀ / √dₖ)V</code></div>}
    <section className="technical-note"><h3><Code size={19} aria-hidden="true" />{t('The technical terms, explained', 'المصطلحات التقنية، ببساطة')}</h3><p><TechnicalText>{lesson.technical}</TechnicalText></p></section>
    <div className="takeaway"><div><h3>{t('The thing to remember', 'الفكرة التي نحتفظ بها')}</h3><p><TechnicalText>{lesson.takeaway}</TechnicalText></p></div></div>
  </article>
}

export default function App({ language = 'ar', theme = 'light' }: { language?: Language; theme?: Theme }) {
  const t = translate(language)
  const chapters = language === 'ar' ? lessonsAr : lessons
  const terms = language === 'ar' ? glossaryAr : glossary
  return <div className="site" lang={language} dir={language === 'ar' ? 'rtl' : 'ltr'} data-theme={theme}>
    <a className="skip-link" href="#guide">{t('Skip to the guide', 'انتقل إلى الشرح')}</a>
    <header className="site-header"><a href="#top" className="brand" aria-label="The Transformers manual home" dir="ltr"><span className="brand-mark"><Asterisk size={29} weight="bold" /></span><span className="brand-wordmark"><span>The Transformers</span><span className="brand-light"> manual</span></span></a><nav className="main-navigation" aria-label={t('Main navigation', 'التنقل الرئيسي')}><a href="#guide">{t('The guide', 'الشرح')}</a><a href="#chapter-7">{t('Architecture', 'المخطط')}</a><a href="#glossary">{t('Glossary', 'المصطلحات')}</a><a href="#sources">{t('Sources', 'المصادر')}</a></nav><div className="reading-preferences"><nav aria-label={t('Reading language', 'لغة القراءة')}><a href={readingLink('ar', theme)} lang="ar" aria-current={language === 'ar' ? 'page' : undefined}>العربية</a><a href={readingLink('en', theme)} lang="en" dir="ltr" aria-current={language === 'en' ? 'page' : undefined}>EN</a></nav><nav aria-label={t('Color theme', 'مظهر الصفحة')}><a href={readingLink(language, 'light')} aria-current={theme === 'light' ? 'page' : undefined}>{t('Light', 'فاتح')}</a><a href={readingLink(language, 'dark')} aria-current={theme === 'dark' ? 'page' : undefined}>{t('Dark', 'داكن')}</a></nav></div></header>
    <main id="top">
      <section className="hero page-width"><div className="hero-copy"><Label>{t('A VISUAL GUIDE TO AI', 'دليل لفهم الذكاء الاصطناعي')}</Label><h1><bdi dir="ltr" lang="en">Transformers,</bdi><br /><span>{t('explained.', 'ببساطة، من الداخل.')}</span></h1><p><TechnicalText>{t('How text becomes numbers, how attention connects them, and how a model learns to generate a sentence. Ten chapters, with worked examples.', 'كيف يتحول النص إلى أرقام؟ وكيف تربطها Attention؟ وكيف يتعلم النموذج توليد جملة؟ عشرة فصول تشرح المسار كاملا، مع أمثلة وحساب مبسّط.')}</TechnicalText></p><a className="reading-link" href="#guide">{t('Read the guide', 'ابدأ القراءة')}<ArrowDown size={20} /></a></div><div className="hero-art"><span className="context-sticker mono" dir="ltr">WORDS + CONTEXT</span><ConnectionIllustration language={language} /></div></section>
      <nav className="topic-strip" aria-label={t('Main topics', 'المواضيع الأساسية')}><div className="page-width"><a href="#chapter-2" dir="ltr">Tokens & Embeddings</a><ArrowRight size={18} aria-hidden="true" /><a href="#chapter-4" dir="ltr">Attention</a><ArrowRight size={18} aria-hidden="true" /><a href="#chapter-8" dir="ltr">Training & Generation</a></div></nav>
      <section className="big-picture page-width"><div><h2>{t('Start with context.', 'نبدأ من السياق.')}</h2><p className="intro-side-note">{t('No coding background needed.', 'لا تحتاج إلى خلفية في البرمجة.')}</p></div><div><p className="lead"><TechnicalText>{t('A transformer learns relationships between pieces of information.', 'يتعلم Transformer العلاقات بين أجزاء المعلومات.')}</TechnicalText></p><p><TechnicalText>{t('For text, the journey starts with tokens. The model turns them into numbers, supplies position information, combines context through attention, and transforms the results into predictions.', 'يبدأ النص بأجزاء اسمها Tokens. يحولها النموذج إلى أعداد، ويزوّدها بمعلومات الموقع، ويدمج السياق عبر Attention، ثم يحول النتائج إلى توقعات.')}</TechnicalText></p><p>{t('Each chapter keeps the analogy, the explanation, and the example together. Technical terms are defined as they appear, with a glossary at the end.', 'يجمع كل فصل التشبيه والشرح والمثال في مكان واحد. تبقى المصطلحات الأساسية بالإنجليزية، مع تفسيرها بالعربية وقاموس في نهاية الدليل.')}</p></div></section>
      <div className="overview page-width"><Flow items={['Text', 'Tokens + Embeddings', 'Position + Transformer Blocks', 'Scores + Probabilities']} caption={t('A simplified overview of a text-generation model. Input and output arrangements depend on the architecture and task.', 'نظرة مبسطة إلى نموذج لتوليد النصوص. تختلف ترتيبات المدخلات والمخرجات بحسب Architecture والمهمة.')} /></div>
      <div className="reading-layout page-width" id="guide"><aside className="contents"><nav aria-label={t('Guide chapters', 'فصول الدليل')}><h2>{t('In this guide', 'محتويات الدليل')}</h2><ol>{chapters.map((lesson, index) => <li key={lesson.title}><a href={'#' + chapterId(index)}><span className="mono" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><span className="contents-title"><TechnicalText>{lesson.title}</TechnicalText></span></a></li>)}</ol><a className="contents-extra" href="#glossary">{t('The glossary', 'قاموس المصطلحات')}<ArrowRight size={15} /></a></nav></aside><div className="chapters">{chapters.map((lesson, index) => <Chapter key={lesson.title} index={index} language={language} />)}</div></div>
      <section className="recap-section"><div className="page-width"><h2>{t('Follow one sentence through the model.', 'نتتبع جملة واحدة داخل النموذج.')}</h2><p className="recap-intro"><TechnicalText>{t('A decoder-only model receives “The cat”. Here is the complete generation loop.', 'يستقبل نموذج Decoder-only عبارة The cat. هذه دورة التوليد كاملة.')}</TechnicalText></p><ol className="recap-list">{[
        [t('Split the prompt', 'تقسيم المدخل'), t('The tokenizer converts the prompt into vocabulary pieces and looks up their IDs.', 'يقسم Tokenizer النص إلى أجزاء من Vocabulary ويسترجع Token IDs.')],
        [t('Build starting vectors', 'تجهيز التمثيلات'), t('Retrieve embeddings and supply position information through the model’s chosen mechanism.', 'يسترجع النموذج Embeddings ويوفر معلومات الموقع عبر الآلية التي يستخدمها.')],
        [t('Process the blocks', 'المعالجة داخل Blocks'), t('Causal multi-head attention combines available context. Feed-forward networks transform it. Residual connections and normalization support information flow.', 'تمزج Causal Multi-Head Attention السياق المتاح، وتحوله Feed-Forward Networks، وتساعد Residual Connections وNormalization على تدفق المعلومات.')],
        [t('Score the next tokens', 'حساب احتمالات الجزء التالي'), t('Project the relevant final representation into vocabulary logits, then convert them into probabilities.', 'يحوّل النموذج التمثيل النهائي المناسب إلى Logits على Vocabulary، ثم إلى احتمالات.')],
        [t('Choose and continue', 'الاختيار ثم التكرار'), t('A decoding method picks a token, perhaps “sat”. The prefix becomes “The cat sat”. Repeat until a stopping condition is met.', 'تختار طريقة Decoding جزءا مثل sat، فيصبح المدخل The cat sat. وتتكرر الدورة حتى يتحقق شرط التوقف.')],
      ].map(([title, text]) => <li key={title}><h3>{title}</h3><p><TechnicalText>{text}</TechnicalText></p></li>)}</ol><p className="recap-note"><TechnicalText>{t('During ordinary generation, learned parameters stay fixed. The changing context changes the predictions.', 'في Generation العادي تبقى Parameters ثابتة. الذي يتغير هو السياق، فتتغير التوقعات.')}</TechnicalText></p></div></section>
      <section className="glossary-section page-width" id="glossary"><h2>{t('The terms, in plain language.', 'المصطلح بالإنجليزية، والمعنى بالعربية.')}</h2><p className="section-intro">{t('Definitions for the 28 terms used throughout the guide.', 'تفسيرات للمصطلحات الثمانية والعشرين المستخدمة في الدليل.')}</p><dl className="glossary-list">{terms.map(([term, definition]) => <div key={term}><dt dir="ltr" lang="en">{term}</dt><dd><TechnicalText>{definition}</TechnicalText></dd></div>)}</dl></section>
      <section className="sources-section page-width" id="sources"><div><h2>{t('Read the original sources.', 'للقراءة من المصادر الأصلية.')}</h2><p>{t('The original research paper and further explanations from Hugging Face’s course.', 'الورقة البحثية الأصلية، وشرح إضافي من دورة Hugging Face.')}</p></div><div className="source-links">{[
        ['https://arxiv.org/abs/1706.03762', 'Attention Is All You Need', t('Vaswani et al. (2017), the original paper', 'ورقة Vaswani وآخرين، 2017')],
        ['https://huggingface.co/learn/llm-course/chapter1/4', 'How do Transformers work?', t('Hugging Face’s LLM course', 'دورة Hugging Face حول LLMs')],
        ['https://huggingface.co/learn/llm-course/chapter2/4', 'Tokenizers', t('Word, subword, and character approaches', 'تقسيم النص إلى كلمات وأجزاء وحروف')],
      ].map(([href, title, subtitle]) => <a href={href} target="_blank" rel="noreferrer" key={href}><span><strong lang="en" dir="ltr">{title}</strong><small><TechnicalText>{subtitle}</TechnicalText></small></span><ArrowUpRight size={23} /></a>)}</div></section>
    </main>
    <footer className="site-footer"><div className="page-width"><a className="brand" href="#top" dir="ltr"><span className="brand-mark"><Asterisk size={29} weight="bold" /></span><span className="brand-wordmark"><span>The Transformers</span><span className="brand-light"> manual</span></span></a><p>{t('A visual guide to understanding transformers.', 'دليل بصري لفهم Transformers، من النص إلى التوقع.')}</p><a href="#top">{t('Back to the beginning', 'العودة إلى البداية')}<ArrowUpRight size={18} /></a></div><p className="footer-note page-width">{t('Educational explanations. Numerical examples are illustrative.', 'شرح تعليمي. الأمثلة العددية للتوضيح فقط.')}</p></footer>
  </div>
}
