// https://stackoverflow.com/questions/34424845/adding-script-tag-to-react-jsx
import { useEffect } from 'react';

const useScript = (url: string): void => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = url;
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [url]);
};

export default useScript;
