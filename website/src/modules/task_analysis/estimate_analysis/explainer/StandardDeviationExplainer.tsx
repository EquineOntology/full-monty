import { Text } from "@mantine/core";
import pluralize from "@/libs/NaivePluralizer";

type Props = {
  estimate: number;
  meanDuration: number;
  standardDeviation: number;
};

function shouldWorryAboutStandardDeviation(standardDeviation: number) {
  return standardDeviation > 0.7;
}

export default function StandardDeviationExplainer({
  estimate,
  meanDuration,
  standardDeviation,
}: Props) {
  // Technically speaking, the SD should be applied to the average; when
  // using the _entire_ population, however, the mean and average will
  // be the same; so we just use the mean our API already returns
  // instead of adding more work for the average (CF 22.01.22).
  const lowerBound = Math.round(Math.max(meanDuration - standardDeviation, 1));
  const upperBound = Math.round(meanDuration + standardDeviation);

  const deviationInPercentage = Math.round(
    (standardDeviation / estimate) * 100
  );
  const worryAboutDeviation =
    shouldWorryAboutStandardDeviation(standardDeviation);
  const renderedDeviation = worryAboutDeviation ? (
    <u>{deviationInPercentage}%</u>
  ) : (
    `${deviationInPercentage}%`
  );

  return (
    <Text mt="lg">
      The standard deviation is ±{standardDeviation}{" "}
      {pluralize("minute", standardDeviation)} ({renderedDeviation} of the
      estimate), meaning that ~70% of tasks estimated to take {estimate}{" "}
      {pluralize("minute", estimate)} can take{" "}
      <b>
        anywhere between {lowerBound} and {upperBound}{" "}
        {pluralize("minute", upperBound)}
      </b>
      .
    </Text>
  );
}
