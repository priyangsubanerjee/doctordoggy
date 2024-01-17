// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  let url = `https://api.telegram.org/bot${
    process.env.TELEGRAM_BOT_TOKEN
  }/sendMessage?chat_id=${process.env.TELEGRAM_CHAT_ID}&text=${
    new Date().toLocaleString() +
    " - " +
    "message send using nextjs & vercel cronjob"
  }`;

  const response = await fetch(url, {
    method: "GET",
  });

  const data = await response.json();
  res.status(200).json(data);
}
