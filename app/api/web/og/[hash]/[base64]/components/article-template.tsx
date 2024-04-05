import type { FC } from "react";

import { Brand } from "./brand";

type Props = {
  title: string;
};

export const ArticleTemplate: FC<Props> = ({ title }) => (
  <div
    style={{
      height: "100%",
      width: "100%",
      display: "flex",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      flexWrap: "nowrap",
      backgroundColor: "#674138",
      backgroundImage:
        "radial-gradient(circle at 25px 25px, #9d7474 4%, transparent 0%), radial-gradient(circle at 75px 75px, #9d7474 4%, transparent 0%)",
      backgroundSize: "100px 100px",
    }}
  >
    <div
      style={{
        fontSize: 48,
        fontStyle: "normal",
        fontWeight: "600",
        color: "#e1e1e1",
        backgroundColor: "#674138",
        lineHeight: 1.5,
        whiteSpace: "pre-wrap",
        padding: 22,
        fontFamily: "GenEiLateMinP_v2",
      }}
      lang="ja-JP"
    >
      {title}
    </div>

    <Brand />
  </div>
);
