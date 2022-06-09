import Histogram from "@/components/Charts/Histogram";
import ScatterPlot from "@/components/Charts/ScatterPlot";
import { Drawer, Stack } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";

type Props = {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
  estimate: number;
  graphs: {
    histogram: { min: number; max: number; amount: number }[];
    scatterplot: { x: number; y: number }[];
  };
};

export default function Charts({ estimate, graphs, opened, setOpened }: Props) {
  const { scatterplot, histogram } = graphs;
  return (
    <Drawer
      opened={opened}
      onClose={() => setOpened(false)}
      title="Distribution of tasks and estimates"
      padding="xl"
      position="right"
      size={600}
    >
      <Stack sx={{ marginTop: 40 }} align="center" spacing="sm">
        <ScatterPlot
          data={scatterplot}
          estimate={estimate}
          width={450}
          height={350}
        />
        <hr style={{ border: "none" }} />
        <Histogram data={histogram} width={450} height={350} />
      </Stack>
    </Drawer>
  );
}
