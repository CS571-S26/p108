import { useState, useRef, useEffect, useCallback } from "react";
import { Spinner } from "react-bootstrap";
import { recordSolve } from "../utils/stats";


const LANGUAGES = [
  { label: "Python 3", langId: 71, key: "python", ext: ".py", comment: "# " },
  { label: "JavaScript", langId: 63, key: "javascript", ext: ".js", comment: "// " },
  { label: "Java", langId: 62, key: "java", ext: ".java", comment: "// " },
];

const JUDGE0_URL = "https://ce.judge0.com/submissions?wait=true&base64_encoded=false";

const KEYWORDS = {
  python: ["def", "return", "if", "else", "elif", "for", "while", "in", "not", "and", "or", "import", "from", "class", "pass", "True", "False", "None", "print", "len", "range", "int", "str", "list", "dict", "set"],
  javascript: ["function", "return", "if", "else", "for", "while", "const", "let", "var", "in", "of", "new", "class", "import", "export", "default", "true", "false", "null", "undefined", "console", "typeof", "async", "await"],
  java: ["public", "private", "static", "void", "int", "double", "String", "boolean", "class", "return", "if", "else", "for", "while", "new", "import", "true", "false", "null", "System", "Arrays"],
};

const STRING_COLOR = "#ce9178";
const KEYWORD_COLOR = "#569cd6";
const NUMBER_COLOR = "#b5cea8";
const COMMENT_COLOR = "#6a9955";
const PAREN_COLOR = "#ffd700";
const DEFAULT_COLOR = "#d4d4d4";

function tokenize(line, langKey) {
  const keywords = new Set(KEYWORDS[langKey] || []);
  const tokens = [];
  let i = 0;

  const isCommentStart = (ch) => {
    if (langKey === "python" && ch === "#") return true;
    if ((langKey === "javascript" || langKey === "java") && line.slice(i, i + 2) === "//") return true;
    return false;
  };

  while (i < line.length) {
    const ch = line[i];

    if (isCommentStart(ch)) {
      tokens.push({ text: line.slice(i), color: COMMENT_COLOR });
      break;
    }

    if (ch === '"' || ch === "'") {
      const quote = ch;
      let j = i + 1;
      while (j < line.length && line[j] !== quote) {
        if (line[j] === "\\") j++;
        j++;
      }
      j++;
      tokens.push({ text: line.slice(i, j), color: STRING_COLOR });
      i = j;
      continue;
    }

    if (/\d/.test(ch) && (i === 0 || /\W/.test(line[i - 1]))) {
      let j = i;
      while (j < line.length && /[\d.]/.test(line[j])) j++;
      tokens.push({ text: line.slice(i, j), color: NUMBER_COLOR });
      i = j;
      continue;
    }

    if (/[a-zA-Z_]/.test(ch)) {
      let j = i;
      while (j < line.length && /[\w]/.test(line[j])) j++;
      const word = line.slice(i, j);
      tokens.push({ text: word, color: keywords.has(word) ? KEYWORD_COLOR : DEFAULT_COLOR });
      i = j;
      continue;
    }

    if ("()[]{}".includes(ch)) {
      tokens.push({ text: ch, color: PAREN_COLOR });
      i++;
      continue;
    }

    tokens.push({ text: ch, color: DEFAULT_COLOR });
    i++;
  }

  return tokens;
}

