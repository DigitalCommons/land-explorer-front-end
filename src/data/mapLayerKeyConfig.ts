const layers = {
  "provisional-agricultural-land-ab795l": {
    name: "Agricultural land classification",
    data: {
      "Grade 1": {
        fill: "hsla(211.79, 61.63%, 51.96%, 0.4)",
        border: "hsla(211.79, 61.63%, 51.96%, 0.7)",
      },
      "Grade 2": {
        fill: "hsla(191.84, 87.45%, 50%, 0.4)",
        border: "hsla(191.84, 87.45%, 50%, 0.7)",
      },
      "Grade 3": {
        fill: "hsla(167.7, 84.29%, 37.45%, 0.4)",
        border: "hsla(167.7, 84.29%, 37.45%, 0.7)",
      },
      "Grade 4": {
        fill: "hsla(60, 95.16%, 51.37%, 0.4)",
        border: "hsla(60, 95.16%, 51.37%, 0.7)",
      },
      "Grade 5": {
        fill: "hsla(341.65, 44.04%, 62.16%, 0.4)",
        border: "hsla(341.65, 44.04%, 62.16%, 0.7)",
      },
      Exclusion: {
        fill: "hsla(0, 0%, 69.8%, 0.4)",
        border: "hsla(0, 0%, 69.8%, 0.7)",
      },
      "Non Agricultural": {
        fill: "hsla(0, 0%, 70%, 0.4)",
        border: "hsla(0, 0%, 70%, 0.7)",
      },
      Urban: {
        fill: "hsla(0, 0%, 70%, 0.4)",
        border: "hsla(0, 0%, 70%, 0.7)",
      },
    },
  },
  "national-forest-estate-soil-g-18j2ga": {
    name: "National forest estate soils",
    data: {
      "Basin Bog": {
        fill: "hsla(0, 0%, 69.8%, 0.4)",
        border: "hsla(0, 0%, 69.8%, 0.7)",
      },
      "Brown Earth": {
        fill: "hsla(20.87, 33.66%, 40.2%, 0.4)",
        border: "hsla(20.87, 33.66%, 40.2%, 0.7)",
      },
      "Calcareous Soil": {
        fill: "hsla(99.91, 100%, 45.1%, 0.4)",
        border: "hsla(99.91, 100%, 45.1%, 0.7)",
      },
      "Eroded Bog": {
        fill: "hsla(0, 0%, 61.18%, 0.4)",
        border: "hsla(0, 0%, 61.18%, 0.7)",
      },
      "Flat or Raised Bogs": {
        fill: "hsla(0, 0%, 40.78%, 0.4)",
        border: "hsla(0, 0%, 40.78%, 0.7)",
      },
      "Flushed Blanket Bog": {
        fill: "hsla(0, 0%, 20%, 0.4)",
        border: "hsla(0, 0%, 20%, 0.7)",
      },
      "Ground-water Gley": {
        fill: "hsla(212, 98.8%, 32.75%, 0.4)",
        border: "hsla(212, 98.8%, 32.75%, 0.7)",
      },
      "Ironpan Soil": {
        fill: "hsla(20.32, 99.21%, 49.61%, 0.4)",
        border: "hsla(20.32, 99.21%, 49.61%, 0.7)",
      },
      "Littoral Soil": {
        fill: "hsla(60, 98.69%, 70%, 0.4)",
        border: "hsla(60, 98.69%, 70%, 0.7)",
      },
      "Man-made Soil": {
        fill: "hsla(284.8, 100%, 44.9%, 0.4)",
        border: "hsla(284.8, 100%, 44.9%, 0.7)",
      },
      "Peaty Surface-water Gley": {
        fill: "hsla(192.5, 100%, 32.94%, 0.4)",
        border: "hsla(192.5, 100%, 32.94%, 0.7)",
      },
      Podzol: {
        fill: "hsla(359.48, 100%, 45.1%, 0.4)",
        border: "hsla(359.48, 100%, 45.1%, 0.7)",
      },
      "Skeletal Soil": {
        fill: "hsla(59.74, 100%, 45.29%, 0.4)",
        border: "hsla(59.74, 100%, 45.29%, 0.7)",
      },
      "Surface-water Gley": {
        fill: "hsla(196.36, 100%, 45.29%, 0.4)",
        border: "hsla(196.36, 100%, 45.29%, 0.7)",
      },
      "Unflushed Blanket Bog": {
        fill: "hsla(0, 0%, 0.39%, 0.4)",
        border: "hsla(0, 0%, 0.39%, 0.7)",
      },
      "Valley Complex": {
        fill: "hsla(238.13, 16.33%, 61.57%, 0.4)",
        border: "hsla(238.13, 16.33%, 61.57%, 0.7)",
      },
    },
  },
  "historic-flood-map-5y05ao": {
    name: "Historic flood map",
    data: {
      Flood: {
        fill: "hsla(196, 80%, 70%, 0.4)",
        border: "hsla(196, 80%, 70%, 0.7)",
      },
    },
  },
  "flood-risk-zone": {
    name: "Flood risk zones",
    data: {
      "Zone 1 (low)": {
        fill: "hsla(47.14, 89.53%, 66.27%, 0.4)",
        border: "hsla(47.14, 89.53%, 66.27%, 0.7)",
      },
      "Zone 2 (medium)": {
        fill: "hsla(29.85, 88.44%, 55.88%, 0.4)", //"#F5CDA3",
        border: "hsla(29.85, 88.44%, 55.88%, 0.7)", //"#F5CDA3",
      },
      "Zone 3 (high)": {
        fill: "hsla(13.92, 99.21%, 49.41%, 0.4)",
        border: "hsla(13.92, 99.21%, 49.41%, 0.7)",
      },
    },
  },
  "sites-of-special-scientific-i-09kaq4": {
    name: "Sites of scientific interest",
    data: {
      "Site of Interest": {
        fill: "hsla(1, 40%, 40%, 0.4)",
        border: "hsla(1, 40%, 40%, 1)",
      },
    },
  },
  "special-protection-areas-engl-71pdjg": {
    name: "Special protection areas",
    data: {
      "Protection Area": {
        fill: "hsla(51, 40%, 40%, 0.4)",
        border: "hsla(51, 40%, 40%, 0.7)",
      },
    },
  },
  "special-areas-of-conservation-bm41zr": {
    name: "Special areas of conservation",
    data: {
      "Conservation Area": {
        fill: "hsla(101, 40%, 40%, 0.4)",
        border: "hsla(101, 40%, 40%, 0.7)",
      },
    },
  },
  "ncc-brownfield-sites": {
    name: "Brownfield",
    data: {
      Brownfield: {
        fill: "hsla(0, 24%, 20%, 0.4)",
        border: "hsla(0, 24%, 20%, 0.7)",
      },
    },
  },
  "local-authority-greenbelt-bou-9r44t6": {
    name: "Greenbelt",
    data: {
      Greenbelt: {
        fill: "hsla(113, 97%, 50%, 0.4)",
        border: "hsla(113, 97%, 50%, 0.7)",
      },
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
  socialHousing: {
    name: "Social Housing",
    data: {
      "Social Housing": {
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
