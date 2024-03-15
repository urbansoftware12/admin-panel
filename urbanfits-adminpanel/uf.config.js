export const orderStatuses = {
    'REQUESTED': { group: "processing", bg: "#94a3b8", text: "#ffff" },
    'ASSIGNED': { group: "processing", bg: "#94a3b8", text: "#ffff" },
    'PICKED UP': { group: "shipped", bg: "#facc15", text: "#ffff" },
    'AT DEPOT': { group: "shipped", bg: "#facc15", text: "#ffff" },
    'DELIVERING': { group: "delivering", bg: "#f97316", text: "#ffff" },
    "DELIVERED": { group: "delivered", bg: "##4ade80", text: "#ffff" },
    "ATTEMPTED": { group: "attempted", bg: "#fef08a", text: "#0000" },
    "CANCELLED": { group: "cancelled", bg: "#dc2626", text: "#ffff" },
    "RTO INITIATED": { group: "return_in_process", bg: "#2dd4bf", text: "#ffff" },
    "RTO ASSIGNED": { group: "return_in_process", bg: "#2dd4bf", text: "#ffff" },
    "RTO PICKED UP": { group: "return_in_process", bg: "#14b8a6", text: "#ffff" },
    "RTO COMPLETE": { group: "returned", bg: "#06b6d4", text: "#ffff" },
    "RTN REQUESTED": { group: "return_in_process", bg: "#2dd4bf", text: "#ffff" },
    "RTN ASSIGNED": { group: "return_in_process", bg: "#2dd4bf", text: "#ffff" },
    "RTN PICKED UP": { group: "return_in_process", bg: "#14b8a6", text: "#ffff" },
    "RTN COMPLETE": { group: "returned", bg: "#06b6d4", text: "#ffff" }
};