
import { Container, Row, Col } from "react-bootstrap";
 
export default function HeroSection() {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #0d1117 0%, #161b22 100%)",
        borderBottom: "1px solid #30363d",
        padding: "5rem 0 4rem",
      }}
    >
      <Container>
        <Row className="justify-content-center text-center">
          <Col md={8}>
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>⚔️</div>
            <h1
              className="display-4 fw-bold mb-3"
              style={{ color: "#e6edf3" }}
            >
              CodeDuel
            </h1>
            <p
              className="lead mb-4"
              style={{ color: "#8b949e", fontSize: "1.25rem" }}
            >
              Sharpen your skills. Pick a difficulty. Solve the problem.
            </p>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <span
                className="badge"
                style={{
                  background: "#238636",
                  color: "#fff",
                  padding: "0.5rem 1rem",
                  fontSize: "0.85rem",
                }}
              >
                In-browser IDE
              </span>
              <span
                className="badge"
                style={{
                  background: "#1f6feb",
                  color: "#fff",
                  padding: "0.5rem 1rem",
                  fontSize: "0.85rem",
                }}
              >
                Multiple Languages
              </span>
              <span
                className="badge"
                style={{
                  background: "#9933cc",
                  color: "#fff",
                  padding: "0.5rem 1rem",
                  fontSize: "0.85rem",
                }}
              >
                Real Execution
              </span>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
 