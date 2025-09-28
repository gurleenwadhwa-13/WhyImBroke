// lib/resend.ts
import { Resend } from "resend";

export function getResendClient() {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error("Missing RESEND_API_KEY");
  }
  return new Resend(key);
}

export const resend_audience_id = process.env.RESEND_AUDIENCE_KEY;