import { useState } from "react";
import type { NextPage } from "next";
import useSWR from "swr";
import { Button, Center, Container } from "@mantine/core";
import AppPage from "@/modules/layout/AppPage";
import MarvinCsvUploader from "@/modules/task_analysis/import/MarvinFileUploader";
import JobHistory from "@/modules/task_analysis/import/JobHistory";
import SettingsPanel from "@/modules/task_analysis/import/SettingsPanel";

const Data: NextPage = () => {
  const [opened, setOpened] = useState(false);
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/tasks/import/settings`,
    fetcher
  );

  return (
    <AppPage pageTitle="Manage data.">
      <Container>
        <MarvinCsvUploader />
        <Center mt="xl">
          <Button
            onClick={() => setOpened(true)}
            variant="light"
            radius={30}
            mt="1rem"
            mb="2rem"
          >
            show settings
          </Button>
        </Center>
        <hr
          style={{
            marginBottom: "2rem",
            border: "1px solid #f1f1f1",
          }}
        />
        <JobHistory />

        <SettingsPanel opened={opened} setOpened={setOpened} settings={data} />
      </Container>
    </AppPage>
  );
};

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((res) => res.data);

export default Data;
