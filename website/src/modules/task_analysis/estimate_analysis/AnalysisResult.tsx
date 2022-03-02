import { Box, Center, Container, Group, Text } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import SampleSize from "./explainer/SampleSize";
import SuccessRate from "./explainer/SuccessRate";
import AverageAndMedianExplainer from "./explainer/AverageAndMedianExplainer";
import StandardDeviationExplainer from "./explainer/StandardDeviationExplainer";
import { BsExclamationLg, BsQuestionLg } from "react-icons/bs";
import ScatterPlot from "@/modules/grapher/ScatterPlot";
import Histogram from "@/modules/grapher/Histogram";

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
        medianDuration: number;
        medianDelta: number;
        sigmaDuration: number;
        message: undefined;
        graphs: {
          histogram: { min: number; max: number; amount: number }[];
          scatterplot: { x: number; y: number }[];
        };
      };
    };

const iconSize = 200;

function AnalysisResult({ data }: Props) {
  const notifications = useNotifications();

  if (!data) {
    return (
      <Box>
        <Group sx={{ fontSize: iconSize, marginTop: 100 }}>
          <BsQuestionLg style={{ transform: "rotate(-30deg)" }} />
          <BsQuestionLg
            style={{
              marginLeft: -100,
              marginTop: -60,
              marginRight: -100,
              fontSize: iconSize * 1.1,
            }}
          />
          <BsQuestionLg style={{ transform: "rotate(30deg)" }} />
        </Group>
        <Center sx={{ marginTop: 30 }}>
          <Text>chuck an estimate and see what happens</Text>
        </Center>
      </Box>
    );
  }

  if (data.message !== undefined) {
    return (
      <Box>
        <Group sx={{ fontSize: iconSize, marginTop: 100 }}>
          <BsExclamationLg style={{ transform: "rotate(-30deg)" }} />
          <BsExclamationLg
            style={{
              marginLeft: -100,
              marginTop: -60,
              marginRight: -100,
              fontSize: iconSize * 1.1,
            }}
          />
          <BsExclamationLg style={{ transform: "rotate(30deg)" }} />
        </Group>
        <Center sx={{ marginTop: 30 }}>
          <Text>{data.message}</Text>
        </Center>
      </Box>
    );
  }

  const {
    estimate,
    successRate,
    sampleSize,
    meanDuration,
    medianDuration,
    sigmaDuration,
    graphs,
  } = data;

  return (
    <Container>
      <Container sx={{ maxWidth: 700, marginTop: 40 }}>
        <SuccessRate rate={successRate} />
        <AverageAndMedianExplainer
          estimate={estimate}
          meanDuration={meanDuration}
          medianDuration={medianDuration}
        />
        <StandardDeviationExplainer
          estimate={estimate}
          meanDuration={meanDuration}
          standardDeviation={sigmaDuration}
        />
        <SampleSize size={sampleSize} />
      </Container>
      <Group
        sx={{ marginTop: 40, marginLeft: -40 }}
        direction="row"
        align="center"
        spacing="xl"
        grow
        noWrap
      >
        <ScatterPlot data={graphs.scatterplot} estimate={estimate} />
        <Histogram data={graphs.histogram} />
      </Group>
    </Container>
  );
}

export default AnalysisResult;
