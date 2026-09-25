(function () {
  // 1. Blokir shortcut inspect element (F12, Ctrl+U, Ctrl+Shift+I/J/C)
  document.addEventListener('keydown', function (e) {
    if (
      e.key === 'F12' ||
      (e.ctrlKey && (e.key === 'u' || e.key === 'U' || (e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C'))))
    ) {
      e.preventDefault();
      return false;
    }
  });

  // 2. Inject External Resources
  const metaTheme = document.createElement('meta');
  metaTheme.name = 'theme-color';
  metaTheme.content = '#050505';
  document.head.appendChild(metaTheme);

  const fontPreconnect1 = document.createElement('link');
  fontPreconnect1.rel = 'preconnect';
  fontPreconnect1.href = 'https://fonts.googleapis.com';
  document.head.appendChild(fontPreconnect1);

  const fontPreconnect2 = document.createElement('link');
  fontPreconnect2.rel = 'preconnect';
  fontPreconnect2.href = 'https://fonts.gstatic.com';
  fontPreconnect2.crossOrigin = 'anonymous';
  document.head.appendChild(fontPreconnect2);

  const fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=Inter:wght@300;400;500;600;700&display=swap';
  document.head.appendChild(fontLink);

  const scriptTailwind = document.createElement('script');
  scriptTailwind.src = 'https://cdn.tailwindcss.com';
  document.head.appendChild(scriptTailwind);

  const scriptIcons = document.createElement('script');
  scriptIcons.src = 'https://unpkg.com/@phosphor-icons/web';
  document.head.appendChild(scriptIcons);

  // 3. Inject CSS Styles
  const styleEl = document.createElement('style');
  styleEl.innerHTML = `
    :root { --bg-deep: #050505; }
    html { background-color: var(--bg-deep); overscroll-behavior-y: none; }
    body { font-family: 'Inter', sans-serif; background-color: var(--bg-deep); color: #fff; overflow-x: hidden; min-height: 100vh; display: flex; flex-direction: column; }
    .font-cyber { font-family: 'Orbitron', sans-serif; }
    @keyframes cyber-flow { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
    .bg-monochrome-animated { background: linear-gradient(135deg, #000000, #1a1a1a, #0a0a0a, #333333, #000000); background-size: 400% 400%; animation: cyber-flow 18s ease infinite; background-attachment: fixed; }
    .bg-grid { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px); background-size: 30px 30px; pointer-events: none; z-index: 0; }
    .glass-panel { background: rgba(20, 20, 20, 0.6); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.1); border-top: 1px solid rgba(255, 255, 255, 0.25); box-shadow: 0 10px 40px 0 rgba(0, 0, 0, 0.8), inset 0 0 20px rgba(255, 255, 255, 0.03); }
    .glass-input { background: rgba(0, 0, 0, 0.5); border: 1px solid rgba(255, 255, 255, 0.2); color: #ffffff; transition: all 0.3s ease; }
    .glass-input:focus, .glass-input:hover { border-color: rgba(255, 255, 255, 0.6); box-shadow: 0 0 15px rgba(255, 255, 255, 0.15); outline: none; }
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: #050505; }
    ::-webkit-scrollbar-thumb { background: #444; border-radius: 4px; }
    .loader { border: 3px solid rgba(255, 255, 255, 0.1); border-top: 3px solid #000; border-radius: 50%; width: 22px; height: 22px; animation: spin 1s linear infinite; }
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    .hidden-el { display: none !important; }
    .img-preview { object-fit: contain; width: 100%; height: 100%; border-radius: 0.5rem; }
  `;
  document.head.appendChild(styleEl);

  // 4. Render UI
  document.body.className = 'bg-monochrome-animated relative';
  const root = document.getElementById('root');
  root.innerHTML = `
    <div class="bg-grid"></div>
    <div id="toast-container" class="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none"></div>

    <main class="relative z-10 max-w-4xl mx-auto p-4 md:p-8 flex-grow flex flex-col items-center justify-center w-full">
      <header class="text-center mb-8 w-full">
        <div class="inline-flex items-center gap-2 bg-black/40 border border-white/10 px-4 py-1.5 rounded-full font-mono text-[10px] text-gray-300 uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
          <span class="w-2 h-2 rounded-full bg-white animate-pulse"></span> SYSTEM ACTIVE
        </div>
        <h1 class="font-cyber text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] mb-2 tracking-wider">
          VannMrtnz
        </h1>
        <p class="text-gray-300 text-sm md:text-base font-medium tracking-[0.2em] uppercase">Visual To Prompt Engine</p>
      </header>

      <div class="glass-panel rounded-2xl w-full flex flex-col overflow-hidden relative p-4 md:p-8 gap-6">
        <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50"></div>
        <div class="text-center md:text-left border-b border-white/10 pb-4">
          <h2 class="text-xl md:text-2xl font-semibold text-white mb-2 flex items-center justify-center md:justify-start gap-2">
            <i class="ph-fill ph-aperture text-gray-300"></i> Ekstraksi Visual 8K
          </h2>
          <p class="text-gray-400 text-sm">Unggah gambar target. AI akan membedah anatomi visual secara absolut dan menghasilkan prompt Mandarin standar Studio.</p>
        </div>

        <div class="relative glass-input rounded-xl border-dashed border-2 p-8 text-center cursor-pointer flex flex-col items-center justify-center min-h-[280px] group overflow-hidden hover:bg-white/5 transition-all duration-300" id="upload-zone">
          <input type="file" id="file-input" accept="image/*" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20">
          <div id="upload-placeholder" class="pointer-events-none flex flex-col items-center z-10 transition-transform group-hover:scale-110 duration-300">
            <div class="w-16 h-16 rounded-full bg-gray-800 border border-gray-500/50 flex items-center justify-center mb-4 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              <i class="ph ph-upload-simple text-3xl"></i>
            </div>
            <p class="font-medium text-white tracking-wide">Tap, Drag & Drop, atau Paste Gambar</p>
            <p class="text-xs text-gray-400 mt-2 font-mono">JPG, PNG, WEBP [MAX 5MB]</p>
          </div>
          <div id="preview-container" class="absolute inset-0 p-3 hidden-el z-10 bg-black/90 backdrop-blur-md rounded-xl">
            <img id="image-preview" src="" alt="Preview" class="img-preview shadow-[0_0_20px_rgba(255,255,255,0.05)]">
            <button id="clear-img" class="absolute top-4 right-4 bg-red-900/80 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-600 transition z-30 cursor-pointer shadow-lg border border-red-500/50">
              <i class="ph-bold ph-x"></i>
            </button>
          </div>
        </div>

        <button id="btn-generate" class="w-full py-4 rounded-xl bg-gradient-to-r from-gray-200 to-gray-400 text-black font-bold text-lg tracking-wider hover:from-white hover:to-gray-300 border border-white/50 shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all transform hover:scale-[1.02] flex justify-center items-center cursor-pointer font-cyber group">
          <span id="btn-text">EKSTRAK PROMPT</span>
          <div id="btn-loader" class="loader ml-3 hidden-el"></div>
        </button>

        <div class="flex flex-col relative mt-2">
          <div class="flex justify-between items-end mb-2">
            <label class="text-xs font-cyber tracking-widest text-gray-300 flex items-center gap-2">
              <i class="ph-fill ph-terminal-window text-gray-400"></i> OUTPUT TERMINAL
            </label>
            <button id="btn-copy" class="hidden-el bg-white text-black rounded-lg py-1.5 px-3 hover:bg-gray-300 transition cursor-pointer flex items-center gap-1.5 shadow-[0_0_15px_rgba(255,255,255,0.2)] font-bold text-xs tracking-wide z-20">
              <i class="ph-bold ph-copy"></i> SALIN
            </button>
          </div>
          <div class="relative w-full">
            <textarea id="output-prompt" readonly class="glass-input w-full min-h-[250px] rounded-xl p-5 text-white resize-y font-mono text-sm leading-relaxed" placeholder="Hasil ekstraksi prompt akan muncul murni di sini..."></textarea>
          </div>
        </div>

        <div class="mt-4 bg-white/5 border border-white/10 rounded-xl p-4 md:p-5 flex gap-4 items-start shadow-[inset_0_0_15px_rgba(255,255,255,0.02)] backdrop-blur-sm">
          <div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/20">
            <i class="ph-fill ph-warning-circle text-xl text-gray-300"></i>
          </div>
          <div>
            <h3 class="font-bold text-white text-sm mb-1.5 tracking-wide">EKSKLUSIF MEMBER VANNSTORE</h3>
            <p class="text-xs text-gray-400 leading-relaxed font-medium">Tools ini dirancang secara eksklusif dan dilarang keras untuk diperjualbelikan ulang (resale). Harap gunakan dengan bijak.</p>
          </div>
        </div>
      </div>
    </main>

    <footer class="w-full bg-black/40 border-t border-white/10 pt-8 pb-10 mt-auto relative z-10 backdrop-blur-md flex flex-col items-center px-4">
      <a href="https://whatsapp.com/channel/YOUR_CHANNEL_LINK_HERE" target="_blank" class="group flex items-center gap-3 bg-white/10 hover:bg-[#25D366]/20 border border-[#25D366]/40 px-6 py-3.5 rounded-2xl font-bold text-white shadow-[0_0_15px_rgba(37,211,102,0.15)] transition-all transform hover:-translate-y-1 mb-8">
        <div class="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_0_10px_rgba(37,211,102,0.5)]">
          <i class="ph-fill ph-whatsapp-logo text-xl text-black"></i>
        </div>
        <span class="tracking-wide text-sm">Join WhatsApp Channel</span>
      </a>
      <div class="flex flex-col gap-1 text-center font-cyber tracking-widest text-[10px] md:text-xs text-gray-500">
        <span>&copy; 2026 VANNMRTNZ SYSTEM. ALL RIGHTS RESERVED.</span>
        <span class="text-gray-400 font-bold">COPYRIGHT BY VANNSTORE</span>
      </div>
    </footer>
  `;

  // 5. Logika Upload & Fetch
  let state = { img: null, mime: null };

  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    let bgClass = 'bg-gray-800/95 border-gray-500 text-white';
    let icon = '<i class="ph-fill ph-info text-xl"></i>';

    if (type === 'error') {
      bgClass = 'bg-red-950/95 border-red-500 text-red-100';
      icon = '<i class="ph-fill ph-warning-circle text-xl text-red-400"></i>';
    } else if (type === 'success') {
      bgClass = 'bg-white/95 border-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]';
      icon = '<i class="ph-bold ph-check-circle text-xl text-black"></i>';
    }

    toast.className = `flex items-center gap-3 p-4 mb-2 rounded-xl border shadow-[0_8px_30px_rgba(0,0,0,0.8)] backdrop-blur-md transform transition-all translate-x-full opacity-0 ${bgClass} font-mono text-xs md:text-sm z-50`;
    toast.innerHTML = `${icon} <span class="font-bold tracking-wide">${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => { toast.classList.remove('translate-x-full', 'opacity-0'); }, 10);
    setTimeout(() => {
      toast.classList.add('translate-x-full', 'opacity-0');
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const res = reader.result;
        resolve({ mimeType: res.split(';')[0].split(':')[1], base64Data: res.split(',')[1], dataUrl: res });
      };
      reader.onerror = err => reject(err);
    });
  }

  const fileInput = document.getElementById('file-input');
  const dropZone = document.getElementById('upload-zone');
  const placeholder = document.getElementById('upload-placeholder');
  const previewContainer = document.getElementById('preview-container');
  const previewImage = document.getElementById('image-preview');
  const clearBtn = document.getElementById('clear-img');

  async function processFile(file) {
    if (!file || !file.type.startsWith('image/')) {
      showToast('FORMAT DITOLAK: Harap unggah gambar valid.', 'error');
      return;
    }
    try {
      const { mimeType, base64Data, dataUrl } = await fileToBase64(file);
      state.img = base64Data;
      state.mime = mimeType;
      previewImage.src = dataUrl;
      placeholder.classList.add('hidden-el');
      previewContainer.classList.remove('hidden-el');
    } catch {
      showToast('ERROR: Gagal memproses visual.', 'error');
    }
  }

  fileInput.addEventListener('change', e => { if (e.target.files.length) processFile(e.target.files[0]); });
  dropZone.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('border-white', 'bg-white/10'); });
  dropZone.addEventListener('dragleave', e => { e.preventDefault(); dropZone.classList.remove('border-white', 'bg-white/10'); });
  dropZone.addEventListener('drop', e => {
    e.preventDefault();
    dropZone.classList.remove('border-white', 'bg-white/10');
    if (e.dataTransfer.files.length) processFile(e.dataTransfer.files[0]);
  });

  document.addEventListener('paste', e => {
    if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;
    const items = (e.clipboardData || e.originalEvent.clipboardData).items;
    for (let item of items) {
      if (item.kind === 'file' && item.type.startsWith('image/')) {
        processFile(item.getAsFile());
      }
    }
  });

  clearBtn.addEventListener('click', e => {
    e.preventDefault(); e.stopPropagation();
    fileInput.value = '';
    state.img = null; state.mime = null;
    previewImage.src = '';
    previewContainer.classList.add('hidden-el');
    placeholder.classList.remove('hidden-el');
  });

  document.getElementById('btn-copy').addEventListener('click', () => {
    const text = document.getElementById('output-prompt').value;
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      showToast('PROMPT DISALIN KE CLIPBOARD!', 'success');
    }).catch(() => {
      showToast('GAGAL MENYALIN.', 'error');
    });
  });

  document.getElementById('btn-generate').addEventListener('click', async () => {
    if (!state.img) {
      showToast('SYSTEM HALT: Harap unggah gambar terlebih dahulu.', 'error');
      return;
    }

    const btnText = document.getElementById('btn-text');
    const loader = document.getElementById('btn-loader');
    const output = document.getElementById('output-prompt');
    const copyBtn = document.getElementById('btn-copy');
    const btn = document.getElementById('btn-generate');

    btnText.textContent = "MEMPROSES DATA...";
    loader.classList.remove('hidden-el');
    output.value = "";
    copyBtn.classList.add('hidden-el');
    btn.disabled = true;
    btn.classList.add('opacity-70', 'cursor-wait');

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ base64Data: state.img, mimeType: state.mime })
      });
      const data = await res.json();

      if (res.ok && data.prompt) {
        output.value = data.prompt;
        copyBtn.classList.remove('hidden-el');
        showToast('EKSTRAKSI PROMPT SUKSES.', 'success');
      } else {
        throw new Error(data.error || 'Gagal memproses visual');
      }
    } catch (err) {
      console.error(err);
      showToast('API ERROR: Periksa pengaturan atau coba lagi.', 'error');
      output.value = "Terjadi kesalahan pada terminal AI. Silakan coba lagi.";
    } finally {
      btnText.textContent = "EKSTRAK PROMPT";
      loader.classList.add('hidden-el');
      btn.disabled = false;
      btn.classList.remove('opacity-70', 'cursor-wait');
    }
  });
})();
