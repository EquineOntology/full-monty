import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { ScatterPlotSeries, Point } from "./types";

type Props = {
  data: Point[];
  estimate: number;
  width: number;
  height: number;
};

function ScatterPlot({ data, estimate, width, height }: Props) {
  return (
    <Chart
      options={getChartOptions()}
      series={composeSeries(data, estimate)}
      type="scatter"
      width={width}
      height={height}
    />
  );
}

function composeSeries(data: Point[], estimateInMinutes: number) {
  const estimate = estimateInMinutes * 60;
  const series: ScatterPlotSeries = [
    { name: "Matching estimate", data: [] },
    { name: "Adjacent", data: [] },
  ];

  data.forEach((datum) => {
    const seriesIndex = datum.x === estimate ? 0 : 1;
    series[seriesIndex].data.push({
      x: Math.round(datum.x / 60),
      y: Math.round(datum.y / 60),
    });
  });

  return series;
}

function getChartOptions(): ApexOptions {
  return {
    chart: {
      zoom: { enabled: false },
    },
    xaxis: {
      type: "numeric",
      title: { text: "Estimate (minutes)" },
    },
    yaxis: { title: { text: "Duration (minutes)" } },
    tooltip: {
      x: {
        show: false,
        formatter: (value: number) => {
          return `Estimated at ${value}m`;
        },
      },
      y: {
        title: {
          formatter: () => {
            return "";
          },
        },
        formatter: (value: number) => {
          return `Took ${value}m`;
        },
      },
      marker: { show: false },
    },
  };
}

export default ScatterPlot;
