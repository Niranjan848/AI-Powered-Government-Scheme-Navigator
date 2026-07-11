type StatCardProps = {
  label: string;
  value: string | number;
  detail: string;
};

export function StatCard({ label, value, detail }: StatCardProps) {
  return (
    <article className="kpi-item">
      <p className="kpi-label">{label}</p>
      <p className="kpi-value">{value}</p>
      <p className="muted">{detail}</p>
    </article>
  );
}
