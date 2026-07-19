import fs from "fs";

const memoHtml = fs.readFileSync("site-memo.html", "utf-8");
const researchHtml = fs.readFileSync("site-research-pre-fih-runway-gap.html", "utf-8");

// Extract everything inside body for Memo
const memoBodyStart = memoHtml.indexOf("<body>");
const memoBodyEnd = memoHtml.indexOf("</body>");
const memoBody = memoHtml.substring(memoBodyStart + 6, memoBodyEnd).trim();
fs.writeFileSync("memo-complete-body.html", memoBody);

// Extract everything inside body for Research
const researchBodyStart = researchHtml.indexOf("<body>");
const researchBodyEnd = researchHtml.indexOf("</body>");
const researchBody = researchHtml.substring(researchBodyStart + 6, researchBodyEnd).trim();
fs.writeFileSync("research-complete-body.html", researchBody);

console.log("Memo body character count:", memoBody.length);
console.log("Research body character count:", researchBody.length);
