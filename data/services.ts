export interface Service {
  slug: string;
  name: string;
  short: string;
  icon: string;
  nav: string;
  h1: string;
  sub: string;
  ov_title: string;
  ov_body: string;
  highlights: string[];
  works: string[];
  engage: string[];
  caps: [string, string, string][];
  steps: [string, string][];
  related: string[];
}

export interface Product {
  name: string;
  href: string | null;
  icon: string;
  desc: string;
}

export const ICONS: Record<string, string> = {
  "wrench": "<path d=\"M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z\"/>",
  "migrate": "<path d=\"M4 14.9A7 7 0 1 1 15.7 8h1.8a4.5 4.5 0 0 1 2.5 8.2\"/><path d=\"M12 12v9\"/><path d=\"m16 16-4-4-4 4\"/>",
  "link": "<path d=\"M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7\"/><path d=\"M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7\"/>",
  "cloud": "<path d=\"M17.5 19H9a7 7 0 1 1 6.7-9h1.8a4.5 4.5 0 1 1 0 9z\"/>",
  "headset": "<path d=\"M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3\"/>",
  "building": "<rect x=\"4\" y=\"2\" width=\"16\" height=\"20\" rx=\"2\"/><path d=\"M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01\"/>",
  "mobile": "<rect x=\"6\" y=\"2\" width=\"12\" height=\"20\" rx=\"2.5\"/><path d=\"M11 18h2\"/>",
  "bulb": "<path d=\"M9 18h6M10 22h4\"/><path d=\"M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2z\"/>",
  "bus": "<rect x=\"4\" y=\"3\" width=\"16\" height=\"15\" rx=\"2\"/><path d=\"M4 11h16M8 18v3M16 18v3M8 14.5h.01M16 14.5h.01\"/>",
  "sparkle": "<path d=\"M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z\"/><path d=\"M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z\"/>",
  "chart": "<path d=\"M3 3v18h18\"/><path d=\"m7 15 4-4 3 3 5-6\"/>",
  "code": "<path d=\"m8 8-4 4 4 4M16 8l4 4-4 4M14 4l-4 16\"/>",
  "shield": "<path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z\"/><path d=\"m9 12 2 2 4-4\"/>",
  "database": "<ellipse cx=\"12\" cy=\"5\" rx=\"8\" ry=\"3\"/><path d=\"M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5\"/><path d=\"M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3\"/>",
  "flow": "<rect x=\"3\" y=\"3\" width=\"6\" height=\"6\" rx=\"1.5\"/><rect x=\"15\" y=\"15\" width=\"6\" height=\"6\" rx=\"1.5\"/><path d=\"M6 9v4a2 2 0 0 0 2 2h7\"/>",
  "pin": "<path d=\"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z\"/><circle cx=\"12\" cy=\"10\" r=\"3\"/>",
  "lock": "<rect x=\"4\" y=\"11\" width=\"16\" height=\"10\" rx=\"2\"/><path d=\"M8 11V7a4 4 0 0 1 8 0v4\"/>",
  "pulse": "<path d=\"M3 12h4l3-8 4 16 3-8h4\"/>",
  "layers": "<path d=\"m12 2 10 5-10 5L2 7z\"/><path d=\"m2 12 10 5 10-5M2 17l10 5 10-5\"/>",
  "refresh": "<path d=\"M21 12a9 9 0 1 1-2.6-6.4L21 8\"/><path d=\"M21 3v5h-5\"/>",
  "users": "<circle cx=\"9\" cy=\"8\" r=\"3.5\"/><path d=\"M2.5 20a6.5 6.5 0 0 1 13 0\"/><path d=\"M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6\"/>",
  "clipboard": "<rect x=\"5\" y=\"4\" width=\"14\" height=\"18\" rx=\"2\"/><path d=\"M9 4V2.5h6V4\"/><path d=\"m9 13 2 2 4-4\"/>",
  "doc": "<path d=\"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z\"/><path d=\"M14 2v6h6M8 13h8M8 17h5\"/>",
  "floor": "<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/><path d=\"M3 10h18M10 10v11\"/>",
  "scan": "<path d=\"M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2M7 8v8M11 8v8M14 8v8M17 8v8\"/>",
  "offline": "<path d=\"M2 2l20 20\"/><path d=\"M8.5 16.4a5 5 0 0 1 7 0M5 12.9a10 10 0 0 1 4.2-2.6M14.8 10.3A10 10 0 0 1 19 12.9M2 8.8a15 15 0 0 1 4.2-2.7M10.7 5.1A15 15 0 0 1 22 8.8\"/><path d=\"M12 20h.01\"/>",
  "target": "<circle cx=\"12\" cy=\"12\" r=\"9\"/><circle cx=\"12\" cy=\"12\" r=\"5\"/><circle cx=\"12\" cy=\"12\" r=\"1\"/>",
  "search": "<circle cx=\"11\" cy=\"11\" r=\"7\"/><path d=\"m21 21-4.3-4.3\"/>",
  "server": "<rect x=\"3\" y=\"3\" width=\"18\" height=\"7\" rx=\"2\"/><rect x=\"3\" y=\"14\" width=\"18\" height=\"7\" rx=\"2\"/><path d=\"M7 6.5h.01M7 17.5h.01\"/>",
  "gauge": "<path d=\"M12 14l4-4\"/><path d=\"M3.3 19a10 10 0 1 1 17.4 0\"/>",
  "calendar": "<rect x=\"3\" y=\"4\" width=\"18\" height=\"18\" rx=\"2\"/><path d=\"M16 2v4M8 2v4M3 10h18\"/>",
  "box": "<path d=\"m21 8-9-5-9 5 9 5z\"/><path d=\"M3 8v8l9 5 9-5V8M12 13v8\"/>",
  "external": "<path d=\"M14 4h6v6M20 4l-9 9\"/><path d=\"M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5\"/>"
};

