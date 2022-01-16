import type { NextPage } from "next";
import AppPage from "@/common/components/layout/AppPage";
import FileUploader from "@/modules/import/FileUploader";

const Import: NextPage = () => {
  return (
    <AppPage pageTitle="Import">
      <FileUploader />
    </AppPage>
  );
};

export default Import;
