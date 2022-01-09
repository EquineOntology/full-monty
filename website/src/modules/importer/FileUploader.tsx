import { Group, Text, useMantineTheme, MantineTheme } from "@mantine/core";
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

  return (
    <Dropzone
      onDrop={console.log}
      maxSize={3 * 1024 ** 2}
      accept={[MIME_TYPES.csv]}
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
  );
}

export default FileUploader;
