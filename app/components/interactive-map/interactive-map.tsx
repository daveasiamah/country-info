"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import * as Highcharts from "highcharts";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsReact, {
  HighchartsReactProps,
  HighchartsReactRefObject,
} from "highcharts-react-official";
import worldMap from "@highcharts/map-collection/custom/world.geo.json";
import data from "./countries.json";
import { useCountryData } from "@/app/hooks/useCountryData";

if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts);
}

function InteractiveMap(props: HighchartsReactProps) {
  const { countryData, updateCountryData } = useCountryData();
  const chartComponentRef = useRef<HighchartsReactRefObject>(null);

  let mapOptions = {
    exporting: {
      buttons: {
        contextButton: {
          align: "right",
        },
      },
    },
    chart: {
      map: worldMap,
      height: "70%",
      zoomType: "x",
      panning: true,
      panKey: "shift",
      style: {
        cursor: "pointer",
        width: "100%",
      },
      backgroundColor: "#ffffff",
    },
    title: {
      text: "World Map",
    },
    plotOptions: {
      series: {
        events: {
          click: function (e: {
            point: { name: any; properties: { [x: string]: any } };
          }) {
            let countryName = e.point.name;
            let countryCode = e.point.properties["hc-a2"];
            if (countryName === "United States of America") {
              let countryName = "United States";
              updateCountryData({
                name: countryName,
                code: countryCode,
              });
              return;
            }
            if (countryName === "United Republic of Tanzania") {
              let countryName = "Tanzania";
              updateCountryData({
                name: countryName,
                code: countryCode,
              });
              return;
            }
            updateCountryData({
              name: countryName,
              code: countryCode,
            });
          },
        },
      },
    },
    navigation: {
      buttonOptions: {
        align: "left",
        theme: {
          stroke: "#000000",
        },
      },
    },

    mapNavigation: {
      enabled: true,
      enableDoubleClickZoomTo: true,
    },

    // colorAxis: {},
    series: [
      {
        mapData: worldMap,
        name: "Countries",
        allowPointSelect: true,
        joinBy: null,
        keys: ["name", "code"],
        states: {
          hover: {
            color: "#3B82F6",
            borderWidth: "80px",
          },
          select: {
            color: "#f68f3b",
            enabled: true,
            borderWidth: "40px",
            borderColor: "#000000",
          },
        },
        borderColor: "#b6b6b6",
        dataLabels: {
          enabled: true,
          format: "{point.properties.name}",
        },
        data,
        color: "#dadada", // Set the color of the points
      },
    ],
  };

  const [chartOptions, setChartOptions] = useState(mapOptions);

  return (
    <div className="flex flex-col">
      <HighchartsReact
        options={chartOptions}
        constructorType={"mapChart"}
        highcharts={Highcharts}
        ref={chartComponentRef}
        {...props}
      />
    </div>
  );
}

export default InteractiveMap;
