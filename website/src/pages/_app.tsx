import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import GlobalStyles from "@/components/GlobalStyles";

export default function FullMonty({ Component, pageProps }: AppProps) {
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
