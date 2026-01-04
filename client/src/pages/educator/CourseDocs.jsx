// src/pages/CourseDocs.jsx
import React from "react";
import { Document, Page } from "react-pdf";

const CourseDocs = () => {
  // আপাতত টেস্ট হিসেবে একটা PDF লিংক দিলাম
  const pdfUrl = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Course Documentation</h1>
      <div className="border rounded-lg shadow p-4">
        <Document file={pdfUrl}>
          <Page pageNumber={1} />
        </Document>
      </div>
      <a
        href={pdfUrl}
        download
        className="mt-4 inline-block px-4 py-2 bg-green-600 text-white rounded"
      >
        Download PDF
      </a>
    </div>
  );
};

export default CourseDocs;
