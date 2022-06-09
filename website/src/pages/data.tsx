import { ApiResponse } from "@/components/Api";
import ImportJobHistory from "@/components/ImportJobHistory";
import ImportSettingsPanel from "@/components/ImportSettingsPanel";
import MarvinFileUploader from "@/components/MarvinFileUploader";
import PageLayout from "@/components/PageLayout";
import { Alert, Button, Center, Container, Text } from "@mantine/core";
import type { NextPage } from "next";
import { useState } from "react";
import useSWR from "swr";

const Data: NextPage = () => {
  const [opened, setOpened] = useState(false);
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/tasks/import/settings`,
    fetcher
  );

  let contents;
  if (error) {
    contents = (
      <Center>
        <Alert title="Boo :(" color="red" mt={10}>
          {error ? error.toString() : "Could not retrieve settings"}
        </Alert>
      </Center>
    );
  } else if (data === undefined) {
    contents = (
      <Center>
        <Text>Loading</Text>
      </Center>
    );
  } else {
    contents = (
      <>
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
      </>
    );
  }

  return (
    <PageLayout pageTitle="Manage data.">
      <Container>{contents}</Container>
    </PageLayout>
  );
};

const fetcher = async (url: string) => {
  const response = await fetch(url, {
    headers: {
      Authorization: process.env.NEXT_PUBLIC_API_KEY,
    },
  });
  const contents: ApiResponse = await response.json();
  if (contents.status === "fail" || contents.status === "error") {
    if (contents.data?.message === undefined) {
      throw new Error("Incomplete response from API");
    }

    throw new Error(contents.data.message);
  }

  return contents.data;
};

export default Data;
