import type { NextPage } from "next";
import { Container } from "@mantine/core";
import PageLayout from "@/components/PageLayout";

const Home: NextPage = () => {
  return (
    <PageLayout pageTitle="Full Monty.">
      <Container></Container>
    </PageLayout>
  );
};

export default Home;
