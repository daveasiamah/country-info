import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";

import { colorScale, countries } from "./Countries";
import { useCountryData } from "@/app/hooks/useCountryData";
function InteractiveMap() {
  const { countryData, updateCountryData } = useCountryData();

  const handleRegionTipShow = (event, label, code) => {
    const countryName =
      countryData.find((country) => country.code === code)?.name || "";
    return label.html(`
      <div style="background-color: #010101; border-radius: 6px; min-height: 50px; width: 125px; color: white; padding-left: 10px;">
        <p>
          <b>${label.html()}</b>
        </p>
        <p>${countryName}</p>
      </div>
    `);
  };

  const handleMarkerTipShow = (event, label, code) => {
    const countryName =
      countryData.find((country) => country.code === code)?.name || "";
    return label.html(`
      <div style="background-color: white; border-radius: 6px; min-height: 50px; width: 125px; color: black !important; padding-left: 10px;">
        <p style="color: black !important;">
          <b>${label.html()}</b>
        </p>
        <p>${countryName}</p>
      </div>
    `);
  };

  return (
    <div style={{ margin: "auto", width: "700px", height: "600px" }}>
      <VectorMap
        map={worldMill}
        containerStyle={{
          width: "700px",
          height: "600px",
        }}
        backgroundColor="#b7c0c9"
        series={{
          regions: [
            {
              scale: colorScale,
              values: countries,
              min: 0,
              max: 100,
            },
          ],
        }}
        // onRegionTipShow={function reginalTip(event, label, code) {
        //   return label.html(`
        //     <div style="background-color: #010101; border-radius: 6px; min-height: 50px; width: 125px; color: white"; padding-left: 10px>
        //       <p>
        //         <b>
        //         ${label.html()}
        //         </b>
        //       </p>
        //       <p>
        //         ${countries[code]}
        //       </p>
        //     </div>`);
        // }}
        // onMarkerTipShow={function markerTip(event, label, code) {
        //   return label.html(`
        //     <div style="background-color: white; border-radius: 6px; min-height: 50px; width: 125px; color: black !important; padding-left: 10px>
        //       <p style="color: black !important;">
        //         <b>
        //         ${label.html()}
        //         </b>
        //       </p>
        //     </div>`);
        // }}

        onRegionTipShow={handleRegionTipShow}
        onMarkerTipShow={handleMarkerTipShow}

        // onRegionClick={handleMapClick}
      />
    </div>
  );
}

export default InteractiveMap;
