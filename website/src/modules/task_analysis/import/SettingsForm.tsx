import { Box, Button, Switch, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification, updateNotification } from "@mantine/notifications";
import { MdAddCircleOutline, MdCheckCircleOutline } from "react-icons/md";
import { ImportSettings } from "./types";

type Props = {
  settings: ImportSettings;
};

type FormValues = {
  exclusionList: string;
  useEstimateWhenDurationMissing: boolean;
};

function SettingsForm({ settings }: Props) {
  const { exclusionList, useEstimateWhenDurationMissing } = settings;
  const form = useForm({
    initialValues: {
      exclusionList: (exclusionList ?? []).join(","),
      useEstimateWhenDurationMissing: useEstimateWhenDurationMissing ?? false,
    },
  });

  function handleSubmit(values: FormValues) {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/import/settings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(() => {
        showNotification({
          id: "updating-settings",
          title: "successful",
          icon: <MdCheckCircleOutline />,
          color: "green",
          message: "Settings updated",
          autoClose: 5000,
        });
      })
      .catch((error) => {
        updateNotification({
          id: "update-settings",
          title: "Oh no!",
          icon: <MdAddCircleOutline rotate={45} />,
          color: "red",
          message: "There was an error - please try again in a few minutes",
          autoClose: 5000,
        });
        console.error(error);
      });
  }

  return (
    <Box mx="xl" mt="xl">
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <TextInput
          label="Exclusion list"
          {...form.getInputProps("exclusionList")}
        />

        <Switch
          mt="lg"
          label="Use the task's estimate as the duration, if a duration is missing"
          {...form.getInputProps("useEstimateWhenDurationMissing", {
            type: "checkbox",
          })}
        />

        <Button type="submit" variant="light" mt="lg" radius={30}>
          update
        </Button>
      </form>
    </Box>
  );
}

export default SettingsForm;
