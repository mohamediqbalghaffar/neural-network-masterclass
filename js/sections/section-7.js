(function() {
    'use strict';

    NeuralApp.registerSection({
        id: 7,
        title: "Recurrent Networks & Sequence Models",
        icon: "📝",
        content: `
            <div class="content-grid">
                <div class="topic-card accent-purple">
                    <h3><span class="card-icon">🔄</span> Vanilla RNNs</h3>
                    <p>Unlike standard feedforward networks, Recurrent Neural Networks (RNNs) have loops, allowing information to persist. They process sequences by maintaining a <strong>hidden state</strong> that acts as the network's "memory" over time steps.</p>
                    
                    <div class="math-block">
                        <span class="math-display">h_t = \\tanh(W_{hh} h_{t-1} + W_{xh} x_t + b_h)</span>
                        <span class="math-display">y_t = W_{hy} h_t + b_y</span>
                    </div>

                    <p>Crucially, an RNN uses <strong>shared weights</strong> ($W_{hh}, W_{xh}$) across all time steps, allowing it to generalize to sequences of varying lengths.</p>
                </div>

                <div class="topic-card accent-cyan">
                    <h3><span class="card-icon">📉</span> The Vanishing Gradient Problem</h3>
                    <p>When training via Backpropagation Through Time (BPTT), the gradient of the loss with respect to early time steps involves repeated multiplication of the recurrent weight matrix $W_{hh}$.</p>
                    
                    <div class="math-block">
                        <span class="math-display">\\frac{\\partial h_t}{\\partial h_k} = \\prod_{i=k+1}^t \\frac{\\partial h_i}{\\partial h_{i-1}}</span>
                    </div>

                    <div class="highlight-box warning">
                        <h4 class="highlight-title">Long-Term Dependencies</h4>
                        <p>If the eigenvalues of $W_{hh}$ are $< 1$, the gradient shrinks exponentially to zero. The network "forgets" early context. If $> 1$, gradients explode. This makes vanilla RNNs fail at long sequence tasks.</p>
                    </div>
                </div>
            </div>

            <div class="topic-card accent-emerald">
                <h3><span class="card-icon">🧠</span> LSTMs & GRUs</h3>
                <p>Long Short-Term Memory (LSTM) networks solve the vanishing gradient problem by introducing an internal <strong>cell state</strong> ($C_t$) and gating mechanisms to control information flow.</p>
                
                <div class="tabs">
                    <div class="tab-nav">
                        <button class="tab-btn active" data-tab="tab-lstm">LSTM Architecture</button>
                        <button class="tab-btn" data-tab="tab-gru">GRU Architecture</button>
                    </div>
                    
                    <div class="tab-panel active" id="tab-lstm" style="padding-top: 1rem;">
                        <ul>
                            <li><strong>Forget Gate:</strong> Decides what information to discard from the cell state.</li>
                            <li><strong>Input Gate:</strong> Decides what new information to add to the cell state.</li>
                            <li><strong>Output Gate:</strong> Decides what to output based on the updated cell state.</li>
                        </ul>
                        <div class="math-block">
                            <span class="math-display">f_t = \\sigma(W_f \\cdot [h_{t-1}, x_t] + b_f)</span>
                            <span class="math-display">C_t = f_t * C_{t-1} + i_t * \\tilde{C}_t</span>
                        </div>
                    </div>
                    <div class="tab-panel" id="tab-gru" style="padding-top: 1rem;">
                        <p>Gated Recurrent Units (GRUs) simplify LSTMs by merging the cell state and hidden state, and combining the forget and input gates into a single <strong>update gate</strong>.</p>
                        <p>GRUs typically perform just as well as LSTMs but are faster to train due to fewer parameters.</p>
                    </div>
                </div>
            </div>

            <div class="content-grid">
                <div class="topic-card accent-pink">
                    <h3><span class="card-icon">🏗️</span> Seq2Seq Models</h3>
                    <p>Sequence-to-Sequence models use an <strong>Encoder-Decoder</strong> architecture, perfect for machine translation or forecasting.</p>
                    <div class="flow-diagram" style="font-size: 0.9rem;">
                        <div class="flow-node"><strong>Encoder</strong><br>Processes input seq</div>
                        <div class="flow-arrow">→ context vector →</div>
                        <div class="flow-node"><strong>Decoder</strong><br>Generates output seq</div>
                    </div>
                </div>

                <div class="topic-card accent-amber">
                    <h3><span class="card-icon">📊</span> Analytics Connection: Time-Series</h3>
                    <p>In traditional analytics, we use ARIMA or exponential smoothing for time-series. RNNs extend these by natively handling non-linear multivariate temporal relationships without manual feature engineering of lags.</p>
                </div>
            </div>

            <div class="topic-card accent-cyan">
                <h3><span class="card-icon">🎮</span> Interactive Demo: Unrolled RNN Over Time</h3>
                <p>Watch how the hidden state updates at each time step as the network processes the sequence "DATA". The color intensity indicates the magnitude of the hidden state vector.</p>
                <p><em>(See the live demo below)</em></p>
            </div>

            <div class="key-takeaway">
                <h4>Key Takeaways</h4>
                <ul>
                    <li><strong>Recurrence:</strong> RNNs process temporal/sequential data by feeding the hidden state back into itself.</li>
                    <li><strong>Gating solves vanishing gradients:</strong> LSTMs and GRUs use learnable gates to maintain "additive" pathways through time.</li>
                    <li><strong>Versatility:</strong> RNN topologies support one-to-many (captioning), many-to-one (sentiment), and many-to-many (translation/forecasting).</li>
                </ul>
            </div>
        `,
        initDemo: function(container) {
            const canvas = container.querySelector('canvas');
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            let animationId;
            let time = 0;

            const sequence = ['D', 'A', 'T', 'A'];
            const nodesCount = sequence.length;
            
            function drawNode(x, y, char, activeRatio, stepIdx) {
                ctx.save();
                ctx.translate(x, y);

                // Input Box
                ctx.fillStyle = '#1E293B';
                ctx.strokeStyle = activeRatio > 0 ? '#34D399' : '#475569';
                ctx.lineWidth = 2;
                ctx.fillRect(-25, 80, 50, 40);
                ctx.strokeRect(-25, 80, 50, 40);
                
                ctx.fillStyle = '#FFF';
                ctx.font = '16px monospace';
                ctx.textAlign = 'center';
                ctx.fillText(`x: '${char}'`, 0, 105);

                // RNN Cell Box
                // Color pulses based on active ratio
                let r = Math.round(168 + (0 - 168) * activeRatio);
                let g = Math.round(85 + (207 - 85) * activeRatio);
                let b = Math.round(247 + (253 - 247) * activeRatio);
                
                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.2 + activeRatio * 0.4})`;
                ctx.strokeStyle = `rgb(${r}, ${g}, ${b})`;
                ctx.beginPath();
                ctx.roundRect(-40, -30, 80, 60, 8);
                ctx.fill();
                ctx.stroke();

                ctx.fillStyle = '#FFF';
                ctx.font = 'bold 16px sans-serif';
                ctx.fillText(`RNN`, 0, -5);
                ctx.font = '12px sans-serif';
                ctx.fillText(`Step ${stepIdx}`, 0, 15);

                // Arrow from Input to RNN
                ctx.beginPath();
                ctx.moveTo(0, 80);
                ctx.lineTo(0, 30);
                ctx.strokeStyle = '#34D399';
                ctx.stroke();
                
                // Draw arrowhead
                ctx.beginPath();
                ctx.moveTo(-5, 40);
                ctx.lineTo(0, 30);
                ctx.lineTo(5, 40);
                ctx.stroke();

                ctx.restore();
            }

            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                time += 0.03;
                
                let currentStep = Math.floor(time) % (nodesCount + 1); // +1 for pause
                let stepProgress = time % 1.0;

                const startX = 150;
                const spacing = 200;

                for (let i = 0; i < nodesCount; i++) {
                    let cx = startX + i * spacing;
                    let cy = 150;
                    
                    let activeRatio = 0;
                    if (i < currentStep) activeRatio = 1;
                    else if (i === currentStep) activeRatio = stepProgress;

                    drawNode(cx, cy, sequence[i], activeRatio, i);

                    // Draw hidden state transfer arrow (horizontal)
                    if (i < nodesCount - 1) {
                        ctx.beginPath();
                        ctx.moveTo(cx + 40, cy);
                        
                        let targetX = cx + spacing - 40;
                        let lineProgress = i < currentStep ? 1 : (i === currentStep ? stepProgress : 0);
                        let drawX = cx + 40 + (targetX - (cx + 40)) * lineProgress;
                        
                        if (drawX > cx + 40) {
                            ctx.lineTo(drawX, cy);
                            ctx.strokeStyle = '#A855F7';
                            ctx.lineWidth = 3;
                            ctx.stroke();
                            
                            // Head
                            if (lineProgress > 0.95) {
                                ctx.beginPath();
                                ctx.moveTo(drawX - 10, cy - 5);
                                ctx.lineTo(drawX, cy);
                                ctx.lineTo(drawX - 10, cy + 5);
                                ctx.stroke();
                            }
                        }
                    }
                }

                // Global title
                ctx.fillStyle = '#E2E8F0';
                ctx.font = '18px sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText("Hidden State Flow Through Time ($h_t$)", canvas.width/2, 40);

                animationId = requestAnimationFrame(animate);
            }
            animate();
            
            this._animId = animationId;
        },
        destroyDemo: function() {
            if (this._animId) {
                cancelAnimationFrame(this._animId);
            }
        }
    });
})();
