export type DataSource = {
  id: string;
  title: string;
  publisher: string;
  url: string;
  coverage: string;
  status: "verified-source" | "import-pending";
  note: string;
};

export const dataSources: DataSource[] = [
  {
    id: "national-location",
    title: "Bangladesh National Portal — Location hierarchy",
    publisher: "Bangladesh National Portal",
    url: "https://bangladesh.gov.bd/views/union-list",
    coverage: "Division → District → Upazila → Union",
    status: "verified-source",
    note: "Current portal reports 8 divisions, 64 districts, 499 upazilas and 4,568 unions.",
  },
  {
    id: "education-institute-basic",
    title: "Institute Basic Information",
    publisher: "BANBEIS / Bangladesh Open Data",
    url: "https://data.gov.bd/dataset/institute-basic-information",
    coverage: "Bangladesh-wide educational institutions",
    status: "import-pending",
    note: "Public dataset with institute name, address, type, establishment and location fields. The published dataset is from 2017–2018, so records must be treated as source data and not assumed current without verification.",
  },
  {
    id: "education-school-college",
    title: "School-and-College",
    publisher: "Bangladesh Open Data",
    url: "https://data.gov.bd/dataset/school-and-college",
    coverage: "Bangladesh-wide school and college information",
    status: "import-pending",
    note: "Public CSV/XLSX resources are available; the catalog page is dated 2016–2017, so records require freshness checks before being presented as current.",
  },
  {
    id: "education-districtwise-contact",
    title: "Districtwise School and College and Contact Number",
    publisher: "Bangladesh Open Data",
    url: "https://data.gov.bd/dataset/districtwise-school-and-college-and-contact-number",
    coverage: "District-wise school and college contact information",
    status: "import-pending",
    note: "CSV/XLSX resources are available; catalog metadata was last modified in 2017, so imported records need freshness verification.",
  },
  {
    id: "health-doctor-directory",
    title: "Doctor Directory",
    publisher: "Bangladesh Open Data",
    url: "https://data.gov.bd/bn/dataset/doctor-directory",
    coverage: "Bangladesh-wide doctor directory",
    status: "import-pending",
    note: "Public XLS/CSV resources are available; catalog metadata dates to 2017, so records must not be assumed current without verification.",
  },
  {
    id: "education-secondary-institute",
    title: "Basic Information of Institute at Secondary Level with Number of Teachers & Student",
    publisher: "BANBEIS / Bangladesh Open Data",
    url: "https://data.gov.bd/dataset/basic-information-institute-secondary-level-number-teachers-student",
    coverage: "Bangladesh-wide secondary institutions with Division, District, Upazila, Union, EIIN and contact fields",
    status: "import-pending",
    note: "Public annual dataset modified 2018-04-02; useful for structured location matching but must be freshness-checked.",
  },
  {
    id: "education-institutional-information",
    title: "Institutional Information of Bangladesh",
    publisher: "Bangladesh Open Data",
    url: "https://data.gov.bd/institutional-information-of-bangladesh",
    coverage: "Institution name, type, division, district and thana-wise institution data",
    status: "import-pending",
    note: "Public dataset modified 2018-02-05; use as historical/source data until independently verified.",
  },
  {
    id: "health-hospital-clinic",
    title: "Hospital Clinic",
    publisher: "Bangladesh Open Data",
    url: "https://data.gov.bd/dataset/hospital-clinic",
    coverage: "Hospital and clinic records",
    status: "import-pending",
    note: "Public CSV resource is available under a Creative Commons Attribution license; catalog metadata dates to 2017.",
  },
];
