// Photos for the service pages: public/assets/img/services/<slug>/<slot>.jpg
// g1–g3 = overview gallery, c1–c6 = "What we deliver" cards (in card order).
// Sources and licence: data/service-photo-credits.md
export const SERVICE_PHOTO_ALTS: Record<string, Record<string, string>> = {
  "ibm-maximo": {
    "g1": "Engineer in a hard hat reviewing plans on site",
    "g2": "Technician working on industrial equipment",
    "g3": "Warehouse with stocked shelves",
    "c1": "Operator running industrial machinery",
    "c2": "Person working on a laptop",
    "c3": "Code on a monitor",
    "c4": "Two people mapping a workflow on a whiteboard",
    "c5": "Reports and charts on a laptop",
    "c6": "Network cabling in a data center"
  },
  "mas-migration": {
    "g1": "Modern data center with rows of server cabinets",
    "g2": "Cloud computing concept",
    "g3": "Team planning around laptops",
    "c1": "Checking items off a list",
    "c2": "Open planner on a desk",
    "c3": "Rack of servers",
    "c4": "Code on a laptop screen",
    "c5": "Network cables",
    "c6": "Server room aisle"
  },
  "enterprise-integration": {
    "g1": "Abstract network of connected points",
    "g2": "Logistics warehouse with stacked crates",
    "g3": "Team working together on laptops",
    "c1": "Reviewing purchasing documents with a calculator and laptop",
    "c2": "Code on a computer screen",
    "c3": "Fibre optic cables in a network switch",
    "c4": "Data on a computer screen",
    "c5": "Padlock on a keyboard",
    "c6": "Aerial view of a city's streets at night"
  },
  "cloud-infrastructure": {
    "g1": "Server rack with status lights",
    "g2": "Data center corridor with glass doors",
    "g3": "Cabled server rack",
    "c1": "Cloud icon with floating data charts",
    "c2": "Stacked shipping containers",
    "c3": "Internal hard drive",
    "c4": "Wall of monitoring screens",
    "c5": "Cables connected to a server",
    "c6": "Glowing security panel"
  },
  "managed-support": {
    "g1": "Support headset beside a laptop",
    "g2": "Support team working at computers",
    "g3": "Engineer working at an operations desk",
    "c1": "Support engineer wearing a headset",
    "c2": "Developer working on a laptop",
    "c3": "Monitor and laptop showing live data",
    "c4": "Technician fixing wiring",
    "c5": "Performance gauge",
    "c6": "Laptop installing an update"
  },
  "tririga": {
    "g1": "Modern office lobby with a reception desk",
    "g2": "Modern office building",
    "g3": "People reviewing architectural plans",
    "c1": "Open-plan office with rows of desks",
    "c2": "Signing a lease document",
    "c3": "Worker installing ceiling components",
    "c4": "Construction worker on a building frame",
    "c5": "Glass-walled meeting rooms",
    "c6": "Spiral staircase in a glass building"
  },
  "mobile-development": {
    "g1": "Field worker in a safety helmet",
    "g2": "Phone showing a dashboard app",
    "g3": "Engineer in a hard hat on site",
    "c1": "Technician recording work on a tablet",
    "c2": "Phone app beside a laptop",
    "c3": "Field engineer on site",
    "c4": "Filling in an inspection checklist",
    "c5": "Phone showing a navigation map",
    "c6": "Phone scanning a code"
  },
  "consulting-advisory": {
    "g1": "Strategy meeting around a laptop",
    "g2": "Consultant presenting to a team",
    "g3": "Team planning with sticky notes",
    "c1": "Two people building a project roadmap",
    "c2": "Architectural blueprints",
    "c3": "Reviewing a report over a laptop",
    "c4": "Mapping a process flowchart on a whiteboard",
    "c5": "Reviewing licence paperwork",
    "c6": "Remote team member on a video call"
  }
};

export function servicePhoto(slug: string, slot: string) {
  return { src: `/assets/img/services/${slug}/${slot}.jpg`, alt: SERVICE_PHOTO_ALTS[slug]?.[slot] ?? "" };
}
