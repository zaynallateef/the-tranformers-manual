export type Lesson = {
  title: string; subtitle: string; category: string; color: string;
  intro: string; analogy: string; steps: { title: string; text: string }[];
  technical: string; takeaway: string;
}

export const lessons: Lesson[] = [
  {
    title: 'Meet the transformer', subtitle: 'The big idea, without the big words.', category: 'THE BIG PICTURE', color: 'lilac',
    intro: 'A transformer is a design for a neural network: a computer system that learns patterns from examples. It turns a sequence, such as a sentence, into useful representations. Depending on how it is built and trained, it can classify text, translate a sentence, or predict what comes next.',
    analogy: 'Imagine reading a group chat. You connect a reply to an earlier message, notice who “she” refers to, and use the whole conversation to interpret a joke. A transformer uses a mathematical mechanism called attention to combine information from relevant parts of its input. The comparison helps, but the model does not read or experience the world like a person.',
    steps: [
      { title: 'Start with examples', text: 'Machine learning means adjusting a computer model using data instead of writing a separate rule for every situation. A neural network is a collection of connected mathematical operations with adjustable numbers called parameters.' },
      { title: 'Give each piece some context', text: '“Bank” beside “river” has a different meaning from “bank” beside “money.” Attention lets the representation of a word piece change with the surrounding pieces.' },
      { title: 'Choose a task', text: 'An output layer turns the internal representations into the kind of answer needed: a category, a translated token, or a likely next token. A transformer is an architecture, not a single app or a guarantee of correct answers.' },
    ],
    technical: 'A sequence is an ordered collection. A representation is a set of numbers used to encode useful properties. Transformers combine attention layers with other operations; attention alone is not the entire model.',
    takeaway: 'A transformer learns to combine information across a sequence. Context is the central idea.',
  },
  {
    title: 'Words become numbers', subtitle: 'Tokens, embeddings, and a little translation.', category: 'THE INPUT', color: 'peach',
    intro: 'Computers do not directly calculate with the meaning of written words. The input first becomes tokens, then numerical IDs, then vectors. These are three different steps: splitting, looking up an identifier, and looking up a learned representation.',
    analogy: 'Think of a library. Cutting text into tokens is like separating a delivery into books. A token ID is a catalog number. An embedding is more like a book’s numerical description: many learned coordinates that help the system work with relationships. The ID itself does not measure meaning.',
    steps: [
      { title: 'Tokenize the text', text: 'A tokenizer divides text into pieces from its vocabulary. A token might be a word, part of a word, punctuation, or a byte-based piece. “Unbelievable” might be several tokens. Different tokenizers split the same text differently; languages and spaces matter too.' },
      { title: 'Look up token IDs', text: 'Each piece gets an integer identifier from a fixed vocabulary. These IDs are labels. Token 900 is not necessarily more meaningful than token 90, and neighboring IDs need not describe related concepts.' },
      { title: 'Retrieve embeddings', text: 'An embedding table maps each ID to a vector: an ordered list of numbers. During training, these lists are adjusted to become useful for the task. The model carries a vector for each position, rather than one number for an entire sentence.' },
    ],
    technical: 'A vector is simply a list of numbers, such as [0.2, -0.4, 0.8]. A matrix is a rectangular table of numbers. Embedding dimensions usually do not have tidy human labels like “happiness” or “animalness.”',
    takeaway: 'Text → tokens → token IDs → embedding vectors. Tokens are not always whole words.',
  },
  {
    title: 'Put things in order', subtitle: 'Why “dog bites person” is not the reverse.', category: 'POSITION', color: 'lime',
    intro: 'Attention needs a way to use order. “The dog chased the cat” and “The cat chased the dog” contain the same words but describe different events. Position information helps distinguish where each token sits.',
    analogy: 'A shopping list tells you what to buy. A recipe also tells you the order of the actions. Embeddings supply the ingredients; position information helps supply the sequence.',
    steps: [
      { title: 'Number the positions', text: 'Every token occurs at a position in the input sequence. Two appearances of the same token start from the same token embedding, but their positions and surrounding tokens can lead to different internal representations.' },
      { title: 'Provide a position signal', text: 'In the reference diagram, a positional encoding is added to each embedding. The original design uses repeating sine and cosine patterns at different frequencies. The model can use those numerical patterns to reason about positions.' },
      { title: 'Know the alternatives', text: 'Other transformers learn position vectors or encode relative position. Rotary position embeddings, for example, rotate parts of queries and keys using position. Not all transformers literally add the original sine-wave encoding.' },
    ],
    technical: 'A frequency describes how quickly a repeating wave cycles. Relative position means the distance between two tokens, rather than just their absolute index. A context window is the amount of input a model can consider at once.',
    takeaway: 'Token identity tells the model what is present. Position information helps tell it where.',
  },
  {
    title: 'Pay a little attention', subtitle: 'How one word connects to another.', category: 'THE CORE IDEA', color: 'pink',
    intro: 'Self-attention updates each token’s representation using information from tokens in the same sequence. It calculates relevance scores, turns them into weights, and mixes information according to those weights. “Self” refers to the source of the information, not to self-awareness.',
    analogy: 'You are preparing a report. Your query is the information you need. The keys are the labels on available notes. The values are the contents of those notes. You compare your question with the labels, then combine the most relevant contents. In a transformer these are numerical vectors, not actual questions and labels.',
    steps: [
      { title: 'Create queries, keys, and values', text: 'Three learned linear transformations turn each token’s current vector into a query (Q), key (K), and value (V). The same input produces different vectors because the three transformations have different learned parameters.' },
      { title: 'Compare and scale', text: 'For a given token, compare its query to the available keys using dot products. A dot product multiplies corresponding coordinates and adds the results. Divide the scores by the square root of the key-vector size to keep their scale manageable.' },
      { title: 'Normalize and mix', text: 'Softmax converts the scores into positive weights that add up to one. Multiply each value vector by its weight and add the results. This weighted mixture becomes the attention output for that token. Larger weight means more contribution in this particular calculation.' },
    ],
    technical: 'Attention(Q, K, V) = softmax(QKᵀ / √dₖ)V. QKᵀ collects the query-key dot products; dₖ is the number of coordinates in a key. Softmax exponentiates scores and divides each result by their total. Attention weights are not a complete explanation of a model’s reasoning.',
    takeaway: 'Compare queries with keys, turn scores into weights, then combine values.',
  },
  {
    title: 'More heads, more perspectives', subtitle: 'Several useful connections at once.', category: 'MULTI-HEAD ATTENTION', color: 'lilac',
    intro: 'One attention head computes one set of connections in a learned representation space. Multi-head attention runs several such calculations in parallel, then combines their outputs. Different heads can capture different relationships, though they do not come with assigned human roles.',
    analogy: 'A film review might consider the story, acting, and sound. Looking through several lenses gives a richer picture than one lens alone. Attention heads also provide multiple learned views, but we do not manually assign one head to grammar and another to emotion.',
    steps: [
      { title: 'Project into separate views', text: 'Each head has its own learned transformations for queries, keys, and values. Heads generally operate on smaller vectors so that multiple perspectives fit within a manageable computation budget.' },
      { title: 'Calculate attention in parallel', text: 'Each head independently computes scores, weights, and weighted value mixtures. Some heads may learn overlapping or unhelpful behavior. A colorful attention map does not prove that each head has a distinct meaningful specialty.' },
      { title: 'Combine the results', text: 'Concatenation places the head outputs side by side. Another learned linear transformation combines them into the representation passed onward. Later layers can build on the relationships earlier layers discovered.' },
    ],
    technical: 'A projection is a learned transformation of vectors. Concatenation means joining lists end to end. Parallel computation means performing independent calculations at the same time when the hardware allows it.',
    takeaway: 'Multiple heads learn multiple ways of relating tokens, then combine their results.',
  },
  {
    title: 'Inside a transformer block', subtitle: 'Feed forward, add, normalize, repeat.', category: 'THE BUILDING BLOCKS', color: 'peach',
    intro: 'Attention is part of a larger block. The block also transforms each position’s information, preserves a path for earlier information, and regulates numerical scale. Stacking blocks allows repeated refinement of token representations.',
    analogy: 'Think of revising an essay. Consulting the surrounding paragraphs is like attention. Editing each paragraph is like the feed-forward network. Keeping the earlier draft is like a residual connection. Applying consistent formatting loosely resembles normalization; the actual operation rescales numbers, not prose.',
    steps: [
      { title: 'Transform each position', text: 'A feed-forward network applies the same small neural network separately to each token position. Typically it expands a vector, applies a nonlinear activation, and projects it back. The nonlinear step lets it learn patterns that simple linear combinations alone cannot express.' },
      { title: 'Keep a shortcut', text: 'A residual connection adds the input of a sublayer to its output. The sublayer can learn an update while the original information has a direct route forward. This also helps training signals travel through deep networks.' },
      { title: 'Normalize and repeat', text: 'Layer normalization adjusts a token’s feature values using their mean and variance, followed by learned scaling and shifting. The reference uses “Add & Norm” after sublayers. Many later models normalize before sublayers. N× means the block is repeated N times, not that the sentence is copied N times.' },
    ],
    technical: 'A layer is a stage of computation. An activation is a nonlinear function such as ReLU or GELU. Variance measures numerical spread. A residual connection requires compatible vector sizes. Dropout, used during training in many designs, randomly disables some contributions to reduce over-reliance on particular patterns.',
    takeaway: 'Attention mixes information between tokens; feed-forward networks transform information at each position.',
  },
  {
    title: 'Read the whole blueprint', subtitle: 'Encoder, decoder, and the arrows between.', category: 'THE ARCHITECTURE', color: 'lime',
    intro: 'The reference diagram below shows the original encoder-decoder design for sequence-to-sequence tasks such as translation. The encoder processes the source sentence. The decoder uses earlier output tokens and information from the encoder to predict the next output token.',
    analogy: 'Imagine a translator who first reads a French sentence, then writes an English translation while referring back to the French. The encoder prepares the source information. The decoder produces the translation one piece at a time. This is a teaching analogy; these are two mathematical stacks, not two people.',
    steps: [
      { title: 'Encode the source', text: 'Source embeddings and position information enter the encoder. Its self-attention can connect all unmasked source positions. Each repeated block also contains feed-forward processing, residual additions, and normalization. The result is a contextual vector at each source position.' },
      { title: 'Decode without peeking', text: 'The decoder first uses masked self-attention on the output prefix. A causal mask blocks future output positions. “Shifted right” means that, during training, the decoder is given a start token and the earlier correct target tokens, while the prediction target sits one position ahead.' },
      { title: 'Consult the encoder', text: 'Cross-attention takes queries from the decoder and keys and values from the encoder output. This allows each output position to draw on relevant source information. After further processing, a linear output layer produces a score for each vocabulary token, and softmax produces a probability distribution.' },
    ],
    technical: 'Encoder-only models, such as BERT, build representations useful for tasks like classification. Decoder-only models, such as GPT-2, predict continuations using causal attention and omit the separate encoder and its cross-attention. Encoder-decoder models, such as T5, map an input sequence to an output sequence.',
    takeaway: 'The reference has two stacks. Many text generators use only a decoder-style stack.',
  },
  {
    title: 'How the model learns', subtitle: 'Predict, measure the error, adjust.', category: 'TRAINING', color: 'pink',
    intro: 'The architecture begins with adjustable parameters, often initialized with small random values. Training changes those parameters so the model performs better on a learning objective. For a causal language model, a common objective is predicting the next token from earlier tokens.',
    analogy: 'A pianist practices a passage, hears a mistake, and makes an adjustment. A model also repeats an improvement loop, but its “feedback” is a numerical loss and its adjustments follow calculus. It has no intention or awareness of practicing.',
    steps: [
      { title: 'Make a prediction', text: 'A training batch contains examples processed together. For a causal model, “The sky is blue” can provide several prediction targets: given “The,” predict “sky”; given “The sky,” predict “is”; and so on. With the correct prefixes and a causal mask, many positions can be trained in parallel.' },
      { title: 'Calculate the loss', text: 'Cross-entropy loss penalizes assigning low probability to the correct target token. It measures performance on that prediction objective, not truthfulness or understanding directly. A confidently incorrect prediction receives a large penalty.' },
      { title: 'Update the parameters', text: 'Backpropagation calculates how the loss changes with each parameter. These derivatives are called gradients. An optimizer, such as Adam, uses them to adjust parameters. A learning rate controls the size of the update. Repeat over many batches, then evaluate on data held out of training.' },
    ],
    technical: 'Pretraining learns broad patterns from a large dataset. Fine-tuning continues training on a more specific dataset or objective. Overfitting means doing well on training examples but poorly on new examples. At ordinary inference time, generating a reply does not automatically update the model’s parameters.',
    takeaway: 'Training changes parameters using feedback. Inference uses those learned parameters.',
  },
  {
    title: 'One token, then another', subtitle: 'Probabilities become a response.', category: 'GENERATION', color: 'lilac',
    intro: 'At generation time, a causal language model turns the prompt into representations, produces vocabulary scores, and chooses a next token. It appends that token to the context and repeats until a stopping condition is reached. This loop is called autoregressive generation.',
    analogy: 'It is like writing a sentence with predictive text, one suggestion at a time. Every accepted suggestion changes what the next suggestion should be. A language model can learn far richer patterns than a phone’s simple autocomplete, but the next-token loop is still a useful starting point.',
    steps: [
      { title: 'Produce logits', text: 'The output layer gives every possible next token a numerical score called a logit. These scores are not yet probabilities and can be negative. Softmax turns the scores into probabilities that sum to one.' },
      { title: 'Choose a token', text: 'Greedy decoding picks the highest-probability token. Sampling draws a token randomly according to a distribution. Temperature divides the logits before softmax: lower positive temperature sharpens the distribution, and higher temperature flattens it. Temperature changes variety; it does not guarantee accuracy.' },
      { title: 'Continue and stop', text: 'The chosen token becomes part of the next input. A cache can reuse previously calculated keys and values to avoid repeating work. Generation stops at an end token, a specified stop sequence, or a length limit. The complete token sequence is decoded back into text.' },
    ],
    technical: 'Top-k sampling keeps the k highest-scored options. Top-p sampling keeps a smallest high-probability set whose cumulative probability reaches a threshold. A context window is finite, so a model cannot necessarily use an entire long conversation at once.',
    takeaway: 'Scores → probabilities → chosen token → updated context → repeat.',
  },
  {
    title: 'What it can (and can’t) do', subtitle: 'Useful patterns. Real limitations.', category: 'THE REAL WORLD', color: 'peach',
    intro: 'Transformers are useful across language, images, audio, and other sequences. But the architecture is not a truth detector. A model can produce a convincing answer that is false, repeat bias in its data, or struggle with unfamiliar situations.',
    analogy: 'A very skilled improviser can produce a fluent story without checking a reference book. Fluency and factual reliability are different abilities. A model’s confident tone tells you little about whether it has evidence.',
    steps: [
      { title: 'Match the task to the model', text: 'Text classifiers can help organize feedback. Translation models map languages. Generative models draft continuations. Vision transformers process image patches, which play a role analogous to text tokens. Speech systems can turn sound into representations. A specific model must be trained and configured for its task.' },
      { title: 'Understand the limits', text: 'Hallucination means generating plausible but unsupported or incorrect content. Training data can encode stereotypes, exclude communities, or contain outdated information. Attention maps are not reliable proof of why an answer was produced. Larger models are not automatically unbiased, private, or correct.' },
      { title: 'Use verification and context', text: 'Check important claims against reliable sources. Retrieval-augmented generation (RAG) supplies retrieved material as context; it can improve grounding but can still fail. Tools can provide external capabilities when explicitly integrated. A bare transformer does not automatically browse the web or access private files.' },
    ],
    technical: 'An LLM is a large language model; many LLMs use transformer architectures. A prompt is the supplied input. Multimodal models accept or produce more than one kind of data. Evaluation uses task-specific tests and human review to check behavior beyond the training loss.',
    takeaway: 'Use a transformer as a powerful pattern learner. Verify claims and understand the specific system’s capabilities.',
  },
]

