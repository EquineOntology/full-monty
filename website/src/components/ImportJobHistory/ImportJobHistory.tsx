import {
  MdCheckCircleOutline,
  MdOutlinePending,
  MdOutlineRefresh,
} from "react-icons/md";
import useSWR from "swr";
import { RiErrorWarningLine } from "react-icons/ri";
import TimelineSkeleton from "@/components/TimelineSkeleton";
import { Alert, Text, Timeline, Title } from "@mantine/core";
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
          There was an error loading your data. Please try again in a couple of
          minutes
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
          Bummer, no files have been imported yet - you can do so below!
        </Alert>
      </div>
    );
  }

  return (
    <>
      {title}
      <Timeline
        active={20}
        bulletSize={24}
        lineWidth={2}
        style={{ marginTop: "1rem" }}
      >
        {data.map((job: JobDescription, index: number) => (
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

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((res) => res.data);

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
