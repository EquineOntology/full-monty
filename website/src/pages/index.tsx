import PageLayout from "@/components/PageLayout";
import { Container } from "@mantine/core";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <PageLayout pageTitle="Full Monty.">
      <Container></Container>
    </PageLayout>
  );
};

export default Home;
