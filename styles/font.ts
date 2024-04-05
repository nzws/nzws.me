import { Shippori_Mincho, IBM_Plex_Sans_JP } from "next/font/google";

export const Sans = IBM_Plex_Sans_JP({
  weight: ["400", "600"],
  display: "swap",
  subsets: ["latin-ext"],
  variable: "--font-sans",
});

export const Mincho = Shippori_Mincho({
  weight: ["400", "600"],
  display: "swap",
  subsets: ["latin-ext"],
  variable: "--font-mincho",
});
