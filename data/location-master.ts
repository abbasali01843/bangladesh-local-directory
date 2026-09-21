import { districts } from "./districts";

export type LocationOption = { id:string; name:string; districtId:string; districtName:string };

// Verified master counts/source: Bangladesh National Portal currently lists 64 districts,
// 499 upazilas and 4,568 unions. Full administrative names should be imported from
// the official dataset before production seed; do not invent missing names.
export const locationStats = { districts: 64, upazilas: 499, unions: 4568 };

export function getDistrict(id:string){ return districts.find(d=>d.id===id); }
export function normalizeLocationQuery(value:string){ return value.trim().toLocaleLowerCase("bn-BD"); }
