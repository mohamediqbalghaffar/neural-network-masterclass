(function() {
    'use strict';

    NeuralApp.registerSection({
        id: 2,
        title: "Foundations of Neural Networks",
        icon: "🧠",
        content: `
            <div class="topic-card accent-emerald">
              <h3><span class="card-icon">🏛️</span> The Perceptron Model — A Historical Foundation</h3>
              <p>The journey to modern deep learning began decades ago with early attempts to mathematically model the brain’s computational units.</p>

              <h4>The Dawn of Artificial Neurons</h4>
              <ul>
                <li><strong>McCulloch-Pitts Neuron (1943):</strong> Proposed by neurophysiologist Warren McCulloch and logician Walter Pitts, this was the first mathematical model of a biological neuron. It acted as a simple logic gate (a binary threshold unit) with fixed weights.</li>
                <li><strong>Rosenblatt’s Perceptron (1957):</strong> Psychologist Frank Rosenblatt added a critical missing piece: <em>learning</em>. He developed an algorithm that could automatically adjust connection weights based on examples, creating the first machine learning model.</li>
              </ul>

              <div class="highlight-box tip">
                <div class="highlight-title">Analytics Connection: Linear Classifiers</div>
                <p>A perceptron is essentially a linear classifier — if you’ve used SVMs with a linear kernel or logistic regression without the sigmoid, you already know how a perceptron works. It draws a straight line (or hyperplane) to separate two classes of data.</p>
              </div>

              <h4>Mathematical Formulation</h4>
              <p>At its core, a perceptron takes multiple inputs, weights them, and passes them through an activation function:</p>
              <div class="math-block">
                <span class="math-display">z = \\sum_{i=1}^n w_i x_i + b = \\mathbf{w}^T \\mathbf{x} + b</span>
              </div>
              <p>Where $x$ are the inputs, $w$ are the weights, and $b$ is the bias. The output $a$ is then computed:</p>
              <div class="math-block">
                <span class="math-display">a = f(z)</span>
              </div>
              <p>In the original perceptron, this function was the <strong>Heaviside step function</strong> (outputting 1 if $z > 0$, and 0 otherwise). Its derivative is zero everywhere, making <em>gradient descent</em> impossible.</p>

              <h4>The AI Winter: The XOR Limitation</h4>
              <p>In 1969, Minsky and Papert published <em>“Perceptrons”</em>, proving that a single-layer perceptron could only solve <em>linearly separable</em> problems. It could not learn XOR, triggering the first “AI Winter.”</p>

              <h4>Biological Inspiration</h4>
              <div class="comparison-table">
                <table>
                  <thead><tr><th>Biological Neuron</th><th>Artificial Neuron</th><th>Role</th></tr></thead>
                  <tbody>
                    <tr><td>Dendrites</td><td>Inputs ($x_i$)</td><td>Receives signals</td></tr>
                    <tr><td>Synaptic weights</td><td>Weights ($w_i$)</td><td>Signal importance</td></tr>
                    <tr><td>Cell body</td><td>Summation ($z$)</td><td>Aggregates inputs</td></tr>
                    <tr><td>Axon</td><td>Output ($a$)</td><td>Transmits activation</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="topic-card accent-blue">
                <h3><span class="card-icon">🧠</span> Multi-Layer Perceptrons (MLPs) — Building Deep Networks</h3>
                <p>A <strong>Multi-Layer Perceptron (MLP)</strong> is the foundational architecture of deep learning. It consists of multiple layers of neurons stacked sequentially, enabling learning of complex, non-linear representations.</p>
                <h4>Architectural Components</h4>
                <ul>
                    <li><strong>Input Layer:</strong> Receives the raw data (features from a dataset).</li>
                    <li><strong>Hidden Layers:</strong> Intermediate layers where the network learns abstract representations.</li>
                    <li><strong>Output Layer:</strong> Produces the final prediction.</li>
                </ul>
                <p>In a standard MLP, every layer is <strong>fully connected (dense)</strong>. Every neuron in layer $l$ receives input from every neuron in layer $l-1$.</p>
                <div class="highlight-box info">
                    <div class="highlight-title">Analogy for Analysts</div>
                    <p>An MLP is like a pipeline of chained transformations. Each layer is a learned feature transformation, similar to chaining PCA → scaling → polynomial features, except the network learns the optimal transformations from data.</p>
                </div>
                <h4>Parameter Counting</h4>
                <p>For a sequence of layers with sizes $n_0, n_1, ..., n_L$, the total parameter count is:</p>
                <div class="math-block">
                    <span class="math-display">\\text{Total Params} = \\sum_{l=1}^{L} (n_{l-1} \\times n_l + n_l)</span>
                </div>
                <p><strong>Concrete Example:</strong> An MLP with input=784 (28×28 image), hidden1=256, hidden2=128, output=10:</p>
                <ul>
                    <li>Input to Hidden 1: $784 \\times 256 + 256 = 200,960$</li>
                    <li>Hidden 1 to Hidden 2: $256 \\times 128 + 128 = 32,896$</li>
                    <li>Hidden 2 to Output: $128 \\times 10 + 10 = 1,290$</li>
                </ul>
                <p>Total: <strong>235,146 parameters</strong>.</p>
                <h4>Width vs. Depth Trade-offs</h4>
                <ul>
                    <li><strong>Wider Networks:</strong> Can memorize complex functions but risk overfitting and require exponentially more neurons.</li>
                    <li><strong>Deeper Networks:</strong> Generally preferred because depth allows hierarchical feature composition, making deep networks more parameter-efficient.</li>
                </ul>
            </div>

            <div class="topic-card accent-amber">
                <h3><span class="card-icon">💃</span> Forward Propagation — The Matrix Dance</h3>
                <p><strong>Forward propagation</strong> is the process of passing input data through the network’s layers to generate a prediction. For each layer $l$:</p>
                <div class="math-block">
                    <span class="math-display">\\mathbf{Z}^{[l]} = \\mathbf{W}^{[l]} \\mathbf{A}^{[l-1]} + \\mathbf{b}^{[l]}</span>
                </div>
                <div class="math-block">
                    <span class="math-display">\\mathbf{A}^{[l]} = g^{[l]}(\\mathbf{Z}^{[l]})</span>
                </div>
                <p>Where $\\mathbf{A}^{[0]}$ is your input data, $\\mathbf{W}$ is the weight matrix, $\\mathbf{b}$ is the bias vector, and $g$ is the activation function.</p>
                <h4>Why Matrix Form Matters</h4>
                <p>Instead of nested loops, we express operations as matrix multiplications. Modern GPUs and optimized libraries (like BLAS) are designed for massive parallel matrix operations.</p>
                <h4>A Numerical Example: Shapes and Sizes</h4>
                <p>A simple network: 2 inputs → 3 hidden neurons → 1 output:</p>
                <ul>
                    <li><strong>Input:</strong> Column vector of shape $(2, 1)$</li>
                    <li><strong>Layer 1 Weights:</strong> Shape $(3, 2)$ — 3 destination neurons, 2 input features</li>
                    <li><strong>Hidden State:</strong> $(3, 2) \\times (2, 1) = (3, 1)$</li>
                    <li><strong>Layer 2 Weights:</strong> Shape $(1, 3)$</li>
                    <li><strong>Final Output:</strong> $(1, 3) \\times (3, 1) = (1, 1)$ — a single prediction!</li>
                </ul>
                <h4>Batch Processing</h4>
                <p>In practice, we stack $N$ training examples as columns. The input becomes a matrix of shape $(n_{features}, N)$ and the same equation processes all $N$ samples simultaneously.</p>
                <div class="highlight-box tip">
                    <div class="highlight-title">Analytics Connection</div>
                    <p>If you’ve used pandas DataFrames or NumPy matrix operations, forward propagation is simply a chain of matrix multiplications with element-wise nonlinear functions applied between them.</p>
                </div>
            </div>

            <div class="topic-card accent-purple">
                <h3><span class="card-icon">🌌</span> The Universal Approximation Theorem — Why Neural Networks Work</h3>
                <p>The <strong>Universal Approximation Theorem</strong> states that a feed-forward network with a single hidden layer containing a finite number of neurons can approximate <em>any</em> continuous function on compact subsets of $\\mathbb{R}^n$.</p>
                <div class="highlight-box important">
                    <span class="highlight-title">Important Concept</span>
                    <p>This is an <em>existence theorem</em> — it tells us a solution EXISTS but not how to FIND it. That’s what training (backpropagation) is for.</p>
                </div>
                <h4>Representation vs. Learnability</h4>
                <p>While the theorem guarantees we <em>can</em> represent complex mappings, it says nothing about <strong>learnability</strong>. A single-layer network might require exponentially many neurons, making it computationally impossible to train.</p>
                <h4>Why Depth Matters</h4>
                <p>Deep networks achieve exponentially better approximation with fewer total parameters. They learn hierarchical representations (edges → shapes → objects) rather than brute-forcing the mapping in one layer. This echoes the <em>Kolmogorov-Arnold representation theorem</em>.</p>
            </div>

            <div class="topic-card accent-pink">
              <h3><span class="card-icon">🎲</span> Weight Initialization — The Silent Make-or-Break</h3>
              <p>Before a neural network can learn, its weights must be assigned initial values. Improper initialization can stall training or prevent learning entirely.</p>
              <div class="highlight-box warning">
                <div class="highlight-title">⚠️ The Symmetry Problem</div>
                <p>A network initialized with all zeros will never learn anything useful — every neuron will compute the exact same gradient and update identically. We must break symmetry by randomly initializing weights.</p>
              </div>
              <h4>Common Initialization Strategies</h4>
              <ul>
                <li><strong>Random Normal:</strong> Weights from $\\mathcal{N}(0, 0.01)$. Works for shallow networks, unstable for deep ones.</li>
                <li><strong>Xavier/Glorot:</strong> For Sigmoid/Tanh activations. Maintains activation variance:
                  <div class="math-block"><span class="math-display">\\text{Var}(W) = \\frac{2}{n_{in} + n_{out}}</span></div>
                </li>
                <li><strong>He Initialization:</strong> For ReLU activations. Compensates for ReLU zeroing half the inputs:
                  <div class="math-block"><span class="math-display">\\text{Var}(W) = \\frac{2}{n_{in}}</span></div>
                </li>
              </ul>
            </div>

            <div class="topic-card accent-cyan">
                <h3><span class="card-icon">🕸️</span> Computational Graphs — How Frameworks See Your Network</h3>
                <p>Modern frameworks represent neural networks as <strong>computational graphs</strong> — Directed Acyclic Graphs (DAGs) where nodes are operations and edges carry tensors.</p>
                <div class="key-takeaway">
                    <h4>Anatomy of the Graph</h4>
                    <ul>
                        <li><strong>Nodes:</strong> Mathematical operations (matmul, add, ReLU)</li>
                        <li><strong>Edges:</strong> Tensors flowing between operations</li>
                    </ul>
                </div>
                <p>This abstraction enables <strong>automatic differentiation (autograd)</strong>. The framework traverses the DAG backwards, applying the chain rule to compute gradients automatically.</p>
                <div class="collapsible-trigger">
                    <span class="trigger-icon">🔄</span>
                    <span>Static vs. Dynamic Graphs</span>
                </div>
                <div class="collapsible-content">
                    <ul>
                        <li><strong>Static (Define-and-Run):</strong> TensorFlow 1.x. Build the graph first, then execute. Optimized but rigid.</li>
                        <li><strong>Dynamic (Define-by-Run):</strong> PyTorch. Graph built on-the-fly. Allows standard Python control flow.</li>
                    </ul>
                </div>
                <div class="highlight-box info">
                    <div class="highlight-title">Analytics Connection: DAGs in Big Data</div>
                    <p>If you’ve used Apache Spark, you’re already familiar with computational graphs — Spark’s lazy evaluation and DAG scheduler work on the same principle. Neural network graphs are optimized for gradient computation.</p>
                </div>
            </div>

            <div class="topic-card accent-emerald">
                <h3><span class="card-icon">🧊</span> Tensors — The Data Structures of Deep Learning</h3>
                <p>A <strong>tensor</strong> is a multi-dimensional array, generalizing scalars and matrices to arbitrary dimensions.</p>
                <div class="key-takeaway">
                    <h4>Tensor Dimensions</h4>
                    <ul>
                        <li><strong>0D (Scalar):</strong> A single number (loss value, accuracy)</li>
                        <li><strong>1D (Vector):</strong> A sequence (time series, feature row)</li>
                        <li><strong>2D (Matrix):</strong> A grid (DataFrame, CSV file)</li>
                        <li><strong>3D+ (Tensor):</strong> Higher dimensions (images, video)</li>
                    </ul>
                </div>
                <h4>Common Shapes</h4>
                <ul>
                    <li><strong>Images:</strong> (batch, channels, height, width)</li>
                    <li><strong>Text:</strong> (batch, sequence_length, embedding_dim)</li>
                </ul>
                <h4>Key Operations</h4>
                <ul>
                    <li><strong>Element-wise:</strong> Adding, multiplying, applying activations to each element</li>
                    <li><strong>Broadcasting:</strong> Auto-expanding smaller tensors to match larger ones</li>
                    <li><strong>Reshaping &amp; Slicing:</strong> Altering dimensions or extracting subsets</li>
                    <li><strong>Einsum:</strong> Einstein summation for complex tensor contractions</li>
                </ul>
                <div class="comparison-table">
                    <table>
                        <thead><tr><th>Analytics Data Structure</th><th>Deep Learning Equivalent</th></tr></thead>
                        <tbody>
                            <tr><td>Scalar Metric</td><td>0D Tensor</td></tr>
                            <tr><td>Pandas Series</td><td>1D Tensor</td></tr>
                            <tr><td>Pandas DataFrame</td><td>2D Tensor</td></tr>
                            <tr><td>Panel Data / MultiIndex</td><td>3D+ Tensor</td></tr>
                        </tbody>
                    </table>
                </div>
                <div class="highlight-box tip">
                    <div class="highlight-title">Transitioning from Analytics</div>
                    <p>When you call <em>df.values</em> in pandas, you get a NumPy array — which is essentially a tensor. The jump to deep learning is often just adding more dimensions.</p>
                </div>
            </div>

            <div class="topic-card">
                <h3>Interactive Demo: Build-a-Neuron</h3>
                <p>Visualize the forward pass through a neural network. Watch data flow from inputs, through weighted connections, into summation nodes, and out through activation functions.</p>
                <p><em>(See the live demo below)</em></p>
            </div>

            <div class="key-takeaway">
                <h4>Key Takeaways</h4>
                <ul>
                    <li>A perceptron is a linear classifier; stacking them into layers creates universal function approximators.</li>
                    <li>Matrix multiplication makes forward propagation massively parallelizable on GPUs.</li>
                    <li>Deep networks are exponentially more parameter-efficient than wide, shallow networks.</li>
                    <li>Proper weight initialization (Xavier/He) is critical to avoid vanishing/exploding gradients.</li>
                    <li>Tensors are the fundamental data structure — multi-dimensional arrays generalizing everything from scalars to video batches.</li>
                    <li>The Universal Approximation Theorem guarantees expressiveness, but depth and proper training are needed for practical learning.</li>
                </ul>
            </div>
        `,
        initDemo: function(container) {
            var canvas = document.getElementById('demo-canvas-2');
            if (!canvas) return;
            var ctx = canvas.getContext('2d');
            
            var frameId;
            var time = 0;
            
            var layers = [
                { x: 120, neurons: [100, 180, 260, 340] },
                { x: 350, neurons: [130, 225, 320] },
                { x: 580, neurons: [175, 275] },
                { x: 780, neurons: [225] }
            ];
            
            var layerLabels = ['Input', 'Hidden 1', 'Hidden 2', 'Output'];
            var layerColors = ['#34D399', '#60A5FA', '#A855F7', '#FBBF24'];
            var pulseRGB = ['52, 211, 153', '96, 165, 250', '168, 85, 247'];
            
            function draw() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                var l, i, j;
                for (l = 0; l < layers.length - 1; l++) {
                    var fromLayer = layers[l];
                    var toLayer = layers[l + 1];
                    
                    for (i = 0; i < fromLayer.neurons.length; i++) {
                        for (j = 0; j < toLayer.neurons.length; j++) {
                            var x1 = fromLayer.x, y1 = fromLayer.neurons[i];
                            var x2 = toLayer.x, y2 = toLayer.neurons[j];
                            
                            var alpha = 0.15 + Math.sin(time * 2 + i + j + l) * 0.08;
                            ctx.beginPath();
                            ctx.moveTo(x1, y1);
                            ctx.lineTo(x2, y2);
                            ctx.strokeStyle = 'rgba(148, 163, 184, ' + alpha + ')';
                            ctx.lineWidth = 1;
                            ctx.stroke();
                            
                            var speed = 0.4 + (i * 0.1);
                            var pulsePos = ((time * speed + l * 0.8 + i * 0.3 + j * 0.2) % 2) / 2;
                            if (pulsePos >= 0 && pulsePos <= 1) {
                                var pX = x1 + (x2 - x1) * pulsePos;
                                var pY = y1 + (y2 - y1) * pulsePos;
                                var pulseAlpha = Math.sin(pulsePos * Math.PI);
                                ctx.beginPath();
                                ctx.arc(pX, pY, 3, 0, Math.PI * 2);
                                ctx.fillStyle = 'rgba(' + pulseRGB[Math.min(l, 2)] + ', ' + (pulseAlpha * 0.8) + ')';
                                ctx.fill();
                            }
                        }
                    }
                }
                
                for (l = 0; l < layers.length; l++) {
                    var layer = layers[l];
                    var color = layerColors[l];
                    
                    for (i = 0; i < layer.neurons.length; i++) {
                        var x = layer.x, y = layer.neurons[i];
                        var radius = (l === 0 || l === layers.length - 1) ? 18 : 24;
                        
                        var gradient = ctx.createRadialGradient(x, y, radius * 0.5, x, y, radius * 2);
                        gradient.addColorStop(0, color + '40');
                        gradient.addColorStop(1, 'transparent');
                        ctx.beginPath();
                        ctx.arc(x, y, radius * 2, 0, Math.PI * 2);
                        ctx.fillStyle = gradient;
                        ctx.fill();
                        
                        ctx.beginPath();
                        ctx.arc(x, y, radius, 0, Math.PI * 2);
                        ctx.fillStyle = '#0F172A';
                        ctx.fill();
                        ctx.strokeStyle = color;
                        ctx.lineWidth = 2;
                        ctx.stroke();
                        
                        if (l > 0 && l < layers.length - 1) {
                            ctx.fillStyle = color;
                            ctx.font = '12px Inter, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('\u03C3', x, y);
                        }
                    }
                    
                    ctx.fillStyle = '#64748B';
                    ctx.font = '12px Inter, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.fillText(layerLabels[l], layer.x, 400);
                }
                
                ctx.fillStyle = '#E2E8F0';
                ctx.font = 'bold 14px Outfit, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('Forward Propagation: Data Flows Left \u2192 Right', canvas.width / 2, 30);
                
                ctx.textAlign = 'left';
                ctx.font = '11px Inter, sans-serif';
                var legendY = 430;
                var legendItems = [
                    { color: '#34D399', label: 'Input signals' },
                    { color: '#60A5FA', label: 'Hidden activations' },
                    { color: '#A855F7', label: 'Deep features' },
                    { color: '#FBBF24', label: 'Output' }
                ];
                var legendX = 250;
                for (var li = 0; li < legendItems.length; li++) {
                    ctx.beginPath();
                    ctx.arc(legendX, legendY, 5, 0, Math.PI * 2);
                    ctx.fillStyle = legendItems[li].color;
                    ctx.fill();
                    ctx.fillStyle = '#94A3B8';
                    ctx.fillText(legendItems[li].label, legendX + 10, legendY + 4);
                    legendX += 130;
                }
                
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
