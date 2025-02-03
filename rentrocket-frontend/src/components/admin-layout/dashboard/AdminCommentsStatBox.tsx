'use client'
import { Chart } from "react-google-charts";
import "./ChartBox.css";
import { COLORS } from "@/constants/color.constants";
import { DeltaChartBadge } from "@/components/ui/badge/DeltaBadge";
import { useStatistics } from '@/hooks/useStatistics';
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";

interface ChartsBoxProps {
  chartName?: string;
  header?: boolean;
}

export function AdminCommentsStatBox({ chartName, header }: ChartsBoxProps) {
  const { statistics, isStatisticsLoading, isStatisticsSuccess } = useStatistics();

  const chartOptions = {
    chartArea: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },
    hAxis: {
      gridlines: {
        color: 'transparent'
      },
      textPosition: 'none'
    },
    vAxis: {
      gridlines: {
        color: 'transparent'
      },
      textPosition: 'none'
    },
    legend: "none",
    enableInteractivity: true,
    series: [{
      color: "#30D158",
      lineWidth: 2
    }],
    backgroundColor: COLORS.weak_black
  };

  if (isStatisticsLoading) {
    return <Card  className="m-2 p-2">
      <CardBody>
        <p>Загрузка...</p>
      </CardBody>
    </Card>;
  }

  if (!isStatisticsSuccess || !statistics.dashStat) {
    return <Card className="m-2 p-2">
      <CardBody>
        <p>Ошибка загрузка статистики.</p>
      </CardBody>
    </Card>;
  }

  const chartData = [["Datetime", "Count"], ...statistics.dashStat.map((stat: any) => [new Date(stat.timestamp).getTime(), stat.comments])];

  const lastCommentsCount = statistics.dashStat[statistics.dashStat.length - 1]?.comments;
  
  return (
    <div className={`flex flex-col bg-[${COLORS.weak_black}] m-3`}>
      {header &&
        <>
          <div className="flex flex-row justify-between p-4">
            <div className="">
              <p className="text-[16px]">{chartName}</p>
              <p className="text-[24px] text-semibold">{lastCommentsCount}</p>
            </div>
            <div className="text-[16px]">
              <div>За месяц <DeltaChartBadge delta={45} /></div>
            </div>
          </div>
        </>
      }
      <Chart
        chartType="LineChart"
        data={chartData}
        width="100%"
        height="200px"
        options={chartOptions}
      />
    </div>
  )
}