export const glossary: [string, string][] = [
  ['Attention', 'A calculation that combines value vectors using relevance weights derived from queries and keys.'],
  ['Autoregressive', 'Generating a sequence one piece at a time, using the pieces already available.'],
  ['Backpropagation', 'Calculating how each parameter contributed to the loss so an optimizer can update it.'],
  ['Causal mask', 'A rule that blocks attention to future positions when predicting the next token.'],
  ['Context window', 'The maximum amount of input a model can consider in a single sequence.'],
  ['Cross-attention', 'Attention whose queries come from one sequence and whose keys and values come from another.'],
  ['Decoder', 'A stack that produces output representations, often using causal attention for text generation.'],
  ['Embedding', 'A learned vector associated with a token ID. It is the model’s initial numerical representation of that token.'],
  ['Encoder', 'A stack that turns an input sequence into contextual representations.'],
  ['Feed-forward network', 'A small neural network applied independently to each token position inside a transformer block.'],
  ['Fine-tuning', 'Continuing training to adapt a model to a particular task, style, or dataset.'],
  ['Gradient', 'A derivative that describes how a change to a parameter would affect the loss.'],
  ['Hallucination', 'Plausible-sounding generated content that is incorrect or unsupported.'],
  ['Head', 'One attention calculation with its own learned projections, combined with other heads.'],
  ['Inference', 'Running a trained model to obtain predictions or generated output.'],
  ['Key / Query / Value', 'Three learned views of token vectors: queries compare with keys to decide how to combine values.'],
  ['Layer normalization', 'Rescaling a token’s features using their statistics and learned scale and shift parameters.'],
  ['Logit', 'An unnormalized numerical score for an output option, before conversion to probability.'],
  ['Loss', 'A numerical measure of how far predictions are from a chosen training objective.'],
  ['Matrix', 'A rectangular table of numbers used to organize and transform vectors.'],
  ['Neural network', 'A mathematical model with adjustable parameters learned from examples.'],
  ['Parameter', 'A number learned during training, such as a weight in a transformation.'],
  ['Positional encoding', 'Numerical information about a token’s place in a sequence.'],
  ['Residual connection', 'A shortcut that adds a sublayer’s input to its output.'],
  ['Softmax', 'A function that converts scores into positive weights or probabilities that add up to one.'],
  ['Temperature', 'A positive scaling factor applied to logits before softmax to adjust how sharp the distribution is.'],
  ['Token', 'A piece of input text, which can be a word, word part, punctuation, or a byte-based piece.'],
  ['Vector', 'An ordered list of numbers. In a model, it can represent one token at one position.'],
]

