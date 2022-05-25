import {
  MdCheckCircleOutline,
  MdOutlineErrorOutline,
  MdOutlineWarningAmber,
} from "react-icons/md";
import { HiFire } from "react-icons/hi";
import { useHover } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { Box, Button, Drawer, Text } from "@mantine/core";
import { Dispatch, SetStateAction, useState } from "react";
import { ImportSettings } from "./types";
import ImportSettingsForm from "./ImportSettingsForm";

type Props = {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
  settings: ImportSettings;
};

export default function ImportSettingsPanel({
  opened,
  setOpened,
  settings,
}: Props) {
  return (
    <Drawer
      opened={opened}
      onClose={() => setOpened(false)}
      title={<Text weight="bold">Import settings</Text>}
      padding="xl"
      position="left"
      size={600}
    >
      <ImportSettingsForm settings={settings} />
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

function DeleteTasks() {
  const [state, setState] = useState(ButtonState.Default);
  const { hovered, ref } = useHover();

  function handleClick() {
    if (state === ButtonState.Waiting) return;
    if (state === ButtonState.Success) return;

    if (state === ButtonState.Default) {
      setState(ButtonState.Confirmation);
      return;
    }

    if (state === ButtonState.Confirmation) {
      setState(ButtonState.Waiting);
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
        .then(function (response) {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response;
        })
        .then((response) => {
          setState(ButtonState.Success);
          setTimeout(() => {
            setState(ButtonState.Default);
          }, 2000);
        })
        .catch((error) => {
          setState(ButtonState.Default);
          showNotification({
            title: "Oh no!",
            icon: <MdOutlineErrorOutline />,
            color: "red",
            message: "There was an error - please try again in a few minutes",
            autoClose: 10000,
          });
          console.error(error);
        });
    }
  }

  function getColor() {
    switch (state) {
      case ButtonState.Default:
      case ButtonState.Confirmation:
      case ButtonState.Waiting:
        return "red";
      case ButtonState.Success:
        return "green";
    }
  }

  function getIcon() {
    switch (state) {
      case ButtonState.Default:
      case ButtonState.Waiting:
        return <HiFire />;
      case ButtonState.Confirmation:
        return <MdOutlineWarningAmber />;
      case ButtonState.Success:
        return <MdCheckCircleOutline />;
    }
  }

  function getText() {
    switch (state) {
      case ButtonState.Default:
        return "burn it all to the ground";
      case ButtonState.Confirmation:
        return "Are you sure?";
      case ButtonState.Waiting:
        return "Deleting...";
      case ButtonState.Success:
        return "Deleted.";
    }
  }

  return (
    <Box ref={ref} mt="lg" ml="lg" sx={{ width: "100%" }}>
      <Text mb="md">Want to delete all data?</Text>
      <Button
        variant={hovered ? "filled" : "light"}
        uppercase={hovered}
        leftIcon={hovered ? getIcon() : null}
        rightIcon={hovered ? getIcon() : null}
        color={getColor()}
        onClick={handleClick}
        radius={30}
        sx={{
          transition:
            "background-color 0.1s ease-out, border 0.1s ease-out, color 0.1s ease-out",
        }}
      >
        {getText()}
      </Button>
    </Box>
  );
}

enum ButtonState {
  Default,
  Confirmation,
  Waiting,
  Success,
}
