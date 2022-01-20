import React from "react";
import type { NextPage } from "next";
import { Container } from "@mantine/core";
import AppPage from "@/common/components/layout/AppPage";
import AnalysisRequestForm from "@/modules/estimate_analysis/AnalysisRequestForm";
import AnalysisResult from "@/modules/estimate_analysis/AnalysisResult";
import { AnalysisApiResponse } from "@/modules/estimate_analysis/types";

type AnalysisHook = [AnalysisApiResponse | undefined, Function];
const Estimate: NextPage = () => {
  const [analysisResult, setAnalysisResult]: AnalysisHook =
    React.useState(undefined);

  return (
    <AppPage pageTitle="Estimate">
      <Container>
        <AnalysisRequestForm setAnalysisResult={setAnalysisResult} />
        <AnalysisResult data={analysisResult} />
      </Container>
    </AppPage>
  );
};

export default Estimate;
