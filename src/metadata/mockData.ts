export const initialInvoices = [
  { id: "EXT-1001", vendor: "TCS", date: "2026-06-01", amount: 1450.50, status: "Submitted", validation: "Valid", created: "2026-06-04" },
  { id: "EXT-1002", vendor: "Infosys", date: "2026-06-03", amount: 980.00, status: "Processing", validation: "Invalid", created: "2026-06-04" },
  { id: "EXT-1003", vendor: "Wipro", date: "2026-05-28", amount: 4500.00, status: "Approved", validation: "Valid", created: "2026-05-29" },
  { id: "EXT-1004", vendor: "HCLTech", date: "2026-05-29", amount: 320.75, status: "Submitted", validation: "Valid", created: "2026-06-01" },
  { id: "EXT-1005", vendor: "TCS", date: "2026-06-02", amount: 890.00, status: "Processing", validation: "Valid", created: "2026-06-03" },
  { id: "EXT-1006", vendor: "Tech Mahindra", date: "2026-05-25", amount: 1200.00, status: "Submitted", validation: "Invalid", created: "2026-05-27" },
  { id: "EXT-1007", vendor: "LTIMindtree", date: "2026-06-01", amount: 15400.00, status: "Approved", validation: "Valid", created: "2026-06-02" },
  { id: "EXT-1008", vendor: "Infosys", date: "2026-05-30", amount: 75.50, status: "Processing", validation: "Valid", created: "2026-06-01" },
  { id: "EXT-1009", vendor: "Wipro", date: "2026-06-02", amount: 6200.00, status: "Submitted", validation: "Invalid", created: "2026-06-04" },
  { id: "EXT-1010", vendor: "Cognizant", date: "2026-05-15", amount: 9800.00, status: "Approved", validation: "Invalid", created: "2026-05-18" },
  { id: "EXT-1011", vendor: "Mphasis", date: "2026-06-03", amount: 24500.00, status: "Processing", validation: "Valid", created: "2026-06-04" },
  { id: "EXT-1012", vendor: "Persistent Systems", date: "2026-05-22", amount: 3750.25, status: "Approved", validation: "Valid", created: "2026-05-23" },
  { id: "EXT-1013", vendor: "Zoho Corporation", date: "2026-05-18", amount: 18500.00, status: "Submitted", validation: "Valid", created: "2026-05-20" },
  { id: "EXT-1014", vendor: "LTTS", date: "2026-05-20", amount: 640.00, status: "Processing", validation: "Invalid", created: "2026-05-21" },
  { id: "EXT-1015", vendor: "Tata Elxsi", date: "2026-06-01", amount: 8900.00, status: "Submitted", validation: "Valid", created: "2026-06-03" }
];

export const vendorItems = {
  "TCS": [
    { desc: "AWS Infrastructure Hosting (May 2026)", qty: 1, price: 1000.00 },
    { desc: "DevOps Consulting Services", qty: 5, price: 90.10 }
  ],
  "Infosys": [
    { desc: "Office Supplies & Filing Folders", qty: 20, price: 15.00 },
    { desc: "Printer Toner Cartridges", qty: 4, price: 170.00 }
  ],
  "Wipro": [
    { desc: "Nucleus Platform Enterprise License", qty: 1, price: 4000.00 },
    { desc: "Premium Support SLA", qty: 1, price: 500.00 }
  ],
  "HCLTech": [
    { desc: "Anvil Shipments", qty: 2, price: 150.00 },
    { desc: "Tether Rope Bundle", qty: 1, price: 20.75 }
  ],
  "Tech Mahindra": [
    { desc: "Raw Organic Matter Processing", qty: 10, price: 120.00 }
  ],
  "LTIMindtree": [
    { desc: "Advanced Prototyping Alloys", qty: 2, price: 7000.00 },
    { desc: "Tactical Fabric Samples", qty: 4, price: 350.00 }
  ],
  "Cognizant": [
    { desc: "Viral Research Subscriptions", qty: 1, price: 9800.00 }
  ],
  "Mphasis": [
    { desc: "Replicant Maintenance Services", qty: 2, price: 12250.00 }
  ],
  "Persistent Systems": [
    { desc: "Quantum Telemetry Consulting", qty: 10, price: 375.025 }
  ],
  "Zoho Corporation": [
    { desc: "Corporate Restructuring Audits", qty: 1, price: 18500.00 }
  ],
  "LTTS": [
    { desc: "Confectionary Research Lab Supplies", qty: 4, price: 160.00 }
  ],
  "Tata Elxsi": [
    { desc: "Neural Net Processor Blueprints", qty: 1, price: 8900.00 }
  ]
};

export const vendorEmails = {
  "TCS": "billing@tcs.com",
  "Infosys": "accounting@infosys.com",
  "Wipro": "accounts-payable@wipro.com",
  "HCLTech": "billing@hcltech.com",
  "Tech Mahindra": "finance@techmahindra.com",
  "LTIMindtree": "invoices@ltimindtree.com",
  "Cognizant": "ap@cognizant.com",
  "Mphasis": "nexus-billing@mphasis.com",
  "Persistent Systems": "finance@persistent.com",
  "Zoho Corporation": "billing@zoho.com",
  "LTTS": "treasury@ltts.com",
  "Tata Elxsi": "accounts@tataelxsi.com"
};
