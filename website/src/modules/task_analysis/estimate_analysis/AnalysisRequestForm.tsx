import {
  Button,
  Center,
  NumberInput,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { useNotifications } from "@mantine/notifications";
import { BsDashCircle, BsPlusCircle } from "react-icons/bs";
import { MdCheckCircleOutline } from "react-icons/md";

type Props = {
  setAnalysisResult: Function;
};

function AnalysisRequestForm({ setAnalysisResult }: Props) {
  const maxEstimate = 6000;
  const minEstimate = 1;

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
        setAnalysisResult(result.data);
      })
      .catch((error) => {
        notifications.showNotification({
          title: "Oh no!",
          icon: <MdCheckCircleOutline />,
          color: "red",
          message: "There was an error - please try again in a few minutes",
          autoClose: 10000,
        });
        console.error(error);
      });
  }

  function changeValue(delta: number) {
    const { estimate } = form.values;
    let newValue = estimate + delta;
    newValue = Math.min(Math.max(minEstimate, newValue), maxEstimate);
    form.setFieldValue("estimate", newValue);
  }

  const textSize = 50;
  return (
    <Center sx={{ marginRight: "auto", marginLeft: "auto" }}>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Center my="md">
          <Title
            sx={{
              marginBottom: 4,
              whiteSpace: "nowrap",
              textAlign: "center",
              width: "100%",
            }}
          >
            Choose an estimate
          </Title>
        </Center>
        <Center my="md">
          <UnstyledButton
            sx={{
              fontSize: textSize * 0.7,
              color: "black",
              marginRight: "1rem",
              marginTop: 20,
            }}
            type="button"
            onClick={() => changeValue(-1)}
          >
            <BsDashCircle />
          </UnstyledButton>
          <NumberInput
            required
            min={minEstimate}
            max={maxEstimate}
            hideControls={true}
            variant="unstyled"
            value={30}
            sx={{
              input: {
                textAlign: "center",
                fontSize: textSize * 2,
                height: textSize * 2,
                transition: "width 0.2s ease-out",
                width: (form.values.estimate || 1).toString().length * 65,
              },
            }}
            {...form.getInputProps("estimate")}
          />
          <UnstyledButton
            sx={{
              fontSize: textSize * 0.7,
              color: "black",
              marginLeft: "1rem",
              marginTop: 20,
            }}
            type="button"
            onClick={() => changeValue(1)}
          >
            <BsPlusCircle />
          </UnstyledButton>
        </Center>

        <Center mt="lg">
          <Button type="submit" variant="light" sx={{ borderRadius: 30 }}>
            throw an estimate at the wall!
          </Button>
        </Center>
      </form>
    </Center>
  );
}

export default AnalysisRequestForm;
