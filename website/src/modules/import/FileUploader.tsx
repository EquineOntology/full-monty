import {
  Group,
  Text,
  Title,
  useMantineTheme,
  MantineTheme,
} from "@mantine/core";
import { Dropzone, MIME_TYPES, DropzoneStatus } from "@mantine/dropzone";
import {
  FilePlusIcon,
  UploadIcon,
  CrossCircledIcon,
} from "@modulz/radix-icons";
import { IconProps } from "@modulz/radix-icons/dist/types";

type FileUploadIconProps = {
  status: DropzoneStatus;
} & IconProps;

function FileUploadIcon(props: FileUploadIconProps) {
  if (props.status.accepted) {
    return <UploadIcon {...props} />;
  }

  if (props.status.rejected) {
    return <CrossCircledIcon {...props} />;
  }

  return <FilePlusIcon {...props} />;
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

function FileUploader() {
  const theme = useMantineTheme();

  function handleUpload(files: File[]) {
    const formData = new FormData();
    formData.append("file", files[0]);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/import/marvin`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.info(result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div style={{ marginTop: "2rem" }}>
      <Title order={3}>Upload a new file</Title>
      <Dropzone
        onDrop={handleUpload}
        maxSize={3 * 1024 ** 2}
        accept={[MIME_TYPES.csv]}
        style={{ marginTop: "1rem" }}
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
    </div>
  );
}

export default FileUploader;
