(function() {
    'use strict';

    NeuralApp.registerSection({
        id: 1,
        title: "From Analytics to Neural Networks",
        icon: "🌉",
        content: `
            <div class="topic-card accent-cyan">
                <h3><span class="card-icon">📈</span> Linear Regression to Perceptrons</h3>
                <p>If you're comfortable with linear regression, you already understand the foundation of neural networks. A single neuron (perceptron) without an activation function is mathematically identical to a linear regression model.</p>
                
                <div class="math-block"><span class="math-display">\\hat{y} = w_1x_1 + w_2x_2 + ... + w_nx_n + b = \\sum_{i=1}^{n} w_ix_i + b</span></div>
                
                <p>In analytics terminology, $w_i$ are your coefficients and $b$ is your intercept. In deep learning, $w_i$ are <strong>weights</strong> and $b$ is the <strong>bias</strong>.</p>
            </div>
            
            <div class="topic-card accent-purple">
                <h3><span class="card-icon">🔌</span> Logistic Regression to Sigmoid</h3>
                <p>Logistic regression introduces non-linearity to map predictions to probabilities between 0 and 1 using the expit (logistic) function.</p>
                <p>A neuron becomes a logistic regression model when we pass its linear output $z$ through a sigmoid activation function $\\sigma(z)$.</p>
                <div class="math-block"><span class="math-display">\\sigma(z) = \\frac{1}{1 + e^{-z}}</span></div>
            </div>
            
            <div class="topic-card accent-pink">
                <h3><span class="card-icon">🛠️</span> Feature Engineering vs. Learned Representations</h3>
                <p>In traditional analytics, data scientists spend most of their time crafting features (e.g., polynomial features, interaction terms) so that linear models can capture complex relationships.</p>
                <p>Neural networks, specifically Multi-Layer Perceptrons (MLPs), automate this. Each hidden layer acts as an automatic feature extractor, creating progressively more abstract and useful representations of the raw data.</p>
                
                <div class="comparison-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Traditional Analytics</th>
                                <th>Deep Learning</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Manual feature engineering</td>
                                <td>End-to-end representation learning</td>
                            </tr>
                            <tr>
                                <td>Interpretable coefficients</td>
                                <td>Black-box weights</td>
                            </tr>
                            <tr>
                                <td>Struggles with raw perceptual data (images/audio)</td>
                                <td>Excels at raw unstructured data</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div class="topic-card accent-amber">
                <h3><span class="card-icon">⚠️</span> When Classical ML Fails</h3>
                <p>Classical models struggle with the XOR problem—a simple non-linear logical operation. A single linear decision boundary cannot separate XOR classes. This limitation famously led to the first "AI Winter". Adding just one hidden layer gives the network the capacity to learn non-linear boundaries.</p>
                
                <div class="highlight-box tip">
                    <div class="highlight-title">Analytics Connection</div>
                    <p>Think of hidden neurons as learned interaction terms. Instead of manually specifying $x_1 \\times x_2$, the network learns which interactions are useful for the task.</p>
                </div>
            </div>
            
            <div class="topic-card">
                <h3>Interactive Demo: Fitting Non-Linearity</h3>
                <p>Watch how adding hidden neurons allows a neural network to fit a complex curve, while a linear model can only draw a straight line.</p>
                <p><em>(See the live demo below)</em></p>
            </div>
            
            <div class="key-takeaway">
                <h4>Key Takeaways</h4>
                <ul>
                    <li>A single neuron is a linear regression model; with a sigmoid, it's logistic regression.</li>
                    <li>Deep learning replaces manual feature engineering with hierarchical representation learning.</li>
                    <li>Hidden layers provide the non-linearity needed to solve complex problems like XOR.</li>
                </ul>
            </div>
        `,
        initDemo: function(container) {
            const canvas = document.getElementById('demo-canvas-1');
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            
            let frameId;
            let time = 0;
            
            function draw() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                // Draw axes
                ctx.strokeStyle = '#334155';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(0, canvas.height / 2);
                ctx.lineTo(canvas.width, canvas.height / 2);
                ctx.stroke();
                
                // True underlying non-linear function
                ctx.strokeStyle = '#00CFFD';
                ctx.lineWidth = 2;
                ctx.beginPath();
                for (let x = 0; x < canvas.width; x++) {
                    const normalizedX = (x / canvas.width) * 10 - 5;
                    const y = Math.sin(normalizedX) * 2 + Math.cos(normalizedX * 2);
                    const screenY = canvas.height / 2 - y * 40;
                    if (x === 0) ctx.moveTo(x, screenY);
                    else ctx.lineTo(x, screenY);
                }
                ctx.stroke();
                
                // Animated Neural Network fit (wiggles and approaches true curve)
                ctx.strokeStyle = '#F472B6';
                ctx.setLineDash([5, 5]);
                ctx.beginPath();
                for (let x = 0; x < canvas.width; x++) {
                    const normalizedX = (x / canvas.width) * 10 - 5;
                    const trueY = Math.sin(normalizedX) * 2 + Math.cos(normalizedX * 2);
                    // Add some noise that decreases over time to simulate learning
                    const noise = Math.sin(x * 0.1 + time) * Math.exp(-time * 0.01) * 2;
                    const screenY = canvas.height / 2 - (trueY + noise) * 40;
                    
                    if (x === 0) ctx.moveTo(x, screenY);
                    else ctx.lineTo(x, screenY);
                }
                ctx.stroke();
                ctx.setLineDash([]);
                
                // Legend
                ctx.fillStyle = '#00CFFD';
                ctx.font = '14px Arial';
                ctx.fillText('True Data Distribution', 20, 30);
                
                ctx.fillStyle = '#F472B6';
                ctx.fillText('Neural Network Fit', 20, 50);
                
                time += 0.05;
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
