import { Button } from "react-bootstrap";

const diffColor = { easy: "#238636", medium: "#d29922", hard: "#f85149" };

function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

export default function DuelHeader({ title, difficulty, elapsed, onBack }) {
  return (
    <div
      style={{
        background: "#161b22",
        borderBottom: "1px solid #30363d",
        padding: "0.6rem 1.5rem",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <Button
        size="sm"
        variant="outline-secondary"
        onClick={onBack}
        style={{ borderColor: "#30363d", color: "#8b949e" }}
      >
        ← Back
      </Button>
      <span style={{ color: "#e6edf3", fontWeight: "600" }}>{title}</span>
      <span
        style={{
          color: diffColor[difficulty],
          fontSize: "0.8rem",
          fontWeight: "600",
          textTransform: "capitalize",
        }}
      >
        {difficulty}
      </span>
      <div className="ms-auto d-flex align-items-center gap-2">
        <span style={{ color: "#8b949e", fontSize: "0.8rem" }}>⏱</span>
        <span
          style={{
            color: "#e6edf3",
            fontFamily: "monospace",
            fontWeight: "600",
            fontSize: "1rem",
            minWidth: "60px",
          }}
        >
          {formatTime(elapsed)}
        </span>
      </div>
    </div>
  );
}