import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner"; // Feedback de API

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TRANSPARENCY | Building Management",
  description: "Next-gen building administration system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="selection:bg-primary selection:text-white">
      <body
        className={`${geistSans.variable} font-sans antialiased bg-zinc-100 text-zinc-950`}
      >
        <AuthProvider>
          {children}
          <Toaster 
            position="bottom-right" 
            toastOptions={{
              className: "font-black tracking-tighter rounded-2xl border-white/20 backdrop-blur-xl bg-white/70 shadow-2xl",
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}