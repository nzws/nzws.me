declare module 'nextjs-progressbar' {
  interface Props {
    color?: string;
    startPosition?: string;
    stopDelayMs?: string;
    height?: number;
    options?: {
      [key: string]: string | number | boolean;
    };
  }

  const NextNprogress: React.ComponentType<Props>;

  export default NextNprogress;
}
