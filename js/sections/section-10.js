(function() {
    'use strict';

    NeuralApp.registerSection({
        id: 10,
        title: "Interpretability, Ethics & Analytics",
        icon: "🔍",
        content: `
            <div class="content-grid">
                <div class="topic-card accent-cyan">
                    <h3><span class="card-icon">🕵️</span> Explainable AI (XAI)</h3>
                    <p>Neural networks are often called "black boxes", but interpretability techniques help analytics professionals understand <em>why</em> a model made a decision.</p>
                    <ul>
                        <li><strong>SHAP (SHapley Additive exPlanations):</strong> Based on game theory. Assigns each feature an importance value for a specific prediction.
                        <div class="math-block">
                            <span class="math-display">\\phi_i = \\sum_{S \\subseteq N \\setminus \\{i\\}} \\frac{|S|!(|N|-|S|-1)!}{|N|!} [v(S \\cup \\{i\\}) - v(S)]</span>
                        </div>
                        </li>
                        <li><strong>LIME:</strong> Approximates the complex model with a simple, interpretable linear model locally around the prediction.</li>
                        <li><strong>Grad-CAM:</strong> Uses the gradients flowing into the final convolutional layer to produce a localization map for images.</li>
                    </ul>
                </div>

                <div class="topic-card accent-purple">
                    <h3><span class="card-icon">⚖️</span> Bias, Fairness & Ethics</h3>
                    <p>AI models amplify biases present in the training data. For data analysts, it's critical to audit data and models.</p>
                    <table class="comparison-table">
                        <thead>
                            <tr>
                                <th>Source of Bias</th>
                                <th>Description</th>
                                <th>Mitigation Strategy</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Historical Bias</td>
                                <td>Data reflects past discriminatory practices.</td>
                                <td>Data re-weighting, algorithmic fairness constraints.</td>
                            </tr>
                            <tr>
                                <td>Representation Bias</td>
                                <td>Some populations are underrepresented in data.</td>
                                <td>Stratified sampling, synthetic data generation.</td>
                            </tr>
                            <tr>
                                <td>Measurement Bias</td>
                                <td>Features or labels are noisy or poor proxies.</td>
                                <td>Refining feature engineering and label collection.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="topic-card accent-emerald">
                    <h3><span class="card-icon">📈</span> NNs in Analytics Pipelines</h3>
                    <p>How do Neural Networks integrate into classical Data Analytics?</p>
                    <ul style="line-height: 1.6;">
                        <li><strong>Embeddings:</strong> Use pre-trained NNs to convert text/categorical data into dense vectors, then use classical models (like XGBoost) on those embeddings.</li>
                        <li><strong>Anomaly Detection:</strong> Use Autoencoders on transaction data; high reconstruction loss indicates anomalies (fraud).</li>
                        <li><strong>Recommendation Systems:</strong> Two-tower architectures matching user embeddings with item embeddings.</li>
                    </ul>
                    
                    <div class="code-block">
                        <div class="code-block-header">Deployment: TensorFlow to ONNX</div>
                        <pre><code><span class="code-keyword">import</span> tf2onnx
<span class="code-keyword">import</span> onnx

<span class="code-comment"># Convert a TF model to ONNX for universal deployment</span>
onnx_model, _ = tf2onnx.convert.from_keras(
    model, 
    input_signature, 
    opset=<span class="code-number">13</span>
)
onnx.save(onnx_model, <span class="code-string">"model.onnx"</span>)</code></pre>
                    </div>
                </div>
            </div>

            <div class="topic-card accent-amber" style="margin-top: 1.5rem;">
                <h3><span class="card-icon">🎮</span> Interactive Demo: Interpretability Dashboard</h3>
                <p>Toggle features on and off to see how they impact the final Prediction Score, mimicking a SHAP feature importance plot.</p>
                <p><em>(See the live demo below)</em></p>
            </div>

            <div class="key-takeaway">
                <h4>Key Takeaways</h4>
                <ul>
                    <li>Deep learning models must be auditable and interpretable when deployed in high-stakes environments.</li>
                    <li>Technical metrics alone do not guarantee a fair model; domain expertise and ethical considerations are required.</li>
                    <li>The transition from notebook to production involves standardization (ONNX) and scalable serving infrastructure.</li>
                </ul>
            </div>
        `,
        contentAr: `
            <div class="content-grid">
                <div class="topic-card accent-cyan">
                    <h3><span class="card-icon">🕵️</span> الذكاء الاصطناعي القابل للتفسير (XAI)</h3>
                    <p>غالباً ما يُطلق على الشبكات العصبية اسم "الصناديق السوداء" (black boxes)، لكن تقنيات قابلية التفسير تساعد محترفي التحليلات على فهم <em>لماذا</em> اتخذ النموذج قراراً معيناً.</p>
                    <ul>
                        <li><strong>SHAP (تفسيرات شابلي الإضافية):</strong> يعتمد على نظرية اللعبة. يعين لكل ميزة قيمة أهمية لتنبؤ معين.
                        <div class="math-block">
                            <span class="math-display">\\phi_i = \\sum_{S \\subseteq N \\setminus \\{i\\}} \\frac{|S|!(|N|-|S|-1)!}{|N|!} [v(S \\cup \\{i\\}) - v(S)]</span>
                        </div>
                        </li>
                        <li><strong>LIME:</strong> يقرب النموذج المعقد بنموذج خطي بسيط وقابل للتفسير محلياً حول التنبؤ.</li>
                        <li><strong>Grad-CAM:</strong> يستخدم التدرجات المتدفقة إلى الطبقة التلافيفية النهائية لإنتاج خريطة توطين للصور.</li>
                    </ul>
                </div>

                <div class="topic-card accent-purple">
                    <h3><span class="card-icon">⚖️</span> التحيز والعدالة والأخلاق</h3>
                    <p>تعمل نماذج الذكاء الاصطناعي على تضخيم التحيزات الموجودة في بيانات التدريب. بالنسبة لمحللي البيانات، من الأهمية بمكان تدقيق البيانات والنماذج.</p>
                    <table class="comparison-table">
                        <thead>
                            <tr>
                                <th>مصدر التحيز</th>
                                <th>الوصف</th>
                                <th>استراتيجية التخفيف</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>التحيز التاريخي</td>
                                <td>تعكس البيانات الممارسات التمييزية السابقة.</td>
                                <td>إعادة وزن البيانات، قيود العدالة الخوارزمية.</td>
                            </tr>
                            <tr>
                                <td>تحيز التمثيل</td>
                                <td>بعض المجموعات السكانية ممثلة تمثيلاً ناقصاً في البيانات.</td>
                                <td>أخذ العينات الطبقية، توليد بيانات تركيبية (synthetic data).</td>
                            </tr>
                            <tr>
                                <td>تحيز القياس</td>
                                <td>الميزات أو التسميات مزعجة (noisy) أو وكلاء سيئون.</td>
                                <td>تحسين هندسة الميزات وجمع التسميات.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="topic-card accent-emerald">
                    <h3><span class="card-icon">📈</span> الشبكات العصبية في خطوط أنابيب التحليلات</h3>
                    <p>كيف تتكامل الشبكات العصبية في تحليلات البيانات الكلاسيكية؟</p>
                    <ul style="line-height: 1.6;">
                        <li><strong>التضمينات (Embeddings):</strong> استخدم الشبكات العصبية المدربة مسبقاً لتحويل النص/البيانات الفئوية إلى متجهات كثيفة، ثم استخدم النماذج الكلاسيكية (مثل XGBoost) على تلك التضمينات.</li>
                        <li><strong>اكتشاف الشذوذ (Anomaly Detection):</strong> استخدم أجهزة التشفير التلقائي (Autoencoders) على بيانات المعاملات؛ يشير فقدان إعادة البناء العالي إلى وجود شذوذ (احتيال).</li>
                        <li><strong>أنظمة التوصية:</strong> معماريات ثنائية الأبراج تطابق تضمينات المستخدم مع تضمينات العناصر.</li>
                    </ul>
                    
                    <div class="code-block">
                        <div class="code-block-header">النشر: TensorFlow إلى ONNX</div>
                        <pre><code><span class="code-keyword">import</span> tf2onnx
<span class="code-keyword">import</span> onnx

<span class="code-comment"># تحويل نموذج TF إلى ONNX للنشر الشامل</span>
onnx_model, _ = tf2onnx.convert.from_keras(
    model, 
    input_signature, 
    opset=<span class="code-number">13</span>
)
onnx.save(onnx_model, <span class="code-string">"model.onnx"</span>)</code></pre>
                    </div>
                </div>
            </div>

            <div class="topic-card accent-amber" style="margin-top: 1.5rem;">
                <h3><span class="card-icon">🎮</span> عرض تفاعلي: لوحة معلومات قابلية التفسير</h3>
                <p>قم بتبديل الميزات (تشغيل/إيقاف) لترى كيف تؤثر على درجة التنبؤ النهائية، ومحاكاة مخطط أهمية ميزات SHAP.</p>
                <p><em>(شاهد العرض المباشر بالأسفل)</em></p>
            </div>

            <div class="key-takeaway">
                <h4>أهم النقاط</h4>
                <ul>
                    <li>يجب أن تكون نماذج التعلم العميق قابلة للتدقيق والتفسير عند نشرها في بيئات عالية المخاطر.</li>
                    <li>المقاييس الفنية وحدها لا تضمن نموذجاً عادلاً؛ الخبرة في المجال والاعتبارات الأخلاقية مطلوبة.</li>
                    <li>يتضمن الانتقال من بيئة التطوير (notebook) إلى الإنتاج التوحيد القياسي (ONNX) وبنية تحتية للخدمة قابلة للتطوير.</li>
                </ul>
            </div>
        `,
        initDemo: function(container) {
            // Use the canvas generated by app.js in the container
            const canvas = container.querySelector('canvas');
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            let animationId;
            
            // Features
            const features = [
                { name: "Income Level", weight: 0.45, active: true },
                { name: "Credit History", weight: 0.35, active: true },
                { name: "Recent Inquiries", weight: -0.20, active: true },
                { name: "Age", weight: 0.15, active: true },
                { name: "Debt-to-Income", weight: -0.30, active: true }
            ];
            
            let baseScore = 0.5;
            let currentScore = 0;
            let targetScore = 0;
            
            const btnWidth = 160;
            const btnHeight = 40;
            const startX = 50;
            const startY = 100;
            const gap = 60;
            
            const handleCanvasClick = (e) => {
                const rect = canvas.getBoundingClientRect();
                const x = (e.clientX - rect.left) * (canvas.width / rect.width);
                const y = (e.clientY - rect.top) * (canvas.height / rect.height);
                
                for(let i=0; i<features.length; i++) {
                    const bx = startX;
                    const by = startY + i * gap;
                    
                    if(x >= bx && x <= bx + btnWidth && y >= by && y <= by + btnHeight) {
                        features[i].active = !features[i].active;
                    }
                }
            };
            
            canvas.addEventListener('click', handleCanvasClick);
            this._cleanupClick = () => canvas.removeEventListener('click', handleCanvasClick);
            
            function draw() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                // Calculate target score
                targetScore = baseScore;
                features.forEach(f => {
                    if(f.active) targetScore += f.weight;
                });
                // Clamp
                targetScore = Math.max(0, Math.min(1, targetScore));
                
                // Animate score
                currentScore += (targetScore - currentScore) * 0.1;
                
                // Draw Feature Toggles and Bars
                const barStartX = startX + btnWidth + 150;
                const barCenter = barStartX + 200; // Zero point for SHAP
                
                ctx.fillStyle = '#64748B';
                ctx.fillRect(barCenter, startY - 20, 2, features.length * gap);
                ctx.font = '12px sans-serif';
                ctx.fillText('Impact on Prediction', barCenter - 50, startY - 30);
                
                features.forEach((f, i) => {
                    const bx = startX;
                    const by = startY + i * gap;
                    
                    // Button
                    ctx.fillStyle = f.active ? '#34D399' : '#64748B';
                    ctx.fillRect(bx, by, btnWidth, btnHeight);
                    ctx.fillStyle = '#080818';
                    ctx.font = '14px sans-serif';
                    ctx.textAlign = 'center';
                    ctx.fillText(f.name + (f.active ? ' (ON)' : ' (OFF)'), bx + btnWidth/2, by + 25);
                    
                    // Bar
                    if (f.active) {
                        const barWidth = f.weight * 300;
                        ctx.fillStyle = f.weight > 0 ? '#34D399' : '#F472B6';
                        
                        if (f.weight > 0) {
                            ctx.fillRect(barCenter, by + 10, barWidth, 20);
                        } else {
                            ctx.fillRect(barCenter + barWidth, by + 10, -barWidth, 20);
                        }
                        
                        ctx.fillStyle = '#E2E8F0';
                        ctx.textAlign = f.weight > 0 ? 'left' : 'right';
                        ctx.fillText((f.weight > 0 ? '+' : '') + f.weight.toFixed(2), 
                                     f.weight > 0 ? barCenter + barWidth + 10 : barCenter + barWidth - 10, 
                                     by + 25);
                    }
                });
                
                // Draw Final Score Gauge
                const gaugeX = 750;
                const gaugeY = 250;
                const gaugeR = 80;
                
                ctx.beginPath();
                ctx.arc(gaugeX, gaugeY, gaugeR, Math.PI, 0);
                ctx.lineWidth = 15;
                ctx.strokeStyle = '#334155';
                ctx.stroke();
                
                ctx.beginPath();
                ctx.arc(gaugeX, gaugeY, gaugeR, Math.PI, Math.PI + currentScore * Math.PI);
                ctx.strokeStyle = currentScore > 0.6 ? '#34D399' : (currentScore > 0.3 ? '#FBBF24' : '#F472B6');
                ctx.stroke();
                
                ctx.fillStyle = '#E2E8F0';
                ctx.textAlign = 'center';
                ctx.font = '24px sans-serif';
                ctx.fillText((currentScore * 100).toFixed(1) + '%', gaugeX, gaugeY - 20);
                ctx.font = '14px sans-serif';
                ctx.fillText('Approval Probability', gaugeX, gaugeY + 20);
                
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
