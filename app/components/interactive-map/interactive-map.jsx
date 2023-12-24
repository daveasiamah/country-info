"use client";
import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsMap from "highcharts/modules/map";
import worldMap from "@highcharts/map-collection/custom/world.geo.json";
import data from "./countries.json";
import { useCountryData } from "@/app/hooks/useCountryData";

if (typeof Highcharts === "object") {
  HighchartsMap(Highcharts);
}

function InteractiveMap() {
  const [searchValue, setSearchValue] = useState("");
  const { countryData, updateCountryData } = useCountryData();

  useEffect(() => {
    console.log("COUNTRY DATA IN CONTEXT:", countryData);
    Highcharts.mapChart("world-map", {
      chart: {
        map: worldMap,
        height: "40%", // Set the height of the map
        // width: "100%", // Set the width of the map
        zoomType: "x", // Enable zoom on x-axis (horizontal)
        panning: true, // Enable panning
        panKey: "shift",
        style: {
          cursor: "pointer",
          width: "100%",
        },
      },
      title: {
        text: "World Map",
      },
      plotOptions: {
        series: {
          events: {
            click: function (e) {
              const countryName = e.point.name;
              const countryCode = e.point.properties["hc-a2"];
              console.log("CLICKED ON MAP:", countryName, countryCode);
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
            stroke: "#3b3b3b",
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
              color: "#ec9e22",
            },
          },
          dataLabels: {
            enabled: true,
            format: "{point.properties.name}",
          },
          data,
          color: "#c5c5c5", // Set the color of the points
        },
      ],
    });
  }, [countryData]);

  return (
    // <div className="flex flex-col md:flex-row p-10">
    <div id="world-map" className="p-10 border border-red-500"></div>
    // </div>
  );
}

export default InteractiveMap;
