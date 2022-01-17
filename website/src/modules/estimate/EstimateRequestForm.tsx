import { Button, NumberInput, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { useNotifications } from "@mantine/notifications";
import { CheckCircledIcon, CrossCircledIcon } from "@modulz/radix-icons";

function EstimateRequestForm() {
  const notifications = useNotifications();
  const form = useForm({
    initialValues: {
      project: "",
      category: "",
      estimate: 0,
    },
    errorMessages: {
      estimate: "The estimate must be higher than 0",
    },
    validationRules: {
      estimate: (value) => value > 0,
    },
  });

  type FormValues = {
    project: string;
    category: string;
    estimate: number;
  };
  function handleSubmit(values: FormValues) {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/estimate`, {
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
      .then((response) => response.json())
      .then((result) => {
        const estimate = result.data.estimate;
        notifications.showNotification({
          title: "Processing in progress",
          icon: <CheckCircledIcon />,
          color: "green",
          message: `The time estimated time for the task is ${estimate} minutes`,
          autoClose: 10000,
        });
      })
      .catch((error) => {
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

  return (
    <>
      <Title order={3} mt="lg" mb="md">
        Throw an estimate at the wall!
      </Title>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <TextInput
          required
          label="Project"
          {...form.getInputProps("project")}
        />

        <TextInput
          label="Category"
          mt="md"
          {...form.getInputProps("category")}
        />

        <NumberInput
          label="Estimate (in minutes)"
          mt="md"
          {...form.getInputProps("estimate")}
        />

        <Button type="submit" mt="md">
          Submit
        </Button>
      </form>
    </>
  );
}

export default EstimateRequestForm;
