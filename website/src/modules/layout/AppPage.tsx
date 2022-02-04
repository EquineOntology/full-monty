import Head from "next/head";
import { AppShell } from "@mantine/core";
import Navigation from "./nav/Navigation";
import Footer from "./Footer";

type Props = {
  children?: React.ReactNode;
  pageTitle: string;
};

function AppPage({ pageTitle, children }: Props) {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <AppShell
        header={<Navigation title={pageTitle} />}
        sx={{ minHeight: "calc(100vh - 50px)", paddingTop: 80 }}
      >
        {children}
      </AppShell>
      <Footer />
    </>
  );
}

export default AppPage;
