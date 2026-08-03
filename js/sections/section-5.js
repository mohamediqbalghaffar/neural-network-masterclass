(function() {
    'use strict';

    NeuralApp.registerSection({
        id: 5,
        title: "Regularization & Generalization",
        icon: "🛡️",
        content: `
            <div class="content-grid">
                <div class="topic-card accent-cyan">
                    <h3><span class="card-icon">🧠</span> The Bias-Variance Tradeoff</h3>
                    <p>In deep learning, models are heavily over-parameterized. The classical U-shaped bias-variance curve tells us that as model complexity increases, training error goes down but testing error goes up (overfitting). However, neural networks often exhibit "double descent" where extreme over-parameterization eventually improves test performance again.</p>
                    
                    <div class="highlight-box info">
                        <div class="highlight-title">Analytics Connection</div>
                        <p>If you've used Random Forests to reduce variance compared to single Decision Trees, you're familiar with ensemble methods. Many regularization techniques in deep learning (like Dropout) implicitly act as vast ensemble methods, averaging over millions of sub-networks.</p>
                    </div>
                </div>

                <div class="topic-card accent-pink">
                    <h3><span class="card-icon">🎲</span> Dropout</h3>
                    <p>Dropout is a stochastic regularization technique where randomly selected neurons are ignored during training. This forces the network to learn redundant representations and prevents complex co-adaptations between specific neurons.</p>
                    
                    <div class="math-block">
                        <span class="math-display">
                            y = f(W(x \\\\odot r) + b) \\\\quad \\\\text{where } r_i \\\\sim \\\\text{Bernoulli}(p)
                        </span>
                    </div>
                    
                    <p>During inference, dropout is turned off, and the weights are scaled by the dropout probability <span class="math-inline">p</span> to match the expected values.</p>

                    <div class="code-block">
                        <div class="code-block-header">PyTorch Example</div>
                        <pre><code><span class="code-keyword">import</span> torch.nn <span class="code-keyword">as</span> nn

<span class="code-keyword">class</span> <span class="code-class">RegularizedNetwork</span>(nn.Module):
    <span class="code-keyword">def</span> <span class="code-function">__init__</span>(self):
        <span class="code-built_in">super</span>().__init__()
        self.fc1 = nn.Linear(<span class="code-number">784</span>, <span class="code-number">256</span>)
        self.dropout = nn.Dropout(p=<span class="code-number">0.5</span>) <span class="code-comment"># 50% chance to drop</span>
        self.fc2 = nn.Linear(<span class="code-number">256</span>, <span class="code-number">10</span>)</code></pre>
                    </div>
                </div>
            </div>

            <div class="topic-card accent-emerald">
                <h3><span class="card-icon">📏</span> Normalization Layers</h3>
                <p>Training deep networks is difficult due to "internal covariate shift" — the distribution of each layer's inputs changes during training. Normalization techniques stabilize this by standardizing intermediate activations.</p>

                <div class="comparison-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Method</th>
                                <th>Mechanism</th>
                                <th>Best For</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Batch Normalization</strong></td>
                                <td>Normalizes across the batch dimension. Computes mean/variance for each feature across the batch.</td>
                                <td>CNNs, feedforward networks. (Struggles with small batch sizes).</td>
                            </tr>
                            <tr>
                                <td><strong>Layer Normalization</strong></td>
                                <td>Normalizes across the feature dimension for each independent sequence/example.</td>
                                <td>Transformers, RNNs, small batch sizes.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="math-block">
                    <span class="math-display">
                        \\\\hat{x}_i = \\\\frac{x_i - \\\\mu}{\\\\sqrt{\\\\sigma^2 + \\\\epsilon}}, \\\\quad y_i = \\\\gamma \\\\hat{x}_i + \\\\beta
                    </span>
                </div>
                <p>The learnable parameters <span class="math-inline">\\\\gamma</span> and <span class="math-inline">\\\\beta</span> allow the network to undo the normalization if the standardized features are not optimal for the next layer.</p>
            </div>
            
            <div class="topic-card accent-amber">
                <h3><span class="card-icon">⚖️</span> L1 & L2 Regularization (Weight Decay)</h3>
                <p>Just like Ridge and Lasso regression, we can add a penalty term to the loss function to constrain the size of the weights.</p>
                
                <div class="tabs">
                    <div class="tab-nav">
                        <button class="tab-btn active" data-tab="l2-reg">L2 (Ridge)</button>
                        <button class="tab-btn" data-tab="l1-reg">L1 (Lasso)</button>
                    </div>
                    <div class="tab-panel active" id="l2-reg">
                        <h4>L2 Regularization (Weight Decay)</h4>
                        <p>Penalizes the squared magnitude of weights. Encourages the network to use all inputs a little bit, rather than heavily relying on a single input. Smooths the loss surface.</p>
                        <div class="math-block">
                            <span class="math-display">
                                L_{total} = L_{data} + \\\\frac{\\\\lambda}{2} \\\\sum w_i^2
                            </span>
                        </div>
                    </div>
                    <div class="tab-panel" id="l1-reg">
                        <h4>L1 Regularization</h4>
                        <p>Penalizes the absolute magnitude of weights. Promotes sparsity, driving many weights exactly to zero. Useful for feature selection.</p>
                        <div class="math-block">
                            <span class="math-display">
                                L_{total} = L_{data} + \\\\lambda \\\\sum |w_i|
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="topic-card accent-purple">
                <h3><span class="card-icon">📈</span> Interactive Demo: Overfitting Simulator</h3>
                <p>Watch how training and validation loss curves evolve over epochs. Tweak model complexity and add regularization (Dropout, L2 Weight Decay) to observe how you can close the generalization gap.</p>
                <p><em>(See the live demo below)</em></p>
            </div>

            <div class="key-takeaway">
                <h4>🔑 Key Takeaways</h4>
                <ul>
                    <li>Deep learning models naturally overfit because they have vastly more parameters than training samples.</li>
                    <li><strong>Regularization</strong> is any modification intended to reduce test error, even at the cost of increased training error.</li>
                    <li>Always monitor <strong>validation loss</strong> to detect overfitting. <strong>Early Stopping</strong> is the simplest and most effective regularization technique.</li>
                </ul>
            </div>
        `,
        initDemo: function(container) {
            const canvas = container.querySelector('canvas');
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            
            const controlsDiv = document.createElement('div');
            controlsDiv.className = 'demo-controls';
            controlsDiv.style.marginBottom = '15px';
            controlsDiv.innerHTML = `
                <label style="color:#fff; font-size:14px; margin-right:10px;">Model Complexity: <span id="complexity-val">Medium</span>
                    <input type="range" id="complexity-slider" min="1" max="10" step="1" value="5" style="vertical-align:middle; width:100px;">
                </label>
                <label style="color:#fff; font-size:14px; margin-right:10px;">
                    <input type="checkbox" id="dropout-toggle" style="vertical-align:middle;"> Enable Dropout (p=0.5)
                </label>
                <label style="color:#fff; font-size:14px; margin-right:10px;">
                    <input type="checkbox" id="l2-toggle" style="vertical-align:middle;"> Enable L2 Reg (λ=1e-4)
                </label>
                <button id="retrain-btn" class="demo-btn">Retrain Model</button>
            `;
            container.insertBefore(controlsDiv, container.querySelector('.demo-canvas-container'));
            
            const complexitySlider = controlsDiv.querySelector('#complexity-slider');
            const complexityVal = controlsDiv.querySelector('#complexity-val');
            const dropoutToggle = controlsDiv.querySelector('#dropout-toggle');
            const l2Toggle = controlsDiv.querySelector('#l2-toggle');
            const retrainBtn = controlsDiv.querySelector('#retrain-btn');
            
            let reqId;
            let epoch = 0;
            const maxEpochs = 200;
            let trainLossHistory = [];
            let valLossHistory = [];
            
            let targetTrainLoss = [];
            let targetValLoss = [];
            
            const generateCurves = () => {
                const complexity = parseInt(complexitySlider.value);
                const useDropout = dropoutToggle.checked;
                const useL2 = l2Toggle.checked;
                
                let complexityStr = "Medium";
                if (complexity <= 3) complexityStr = "Low (Underfitting risk)";
                else if (complexity >= 8) complexityStr = "High (Overfitting risk)";
                complexityVal.innerText = complexityStr;
                
                targetTrainLoss = [];
                targetValLoss = [];
                
                // Base loss curves simulation
                for (let i = 0; i <= maxEpochs; i++) {
                    const x = i / maxEpochs;
                    
                    // The more complex, the faster and lower train loss goes
                    const trainDecay = 3 + complexity * 0.5;
                    let tLoss = 1.0 * Math.exp(-trainDecay * x) + 0.1 * (10 - complexity)/10;
                    
                    // Regularization adds a bit of irreducible bias/training loss
                    if (useDropout) tLoss += 0.05;
                    if (useL2) tLoss += 0.02;
                    
                    // Val loss starts following train loss, then might diverge based on complexity & regularization
                    let overfitFactor = (complexity - 3) * 0.1;
                    if (overfitFactor < 0) overfitFactor = 0;
                    
                    // Regularization mitigates overfitting
                    if (useDropout) overfitFactor *= 0.3;
                    if (useL2) overfitFactor *= 0.5;
                    
                    let vLoss = tLoss + 0.05 + overfitFactor * Math.pow(x, 2) * 2;
                    
                    // Add some noise
                    tLoss += (Math.random() - 0.5) * 0.01;
                    vLoss += (Math.random() - 0.5) * 0.02;
                    
                    targetTrainLoss.push(Math.max(0.01, tLoss));
                    targetValLoss.push(Math.max(0.01, vLoss));
                }
            };
            
            const startTraining = () => {
                epoch = 0;
                trainLossHistory = [];
                valLossHistory = [];
                generateCurves();
            };
            
            complexitySlider.addEventListener('input', startTraining);
            dropoutToggle.addEventListener('change', startTraining);
            l2Toggle.addEventListener('change', startTraining);
            retrainBtn.addEventListener('click', startTraining);
            
            startTraining();
            
            const drawAxis = () => {
                const margin = 50;
                ctx.strokeStyle = '#64748B';
                ctx.lineWidth = 1;
                
                // X axis
                ctx.beginPath();
                ctx.moveTo(margin, canvas.height - margin);
                ctx.lineTo(canvas.width - margin, canvas.height - margin);
                ctx.stroke();
                
                // Y axis
                ctx.beginPath();
                ctx.moveTo(margin, canvas.height - margin);
                ctx.lineTo(margin, margin);
                ctx.stroke();
                
                ctx.fillStyle = '#E2E8F0';
                ctx.font = '14px system-ui';
                ctx.fillText('Epochs', canvas.width / 2, canvas.height - 15);
                
                ctx.save();
                ctx.translate(20, canvas.height / 2);
                ctx.rotate(-Math.PI / 2);
                ctx.fillText('Loss', 0, 0);
                ctx.restore();
            };
            
            const drawLegend = () => {
                ctx.fillStyle = '#00CFFD';
                ctx.fillRect(canvas.width - 200, 40, 15, 15);
                ctx.fillStyle = '#E2E8F0';
                ctx.fillText('Training Loss', canvas.width - 175, 53);
                
                ctx.fillStyle = '#F472B6';
                ctx.fillRect(canvas.width - 200, 70, 15, 15);
                ctx.fillStyle = '#E2E8F0';
                ctx.fillText('Validation Loss', canvas.width - 175, 83);
            };
            
            const animate = () => {
                if (epoch < maxEpochs) {
                    trainLossHistory.push(targetTrainLoss[epoch]);
                    valLossHistory.push(targetValLoss[epoch]);
                    epoch += 2; // Speed up animation
                }
                
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawAxis();
                drawLegend();
                
                const margin = 50;
                const plotW = canvas.width - 2 * margin;
                const plotH = canvas.height - 2 * margin;
                const maxLoss = 1.5;
                
                const mapX = (ep) => margin + (ep / maxEpochs) * plotW;
                const mapY = (val) => canvas.height - margin - (val / maxLoss) * plotH;
                
                // Draw training curve
                if (trainLossHistory.length > 0) {
                    ctx.beginPath();
                    ctx.moveTo(mapX(0), mapY(trainLossHistory[0]));
                    for(let i=1; i<trainLossHistory.length; i++) {
                        ctx.lineTo(mapX(i*2), mapY(trainLossHistory[i]));
                    }
                    ctx.strokeStyle = '#00CFFD';
                    ctx.lineWidth = 3;
                    ctx.stroke();
                }
                
                // Draw validation curve
                if (valLossHistory.length > 0) {
                    ctx.beginPath();
                    ctx.moveTo(mapX(0), mapY(valLossHistory[0]));
                    for(let i=1; i<valLossHistory.length; i++) {
                        ctx.lineTo(mapX(i*2), mapY(valLossHistory[i]));
                    }
                    ctx.strokeStyle = '#F472B6';
                    ctx.lineWidth = 3;
                    ctx.stroke();
                }
                
                reqId = requestAnimationFrame(animate);
            };
            
            animate();
            
            this._reqId = reqId;
        },
        destroyDemo: function() {
            if (this._reqId) {
                cancelAnimationFrame(this._reqId);
            }
        }
    });

})();
