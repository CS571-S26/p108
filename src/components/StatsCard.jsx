import { Card, Badge } from "react-bootstrap";

const diffColor = {
  easy: { border: "#2ea043", text: "#2ea043", badge: "success" },
  medium: { border: "#d29922", text: "#d29922", badge: "warning" },
  hard: { border: "#f85149", text: "#f85149", badge: "danger" },
};

function formatTime(s) {
  if (s == null) return "—";
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

function formatDate(iso) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "—";
  }
}

export default function StatsCard({ difficulty, stat }) {
  const colors = diffColor[difficulty] ?? diffColor.easy;
  const solved = !!stat;

  return (
    <Card
      style={{
        background: "#161b22",
        border: `1px solid ${colors.border}`,
        borderRadius: "12px",
        opacity: solved ? 1 : 0.55,
      }}
    >
      <Card.Body className="p-4">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <div style={{ color: colors.text, fontWeight: "600", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {difficulty}
            </div>
            <Card.Title className="fw-bold mb-0" style={{ color: "#e6edf3", fontSize: "1.1rem" }}>
              {stat?.title ?? "Not yet attempted"}
            </Card.Title>
          </div>
          {solved && <Badge bg={colors.badge}>Solved</Badge>}
        </div>

        <div className="d-flex flex-wrap" style={{ gap: "1.5rem" }}>
          <Stat label="Solves" value={stat?.solveCount ?? 0} />
          <Stat label="Best time" value={formatTime(stat?.bestTimeSeconds)} mono />
          <Stat label="Last language" value={stat?.lastLanguage ?? "—"} />
          <Stat label="Last solved" value={formatDate(stat?.lastSolvedAt)} />
        </div>
      </Card.Body>
    </Card>
  );
}

function Stat({ label, value, mono }) {
  return (
    <div>
      <div style={{ color: "#6e7681", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.2rem" }}>
        {label}
      </div>
      <div style={{ color: "#e6edf3", fontSize: "1rem", fontWeight: "600", fontFamily: mono ? "monospace" : "inherit" }}>
        {value}
      </div>
    </div>
  );
}