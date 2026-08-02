(function() {
    'use strict';

    NeuralApp.registerSection({
        id: 8,
        title: "Transformers & Attention",
        icon: "🤖",
        content: `
            <div class="content-grid">
                <div class="topic-card accent-cyan">
                    <h3><span class="card-icon">🎯</span> Self-Attention Mechanism</h3>
                    <p>The core of the Transformer architecture is the <strong>Self-Attention</strong> mechanism. Unlike RNNs that process sequences step-by-step, attention computes a weighted sum of all sequence elements simultaneously, allowing it to capture long-range dependencies effectively.</p>
                    <p>We compute three vectors for each input: <strong>Query (Q)</strong>, <strong>Key (K)</strong>, and <strong>Value (V)</strong>.</p>
                    
                    <div class="math-block">
                        <span class="math-display">\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{Q K^T}{\\sqrt{d_k}}\\right) V</span>
                    </div>
                    
                    <div class="collapsible">
                        <button class="collapsible-trigger">Why scale by \\(\\sqrt{d_k}\\)? <span class="chevron">▼</span></button>
                        <div class="collapsible-content">
                            <div class="collapsible-content-inner">
                                <p>When the dimensionality \\(d_k\\) is large, the dot products \\(Q K^T\\) grow large in magnitude, pushing the softmax function into regions where it has extremely small gradients. Scaling by \\(\\sqrt{d_k}\\) counteracts this effect, keeping the variance of the dot products around 1.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="topic-card accent-purple">
                    <h3><span class="card-icon">🔀</span> Multi-Head Attention</h3>
                    <p>Instead of performing a single attention function, Transformers use <strong>Multi-Head Attention</strong> to jointly attend to information from different representation subspaces at different positions.</p>
                    <div class="math-block">
                        <span class="math-display">\\text{MultiHead}(Q, K, V) = \\text{Concat}(\\text{head}_1, \\dots, \\text{head}_h)W^O</span>
                    </div>
                    <p>Where each head is:</p>
                    <div class="math-block">
                        <span class="math-display">\\text{head}_i = \\text{Attention}(QW_i^Q, KW_i^K, VW_i^V)</span>
                    </div>
                </div>

                <div class="topic-card accent-pink">
                    <h3><span class="card-icon">📍</span> Positional Encoding</h3>
                    <p>Since Transformers don't have built-in recurrence or convolution, they have no notion of token order. <strong>Positional encodings</strong> are injected into the input embeddings to provide relative or absolute position information.</p>
                    <p>Original Sinusoidal Encoding:</p>
                    <div class="math-block">
                        <span class="math-display">PE_{(pos, 2i)} = \\sin(pos / 10000^{2i/d_{\\text{model}}})</span>
                    </div>
                    <div class="math-block">
                        <span class="math-display">PE_{(pos, 2i+1)} = \\cos(pos / 10000^{2i/d_{\\text{model}}})</span>
                    </div>
                </div>

                <div class="topic-card accent-emerald">
                    <h3><span class="card-icon">🏗️</span> The Transformer Architecture</h3>
                    <p>The full architecture consists of an Encoder and a Decoder.</p>
                    <ul>
                        <li><strong>Encoder:</strong> Self-Attention → Feed-Forward (with residual connections and layer normalization).</li>
                        <li><strong>Decoder:</strong> Masked Self-Attention → Encoder-Decoder Attention → Feed-Forward.</li>
                    </ul>
                    
                    <div class="highlight-box info">
                        <div class="highlight-title">Analytics Connection: Graph Operations</div>
                        <p>Self-attention can be viewed as routing information over a complete graph where edges are dynamically weighted by the similarity (dot product) between node representations. This is highly related to graph analytics and similarity matrix operations.</p>
                    </div>
                </div>
            </div>

            <div class="topic-card accent-amber" style="margin-top: 1.5rem;">
                <h3><span class="card-icon">📊</span> BERT vs GPT vs ViT</h3>
                
                <table class="comparison-table">
                    <thead>
                        <tr>
                            <th>Model Family</th>
                            <th>Architecture</th>
                            <th>Objective</th>
                            <th>Use Case</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>BERT</strong> (Google)</td>
                            <td>Encoder-only</td>
                            <td>Masked Language Modeling (MLM)</td>
                            <td>Text classification, NER, embedding extraction</td>
                        </tr>
                        <tr>
                            <td><strong>GPT</strong> (OpenAI)</td>
                            <td>Decoder-only</td>
                            <td>Causal / Next-token Prediction</td>
                            <td>Text generation, dialogue, coding</td>
                        </tr>
                        <tr>
                            <td><strong>ViT</strong> (Vision)</td>
                            <td>Encoder-only</td>
                            <td>Image patch classification</td>
                            <td>Image classification, object detection</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="topic-card accent-cyan" style="margin-top: 1.5rem;">
                <h3><span class="card-icon">🎮</span> Interactive Demo: Attention Heatmap</h3>
                <p>Click on words in the sentence to see how the Self-Attention mechanism assigns weight to other words.</p>
                <div class="demo-container" style="position: relative; width: 100%; height: 450px; background: #080818; border-radius: 8px; overflow: hidden; margin-top: 1rem;">
                    <canvas id="demo-canvas-8" width="900" height="450" style="display: block; width: 100%; height: 100%;"></canvas>
                    <div id="demo-controls-8" style="position: absolute; bottom: 10px; left: 10px; display: flex; gap: 10px; flex-wrap: wrap;"></div>
                </div>
            </div>

            <div class="key-takeaway">
                <h4>Key Takeaways</h4>
                <ul>
                    <li>Attention routes information dynamically based on content similarity rather than strict sequential processing.</li>
                    <li>The \\(\\mathcal{O}(N^2)\\) complexity of attention is its main bottleneck for long sequences.</li>
                    <li>The Transformer has become the universal architecture spanning text, vision, and audio.</li>
                </ul>
            </div>
        `,
        initDemo: function(container) {
            const canvas = document.getElementById('demo-canvas-8');
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            let animationId;
            let time = 0;

            const sentence = ["The", "cat", "sat", "on", "the", "mat"];
            // Dummy attention matrix (symmetric for illustration)
            const attentionMatrix = [
                [0.9, 0.1, 0.0, 0.0, 0.0, 0.0],
                [0.1, 0.5, 0.3, 0.0, 0.0, 0.1],
                [0.0, 0.3, 0.5, 0.1, 0.0, 0.1],
                [0.0, 0.0, 0.1, 0.6, 0.2, 0.1],
                [0.0, 0.0, 0.0, 0.2, 0.4, 0.4],
                [0.0, 0.1, 0.1, 0.1, 0.4, 0.3],
            ];

            let selectedWordIdx = 1; // Default "cat"
            const wordBoxes = [];

            // Calculate layout
            const padding = 50;
            const width = canvas.width;
            const height = canvas.height;
            const wordWidth = (width - 2 * padding) / sentence.length;

            sentence.forEach((word, i) => {
                wordBoxes.push({
                    word,
                    x: padding + i * wordWidth,
                    y: height / 4,
                    w: wordWidth - 10,
                    h: 40
                });
            });

            // Handle clicks
            const handleCanvasClick = (e) => {
                const rect = canvas.getBoundingClientRect();
                const x = (e.clientX - rect.left) * (canvas.width / rect.width);
                const y = (e.clientY - rect.top) * (canvas.height / rect.height);

                for (let i = 0; i < wordBoxes.length; i++) {
                    const b = wordBoxes[i];
                    if (x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h) {
                        selectedWordIdx = i;
                        break;
                    }
                }
            };
            canvas.addEventListener('click', handleCanvasClick);
            this._cleanupClick = () => canvas.removeEventListener('click', handleCanvasClick);

            function draw() {
                ctx.clearRect(0, 0, width, height);
                time += 0.02;

                // Draw heatmaps (lines from selected word)
                const sourceBox = wordBoxes[selectedWordIdx];
                
                // Lines to targets
                for (let i = 0; i < sentence.length; i++) {
                    const targetBox = wordBoxes[i];
                    const weight = attentionMatrix[selectedWordIdx][i];
                    
                    if (weight > 0) {
                        ctx.beginPath();
                        ctx.moveTo(sourceBox.x + sourceBox.w/2, sourceBox.y + sourceBox.h);
                        
                        const cp1x = sourceBox.x + sourceBox.w/2;
                        const cp1y = sourceBox.y + sourceBox.h + 100;
                        const cp2x = targetBox.x + targetBox.w/2;
                        const cp2y = height * 0.7 - 100;
                        
                        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, targetBox.x + targetBox.w/2, height * 0.7);
                        
                        // Pulse effect based on weight
                        const alpha = weight * (0.5 + 0.5 * Math.sin(time * 3 + i));
                        ctx.strokeStyle = \`rgba(0, 207, 253, \${alpha})\`;
                        ctx.lineWidth = weight * 10;
                        ctx.stroke();
                        
                        // Draw target box
                        ctx.fillStyle = \`rgba(0, 207, 253, \${weight * 0.5})\`;
                        ctx.fillRect(targetBox.x, height * 0.7 - 20, targetBox.w, 40);
                        
                        ctx.fillStyle = '#E2E8F0';
                        ctx.font = '16px sans-serif';
                        ctx.textAlign = 'center';
                        ctx.fillText(sentence[i], targetBox.x + targetBox.w/2, height * 0.7 + 6);
                        
                        // Weight text
                        ctx.fillStyle = '#A855F7';
                        ctx.fillText(weight.toFixed(2), targetBox.x + targetBox.w/2, height * 0.7 + 40);
                    }
                }

                // Draw source words
                for (let i = 0; i < wordBoxes.length; i++) {
                    const b = wordBoxes[i];
                    const isSelected = i === selectedWordIdx;
                    
                    ctx.fillStyle = isSelected ? 'rgba(168, 85, 247, 0.4)' : 'rgba(100, 116, 139, 0.2)';
                    ctx.strokeStyle = isSelected ? '#A855F7' : '#64748B';
                    ctx.lineWidth = 2;
                    ctx.fillRect(b.x, b.y, b.w, b.h);
                    ctx.strokeRect(b.x, b.y, b.w, b.h);
                    
                    ctx.fillStyle = isSelected ? '#FFFFFF' : '#E2E8F0';
                    ctx.font = '18px sans-serif';
                    ctx.textAlign = 'center';
                    ctx.fillText(b.word, b.x + b.w/2, b.y + 26);
                }

                animationId = requestAnimationFrame(draw);
            }
            
            draw();
            this._animationId = animationId;
        },
        destroyDemo: function() {
            if (this._animationId) cancelAnimationFrame(this._animationId);
            if (this._cleanupClick) this._cleanupClick();
        }
    });
})();
