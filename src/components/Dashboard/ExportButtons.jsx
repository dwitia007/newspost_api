import React from 'react';
import { useSelector } from 'react-redux';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const ExportButtons = () => {
  const newsData = useSelector(state => state.news.data);
  const payouts = useSelector(state => state.news.payouts);

  const exportToCSV = () => {
    const data = newsData.map(article => ({
      Title: article.title,
      Author: article.author || 'Unknown',
      Date: new Date(article.publishedAt).toLocaleDateString(),
      Source: article.source.name,
      URL: article.url,
      Payout: payouts.find(p => p.id === article.url)?.payout || 0
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'News Data');
    XLSX.writeFile(wb, 'news_data.csv');
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(16);
    doc.text('News Dashboard Report', 14, 15);
    
    // Add date
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 25);

    // Add summary
    doc.setFontSize(12);
    doc.text(`Total Articles: ${newsData.length}`, 14, 35);
    
    // Add table
    const tableData = newsData.map(article => [
      article.title,
      article.author || 'Unknown',
      new Date(article.publishedAt).toLocaleDateString(),
      article.source.name,
      payouts.find(p => p.id === article.url)?.payout || 0
    ]);

    doc.autoTable({
      head: [['Title', 'Author', 'Date', 'Source', 'Payout']],
      body: tableData,
      startY: 45,
      theme: 'grid',
      styles: { fontSize: 8 },
      headStyles: { fillColor: [41, 128, 185] }
    });

    doc.save('news_report.pdf');
  };

  const exportToGoogleSheets = () => {
    const data = newsData.map(article => ({
      Title: article.title,
      Author: article.author || 'Unknown',
      Date: new Date(article.publishedAt).toLocaleDateString(),
      Source: article.source.name,
      URL: article.url,
      Payout: payouts.find(p => p.id === article.url)?.payout || 0
    }));

    const csvContent = "data:text/csv;charset=utf-8," 
      + "Title,Author,Date,Source,URL,Payout\n"
      + data.map(row => Object.values(row).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "news_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="export-buttons">
      <button onClick={exportToCSV} className="export-btn">
        Export to CSV
      </button>
      <button onClick={exportToPDF} className="export-btn">
        Export to PDF
      </button>
      <button onClick={exportToGoogleSheets} className="export-btn">
        Export to Google Sheets
      </button>
    </div>
  );
};

export default ExportButtons; 