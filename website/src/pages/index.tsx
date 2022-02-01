import AppPage from "@/modules/layout/AppPage";
import { Container } from "@mantine/core";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <AppPage pageTitle="Full Monty">
      <Container></Container>
    </AppPage>
  );
};

export default Home;
