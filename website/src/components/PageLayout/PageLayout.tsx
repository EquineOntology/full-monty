import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { AppShell } from "@mantine/core";
import Head from "next/head";

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
        }}
      >
        {children}
      </AppShell>
    </>
  );
}
