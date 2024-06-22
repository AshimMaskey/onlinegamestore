// src/ExportUtils.js
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const exportToPDF = (data, columns) => {
  const doc = new jsPDF();
  const tableColumn = columns.map(column => column.Header);
  const tableRows = data.map(row => columns.map(column => row[column.accessor]));

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
  });

  doc.save('user-data.pdf');
};

export const exportToExcel = (data, columns) => {
  const worksheetData = data.map(row => {
    const rowData = {};
    columns.forEach(column => {
      rowData[column.Header] = row[column.accessor];
    });
    return rowData;
  });

  const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  XLSX.writeFile(workbook, 'user-data.xlsx');
};
