'use client';

import 'ress/dist/ress.min.css';
import { PropsWithChildren } from 'react';
import StyledComponentsRegistry from '../components/styled-components-registry';
import { GlobalStyle } from '../components/global';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '../styles/theme';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ja">
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider theme={defaultTheme}>
            <GlobalStyle />
            {children}
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
