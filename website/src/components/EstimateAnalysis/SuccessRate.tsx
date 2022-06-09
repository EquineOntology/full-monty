import { Badge, Center, Text, Title } from "@mantine/core";

export default function SuccessRate({ rate }: { rate: number }) {
  if (rate < 0.2) {
    return composeMessageWithBadge("red", "usually", "not enough");
  }

  if (rate < 0.4) {
    return composeMessageWithBadge("red", "often", "not enough");
  }

  if (rate < 0.6) {
    return composeMessageWithBadge("yellow", "sometimes", "enough");
  }

  if (rate < 0.8) {
    return composeMessageWithBadge("green", "often", "enough");
  }

  return composeMessageWithBadge("green", "usually", "high enough");
}

function composeMessageWithBadge(
  color: string,
  frequency: string,
  text: string
) {
  return (
    <Title order={2} mb="xl" align="center">
      <Center inline>
        <Text mr="xs">The estimate is {frequency}</Text>
        <Badge variant="filled" color={color} size="xl">
          {text}
        </Badge>
      </Center>
    </Title>
  );
}
