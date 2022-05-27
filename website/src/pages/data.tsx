import useSWR from "swr";
import { useState } from "react";
import type { NextPage } from "next";
import { Button, Center, Container } from "@mantine/core";
import PageLayout from "@/components/PageLayout";
import ImportJobHistory from "@/components/ImportJobHistory";
import MarvinFileUploader from "@/components/MarvinFileUploader";
import ImportSettingsPanel from "@/components/ImportSettingsPanel";

const Data: NextPage = () => {
  const [opened, setOpened] = useState(false);
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/tasks/import/settings`,
    fetcher
  );

  return (
    <PageLayout pageTitle="Manage data.">
      <Container>
        <MarvinFileUploader />
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
        <ImportJobHistory />

        <ImportSettingsPanel
          opened={opened}
          setOpened={setOpened}
          settings={data}
        />
      </Container>
    </PageLayout>
  );
};

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((res) => res.data);

export default Data;
