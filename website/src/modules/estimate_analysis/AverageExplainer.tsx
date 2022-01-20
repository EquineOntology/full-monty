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
      When you estimate tasks taking {estimate} {pluralize("minute", estimate)},
      the actual time they take is on average{" "}
      <b>
        {absoluteAverage} {pluralize("minute", absoluteAverage)}{" "}
        {averageDelta > 0 ? "more" : "less"}
      </b>
      .
    </Text>
  );
}
