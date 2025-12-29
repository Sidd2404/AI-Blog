
import React, { useState } from 'react';
import { BlogInputs, GenerationState } from './types';
import { generateBlog } from './services/geminiService';
import InputSection from './components/InputSection';
import OutputSection from './components/OutputSection';

const App: React.FC = () => {
  const [inputs, setInputs] = useState<BlogInputs>({
    keyword: '',
    sourceLink: '',
    imageLink: 'https://picsum.photos/800/600',
  });

  const [state, setState] = useState<GenerationState>({
    isGenerating: false,
    output: '',
    error: null,
  });

  const handleGenerate = async () => {
    setState({ ...state, isGenerating: true, error: null });
    try {
      const result = await generateBlog(inputs);
      setState({
        isGenerating: false,
        output: result,
        error: null,
      });
      // Scroll to result
      setTimeout(() => {
        document.getElementById('result-area')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      setState({
        isGenerating: false,
        output: '',
        error: err.message || 'An unexpected error occurred.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 py-6 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 2v4a2 2 0 002 2h4" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h3m-3 4h5m-5 4h5" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">SEO Blog Architect</h1>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Market Research AI Edition</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <span className="text-sm font-medium text-slate-400">Powered by Gemini 3 Pro</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pt-12">
        <div className="max-w-3xl mb-12">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">
            Generate Publication-Ready Market Research Blogs
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Enter your target keyword, source data link, and visual assets. Our AI will craft a deep-dive, 1500-word SEO-optimized blog post with correct structural markers and professional formatting.
          </p>
        </div>

        <InputSection 
          inputs={inputs} 
          setInputs={setInputs} 
          onGenerate={handleGenerate} 
          isGenerating={state.isGenerating} 
        />

        {state.error && (
          <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className="font-medium">{state.error}</p>
          </div>
        )}

        <div id="result-area">
          {state.isGenerating && (
            <div className="mt-12 text-center py-12">
              <div className="inline-block relative">
                <div className="h-24 w-24 rounded-full border-t-4 border-b-4 border-blue-600 animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-blue-600 font-bold">AI</span>
                </div>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-800">Compiling Market Insights...</h3>
              <p className="text-slate-500 mt-2">This may take up to 60 seconds for deep research & 1500+ words.</p>
            </div>
          )}

          <OutputSection html={state.output} />
        </div>
      </main>

      <footer className="mt-24 border-t border-slate-200 py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm">
            Designed for content marketers and SEO specialists. <br />
            © {new Date().getFullYear()} SEO Market Blog Architect. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
