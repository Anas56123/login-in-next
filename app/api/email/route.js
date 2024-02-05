import { NextResponse } from "next/server";
import { Resend } from "resend";

import WelcomeEmail from "@/email/welcome";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  const { firstName, email } = await request.json();

  try {
    resend.emails
      .send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "hello world",
        react: WelcomeEmail({
          firstName,
        }),
      })
      .then(console.log);
    return NextResponse.json(
      {
        status: "Ok",
      },
      {
        status: 200,
      }
    );
  } catch (e) {
    console.log({ error: e });
    if (e instanceof Error) {
      console.log(`Failed to send email: ${e.message}`);
    }
    return NextResponse.json(
      {
        error: "Internal server error.",
      },
      {
        status: 500,
      }
    );
  }
}
