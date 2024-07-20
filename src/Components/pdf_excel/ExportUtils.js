// src/ExportUtils.js
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const exportToPDF = (data, columns, dataName) => {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(18);
  doc.setFont(undefined, 'bold');
  const titleText = 'Online Game Store';
  const titleWidth = doc.getTextWidth(titleText);
  const titleX = (doc.internal.pageSize.getWidth() - titleWidth) / 2;
  doc.text(titleText, titleX, 22);
  doc.setFont(undefined, 'normal');
  doc.line(titleX, 24, titleX + titleWidth, 24); // Underline

  // Subtitle
  doc.setFontSize(14);
  const subtitleText = dataName;
  const subtitleWidth = doc.getTextWidth(subtitleText);
  const subtitleX = (doc.internal.pageSize.getWidth() - subtitleWidth) / 2;
  doc.text(subtitleText, subtitleX, 32);

  // Prepare table data
  const tableColumn = columns.map(column => column.Header);
  const tableRows = data.map(row => columns.map(column => row[column.accessor]));

  // Add table
  doc.autoTable({
    startY: 42, // Adjust starting Y position to avoid overlap with title and subtitle
    head: [tableColumn],
    body: tableRows,
  });

  doc.save('untitled.pdf');
};

export const exportToExcel = (data, columns, dataName) => {
  const worksheetData = data.map(row => {
    const rowData = {};
    columns.forEach(column => {
      rowData[column.Header] = row[column.accessor];
    });
    return rowData;
  });

  const worksheet = XLSX.utils.json_to_sheet([]);

  // Add title and subtitle rows
  XLSX.utils.sheet_add_aoa(worksheet, [['Online Game Store']], { origin: 'A1' });
  XLSX.utils.sheet_add_aoa(worksheet, [[dataName]], { origin: 'A2' });

  // Merge cells for title and subtitle
  worksheet['!merges'] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: columns.length - 1 } },
    { s: { r: 1, c: 0 }, e: { r: 1, c: columns.length - 1 } }
  ];

  // Add the actual data starting from the 4th row
  XLSX.utils.sheet_add_json(worksheet, worksheetData, { origin: 'A4', skipHeader: false });

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  XLSX.writeFile(workbook, 'untitled.xlsx');
};