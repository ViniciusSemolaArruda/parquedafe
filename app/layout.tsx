
import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Parque da Fé | Fé, Cultura e Experiências",
    template: "%s | Parque da Fé",
  },

  description:
    "Conheça o Parque da Fé, um destino de espiritualidade, cultura, lazer e experiências inesquecíveis para toda a família.",

  keywords: [
    "Parque da Fé",
    "Parque religioso",
    "Turismo religioso",
    "Fé e cultura",
    "Arena da Fé",
    "Monte das Oliveiras",
    "Rio Jordão",
    "Turismo no Rio de Janeiro",
  ],

  openGraph: {
    title: "Parque da Fé",
    description:
      "Um lugar para viver histórias que transformam.",
    type: "website",
    locale: "pt_BR",
    siteName: "Parque da Fé",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${dmSans.variable} ${playfairDisplay.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
