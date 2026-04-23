// src/utils/stats.js
// Thin wrapper around localStorage so components never touch the raw API.
// Keeping this isolated means if we ever swap to a backend, only this file changes.

const STORAGE_KEY = "codeduel.stats.v1";

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch {
    // Corrupted JSON, quota errors, disabled storage — fail closed.
    return {};
  }
}

function writeAll(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Quota exceeded or storage disabled. Silently drop — stats are a nice-to-have.
  }
}

// Record a successful solve. If the user solves the same problem again
// faster, we keep the best time.
export function recordSolve({ difficulty, title, language, elapsedSeconds }) {
  const all = readAll();
  const existing = all[difficulty];
  const isNewBest = !existing || elapsedSeconds < existing.bestTimeSeconds;

  all[difficulty] = {
    difficulty,
    title,
    solveCount: (existing?.solveCount ?? 0) + 1,
    bestTimeSeconds: isNewBest ? elapsedSeconds : existing.bestTimeSeconds,
    lastLanguage: language,
    lastSolvedAt: new Date().toISOString(),
  };

  writeAll(all);
  return all[difficulty];
}

export function getAllStats() {
  return readAll();
}

export function clearStats() {
  writeAll({});
}