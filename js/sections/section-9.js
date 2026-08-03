(function() {
    'use strict';
    
    NeuralApp.registerSection({
        id: 9,
        title: "Generative Models & Modern AI",
        icon: "✨",
        content: `
<div class="section-intro">
    <h2>Generative Models &amp; Modern AI</h2>
    <p>From predictive models to generative systems. This section covers the evolution of generative architectures, including Autoencoders, GANs, Diffusion models, and Large Language Models (LLMs).</p>
</div>

<div class="topic-card accent-cyan">
    <h3><span class="card-icon">🗜️</span> 1. Autoencoders</h3>
    <p>An Autoencoder learns to compress data into a lower-dimensional representation (the <strong>latent space</strong> or <strong>bottleneck</strong>) and then reconstruct it back to the original form.</p>
    <ul>
        <li><strong>Encoder $E(x)$:</strong> Compresses input into a bottleneck representation $z$.</li>
        <li><strong>Decoder $D(z)$:</strong> Reconstructs the original input from $z$.</li>
    </ul>
    <div class="math-block"><span class="math-display">L = \|x - D(E(x))\|^2</span></div>
    <div class="highlight-box info">
        <div class="highlight-title">Analytics Connection</div>
        <p>A linear autoencoder is mathematically equivalent to <strong>Principal Component Analysis (PCA)</strong>. Deep autoencoders perform non-linear dimensionality reduction.</p>
    </div>
    <p>Variants include denoising autoencoders (trained to remove noise), sparse autoencoders, and contractive autoencoders.</p>
</div>

<div class="topic-card accent-purple">
    <h3><span class="card-icon">🎲</span> 2. Variational Autoencoders (VAEs)</h3>
    <p>Instead of mapping an input to a fixed vector, a VAE maps inputs to a <strong>probability distribution</strong> in the latent space. This allows for smooth interpolation and generation of new samples.</p>
    <div class="math-block"><span class="math-display">L = L_{\text{reconstruction}} + D_{\text{KL}}(q(z|x) \parallel p(z))</span></div>
    <p>The Evidence Lower Bound (ELBO) loss balances reconstruction quality with the KL divergence, which forces the latent distribution to be close to a standard normal distribution.</p>
    <div class="highlight-box tip">
        <div class="highlight-title">The Reparameterization Trick</div>
        <p>To backpropagate through random sampling, VAEs use: <br> <span class="math-inline">z = \mu + \sigma \odot \epsilon</span>, where <span class="math-inline">\epsilon \sim \mathcal{N}(0, I)</span>.</p>
    </div>
</div>

<div class="topic-card accent-pink">
    <h3><span class="card-icon">⚔️</span> 3. Generative Adversarial Networks (GANs)</h3>
    <p>GANs cast generative modeling as a minimax game between two networks:</p>
    <ul>
        <li><strong>Generator ($G$):</strong> Tries to create fake data that looks real.</li>
        <li><strong>Discriminator ($D$):</strong> Tries to distinguish between real data and fake data from $G$.</li>
    </ul>
    <div class="math-block"><span class="math-display">\min_G \max_D V(D, G) = \mathbb{E}_{x}[\log D(x)] + \mathbb{E}_{z}[\log(1 - D(G(z)))]</span></div>
    <p><strong>Mode Collapse:</strong> A common failure mode where $G$ produces limited varieties of outputs. Addressed by architectures like Wasserstein GANs and techniques like spectral normalization.</p>
    <p><em>Notable Architectures:</em> DCGAN, StyleGAN, CycleGAN.</p>
</div>

<div class="topic-card accent-emerald">
    <h3><span class="card-icon">🌫️</span> 4. Diffusion Models</h3>
    <p>Diffusion models have largely superseded GANs for high-quality image generation (e.g., Stable Diffusion, DALL-E, Midjourney).</p>
    <ul>
        <li><strong>Forward Process:</strong> Gradually adds Gaussian noise to the data over $T$ steps until it is pure noise.</li>
        <li><strong>Reverse Process:</strong> A neural network (often a U-Net) learns to sequentially denoise the data step-by-step.</li>
    </ul>
    <div class="highlight-box important">
        <div class="highlight-title">Why they beat GANs</div>
        <p>Diffusion models offer far more stable training and better mode coverage (diversity of generated samples) than GANs, though generation is typically slower due to the sequential denoising process.</p>
    </div>
</div>

<div class="topic-card accent-amber">
    <h3><span class="card-icon">🦜</span> 5. Large Language Models (LLMs)</h3>
    <p>Modern LLMs are predominantly based on the Transformer architecture, trained on massive datasets using autoregressive <strong>next-token prediction</strong>.</p>
    <ul>
        <li><strong>Tokenization:</strong> Text is chunked into subwords (tokens) using algorithms like Byte-Pair Encoding (BPE) or SentencePiece.</li>
        <li><strong>Scaling Laws:</strong> Model performance improves predictably with increases in compute, dataset size, and parameter count.</li>
        <li><strong>Emergent Abilities:</strong> At sufficient scale, LLMs demonstrate zero-shot and few-shot capabilities not explicitly trained for.</li>
    </ul>
    <p><strong>RLHF &amp; Alignment:</strong> Reinforcement Learning from Human Feedback is used to align model outputs with human preferences and safety guidelines.</p>
</div>

<div class="topic-card accent-blue">
    <h3><span class="card-icon">🏗️</span> 6. Multimodal &amp; Foundation Models</h3>
    <p>The current frontier involves models that can process and generate across multiple modalities (text, images, audio).</p>
    <ul>
        <li><strong>Multimodal Models:</strong> Examples include CLIP (contrastive text-image pairs), Flamingo, and GPT-4V.</li>
        <li><strong>Foundation Models:</strong> The paradigm of pretraining a massive model on diverse data at scale, which can then be fine-tuned or prompted for a wide variety of downstream tasks.</li>
    </ul>
</div>

<div class="topic-card">
    <h3><span class="card-icon">🎮</span> 7. Interactive Demo: Generative Latent Space</h3>
    <p>Click and drag in the 2D latent space on the left. The decoder neural network generates a procedural pattern on the right based on the chosen $z$ coordinates. Notice how the output smoothly interpolates as you move through the latent space.</p>
    <p><em>(See the live demo below)</em></p>
</div>

<div class="key-takeaway">
    <h4>Key Takeaways</h4>
    <ul>
        <li>Generative AI evolved from Autoencoders to VAEs, GANs, and Diffusion models.</li>
        <li>LLMs rely on next-token prediction scaled to massive datasets.</li>
        <li>Diffusion models offer better training stability than GANs.</li>
        <li>Foundation models (pretrain + fine-tune) represent the new paradigm of AI development.</li>
        <li>Latent space exploration enables interpolation and semantic manipulation.</li>
    </ul>
</div>
`,
        contentAr: `
<div class="section-intro">
    <h2>النماذج التوليدية والذكاء الاصطناعي الحديث (Generative Models & Modern AI)</h2>
    <p>من النماذج التنبؤية إلى الأنظمة التوليدية. يغطي هذا القسم تطور المعماريات التوليدية، بما في ذلك أجهزة التشفير التلقائي (Autoencoders)، وشبكات الخصومة التوليدية (GANs)، ونماذج الانتشار (Diffusion models)، والنماذج اللغوية الكبيرة (LLMs).</p>
</div>

<div class="topic-card accent-cyan">
    <h3><span class="card-icon">🗜️</span> 1. أجهزة التشفير التلقائي (Autoencoders)</h3>
    <p>يتعلم التشفير التلقائي ضغط البيانات إلى تمثيل منخفض الأبعاد (<strong>المساحة الكامنة - latent space</strong> أو <strong>عنق الزجاجة - bottleneck</strong>) ثم إعادة بنائها مرة أخرى إلى الشكل الأصلي.</p>
    <ul>
        <li><strong>المشفر (Encoder - $E(x)$):</strong> يضغط المدخلات في تمثيل عنق الزجاجة $z$.</li>
        <li><strong>المفكك (Decoder - $D(z)$):</strong> يعيد بناء المدخلات الأصلية من $z$.</li>
    </ul>
    <div class="math-block"><span class="math-display">L = \\|x - D(E(x))\\|^2</span></div>
    <div class="highlight-box info">
        <div class="highlight-title">ارتباط بالتحليل</div>
        <p>جهاز التشفير التلقائي الخطي مكافئ رياضياً لـ <strong>تحليل المكونات الرئيسية (PCA)</strong>. تقوم أجهزة التشفير التلقائي العميقة بتقليل الأبعاد غير الخطية.</p>
    </div>
    <p>تشمل المتغيرات أجهزة التشفير التلقائي لإزالة الضوضاء (denoising autoencoders - المدربة على إزالة الضوضاء)، وأجهزة التشفير التلقائي المتناثرة (sparse autoencoders)، وأجهزة التشفير التلقائي الانكماشية (contractive autoencoders).</p>
</div>

<div class="topic-card accent-purple">
    <h3><span class="card-icon">🎲</span> 2. أجهزة التشفير التلقائي التغايرية (VAEs)</h3>
    <p>بدلاً من تعيين إدخال إلى متجه ثابت، يقوم VAE بتعيين المدخلات إلى <strong>توزيع احتمالي</strong> في المساحة الكامنة. هذا يسمح بالاستيفاء السلس وتوليد عينات جديدة.</p>
    <div class="math-block"><span class="math-display">L = L_{\\text{reconstruction}} + D_{\\text{KL}}(q(z|x) \\parallel p(z))</span></div>
    <p>توازن خسارة الحد الأدنى للأدلة (ELBO) بين جودة إعادة البناء وتباعد KL (KL divergence)، مما يجبر التوزيع الكامن على أن يكون قريباً من التوزيع الطبيعي القياسي.</p>
    <div class="highlight-box tip">
        <div class="highlight-title">خدعة إعادة المعايرة (Reparameterization Trick)</div>
        <p>للانتشار الخلفي عبر أخذ العينات العشوائية، تستخدم VAEs: <br> <span class="math-inline">z = \\mu + \\sigma \\odot \\epsilon</span>، حيث <span class="math-inline">\\epsilon \\sim \\mathcal{N}(0, I)</span>.</p>
    </div>
</div>

<div class="topic-card accent-pink">
    <h3><span class="card-icon">⚔️</span> 3. شبكات الخصومة التوليدية (GANs)</h3>
    <p>تصيغ شبكات GAN النمذجة التوليدية كلعبة minimax بين شبكتين:</p>
    <ul>
        <li><strong>المولد (Generator - $G$):</strong> يحاول إنشاء بيانات مزيفة تبدو حقيقية.</li>
        <li><strong>المميز (Discriminator - $D$):</strong> يحاول التمييز بين البيانات الحقيقية والبيانات المزيفة من $G$.</li>
    </ul>
    <div class="math-block"><span class="math-display">\\min_G \\max_D V(D, G) = \\mathbb{E}_{x}[\\log D(x)] + \\mathbb{E}_{z}[\\log(1 - D(G(z)))]</span></div>
    <p><strong>انهيار الوضع (Mode Collapse):</strong> وضع فشل شائع حيث ينتج $G$ أنواعاً محدودة من المخرجات. يتم معالجته بواسطة معماريات مثل Wasserstein GANs وتقنيات مثل التسوية الطيفية (spectral normalization).</p>
    <p><em>معماريات بارزة:</em> DCGAN, StyleGAN, CycleGAN.</p>
</div>

<div class="topic-card accent-emerald">
    <h3><span class="card-icon">🌫️</span> 4. نماذج الانتشار (Diffusion Models)</h3>
    <p>حلت نماذج الانتشار محل شبكات GAN إلى حد كبير لتوليد صور عالية الجودة (مثل Stable Diffusion و DALL-E و Midjourney).</p>
    <ul>
        <li><strong>العملية الأمامية (Forward Process):</strong> تضيف تدريجياً ضوضاء غاوسية (Gaussian noise) إلى البيانات عبر $T$ خطوات حتى تصبح ضوضاء نقية.</li>
        <li><strong>العملية العكسية (Reverse Process):</strong> تتعلم شبكة عصبية (غالباً U-Net) إزالة الضوضاء من البيانات خطوة بخطوة.</li>
    </ul>
    <div class="highlight-box important">
        <div class="highlight-title">لماذا تتفوق على شبكات GAN</div>
        <p>توفر نماذج الانتشار تدريباً أكثر استقراراً وتغطية وضع أفضل (تنوع العينات المولدة) بكثير من شبكات GAN، على الرغم من أن التوليد عادةً ما يكون أبطأ بسبب عملية إزالة الضوضاء التسلسلية.</p>
    </div>
</div>

<div class="topic-card accent-amber">
    <h3><span class="card-icon">🦜</span> 5. النماذج اللغوية الكبيرة (LLMs)</h3>
    <p>تعتمد النماذج اللغوية الكبيرة (LLMs) الحديثة في الغالب على معمارية Transformer، ويتم تدريبها على مجموعات بيانات ضخمة باستخدام <strong>التنبؤ بالرمز التالي (next-token prediction)</strong> ذاتي الانحدار.</p>
    <ul>
        <li><strong>الترميز (Tokenization):</strong> يتم تقسيم النص إلى كلمات فرعية (رموز) باستخدام خوارزميات مثل Byte-Pair Encoding (BPE) أو SentencePiece.</li>
        <li><strong>قوانين القياس (Scaling Laws):</strong> يتحسن أداء النموذج بشكل متوقع مع زيادة الحوسبة، وحجم مجموعة البيانات، وعدد المعلمات.</li>
        <li><strong>القدرات الناشئة (Emergent Abilities):</strong> عند نطاق كافٍ، تظهر النماذج اللغوية الكبيرة (LLMs) قدرات (zero-shot) و (few-shot) لم يتم تدريبها صراحةً عليها.</li>
    </ul>
    <p><strong>RLHF والمحاذاة:</strong> يتم استخدام التعلم المعزز من الملاحظات البشرية (Reinforcement Learning from Human Feedback) لمواءمة مخرجات النموذج مع التفضيلات البشرية وإرشادات السلامة.</p>
</div>

<div class="topic-card accent-blue">
    <h3><span class="card-icon">🏗️</span> 6. النماذج متعددة الوسائط والأساسية (Multimodal & Foundation Models)</h3>
    <p>تتضمن الحدود الحالية نماذج يمكنها معالجة وإنشاء عبر وسائط متعددة (نص، صور، صوت).</p>
    <ul>
        <li><strong>النماذج متعددة الوسائط (Multimodal Models):</strong> تشمل الأمثلة CLIP (أزواج نص-صورة متناقضة)، Flamingo، و GPT-4V.</li>
        <li><strong>النماذج الأساسية (Foundation Models):</strong> نموذج التدريب المسبق لنموذج ضخم على بيانات متنوعة على نطاق واسع، والذي يمكن بعد ذلك ضبطه بدقة أو توجيهه لمجموعة متنوعة من المهام النهائية.</li>
    </ul>
</div>

<div class="topic-card">
    <h3><span class="card-icon">🎮</span> 7. عرض تفاعلي: المساحة الكامنة التوليدية (Generative Latent Space)</h3>
    <p>انقر واسحب في المساحة الكامنة ثنائية الأبعاد على اليسار. تقوم الشبكة العصبية للمفكك بإنشاء نمط إجرائي على اليمين بناءً على إحداثيات $z$ المختارة. لاحظ كيف يتم استيفاء الإخراج بسلاسة وأنت تتحرك عبر المساحة الكامنة.</p>
    <p><em>(شاهد العرض المباشر بالأسفل)</em></p>
</div>

<div class="key-takeaway">
    <h4>أهم النقاط</h4>
    <ul>
        <li>تطور الذكاء الاصطناعي التوليدي من أجهزة التشفير التلقائي (Autoencoders) إلى VAEs و GANs ونماذج الانتشار (Diffusion models).</li>
        <li>تعتمد النماذج اللغوية الكبيرة (LLMs) على التنبؤ بالرمز التالي الذي يتم قياسه إلى مجموعات بيانات ضخمة.</li>
        <li>توفر نماذج الانتشار استقراراً أفضل في التدريب مقارنة بشبكات GAN.</li>
        <li>تمثل النماذج الأساسية (تدريب مسبق + ضبط دقيق) النموذج الجديد لتطوير الذكاء الاصطناعي.</li>
        <li>يتيح استكشاف المساحة الكامنة (Latent space) الاستيفاء والمعالجة الدلالية.</li>
    </ul>
</div>
`,
        initDemo: function(container) {

var latentCanvas = null;
var genCanvas = null;
var latentCtx = null;
var genCtx = null;
var currentZ = { x: 0, y: 0 };
var targetZ = { x: 0, y: 0 };
var isDragging = false;
var animationFrameId = null;
var time = 0;

function setupDemo(container) {
    var demoHTML = '<div style="display: flex; gap: 20px; margin-top: 20px; align-items: flex-start; flex-wrap: wrap;">' +
        '<div style="flex: 1; min-width: 250px; background: #1e293b; padding: 15px; border-radius: 8px;">' +
            '<h4 style="margin-top:0; color:#e2e8f0; text-align:center;">Latent Space Z (2D)</h4>' +
            '<canvas id="latentSpaceCanvas" width="250" height="250" style="background:#0f172a; border-radius:4px; cursor:crosshair; width:100%; max-width:250px; display:block; margin:0 auto;"></canvas>' +
            '<p style="text-align:center; font-size:0.85em; color:#94a3b8; margin-bottom:0; margin-top:10px;">Click & drag to explore</p>' +
        '</div>' +
        '<div style="flex: 1; min-width: 250px; background: #1e293b; padding: 15px; border-radius: 8px;">' +
            '<h4 style="margin-top:0; color:#e2e8f0; text-align:center;">Generated Output D(z)</h4>' +
            '<canvas id="genOutputCanvas" width="250" height="250" style="background:#000; border-radius:4px; width:100%; max-width:250px; display:block; margin:0 auto;"></canvas>' +
        '</div>' +
    '</div>';

    container.innerHTML = demoHTML;

    latentCanvas = container.querySelector('#latentSpaceCanvas');
    genCanvas = container.querySelector('#genOutputCanvas');
    latentCtx = latentCanvas.getContext('2d');
    genCtx = genCanvas.getContext('2d');

    // Setup interactions
    function updateZFromEvent(e) {
        var rect = latentCanvas.getBoundingClientRect();
        var scaleX = latentCanvas.width / rect.width;
        var scaleY = latentCanvas.height / rect.height;
        var x = (e.clientX - rect.left) * scaleX;
        var y = (e.clientY - rect.top) * scaleY;
        
        // Map to -1 to 1
        targetZ.x = (x / latentCanvas.width) * 2 - 1;
        targetZ.y = (y / latentCanvas.height) * 2 - 1;
        
        // Clamp
        targetZ.x = Math.max(-1, Math.min(1, targetZ.x));
        targetZ.y = Math.max(-1, Math.min(1, targetZ.y));
    }

    latentCanvas.addEventListener('mousedown', function(e) {
        isDragging = true;
        updateZFromEvent(e);
    });

    window.addEventListener('mouseup', function() {
        isDragging = false;
    });

    window.addEventListener('mousemove', function(e) {
        if (isDragging) {
            updateZFromEvent(e);
        }
    });
    
    latentCanvas.addEventListener('touchstart', function(e) {
        if (e.touches.length > 0) {
            isDragging = true;
            updateZFromEvent(e.touches[0]);
            e.preventDefault();
        }
    }, {passive: false});
    
    window.addEventListener('touchend', function() {
        isDragging = false;
    });
    
    window.addEventListener('touchmove', function(e) {
        if (isDragging && e.touches.length > 0) {
            updateZFromEvent(e.touches[0]);
        }
    }, {passive: false});

    // Start animation loop
    animate();
}

function drawLatentSpace() {
    if (!latentCtx) return;
    var width = latentCanvas.width;
    var height = latentCanvas.height;
    
    latentCtx.clearRect(0, 0, width, height);
    
    // Draw grid
    latentCtx.strokeStyle = '#334155';
    latentCtx.lineWidth = 1;
    latentCtx.beginPath();
    latentCtx.moveTo(width/2, 0);
    latentCtx.lineTo(width/2, height);
    latentCtx.moveTo(0, height/2);
    latentCtx.lineTo(width, height/2);
    latentCtx.stroke();
    
    // Draw concentric circles (prior distribution visual)
    latentCtx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
    for(var r = 0.2; r <= 1.0; r += 0.2) {
        latentCtx.beginPath();
        latentCtx.arc(width/2, height/2, (width/2) * r, 0, Math.PI * 2);
        latentCtx.stroke();
    }
    
    // Draw current Z point
    var px = (currentZ.x + 1) / 2 * width;
    var py = (currentZ.y + 1) / 2 * height;
    
    // Glow
    var grad = latentCtx.createRadialGradient(px, py, 0, px, py, 15);
    grad.addColorStop(0, 'rgba(236, 72, 153, 0.8)');
    grad.addColorStop(1, 'rgba(236, 72, 153, 0)');
    latentCtx.fillStyle = grad;
    latentCtx.beginPath();
    latentCtx.arc(px, py, 15, 0, Math.PI * 2);
    latentCtx.fill();
    
    // Core dot
    latentCtx.fillStyle = '#ec4899';
    latentCtx.beginPath();
    latentCtx.arc(px, py, 5, 0, Math.PI * 2);
    latentCtx.fill();
}

function generateImage() {
    if (!genCtx) return;
    var width = genCanvas.width;
    var height = genCanvas.height;
    var imageData = genCtx.createImageData(width, height);
    var data = imageData.data;
    
    time += 0.05;
    
    // "Decoder network" - procedural math based on Z
    var z1 = currentZ.x * 5;
    var z2 = currentZ.y * 5;
    
    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            // Map pixel coords to -1 to 1
            var nx = (x / width) * 2 - 1;
            var ny = (y / height) * 2 - 1;
            
            // Complex procedural math to simulate generated features
            var d = Math.sqrt(nx*nx + ny*ny);
            var a = Math.atan2(ny, nx);
            
            var rVal = Math.sin(d * 10 - time + z1) * Math.cos(a * 4 + z2);
            var gVal = Math.cos(d * 8 + time * 0.8 - z2) * Math.sin(a * 3 - z1);
            var bVal = Math.sin(nx * 5 + z1) * Math.cos(ny * 5 + z2);
            
            // Add some "neural" noise/texture
            var noise = (Math.sin(nx * 100) * Math.cos(ny * 100)) * 0.1;
            
            // Normalize to 0-255
            var r = Math.floor((rVal + noise + 1) / 2 * 255);
            var g = Math.floor((gVal + noise + 1) / 2 * 255);
            var b = Math.floor((bVal + noise + 1) / 2 * 255);
            
            var index = (y * width + x) * 4;
            data[index] = r;
            data[index+1] = g;
            data[index+2] = b;
            data[index+3] = 255; // Alpha
        }
    }
    
    genCtx.putImageData(imageData, 0, 0);
}

function animate() {
    // Interpolate towards target (smooth movement)
    currentZ.x += (targetZ.x - currentZ.x) * 0.1;
    currentZ.y += (targetZ.y - currentZ.y) * 0.1;
    
    drawLatentSpace();
    generateImage();
    
    animationFrameId = requestAnimationFrame(animate);
}

setupDemo(container);

        },
        destroyDemo: function() {
            if (typeof animationFrameId !== 'undefined' && animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
            if (typeof isDragging !== 'undefined') {
                isDragging = false;
            }
        }
    });
})();
