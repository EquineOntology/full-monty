import type { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import Footer from "@/modules/layout/Footer";

const Home: NextPage = () => {
  return (
    <div style={{ padding: "0 2rem" }}>
      <Head>
        <title>Full Monty</title>
      </Head>

      <main
        style={{
          minHeight: "100vh",
          padding: "4rem 0",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            fontSize: "4rem",
            lineHeight: 1.15,
            margin: 0,
            textAlign: "center",
          }}
        >
          Welcome to Full Monty!
        </h1>

        <div style={{ paddingTop: "3rem", fontSize: "1.5rem" }}>
          <Link href="/register">register</Link> or{" "}
          <Link href="/login">sign in</Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
