(function() {
    'use strict';

    NeuralApp.registerSection({
        id: 6,
        title: "Convolutional Neural Networks",
        icon: "👁️",
        content: `
            <div class="content-grid">
                <div class="topic-card accent-cyan">
                    <h3><span class="card-icon">🔲</span> The Convolution Operation</h3>
                    <p>Convolutional Neural Networks (CNNs) revolutionized computer vision by replacing dense, fully connected layers with <strong>convolutional layers</strong>. In signal processing, a convolution blends two functions together. In image processing, we slide a small matrix (a <strong>kernel</strong> or filter) over the image, computing dot products to detect patterns.</p>
                    
                    <div class="math-block">
                        <span class="math-display">S(i, j) = (I * K)(i, j) = \\sum_m \\sum_n I(i+m, j+n) K(m, n)</span>
                    </div>
                    
                    <div class="highlight-box info">
                        <h4 class="highlight-title">Analytics Connection: Moving Averages</h4>
                        <p>If you've calculated a moving average or smoothed a time-series dataset, you've performed a 1D convolution! A CNN simply extends this concept to 2D (or 3D) and <em>learns</em> the optimal smoothing/filtering weights (the kernel) instead of you hand-coding them.</p>
                    </div>
                </div>

                <div class="topic-card accent-purple">
                    <h3><span class="card-icon">📐</span> Spatial Dimensions: Padding & Stride</h3>
                    <p>As we slide filters across an image, the output size changes based on three factors:</p>
                    <ul>
                        <li><strong>Kernel Size ($K$):</strong> The dimension of the filter (often 3x3 or 5x5).</li>
                        <li><strong>Stride ($S$):</strong> Step size of the sliding window. Larger stride downsamples the image.</li>
                        <li><strong>Padding ($P$):</strong> Adding zeros around the image border to control output size.</li>
                    </ul>
                    
                    <p>The spatial dimension formula for an input size $W$ is:</p>
                    <div class="math-block">
                        <span class="math-display">O = \\lfloor \\frac{W - K + 2P}{S} \\rfloor + 1</span>
                    </div>

                    <h4>Pooling Layers</h4>
                    <p>CNNs typically interleave convolutions with <strong>pooling</strong> layers (e.g., Max Pooling or Average Pooling) to aggressively reduce spatial dimensions and create translation invariance.</p>
                </div>
            </div>

            <div class="topic-card accent-emerald">
                <h3><span class="card-icon">🏛️</span> Landmark Architectures Timeline</h3>
                <div class="flow-diagram">
                    <div class="flow-node"><strong>LeNet (1998)</strong><br><small>Digit Recognition</small></div>
                    <div class="flow-arrow">→</div>
                    <div class="flow-node"><strong>AlexNet (2012)</strong><br><small>Deep Learning Boom</small></div>
                    <div class="flow-arrow">→</div>
                    <div class="flow-node"><strong>VGG (2014)</strong><br><small>Deep 3x3 Filters</small></div>
                    <div class="flow-arrow">→</div>
                    <div class="flow-node"><strong>ResNet (2015)</strong><br><small>Skip Connections</small></div>
                    <div class="flow-arrow">→</div>
                    <div class="flow-node"><strong>EfficientNet (2019)</strong><br><small>Compound Scaling</small></div>
                </div>
            </div>

            <div class="content-grid">
                <div class="topic-card accent-amber">
                    <h3><span class="card-icon">🎨</span> Feature Maps & Hierarchy</h3>
                    <p>CNNs learn hierarchical representations. As data flows deeper into the network, the feature maps represent increasingly complex concepts:</p>
                    <table class="comparison-table">
                        <thead>
                            <tr>
                                <th>Layer Depth</th>
                                <th>What it Learns</th>
                                <th>Analytics Analogy</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Early Layers</strong></td>
                                <td>Edges, colors, gradients</td>
                                <td>Raw feature extraction</td>
                            </tr>
                            <tr>
                                <td><strong>Middle Layers</strong></td>
                                <td>Textures, simple shapes (circles, corners)</td>
                                <td>Feature interactions</td>
                            </tr>
                            <tr>
                                <td><strong>Deep Layers</strong></td>
                                <td>Complex objects (faces, wheels, text)</td>
                                <td>High-level semantic clusters</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="topic-card accent-pink">
                    <h3><span class="card-icon">♻️</span> Transfer Learning & Fine-Tuning</h3>
                    <p>Training a deep CNN from scratch requires massive data and compute. Instead, we use <strong>Transfer Learning</strong>:</p>
                    <div class="code-block">
                        <div class="code-block-header">Keras: Transfer Learning</div>
                        <pre><code><span class="code-comment"># 1. Load pre-trained base (freeze weights)</span>
<span class="code-keyword">const</span> baseModel = tf.applications.ResNet50({
    weights: <span class="code-string">'imagenet'</span>,
    includeTop: <span class="code-keyword">false</span>
});
baseModel.trainable = <span class="code-keyword">false</span>;

<span class="code-comment"># 2. Add custom analytics head</span>
<span class="code-keyword">const</span> model = tf.sequential();
model.add(baseModel);
model.add(tf.layers.globalAveragePooling2d());
model.add(tf.layers.dense({units: <span class="code-number">10</span>, activation: <span class="code-string">'softmax'</span>}));</code></pre>
                    </div>
                </div>
            </div>

            <div class="topic-card accent-cyan">
                <h3><span class="card-icon">🎮</span> Interactive Demo: CNN Filter Visualization</h3>
                <p>Select a kernel filter. The demo animates how the filter slides over the 6x6 input image (left) to produce a 4x4 feature map (right) without padding ($S=1, P=0$).</p>
                <p><em>(See the live demo below)</em></p>
            </div>

            <div class="key-takeaway">
                <h4>Key Takeaways</h4>
                <ul>
                    <li><strong>Weight Sharing:</strong> A single kernel sweeps across the image, drastically reducing the number of parameters compared to dense layers.</li>
                    <li><strong>Locality:</strong> Convolution inherently assumes that nearby pixels are strongly correlated.</li>
                    <li><strong>Hierarchy:</strong> Deep CNNs build complex, semantic representations from simple edges.</li>
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
            controlsDiv.style.justifyContent = 'center';
            controlsDiv.innerHTML = `
                <button class="demo-btn active" id="btn-edge">Edge Detection</button>
                <button class="demo-btn" id="btn-blur">Blur</button>
                <button class="demo-btn" id="btn-sharpen">Sharpen</button>
            `;
            container.insertBefore(controlsDiv, container.querySelector('.demo-canvas-container'));
            
            let animationId;

            // Define filters
            const filters = {
                edge: [
                    [-1, -1, -1],
                    [-1,  8, -1],
                    [-1, -1, -1]
                ],
                blur: [
                    [1/9, 1/9, 1/9],
                    [1/9, 1/9, 1/9],
                    [1/9, 1/9, 1/9]
                ],
                sharpen: [
                    [ 0, -1,  0],
                    [-1,  5, -1],
                    [ 0, -1,  0]
                ]
            };

            let currentFilter = 'edge';
            
            // Input grid (6x6) - simple cross pattern
            const inputGrid = Array(6).fill(0).map(() => Array(6).fill(0));
            for(let i=1; i<5; i++) {
                inputGrid[3][i] = 1;
                inputGrid[i][3] = 1;
            }

            // Output grid (4x4)
            const outputGrid = Array(4).fill(0).map(() => Array(4).fill(0));
            
            // Calculate output
            function computeOutput() {
                let kernel = filters[currentFilter];
                for(let y=0; y<4; y++) {
                    for(let x=0; x<4; x++) {
                        let sum = 0;
                        for(let ky=0; ky<3; ky++) {
                            for(let kx=0; kx<3; kx++) {
                                sum += inputGrid[y+ky][x+kx] * kernel[ky][kx];
                            }
                        }
                        outputGrid[y][x] = sum;
                    }
                }
            }
            computeOutput();

            // Button handlers
            ['edge', 'blur', 'sharpen'].forEach(type => {
                const btn = controlsDiv.querySelector(`#btn-${type}`);
                if (btn) {
                    btn.addEventListener('click', () => {
                        controlsDiv.querySelectorAll('.demo-btn').forEach(b => b.classList.remove('active'));
                        btn.classList.add('active');
                        currentFilter = type;
                        computeOutput();
                    });
                }
            });

            let time = 0;
            const cellSize = 40;

            function drawGrid(x, y, grid, title, highlightX, highlightY, highlightSize = 1, isOutput = false) {
                ctx.save();
                ctx.translate(x, y);
                
                ctx.fillStyle = '#E2E8F0';
                ctx.font = '16px sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(title, (grid[0].length * cellSize) / 2, -15);

                for(let r=0; r<grid.length; r++) {
                    for(let c=0; c<grid[0].length; c++) {
                        let val = grid[r][c];
                        let isHighlighted = false;
                        if (isOutput) {
                            isHighlighted = (r === highlightY && c === highlightX);
                        } else {
                            isHighlighted = (r >= highlightY && r < highlightY + highlightSize && c >= highlightX && c < highlightX + highlightSize);
                        }

                        // Fill
                        let normVal = Math.max(-1, Math.min(1, val));
                        if(normVal > 0) ctx.fillStyle = `rgba(0, 207, 253, ${normVal * 0.8})`;
                        else if(normVal < 0) ctx.fillStyle = `rgba(168, 85, 247, ${-normVal * 0.8})`;
                        else ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
                        
                        if (isHighlighted) {
                            ctx.fillStyle = isOutput ? 'rgba(52, 211, 153, 0.6)' : 'rgba(244, 114, 182, 0.4)';
                        }
                        
                        ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
                        
                        // Border
                        ctx.strokeStyle = isHighlighted ? (isOutput ? '#34D399' : '#F472B6') : '#1E293B';
                        ctx.lineWidth = isHighlighted ? 2 : 1;
                        ctx.strokeRect(c * cellSize, r * cellSize, cellSize, cellSize);
                        
                        // Text
                        ctx.fillStyle = '#FFF';
                        ctx.font = '12px monospace';
                        ctx.fillText(val.toFixed(1), c * cellSize + cellSize/2, r * cellSize + cellSize/2 + 4);
                    }
                }
                ctx.restore();
            }

            function drawFilter(x, y, kernel) {
                ctx.save();
                ctx.translate(x, y);
                ctx.fillStyle = '#E2E8F0';
                ctx.font = '16px sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText("Kernel (3x3)", 60, -15);

                for(let r=0; r<3; r++) {
                    for(let c=0; c<3; c++) {
                        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
                        ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
                        ctx.strokeStyle = '#1E293B';
                        ctx.strokeRect(c * cellSize, r * cellSize, cellSize, cellSize);
                        
                        ctx.fillStyle = '#A855F7';
                        ctx.font = '14px monospace';
                        let val = kernel[r][c];
                        let valStr = Number.isInteger(val) ? val.toString() : val.toFixed(2);
                        ctx.fillText(valStr, c * cellSize + cellSize/2, r * cellSize + cellSize/2 + 5);
                    }
                }
                ctx.restore();
            }

            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                time += 0.02;

                // Animate sliding window
                let totalSteps = 4 * 4;
                let step = Math.floor(time) % totalSteps;
                let outY = Math.floor(step / 4);
                let outX = step % 4;

                // Draw Input
                drawGrid(50, 100, inputGrid, "Input (6x6)", outX, outY, 3, false);
                
                // Draw Kernel
                drawFilter(400, 150, filters[currentFilter]);

                // Draw Output
                drawGrid(650, 150, outputGrid, "Feature Map (4x4)", outX, outY, 1, true);
                
                // Draw connecting lines
                ctx.beginPath();
                ctx.strokeStyle = 'rgba(244, 114, 182, 0.5)';
                ctx.setLineDash([5, 5]);
                let inStartX = 50 + (outX + 1.5) * cellSize;
                let inStartY = 100 + (outY + 1.5) * cellSize;
                ctx.moveTo(inStartX, inStartY);
                ctx.lineTo(400 + 60, 150 + 60);
                
                ctx.moveTo(400 + 60, 150 + 60);
                ctx.lineTo(650 + outX * cellSize + cellSize/2, 150 + outY * cellSize + cellSize/2);
                ctx.stroke();
                ctx.setLineDash([]);

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
