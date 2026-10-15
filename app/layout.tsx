
import type { Metadata, Viewport } from "next";
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

  applicationName: "Parque da Fé",

  icons: {
    icon: [
      {
        url: "/parque_da_fe_icons/favicon.ico",
        sizes: "any",
      },
      {
        url: "/parque_da_fe_icons/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/parque_da_fe_icons/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/parque_da_fe_icons/favicon-48x48.png",
        sizes: "48x48",
        type: "image/png",
      },
    ],

    apple: [
      {
        url: "/parque_da_fe_icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],

    shortcut: "/parque_da_fe_icons/favicon.ico",
  },

  manifest: "/site.webmanifest",

  appleWebApp: {
    capable: true,
    title: "Parque da Fé",
    statusBarStyle: "default",
  },

  openGraph: {
    title: "Parque da Fé",
    description: "Um lugar para viver histórias que transformam.",
    type: "website",
    locale: "pt_BR",
    siteName: "Parque da Fé",
  },

  robots: {
    index: true,
    follow: true,
  },

  category: "travel",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#071C3A",
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
