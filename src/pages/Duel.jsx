import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import ProblemPanel from "../components/ProblemPanel";
import CodeEditor from "../components/CodeEditor";
import OutputPanel from "../components/OutputPanel";
import { problems } from "../data/problems";
import DuelHeader from "../components/DuelHeader";

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



  return (
    <div style={{ background: "#0d1117", minHeight: "100vh" }}>
      <DuelHeader
        title={problem.title}
        difficulty={difficulty}
        elapsed={elapsed}
        onBack={() => navigate("/")}
      />

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