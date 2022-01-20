import { Text } from "@mantine/core";
import pluralize from "../utils/NaivePluralizer";

type Props = {
  medianDelta: number;
};

export default function MedianExplainer({ medianDelta }: Props) {
  const absoluteMedian = Math.abs(medianDelta);

  return (
    <Text mt="lg">
      {" "}
      The median is {medianDelta} {pluralize("minute", medianDelta)}, meaning
      that{" "}
      <b>
        half the time tasks take {absoluteMedian}{" "}
        {pluralize("minute", absoluteMedian)}
        {medianDelta > 0 ? "  more" : " less"}
      </b>{" "}
      than expected
    </Text>
  );
}
