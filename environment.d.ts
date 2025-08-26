// This file is needed to support autocomplete for process.env
export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_AMICIA_ARCHITECT_URL: string;
      NEXT_PUBLIC_UPTIME_ROBOT_URL: string;
      NEXT_PUBLIC_LINKEDIN_URL: string;
      NEXT_PUBLIC_EMAIL_ADDRESS: string;
      NEXT_PUBLIC_WHATSAPP_URL: string;
      NEXT_PUBLIC_RESUME_PATH: string;
      NEXT_PUBLIC_BACKEND_URL: string;
    }
  }
}
