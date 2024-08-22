import { resend } from "@/lib/resend";
import VerificationEmail from "../../email/VerificationEmail";

export const SendVerificationEmail = async (username, verifyCode, email) => {
  try {
    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Verification Code",
      react: VerificationEmail({ username, otp: verifyCode }),
    });

    console.log(response);
    return { success: true, message: "Verification Email sent successfully" };
  } catch (error) {
    console.log(error);
    return { success: false, message: error };
  }
};
