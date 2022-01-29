import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import type { AppProps } from "next/app";
import GlobalStyles from "@/modules/layout/GlobalStyles";

function FullMonty({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "light",
      }}
    >
      <NotificationsProvider>
        <GlobalStyles />
        <Component {...pageProps} />
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default FullMonty;
