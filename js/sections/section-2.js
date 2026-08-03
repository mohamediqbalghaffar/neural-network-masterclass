(function() {
    'use strict';

    NeuralApp.registerSection({
        id: 2,
        title: "Foundations of Neural Networks",
        icon: "🧠",
        content: `
            <div class="topic-card accent-emerald">
              <h3><span class="card-icon">🏛️</span> The Perceptron Model — A Historical Foundation</h3>
              <p>The journey to modern deep learning began decades ago with early attempts to mathematically model the brain's computational units.</p>

              <h4>The Dawn of Artificial Neurons</h4>
              <ul>
                <li><strong>McCulloch-Pitts Neuron (1943):</strong> Proposed by neurophysiologist Warren McCulloch and logician Walter Pitts, this was the first mathematical model of a biological neuron. It acted as a simple logic gate (a binary threshold unit) with fixed weights.</li>
                <li><strong>Rosenblatt's Perceptron (1957):</strong> Psychologist Frank Rosenblatt took the McCulloch-Pitts concept and added a critical missing piece: <em>learning</em>. He developed an algorithm that could automatically adjust the connection weights based on examples, effectively creating the first machine learning model.</li>
              </ul>

              <div class="highlight-box tip">
                <div class="highlight-title">Analytics Connection: Linear Classifiers</div>
                <p>A perceptron is essentially a linear classifier — if you've used SVMs with a linear kernel or logistic regression without the sigmoid, you already know how a perceptron works. It draws a straight line (or hyperplane) to separate two classes of data.</p>
              </div>

              <h4>Mathematical Formulation</h4>
              <p>At its core, a perceptron takes multiple inputs, weights them, and passes them through an activation function to produce an output:</p>
              <div class="math-block">
                <span class="math-display">z = \\\\sum_{i=1}^n w_i x_i + b = \\\\mathbf{w}^T \\\\mathbf{x} + b</span>
              </div>
              <p>Where $x$ are the inputs, $w$ are the weights, and $b$ is the bias. The output $a$ is then computed using an activation function $f(z)$:</p>
              <div class="math-block">
                <span class="math-display">a = f(z)</span>
              </div>
              <p>In the original perceptron, this function was the <strong>Heaviside step function</strong> (outputting 1 if $z > 0$, and 0 otherwise). While simple, its derivative is zero everywhere (except at the jump, where it's undefined), which makes modern <em>gradient descent</em> impossible to use for training.</p>

              <h4>The AI Winter: The XOR Limitation</h4>
              <p>In 1969, Marvin Minsky and Seymour Papert published <em>"Perceptrons"</em>, a book proving mathematically that a single-layer perceptron could only solve <em>linearly separable</em> problems. Crucially, it could not learn the simple XOR (exclusive OR) logic gate function because XOR requires a non-linear decision boundary. This devastating proof led to a dramatic drop in neural network funding and research, triggering the first "AI Winter."</p>

              <h4>Biological Inspiration</h4>
              <div class="comparison-table">
                <table>
                  <thead>
                    <tr>
                      <th>Biological Neuron</th>
                      <th>Artificial Neuron (Perceptron)</th>
                      <th>Role in Computation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Dendrites</td>
                      <td>Inputs ($x_i$)</td>
                      <td>Receives signals from other neurons or data features</td>
                    </tr>
                    <tr>
                      <td>Synaptic weights</td>
                      <td>Weights ($w_i$)</td>
                      <td>Determines the importance of the incoming signal</td>
                    </tr>
                    <tr>
                      <td>Cell body</td>
                      <td>Summation ($z$)</td>
                      <td>Aggregates the weighted inputs and bias</td>
                    </tr>
                    <tr>
                      <td>Axon</td>
                      <td>Output ($a$)</td>
                      <td>Transmits the final activation signal</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="topic-card accent-blue">
                <h3><span class="card-icon">🧠</span> Multi-Layer Perceptrons (MLPs) &mdash; Building Deep Networks</h3>
                
                <p>A <strong>Multi-Layer Perceptron (MLP)</strong> is the foundational architecture of deep learning. It consists of multiple layers of neurons stacked sequentially, enabling the network to learn highly complex, non-linear representations.</p>

                <h4>Architectural Components</h4>
                <ul>
                    <li><strong>Input Layer:</strong> Receives the raw data (e.g., features from a dataset).</li>
                    <li><strong>Hidden Layers:</strong> Intermediate layers where the network learns abstract representations. They are "hidden" because their outputs are not directly observed in the training data.</li>
                    <li><strong>Output Layer:</strong> Produces the final prediction (e.g., a continuous value for regression or class probabilities for classification).</li>
                </ul>

                <p>In a standard MLP, every layer is <strong>fully connected (dense)</strong>. This means that every single neuron in layer $l$ receives an input from every neuron in the preceding layer $l-1$.</p>

                <div class="highlight-box info">
                    <div class="highlight-title">Analogy for Analysts</div>
                    <p>In analytics terms, an MLP is like a pipeline of chained transformations. Each layer is a learned feature transformation, similar to how you might chain PCA &rarr; scaling &rarr; polynomial features, except the network learns the optimal transformations from data.</p>
                </div>

                <h4>Parameter Counting</h4>
                <p>The total number of parameters (weights and biases) in an MLP grows rapidly. For a sequence of layers with sizes $n_0, n_1, ..., n_L$ (where $n_0$ is the input dimension), the parameters connecting layer $l-1$ to layer $l$ consist of a weight matrix of size $n_{l-1} \\\\times n_l$ and a bias vector of size $n_l$. The total parameter count is:</p>
                
                <div class="math-block">
                    <span class="math-display">\\\\text{Total Parameters} = \\\\sum_{l=1}^{L} (n_{l-1} \\\\times n_l + n_l)</span>
                </div>

                <p><strong>Concrete Example:</strong> Consider an MLP processing a 28x28 grayscale image. The network has an input layer of 784 neurons, a first hidden layer of 256 neurons, a second hidden layer of 128 neurons, and an output layer of 10 neurons.</p>
                <ul>
                    <li>Input to Hidden 1: $784 \\\\times 256 + 256 = 200,960$</li>
                    <li>Hidden 1 to Hidden 2: $256 \\\\times 128 + 128 = 32,896$</li>
                    <li>Hidden 2 to Output: $128 \\\\times 10 + 10 = 1,290$</li>
                </ul>
                <p>The total parameter count is <strong>235,146 parameters</strong>.</p>

                <h4>Width vs. Depth Trade-offs</h4>
                <p>When designing an MLP, you must balance the network's capacity. <strong>Width</strong> refers to the number of neurons in a specific layer, while <strong>depth</strong> refers to the total number of layers.</p>
                <ul>
                    <li><strong>Wider Networks:</strong> Can memorize complex functions but often require exponentially more neurons to approximate highly varying functions, increasing the risk of overfitting.</li>
                    <li><strong>Deeper Networks:</strong> Generally preferred because depth allows for hierarchical feature composition. Each successive layer builds upon the abstractions of the previous one, making deep networks more parameter-efficient and better at generalizing.</li>
                </ul>
            </div>

            <div class="topic-card accent-amber">
                <h3><span class="card-icon">💃</span> Forward Propagation — The Matrix Dance</h3>
                <p>
                    At its core, a neural network is an engine for transforming data. <strong>Forward propagation</strong> is the process of passing input data through the network's layers to generate a prediction. For each layer $l$, the network performs a linear transformation followed by a non-linear activation:
                </p>
                <div class="math-block">
                    <span class="math-display">
                        \\\\mathbf{Z}^{[l]} = \\\\mathbf{W}^{[l]} \\\\mathbf{A}^{[l-1]} + \\\\mathbf{b}^{[l]}
                    </span>
                </div>
                <div class="math-block">
                    <span class="math-display">
                        \\\\mathbf{A}^{[l]} = g^{[l]}(\\\\mathbf{Z}^{[l]})
                    </span>
                </div>
                <p>
                    Here, $\\\\mathbf{A}^{[0]}$ is your input data $\\\\mathbf{X}$. $\\\\mathbf{W}$ is the weight matrix, $\\\\mathbf{b}$ is the bias vector, and $g$ is the activation function (like ReLU or Sigmoid).
                </p>
                
                <h4>Why Matrix Form Matters</h4>
                <p>
                    Instead of using nested <code>for</code> loops to compute the output of each neuron one by one, we express these operations as matrix multiplications. This is crucial because modern hardware (especially GPUs) and highly optimized linear algebra libraries (like BLAS) are explicitly designed to perform parallel matrix operations at blistering speeds.
                </p>

                <h4>A Numerical Example: Shapes and Sizes</h4>
                <p>
                    Imagine a simple network: 2 input features passing into a hidden layer of 3 neurons, which then feeds into a single output neuron. Let's trace the matrix shapes for a single data point $\\\\mathbf{x}$:
                </p>
                <ul>
                    <li><strong>Input $\\\\mathbf{A}^{[0]}$:</strong> A column vector of shape $(2, 1)$.</li>
                    <li><strong>Layer 1 Weights $\\\\mathbf{W}^{[1]}$:</strong> Shape $(3, 2)$. The 3 rows correspond to the 3 destination neurons; the 2 columns correspond to the 2 input features.</li>
                    <li><strong>Layer 1 Bias $\\\\mathbf{b}^{[1]}$:</strong> Shape $(3, 1)$.</li>
                    <li><strong>Hidden State $\\\\mathbf{Z}^{[1]}$:</strong> $(3, 2) \\\\times (2, 1) = (3, 1)$. Adding $\\\\mathbf{b}^{[1]}$ keeps the shape $(3, 1)$.</li>
                    <li><strong>Layer 2 Weights $\\\\mathbf{W}^{[2]}$:</strong> Shape $(1, 3)$. Connecting 3 hidden neurons to 1 output neuron.</li>
                    <li><strong>Final Output $\\\\mathbf{Z}^{[2]}$:</strong> $(1, 3) \\\\times (3, 1) = (1, 1)$, a single prediction value!</li>
                </ul>

                <h4>Batch Processing: The Power of Vectorization</h4>
                <p>
                    In practice, we rarely process one sample at a time. By stacking $N$ training examples as columns, our input vector $\\\\mathbf{x}$ of shape $(n_{features}, 1)$ becomes an input matrix $\\\\mathbf{X}$ of shape $(n_{features}, N)$. 
                    The exact same equation $\\\\mathbf{Z} = \\\\mathbf{W}\\\\mathbf{X} + \\\\mathbf{b}$ now computes the outputs for all $N$ samples simultaneously, thanks to broadcast addition and optimized matrix-matrix multiplication.
                </p>

                <div class="highlight-box tip">
                    <div class="highlight-title">Analytics Connection</div>
                    <p>If you've used pandas DataFrames or NumPy matrix operations, forward propagation is simply a chain of matrix multiplications with element-wise nonlinear functions applied between them.</p>
                </div>
            </div>

            <div class="topic-card accent-purple">
                <h3><span class="card-icon">🌌</span> The Universal Approximation Theorem — Why Neural Networks Work</h3>
                <p>
                    At the core of neural network theory is the <strong>Universal Approximation Theorem</strong>. In its classic form, it states that a feed-forward network with a single hidden layer containing a finite number of neurons can approximate <em>any</em> continuous function on compact subsets of $\\\\mathbb{R}^n$, given an appropriate activation function. 
                </p>
                
                <div class="highlight-box important">
                    <span class="highlight-title">Important Concept</span>
                    <p>The Universal Approximation Theorem is the theoretical justification for why neural networks are so powerful, but it's an <em>existence theorem</em> — it tells us a solution EXISTS but not how to FIND it. That's what training (backpropagation) is for.</p>
                </div>

                <h4>The Caveat: Representation vs. Learnability</h4>
                <p>
                    While the theorem guarantees we <em>can</em> represent complex mappings, it says nothing about <strong>learnability</strong>. A single-layer network might require an exponentially large, unbounded number of neurons to approximate a highly non-linear function, making it computationally impossible to train in practice.
                </p>

                <h4>Why Depth Matters: The Depth-Width Trade-off</h4>
                <p>
                    This reveals the true power of deep learning. Mathematical results demonstrate that deep networks can achieve exponentially better approximation with fewer total parameters than shallow networks. While a shallow network needs to be infinitely wide to capture complex features, deep networks build representations compositionally. 
                </p>

                <p>
                    <strong>Practical Implications:</strong> We rarely use single hidden layer networks in modern predictive analytics. Deep networks are significantly more parameter-efficient. They learn hierarchical representations (e.g., edges to shapes to objects) rather than trying to brute-force the mapping in one massive layer. This compositionality mathematically echoes the <em>Kolmogorov-Arnold representation theorem</em>, demonstrating that complex multivariate continuous functions can be decomposed into superpositions of simpler continuous functions of one variable.
                </p>
            </div>

            <div class="topic-card accent-pink">
              <h3><span class="card-icon">🎲</span> Weight Initialization — The Silent Make-or-Break</h3>
              
              <p>Before a neural network can begin learning from data, its weights must be assigned initial values. This step might seem trivial, but improper initialization can stall the training process or prevent the network from learning entirely.</p>
              
              <div class="highlight-box warning">
                <div class="highlight-title">⚠️ The Symmetry Problem</div>
                <p>A network initialized with all zeros will never learn anything useful — every neuron will compute the exact same gradient and update identically. This is called the symmetry problem. We must break symmetry by randomly initializing weights so neurons can learn distinct features.</p>
              </div>

              <h4>Common Initialization Strategies</h4>
              <p>To break symmetry, we use random numbers, but the scale of these numbers is critical:</p>
              <ul>
                <li><strong>Random Normal Initialization:</strong> Weights are drawn from a Gaussian distribution with zero mean and small standard deviation, e.g., $\\\\mathcal{N}(0, 0.01)$. This works for shallow networks but often leads to instability in deep ones.</li>
                <li><strong>Xavier/Glorot Initialization:</strong> Designed for networks using Sigmoid or Tanh activations. It scales the weights based on the number of inputs ($n_{in}$) and outputs ($n_{out}$) to maintain the variance of activations across layers:
                  <div class="math-block"><span class="math-display">\\\\text{Var}(W) = \\\\frac{2}{n_{in} + n_{out}}</span></div>
                </li>
                <li><strong>He Initialization:</strong> The preferred method for networks using ReLU or Leaky ReLU activations. It compensates for the fact that ReLU zeroes out half of the inputs:
                  <div class="math-block"><span class="math-display">\\\\text{Var}(W) = \\\\frac{2}{n_{in}}</span></div>
                </li>
              </ul>
              
              <div class="key-takeaway">
                <h4>Why It Matters</h4>
                <ul>
                  <li>Bad initialization leads to vanishing or exploding gradients before training even begins.</li>
                  <li>Proper initialization ensures the signal flows smoothly through the network, allowing the optimization algorithm to work effectively.</li>
                </ul>
              </div>
            </div>

            <div class="topic-card accent-cyan">
                <h3><span class="card-icon">🕸️</span> Computational Graphs — How Frameworks See Your Network</h3>
                
                <p>
                    Under the hood, modern deep learning frameworks do not perceive your neural network as isolated mathematical equations. Instead, they represent the entire architecture as a <strong>computational graph</strong>—specifically, a Directed Acyclic Graph (DAG).
                </p>
                
                <div class="key-takeaway">
                    <h4>Anatomy of the Graph</h4>
                    <ul>
                        <li><strong>Nodes (Vertices):</strong> Represent mathematical operations (e.g., matrix multiplication, addition, or applying a ReLU activation).</li>
                        <li><strong>Edges (Links):</strong> Carry the data flowing between nodes. In deep learning, these are n-dimensional arrays called <strong>tensors</strong>.</li>
                    </ul>
                </div>
                
                <p>
                    This abstraction is fundamental because of <strong>automatic differentiation (autograd)</strong>. By tracking the exact sequence of operations in a graph during the forward pass, the framework can simply traverse the DAG backwards. It automatically applies the chain rule at each node to compute precise gradients for every parameter without requiring you to derive the calculus by hand.
                </p>

                <div class="collapsible-trigger">
                    <span class="trigger-icon">🔄</span>
                    <span>Static vs. Dynamic Graphs</span>
                </div>
                <div class="collapsible-content">
                    <ul>
                        <li><strong>Static Graphs (Define-and-Run):</strong> Used by early frameworks like TensorFlow 1.x. You build the entire graph architecture first, compile it, and then push data through it. Highly optimized, but rigid and harder to debug.</li>
                        <li><strong>Dynamic Graphs (Define-by-Run):</strong> Pioneered by PyTorch. The graph is constructed on the fly as your code executes. This allows for standard Python control flow and immediate debugging, making it the modern standard for research and development.</li>
                    </ul>
                </div>

                <div class="highlight-box info">
                    <div class="highlight-title">Analytics Connection: DAGs in Big Data</div>
                    <p>If you've used Apache Spark, you're already familiar with computational graphs — Spark's lazy evaluation and DAG scheduler work on the same principle to optimize data transformations. The key difference is that neural network graphs are optimized for gradient computation.</p>
                </div>
            </div>

            <div class="topic-card accent-emerald">
                <h3><span class="card-icon">🧊</span> Tensors — The Data Structures of Deep Learning</h3>
                <p>A <strong>tensor</strong> is simply a multi-dimensional array, generalizing the concepts of scalars and matrices to arbitrary dimensions. While traditional data analytics largely lives in flat, 2D tables, deep learning thrives in higher-dimensional spaces.</p>
                
                <div class="key-takeaway">
                    <h4>Tensor Dimensions</h4>
                    <ul>
                        <li><strong>0D Tensor (Scalar):</strong> A single number, like a loss value or accuracy metric.</li>
                        <li><strong>1D Tensor (Vector):</strong> A sequence of numbers, like a single time series or a row of features.</li>
                        <li><strong>2D Tensor (Matrix):</strong> A grid of numbers, akin to a traditional DataFrame or CSV file.</li>
                        <li><strong>3D+ Tensor:</strong> Higher dimensional structures needed for complex data like images or video.</li>
                    </ul>
                </div>

                <h4>Common Tensor Shapes in Practice</h4>
                <p>In deep learning, you will constantly manipulate data shapes to feed into neural networks:</p>
                <ul>
                    <li><strong>Images:</strong> Typically formatted as <em>(batch, channels, height, width)</em> or <em>(batch, height, width, channels)</em>.</li>
                    <li><strong>Text / Sequences:</strong> Typically structured as <em>(batch, sequence_length, embedding_dim)</em>.</li>
                </ul>

                <h4>Key Tensor Operations</h4>
                <p>Efficient deep learning relies on highly optimized tensor algebra:</p>
                <ul>
                    <li><strong>Element-wise Operations:</strong> Adding, multiplying, or applying activation functions independently to each element.</li>
                    <li><strong>Broadcasting:</strong> Automatically expanding smaller tensors to match the shape of larger ones for element-wise operations without copying data.</li>
                    <li><strong>Reshaping &amp; Slicing:</strong> Altering dimensions (e.g., flattening a 2D image into a 1D vector) or extracting subsets of data.</li>
                    <li><strong>Einsum:</strong> Einstein summation convention, a concise way to specify complex matrix multiplications and tensor contractions.</li>
                </ul>

                <h4>Why Tensor Operations Are Fast</h4>
                <p>Tensors are designed for raw computational speed. Their <strong>contiguous memory layout</strong> allows the CPU to fetch data efficiently into cache. Modern processors use <strong>SIMD instructions</strong> (Single Instruction, Multiple Data) to process multiple tensor elements simultaneously. Most importantly, tensor operations map perfectly to <strong>GPU parallelism</strong>, where thousands of cores perform identical operations on different chunks of the tensor.</p>

                <div class="comparison-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Analytics Data Structure</th>
                                <th>Deep Learning Equivalent</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Scalar Metric</td>
                                <td>0D Tensor</td>
                            </tr>
                            <tr>
                                <td>Pandas Series</td>
                                <td>1D Tensor</td>
                            </tr>
                            <tr>
                                <td>Pandas DataFrame</td>
                                <td>2D Tensor</td>
                            </tr>
                            <tr>
                                <td>Panel Data / MultiIndex</td>
                                <td>3D+ Tensor</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="highlight-box tip">
                    <div class="highlight-title">Transitioning from Analytics</div>
                    <p>When you call <em>df.values</em> in pandas, you get a NumPy array &mdash; which is essentially a tensor. The jump from traditional data analytics to deep learning is often just a matter of adding more dimensions to the arrays you already know how to manipulate.</p>
                </div>
            </div>

            <div class="topic-card">
                <h3>Interactive Demo: Build-a-Neuron</h3>
                <p>Visualize the forward pass through a neural network. Watch data flow from inputs, through weighted connections, into summation nodes, and out through activation functions. The pulses represent data propagating forward through the network.</p>
                <p><em>(See the live demo below)</em></p>
            </div>

            <div class="key-takeaway">
                <h4>Key Takeaways</h4>
                <ul>
                    <li>A perceptron is a linear classifier; stacking them into layers creates universal function approximators.</li>
                    <li>Matrix multiplication makes forward propagation massively parallelizable on GPUs.</li>
                    <li>Deep networks are exponentially more parameter-efficient than wide, shallow networks.</li>
                    <li>Proper weight initialization (Xavier/He) is critical to avoid vanishing/exploding gradients.</li>
                    <li>Tensors are the fundamental data structure — multi-dimensional arrays that generalize everything from scalars to video batches.</li>
                    <li>The Universal Approximation Theorem guarantees expressiveness, but depth and proper training are needed for practical learning.</li>
                </ul>
            </div>
        `,
        initDemo: function(container) {
            const canvas = document.getElementById('demo-canvas-2');
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            
            let frameId;
            let time = 0;
            
            // Network architecture: 3 input → 4 hidden → 2 hidden → 1 output
            const layers = [
                { x: 120, neurons: [100, 180, 260, 340] },   // Input layer (4 neurons)
                { x: 350, neurons: [130, 225, 320] },         // Hidden layer 1 (3 neurons)
                { x: 580, neurons: [175, 275] },               // Hidden layer 2 (2 neurons)
                { x: 780, neurons: [225] }                     // Output (1 neuron)
            ];
            
            const layerLabels = ['Input', 'Hidden 1', 'Hidden 2', 'Output'];
            const layerColors = ['#34D399', '#60A5FA', '#A855F7', '#FBBF24'];
            
            function draw() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                // Draw connections with animated pulses
                for (let l = 0; l < layers.length - 1; l++) {
                    const fromLayer = layers[l];
                    const toLayer = layers[l + 1];
                    
                    for (let i = 0; i < fromLayer.neurons.length; i++) {
                        for (let j = 0; j < toLayer.neurons.length; j++) {
                            const x1 = fromLayer.x;
                            const y1 = fromLayer.neurons[i];
                            const x2 = toLayer.x;
                            const y2 = toLayer.neurons[j];
                            
                            // Connection line
                            const alpha = 0.15 + Math.sin(time * 2 + i + j + l) * 0.08;
                            ctx.beginPath();
                            ctx.moveTo(x1, y1);
                            ctx.lineTo(x2, y2);
                            ctx.strokeStyle = \`rgba(148, 163, 184, \${alpha})\`;
                            ctx.lineWidth = 1;
                            ctx.stroke();
                            
                            // Animated pulse
                            const speed = 0.4 + (i * 0.1);
                            const pulsePos = ((time * speed + l * 0.8 + i * 0.3 + j * 0.2) % 2) / 2;
                            if (pulsePos >= 0 && pulsePos <= 1) {
                                const pX = x1 + (x2 - x1) * pulsePos;
                                const pY = y1 + (y2 - y1) * pulsePos;
                                const pulseAlpha = Math.sin(pulsePos * Math.PI);
                                ctx.beginPath();
                                ctx.arc(pX, pY, 3, 0, Math.PI * 2);
                                ctx.fillStyle = \`rgba(\${l === 0 ? '52, 211, 153' : l === 1 ? '96, 165, 250' : '168, 85, 247'}, \${pulseAlpha * 0.8})\`;
                                ctx.fill();
                            }
                        }
                    }
                }
                
                // Draw neurons
                for (let l = 0; l < layers.length; l++) {
                    const layer = layers[l];
                    const color = layerColors[l];
                    
                    for (let i = 0; i < layer.neurons.length; i++) {
                        const x = layer.x;
                        const y = layer.neurons[i];
                        const glow = 0.3 + Math.sin(time * 1.5 + i + l) * 0.15;
                        const radius = l === 0 || l === layers.length - 1 ? 18 : 24;
                        
                        // Glow
                        const gradient = ctx.createRadialGradient(x, y, radius * 0.5, x, y, radius * 2);
                        gradient.addColorStop(0, color + '40');
                        gradient.addColorStop(1, 'transparent');
                        ctx.beginPath();
                        ctx.arc(x, y, radius * 2, 0, Math.PI * 2);
                        ctx.fillStyle = gradient;
                        ctx.fill();
                        
                        // Node body
                        ctx.beginPath();
                        ctx.arc(x, y, radius, 0, Math.PI * 2);
                        ctx.fillStyle = '#0F172A';
                        ctx.fill();
                        ctx.strokeStyle = color;
                        ctx.lineWidth = 2;
                        ctx.stroke();
                        
                        // Inner symbol for hidden layers
                        if (l > 0 && l < layers.length - 1) {
                            ctx.fillStyle = color;
                            ctx.font = '12px Inter, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('σ', x, y);
                        }
                    }
                    
                    // Layer labels
                    ctx.fillStyle = '#64748B';
                    ctx.font = '12px Inter, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.fillText(layerLabels[l], layer.x, 400);
                }
                
                // Title
                ctx.fillStyle = '#E2E8F0';
                ctx.font = 'bold 14px Outfit, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('Forward Propagation: Data Flows Left → Right', canvas.width / 2, 30);
                
                // Legend
                ctx.textAlign = 'left';
                ctx.font = '11px Inter, sans-serif';
                const legendY = 430;
                const legendItems = [
                    { color: '#34D399', label: 'Input signals' },
                    { color: '#60A5FA', label: 'Hidden activations' },
                    { color: '#A855F7', label: 'Deep features' },
                    { color: '#FBBF24', label: 'Output' }
                ];
                let legendX = 250;
                legendItems.forEach(item => {
                    ctx.beginPath();
                    ctx.arc(legendX, legendY, 5, 0, Math.PI * 2);
                    ctx.fillStyle = item.color;
                    ctx.fill();
                    ctx.fillStyle = '#94A3B8';
                    ctx.fillText(item.label, legendX + 10, legendY + 4);
                    legendX += 130;
                });
                
                time += 0.02;
                frameId = requestAnimationFrame(draw);
            }
            draw();
            this.frameId = frameId;
        },
        destroyDemo: function() {
            if (this.frameId) cancelAnimationFrame(this.frameId);
        }
    });
})();
