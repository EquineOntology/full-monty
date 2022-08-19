import {
  Group,
  MantineTheme,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { showNotification, updateNotification } from "@mantine/notifications";
import { IconBaseProps } from "react-icons";
import {
  MdCheckCircleOutline,
  MdOutlineCloudUpload,
  MdOutlineErrorOutline,
} from "react-icons/md";

export default function MarvinFileUploader() {
  const theme = useMantineTheme();

  function handleUpload(files: File[]) {
    const formData = new FormData();
    formData.append("file", files[0]);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/import/marvin`, {
      method: "POST",
      headers: {
        Authorization: process.env.NEXT_PUBLIC_API_KEY,
      },
      body: formData,
    })
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then((response) => response.json())
      .then((result) => {
        showNotification({
          id: "processing-upload",
          title: "Processing in progress",
          icon: <MdCheckCircleOutline />,
          color: "green",
          message: "Your file was uploaded and it will be processed shortly",
          autoClose: 5000,
        });
      })
      .catch((error) => {
        updateNotification({
          id: "processing-upload",
          title: "Oh no!",
          icon: <MdOutlineErrorOutline />,
          color: "red",
          message:
            "There was an error uploading your file for processing - please try again in a few minutes",
          autoClose: 10000,
        });
        console.error(error);
      });
  }

  return (
    <>
      <Title order={3}>Import data</Title>
      <Dropzone
        onDrop={handleUpload}
        maxSize={3 * 1024 ** 2}
        accept={[MIME_TYPES.csv]}
        sx={{ marginTop: "1rem" }}
      >
        <Group
          position="center"
          spacing="xl"
          style={{ minHeight: 220, pointerEvents: "none" }}
        >
          <Dropzone.Accept>
            <FileUploadIcon
              status="accepted"
              style={{
                width: 80,
                height: 80,
                color: getIconColor("accepted", theme),
              }}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <FileUploadIcon
              status="rejected"
              style={{
                width: 80,
                height: 80,
                color: getIconColor("rejected", theme),
              }}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <FileUploadIcon
              status="idle"
              style={{
                width: 80,
                height: 80,
                color: getIconColor("idle", theme),
              }}
            />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              Drag a CSV exported from Amazing Marvin here
            </Text>
          </div>
        </Group>
      </Dropzone>
    </>
  );
}

type DropzoneStatus = "accepted" | "rejected" | "idle";

type FileUploadProps = {
  status: DropzoneStatus;
} & IconBaseProps;
function FileUploadIcon(props: FileUploadProps) {
  if (props.status == "accepted") {
    return <MdCheckCircleOutline {...props} />;
  }

  if (props.status === "rejected") {
    return <MdOutlineErrorOutline {...props} />;
  }

  return <MdOutlineCloudUpload {...props} />;
}

function getIconColor(status: DropzoneStatus, theme: MantineTheme) {
  if (status === "accepted") {
    return theme.colors[theme.primaryColor][6];
  }

  if (status === "rejected") {
    theme.colors.red[6];
  }

  return theme.black;
}
