
import React, { useState } from 'react';

interface OutputSectionProps {
  html: string;
}

const OutputSection: React.FC<OutputSectionProps> = ({ html }) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!html) return null;

  return (
    <div className="mt-8 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-2 text-sm font-semibold rounded-md transition-all ${
              activeTab === 'preview' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Live Preview
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-4 py-2 text-sm font-semibold rounded-md transition-all ${
              activeTab === 'code' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            HTML Code
          </button>
        </div>
        
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all shadow-sm"
        >
          {copied ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              Copy HTML
            </>
          )}
        </button>
      </div>

      <div className="p-6 md:p-10 max-h-[800px] overflow-y-auto">
        {activeTab === 'preview' ? (
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
        ) : (
          <pre className="p-4 bg-slate-900 text-slate-100 rounded-lg text-sm overflow-x-auto leading-relaxed">
            <code>{html}</code>
          </pre>
        )}
      </div>
    </div>
  );
};

export default OutputSection;
