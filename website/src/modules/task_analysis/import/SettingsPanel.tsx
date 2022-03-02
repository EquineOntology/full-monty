import { Dispatch, SetStateAction } from "react";
import { Box, Drawer, Text } from "@mantine/core";
import { ImportSettings } from "./types";
import SettingsForm from "./SettingsForm";
import DeleteTasks from "../data_management/DeleteTasks";

type Props = {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
  settings: ImportSettings;
};

function SettingsPanel({ opened, setOpened, settings }: Props) {
  return (
    <Drawer
      opened={opened}
      onClose={() => setOpened(false)}
      title={<Text weight="bold">Import settings</Text>}
      padding="xl"
      position="left"
      size={600}
    >
      <SettingsForm settings={settings} />
      <Box
        sx={{
          position: "absolute",
          bottom: 50,
        }}
      >
        <DeleteTasks />
      </Box>
    </Drawer>
  );
}

export default SettingsPanel;
