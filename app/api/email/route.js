import { NextResponse } from "next/server";
import { Resend } from "resend";

import { WelcomeEmail } from "@/email/welcome";
import { YourAccount } from "@/email/yourAccount";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  const { firstName, email, welcome } = await request.json();
  if (welcome == true) {
    try {
      resend.emails
        .send({
          from: "onboarding@resend.dev",
          to: email,
          subject: "hello world",
          react: WelcomeEmail({
            firstName,
          }),
        });
      return NextResponse.json(
        {
          status: "Ok",
        },
        {
          status: 200,
        }
      );
    } catch (e) {
      console.error({ error: e });
      if (e instanceof Error) {
        console.error(`Failed to send email: ${e.message}`);
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
  } else {
    try {
      resend.emails
        .send({
          from: "onboarding@resend.dev",
          to: email,
          subject: "verfing",
          react: YourAccount({
            firstName,
          }),
        });
      return NextResponse.json(
        {
          status: "Ok",
        },
        {
          status: 200,
        }
      );
    } catch (e) {
      console.error({ error: e });
      if (e instanceof Error) {
        console.error(`Failed to send email: ${e.message}`);
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
}
