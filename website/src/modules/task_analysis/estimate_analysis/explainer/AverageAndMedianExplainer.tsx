import { Text } from "@mantine/core";
import pluralize from "@/libs/NaivePluralizer";

type Props = {
  estimate: number;
  meanDuration: number;
  meanDelta: number;
  medianDuration: number;
};

function AverageAndMedianExplainer({
  estimate,
  meanDuration,
  meanDelta,
  medianDuration,
}: Props) {
  const absoluteAverage = Math.abs(meanDelta);
  return (
    <Text mt="lg">
      The mean duration (i.e. weighted average) of a task estimated at{" "}
      {estimate} {pluralize("minute", estimate)} is{" "}
      <b>
        {Math.round(meanDuration)} {pluralize("minute", absoluteAverage)}
      </b>
      .<br />
      The median is {medianDuration} {pluralize("minute", medianDuration)},
      meaning that exactly half of the tasks took {medianDuration}{" "}
      {pluralize("minute", medianDuration)} or less, and the other half took
      more.
    </Text>
  );
}

export default AverageAndMedianExplainer;
