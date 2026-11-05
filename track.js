// Vercel Serverless Function: GET /api/tracks?q=nama-artis
// Kunci API disimpan di Vercel (Settings > Environment Variables), bukan di kode:
//   AUDIODB_KEY     = kunci v1 (kosongkan untuk memakai kunci tes gratis "123")
//   AUDIODB_V2_KEY  = kunci premium v2 (opsional, dikirim lewat header X-API-KEY)
const V1 = 'https://www.theaudiodb.com/api/v1/json';
const V2 = 'https://www.theaudiodb.com/api/v2/json';

module.exports = async (req, res) => {
  const q = String((req.query && req.query.q) || '').trim().slice(0, 80);
  if (q.length < 2) {
    res.status(400).json({ track: [], error: 'Parameter q terlalu pendek' });
    return;
  }
  const e = encodeURIComponent(q);
  let track = [];

  const v2key = process.env.AUDIODB_V2_KEY;
  if (v2key) {
    try {
      const r = await fetch(`${V2}/search/track/${e}`, { headers: { 'X-API-KEY': v2key } });
      if (r.ok) {
        const j = await r.json();
        track = j.track || j.tracks || j.search || [];
      }
    } catch (_) {}
  }

  if (!Array.isArray(track) || !track.length) {
    track = [];
    try {
      const r = await fetch(`${V1}/${process.env.AUDIODB_KEY || '123'}/track-top10.php?s=${e}`);
      if (r.ok) {
        const j = await r.json();
        track = j.track || [];
      }
    } catch (_) {}
  }

  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.status(200).json({ track: Array.isArray(track) ? track : [] });
};
    
