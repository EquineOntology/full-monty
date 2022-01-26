import { useState } from "react";
import { Button, Title } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import {
  CheckIcon,
  CrossCircledIcon,
  ExclamationTriangleIcon,
  TrashIcon,
} from "@modulz/radix-icons";

export default function TaskActions() {
  const notifications = useNotifications();
  const [deleteButtonPhase, setDeleteButtonPhase] = useState(
    DeleteButtonPhase.Default
  );

  function handleClickOnDelete() {
    if (deleteButtonPhase === DeleteButtonPhase.Waiting) return;
    if (deleteButtonPhase === DeleteButtonPhase.Success) return;

    if (deleteButtonPhase === DeleteButtonPhase.Default) {
      setDeleteButtonPhase(DeleteButtonPhase.Confirmation);
      return;
    }

    if (deleteButtonPhase === DeleteButtonPhase.Confirmation) {
      setDeleteButtonPhase(DeleteButtonPhase.Waiting);
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
          setDeleteButtonPhase(DeleteButtonPhase.Success);
          setTimeout(() => {
            setDeleteButtonPhase(DeleteButtonPhase.Default);
          }, 2000);
        })
        .catch((error) => {
          setDeleteButtonPhase(DeleteButtonPhase.Default);
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

  function getDeleteButtonColor() {
    switch (deleteButtonPhase) {
      case DeleteButtonPhase.Default:
      case DeleteButtonPhase.Confirmation:
      case DeleteButtonPhase.Waiting:
        return "red";
      case DeleteButtonPhase.Success:
        return "green";
    }
  }

  function getDeleteButtonIcon() {
    switch (deleteButtonPhase) {
      case DeleteButtonPhase.Default:
      case DeleteButtonPhase.Waiting:
        return <TrashIcon />;
      case DeleteButtonPhase.Confirmation:
        return <ExclamationTriangleIcon />;
      case DeleteButtonPhase.Success:
        return <CheckIcon />;
    }
  }

  function getDeleteButtonText() {
    switch (deleteButtonPhase) {
      case DeleteButtonPhase.Default:
        return "Delete data";
      case DeleteButtonPhase.Confirmation:
        return "Are you sure?";
      case DeleteButtonPhase.Waiting:
        return "Deleting...";
      case DeleteButtonPhase.Success:
        return "Deleted";
    }
  }

  return (
    <div style={{ marginTop: "2rem" }}>
      <Title order={3}>Burn everything to the ground</Title>
      <Button
        mt="sm"
        leftIcon={getDeleteButtonIcon()}
        color={getDeleteButtonColor()}
        onClick={handleClickOnDelete}
      >
        {getDeleteButtonText()}
      </Button>
    </div>
  );
}

enum DeleteButtonPhase {
  Default,
  Confirmation,
  Waiting,
  Success,
}
