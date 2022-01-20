import { Text } from "@mantine/core";
import pluralize from "../utils/NaivePluralizer";

type Props = {
  estimate: number;
  averageDelta: number;
};

export default function AverageExplainer({ estimate, averageDelta }: Props) {
  const absoluteAverage = Math.abs(averageDelta);
  return (
    <Text mt="lg">
      When you estimate a task will take {estimate}{" "}
      {pluralize("minute", estimate)}, its actual duration is on average{" "}
      <b>
        {absoluteAverage} {pluralize("minute", absoluteAverage)}{" "}
        {averageDelta > 0 ? "more" : "less"}
      </b>
      .
    </Text>
  );
}
