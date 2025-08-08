const layers = {
  "provisional-agricultural-land-ab795l": {
    name: "Agricultural land classification",
    data: {
      "Grade 1": "#3980d0",
      "Grade 2": "#10c3ef",
      "Grade 3": "#0fb08f",
      "Grade 4": "#f9f90d",
      "Grade 5": "#c9748e",
      Exclusion: "#b2b2b2",
      "Non Agricultural": "#b2b2b2",
      Urban: "#b2b2b2",
    },
  },
  "national-forest-estate-soil-g-18j2ga": {
    name: "National forest estate soils",
    data: {
      "Basin Bog": "#b2b2b2",
      "Brown Earth": "#895c44",
      "Calcareous Soil": "#4de600",
      "Eroded Bog": "#9c9c9c",
      "Flat or Raised Bogs": "#686868",
      "Flushed Blanket Bog": "#333333",
      "Ground-water Gley": "#014ea6",
      "Ironpan Soil": "#fc5601",
      "Littoral Soil": "#fefe67",
      "Man-made Soil": "#ab00e5",
      "Peaty Surface-water Gley": "#0085a8",
      Podzol: "#e60002",
      "Skeletal Soil": "#e7e600",
      "Surface-water Gley": "#00a8e7",
      "Unflushed Blanket Bog": "#010101",
      "Valley Complex": "#8d8ead",
    },
  },
  "historic-flood-map-5y05ao": {
    name: "Historic flood map",
    data: {
      Flood: "hsl(196, 80%, 70%)",
    },
  },
  "sites-of-special-scientific-i-09kaq4": {
    name: "Sites of scientific interest",
    data: {
      "Site of Interest": "hsl(1, 40%, 40%)",
    },
  },
  "special-protection-areas-engl-71pdjg": {
    name: "Special protection areas",
    data: {
      "Protection Area": "hsl(51, 40%, 40%)",
    },
  },
  "special-areas-of-conservation-bm41zr": {
    name: "Special areas of conservation",
    data: {
      "Conservation Area": "hsl(101, 40%, 40%)",
    },
  },
  "ncc-brownfield-sites": {
    name: "Brownfield",
    data: {
      Brownfield: "hsla(0, 24%, 20%, 0.5)",
    },
  },
  "local-authority-greenbelt-bou-9r44t6": {
    name: "Greenbelt",
    data: {
      Greenbelt: "hsla(113, 97%, 50%, 0.4)",
    },
  },
  "wards-cu4dni": {
    name: "Wards",
    data: {
      Wards: "hsl(245, 100%, 50%)",
    },
  },
  "county-4ef4ik": {
    name: "Counties",
    data: {
      Counties: "hsla(113, 97%, 50%, 0.4)",
    },
  },
  "westminster_const_region-8r33ph": {
    name: "Westminster Constituencies",
    data: {
      Constituencies: "hsl(183, 97%, 50%)",
    },
  },
  "district_borough_unitary_regi-bquzqt": {
    name: "Councils",
    data: {
      Councils: "hsl(56, 97%, 50%)",
    },
  },
  parish: {
    name: "Parishes",
    data: {
      Parish: "hsl(280,60%,70%)",
    },
  },
  "devolved-powers": {
    name: "Devolved Powers",
    data: {
      "Devolved Powers": "hsl(320,97%,50%)",
    },
  },
  all: {
    name: "Land Ownership",
    data: {
      "Company owned": {
        fill: "#BE4A9766",
        border: "#BE4A97",
      },
      "Privately owned": {
        fill: "#39ABB366",
        border: "#39ABB3",
      },
    },
    hasBorder: true,
  },
  pending: {
    name: "Land Ownership",
    data: {
      "Pending (accepted)": {
        fill: "#BE4A9766",
        border: "#BE4A97",
      },
      "Pending (rejected)": {
        fill: "#39ABB366",
        border: "#39ABB3",
      },
    },
  },
  localAuthority: {
    name: "Land Ownership",
    data: {
      "Local Authority": {
        fill: "#BE4A9766",
        border: "#BE4A97",
      },
    },
  },
  churchOfEngland: {
    name: "Land Ownership",
    data: {
      "Church of England": {
        fill: "#BE4A9766",
        border: "#BE4A97",
      },
    },
  },
  unregistered: {
    name: "Land Ownership",
    data: {
      "Unregistered Land": {
        fill: "#B8580066",
        border: "#B85800",
      },
    },
  },
  highlightedProperty: {
    name: "Selected Properties",
    data: {
      "Selected Property": { fill: "#24467366", border: "#24467366" },
      "Active Property": {
        fill: "#24467399",
        border: "#24467399",
        borderStyle: "dashed",
      },
    },
  },
};

export default layers;