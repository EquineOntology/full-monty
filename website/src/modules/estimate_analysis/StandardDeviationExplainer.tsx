import { Text } from "@mantine/core";
import pluralize from "../utils/NaivePluralizer";

type Props = {
  estimate: number;
  averageDelta: number;
  standardDeviation: number;
};

export default function StandardDeviationExplainer({
  estimate,
  averageDelta,
  standardDeviation,
}: Props) {
  const averageDuration = estimate + averageDelta;
  const lowerBound = Math.max(averageDuration - standardDeviation, 1);
  const upperBound = averageDuration + standardDeviation;
  return (
    <Text mt="lg">
      The standard deviation is ±{standardDeviation}{" "}
      {pluralize("minute", standardDeviation)}, meaning that ~70% of tasks
      estimated to take {estimate} {pluralize("minute", estimate)} take{" "}
      <b>
        between {lowerBound} and {upperBound} {pluralize("minute", upperBound)}
      </b>
    </Text>
  );
}
