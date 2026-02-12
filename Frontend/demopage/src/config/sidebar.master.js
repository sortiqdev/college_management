// sidebar.master.js
export const MASTER_MENU = [
  { key: "dashboard", label: "Dashboard", path: "/master" },

  {
    key: "organizations",
    label: "Organizations",
    children: [
      {
        key: "add-org",
        label: "Add Org",
        path: "/master/organizations/RegisterOrg",
      },
      {
        key: "org-list",
        label: "Org List",
        path: "/master/organizations/list",
      },
    ],
  },

  { key: "plans", label: "Plans & Pricing", path: "/master/plans" },
  { key: "subscriptions", label: "Subscriptions", path: "/master/subscriptions" },
  { key: "features", label: "Feature Control", path: "/master/features" },
  { key: "analytics", label: "Analytics", path: "/master/analytics" },
  { key: "settings", label: "Platform Settings", path: "/master/settings" },
];
