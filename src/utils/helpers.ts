// Helper: formats dates exactly as vanilla (e.g., YYYY-MM-DD to MM/DD/YYYY)
export function formatDate(dateStr) {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  if (!year || !month || !day) return dateStr;
  return `${parseInt(month)}/${parseInt(day)}/${year}`;
}

export const formatKpiCurrency = (val) => {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
};

export const formatDetailedCurrency = (val) => {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(val);
};
