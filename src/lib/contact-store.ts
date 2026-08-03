import fs from "fs";
import path from "path";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
}

const dataDir = path.join(process.cwd(), "data");
const filePath = path.join(dataDir, "contact-messages.json");

function readMessages(): ContactMessage[] {
  try {
    if (!fs.existsSync(filePath)) return [];
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as ContactMessage[];
  } catch {
    return [];
  }
}

export function saveContactMessage(message: ContactMessage): void {
  const messages = readMessages();
  messages.push(message);
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(messages, null, 2), "utf-8");
}
