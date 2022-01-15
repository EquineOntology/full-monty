import type { NextPage } from "next";
import AppPage from "src/common/components/elements/layout/AppPage";
import FileUploader from "@/modules/import/FileUploader";

const Import: NextPage = () => {
  return (
    <AppPage pageTitle="Import">
      <FileUploader />
    </AppPage>
  );
};

export default Import;
