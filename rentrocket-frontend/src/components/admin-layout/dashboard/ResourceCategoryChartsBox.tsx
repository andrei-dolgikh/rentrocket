'use client'
import { Chart } from "react-google-charts";
import "./ChartBox.css";
import { COLORS } from "@/constants/color.constants";

export function ResourceCategoryChartsBox( { categoryId }: { categoryId?: string }) {
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
        animation: {
          startup: true,
          easing: "linear",
          duration: 500,
        },
        enableInteractivity: false,
        series: [{ 
          color: "#30D158",
          lineWidth: 2
        }],
        backgroundColor: COLORS.weak_black
    };

	return (
		<div className={`flex flex-col bg-[${COLORS.weak_black}] m-1`}>
        <Chart
        chartType="LineChart"
        data={[["Datetime", "Count"], [4, 2222], [8, 3333], [14, 1111], [15, 2222]]}
        width="100%"
        height="165px"
        options={chartOptions}
        />
		</div>
	)
}
