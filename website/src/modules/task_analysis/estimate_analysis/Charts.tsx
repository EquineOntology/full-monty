import { Dispatch, SetStateAction } from "react";
import { Drawer, Group } from "@mantine/core";
import Histogram from "@/modules/grapher/Histogram";
import ScatterPlot from "@/modules/grapher/ScatterPlot";

type Props = {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
  estimate: number;
  graphs: {
    histogram: { min: number; max: number; amount: number }[];
    scatterplot: { x: number; y: number }[];
  };
};

function Charts({ estimate, graphs, opened, setOpened }: Props) {
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
      <Group
        sx={{ marginTop: 40 }}
        direction="column"
        align="center"
        spacing="sm"
        grow
        noWrap
      >
        <ScatterPlot
          data={scatterplot}
          estimate={estimate}
          width={450}
          height={350}
        />
        <Histogram data={histogram} width={450} height={350} />
      </Group>
    </Drawer>
  );
}

export default Charts;
