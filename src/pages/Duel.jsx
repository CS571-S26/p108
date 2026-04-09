import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import ProblemPanel from "../components/ProblemPanel";
import CodeEditor from "../components/CodeEditor";
import OutputPanel from "../components/OutputPanel";
import { problems } from "../data/problems";

export default function Duel() {
  const { difficulty } = useParams();
  const navigate = useNavigate();
  const problem = problems[difficulty];

  const [result, setResult] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    setElapsed(0);
    setResult(null);
    timerRef.current = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, [difficulty]);

  if (!problem) {
    return (
      <div style={{ background: "#0d1117", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="text-center">
          <h3 style={{ color: "#e6edf3" }}>Problem not found</h3>
          <Button onClick={() => navigate("/")} style={{ background: "#238636", border: "none", marginTop: "1rem" }}>Go Home</Button>
        </div>
      </div>
    );
  }

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const diffColor = { easy: "#238636", medium: "#d29922", hard: "#f85149" };

  return (
    <div style={{ background: "#0d1117", minHeight: "100vh" }}>
      {/* Top bar */}
      <div style={{ background: "#161b22", borderBottom: "1px solid #30363d", padding: "0.6rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
        <Button size="sm" variant="outline-secondary" onClick={() => navigate("/")} style={{ borderColor: "#30363d", color: "#8b949e" }}>
          ← Back
        </Button>
        <span style={{ color: "#e6edf3", fontWeight: "600" }}>{problem.title}</span>
        <span style={{ color: diffColor[difficulty], fontSize: "0.8rem", fontWeight: "600", textTransform: "capitalize" }}>
          {difficulty}
        </span>
        <div className="ms-auto d-flex align-items-center gap-2">
          <span style={{ color: "#8b949e", fontSize: "0.8rem" }}>⏱</span>
          <span style={{ color: "#e6edf3", fontFamily: "monospace", fontWeight: "600", fontSize: "1rem", minWidth: "60px" }}>
            {formatTime(elapsed)}
          </span>
        </div>
      </div>

      {/* Main layout */}
      <Container fluid className="py-3 px-3">
        <Row className="g-3" style={{ height: "calc(100vh - 110px)" }}>
          <Col md={4} style={{ height: "100%", overflowY: "auto" }}>
            <ProblemPanel problem={problem} />
          </Col>
          <Col md={8} style={{ display: "flex", flexDirection: "column", gap: "0.75rem", height: "100%" }}>
            <div style={{ flex: "1 1 0", minHeight: 0 }}>
              {/* key={difficulty} forces full remount when switching problems */}
              <CodeEditor key={difficulty} problem={problem} onResult={setResult} />
            </div>
            <div style={{ flex: "0 0 auto" }}>
              <OutputPanel result={result} totalTests={problem.testCases?.length ?? 0} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}