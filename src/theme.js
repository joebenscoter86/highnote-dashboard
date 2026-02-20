// ============================================================
// Highnote Brand Design Tokens
// Source: Highnote Brand Home (Confluence)
// ============================================================

export const brand = {
  // Primary palette
  green: "#55F5A3",       // Highnote Green (signature)
  black: "#000000",
  bone: "#F5F3EB",        // Off-white background
  ash: "#E2E0D6",         // Darker off-white, borders
  neonBlue: "#00FFF0",    // Secondary accent (use sparingly)
  neonRed: "#F0314B",     // Secondary accent (use sparingly)
};

// Colors adjusted for light background readability
export const status = {
  ON_TIME: "#16a34a",
  LATE: "#dc2626",
  ON_HOLD: "#d97706",
};

export const statusLabel = {
  ON_TIME: "On Time",
  LATE: "Late",
  ON_HOLD: "On Hold",
};

export const responsibility = {
  CUSTOMER: "#7c3aed",
  INTERNAL: "#0d9488",
  THIRD_PARTY: "#d97706",
  MIXED: "#64748b",
};

export const responsibilityLabel = {
  CUSTOMER: "Subscriber",
  INTERNAL: "Internal",
  THIRD_PARTY: "3rd Party",
  MIXED: "Mixed",
};

// Text colors for light theme
export const text = {
  primary: "#1a1a1a",
  secondary: "#78756d",
  muted: "#9c9789",
  link: "#16a34a",
};

// Surface colors
export const surface = {
  page: brand.bone,
  card: "#ffffff",
  border: brand.ash,
  borderLight: "#f0ede5",
  divider: "#d5d2c8",
};
