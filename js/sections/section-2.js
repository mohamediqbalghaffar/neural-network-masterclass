(function() {
    'use strict';

    NeuralApp.registerSection({
        id: 2,
        title: "Foundations of Neural Networks",
        icon: "🧠",
        content: `
            <div class="topic-card accent-emerald">
                <h3><span class="card-icon">⚙️</span> The Perceptron Model</h3>
                <p>The McCulloch-Pitts neuron (1943) and Rosenblatt's Perceptron (1957) laid the groundwork. A perceptron takes multiple inputs, multiplies them by weights, sums them, adds a bias, and passes the result through a step function.</p>
                <div class="math-block"><span class="math-display">z = \\mathbf{w}^T \\mathbf{x} + b</span></div>
                <div class="math-block"><span class="math-display">a = f(z)</span></div>
                <p>Where $f$ is an activation function. The original perceptron used a Heaviside step function, making it impossible to train with modern gradient descent since its derivative is zero almost everywhere.</p>
            </div>
            
            <div class="topic-card accent-blue">
                <h3><span class="card-icon">📚</span> Multi-Layer Perceptrons (MLPs)</h3>
                <p>Stacking neurons into layers creates an MLP. We have an input layer, one or more hidden layers, and an output layer. In a dense (fully connected) network, every neuron in layer $L$ is connected to every neuron in layer $L+1$.</p>
                <p>This allows the network to learn compositional features. Lower layers might detect edges, middle layers shapes, and higher layers complete objects.</p>
            </div>
            
            <div class="topic-card accent-amber">
                <h3><span class="card-icon">🧮</span> Forward Propagation (Matrix Form)</h3>
                <p>Instead of calculating each neuron individually, we use matrix multiplication for efficiency. For a layer $l$:</p>
                <div class="math-block"><span class="math-display">\\mathbf{Z}^{[l]} = \\mathbf{W}^{[l]}\\mathbf{A}^{[l-1]} + \\mathbf{b}^{[l]}</span></div>
                <div class="math-block"><span class="math-display">\\mathbf{A}^{[l]} = g^{[l]}(\\mathbf{Z}^{[l]})</span></div>
                <p>Where $\\mathbf{W}^{[l]}$ is the weight matrix, $\\mathbf{A}^{[l-1]}$ is the input from the previous layer, and $g^{[l]}$ is the activation function. This formulation is highly optimized in modern libraries like PyTorch and TensorFlow using BLAS (Basic Linear Algebra Subprograms).</p>
            </div>
            
            <div class="topic-card accent-purple">
                <h3><span class="card-icon">🌌</span> Universal Approximation Theorem</h3>
                <p>The Universal Approximation Theorem states that a feed-forward network with a single hidden layer containing a finite number of neurons can approximate continuous functions on compact subsets of $\\mathbb{R}^n$, under mild assumptions on the activation function.</p>
                <p>However, it doesn't guarantee that the network is learnable via backpropagation, or that it won't require an infeasibly large number of neurons. This is why we use <strong>deep</strong> networks instead of <strong>wide</strong> networks: deep networks can express complex functions much more efficiently.</p>
            </div>
            
            <div class="topic-card">
                <h3>Interactive Demo: Build-a-Neuron</h3>
                <p>Visualize the forward pass. Watch the data flow from inputs, through weights, into the summation, and out through the activation function.</p>
                <canvas id="demo-canvas-2" width="900" height="450" style="background: #080818; border-radius: 8px;"></canvas>
            </div>
            
            <div class="key-takeaway">
                <h4>Key Takeaways</h4>
                <ul>
                    <li>Matrix multiplication makes forward propagation highly parallelizable.</li>
                    <li>Deep networks are exponentially more expressive than wide networks.</li>
                    <li>The transition from step functions to continuous differentiable functions unlocked gradient-based learning.</li>
                </ul>
            </div>
        `,
        initDemo: function(container) {
            const canvas = document.getElementById('demo-canvas-2');
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            
            let frameId;
            let time = 0;
            
            function draw() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                // Draw Network Nodes
                const startX = 150;
                const hiddenX = 450;
                const outX = 750;
                
                // Input nodes
                for (let i = 0; i < 3; i++) {
                    const y = 100 + i * 125;
                    // Connections
                    ctx.beginPath();
                    ctx.moveTo(startX, y);
                    ctx.lineTo(hiddenX, 225);
                    ctx.strokeStyle = \`rgba(52, 211, 153, \${0.3 + Math.sin(time + i) * 0.2})\`;
                    ctx.lineWidth = 2;
                    ctx.stroke();
                    
                    // Nodes
                    ctx.beginPath();
                    ctx.arc(startX, y, 20, 0, Math.PI * 2);
                    ctx.fillStyle = '#0F172A';
                    ctx.fill();
                    ctx.strokeStyle = '#34D399';
                    ctx.stroke();
                    
                    // Moving pulse
                    const pulsePos = (time % 2) / 2;
                    const pX = startX + (hiddenX - startX) * pulsePos;
                    const pY = y + (225 - y) * pulsePos;
                    ctx.beginPath();
                    ctx.arc(pX, pY, 5, 0, Math.PI * 2);
                    ctx.fillStyle = '#34D399';
                    ctx.fill();
                }
                
                // Hidden node to output
                ctx.beginPath();
                ctx.moveTo(hiddenX, 225);
                ctx.lineTo(outX, 225);
                ctx.strokeStyle = '#A855F7';
                ctx.stroke();
                
                const pulsePos2 = ((time - 1) % 2) / 2;
                if (pulsePos2 > 0) {
                    const pX = hiddenX + (outX - hiddenX) * pulsePos2;
                    const pY = 225;
                    ctx.beginPath();
                    ctx.arc(pX, pY, 6, 0, Math.PI * 2);
                    ctx.fillStyle = '#A855F7';
                    ctx.fill();
                }
                
                // Hidden Node
                ctx.beginPath();
                ctx.arc(hiddenX, 225, 40, 0, Math.PI * 2);
                ctx.fillStyle = '#0F172A';
                ctx.fill();
                ctx.strokeStyle = '#A855F7';
                ctx.stroke();
                ctx.fillStyle = '#fff';
                ctx.font = '16px Arial';
                ctx.fillText('Σ & f(x)', hiddenX - 25, 230);
                
                // Output node
                ctx.beginPath();
                ctx.arc(outX, 225, 20, 0, Math.PI * 2);
                ctx.fillStyle = '#0F172A';
                ctx.fill();
                ctx.strokeStyle = '#FBBF24';
                ctx.stroke();
                
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
