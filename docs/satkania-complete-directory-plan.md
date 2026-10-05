# Satkania Complete Directory — Data Plan

## Goal

Build Satkania as the first fully populated directory zone before expanding to the rest of Bangladesh.

Target hierarchy:

Country → District → Upazila → Union/Paurashava → Ward → Mauza → Village/Mahalla → Locality/Market → Listing/Facility → Service/Professional → Reviews.

## Phase A — Administrative master

Authoritative baseline:
- Satkania Upazila Statistics Office / BBS
- Chattogram District administration
- LGED maps
- Union and Paurashava government portals

Current BBS baseline (2022 Census): 1 Paurashava, 17 Unions, 73 Mauzas, 84 Villages; Satkania Paurashava has 9 wards.

Never import a conflicting locality list as authoritative without reconciliation. Keep source, source URL, verification status, and last verified date.

## Phase B — Locality database

Populate:
1. 17 unions
2. Paurashava + 9 wards
3. 73 mauzas
4. 84 villages
5. Paurashava mahallas
6. Common/local area names, markets, roads and landmarks where independently verified

Each locality should support:
- Bangla name
- normalized name/slug
- type
- parent locality
- union/upazila
- ward where applicable
- latitude/longitude when verified
- source
- verification status
- last verified date
- aliases

## Phase C — Directory categories

Priority order:
1. Health
2. Education
3. Government/public services
4. Markets and businesses
5. Banks/financial services
6. Transport
7. Religious/social institutions
8. Emergency services
9. Skilled service providers
10. Food/hotels
11. Courier and other local services
12. Places/landmarks

## Phase D — Health directory

Health facilities:
- Upazila Health Complex
- Union Health & Family Welfare Centres
- Union Health Centres/Sub-centres
- Community Clinics
- Private hospitals/clinics
- Diagnostic centres
- Blood banks
- Pharmacies
- Ambulance services

Primary health source: DGHS Facility Registry. Cross-check private and local entries against official records and current facility sources.

Doctor profile:
- name
- qualification
- specialty
- BMDC registration number when publicly verifiable
- verified specialty/registration status
- services/conditions treated
- phone/appointment channel when legitimately published

Doctor chamber:
- facility/listing
- exact location
- days
- start/end time
- appointment number
- fee when reliably published
- last verified date

A doctor may have multiple chambers. Chamber records must therefore be separate from the doctor record.

## Phase E — Listings

Every listing should support:
- name
- category/subcategory
- locality hierarchy
- address
- phone/email
- description
- services
- opening hours
- coordinates
- photos
- source(s)
- verification status
- owner/claim status
- moderation status

Do not fabricate missing phone numbers, hours, fees, coordinates, doctors, services or reviews.

## Phase F — Reviews and trust

User reviews:
- 1–5 rating
- written review
- moderation status
- report review
- one active review per user per target
- admin moderation
- future verified-visit/verified-interaction badge

Health reviews must describe user experience, not be treated as medical advice or clinical outcome guarantees.

## Phase G — Data quality

Verification levels:
- OFFICIAL — directly supported by a government/official registry
- VERIFIED — cross-checked by multiple reliable sources
- COMMUNITY — submitted by users and awaiting verification
- UNVERIFIED — discovered but not yet confirmed
- ARCHIVED — no longer confirmed/current

Every imported record should retain provenance and a last-verified timestamp.

## Phase H — Import workflow

Source discovery → normalize → deduplicate → geocode → map locality → assign category → verify → import as pending → admin approval → publish.

Bulk imports must be idempotent and must not create duplicate listings.

## Phase I — User experience

Search examples:
- “সাতকানিয়ায় শিশু ডাক্তার”
- “কেঁওচিয়ায় হাসপাতাল”
- “আজ কোন ডাক্তার কোথায় বসেন”
- “ছদাহায় ফার্মেসি”
- “আমার এলাকার কাছাকাছি ডায়াগনস্টিক”

Listing page should expose:
- location
- services
- contact
- opening/chamber schedule
- map
- verification badge
- reviews
- report/correction option

## Phase J — Expansion

Only after Satkania reaches a strong verified-data baseline, reuse the same pipeline for:
Chattogram district → Chattogram division → Bangladesh.

## Data-source policy

Priority:
1. Government registries/portals
2. Official institution websites/pages
3. Professional registries
4. Reliable current business sources
5. User submissions

Search-engine snippets and social posts are discovery aids, not sufficient proof for high-trust fields.

## Safety

Do not expose private personal information. For doctors and other professionals, only publish professional information that is legitimately public and relevant to the directory.

Do not present user reviews as verified facts unless independently verified.
