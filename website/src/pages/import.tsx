import type { NextPage } from "next";
import { Container } from "@mantine/core";
import AppPage from "@/modules/layout/AppPage";
import FileUploader from "@/modules/task_analysis/import/FileUploader";
import ImportList from "@/modules/task_analysis/import/ImportList";
import DeleteTasks from "@/modules/task_analysis/data_management/DeleteTasks";

const Import: NextPage = () => {
  return (
    <AppPage pageTitle="Import Amazing Marvin data">
      <Container>
        <FileUploader />
        <DeleteTasks />
        <hr
          style={{
            marginTop: "3rem",
            marginBottom: "2rem",
            border: "1px solid #f1f1f1",
          }}
        />
        <ImportList />
      </Container>
    </AppPage>
  );
};

export default Import;
