import { useState } from "react";
import { Button } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import {
  CheckIcon,
  CrossCircledIcon,
  ExclamationTriangleIcon,
  TrashIcon,
} from "@modulz/radix-icons";

export default function DeleteTasks() {
  const notifications = useNotifications();
  const [state, setState] = useState(ButtonState.Default);

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
            icon: <CrossCircledIcon />,
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
        return <TrashIcon />;
      case ButtonState.Confirmation:
        return <ExclamationTriangleIcon />;
      case ButtonState.Success:
        return <CheckIcon />;
    }
  }

  function getText() {
    switch (state) {
      case ButtonState.Default:
        return "Burn everything to the ground";
      case ButtonState.Confirmation:
        return "Are you sure?";
      case ButtonState.Waiting:
        return "Deleting...";
      case ButtonState.Success:
        return "Deleted";
    }
  }

  return (
    <Button leftIcon={getIcon()} color={getColor()} onClick={handleClick}>
      {getText()}
    </Button>
  );
}

enum ButtonState {
  Default,
  Confirmation,
  Waiting,
  Success,
}
