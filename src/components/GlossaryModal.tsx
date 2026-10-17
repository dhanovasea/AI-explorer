import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { GLOSSARY_ITEMS } from '../data/learningContent';
import { Search, BookOpen, X, Sparkles, Filter } from 'lucide-react';

export const GlossaryModal: React.FC = () => {
  const { openGlossary, setOpenGlossary } = useLearning();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  if (!openGlossary) return null;

  const categories = ['Semua', 'Dasar', 'Teknis', 'Etika'];

  const filteredItems = GLOSSARY_ITEMS.filter((item) => {
    const matchesSearch = 
      item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.analogy.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
      <div className="flex flex-col h-[90vh] max-h-[750px] w-full max-w-3xl rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <BookOpen className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-display">Glosarium Generative AI</h2>
              <p className="text-xs text-slate-400">Kamus istilah kecerdasan buatan dengan analogi sederhana untuk siswa SMA.</p>
            </div>
          </div>
          <button
            onClick={() => setOpenGlossary(false)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/30 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari istilah, misal: Token, Halusinasi, Prompt..."
              className="w-full rounded-lg border border-slate-700 bg-slate-900 pl-9 pr-3.5 py-1.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
            />
          </div>

          <div className="flex items-center gap-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-slate-950 font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Glossary List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-500">
              Tidak ada istilah yang cocok dengan "{searchQuery}".
            </div>
          ) : (
            filteredItems.map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-800 bg-slate-950/70 p-4.5 space-y-2.5 transition hover:border-slate-700"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white font-display">
                    {item.term}
                  </h3>
                  <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-cyan-400">
                    {item.category}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.definition}
                </p>

                <div className="rounded-lg bg-slate-900/90 p-2.5 border border-slate-800/80 text-[11px] text-slate-300 space-y-1">
                  <div>
                    <span className="font-semibold text-amber-300">💡 Analogi Sehari-hari: </span>
                    <span className="text-slate-400">{item.analogy}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-cyan-300">🔍 Contoh Nyata: </span>
                    <span className="text-slate-400 font-mono text-[10px]">{item.example}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-800 px-6 py-3 bg-slate-950 flex justify-end">
          <button
            onClick={() => setOpenGlossary(false)}
            className="rounded-lg bg-cyan-500 px-4 py-1.5 text-xs font-semibold text-slate-950 hover:bg-cyan-400 transition"
          >
            Tutup Glosarium
          </button>
        </div>
      </div>
    </div>
  );
};
