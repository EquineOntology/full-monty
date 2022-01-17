import type { NextPage } from "next";
import { Container } from "@mantine/core";
import AppPage from "@/common/components/layout/AppPage";
import FileUploader from "@/modules/import/FileUploader";
import ImportList from "@/modules/import/ImportList";

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
