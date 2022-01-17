import type { NextPage } from "next";
import { Container } from "@mantine/core";
import AppPage from "@/common/components/layout/AppPage";
import EstimateRequestForm from "@/modules/estimate/EstimateRequestForm";

const Estimate: NextPage = () => {
  return (
    <AppPage pageTitle="Estimate">
      <Container>
        <EstimateRequestForm />
      </Container>
    </AppPage>
  );
};

export default Estimate;
