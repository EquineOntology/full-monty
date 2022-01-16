import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Footer from "@/common/components/layout/Footer";
import Link from "next/link";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Full Monty</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Full Monty!</h1>

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
