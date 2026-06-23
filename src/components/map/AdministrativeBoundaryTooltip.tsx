import { MapboxGeoJSONFeature } from "mapbox-gl";

export interface AdminBoundaryRow {
  label: string;
  value: string | null | undefined;
  colour: string;
}

interface Props {
  rows: AdminBoundaryRow[];
}

export const ADMIN_BOUNDARY_LAYER_IDS = [
  "wards-cu4dni",
  "county-4ef4ik",
  "westminster_const_region-8r33ph",
  "district_borough_unitary_regi-bquzqt",
  "greater_london_const_region-aplvbp",
  "scotland_and_wales-8wahad",
  "parish_1-bcfcla",
  "parish_2-c6mbmy",
  "parish_3-chtvqw",
  "parish_4-cwfy3j",
];

// Invisible fill layers used to detect the boundaries between the administrative regions
export const ADMIN_BOUNDARY_FILL_LAYER_IDS = ADMIN_BOUNDARY_LAYER_IDS.map(
  (id) => `${id}-fill`,
);


export const getAdminBoundaryRows = (
  features: MapboxGeoJSONFeature[],
  landDataLayers: string[],
) => {
  const getName = (prefix: string) =>
    features.find((f) => f.layer?.id.startsWith(prefix))?.properties?.NAME ?? null;

  let ward, parish, localCouncil, county, parliamentaryConstituencies, devolvedPowers;

  for (const layerId of landDataLayers) {
    if (layerId.startsWith("wards-")) ward = getName("wards-");
    else if (layerId.startsWith("parish")) parish = getName("parish_1-") ?? getName("parish_2-") ?? getName("parish_3-") ?? getName("parish_4-");
    else if (layerId.startsWith("district_borough")) localCouncil = getName("district_borough");
    else if (layerId.startsWith("county")) county = getName("county");
    else if (layerId.startsWith("westminster")) parliamentaryConstituencies = getName("westminster");
    else if (layerId.startsWith("devolved-powers")) devolvedPowers = getName("devolved-powers");
  }

  return [
    { label: "Ward", value: ward, colour: "hsl(245, 100%, 50%)" },
    { label: "Parish", value: parish, colour: "hsl(280,60%,70%)" },
    { label: "Local Councils", value: localCouncil, colour: "hsl(56, 97%, 50%)" },
    { label: "Parliamentary Constituencies", value: parliamentaryConstituencies, colour: "hsl(183, 97%, 50%)" },
    { label: "Devolved Powers", value: devolvedPowers, colour: "hsl(320,97%,50%)" },
    { label: "County", value: county, colour: "hsla(113, 97%, 50%, 0.4)" },
  ].filter((r) => r.value);
};

const AdministrativeBoundaryTooltip = ({ rows }: Props) => {
  if (rows.length === 0) {
    return;
  }

  return (
    <>
    <div className="admin-boundary-header">
      Administrative boundaries
      </div>
    <div className="admin-boundary-divider"></div>
      {rows.map((r) => (
        <div className="admin-boundary-item" key={r.label}>
          <div className="admin-boundary-item-header">{r.label}</div>
          
          <div className="admin-boundary-item-content">
            <div>{r.value}</div>
            <div className="admin-boundary-item-colour" style={{backgroundColor: r.colour}}/>
          </div>
        </div>
      ))}
    </>
  );
};

export default AdministrativeBoundaryTooltip;
