import Head from "next/head";
import { AppShell } from "@mantine/core";
import Navigation from "./nav/Navigation";

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
        sx={{ height: "200vh" }}
      >
        {children}
      </AppShell>
    </>
  );
}

export default AppPage;
