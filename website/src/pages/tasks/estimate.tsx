import React from "react";
import type { NextPage } from "next";
import { Center, Stack } from "@mantine/core";
import AppPage from "@/modules/layout/AppPage";
import AnalysisRequestForm from "@/modules/task_analysis/estimate_analysis/AnalysisRequestForm";
import AnalysisResult from "@/modules/task_analysis/estimate_analysis/AnalysisResult";
import { AnalysisApiResponse } from "@/modules/task_analysis/estimate_analysis/types";

type AnalysisHook = [AnalysisApiResponse | undefined, Function];

const Tasks: NextPage = () => {
  const [analysisResult, setAnalysisResult]: AnalysisHook =
    React.useState(undefined);

  return (
    <AppPage pageTitle="Estimates.">
      <Center>
        <Stack>
          <AnalysisRequestForm setAnalysisResult={setAnalysisResult} />
          <AnalysisResult data={analysisResult} />
        </Stack>
      </Center>
    </AppPage>
  );
};

export default Tasks;
