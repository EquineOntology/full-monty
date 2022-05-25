import React from "react";
import type { NextPage } from "next";
import { Center, Stack } from "@mantine/core";
import PageLayout from "@/components/PageLayout";
import EstimateAnalysis from "@/components/EstimateAnalysis";
import EstimateAnalysisForm from "@/components/EstimateAnalysisForm";

type AnalysisHook = [AnalysisApiResponse | undefined, Function];

const Tasks: NextPage = () => {
  const [analysis, setAnalysisData]: AnalysisHook = React.useState(undefined);

  return (
    <PageLayout pageTitle="Estimates.">
      <Center>
        <Stack>
          <EstimateAnalysisForm setAnalysisData={setAnalysisData} />
          <EstimateAnalysis data={analysis} />
        </Stack>
      </Center>
    </PageLayout>
  );
};

export default Tasks;

type AnalysisApiResponse = {
  estimate: number;
  sampleSize: number;
  successRate: number;
  meanDuration: number;
  medianDuration: number;
  medianDelta: number;
  sigmaDuration: number;
  message?: string;
  graphs: {
    histogram: { min: number; max: number; amount: number }[];
    scatterplot: { x: number; y: number }[];
  };
};
