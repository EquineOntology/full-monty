import "../styles/globals.css";
import { MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";

function FullMonty({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "light",
      }}
    >
        <Component {...pageProps} />
    </MantineProvider>
  );
}

export default FullMonty;
