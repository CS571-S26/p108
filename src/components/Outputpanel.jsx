export default function OutputPanel({ result, totalTests }) {
  if (!result) {
    return (
      <div style={{ background: "#161b22", border: "1px solid #30363d", borderRadius: "10px", padding: "1.25rem", color: "#6e7681", fontSize: "0.875rem", minHeight: "120px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        Output will appear here after you run your code.
      </div>
    );
  }

  if (result.status === "error") {
    return (
      <div style={{ background: "#2d0f0f", border: "1px solid #f85149", borderRadius: "10px", padding: "1.25rem", color: "#f85149", fontSize: "0.875rem" }}>
        ❌ {result.message}
      </div>
    );
  }

  const run = result.run || {};
  const stdout = run.stdout || "";
  const stderr = run.stderr || "";
  const exitCode = run.code ?? 0;
  const crashed = exitCode !== 0 || !!stderr;

  // Parse PASS/FAIL lines from stdout
  const lines = stdout.split("\n").filter(Boolean);
  const testLines = lines.filter(l => l.startsWith("PASS") || l.startsWith("FAIL"));
  const passed = testLines.filter(l => l.startsWith("PASS")).length;
  const failed = testLines.filter(l => l.startsWith("FAIL")).length;
  const total = testLines.length;
  const allPassed = total > 0 && failed === 0 && !crashed;
  const hasTests = total > 0;

  return (
    <div style={{ background: "#161b22", border: "1px solid #30363d", borderRadius: "10px", overflow: "hidden" }}>
      {/* Status bar */}
      <div style={{
        background: crashed ? "#2d0f0f" : allPassed ? "#0f2d1a" : hasTests ? "#2d200f" : "#1c1c1c",
        borderBottom: `1px solid ${crashed ? "#f8514944" : allPassed ? "#23863644" : hasTests ? "#d2992244" : "#30363d"}`,
        padding: "0.6rem 1rem",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        flexWrap: "wrap",
      }}>
        {crashed ? (
          <span style={{ color: "#f85149", fontWeight: "600" }}>❌ Runtime Error (exit code {exitCode})</span>
        ) : allPassed ? (
          <span style={{ color: "#238636", fontWeight: "600" }}>✅ All tests passed ({passed}/{total})</span>
        ) : hasTests ? (
          <span style={{ color: "#d29922", fontWeight: "600" }}>⚠ {passed}/{total} tests passed</span>
        ) : (
          <span style={{ color: "#8b949e", fontWeight: "600" }}>▶ Executed</span>
        )}
        {result.language && (
          <span style={{ color: "#6e7681", fontSize: "0.8rem", marginLeft: "auto" }}>
            {result.language} {result.version}
          </span>
        )}
      </div>

      {/* Test case rows */}
      {hasTests && (
        <div style={{ padding: "0.75rem 1rem", display: "flex", flexDirection: "column", gap: "6px" }}>
          {testLines.map((line, i) => {
            const pass = line.startsWith("PASS");
            // Extract parts after status
            const detail = line.slice(line.indexOf("|") + 1).trim();
            return (
              <div key={i} style={{
                background: pass ? "#0f2d1a" : "#2d0f0f",
                border: `1px solid ${pass ? "#23863633" : "#f8514933"}`,
                borderRadius: "6px",
                padding: "6px 12px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "0.8rem",
                fontFamily: "monospace",
              }}>
                <span style={{ color: pass ? "#238636" : "#f85149", fontWeight: "700", flexShrink: 0 }}>
                  {pass ? "PASS" : "FAIL"}
                </span>
                <span style={{ color: "#8b949e" }}>{detail}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* stderr */}
      {stderr && (
        <div style={{ padding: "0 1rem 1rem" }}>
          <p className="mb-1" style={{ color: "#8b949e", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>stderr</p>
          <pre style={{ background: "#0d1117", border: "1px solid #f85149", borderRadius: "6px", padding: "0.75rem", color: "#f85149", fontSize: "0.8rem", margin: 0, whiteSpace: "pre-wrap" }}>
            {stderr}
          </pre>
        </div>
      )}

      {/* Fallback: raw stdout if no test lines detected */}
      {!hasTests && stdout && !crashed && (
        <div style={{ padding: "1rem" }}>
          <p className="mb-1" style={{ color: "#8b949e", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>stdout</p>
          <pre style={{ background: "#0d1117", border: "1px solid #30363d", borderRadius: "6px", padding: "0.75rem", color: "#d4d4d4", fontSize: "0.875rem", margin: 0, whiteSpace: "pre-wrap" }}>
            {stdout}
          </pre>
        </div>
      )}

      {!stdout && !stderr && (
        <div style={{ padding: "1rem" }}>
          <p style={{ color: "#6e7681", fontSize: "0.875rem", margin: 0 }}>No output produced.</p>
        </div>
      )}
    </div>
  );
}