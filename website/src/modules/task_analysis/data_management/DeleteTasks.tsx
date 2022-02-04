import { useState } from "react";
import { Box, Button, Group, Text } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import {
  MdCheckCircleOutline,
  MdOutlineErrorOutline,
  MdOutlineWarningAmber,
} from "react-icons/md";
import { HiFire } from "react-icons/hi";
import { useHover } from "@mantine/hooks";

function DeleteTasks() {
  const notifications = useNotifications();
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
          notifications.showNotification({
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
        return "burn everything to the ground";
      case ButtonState.Confirmation:
        return "Are you sure?";
      case ButtonState.Waiting:
        return "Deleting...";
      case ButtonState.Success:
        return "Deleted.";
    }
  }

  return (
    <Group mt="xl">
      <Text>or</Text>
      <Box ref={ref}>
        <Button
          variant={hovered ? "filled" : "outline"}
          uppercase={hovered}
          leftIcon={hovered ? getIcon() : null}
          rightIcon={hovered ? getIcon() : null}
          color={getColor()}
          onClick={handleClick}
          sx={{
            borderRadius: 30,
            transition:
              "background-color 0.1s ease-out, border 0.1s ease-out, color 0.1s ease-out",
          }}
        >
          {getText()}
        </Button>
      </Box>
    </Group>
  );
}

enum ButtonState {
  Default,
  Confirmation,
  Waiting,
  Success,
}

export default DeleteTasks;
