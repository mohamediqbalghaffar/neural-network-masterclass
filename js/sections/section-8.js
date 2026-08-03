(function() {
    'use strict';
    NeuralApp.registerSection({
        id: 8,
        title: "Transformers & Attention",
        icon: "🧠",
        content: `<div class="section-intro">
    <p>The Transformer architecture, introduced in "Attention Is All You Need", fundamentally shifted the paradigm from recurrent networks to attention mechanisms, unlocking unprecedented scale in deep learning.</p>
</div>

<div class="topic-card accent-cyan">
    <h3><span class="card-icon">🔍</span> 1. Self-Attention Mechanism</h3>
    <p>Self-attention allows the model to weigh the importance of different tokens in the input sequence when encoding a specific token.</p>
    <p>For each token, we compute three vectors from its embedding: <strong>Query (Q)</strong>, <strong>Key (K)</strong>, and <strong>Value (V)</strong>.</p>
    <div class="math-block"><span class="math-display">Attention(Q, K, V) = softmax\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right) V</span></div>
    <p>Why scale by $\\sqrt{d_k}$? Without it, dot products grow large in high dimensions, pushing the softmax function into regions with very small gradients (saturation).</p>
    <div class="highlight-box info">
        <div class="highlight-title">Analytics Connection</div>
        <p>Self-attention is like a dynamic similarity matrix. Each token "queries" all other tokens (keys) to determine how much of their "value" to incorporate.</p>
    </div>
</div>

<div class="topic-card accent-purple">
    <h3><span class="card-icon">🧠</span> 2. Multi-Head Attention</h3>
    <p>Instead of computing a single attention pass, transformers compute multiple independent attention "heads" in parallel.</p>
    <div class="math-block"><span class="math-display">MultiHead = Concat(head_1, ..., head_h) W^O</span></div>
    <p>where each head is computed as:</p>
    <div class="math-block"><span class="math-display">head_i = Attention(Q W_i^Q, K W_i^K, V W_i^V)</span></div>
    <p>This allows the model to jointly attend to information from different representation subspaces at different positions. For example, one head might focus on syntax, another on semantics, and another on positional relationships.</p>
</div>

<div class="topic-card accent-pink">
    <h3><span class="card-icon">📍</span> 3. Positional Encoding</h3>
    <p>Unlike RNNs, transformers process tokens in parallel and have no built-in notion of order. To inject sequence order, we add positional encodings to the input embeddings.</p>
    <div class="math-block"><span class="math-display">PE_{(pos, 2i)} = \\sin(pos / 10000^{2i/d_{model}})</span></div>
    <div class="math-block"><span class="math-display">PE_{(pos, 2i+1)} = \\cos(pos / 10000^{2i/d_{model}})</span></div>
    <p>Modern variants often use learned positional embeddings or Rotary Position Embedding (RoPE), which injects relative positional information directly into the attention mechanism.</p>
</div>

<div class="topic-card accent-emerald">
    <h3><span class="card-icon">🏗️</span> 4. The Full Transformer Architecture</h3>
    <p>The original transformer consists of an encoder-decoder structure.</p>
    <ul>
        <li><strong>Encoder:</strong> Repeated blocks of Self-Attention $\\rightarrow$ Add & Norm $\\rightarrow$ Feed-Forward $\\rightarrow$ Add & Norm.</li>
        <li><strong>Decoder:</strong> Masked Self-Attention $\\rightarrow$ Cross-Attention (to encoder outputs) $\\rightarrow$ Feed-Forward.</li>
    </ul>
    <p>Layer Normalization and Residual (Skip) Connections stabilize training in deep networks by providing direct gradient paths.</p>
    <div class="highlight-box info">
        <div class="highlight-title">Analytics Connection</div>
        <p>Residual connections are analogous to ensemble averaging — they allow the network to incrementally refine representations without losing the original signal.</p>
    </div>
</div>

<div class="topic-card accent-amber">
    <h3><span class="card-icon">🔄</span> 5. BERT vs GPT vs T5 vs ViT</h3>
    <div class="comparison-table">
        <table>
            <thead>
                <tr>
                    <th>Model</th>
                    <th>Architecture</th>
                    <th>Training Objective</th>
                    <th>Typical Use Cases</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>BERT</strong></td>
                    <td>Encoder-only</td>
                    <td>Masked Language Modeling (MLM)</td>
                    <td>Text classification, NER, QA</td>
                </tr>
                <tr>
                    <td><strong>GPT</strong></td>
                    <td>Decoder-only</td>
                    <td>Causal Language Modeling</td>
                    <td>Text generation, Chatbots</td>
                </tr>
                <tr>
                    <td><strong>T5</strong></td>
                    <td>Encoder-Decoder</td>
                    <td>Span Corruption (Text-to-Text)</td>
                    <td>Translation, Summarization</td>
                </tr>
                <tr>
                    <td><strong>ViT</strong></td>
                    <td>Encoder-only</td>
                    <td>Supervised (Image Patches)</td>
                    <td>Image classification</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

<div class="topic-card accent-blue">
    <h3><span class="card-icon">⚡</span> 6. Attention Complexity & Efficient Transformers</h3>
    <p>The standard attention mechanism computes pairwise interactions between all tokens, resulting in $O(N^2)$ memory and time complexity where $N$ is sequence length.</p>
    <ul>
        <li><strong>Hardware Optimization:</strong> Flash Attention optimizes GPU memory reads/writes to compute exact attention much faster.</li>
        <li><strong>Approximations:</strong> Sparse attention and linear attention reduce complexity to $O(N)$ or $O(N \\log N)$.</li>
        <li><strong>Context Extensions:</strong> Techniques like sliding windows or ALiBi allow processing sequences beyond the training context limit.</li>
    </ul>
</div>

<div class="topic-card">
    <h3><span class="card-icon">🎛️</span> 7. Interactive Demo: Attention Heatmap</h3>
    <p>Click on words in the source sentence to see how much attention they pay to other words in the sequence. Thicker, more opaque lines indicate higher attention weights.</p>
    <p><em>(See the live demo below)</em></p>
</div>

<div class="key-takeaway">
    <h4>Key Takeaways</h4>
    <ul>
        <li>Attention routes information dynamically based on content similarity.</li>
        <li>Multi-head attention captures different relationship types simultaneously.</li>
        <li>The Transformer has become the universal architecture for text, vision, and audio.</li>
        <li>$O(N^2)$ complexity is the main bottleneck; efficient attention methods are active research.</li>
        <li>Positional encoding injects sequence order into an otherwise permutation-invariant architecture.</li>
    </ul>
        `,
        contentAr: `
<div class="section-intro">
    <p>أحدثت معمارية المحولات (Transformer)، التي تم تقديمها في ورقة "الاهتمام هو كل ما تحتاجه (Attention Is All You Need)"، تحولاً جذرياً في النموذج من الشبكات المتكررة إلى آليات الاهتمام، مما أطلق العنان لنطاق غير مسبوق في التعلم العميق.</p>
</div>

<div class="topic-card accent-cyan">
    <h3><span class="card-icon">🔍</span> 1. آلية الاهتمام الذاتي (Self-Attention)</h3>
    <p>يسمح الاهتمام الذاتي للنموذج بوزن أهمية الرموز (tokens) المختلفة في تسلسل الإدخال عند تشفير رمز معين.</p>
    <p>لكل رمز، نحسب ثلاثة متجهات من تضمينه (embedding): <strong>الاستعلام (Query - Q)</strong>، <strong>المفتاح (Key - K)</strong>، و <strong>القيمة (Value - V)</strong>.</p>
    <div class="math-block"><span class="math-display">Attention(Q, K, V) = softmax\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right) V</span></div>
    <p>لماذا القياس بواسطة $\\sqrt{d_k}$؟ بدونه، تنمو النواتج النقطية (dot products) بشكل كبير في الأبعاد العالية، مما يدفع دالة softmax إلى مناطق ذات تدرجات صغيرة جداً (التشبع - saturation).</p>
    <div class="highlight-box info">
        <div class="highlight-title">ارتباط بالتحليل</div>
        <p>الاهتمام الذاتي يشبه مصفوفة التشابه الديناميكية. كل رمز "يستعلم" (queries) جميع الرموز الأخرى (المفاتيح) لتحديد مقدار "قيمتها" التي يجب دمجها.</p>
    </div>
</div>

<div class="topic-card accent-purple">
    <h3><span class="card-icon">🧠</span> 2. الاهتمام متعدد الرؤوس (Multi-Head Attention)</h3>
    <p>بدلاً من حساب تمريرة اهتمام واحدة، تحسب المحولات عدة "رؤوس" اهتمام مستقلة بالتوازي.</p>
    <div class="math-block"><span class="math-display">MultiHead = Concat(head_1, ..., head_h) W^O</span></div>
    <p>حيث يتم حساب كل رأس كالتالي:</p>
    <div class="math-block"><span class="math-display">head_i = Attention(Q W_i^Q, K W_i^K, V W_i^V)</span></div>
    <p>هذا يسمح للنموذج بالاهتمام المشترك بالمعلومات من مساحات تمثيل فرعية مختلفة في مواضع مختلفة. على سبيل المثال، قد يركز أحد الرؤوس على بناء الجملة (syntax)، وآخر على الدلالات (semantics)، وآخر على العلاقات الموضعية.</p>
</div>

<div class="topic-card accent-pink">
    <h3><span class="card-icon">📍</span> 3. التشفير الموضعي (Positional Encoding)</h3>
    <p>على عكس RNNs، تعالج المحولات الرموز بالتوازي وليس لديها مفهوم مدمج للترتيب. لحقن ترتيب التسلسل، نضيف التشفيرات الموضعية إلى تضمينات الإدخال.</p>
    <div class="math-block"><span class="math-display">PE_{(pos, 2i)} = \\sin(pos / 10000^{2i/d_{model}})</span></div>
    <div class="math-block"><span class="math-display">PE_{(pos, 2i+1)} = \\cos(pos / 10000^{2i/d_{model}})</span></div>
    <p>تستخدم المتغيرات الحديثة غالباً التضمينات الموضعية المكتسبة أو التضمين الموضعي الدوار (RoPE)، والذي يحقن المعلومات الموضعية النسبية مباشرة في آلية الاهتمام.</p>
</div>

<div class="topic-card accent-emerald">
    <h3><span class="card-icon">🏗️</span> 4. المعمارية الكاملة للمحول (Transformer)</h3>
    <p>يتكون المحول الأصلي من هيكل مشفر-مفكك (encoder-decoder).</p>
    <ul>
        <li><strong>المشفر (Encoder):</strong> كتل متكررة من الاهتمام الذاتي $\\rightarrow$ إضافة وتسوية $\\rightarrow$ تغذية أمامية $\\rightarrow$ إضافة وتسوية.</li>
        <li><strong>المفكك (Decoder):</strong> اهتمام ذاتي مقنع (Masked Self-Attention) $\\rightarrow$ اهتمام متقاطع (Cross-Attention - مع مخرجات المشفر) $\\rightarrow$ تغذية أمامية.</li>
    </ul>
    <p>تعمل تسوية الطبقة (Layer Normalization) والاتصالات المتبقية (Residual Connections) على استقرار التدريب في الشبكات العميقة من خلال توفير مسارات تدرج مباشرة.</p>
    <div class="highlight-box info">
        <div class="highlight-title">ارتباط بالتحليل</div>
        <p>تشبه الاتصالات المتبقية متوسط التجميع (ensemble averaging) — فهي تسمح للشبكة بتحسين التمثيلات تدريجياً دون فقدان الإشارة الأصلية.</p>
    </div>
</div>

<div class="topic-card accent-amber">
    <h3><span class="card-icon">🔄</span> 5. مقارنة: BERT مقابل GPT مقابل T5 مقابل ViT</h3>
    <div class="comparison-table">
        <table>
            <thead>
                <tr>
                    <th>النموذج</th>
                    <th>المعمارية</th>
                    <th>هدف التدريب</th>
                    <th>حالات الاستخدام النموذجية</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>BERT</strong></td>
                    <td>مشفر فقط (Encoder-only)</td>
                    <td>نمذجة لغة مقنعة (MLM)</td>
                    <td>تصنيف النصوص، استخراج الكيانات (NER)، الإجابة على الأسئلة (QA)</td>
                </tr>
                <tr>
                    <td><strong>GPT</strong></td>
                    <td>مفكك فقط (Decoder-only)</td>
                    <td>نمذجة لغة سببية (Causal Language Modeling)</td>
                    <td>توليد النصوص، روبوتات المحادثة (Chatbots)</td>
                </tr>
                <tr>
                    <td><strong>T5</strong></td>
                    <td>مشفر-مفكك (Encoder-Decoder)</td>
                    <td>فساد النطاق (Span Corruption - Text-to-Text)</td>
                    <td>الترجمة، التلخيص</td>
                </tr>
                <tr>
                    <td><strong>ViT</strong></td>
                    <td>مشفر فقط (Encoder-only)</td>
                    <td>خاضع للإشراف (رقع الصور - Image Patches)</td>
                    <td>تصنيف الصور</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

<div class="topic-card accent-blue">
    <h3><span class="card-icon">⚡</span> 6. تعقيد الاهتمام والمحولات الفعالة</h3>
    <p>تحسب آلية الاهتمام القياسية التفاعلات الزوجية بين جميع الرموز، مما يؤدي إلى تعقيد في الذاكرة والوقت يبلغ $O(N^2)$ حيث $N$ هو طول التسلسل.</p>
    <ul>
        <li><strong>تحسين الأجهزة:</strong> يعمل الاهتمام السريع (Flash Attention) على تحسين قراءة/كتابة ذاكرة وحدة معالجة الرسومات (GPU) لحساب الاهتمام الدقيق بشكل أسرع بكثير.</li>
        <li><strong>التقريبات:</strong> يقلل الاهتمام المتناثر (Sparse attention) والاهتمام الخطي من التعقيد إلى $O(N)$ أو $O(N \\log N)$.</li>
        <li><strong>امتدادات السياق:</strong> تسمح تقنيات مثل النوافذ المنزلقة (sliding windows) أو ALiBi بمعالجة تسلسلات تتجاوز حد سياق التدريب.</li>
    </ul>
</div>

<div class="topic-card">
    <h3><span class="card-icon">🎛️</span> 7. عرض تفاعلي: الخريطة الحرارية للاهتمام (Attention Heatmap)</h3>
    <p>انقر على الكلمات في جملة المصدر لترى مقدار الاهتمام الذي توليه للكلمات الأخرى في التسلسل. تشير الخطوط الأكثر سمكاً ووضوحاً إلى أوزان اهتمام أعلى.</p>
    <p><em>(شاهد العرض المباشر بالأسفل)</em></p>
</div>

<div class="key-takeaway">
    <h4>أهم النقاط</h4>
    <ul>
        <li>يوجه الاهتمام المعلومات بشكل ديناميكي بناءً على تشابه المحتوى.</li>
        <li>يلتقط الاهتمام متعدد الرؤوس أنواع علاقات مختلفة في وقت واحد.</li>
        <li>أصبح المحول (Transformer) المعمارية العالمية للنصوص، الرؤية، والصوت.</li>
        <li>يعد التعقيد $O(N^2)$ هو عنق الزجاجة الرئيسي؛ تعتبر طرق الاهتمام الفعالة مجال بحث نشط.</li>
        <li>يحقن التشفير الموضعي ترتيب التسلسل في معمارية لا تتأثر بالتباديل بطبيعتها.</li>
    </ul>
</div>
        `,
        initDemo: function(container) {
            var words = ['The', 'cat', 'sat', 'on', 'the', 'mat'];
            var attentionMatrix = [
                [0.90, 0.05, 0.01, 0.01, 0.02, 0.01],
                [0.05, 0.85, 0.05, 0.01, 0.02, 0.02],
                [0.02, 0.10, 0.70, 0.08, 0.02, 0.08],
                [0.01, 0.02, 0.05, 0.85, 0.02, 0.05],
                [0.02, 0.02, 0.02, 0.02, 0.80, 0.12],
                [0.01, 0.05, 0.15, 0.10, 0.09, 0.60]
            ];
            var selectedWordIndex = 2;
            var animationId;

            var canvas = container.querySelector('canvas');
            if (!canvas) return;
            var ctx = canvas.getContext('2d');

            function draw() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                var wordBoxWidth = 60;
                var wordBoxHeight = 30;
                var spacing = (canvas.width - words.length * wordBoxWidth) / (words.length + 1);
                
                ctx.font = '16px sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                
                for (var i = 0; i < words.length; i++) {
                    var x = spacing + i * (wordBoxWidth + spacing);
                    var yTop = 50;
                    
                    ctx.fillStyle = i === selectedWordIndex ? '#0ea5e9' : '#334155';
                    ctx.fillRect(x, yTop, wordBoxWidth, wordBoxHeight);
                    ctx.fillStyle = '#fff';
                    ctx.fillText(words[i], x + wordBoxWidth/2, yTop + wordBoxHeight/2);
                    
                    var yBottom = canvas.height - 80;
                    ctx.fillStyle = '#334155';
                    ctx.fillRect(x, yBottom, wordBoxWidth, wordBoxHeight);
                    ctx.fillStyle = '#fff';
                    ctx.fillText(words[i], x + wordBoxWidth/2, yBottom + wordBoxHeight/2);
                }
                
                var srcX = spacing + selectedWordIndex * (wordBoxWidth + spacing) + wordBoxWidth/2;
                var srcY = 50 + wordBoxHeight;
                
                for (var j = 0; j < words.length; j++) {
                    var weight = attentionMatrix[selectedWordIndex][j];
                    var destX = spacing + j * (wordBoxWidth + spacing) + wordBoxWidth/2;
                    var destY = canvas.height - 80;
                    
                    ctx.beginPath();
                    ctx.moveTo(srcX, srcY);
                    ctx.bezierCurveTo(srcX, srcY + 100, destX, destY - 100, destX, destY);
                    
                    var alpha = weight;
                    ctx.strokeStyle = 'rgba(14, 165, 233, ' + alpha + ')';
                    ctx.lineWidth = Math.max(1, weight * 10);
                    ctx.stroke();
                }
                
                ctx.fillStyle = '#64748b';
                ctx.font = '14px sans-serif';
                ctx.fillText('Click a word on the top row to see its attention weights to other words', canvas.width / 2, 20);
                
                animationId = requestAnimationFrame(draw);
            }

            draw();

            const clickHandler = function(e) {
                var rect = canvas.getBoundingClientRect();
                var mouseX = (e.clientX - rect.left) * (canvas.width / rect.width);
                var mouseY = (e.clientY - rect.top) * (canvas.height / rect.height);
                
                var wordBoxWidth = 60;
                var wordBoxHeight = 30;
                var spacing = (canvas.width - words.length * wordBoxWidth) / (words.length + 1);
                
                for (var i = 0; i < words.length; i++) {
                    var x = spacing + i * (wordBoxWidth + spacing);
                    var yTop = 50;
                    
                    if (mouseX >= x && mouseX <= x + wordBoxWidth && mouseY >= yTop && mouseY <= yTop + wordBoxHeight) {
                        selectedWordIndex = i;
                        break;
                    }
                }
            };
            
            canvas.addEventListener('click', clickHandler);

            this._animationId = animationId;
            this._clickHandler = clickHandler;
            this._canvas = canvas;
        },
        destroyDemo: function() {
            if (this._animationId) {
                cancelAnimationFrame(this._animationId);
            }
            if (this._canvas && this._clickHandler) {
                this._canvas.removeEventListener('click', this._clickHandler);
            }
        }
    });
})();