export default async function handler(req, res) {
  let data = req.body;
  let parents = [];
  let doctors = [];

  parents = data.participants.filter(
    (participant) => participant.type == "parent"
  );

  // TODO: get doctors email from ID & users ID from email

  for (let i = 0; i < data.participants.length; i++) {
    let participant = data.participants[i];
    if (participant.type == "doctor") {
      doctors.push({
        ...participant,
        email: "priyangsu26@gmail.com",
      });
    }
  }

  res.json({
    message: "Consultation server is up",
    time: new Date().toISOString(),
    ip: req.headers["x-real-ip"] || req.socket.remoteAddress || "unknown",
    protocol: req.protocol,
  });
}
