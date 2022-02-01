import {
  Group,
  Text,
  Title,
  useMantineTheme,
  MantineTheme,
} from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { Dropzone, MIME_TYPES, DropzoneStatus } from "@mantine/dropzone";
import {
  MdCheckCircleOutline,
  MdOutlineErrorOutline,
  MdOutlineCloudUpload,
} from "react-icons/md";
import { IconBaseProps } from "react-icons";

type FileUploadIconProps = {
  status: DropzoneStatus;
} & IconBaseProps;

function FileUploadIcon(props: FileUploadIconProps) {
  if (props.status.accepted) {
    return <MdCheckCircleOutline {...props} />;
  }

  if (props.status.rejected) {
    return <MdOutlineErrorOutline {...props} />;
  }

  return <MdOutlineCloudUpload {...props} />;
}

function getIconColor(status: DropzoneStatus, theme: MantineTheme) {
  return status.accepted
    ? theme.colors[theme.primaryColor][6]
    : status.rejected
    ? theme.colors.red[6]
    : theme.colorScheme === "dark"
    ? theme.colors.dark[0]
    : theme.black;
}

function MarvinCsvUploader() {
  const theme = useMantineTheme();
  const notifications = useNotifications();

  function handleUpload(files: File[]) {
    const formData = new FormData();
    formData.append("file", files[0]);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/import/marvin`, {
      method: "POST",
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
        notifications.showNotification({
          title: "Processing in progress",
          icon: <MdCheckCircleOutline />,
          color: "green",
          message: "Your file was  uploaded and it will be processed shortly",
          autoClose: 10000,
        });
      })
      .catch((error) => {
        notifications.showNotification({
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
        {(status) => (
          <Group
            position="center"
            spacing="xl"
            style={{ minHeight: 220, pointerEvents: "none" }}
          >
            <FileUploadIcon
              status={status}
              style={{
                width: 80,
                height: 80,
                color: getIconColor(status, theme),
              }}
            />
            <div>
              <Text size="xl" inline>
                Drag a CSV exported from Amazing Marvin here
              </Text>
            </div>
          </Group>
        )}
      </Dropzone>
    </>
  );
}

export default MarvinCsvUploader;
