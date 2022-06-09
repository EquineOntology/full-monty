import TimelineSkeleton from "@/components/TimelineSkeleton";
import { Alert, Text, Timeline, Title } from "@mantine/core";
import {
  MdCheckCircleOutline,
  MdOutlinePending,
  MdOutlineRefresh,
} from "react-icons/md";
import { RiErrorWarningLine } from "react-icons/ri";
import useSWR from "swr";
import { ApiResponse } from "../Api";
import { JobDescription, JobStatus, JobStatusColor } from "./types";

export default function ImportJobHistory() {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/tasks/import`,
    fetcher
  );
  const title = (
    <Title order={4} mt="3rem">
      In case you&apos;re curious, here is a list of recent imports:
    </Title>
  );

  if (error) {
    return (
      <div>
        {title}
        <Alert title="Boo :(" color="red" mt={10}>
          {error.toString()}
        </Alert>
      </div>
    );
  }

  if (!data) {
    return (
      <div>
        {title}
        <TimelineSkeleton style={{ marginTop: "1rem" }} />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div>
        {title}
        <Alert title="Nothing here!" color="yellow" mt={10}>
          No jobs have been run yet. Try importing some tasks from Amazing
          Marvin!
        </Alert>
      </div>
    );
  }

  data.sort((a: ApiResponseItem, b: ApiResponseItem) => {
    return b.addedAt - a.addedAt;
  });

  const jobs = data.slice(0, 5);
  return (
    <>
      {title}
      <Timeline
        active={20}
        bulletSize={24}
        lineWidth={2}
        style={{ marginTop: "1rem" }}
      >
        {jobs.map((job: JobDescription, index: number) => (
          <Timeline.Item
            key={index}
            active={true}
            bullet={getBulletIcon(job.status)}
            title={job.name}
            color={getBulletColor(job.status)}
          >
            <Text color="dimmed" size="sm">
              Imported task data
            </Text>
            <Text size="xs" style={{ marginTop: 4 }}>
              {job.status === "completed" && job.completedAt !== null && (
                <div>Completed on {getHumanReadableDate(job.completedAt)}</div>
              )}
              {job.status === "pending" && (
                <div>Added on {getHumanReadableDate(job.addedAt)}</div>
              )}
            </Text>
          </Timeline.Item>
        ))}
      </Timeline>
    </>
  );
}

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

function getBulletColor(status: JobStatus): JobStatusColor {
  switch (status) {
    case "pending":
      return "yellow";
    case "started":
      return "blue";
    case "failed":
      return "red";
    case "completed":
      return "green";
  }
}

function getBulletIcon(status: JobStatus) {
  switch (status) {
    case "pending":
      return <MdOutlinePending />;
    case "started":
      return <MdOutlineRefresh />;
    case "failed":
      return <RiErrorWarningLine />;
    case "completed":
      return <MdCheckCircleOutline />;
  }
}

function getHumanReadableDate(input: string) {
  const date = new Date(input);
  return date.toLocaleString();
}

type ApiResponseItem = {
  addedAt: number;
} & Record<string, any>;