export const architecture = [
  { id: 'embedding', title: 'Input / output embedding', color: 'pink', simple: 'Turn token IDs into learned lists of numbers.', detail: 'The source tokens enter the encoder. The target prefix enters the decoder. “Outputs shifted right” refers to feeding earlier target tokens as input while training the model to predict the next one.' },
  { id: 'position', title: 'Positional encoding', color: 'lime', simple: 'Add a sense of where each token belongs.', detail: 'In the original architecture, sine and cosine position vectors are added to embeddings. This gives the model access to order. Many modern architectures use other position mechanisms.' },
  { id: 'self', title: 'Multi-head self-attention', color: 'lilac', simple: 'Let each source token draw information from the source sequence.', detail: 'Multiple heads compare queries with keys and combine values. In the encoder, each unmasked source position can attend to all other unmasked source positions.' },
  { id: 'masked', title: 'Masked multi-head attention', color: 'peach', simple: 'Connect the output so far without looking ahead.', detail: 'A causal mask sets forbidden future attention scores to negative infinity before softmax, giving them zero weight. Padding positions can also be masked. This preserves the next-token prediction task.' },
  { id: 'cross', title: 'Cross-attention', color: 'lilac', simple: 'Let the decoder consult the encoded source.', detail: 'The decoder supplies queries. The encoder output supplies keys and values. The long arrow between the two stacks in the reference is this connection.' },
  { id: 'norm', title: 'Add & Norm', color: 'lime', simple: 'Preserve information and keep numerical scales manageable.', detail: '“Add” is the residual shortcut. “Norm” is layer normalization. The original diagram applies these after each sublayer. Repeated blocks refine the representations; N× marks the number of repetitions.' },
  { id: 'feed', title: 'Feed-forward network', color: 'blue', simple: 'Transform each token’s updated information.', detail: 'The same position-wise neural network is applied separately to every position. A nonlinear activation between learned transformations allows more expressive processing.' },
  { id: 'output', title: 'Linear + Softmax', color: 'pink', simple: 'Turn the decoder result into next-token probabilities.', detail: 'A linear projection produces one logit per vocabulary token. Softmax converts logits into a distribution. A decoding strategy chooses a token, and generation continues using that expanded prefix.' },
]
