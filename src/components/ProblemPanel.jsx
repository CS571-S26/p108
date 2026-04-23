import { Badge } from "react-bootstrap";
 
const difficultyColor = {
  Easy: "success",
  Medium: "warning",
  Hard: "danger",
};
 
export default function ProblemPanel({ problem }) {
  if (!problem) return null;
 
  return (
    <div
      style={{
        background: "#161b22",
        border: "1px solid #30363d",
        borderRadius: "10px",
        padding: "1.5rem",
        height: "100%",
        overflowY: "auto",
        color: "#e6edf3",
      }}
    >
      <div className="d-flex align-items-center gap-2 mb-3">
        <h5 className="mb-0 fw-bold">{problem.title}</h5>
        <Badge bg={difficultyColor[problem.difficulty]}>
          {problem.difficulty}
        </Badge>
      </div>
 
      <p style={{ color: "#8b949e", lineHeight: "1.7", whiteSpace: "pre-line" }}>
        {problem.description}
      </p>
 
      <hr style={{ borderColor: "#30363d" }} />
 
      {problem.examples.map((ex, i) => (
        <div key={i} className="mb-3">
          <p className="mb-1 fw-semibold" style={{ color: "#e6edf3" }}>
            Example {i + 1}:
          </p>
          <div
            style={{
              background: "#0d1117",
              border: "1px solid #30363d",
              borderRadius: "6px",
              padding: "0.75rem 1rem",
              fontSize: "0.875rem",
              fontFamily: "monospace",
            }}
          >
            <div>
              <span style={{ color: "#8b949e" }}>Input: </span>
              <span style={{ color: "#79c0ff" }}>{ex.input}</span>
            </div>
            <div>
              <span style={{ color: "#8b949e" }}>Output: </span>
              <span style={{ color: "#56d364" }}>{ex.output}</span>
            </div>
            {ex.explanation && (
              <div style={{ color: "#8b949e", marginTop: "0.25rem" }}>
                Explanation: {ex.explanation}
              </div>
            )}
          </div>
        </div>
      ))}
 
      <hr style={{ borderColor: "#30363d" }} />
 
      <p className="fw-semibold mb-2" style={{ color: "#e6edf3" }}>
        Constraints:
      </p>
      <ul style={{ color: "#8b949e", fontSize: "0.875rem", paddingLeft: "1.25rem" }}>
        {problem.constraints.map((c, i) => (
          <li key={i} style={{ fontFamily: "monospace" }}>
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}
 