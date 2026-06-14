import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Preloader from "@/components/ui/Preloader";
import FloatingActions from "@/components/ui/FloatingActions";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ARQUIAVALÚOS | Valoración y Avalúos Premium",
  description: "Especialistas en avalúos, consultoría inmobiliaria y soluciones de valoración técnica certificada para empresas, entidades financieras y particulares en Colombia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${plusJakartaSans.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans selection:bg-brand-secondary selection:text-white">
        <Preloader />
        <FloatingActions />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}


