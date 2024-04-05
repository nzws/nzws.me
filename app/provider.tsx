"use client";

import { SkeletonTheme } from "react-loading-skeleton";

interface Props {
  children: React.ReactNode;
}

export function RootProvider({ children }: Props) {
  return (
    <SkeletonTheme baseColor="#4a2d29" highlightColor="#8e7e7c">
      {children}
    </SkeletonTheme>
  );
}
