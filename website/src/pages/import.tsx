import type { NextPage } from "next";
import { Container } from "@mantine/core";
import AppPage from "@/common/components/layout/AppPage";
import FileUploader from "@/modules/data_management/import/FileUploader";
import ImportList from "@/modules/data_management/import/ImportList";
import TaskActions from "@/modules/data_management/actions";

const Import: NextPage = () => {
  return (
    <AppPage pageTitle="Import Amazing Marvin data">
      <Container>
        <FileUploader />
        <TaskActions />
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
