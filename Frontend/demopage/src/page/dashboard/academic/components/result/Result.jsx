import React from "react";
import "./Result.css";
import ResultView from "./ResultView";

export default function Result() {
  return (
    <div className="result-page">
      <div className="result-header">
        <h2>🎓 Academic Results</h2>
      </div>

      <ResultView />
    </div>
  );
}
