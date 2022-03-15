import type { NextPage } from "next";
import { Container } from "@mantine/core";
import AppPage from "@/modules/layout/AppPage";

const Home: NextPage = () => {
  return (
    <AppPage pageTitle="Full Monty.">
      <Container></Container>
    </AppPage>
  );
};

export default Home;
