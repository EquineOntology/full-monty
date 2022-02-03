import type { NextPage } from "next";
import { Container } from "@mantine/core";
import AppPage from "@/modules/layout/AppPage";
import MarvinCsvUploader from "@/modules/task_analysis/import/MarvinFileUploader";
import JobHistory from "@/modules/task_analysis/import/JobHistory";
import DeleteTasks from "@/modules/task_analysis/data_management/DeleteTasks";

const Data: NextPage = () => {
  return (
    <AppPage pageTitle="Import data">
      <Container>
        <MarvinCsvUploader />
        <DeleteTasks />
        <hr
          style={{
            marginTop: "3rem",
            marginBottom: "2rem",
            border: "1px solid #f1f1f1",
          }}
        />
        <JobHistory />
      </Container>
    </AppPage>
  );
};

export default Data;
