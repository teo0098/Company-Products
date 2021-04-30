import { AppProps } from "next/dist/next-server/lib/router/router";
import Head from "next/head";

import "../styles/globals.css";

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
