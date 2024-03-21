export async function handler(req, res) {
  res.json({
    message: "Consultation server is up",
    time: new Date().toISOString(),
    ip: req.headers["x-real-ip"] || req.socket.remoteAddress || "unknown",
    protocol: req.protocol,
  });
}
