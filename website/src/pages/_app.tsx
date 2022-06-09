import GlobalStyles from "@/components/GlobalStyles";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import type { AppProps } from "next/app";

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
