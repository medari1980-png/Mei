export default async function handler(req, res) {
  const sources = [
    "http://aflaxtv.xyz:8080/get.php?username=mitrovic&password=19106b7cb4&type=m3u_plus",
    "http://aflaxtv.xyz:8080/get.php?username=vtprotonium&password=CuUWPf5b7jywB68SxZ5&type=m3u_plus",
    "http://aflaxtv.xyz:8080/get.php?username=7e4b0dbd&password=1dd755dc3f&type=m3u_plus"
  ];

  for (let src of sources) {
    try {
      const r = await fetch(src);
      if (!r.ok) continue;

      const text = await r.text();

      if (text.includes("#EXTM3U") && text.length > 500) {
        return res.send(text);
      }
    } catch (e) {}
  }

  res.status(500).send("No working playlist");
}
