(function() {
    'use strict';

    NeuralApp.registerSection({
        id: 4,
        title: "Training & Backpropagation",
        icon: "🔄",
        content: `
            <div class="content-grid">
                <div class="topic-card accent-cyan">
                    <h3><span class="card-icon">📉</span> Gradient Descent Variants</h3>
                    <p>Unlike linear regression where we have an analytical closed-form solution (Normal Equation: <span class="math-inline">\\\\theta = (X^T X)^{-1} X^T y</span>), neural networks have highly non-convex loss surfaces. We must rely on iterative optimization procedures like Gradient Descent.</p>
                    
                    <div class="highlight-box info">
                        <div class="highlight-title">Analytics Connection</div>
                        <p>In classical statistics, maximizing the likelihood often yields direct analytical solutions. In deep learning, the structural complexity forces us to take small steps proportional to the negative gradient of the loss function at the current point.</p>
                    </div>

                    <p>There are three main variants based on how much data we use to compute the gradient:</p>
                    <ul>
                        <li><strong>Batch Gradient Descent:</strong> Uses the entire dataset. Accurate gradients, but computationally prohibitive for large datasets.</li>
                        <li><strong>Stochastic Gradient Descent (SGD):</strong> Uses a single example. Highly noisy gradients, but very fast updates.</li>
                        <li><strong>Mini-batch Gradient Descent:</strong> The standard approach. Uses a small batch (e.g., 32, 64, 256). Balances gradient accuracy with computational efficiency, heavily leveraging GPU vectorization.</li>
                    </ul>
                </div>

                <div class="topic-card accent-purple">
                    <h3><span class="card-icon">⛓️</span> Backpropagation Algorithm</h3>
                    <p>Backpropagation is an efficient application of the chain rule from calculus on a computational graph. It computes the gradient of the loss with respect to every weight in the network.</p>
                    
                    <div class="math-block">
                        <span class="math-display">
                            \\\\frac{\\\\partial L}{\\\\partial w} = \\\\frac{\\\\partial L}{\\\\partial \\\\hat{y}} \\\\cdot \\\\frac{\\\\partial \\\\hat{y}}{\\\\partial z} \\\\cdot \\\\frac{\\\\partial z}{\\\\partial w}
                        </span>
                    </div>
                    
                    <p>During the <strong>forward pass</strong>, we compute the activations and store intermediate values. During the <strong>backward pass</strong>, we calculate the error term (or "local gradient") at the output layer and propagate it backwards through the network layers.</p>

                    <div class="code-block">
                        <div class="code-block-header">Python/PyTorch-like Autograd Concept</div>
                        <pre><code><span class="code-keyword">def</span> <span class="code-function">backward</span>(loss):
    <span class="code-comment"># Compute gradient of output</span>
    grad = compute_loss_grad(output, target)
    
    <span class="code-comment"># Propagate backwards</span>
    <span class="code-keyword">for</span> layer <span class="code-keyword">in</span> <span class="code-built_in">reversed</span>(layers):
        grad = layer.backward(grad)
        <span class="code-comment"># layer updates its own weights using stored inputs</span></code></pre>
                    </div>
                </div>
            </div>

            <div class="topic-card accent-emerald">
                <h3><span class="card-icon">🏎️</span> Advanced Optimizers</h3>
                <p>Vanilla SGD often struggles with pathological curvature (e.g., ravines) and can easily get stuck in saddle points. Modern optimizers address these issues by keeping track of the history of gradients.</p>

                <div class="tabs">
                    <div class="tab-nav">
                        <button class="tab-btn active" data-tab="opt-momentum">Momentum</button>
                        <button class="tab-btn" data-tab="opt-rmsprop">RMSProp</button>
                        <button class="tab-btn" data-tab="opt-adam">Adam</button>
                    </div>
                    <div class="tab-panel active" id="opt-momentum">
                        <h4>SGD with Momentum</h4>
                        <p>Simulates a ball rolling down a hill. It accumulates an exponentially decaying moving average of past gradients and continues to move in their direction.</p>
                        <div class="math-block">
                            <span class="math-display">
                                v_t = \\\\beta v_{t-1} + (1 - \\\\beta) \\\\nabla_w L(w_t) \\\\\\\\
                                w_{t+1} = w_t - \\\\eta v_t
                            </span>
                        </div>
                    </div>
                    <div class="tab-panel" id="opt-rmsprop">
                        <h4>RMSProp</h4>
                        <p>Adapts the learning rate for each parameter by dividing the learning rate by an exponentially decaying average of squared gradients. Great for recurrent neural networks.</p>
                        <div class="math-block">
                            <span class="math-display">
                                s_t = \\\\beta s_{t-1} + (1 - \\\\beta) (\\\\nabla_w L(w_t))^2 \\\\\\\\
                                w_{t+1} = w_t - \\\\frac{\\\\eta}{\\\\sqrt{s_t + \\\\epsilon}} \\\\nabla_w L(w_t)
                            </span>
                        </div>
                    </div>
                    <div class="tab-panel" id="opt-adam">
                        <h4>Adam (Adaptive Moment Estimation)</h4>
                        <p>Combines the ideas of Momentum and RMSProp. It keeps track of both the first moment (mean) and second moment (uncentered variance) of the gradients.</p>
                        <div class="math-block">
                            <span class="math-display">
                                m_t = \\\\beta_1 m_{t-1} + (1 - \\\\beta_1) g_t \\\\\\\\
                                v_t = \\\\beta_2 v_{t-1} + (1 - \\\\beta_2) g_t^2 \\\\\\\\
                                \\\\hat{m}_t = \\\\frac{m_t}{1 - \\\\beta_1^t}, \\\\quad \\\\hat{v}_t = \\\\frac{v_t}{1 - \\\\beta_2^t} \\\\\\\\
                                w_{t+1} = w_t - \\\\frac{\\\\eta}{\\\\sqrt{\\\\hat{v}_t} + \\\\epsilon} \\\\hat{m}_t
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="topic-card accent-amber">
                <h3><span class="card-icon">🎛️</span> Learning Rate Schedules & Warm-up</h3>
                <p>A static learning rate is rarely optimal. High learning rates are needed early on to escape local minima, while low learning rates are needed later for fine-tuning.</p>
                <div class="comparison-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Strategy</th>
                                <th>Description</th>
                                <th>Use Case</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Step Decay</strong></td>
                                <td>Reduce learning rate by a factor (e.g., 0.1) every N epochs.</td>
                                <td>Standard image classification tasks (ResNet on ImageNet).</td>
                            </tr>
                            <tr>
                                <td><strong>Cosine Annealing</strong></td>
                                <td>Smoothly decrease learning rate following a cosine curve.</td>
                                <td>Aggressive training, often used with restarts to find robust minima.</td>
                            </tr>
                            <tr>
                                <td><strong>Linear Warm-up</strong></td>
                                <td>Start with near-zero LR and increase linearly for the first few epochs.</td>
                                <td>Transformer architectures, to prevent early divergence.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="topic-card accent-pink">
                <h3><span class="card-icon">🎮</span> Interactive Demo: Gradient Descent Terrain Walker</h3>
                <p>Observe how different optimizers traverse a non-convex loss surface (Himmelblau's function). Notice how Adam escapes flat regions quickly while Momentum can overshoot minima.</p>
                <p><em>(See the live demo below)</em></p>
            </div>

            <div class="key-takeaway">
                <h4>🔑 Key Takeaways</h4>
                <ul>
                    <li>Training is just the process of minimizing a highly dimensional, non-convex loss function.</li>
                    <li>Backpropagation uses the chain rule to compute gradients efficiently by reusing intermediate activations.</li>
                    <li>Adam is usually the best default optimizer, but carefully tuned SGD with Momentum can sometimes yield better generalization on image tasks.</li>
                    <li>Learning rate scheduling and warm-up are critical for training modern deep architectures like Transformers.</li>
                </ul>
            </div>
        `,
        contentAr: `
            <div class="content-grid">
                <div class="topic-card accent-cyan">
                    <h3><span class="card-icon">📉</span> متغيرات النزول الاشتقاقي</h3>
                    <p>على عكس الانحدار الخطي حيث لدينا حل تحليلي مغلق (المعادلة العادية: <span class="math-inline">\\\\theta = (X^T X)^{-1} X^T y</span>)، تمتلك الشبكات العصبية أسطح خسارة غير محدبة بدرجة كبيرة. يجب أن نعتمد على إجراءات تحسين تكرارية مثل النزول الاشتقاقي (Gradient Descent).</p>
                    
                    <div class="highlight-box info">
                        <div class="highlight-title">ارتباط بالتحليل</div>
                        <p>في الإحصاء الكلاسيكي، غالباً ما يؤدي تعظيم الاحتمالية إلى حلول تحليلية مباشرة. في التعلم العميق، يجبرنا التعقيد الهيكلي على اتخاذ خطوات صغيرة تتناسب مع التدرج السلبي لدالة الخسارة عند النقطة الحالية.</p>
                    </div>

                    <p>هناك ثلاثة متغيرات رئيسية بناءً على مقدار البيانات التي نستخدمها لحساب التدرج:</p>
                    <ul>
                        <li><strong>النزول الاشتقاقي الدفعي (Batch):</strong> يستخدم مجموعة البيانات بأكملها. تدرجات دقيقة، لكنها مكلفة حسابياً لمجموعات البيانات الكبيرة.</li>
                        <li><strong>النزول الاشتقاقي العشوائي (SGD):</strong> يستخدم مثالاً واحداً. تدرجات صاخبة جداً، لكن التحديثات سريعة جداً.</li>
                        <li><strong>النزول الاشتقاقي الدفعي المصغر (Mini-batch):</strong> النهج القياسي. يستخدم دفعة صغيرة (مثل 32، 64، 256). يوازن بين دقة التدرج والكفاءة الحسابية، مع الاستفادة القصوى من توجيهات وحدة معالجة الرسومات.</li>
                    </ul>
                </div>

                <div class="topic-card accent-purple">
                    <h3><span class="card-icon">⛓️</span> خوارزمية الانتشار الخلفي</h3>
                    <p>الانتشار الخلفي هو تطبيق فعال لقاعدة السلسلة من التفاضل والتكامل على رسم بياني حسابي. يحسب تدرج الخسارة بالنسبة لكل وزن في الشبكة.</p>
                    
                    <div class="math-block">
                        <span class="math-display">
                            \\\\frac{\\\\partial L}{\\\\partial w} = \\\\frac{\\\\partial L}{\\\\partial \\\\hat{y}} \\\\cdot \\\\frac{\\\\partial \\\\hat{y}}{\\\\partial z} \\\\cdot \\\\frac{\\\\partial z}{\\\\partial w}
                        </span>
                    </div>
                    
                    <p>أثناء <strong>المسار الأمامي</strong>، نحسب التنشيطات ونخزن القيم الوسيطة. أثناء <strong>المسار الخلفي</strong>، نحسب مصطلح الخطأ (أو "التدرج المحلي") عند طبقة الإخراج وننشره للخلف عبر طبقات الشبكة.</p>

                    <div class="code-block">
                        <div class="code-block-header">مفهوم Autograd (Python/PyTorch)</div>
                        <pre><code><span class="code-keyword">def</span> <span class="code-function">backward</span>(loss):
    <span class="code-comment"># حساب تدرج الإخراج</span>
    grad = compute_loss_grad(output, target)
    
    <span class="code-comment"># الانتشار للخلف</span>
    <span class="code-keyword">for</span> layer <span class="code-keyword">in</span> <span class="code-built_in">reversed</span>(layers):
        grad = layer.backward(grad)
        <span class="code-comment"># تقوم الطبقة بتحديث أوزانها باستخدام المدخلات المخزنة</span></code></pre>
                    </div>
                </div>
            </div>

            <div class="topic-card accent-emerald">
                <h3><span class="card-icon">🏎️</span> محسنات متقدمة (Optimizers)</h3>
                <p>غالباً ما يعاني SGD العادي مع الانحناءات المرضية (مثل الوديان) ويمكن أن يعلق بسهولة في النقاط السرجية (saddle points). تعالج المحسنات الحديثة هذه المشكلات من خلال تتبع تاريخ التدرجات.</p>

                <div class="tabs">
                    <div class="tab-nav">
                        <button class="tab-btn active" data-tab="opt-momentum">الزخم (Momentum)</button>
                        <button class="tab-btn" data-tab="opt-rmsprop">RMSProp</button>
                        <button class="tab-btn" data-tab="opt-adam">Adam</button>
                    </div>
                    <div class="tab-panel active" id="opt-momentum">
                        <h4>SGD مع الزخم</h4>
                        <p>يحاكي كرة تتدحرج أسفل تل. يجمع متوسطاً متحركاً متناقصاً أسياً للتدرجات السابقة ويستمر في التحرك في اتجاهها.</p>
                        <div class="math-block">
                            <span class="math-display">
                                v_t = \\\\beta v_{t-1} + (1 - \\\\beta) \\\\nabla_w L(w_t) \\\\\\\\
                                w_{t+1} = w_t - \\\\eta v_t
                            </span>
                        </div>
                    </div>
                    <div class="tab-panel" id="opt-rmsprop">
                        <h4>RMSProp</h4>
                        <p>يكيف معدل التعلم لكل معلمة عن طريق قسمة معدل التعلم على متوسط متناقص أسياً لمربعات التدرجات. رائع للشبكات العصبية المتكررة.</p>
                        <div class="math-block">
                            <span class="math-display">
                                s_t = \\\\beta s_{t-1} + (1 - \\\\beta) (\\\\nabla_w L(w_t))^2 \\\\\\\\
                                w_{t+1} = w_t - \\\\frac{\\\\eta}{\\\\sqrt{s_t + \\\\epsilon}} \\\\nabla_w L(w_t)
                            </span>
                        </div>
                    </div>
                    <div class="tab-panel" id="opt-adam">
                        <h4>Adam (تقدير العزم التكيفي)</h4>
                        <p>يجمع بين أفكار Momentum و RMSProp. يتتبع كلاً من العزم الأول (المتوسط) والعزم الثاني (التباين غير الممركز) للتدرجات.</p>
                        <div class="math-block">
                            <span class="math-display">
                                m_t = \\\\beta_1 m_{t-1} + (1 - \\\\beta_1) g_t \\\\\\\\
                                v_t = \\\\beta_2 v_{t-1} + (1 - \\\\beta_2) g_t^2 \\\\\\\\
                                \\\\hat{m}_t = \\\\frac{m_t}{1 - \\\\beta_1^t}, \\\\quad \\\\hat{v}_t = \\\\frac{v_t}{1 - \\\\beta_2^t} \\\\\\\\
                                w_{t+1} = w_t - \\\\frac{\\\\eta}{\\\\sqrt{\\\\hat{v}_t} + \\\\epsilon} \\\\hat{m}_t
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="topic-card accent-amber">
                <h3><span class="card-icon">🎛️</span> جداول معدل التعلم والإحماء</h3>
                <p>نادراً ما يكون معدل التعلم الثابت هو الأمثل. هناك حاجة لمعدلات تعلم عالية في وقت مبكر للهروب من الحد الأدنى المحلي، في حين أن هناك حاجة لمعدلات تعلم منخفضة لاحقاً للضبط الدقيق.</p>
                <div class="comparison-table">
                    <table>
                        <thead>
                            <tr>
                                <th>الاستراتيجية</th>
                                <th>الوصف</th>
                                <th>حالة الاستخدام</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Step Decay</strong></td>
                                <td>تقليل معدل التعلم بعامل (مثل 0.1) كل N حقبة (epochs).</td>
                                <td>مهام تصنيف الصور القياسية (ResNet على ImageNet).</td>
                            </tr>
                            <tr>
                                <td><strong>Cosine Annealing</strong></td>
                                <td>تقليل معدل التعلم بسلاسة باتباع منحنى جيب التمام.</td>
                                <td>التدريب العدواني، وغالباً ما يستخدم مع إعادة التشغيل للعثور على حد أدنى قوي.</td>
                            </tr>
                            <tr>
                                <td><strong>Linear Warm-up</strong></td>
                                <td>البدء بمعدل تعلم يقترب من الصفر وزيادته خطياً خلال الحقب الأولى.</td>
                                <td>معماريات المحولات (Transformers)، لمنع التباعد المبكر.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="topic-card accent-pink">
                <h3><span class="card-icon">🎮</span> عرض تفاعلي: متجول التضاريس للنزول الاشتقاقي</h3>
                <p>راقب كيف تعبر المحسنات المختلفة سطح خسارة غير محدب (دالة هيملبلو). لاحظ كيف يهرب Adam من المناطق المسطحة بسرعة بينما يمكن أن يتجاوز الزخم (Momentum) الحد الأدنى.</p>
                <p><em>(شاهد العرض المباشر بالأسفل)</em></p>
            </div>

            <div class="key-takeaway">
                <h4>🔑 أهم النقاط</h4>
                <ul>
                    <li>التدريب هو ببساطة عملية تقليل دالة خسارة غير محدبة عالية الأبعاد.</li>
                    <li>يستخدم الانتشار الخلفي قاعدة السلسلة لحساب التدرجات بكفاءة عن طريق إعادة استخدام التنشيطات الوسيطة.</li>
                    <li>Adam هو عادة أفضل محسن افتراضي، ولكن SGD المضبوط بعناية مع الزخم يمكن أن يؤدي أحياناً إلى تعميم أفضل في مهام الصور.</li>
                    <li>جدولة معدل التعلم والإحماء أمر بالغ الأهمية لتدريب المعماريات العميقة الحديثة مثل المحولات (Transformers).</li>
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
                <label style="color:#fff; font-size:14px; margin-right:10px;">Optimizer:
                    <select id="optimizer-select" style="background:#1A1A3E; color:#fff; border:1px solid #00CFFD; padding:4px 8px; border-radius:4px;">
                        <option value="sgd">SGD</option>
                        <option value="momentum">Momentum</option>
                        <option value="adam" selected>Adam</option>
                    </select>
                </label>
                <label style="color:#fff; font-size:14px; margin-right:10px;">Learning Rate (η): <span id="lr-val">0.05</span>
                    <input type="range" id="lr-slider" min="0.001" max="0.2" step="0.001" value="0.05" style="vertical-align:middle;">
                </label>
                <button id="reset-walker-btn" class="demo-btn">Reset Walker</button>
            `;
            container.insertBefore(controlsDiv, container.querySelector('.demo-canvas-container'));
            
            const optimizerSelect = controlsDiv.querySelector('#optimizer-select');
            const lrSlider = controlsDiv.querySelector('#lr-slider');
            const lrVal = controlsDiv.querySelector('#lr-val');
            const resetBtn = controlsDiv.querySelector('#reset-walker-btn');
            
            let reqId;
            let lr = parseFloat(lrSlider.value);
            let opt = optimizerSelect.value;
            
            // Himmelblau function params
            // f(x,y) = (x^2 + y - 11)^2 + (x + y^2 - 7)^2
            const f = (x, y) => Math.pow(x*x + y - 11, 2) + Math.pow(x + y*y - 7, 2);
            const dx = (x, y) => 4*x*(x*x + y - 11) + 2*(x + y*y - 7);
            const dy = (x, y) => 2*(x*x + y - 11) + 4*y*(x + y*y - 7);
            
            // Map logic coordinates (-5 to 5) to canvas coordinates (0 to W, 0 to H)
            const mapX = (x) => (x + 5) / 10 * canvas.width;
            const mapY = (y) => (5 - y) / 10 * canvas.height;
            const unmapX = (cx) => (cx / canvas.width) * 10 - 5;
            const unmapY = (cy) => 5 - (cy / canvas.height) * 10;
            
            // State
            let state = {
                x: -4, 
                y: -4,
                path: [],
                vx: 0,
                vy: 0,
                mX: 0, mY: 0,
                vX: 0, vY: 0,
                t: 0
            };
            
            const resetState = () => {
                state.x = (Math.random() * 8) - 4; // random start between -4 and 4
                state.y = (Math.random() * 8) - 4;
                state.path = [{x: state.x, y: state.y}];
                state.vx = 0; state.vy = 0;
                state.mX = 0; state.mY = 0;
                state.vX = 0; state.vY = 0;
                state.t = 0;
            };
            resetState();
            
            lrSlider.addEventListener('input', (e) => {
                lr = parseFloat(e.target.value);
                lrVal.innerText = lr.toFixed(3);
            });
            optimizerSelect.addEventListener('change', (e) => {
                opt = e.target.value;
                resetState();
            });
            resetBtn.addEventListener('click', resetState);
            
            // Precompute contour lines background
            const bgCanvas = document.createElement('canvas');
            bgCanvas.width = canvas.width;
            bgCanvas.height = canvas.height;
            const bgCtx = bgCanvas.getContext('2d');
            
            // Generate a simple heat map/contour representation
            const imgData = bgCtx.createImageData(canvas.width, canvas.height);
            for (let cy = 0; cy < canvas.height; cy++) {
                for (let cx = 0; cx < canvas.width; cx++) {
                    const x = unmapX(cx);
                    const y = unmapY(cy);
                    const val = f(x, y);
                    
                    // Map val (0 to 1000+) to a color
                    const normalized = Math.min(1, Math.log1p(val) / 6);
                    
                    // Dark theme colors: blue/purple for low, cyan for high
                    const r = Math.floor(10 * normalized);
                    const g = Math.floor(50 * normalized + 5);
                    const b = Math.floor(150 * (1 - normalized) + 20);
                    
                    const idx = (cy * canvas.width + cx) * 4;
                    imgData.data[idx] = r;
                    imgData.data[idx+1] = g;
                    imgData.data[idx+2] = b;
                    imgData.data[idx+3] = 255;
                }
            }
            bgCtx.putImageData(imgData, 0, 0);
            
            const step = () => {
                const gradX = dx(state.x, state.y);
                const gradY = dy(state.x, state.y);
                
                state.t++;
                
                if (opt === 'sgd') {
                    state.x -= lr * 0.05 * gradX;
                    state.y -= lr * 0.05 * gradY;
                } else if (opt === 'momentum') {
                    const beta = 0.9;
                    state.vx = beta * state.vx + (1 - beta) * gradX;
                    state.vy = beta * state.vy + (1 - beta) * gradY;
                    state.x -= lr * 0.1 * state.vx;
                    state.y -= lr * 0.1 * state.vy;
                } else if (opt === 'adam') {
                    const beta1 = 0.9;
                    const beta2 = 0.999;
                    const eps = 1e-8;
                    
                    state.mX = beta1 * state.mX + (1 - beta1) * gradX;
                    state.mY = beta1 * state.mY + (1 - beta1) * gradY;
                    
                    state.vX = beta2 * state.vX + (1 - beta2) * (gradX * gradX);
                    state.vY = beta2 * state.vY + (1 - beta2) * (gradY * gradY);
                    
                    const mHatX = state.mX / (1 - Math.pow(beta1, state.t));
                    const mHatY = state.mY / (1 - Math.pow(beta1, state.t));
                    const vHatX = state.vX / (1 - Math.pow(beta2, state.t));
                    const vHatY = state.vY / (1 - Math.pow(beta2, state.t));
                    
                    state.x -= lr * mHatX / (Math.sqrt(vHatX) + eps);
                    state.y -= lr * mHatY / (Math.sqrt(vHatY) + eps);
                }
                
                // Clamp
                state.x = Math.max(-5, Math.min(5, state.x));
                state.y = Math.max(-5, Math.min(5, state.y));
                
                state.path.push({x: state.x, y: state.y});
                if (state.path.length > 500) state.path.shift();
            };

            const draw = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(bgCanvas, 0, 0);
                
                // Minima of Himmelblau function
                const minima = [
                    {x: 3.0, y: 2.0},
                    {x: -2.805118, y: 3.131312},
                    {x: -3.779310, y: -3.283186},
                    {x: 3.584428, y: -1.848126}
                ];
                
                ctx.fillStyle = '#A855F7';
                minima.forEach(m => {
                    ctx.beginPath();
                    ctx.arc(mapX(m.x), mapY(m.y), 4, 0, Math.PI*2);
                    ctx.fill();
                });
                
                // Draw path
                if (state.path.length > 1) {
                    ctx.beginPath();
                    ctx.moveTo(mapX(state.path[0].x), mapY(state.path[0].y));
                    for (let i = 1; i < state.path.length; i++) {
                        ctx.lineTo(mapX(state.path[i].x), mapY(state.path[i].y));
                    }
                    ctx.strokeStyle = '#00CFFD';
                    ctx.lineWidth = 2;
                    ctx.stroke();
                }
                
                // Draw ball
                ctx.beginPath();
                ctx.arc(mapX(state.x), mapY(state.y), 8, 0, Math.PI*2);
                ctx.fillStyle = '#F472B6';
                ctx.fill();
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 2;
                ctx.stroke();
            };

            const animate = () => {
                step();
                draw();
                reqId = requestAnimationFrame(animate);
            };
            
            animate();
            
            // Allow manual clicks on canvas to move the ball
            canvas.addEventListener('mousedown', (e) => {
                const rect = canvas.getBoundingClientRect();
                const cx = e.clientX - rect.left;
                const cy = e.clientY - rect.top;
                state.x = unmapX(cx);
                state.y = unmapY(cy);
                state.path = [{x: state.x, y: state.y}];
                state.vx = 0; state.vy = 0;
                state.mX = 0; state.mY = 0;
                state.vX = 0; state.vY = 0;
                state.t = 0;
            });
            
            this._reqId = reqId;
        },
        destroyDemo: function() {
            if (this._reqId) {
                cancelAnimationFrame(this._reqId);
            }
        }
    });

})();
