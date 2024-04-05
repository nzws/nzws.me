import "ress/dist/ress.min.css";
import "~/styles/global.scss";
import "react-loading-skeleton/dist/skeleton.css";

import { Analytics } from "@vercel/analytics/react";
import { PropsWithChildren } from "react";

import { Mincho, Sans } from "~/styles/font";

import { RootProvider } from "./provider";

const coreStyleClass = [Sans.variable, Mincho.variable].join(" ");

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ja" className={coreStyleClass}>
      <body>
        <RootProvider>
          {children}

          <Analytics />
        </RootProvider>
      </body>
    </html>
  );
}

export const metadata = {
  title: {
    default: "nzws.me",
    template: "%s - nzws.me",
  },
  other: {
    "Hatena::Bookmark": "nocomment",
  },
  icons: {
    icon: "https://github.com/nzwsme.png",
  },
};
