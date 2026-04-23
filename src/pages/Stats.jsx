import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import StatsCard from "../components/StatsCard";
import { getAllStats, clearStats } from "../utils/stats";

const DIFFICULTIES = ["easy", "medium", "hard"];

export default function Stats() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    setStats(getAllStats());
  }, []);

  function handleReset() {
    if (!window.confirm("Clear all solve history? This can't be undone.")) return;
    clearStats();
    setStats({});
  }

  const totalSolves = Object.values(stats).reduce(
    (sum, s) => sum + (s?.solveCount ?? 0),
    0
  );
  const uniqueSolved = Object.keys(stats).length;

  return (
    <div style={{ background: "#0d1117", minHeight: "100vh" }}>
      <Container className="py-5">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap" style={{ gap: "1rem" }}>
          <div>
            <h2 className="fw-bold mb-1" style={{ color: "#e6edf3" }}>Your Stats</h2>
            <p className="mb-0" style={{ color: "#8b949e" }}>
              {uniqueSolved === 0
                ? "No problems solved yet — jump into a duel to start tracking."
                : `${uniqueSolved}/3 problems solved · ${totalSolves} total solve${totalSolves === 1 ? "" : "s"}`}
            </p>
          </div>
          <div className="d-flex gap-2">
            <Button as={Link} to="/" variant="outline-secondary" style={{ borderColor: "#30363d", color: "#8b949e" }}>
              ← Back to home
            </Button>
            {uniqueSolved > 0 && (
              <Button variant="outline-danger" onClick={handleReset}>
                Reset stats
              </Button>
            )}
          </div>
        </div>

        <Row className="g-4">
          {DIFFICULTIES.map((d) => (
            <Col md={4} key={d}>
              <StatsCard difficulty={d} stat={stats[d]} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}