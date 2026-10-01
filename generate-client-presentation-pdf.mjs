import fs from 'node:fs';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

const inputPath = 'CLIENT_PRESENTATION.md';
const outputPath = 'CLIENT_PRESENTATION.pdf';

const doc = await PDFDocument.create();
const fontRegular = await doc.embedFont(StandardFonts.Helvetica);
const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
const fontItalic = await doc.embedFont(StandardFonts.HelveticaOblique);

const pageWidth = 595.28;
const pageHeight = 841.89;
const marginX = 52;
const marginBottom = 52;
const bodyColor = rgb(0.07, 0.17, 0.35);
const gold = rgb(0.78, 0.62, 0.17);
const muted = rgb(0.38, 0.47, 0.56);

let currentPage = doc.addPage([pageWidth, pageHeight]);
let cursorY = pageHeight - 60;

function newPage() {
  currentPage = doc.addPage([pageWidth, pageHeight]);
  cursorY = pageHeight - 60;
}

function wrapText(text, maxWidth, font, size) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = '';

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) <= maxWidth) {
      line = candidate;
    } else {
      if (line) lines.push(line);
      line = word;
    }
  }

  if (line) lines.push(line);
  return lines;
}

function drawTextBlock(text, options = {}) {
  const {
    font = fontRegular,
    size = 11,
    color = bodyColor,
    leading = 1.4,
    indent = 0,
    maxWidth = pageWidth - marginX * 2 - indent,
  } = options;

  const lines = wrapText(text, maxWidth, font, size);
  for (const line of lines) {
    if (cursorY < marginBottom + 20) newPage();
    currentPage.drawText(line, {
      x: marginX + indent,
      y: cursorY,
      size,
      font,
      color,
      lineHeight: size * leading,
    });
    cursorY -= size * leading;
  }
}

function drawHeading(text, level = 1) {
  const styles = {
    1: { size: 22, font: fontBold, color: bodyColor },
    2: { size: 18, font: fontBold, color: bodyColor },
    3: { size: 15, font: fontBold, color: gold },
    4: { size: 12, font: fontBold, color: bodyColor },
  };
  const style = styles[level] || styles[4];

  if (cursorY < marginBottom + 25) newPage();
  currentPage.drawText(text, {
    x: marginX,
    y: cursorY,
    size: style.size,
    font: style.font,
    color: style.color,
  });
  cursorY -= style.size + 14;
}

function drawRule() {
  if (cursorY < marginBottom + 25) newPage();
  currentPage.drawLine({
    start: { x: marginX, y: cursorY },
    end: { x: pageWidth - marginX, y: cursorY },
    thickness: 1,
    color: gold,
  });
  cursorY -= 16;
}

function renderMarkdownToPdf() {
  const lines = fs.readFileSync(inputPath, 'utf8').replace(/\r/g, '').split('\n');
  let paragraphLines = [];
  let listLines = [];

  const flushParagraph = () => {
    if (!paragraphLines.length) return;
    drawTextBlock(paragraphLines.join(' '), { size: 11, leading: 1.55 });
    paragraphLines = [];
    cursorY -= 6;
  };

  const flushList = () => {
    if (!listLines.length) return;
    for (const item of listLines) {
      drawTextBlock(`• ${item}`, {
        size: 10.5,
        leading: 1.45,
        indent: 12,
        maxWidth: pageWidth - marginX * 2 - 12,
      });
      cursorY -= 2;
    }
    listLines = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    if (!line.trim()) {
      flushParagraph();
      flushList();
      cursorY -= 8;
      continue;
    }

    if (/^#{1,4}\s+/.test(line)) {
      flushParagraph();
      flushList();
      const match = line.match(/^(#+)\s+(.*)$/);
      const level = match ? match[1].length : 1;
      drawHeading(match ? match[2].trim() : line.trim(), level);
      continue;
    }

    if (/^---+\s*$/.test(line)) {
      flushParagraph();
      flushList();
      drawRule();
      continue;
    }

    if (/^[-*]\s+/.test(line) || /^\d+\.\s+/.test(line)) {
      flushParagraph();
      listLines.push(line.replace(/^[-*]\s+/, '').replace(/^\d+\.\s+/, ''));
      continue;
    }

    paragraphLines.push(line.trim());
  }

  flushParagraph();
  flushList();
}

const coverPage = doc.getPages()[0];
coverPage.drawText('WishNu', {
  x: marginX,
  y: pageHeight - 130,
  size: 40,
  font: fontBold,
  color: bodyColor,
});
coverPage.drawText('Construction & Development', {
  x: marginX,
  y: pageHeight - 180,
  size: 22,
  font: fontRegular,
  color: muted,
});
coverPage.drawText('Client Presentation', {
  x: marginX,
  y: pageHeight - 220,
  size: 18,
  font: fontBold,
  color: gold,
});

const subtitle = 'Hospitality Renovation, Reopening, and Development Portfolio';
const subtitleLines = wrapText(subtitle, pageWidth - marginX * 2 - 20, fontRegular, 14);
let subtitleY = pageHeight - 260;
for (const line of subtitleLines) {
  coverPage.drawText(line, { x: marginX, y: subtitleY, size: 14, font: fontRegular, color: bodyColor });
  subtitleY -= 20;
}

coverPage.drawLine({
  start: { x: marginX, y: pageHeight - 320 },
  end: { x: pageWidth - marginX, y: pageHeight - 320 },
  thickness: 1,
  color: gold,
});

currentPage = doc.addPage([pageWidth, pageHeight]);
cursorY = pageHeight - 60;
renderMarkdownToPdf();

const pdfBytes = await doc.save();
fs.writeFileSync(outputPath, Buffer.from(pdfBytes));
console.log(`PDF created successfully: ${outputPath}`);

