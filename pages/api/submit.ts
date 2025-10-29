import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";
import { type ArchetypeId } from "../../types/quiz";

type SubmitPayload = {
  name: string;
  age?: string;
  email: string;
  archetype?: ArchetypeId;
  answers: string[];
};

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === "string");

// Handle POST requests to /api/submit
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const body = (req.body ?? {}) as Partial<SubmitPayload>;
  const { name, age, email, archetype, answers } = body;

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    !isStringArray(answers)
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Load Google Sheets credentials from .env.local
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

  if (!clientEmail || !privateKey || !spreadsheetId) {
    return res.status(500).json({ error: "Missing Google Sheets credentials" });
  }

  try {
    const jwt = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth: jwt });

    const timestamp = new Date().toISOString();
    const row = [
      timestamp,
      name,
      age ?? "",
      email,
      archetype ?? "",
      answers[0] ?? "",
      answers[1] ?? "",
      answers[2] ?? "",
      answers[3] ?? "",
      answers[4] ?? "",
      answers[5] ?? "",
      answers[6] ?? "",
      answers[7] ?? "",
      answers[8] ?? "",
      answers[9] ?? "",
      JSON.stringify({ name, age, email, archetype, answers }),
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Version 1!A:Z",
      valueInputOption: "RAW",
      requestBody: { values: [row] },
    });

    return res.status(200).json({ success: true, message: "Data written to Google Sheets" });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Sheets API error:", error);
    return res
      .status(500)
      .json({ error: "Failed to write to Google Sheets", details: errorMessage });
  }
}
