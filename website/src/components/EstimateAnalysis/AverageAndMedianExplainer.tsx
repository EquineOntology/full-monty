import pluralize from "@/utils/NaivePluralizer";
import { Box, Text } from "@mantine/core";

type Props = {
  estimate: number;
  meanDuration: number;
  medianDuration: number;
};

export default function AverageAndMedianExplainer({
  estimate,
  meanDuration,
  medianDuration,
}: Props) {
  return (
    <Box>
      <Text mt="lg" ml={30}>
        The median is {medianDuration} {pluralize("minute", medianDuration)},
        meaning that exactly{" "}
        <b>
          half the tasks took {medianDuration}{" "}
          {pluralize("minute", medianDuration)} or less
        </b>
        .
      </Text>
      <Text mt="lg" ml={60}>
        The mean duration (i.e. weighted average) of a task estimated at{" "}
        {estimate} {pluralize("minute", estimate)} is{" "}
        <b>
          {Math.round(meanDuration)} {pluralize("minute", meanDuration)}
        </b>
        .
      </Text>
    </Box>
  );
}
