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
        meanDuration: number;
        meanDelta: number;
        medianDuration: number;
        medianDelta: number;
        sigmaDuration: number;
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
    meanDuration,
    meanDelta,
    medianDuration,
    sigmaDuration,
  } = data;

  return (
    <Box mt="3rem">
      <hr />
      <SuccessRate rate={successRate} />
      <AverageAndMedianExplainer
        estimate={estimate}
        meanDuration={meanDuration}
        meanDelta={meanDelta}
        medianDuration={medianDuration}
      />
      <StandardDeviationExplainer
        estimate={estimate}
        meanDuration={meanDuration}
        standardDeviation={sigmaDuration}
      />
      <SampleSize size={sampleSize} />
    </Box>
  );
}

export default AnalysisResult;
