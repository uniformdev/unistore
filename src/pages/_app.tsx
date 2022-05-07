import React from 'react';
import { ThemeProvider } from 'next-themes';
import getConfig from 'next/config';
import { UniformContext } from '@uniformdev/context-react';
import { UniformAppProps } from '@uniformdev/context-next';
import { createUniformContext } from '@/lib/context/uniformContext';
import { CartContextProvider } from '@/context/CartProvider';
import CartModal from '@/components/Modals/Cart';
import '@/styles/globals.scss';
import 'tailwindcss/tailwind.css';

const {
  serverRuntimeConfig: { outputType },
} = getConfig();

const clientContext = createUniformContext();

export const App = ({ Component, pageProps, serverUniformContext }: UniformAppProps) => (
  <UniformContext context={serverUniformContext ?? clientContext} outputType={outputType}>
    <ThemeProvider forcedTheme={process.env.THEME} attribute="class">
      <div className="app_container">
        <CartContextProvider>
          <Component {...pageProps} />
          <CartModal />
        </CartContextProvider>
      </div>
    </ThemeProvider>
  </UniformContext>
);

export default App;
