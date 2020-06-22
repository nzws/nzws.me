declare module 'nextjs-progressbar' {
  interface Props {
    color?: string;
    startPosition?: string;
    stopDelayMs?: string;
    height?: string;
    options?: {
      [key: string]: any;
    };
  }

  const NextNprogress: React.ComponentType<Props>;

  export default NextNprogress;
}
