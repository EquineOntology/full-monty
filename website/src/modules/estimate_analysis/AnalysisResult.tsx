import { Box, Text } from "@mantine/core";
import SampleSize from "./SampleSize";
import SuccessRate from "./SuccessRate";
import AverageAndMedianExplainer from "./AverageAndMedianExplainer";
import StandardDeviationExplainer from "./StandardDeviationExplainer";

type Props =
  | {
      data: undefined;
    }
  | {
      data: {
        message: string;
      };
    }
  | {
      data: {
        estimate: number;
        sampleSize: number;
        successRate: number;
        averageDelta: number;
        medianDelta: number;
        standardDeviation: number;
        message: undefined;
      };
    };

function AnalysisResult({ data }: Props) {
  if (!data) {
    return <div></div>;
  }

  if (data.message !== undefined) {
    return (
      <Box mt="3rem">
        <hr />
        <Text mt="2rem">{data.message}. Boo!</Text>
      </Box>
    );
  }

  const {
    estimate,
    successRate,
    sampleSize,
    averageDelta,
    medianDelta,
    standardDeviation,
  } = data;

  return (
    <Box mt="3rem">
      <hr />
      <SuccessRate rate={successRate} />
      <AverageAndMedianExplainer
        estimate={estimate}
        averageDelta={averageDelta}
        medianDelta={medianDelta}
      />
      <StandardDeviationExplainer
        estimate={estimate}
        averageDelta={averageDelta}
        standardDeviation={standardDeviation}
      />
      <SampleSize size={sampleSize} />
    </Box>
  );
}

export default AnalysisResult;
