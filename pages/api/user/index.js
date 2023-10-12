import { get_all_users } from "@/prisma/user";

export default async function handler(req, res) {
  const users = await get_all_users();
  res.status(200).json({ users });
}
