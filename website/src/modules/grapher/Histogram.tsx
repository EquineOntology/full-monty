import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { ApexOptions } from "apexcharts";
import { BarChartSeries, BarDescription } from "./types";

type Props = {
  data: BarDescription[];
  width: number;
  height: number;
};

function Histogram({ data, width, height }: Props) {
  return (
    <Chart
      options={getChartOptions(data)}
      series={composeSeries(data)}
      type="bar"
      width={width}
      height={height}
    />
  );
}

function composeSeries(data: BarDescription[]) {
  const series: BarChartSeries = [{ name: "Tasks", data: [] }];

  data.forEach((datum) => {
    series[0].data.push(datum.amount);
  });

  return series;
}

function getChartOptions(data: BarDescription[]): ApexOptions {
  const categories = data.map((barDescription) => {
    const lowerBound = humanizeTime(barDescription.min);
    const upperBound = humanizeTime(barDescription.max);
    return `${lowerBound}—${upperBound}`;
  });

  return {
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: { position: "top" },
      },
    },
    dataLabels: {
      enabled: true,
      offsetY: -20,
      style: { colors: ["black"] },
    },
    xaxis: {
      categories: categories,
      position: "bottom",
      axisBorder: { show: false },
      axisTicks: { show: false },
      title: {
        text: "Range (minutes)",
        offsetY: -10,
      },
    },
    yaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { show: true },
      title: { text: "# of tasks" },
    },
    tooltip: { enabled: false },
  };
}

function humanizeTime(seconds: number) {
  const minutes = Math.round(seconds / 60);

  if (minutes < 60) {
    return `${minutes}m`;
  }

  const hours = Math.floor(minutes / 60);
  const leftoverMinutes = minutes % 60;

  if (hours < 24) {
    return `${hours}h${leftoverMinutes}m`;
  }

  const days = Math.floor(hours / 24);
  const leftoverHours = hours % 24;

  return `${days}d${leftoverHours}h${leftoverMinutes}m`;
}

export default Histogram;
