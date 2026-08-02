(function() {
    'use strict';

    NeuralApp.registerSection({
        id: 9,
        title: "Generative Models & Modern AI",
        icon: "🎨",
        content: `
            <div class="content-grid">
                <div class="topic-card accent-cyan">
                    <h3><span class="card-icon">🗜️</span> Autoencoders</h3>
                    <p>Autoencoders are neural networks designed to learn efficient representations of data by compressing it to a lower-dimensional <strong>bottleneck</strong> and then reconstructing it.</p>
                    <p>They consist of an <strong>Encoder</strong> \\(E(x)\\) and a <strong>Decoder</strong> \\(D(z)\\). The loss is typically the Mean Squared Error of reconstruction.</p>
                    <div class="math-block">
                        <span class="math-display">\\mathcal{L} = ||x - D(E(x))||^2</span>
                    </div>
                    
                    <div class="highlight-box info">
                        <div class="highlight-title">Analytics Connection: Non-linear PCA</div>
                        <p>A linear autoencoder spanning a \\(k\\)-dimensional subspace learns the exact same span as Principal Component Analysis (PCA). Deep autoencoders are effectively powerful, non-linear versions of PCA used for advanced dimensionality reduction and feature extraction.</p>
                    </div>
                </div>

                <div class="topic-card accent-purple">
                    <h3><span class="card-icon">🎲</span> Variational Autoencoders (VAEs)</h3>
                    <p>Instead of mapping inputs to fixed vectors, VAEs map inputs to a <strong>probability distribution</strong> in the latent space. This regularizes the latent space and enables sampling of novel data.</p>
                    <div class="math-block">
                        <span class="math-display">\\mathcal{L}_{\\text{VAE}} = \\text{Reconstruction Loss} + D_{KL}(q_\\phi(z|x) || p(z))</span>
                    </div>
                    <p>The <strong>Reparameterization Trick</strong> is crucial here, allowing gradients to flow through the stochastic sampling process: \\(z = \\mu + \\sigma \\odot \\epsilon\\), where \\(\\epsilon \\sim \\mathcal{N}(0, I)\\).</p>
                </div>

                <div class="topic-card accent-pink">
                    <h3><span class="card-icon">⚔️</span> GANs</h3>
                    <p><strong>Generative Adversarial Networks (GANs)</strong> use two networks pitted against each other: a <strong>Generator (G)</strong> trying to create realistic data, and a <strong>Discriminator (D)</strong> trying to distinguish real data from fakes.</p>
                    <div class="math-block">
                        <span class="math-display">\\min_G \\max_D V(D, G) = \\mathbb{E}_{x}[\\log D(x)] + \\mathbb{E}_{z}[\\log(1 - D(G(z)))]</span>
                    </div>
                    <p>A common issue is <em>mode collapse</em>, where the Generator finds a single output that fools the Discriminator and stops generating diverse samples.</p>
                </div>

                <div class="topic-card accent-emerald">
                    <h3><span class="card-icon">🌫️</span> Diffusion Models</h3>
                    <p>Diffusion models iteratively destroy data by adding noise (Forward Process), then train a neural network to reverse this process by predicting and removing the noise step-by-step (Reverse Process).</p>
                    <div class="math-block">
                        <span class="math-display">\\text{Forward: } q(x_t | x_{t-1}) = \\mathcal{N}(x_t; \\sqrt{1-\\beta_t}x_{t-1}, \\beta_t I)</span>
                    </div>
                    <p>Diffusion models (like Stable Diffusion) offer better training stability than GANs and higher generation quality than VAEs.</p>
                </div>
            </div>

            <div class="topic-card accent-amber" style="margin-top: 1.5rem;">
                <h3><span class="card-icon">📝</span> Large Language Models (LLMs)</h3>
                <p>Modern LLMs are scaled-up autoregressive Transformers trained on next-token prediction.</p>
                <div class="code-block">
                    <div class="code-block-header">Tokenization Example (Python)</div>
                    <pre><code><span class="code-keyword">import</span> tiktoken
<span class="code-comment"># LLMs process tokens (subwords), not raw characters</span>
encoder = tiktoken.get_encoding(<span class="code-string">"cl100k_base"</span>)
tokens = encoder.encode(<span class="code-string">"Analytics meets Deep Learning!"</span>)
<span class="code-function">print</span>(tokens) <span class="code-comment"># Output: [37554, 4232, 11626, 21976, 0]</span></code></pre>
                </div>
                <p><strong>Scaling Laws:</strong> Model performance predictably improves as a power-law relationship with compute, dataset size, and parameter count.</p>
            </div>

            <div class="topic-card accent-cyan" style="margin-top: 1.5rem;">
                <h3><span class="card-icon">🎮</span> Interactive Demo: Generative Latent Space</h3>
                <p>Click on the 2D latent space to generate a pattern based on those latent coordinates. Notice how nearby points create similar patterns!</p>
                <div class="demo-container" style="position: relative; width: 100%; height: 450px; background: #080818; border-radius: 8px; overflow: hidden; margin-top: 1rem;">
                    <canvas id="demo-canvas-9" width="900" height="450" style="display: block; width: 100%; height: 100%;"></canvas>
                    <div id="demo-controls-9" style="position: absolute; bottom: 10px; left: 10px; display: flex; gap: 10px; flex-wrap: wrap;"></div>
                </div>
            </div>

            <div class="key-takeaway">
                <h4>Key Takeaways</h4>
                <ul>
                    <li>Generative AI has evolved from Autoencoders to VAEs, GANs, and Diffusion models for images.</li>
                    <li>LLMs rely on the simple objective of predicting the next token, scaled to massive datasets.</li>
                    <li>Latent space exploration allows for interpolation and semantic manipulation of generated outputs.</li>
                </ul>
            </div>
        `,
        initDemo: function(container) {
            const canvas = document.getElementById('demo-canvas-9');
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            let animationId;
            
            let time = 0;
            let targetZ = { x: 0, y: 0 };
            let currentZ = { x: 0, y: 0 }; // For smooth interpolation
            
            // Draw UI space
            const spaceW = 400;
            const spaceH = 400;
            const spaceX = 25;
            const spaceY = 25;

            // Handle clicks in latent space
            const handleCanvasClick = (e) => {
                const rect = canvas.getBoundingClientRect();
                const x = (e.clientX - rect.left) * (canvas.width / rect.width);
                const y = (e.clientY - rect.top) * (canvas.height / rect.height);

                if (x >= spaceX && x <= spaceX + spaceW && y >= spaceY && y <= spaceY + spaceH) {
                    // Map to [-1, 1]
                    targetZ.x = ((x - spaceX) / spaceW) * 2 - 1;
                    targetZ.y = ((y - spaceY) / spaceH) * 2 - 1;
                }
            };
            canvas.addEventListener('click', handleCanvasClick);
            this._cleanupClick = () => canvas.removeEventListener('click', handleCanvasClick);

            function draw() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                time += 0.05;

                // Interpolate
                currentZ.x += (targetZ.x - currentZ.x) * 0.1;
                currentZ.y += (targetZ.y - currentZ.y) * 0.1;

                // 1. Draw Latent Space
                ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
                ctx.fillRect(spaceX, spaceY, spaceW, spaceH);
                ctx.strokeStyle = '#64748B';
                ctx.strokeRect(spaceX, spaceY, spaceW, spaceH);
                
                // Axis
                ctx.beginPath();
                ctx.moveTo(spaceX + spaceW/2, spaceY);
                ctx.lineTo(spaceX + spaceW/2, spaceY + spaceH);
                ctx.moveTo(spaceX, spaceY + spaceH/2);
                ctx.lineTo(spaceX + spaceW, spaceY + spaceH/2);
                ctx.stroke();
                
                // Draw point
                const px = spaceX + (currentZ.x + 1) * 0.5 * spaceW;
                const py = spaceY + (currentZ.y + 1) * 0.5 * spaceH;
                
                ctx.beginPath();
                ctx.arc(px, py, 8, 0, Math.PI * 2);
                ctx.fillStyle = '#F472B6';
                ctx.fill();
                ctx.shadowBlur = 10;
                ctx.shadowColor = '#F472B6';
                ctx.stroke();
                ctx.shadowBlur = 0;

                // 2. Draw "Generated" Output (Procedural art based on Z)
                const outX = 650;
                const outY = 225;
                const outR = 150;
                
                // Background of output
                ctx.fillStyle = 'rgba(0,0,0,0.5)';
                ctx.beginPath();
                ctx.arc(outX, outY, outR, 0, Math.PI * 2);
                ctx.fill();
                
                // Generate pattern
                const numLines = 50 + Math.floor(currentZ.x * 20);
                const freq = 3 + currentZ.y * 2;
                
                for(let i=0; i<numLines; i++) {
                    const angle = (i / numLines) * Math.PI * 2;
                    const radiusMod = outR * 0.8 * Math.abs(Math.sin(angle * freq + time));
                    
                    const p1x = outX + Math.cos(angle) * (outR * 0.2);
                    const p1y = outY + Math.sin(angle) * (outR * 0.2);
                    const p2x = outX + Math.cos(angle + currentZ.x) * radiusMod;
                    const p2y = outY + Math.sin(angle + currentZ.y) * radiusMod;
                    
                    ctx.beginPath();
                    ctx.moveTo(p1x, p1y);
                    ctx.lineTo(p2x, p2y);
                    
                    // Color based on coords
                    const r = Math.floor(128 + currentZ.x * 127);
                    const g = Math.floor(128 + currentZ.y * 127);
                    const b = 255;
                    ctx.strokeStyle = \`rgba(\${r}, \${g}, \${b}, 0.5)\`;
                    ctx.stroke();
                }
                
                // Labels
                ctx.fillStyle = '#E2E8F0';
                ctx.font = '16px sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('Latent Space (Z)', spaceX + spaceW/2, spaceY - 10);
                ctx.fillText('Generated Output (X)', outX, outY - outR - 20);
                
                ctx.font = '12px sans-serif';
                ctx.fillStyle = '#A855F7';
                ctx.fillText(\`z = [\${currentZ.x.toFixed(2)}, \${currentZ.y.toFixed(2)}]\`, px, py - 15);

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
