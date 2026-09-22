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
    note: "Public CSV/XLSX resources are available and can be normalized into directory listings.",
  },
];