export const SERVICES: Service[] = [
  {
    "slug": "ibm-maximo",
    "name": "IBM Maximo Services",
    "short": "IBM Maximo",
    "icon": "wrench",
    "nav": "Implementation, upgrades, scripting and support",
    "h1": "IBM Maximo,<br>set up to run your assets",
    "sub": "Implementation, configuration, upgrades, automation scripting and integrations for IBM Maximo, delivered by certified consultants.",
    "ov_title": "One system of record<br>for every asset",
    "ov_body": "IBM Maximo holds your assets, work orders, inventory and maintenance history in one place. We configure it around how your teams already work, then keep it fast and dependable as you grow.",
    "highlights": [
      "New implementations and re-implementations",
      "Upgrades without losing your customisations",
      "Automation scripts instead of fragile Java code",
      "Reports and KPIs your managers actually use"
    ],
    "works": [
      "Maximo Manage",
      "Maximo Health",
      "Maximo Monitor",
      "Maximo Predict",
      "Maximo Spatial",
      "BIRT",
      "Db2",
      "Oracle",
      "SQL Server"
    ],
    "engage": [
      "New Maximo rollout",
      "Upgrade or re-platform",
      "Ongoing enhancements"
    ],
    "caps": [
      [
        "wrench",
        "Implementation & configuration",
        "Asset hierarchies, locations, work management, inventory and purchasing set up for your operation."
      ],
      [
        "refresh",
        "Upgrades",
        "Version upgrades planned and rehearsed, with customisations reviewed and carried forward."
      ],
      [
        "code",
        "Automation scripting",
        "Business rules written as Maximo automation scripts, easier to maintain than custom Java."
      ],
      [
        "flow",
        "Workflows & applications",
        "Approval workflows, escalations, Application Designer screens and Start Centers."
      ],
      [
        "chart",
        "Reporting & KPIs",
        "BIRT reports, KPIs and dashboards for maintenance, cost and reliability."
      ],
      [
        "database",
        "Data migration & loading",
        "Clean, validated loads of assets, locations, PMs and history from legacy systems."
      ]
    ],
    "steps": [
      [
        "Assess",
        "We review your processes, data and current setup to agree scope and priorities."
      ],
      [
        "Design",
        "We map requirements to Maximo applications, workflows and integrations."
      ],
      [
        "Build & test",
        "We configure, script and load data in sprints, with your users testing as we go."
      ],
      [
        "Go live & support",
        "We train your teams, run cutover and stay on for hypercare."
      ]
    ],
    "related": [
      "mas-migration",
      "enterprise-integration",
      "managed-support"
    ]
  },
  {
    "slug": "mas-migration",
    "name": "MAS Migration",
    "short": "MAS Migration",
    "icon": "migrate",
    "nav": "Move from Maximo 7.6 to Maximo Application Suite",
    "h1": "Move to Maximo<br>Application Suite with confidence",
    "sub": "A planned, rehearsed migration from Maximo 7.6 to IBM Maximo Application Suite (MAS), on the cloud or platform you choose.",
    "ov_title": "Maximo 7.6 is behind you.<br>MAS is next.",
    "ov_body": "IBM base support for Maximo 7.6.1 ended in September 2025. MAS brings Maximo Manage together with Health, Monitor, Predict and Mobile on Red Hat OpenShift, licensed with AppPoints. We plan the move so your operations keep running throughout.",
    "highlights": [
      "Readiness assessment of customisations and integrations",
      "AppPoints licensing planned up front",
      "Full rehearsal in a non-production environment",
      "Cutover plan with rollback and hypercare"
    ],
    "works": [
      "MAS 9",
      "Maximo Manage",
      "Red Hat OpenShift",
      "AWS",
      "Azure",
      "IBM Cloud",
      "Db2",
      "Kafka"
    ],
    "engage": [
      "Migration readiness assessment",
      "End-to-end MAS migration",
      "MAS upgrade (8.x to 9.x)"
    ],
    "caps": [
      [
        "search",
        "Readiness assessment",
        "An inventory of customisations, integrations, reports and licences, with effort and risk for each."
      ],
      [
        "calendar",
        "AppPoints planning",
        "Map your current users and modules to the AppPoints model, so there are no licensing surprises."
      ],
      [
        "layers",
        "OpenShift platform setup",
        "Install and configure MAS on OpenShift, on-premises or on AWS, Azure or IBM Cloud."
      ],
      [
        "code",
        "Customisation rework",
        "Java customisations rewritten as automation scripts, and outdated changes retired."
      ],
      [
        "link",
        "Integration modernisation",
        "Move legacy interfaces to REST APIs and Kafka, and update security to API keys and OAuth."
      ],
      [
        "database",
        "Data migration & cutover",
        "Database upgrade, validation and a timed cutover with a tested rollback plan."
      ]
    ],
    "steps": [
      [
        "Assess",
        "We audit your Maximo 7.6 estate and produce a migration plan with timelines and costs."
      ],
      [
        "Prepare",
        "We stand up OpenShift and MAS, and rework customisations and integrations."
      ],
      [
        "Rehearse",
        "We run the full migration in a test environment and fix what we find."
      ],
      [
        "Cut over",
        "We migrate production in a planned window, then support users through hypercare."
      ]
    ],
    "related": [
      "ibm-maximo",
      "cloud-infrastructure",
      "consulting-advisory"
    ]
  },
  {
    "slug": "enterprise-integration",
    "name": "Enterprise Integration",
    "short": "Integration",
    "icon": "link",
    "nav": "Connect Maximo with SAP, Oracle and more",
    "h1": "Connect Maximo to<br>the rest of your business",
    "sub": "Reliable integrations between Maximo and your ERP, finance, identity, GIS and IoT systems, so data is entered once and stays in sync.",
    "ov_title": "Enter data once.<br>Trust it everywhere.",
    "ov_body": "When maintenance, purchasing and finance run in separate systems, teams re-key data and lose time reconciling it. We build integrations on the Maximo Integration Framework and modern APIs that are monitored, documented and easy to change.",
    "highlights": [
      "ERP integration for purchasing, inventory and finance",
      "REST APIs and event-driven messaging",
      "Single sign-on with Azure AD / Entra ID",
      "Error handling and monitoring built in"
    ],
    "works": [
      "SAP",
      "Oracle",
      "REST / JSON",
      "Maximo Integration Framework",
      "Kafka",
      "IBM App Connect",
      "Azure AD",
      "Esri ArcGIS"
    ],
    "engage": [
      "Single interface build",
      "Integration programme",
      "Integration health check"
    ],
    "caps": [
      [
        "box",
        "ERP integration",
        "Purchase orders, receipts, inventory, GL and cost data exchanged with SAP or Oracle."
      ],
      [
        "code",
        "REST & API development",
        "Object structures, publish channels and REST APIs built on the Maximo Integration Framework."
      ],
      [
        "flow",
        "Middleware & messaging",
        "Event-driven flows with Kafka, JMS or your existing middleware."
      ],
      [
        "refresh",
        "Data sync & master data",
        "Assets, locations, vendors and employees kept consistent across systems."
      ],
      [
        "lock",
        "Identity & single sign-on",
        "Azure AD / Entra ID, LDAP and SAML sign-on, with role-based access."
      ],
      [
        "pin",
        "GIS & IoT feeds",
        "Esri maps, sensor readings and telematics brought into Maximo."
      ]
    ],
    "steps": [
      [
        "Map",
        "We document each system, data object and business event that needs to flow."
      ],
      [
        "Design",
        "We choose the pattern (API, messaging or batch) and define error handling."
      ],
      [
        "Build & test",
        "We build, then test with real data volumes and failure scenarios."
      ],
      [
        "Monitor",
        "We hand over with monitoring, alerts and clear runbooks."
      ]
    ],
    "related": [
      "ibm-maximo",
      "cloud-infrastructure",
      "mobile-development"
    ]
  },
  {
    "slug": "cloud-infrastructure",
    "name": "Cloud & Infrastructure",
    "short": "Cloud & Infra",
    "icon": "cloud",
    "nav": "AWS, Azure, OpenShift, backup and monitoring",
    "h1": "Cloud and infrastructure<br>that stays up",
    "sub": "Deployment, administration, backup and monitoring for your enterprise applications on AWS, Azure and Red Hat OpenShift.",
    "ov_title": "The platform under<br>your operations",
    "ov_body": "Asset management systems are only as reliable as the infrastructure they run on. We design, deploy and run that infrastructure, and keep it patched, backed up and watched around the clock.",
    "highlights": [
      "AWS and Azure deployments built to best practice",
      "Red Hat OpenShift for MAS and containers",
      "Tested backup and disaster recovery",
      "24/7 monitoring and alerting"
    ],
    "works": [
      "AWS",
      "Microsoft Azure",
      "Red Hat OpenShift",
      "VMware",
      "Linux",
      "Windows Server",
      "Terraform",
      "Prometheus / Grafana"
    ],
    "engage": [
      "Cloud migration",
      "Managed infrastructure",
      "Backup & DR setup"
    ],
    "caps": [
      [
        "cloud",
        "AWS & Azure deployment",
        "Landing zones, networking and environments designed for security and cost."
      ],
      [
        "layers",
        "OpenShift & containers",
        "Red Hat OpenShift clusters sized and configured for MAS and other workloads."
      ],
      [
        "database",
        "Backup & disaster recovery",
        "Automated backups, restore testing and documented recovery targets."
      ],
      [
        "pulse",
        "Monitoring & alerting",
        "Health, performance and capacity tracked, with alerts routed to the right people."
      ],
      [
        "server",
        "Virtualisation & servers",
        "VMware and on-premises servers administered, patched and right-sized."
      ],
      [
        "shield",
        "Security & compliance",
        "Patching, access control, network hardening and audit-ready configuration."
      ]
    ],
    "steps": [
      [
        "Assess",
        "We review your current environment, costs and risks."
      ],
      [
        "Design",
        "We plan the target architecture, security model and migration path."
      ],
      [
        "Deploy",
        "We build environments as code and migrate workloads with minimal downtime."
      ],
      [
        "Operate",
        "We monitor, patch and optimise, with regular reports on cost and health."
      ]
    ],
    "related": [
      "mas-migration",
      "managed-support",
      "enterprise-integration"
    ]
  },
  {
    "slug": "managed-support",
    "name": "Managed Support",
    "short": "Managed Support",
    "icon": "headset",
    "nav": "L2/L3 support, AMS and 24/7 monitoring",
    "h1": "Support that keeps<br>your systems running",
    "sub": "L2/L3 application support, application management services (AMS), 24/7 monitoring and incident management for Maximo and the systems around it.",
    "ov_title": "One team that knows<br>your setup",
    "ov_body": "Instead of chasing different vendors when something breaks, you get one team that knows your configuration, integrations and infrastructure. We fix issues quickly, then work on the root causes so they stop coming back.",
    "highlights": [
      "L2/L3 support with agreed response times",
      "Small enhancements and releases included",
      "24/7 monitoring of applications and integrations",
      "Monthly reporting on tickets, trends and fixes"
    ],
    "works": [
      "IBM Maximo",
      "MAS",
      "IBM TRIRIGA",
      "Integrations",
      "AWS",
      "Azure",
      "ServiceNow",
      "Jira"
    ],
    "engage": [
      "Support retainer",
      "Full AMS contract",
      "Out-of-hours cover"
    ],
    "caps": [
      [
        "headset",
        "L2/L3 application support",
        "Functional and technical issues diagnosed and resolved by consultants who know Maximo."
      ],
      [
        "wrench",
        "Application management (AMS)",
        "Ongoing enhancements, configuration changes and release management."
      ],
      [
        "pulse",
        "24/7 monitoring",
        "Applications, integrations and infrastructure watched around the clock."
      ],
      [
        "search",
        "Incident & problem management",
        "Fast restore of service, followed by root-cause analysis to prevent repeats."
      ],
      [
        "gauge",
        "Performance & health checks",
        "Regular tuning of queries, crons, escalations and database performance."
      ],
      [
        "refresh",
        "Patches & upgrades",
        "Fix packs and minor upgrades planned, tested and applied for you."
      ]
    ],
    "steps": [
      [
        "Onboard",
        "We document your environment, access and escalation paths."
      ],
      [
        "Stabilise",
        "We clear the backlog and fix recurring issues first."
      ],
      [
        "Run",
        "We handle tickets within agreed service levels and report monthly."
      ],
      [
        "Improve",
        "We suggest and deliver improvements that reduce tickets over time."
      ]
    ],
    "related": [
      "ibm-maximo",
      "cloud-infrastructure",
      "consulting-advisory"
    ]
  },
  {
    "slug": "tririga",
    "name": "TRIRIGA Services",
    "short": "TRIRIGA",
    "icon": "building",
    "nav": "Space, lease and facility management",
    "h1": "Run your real estate<br>and facilities with TRIRIGA",
    "sub": "Implementation, upgrades and support for IBM TRIRIGA (now IBM Maximo Real Estate and Facilities): space, leases, maintenance and capital projects in one platform.",
    "ov_title": "Every building, lease<br>and floor in one view",
    "ov_body": "IBM TRIRIGA is an integrated workplace management system (IWMS) for real estate and facilities. We set it up so you can see how space is used, stay compliant on leases and keep buildings maintained.",
    "highlights": [
      "Space planning from CAD and BIM floor plans",
      "Lease administration and accounting compliance",
      "Facility maintenance and work orders",
      "Integration with Maximo and your ERP"
    ],
    "works": [
      "IBM TRIRIGA",
      "Maximo Real Estate and Facilities",
      "AutoCAD",
      "BIM",
      "IFRS 16",
      "ASC 842",
      "SAP",
      "Oracle"
    ],
    "engage": [
      "New TRIRIGA rollout",
      "Upgrade or migration",
      "Lease data abstraction"
    ],
    "caps": [
      [
        "floor",
        "Space management",
        "Floor plans, occupancy and allocation tracked so you can plan moves and reduce empty space."
      ],
      [
        "doc",
        "Lease administration",
        "Lease terms, critical dates and payments in one register, with accounting to IFRS 16 and ASC 842."
      ],
      [
        "wrench",
        "Facility maintenance",
        "Work orders, preventive maintenance and service requests for every building."
      ],
      [
        "chart",
        "Capital projects",
        "Budgets, schedules and costs tracked for building and refurbishment projects."
      ],
      [
        "calendar",
        "Workplace services",
        "Room and desk reservations, visitor management and service requests."
      ],
      [
        "link",
        "Upgrades & integration",
        "Platform upgrades and integrations with Maximo, ERP and HR systems."
      ]
    ],
    "steps": [
      [
        "Discover",
        "We map your portfolio, leases, floor plans and processes."
      ],
      [
        "Configure",
        "We set up TRIRIGA modules, workflows and reports around them."
      ],
      [
        "Load data",
        "We abstract leases and load buildings, floors and people."
      ],
      [
        "Launch",
        "We train users, go live and support adoption."
      ]
    ],
    "related": [
      "ibm-maximo",
      "enterprise-integration",
      "managed-support"
    ]
  },
  {
    "slug": "mobile-development",
    "name": "Mobile Development & Enablement",
    "short": "Mobile",
    "icon": "mobile",
    "nav": "Maximo Mobile and custom field apps",
    "h1": "Put the right information<br>in technicians' hands",
    "sub": "Maximo Mobile rollouts and custom mobile apps that let field teams see, update and close work, even without a signal.",
    "ov_title": "Close work where<br>it happens",
    "ov_body": "When technicians write notes on paper and enter them later, data arrives late and incomplete. We roll out Maximo Mobile and build custom apps so work orders, inspections and asset details are on the device, online or offline.",
    "highlights": [
      "Maximo Mobile configured for your workflows",
      "Offline-first work for remote sites",
      "Inspections, photos and signatures in the field",
      "Custom iOS and Android apps where needed"
    ],
    "works": [
      "Maximo Mobile",
      "iOS",
      "Android",
      "React Native",
      "Esri ArcGIS",
      "Barcode / RFID",
      "REST APIs"
    ],
    "engage": [
      "Maximo Mobile rollout",
      "Custom field app",
      "Mobile UX review"
    ],
    "caps": [
      [
        "mobile",
        "Maximo Mobile rollout",
        "Maximo Mobile apps for technicians, inspectors and storeroom staff, configured and deployed."
      ],
      [
        "code",
        "Custom app development",
        "Native and cross-platform apps built for workflows that standard apps do not cover."
      ],
      [
        "offline",
        "Offline-first field work",
        "Work that keeps going without a connection and syncs when the signal returns."
      ],
      [
        "clipboard",
        "Inspections & forms",
        "Digital checklists with photos, readings and signatures."
      ],
      [
        "pin",
        "Maps & location",
        "Assets and work shown on maps, with directions to the job."
      ],
      [
        "scan",
        "Barcode & RFID",
        "Scan assets, parts and locations to find records and record usage quickly."
      ]
    ],
    "steps": [
      [
        "Observe",
        "We ride along with field teams to see how work really happens."
      ],
      [
        "Prototype",
        "We design screens and test them with technicians early."
      ],
      [
        "Build",
        "We configure Maximo Mobile or build the app, and integrate it."
      ],
      [
        "Roll out",
        "We deploy to devices, train crews and support adoption."
      ]
    ],
    "related": [
      "ibm-maximo",
      "enterprise-integration",
      "managed-support"
    ]
  },
  {
    "slug": "consulting-advisory",
    "name": "Consulting & Architectural Advisory",
    "short": "Consulting",
    "icon": "bulb",
    "nav": "EAM strategy, architecture and health checks",
    "h1": "Make the right calls<br>before you build",
    "sub": "Independent advice on asset management strategy, solution architecture and roadmaps, from consultants who have delivered Maximo and TRIRIGA projects.",
    "ov_title": "A clear plan<br>for your asset systems",
    "ov_body": "Big decisions like migrating to MAS, replacing a system or integrating new tools are hard to undo. We help you weigh the options, design an architecture that fits, and set a realistic roadmap your teams can deliver.",
    "highlights": [
      "EAM strategy and multi-year roadmaps",
      "Solution and integration architecture",
      "Maximo health checks and audits",
      "Dedicated remote teams when you need capacity"
    ],
    "works": [
      "IBM Maximo",
      "MAS",
      "IBM TRIRIGA",
      "AWS",
      "Azure",
      "Red Hat OpenShift",
      "ISO 55000"
    ],
    "engage": [
      "Health check",
      "Strategy & roadmap",
      "Architecture review"
    ],
    "caps": [
      [
        "target",
        "EAM strategy & roadmap",
        "A prioritised roadmap tied to your business goals and budget."
      ],
      [
        "layers",
        "Solution architecture",
        "Target architectures for applications, data, integrations and infrastructure."
      ],
      [
        "search",
        "Health checks & audits",
        "A review of configuration, performance, data quality and security, with clear fixes."
      ],
      [
        "flow",
        "Process design",
        "Work management, inventory and reliability processes aligned with good practice."
      ],
      [
        "doc",
        "Licensing advisory",
        "Guidance on Maximo licensing and AppPoints, so you pay for what you use."
      ],
      [
        "users",
        "Dedicated remote teams",
        "Experienced consultants and developers who work as part of your team."
      ]
    ],
    "steps": [
      [
        "Listen",
        "We interview stakeholders and review your systems and data."
      ],
      [
        "Analyse",
        "We find the gaps, risks and quick wins."
      ],
      [
        "Recommend",
        "We present options with costs, trade-offs and a recommendation."
      ],
      [
        "Plan",
        "We turn the recommendation into a delivery roadmap."
      ]
    ],
    "related": [
      "mas-migration",
      "ibm-maximo",
      "tririga"
    ]
  }
];

export const PRODUCTS: Product[] = [
  {
    "name": "Ordova",
    "href": "https://ordova.go2ways.com/",
    "icon": "bus",
    "desc": "Intelligent transport management for bus operators"
  },
  {
    "name": "Emp AI",
    "href": null,
    "icon": "sparkle",
    "desc": "In development"
  }
];


export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return SERVICES.map((s) => s.slug);
}
