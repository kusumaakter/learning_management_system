import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/educator/Footer";

const CourseDocs = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const coursePDFs = {
    "605c72efb3f1c2b1f8e4e1a1": "/docs/javascript_tutorial.pdf",
    "675ac1512100b91a6d9b8b24": "/docs/Python_Programming.pdf",
    "605c72efb3f1c2b1f8e4e1ae": "/docs/cybersecuirty_sb_factsheets_all.pdf",
    "605c72efb3f1c2b1f8e4e1a7": "/docs/web-dev-uoe.pdf",
    "605c72efb3f1c2b1f8e4e1ac": "/docs/preview-9781482205442_A24097357.pdf",
    "605c72efb3f1c2b1f8e4e1ad": "/docs/P1-Data_Science_and_Analytics_with_Python_2b29.pdf",
    "605c72efb3f1c2b1f8e4e1aa": "/docs/DSML.pdf",
    "605c72efb3f1c2b1f8e4e1ab": "/docs/Cybersecurity-Handbook-English-version-compressed.pdf",
  };

  const pdfUrl = coursePDFs[id];

  const onLoadSuccess = () => {
    setLoading(false);
    setError(null);
  };

  const onLoadError = () => {
    setError("Failed to load PDF file. Please check the file path.");
    setLoading(false);
  };

  if (!pdfUrl) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <h1 className="text-xl font-semibold text-gray-800">Course Documentation</h1>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-300 rounded-lg p-6 text-center">
            <div className="text-red-500 text-5xl mb-4">❌</div>
            <p className="text-red-600 font-semibold text-lg">
              No PDF available for this course.
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Course Documentation
        </h2>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {loading && !error && (
            <div className="flex items-center justify-center h-96 border-2 border-dashed border-gray-300 rounded-lg">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600 font-medium">Loading PDF...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center h-96 border-2 border-red-300 rounded-lg bg-red-50 m-4">
              <div className="text-center px-6">
                <div className="text-red-500 text-5xl mb-4">⚠️</div>
                <p className="text-red-600 font-semibold text-lg mb-2">{error}</p>
                <p className="text-sm text-gray-600 mb-4">
                  Possible solutions:
                </p>
                <ul className="text-left text-sm text-gray-700 space-y-2 max-w-md mx-auto bg-white p-4 rounded">
                  <li>✓ Check if the PDF file exists: <code className="bg-gray-100 px-2 py-1 rounded">public/docs/javascript_tutorial.pdf</code></li>
                  <li>✓ Verify the file name matches exactly (case-sensitive)</li>
                  <li>✓ Restart your development server after adding files</li>
                  <li>✓ Clear browser cache and reload</li>
                </ul>
              </div>
            </div>
          )}

          {!error && (
            <div className="p-4 bg-gray-100">
              <iframe
                src={pdfUrl}
                className="w-full h-[700px] border-2 border-gray-300 rounded-lg shadow-md bg-white"
                title="PDF Viewer"
                onLoad={onLoadSuccess}
                onError={onLoadError}
              />
            </div>
          )}
        </div>
        {!error && (
          <div className="mt-6 flex gap-4">
            <a
              href={pdfUrl}
              download
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-md font-medium"
            >
              <span className="text-xl">⬇</span>
              <span>Download PDF</span>
            </a>
            
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md font-medium"
            >
              <span className="text-xl">🔗</span>
              <span>Open in New Tab</span>
            </a>
          </div>
        )}
        {/* <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">💡 Tip:</span> Use the browser's built-in PDF controls to zoom, search, and navigate through pages.
          </p>
        </div> */}
      </main>
      <Footer/>
    </div>
  );
};

export default CourseDocs;