// HighScorePage.js
import React from 'react';
function HighScorePage({
  highScores
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "high-score-container"
  }, /*#__PURE__*/React.createElement("h2", null, "High Scores"), /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Name"), /*#__PURE__*/React.createElement("th", null, "Age"), /*#__PURE__*/React.createElement("th", null, "Attempts"), /*#__PURE__*/React.createElement("th", null, "Word Length"))), /*#__PURE__*/React.createElement("tbody", null, highScores.map((score, index) => /*#__PURE__*/React.createElement("tr", {
    key: index
  }, /*#__PURE__*/React.createElement("td", null, score.name), /*#__PURE__*/React.createElement("td", null, score.age), /*#__PURE__*/React.createElement("td", null, score.attempts), /*#__PURE__*/React.createElement("td", null, score.wordLength))))));
}
export default HighScorePage;
