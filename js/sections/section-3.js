(function() {
    'use strict';

    NeuralApp.registerSection({
        id: 3,
        title: "Activation & Loss Functions",
        icon: "⚡",
        content: `
            <div class="topic-card accent-cyan">
                <h3><span class="card-icon">📈</span> Activation Functions</h3>
                <p>Activation functions introduce non-linearity. Without them, a deep network is mathematically equivalent to a single linear transformation.</p>
                
                <div class="tabs">
                    <div class="tab-nav" style="display: flex; gap: 10px; margin-bottom: 10px;">
                        <button class="tab-btn active tag cyan">ReLU</button>
                        <button class="tab-btn tag purple">Sigmoid</button>
                        <button class="tab-btn tag pink">Tanh</button>
                    </div>
                    <div class="tab-panel active" style="padding: 10px; background: rgba(0,0,0,0.2); border-radius: 4px;">
                        <strong>Rectified Linear Unit (ReLU)</strong>
                        <div class="math-block"><span class="math-display">f(x) = \\max(0, x)</span></div>
                        <p>Standard for modern hidden layers. Prevents vanishing gradients for $x > 0$ and is computationally cheap.</p>
                    </div>
                </div>
            </div>
            
            <div class="topic-card accent-purple">
                <h3><span class="card-icon">📉</span> The Vanishing Gradient Problem</h3>
                <p>Sigmoid and Tanh squash inputs into a small range. For very large or small inputs, their derivatives approach zero. During backpropagation, these small gradients multiply across layers, causing gradients in early layers to vanish exponentially.</p>
                <div class="highlight-box warning">
                    <div class="highlight-title">Why not always ReLU?</div>
                    <p>ReLU can suffer from "Dying ReLUs" where neurons output zero for all inputs and stop updating. Variants like Leaky ReLU ($f(x) = \\max(\\alpha x, x)$) or GELU solve this.</p>
                </div>
            </div>
            
            <div class="topic-card accent-amber">
                <h3><span class="card-icon">🎯</span> Loss Functions</h3>
                <p>Loss functions quantify how wrong the model is. The choice of loss aligns with the statistical nature of your target variable.</p>
                
                <div class="comparison-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Task Type</th>
                                <th>Standard Loss Function</th>
                                <th>Analytics Equivalent</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Regression</td>
                                <td>Mean Squared Error (MSE)</td>
                                <td>OLS Regression</td>
                            </tr>
                            <tr>
                                <td>Binary Classification</td>
                                <td>Binary Cross-Entropy (BCE)</td>
                                <td>Log-Loss / Max Likelihood</td>
                            </tr>
                            <tr>
                                <td>Multi-class</td>
                                <td>Categorical Cross-Entropy</td>
                                <td>Multinomial Logistic</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div class="topic-card">
                <h3>Interactive Demo: Activation Visualizer</h3>
                <p>Observe the shape of common activation functions.</p>
                <canvas id="demo-canvas-3" width="900" height="450" style="background: #080818; border-radius: 8px;"></canvas>
            </div>
            
            <div class="key-takeaway">
                <h4>Key Takeaways</h4>
                <ul>
                    <li>ReLU is the default for hidden layers due to better gradient flow.</li>
                    <li>Loss functions should match your output distribution (Cross-Entropy for probabilities, MSE for continuous).</li>
                    <li>The synergy between the output activation and the loss function (e.g. Softmax + Cross-Entropy) ensures stable gradients.</li>
                </ul>
            </div>
        `,
        initDemo: function(container) {
            const canvas = document.getElementById('demo-canvas-3');
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            
            let frameId;
            let time = 0;
            
            function draw() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                // Grid
                ctx.strokeStyle = '#1E293B';
                ctx.beginPath();
                ctx.moveTo(0, canvas.height / 2);
                ctx.lineTo(canvas.width, canvas.height / 2);
                ctx.moveTo(canvas.width / 2, 0);
                ctx.lineTo(canvas.width / 2, canvas.height);
                ctx.stroke();
                
                // ReLU / Sigmoid morph
                ctx.strokeStyle = '#00CFFD';
                ctx.lineWidth = 3;
                ctx.beginPath();
                for (let x = 0; x < canvas.width; x++) {
                    const normX = (x - canvas.width/2) / 50;
                    // smoothly transition between relu and sigmoid based on time
                    const relu = Math.max(0, normX);
                    const sig = 1 / (1 + Math.exp(-normX));
                    const mix = (Math.sin(time) + 1) / 2;
                    
                    const val = relu * (1 - mix) + sig * mix;
                    
                    const screenY = canvas.height / 2 - val * 50;
                    if (x === 0) ctx.moveTo(x, screenY);
                    else ctx.lineTo(x, screenY);
                }
                ctx.stroke();
                
                ctx.fillStyle = '#00CFFD';
                ctx.font = '16px Arial';
                ctx.fillText('Morphing ReLU ↔ Sigmoid', 20, 30);
                
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
