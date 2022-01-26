import type { NextPage } from "next";
import { Container } from "@mantine/core";
import AppPage from "@/common/components/layout/AppPage";
import FileUploader from "@/modules/data_management/import/FileUploader";
import ImportList from "@/modules/data_management/import/ImportList";
import TaskActions from "@/modules/data_management/TaskActions";

const Import: NextPage = () => {
  return (
    <AppPage pageTitle="Import">
      <Container>
        <ImportList />
        <FileUploader />
        <TaskActions />
      </Container>
    </AppPage>
  );
};

export default Import;
