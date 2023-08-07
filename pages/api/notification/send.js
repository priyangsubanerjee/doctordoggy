// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const { message } = JSON.parse(req.body);

  let url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${process.env.TELEGRAM_CHAT_ID}&text=${message}`;

  const response = await fetch(url, {
    method: "GET",
  });

  const data = await response.json();
  res.status(200).json(data);
}