function HighlightedCode({ code, langKey }) {
  const lines = code.split("\n");
  return (
    <div style={{ fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace", fontSize: "13px", lineHeight: "20px" }}>
      {lines.map((line, li) => (
        <div key={li} style={{ display: "flex", minHeight: "20px" }}>
          {tokenize(line, langKey).map((tok, ti) => (
            <span key={ti} style={{ color: tok.color, whiteSpace: "pre" }}>{tok.text}</span>
          ))}
          {line === "" && <span style={{ whiteSpace: "pre" }}> </span>}
        </div>
      ))}
    </div>
  );
}

export default function CodeEditor({ problem, onResult, difficulty, elapsed }) {
  const [langIndex, setLangIndex] = useState(0);
  const [code, setCode] = useState(() => problem?.starterCode?.[LANGUAGES[0].key] || "");
  const [running, setRunning] = useState(false);
  const [cursorLine, setCursorLine] = useState(0);
  const textareaRef = useRef(null);
  const highlightRef = useRef(null);
  const gutterRef = useRef(null);

  const selectedLang = LANGUAGES[langIndex];
  const lines = code.split("\n");

  function handleLangChange(lang, idx) {
    setLangIndex(idx);
    setCode(problem?.starterCode?.[lang.key] || "");
  }

  const syncScroll = useCallback(() => {
    if (!textareaRef.current) return;
    const st = textareaRef.current.scrollTop;
    const sl = textareaRef.current.scrollLeft;
    if (highlightRef.current) {
      highlightRef.current.scrollTop = st;
      highlightRef.current.scrollLeft = sl;
    }
    if (gutterRef.current) gutterRef.current.scrollTop = st;
  }, []);

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.addEventListener("scroll", syncScroll);
    return () => ta.removeEventListener("scroll", syncScroll);
  }, [syncScroll]);

  function handleKeyDown(e) {
    const ta = e.target;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;

    if (e.key === "Tab") {
      e.preventDefault();
      const newCode = code.substring(0, start) + "    " + code.substring(end);
      setCode(newCode);
      setTimeout(() => { ta.selectionStart = ta.selectionEnd = start + 4; }, 0);
    }

    if (e.key === "Enter") {
      e.preventDefault();
      const lineStart = code.lastIndexOf("\n", start - 1) + 1;
      const currentLine = code.slice(lineStart, start);
      const indent = currentLine.match(/^(\s*)/)[1];
      const extraIndent = /[:{(\[]\s*$/.test(currentLine.trimEnd()) ? "    " : "";
      const insert = "\n" + indent + extraIndent;
      const newCode = code.substring(0, start) + insert + code.substring(end);
      setCode(newCode);
      setTimeout(() => { ta.selectionStart = ta.selectionEnd = start + insert.length; }, 0);
    }

    if (e.key === "/" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      const lineStart = code.lastIndexOf("\n", start - 1) + 1;
      const lineEnd = code.indexOf("\n", start);
      const line = code.slice(lineStart, lineEnd === -1 ? undefined : lineEnd);
      const prefix = selectedLang.comment;
      const newLine = line.startsWith(prefix) ? line.slice(prefix.length) : prefix + line;
      const newCode = code.slice(0, lineStart) + newLine + (lineEnd === -1 ? "" : code.slice(lineEnd));
      setCode(newCode);
    }
  }

  function handleChange(e) {
    setCode(e.target.value);
    const pos = e.target.selectionStart;
    const lineNum = code.slice(0, pos).split("\n").length - 1;
    setCursorLine(lineNum);
  }

  async function handleRun() {
    setRunning(true);
    onResult(null);
    try {
      const res = await fetch(JUDGE0_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source_code: code,
          language_id: selectedLang.langId,
        }),
      });
      const data = await res.json();
      const stdout = data.stdout || "";
      const stderr = data.stderr || data.compile_output || "";
      const exitCode = data.status?.id === 3 ? 0 : 1;

      onResult({
        language: selectedLang.label,
        version: "",
        run: { stdout, stderr, code: exitCode },
      });

      // If no runtime error and every test in stdout reported PASS, record the solve.
      const testLines = stdout.split("\n").filter(
        (l) => l.startsWith("PASS") || l.startsWith("FAIL")
      );
      const allPassed =
        exitCode === 0 &&
        !stderr &&
        testLines.length > 0 &&
        testLines.every((l) => l.startsWith("PASS"));

      if (allPassed && difficulty && problem?.title) {
        recordSolve({
          difficulty,
          title: problem.title,
          language: selectedLang.label,
          elapsedSeconds: elapsed ?? 0,
        });
      }
    } catch (err) {
      onResult({ status: "error", message: err.message });
    } finally {
      setRunning(false);
    }
  }

  const colCount = code.split("\n").length.toString().length;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#1e1e1e", borderRadius: "10px", overflow: "hidden", border: "1px solid #2d2d2d", fontFamily: "'JetBrains Mono', monospace" }}>

      {/* Title bar */}
      <div style={{ background: "#323233", display: "flex", alignItems: "center", padding: "0 12px", height: "36px", borderBottom: "1px solid #1a1a1a", flexShrink: 0 }}>
        <div style={{ display: "flex", gap: "6px", marginRight: "12px" }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840" }} />
        </div>
        <span style={{ color: "#cccccc", fontSize: "12px", opacity: 0.7 }}>solution{selectedLang.ext}</span>
      </div>

      {/* Tab bar */}
      <div style={{ background: "#252526", borderBottom: "1px solid #1a1a1a", display: "flex", alignItems: "stretch", flexShrink: 0 }}>
        {LANGUAGES.map((l, i) => (
          <button
            key={l.key}
            onClick={() => handleLangChange(l, i)}
            style={{
              background: i === langIndex ? "#1e1e1e" : "transparent",
              border: "none",
              borderTop: i === langIndex ? "1px solid #007acc" : "1px solid transparent",
              borderRight: "1px solid #1a1a1a",
              color: i === langIndex ? "#ffffff" : "#969696",
              padding: "6px 16px",
              fontSize: "12px",
              cursor: "pointer",
              fontFamily: "inherit",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              transition: "color 0.15s",
            }}
          >
            <span style={{ fontSize: "10px", opacity: 0.6 }}>◉</span>
            {l.label}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <button
          onClick={handleRun}
          disabled={running}
          style={{
            background: running ? "#0e5a0e" : "#0e7a0e",
            border: "none",
            color: "#fff",
            padding: "4px 16px",
            margin: "4px 8px",
            borderRadius: "4px",
            fontSize: "12px",
            fontWeight: "600",
            cursor: running ? "not-allowed" : "pointer",
            fontFamily: "inherit",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            transition: "background 0.15s",
          }}
        >
          {running ? <><Spinner size="sm" style={{ width: "10px", height: "10px" }} /> Running</> : "▶ Run"}
        </button>
      </div>

      {/* Editor body */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden", position: "relative" }}>

        {/* Line numbers */}
        <div
          ref={gutterRef}
          style={{
            width: `${colCount * 9 + 24}px`,
            background: "#1e1e1e",
            borderRight: "1px solid #2d2d2d",
            overflow: "hidden",
            flexShrink: 0,
            paddingTop: "8px",
            userSelect: "none",
          }}
        >
          {lines.map((_, i) => (
            <div
              key={i}
              style={{
                height: "20px",
                lineHeight: "20px",
                textAlign: "right",
                paddingRight: "12px",
                paddingLeft: "8px",
                fontSize: "13px",
                color: i === cursorLine ? "#c6c6c6" : "#4a4a4a",
                background: i === cursorLine ? "#282828" : "transparent",
                fontFamily: "inherit",
              }}
            >
              {i + 1}
            </div>
          ))}
        </div>

        {/* Highlight layer + Textarea overlay */}
        <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
          <div
            ref={highlightRef}
            style={{
              position: "absolute",
              inset: 0,
              padding: "8px 12px",
              overflow: "hidden",
              pointerEvents: "none",
              whiteSpace: "pre",
            }}
          >
            <HighlightedCode code={code} langKey={selectedLang.key} />
          </div>

          <textarea
            id="code-editor"
            name="code-editor"
            ref={textareaRef}
            value={code}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onKeyUp={(e) => {
              const pos = e.target.selectionStart;
              const lineNum = code.slice(0, pos).split("\n").length - 1;
              setCursorLine(lineNum);
            }}
            onClick={(e) => {
              const pos = e.target.selectionStart;
              const lineNum = code.slice(0, pos).split("\n").length - 1;
              setCursorLine(lineNum);
            }}
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            style={{
              position: "absolute",
              inset: 0,
              padding: "8px 12px",
              background: "transparent",
              color: "transparent",
              caretColor: "#aeafad",
              border: "none",
              outline: "none",
              resize: "none",
              fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
              fontSize: "13px",
              lineHeight: "20px",
              width: "100%",
              height: "100%",
              overflow: "auto",
              tabSize: 4,
              whiteSpace: "pre",
              zIndex: 1,
            }}
          />
        </div>
      </div>

      {/* Status bar */}
      <div style={{ background: "#007acc", display: "flex", alignItems: "center", padding: "0 12px", height: "22px", flexShrink: 0, gap: "16px" }}>
        <span style={{ color: "#ffffff", fontSize: "11px" }}>Ln {cursorLine + 1}, Col 1</span>
        <span style={{ color: "#ffffff", fontSize: "11px", marginLeft: "auto" }}>{selectedLang.label}</span>
        <span style={{ color: "#ffffff", fontSize: "11px" }}>UTF-8</span>
        <span style={{ color: "#ffffff", fontSize: "11px" }}>Spaces: 4</span>
      </div>
    </div>
  );
}