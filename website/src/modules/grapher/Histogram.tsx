import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { ApexOptions } from "apexcharts";
import { BarChartSeries, BarDescription } from "./types";

type Props = {
  data: BarDescription[];
};

function Histogram({ data }: Props) {
  const categories = data.map((barDescription) => {
    const lowerBound = Math.round(barDescription.min / 60);
    const upperBound = Math.round(barDescription.max / 60);
    return `${lowerBound}-${upperBound}`;
  });

  return (
    <Chart
      options={getChartOptions(categories)}
      series={composeSeries(data)}
      type="bar"
      width="500"
      height="400"
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

function getChartOptions(categories: string[]): ApexOptions {
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
      title: { text: "Range (min)" },
    },
    yaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { show: true },
      title: { text: "Tasks" },
    },
    tooltip: { enabled: false },
  };
}

export default Histogram;
