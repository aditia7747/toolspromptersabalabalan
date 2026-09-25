export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API Key belum disetting di Vercel Environment Variables.' });
  }

  const { base64Data, mimeType } = req.body;
  if (!base64Data || !mimeType) {
    return res.status(400).json({ error: 'Data gambar tidak valid.' });
  }

  const systemInstruction = `
  Anda adalah "VannMrtnz", Penganalisis visual ekstrem dan pencetak Prompt tingkat dewa.
  Tugas mutlak: Ekstrak visual gambar menjadi 1 blok teks PROMPT MURNI menggunakan bahasa Mandarin dan tag inggris tertentu.
  DILARANG ADA KATA PENGANTAR. DILARANG ADA KESIMPULAN. HANYA OUTPUT PROMPT.

  KUNCIAN PERMANEN (WAJIB ADA 100% PERSIS DI POSISI MASING-MASING TANPA DIUBAH):
  1. "8K细节，4K画质" (Wajib ada di paragraf 1)
  2. "强制为自然真实的白皙皮肤（Fair skin）与绝对完美无瑕干净的面部（Flawless clean face）。" (Wajib ada di akhir bagian "构图与主体：")
  3. "产生 1% 的轻微眩光（Mild Glare）" (Wajib ada di dalam bagian "光线与色彩：")
  4. Gunakan gaya penulisan 99.9% seperti format template di bawah.

  FORMAT TEMPLATE:
  （杰作，最高质量，超高分辨率，超精细，极致逼真：1.2），8K细节，4K画质，原始手机摄影，业余美学，未经编辑的智能手机原图，iPhone 17 Pro [Tentukan: 室内强闪光灯/户外强光]真实抓拍，保留自然颗粒与整体纹理。

  vertical composition, 9:16 aspect ratio, full body framing, no horizontal crop

  构图与主体：[Deskripsikan sangat detail: jenis tempat, tipe framing (candid/selfie), posisi framing. Deskripsikan orang/objek, gaya rambut (jangan sebut warna/ras/etnis), aktivitas, pose]. 强制为自然真实的白皙皮肤（Fair skin）与绝对完美无瑕干净的面部（Flawless clean face）。

  服装与环境：[Deskripsikan ekstrim detail: warna, bahan, motif pakaian, objek di sekitar, tekstur dinding/lantai, benda-benda pendukung].

  光线与色彩：基于[Pilih: 室内强闪光灯/户外强光]规则，正前方手机开启极其强烈的冷白硬光直射。在[sebutkan objek pantul]上产生 1% 的轻微眩光（Mild Glare）和局部高光轻微过曝。强硬直射光在[sebutkan latar]投射出极其浓重、边缘极其锐利生硬的黑色死黑硬阴影（Hard shadows）。绝对无景深虚化（No bokeh），极深景深，[sebutkan objek]极度锐利。在死黑阴影中保留大量真实的手机高ISO CMOS彩色数字噪点。受[kondisi cahaya]影响白平衡轻微[sebut tone], 整体带有极强的粗糙原片纪实抓拍质感与严重的高反差光影失真。

  负面提示词：（电影感光效，景深虚化，背景模糊，过度磨皮，AI塑料感，过度处理，过度锐化，HDR特效，人造打光，柔光，假光晕，柔焦，虚假纹理，干净的镜面，多余人物，五官变形，多手多脚，CGI，卡通，动漫，完美对称，脸部瑕疵，痘痘，斑点） IMAGE QUALITY (RAW STYLE) - Looks like straight-out-of-camera photo (iPhone 17 Pro Max style) - No bokeh - No depth of field blur - No skin smoothing - No AI-generated look - No HDR exaggeration - No over-processing - Natural grain and texture preserved NEGATIVE PROMPT cinematic lighting, bokeh, blur, depth of field, beauty filter, skin smoothing, airbrush skin, AI look, overprocessed, oversharpen, HDR effect, artificial lighting, glow, soft focus, fake texture, unrealistic skin 8k 4k
  `;

  const payload = {
    contents: [{
      role: "user",
      parts: [
        { text: "Lakukan analisis 99.9% dan cetak HANYA Prompt sesuai Kuncian Permanen (Fair skin, Flawless face, 1% Mild Glare, 4K, 8K) dan format." },
        { inlineData: { mimeType, data: base64Data } }
      ]
    }],
    systemInstruction: { parts: [{ text: systemInstruction }] }
  };

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
      let promptRaw = result.candidates[0].content.parts[0].text;
      promptRaw = promptRaw.replace(/^```[\s\S]*?\n/g, '').replace(/```$/g, '').trim();
      return res.status(200).json({ prompt: promptRaw });
    } else {
      return res.status(500).json({ error: 'Gagal memproses visual dari Gemini API.' });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Server gagal menghubungi Gemini API.' });
  }
}
