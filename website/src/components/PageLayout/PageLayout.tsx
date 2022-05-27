import Head from "next/head";
import { AppShell } from "@mantine/core";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Props = {
  children?: React.ReactNode;
  pageTitle: string;
};

export default function PageLayout({ pageTitle, children }: Props) {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <AppShell
        header={<Header title={pageTitle} />}
        footer={<Footer />}
        sx={{
          minHeight: "calc(100vh - 50px)",
          paddingTop: 100,
          paddingBottom: 60,
        }}
      >
        {children}
      </AppShell>
    </>
  );
}
