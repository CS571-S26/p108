import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
 
const difficulties = [
  {
    level: "easy",
    label: "Easy",
    color: "#238636",
    border: "#2ea043",
    bg: "#0d1117",
    icon: "🟢",
    desc: "Two Sum — a classic warm-up problem.",
    time: "~15 min",
  },
  {
    level: "medium",
    label: "Medium",
    color: "#9e6a03",
    border: "#d29922",
    bg: "#0d1117",
    icon: "🟡",
    desc: "Longest Substring Without Repeating Characters.",
    time: "~30 min",
  },
  {
    level: "hard",
    label: "Hard",
    color: "#b62324",
    border: "#f85149",
    bg: "#0d1117",
    icon: "🔴",
    desc: "Median of Two Sorted Arrays — requires O(log n).",
    time: "~45 min",
  },
];
 
export default function DifficultySelector() {
  const navigate = useNavigate();
 
  return (
    <Container className="py-5">
      <h2
        className="text-center fw-semibold mb-2"
        style={{ color: "#e6edf3" }}
      >
        Choose Your Challenge
      </h2>
      <p className="text-center mb-5" style={{ color: "#8b949e" }}>
        Select a difficulty to enter the duel arena
      </p>
      <Row className="g-4 justify-content-center">
        {difficulties.map((d) => (
          <Col key={d.level} md={4} sm={6}>
            <Card
              style={{
                background: "#161b22",
                border: `1px solid ${d.border}`,
                borderRadius: "12px",
                cursor: "pointer",
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = `0 8px 24px ${d.border}33`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
              onClick={() => navigate(`/duel/${d.level}`)}
            >
              <Card.Body className="p-4 text-center">
                <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>
                  {d.icon}
                </div>
                <Card.Title
                  className="fw-bold mb-1"
                  style={{ color: d.border, fontSize: "1.25rem" }}
                >
                  {d.label}
                </Card.Title>
                <Card.Text
                  className="mb-3"
                  style={{ color: "#8b949e", fontSize: "0.9rem" }}
                >
                  {d.desc}
                </Card.Text>
                <div
                  className="mb-3"
                  style={{ color: "#6e7681", fontSize: "0.8rem" }}
                >
                  ⏱ Est. {d.time}
                </div>
                <Button
                  style={{
                    background: d.border,
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: "600",
                    width: "100%",
                  }}
                >
                  Start Duel →
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}