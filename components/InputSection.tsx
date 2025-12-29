
import React from 'react';
import { BlogInputs } from '../types';

interface InputSectionProps {
  inputs: BlogInputs;
  setInputs: (inputs: BlogInputs) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ inputs, setInputs, onGenerate, isGenerating }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
      <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        Generation Parameters
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">Target Keyword</label>
          <input
            type="text"
            name="keyword"
            value={inputs.keyword}
            onChange={handleChange}
            placeholder="e.g., Cloud Security Solutions"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">Source Link</label>
          <input
            type="url"
            name="sourceLink"
            value={inputs.sourceLink}
            onChange={handleChange}
            placeholder="https://market-report.com/sample"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">Image Link</label>
          <input
            type="url"
            name="imageLink"
            value={inputs.imageLink}
            onChange={handleChange}
            placeholder="https://picsum.photos/800/600"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
          />
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={onGenerate}
          disabled={isGenerating || !inputs.keyword || !inputs.sourceLink || !inputs.imageLink}
          className={`w-full py-4 rounded-lg font-bold text-white transition-all transform active:scale-[0.98] flex items-center justify-center gap-3 ${
            isGenerating || !inputs.keyword || !inputs.sourceLink || !inputs.imageLink
              ? 'bg-slate-300 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:shadow-lg hover:shadow-blue-200'
          }`}
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Architecting Content...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Generate Professional Blog
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default InputSection;
