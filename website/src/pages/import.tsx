import type { NextPage } from "next";
import AppPage from "@/common/components/layout/AppPage";
import FileUploader from "@/modules/import/FileUploader";
import ImportList from "@/modules/import/ImportList";
import { Container, Space } from "@mantine/core";

const Import: NextPage = () => {
  return (
    <AppPage pageTitle="Import">
      <Container>
        <ImportList />
        <FileUploader />
      </Container>
    </AppPage>
  );
};

export default Import;
