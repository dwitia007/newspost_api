import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export const exportToCSV = (data, filename) => {
  if (!data || data.length === 0) {
    console.error('No data to export');
    return;
  }

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => {
      const value = row[header];
      // Handle values that might contain commas
      return typeof value === 'string' && value.includes(',') 
        ? `"${value}"` 
        : value;
    }).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename || 'export.csv';
  link.click();
};

export const exportToPDF = async (data, filename) => {
  if (!data || data.length === 0) {
    console.error('No data to export');
    return;
  }

  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(16);
  doc.text('Export Report', 14, 15);
  
  // Add date
  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 25);

  // Prepare table data
  const headers = Object.keys(data[0]);
  const rows = data.map(item => headers.map(header => item[header]));

  // Add table
  doc.autoTable({
    head: [headers],
    body: rows,
    startY: 35,
    theme: 'grid',
    styles: {
      fontSize: 8,
      cellPadding: 2
    },
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: 255
    }
  });

  // Save the PDF
  doc.save(filename || 'export.pdf');
}; 