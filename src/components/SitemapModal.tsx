import React, { useState, useMemo } from 'react';
import {
  X,
  FileCode,
  Copy,
  Check,
  Download,
  ExternalLink,
  Globe,
  Search,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { generateDynamicSitemap, downloadSitemapXmlFile, SITEMAP_ENTRIES } from '../utils/sitemapGenerator';

interface SitemapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SitemapModal: React.FC<SitemapModalProps> = ({ isOpen, onClose }) => {
  const defaultDomain =
    typeof window !== 'undefined' && window.location.origin && !window.location.origin.includes('localhost') && !window.location.origin.includes('run.app')
      ? window.location.origin
      : 'https://omnichurch.download';
  const [domain, setDomain] = useState(defaultDomain);
  const [copied, setCopied] = useState(false);

  // Generate dynamic XML on domain change
  const dynamicXml = useMemo(() => {
    return generateDynamicSitemap(domain);
  }, [domain]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(dynamicXml);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleDownload = () => {
    downloadSitemapXmlFile(domain);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl bg-[#030917] border border-cyan-500/30 shadow-[0_0_50px_rgba(8,124,255,0.25)] text-white overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-600/30 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-[0_0_15px_rgba(53,201,255,0.3)]">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black tracking-tight text-white">
                  Sitemap Dinamik (<span className="text-cyan-400 font-mono text-sm">sitemap.xml</span>)
                </h3>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                  <CheckCircle2 className="w-3 h-3" /> Pare pou Google
                </span>
              </div>
              <p className="text-xs text-blue-200/60">
                Ede Google, Bing ak Yahoo dekouvri epi endekse tout paj ak modil OmniChurch yo pi vit.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-blue-200/60 hover:text-white hover:bg-white/10 transition cursor-pointer"
            aria-label="Fèmen"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          
          {/* Domain configuration row */}
          <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-blue-200/80">
              <Globe className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="font-semibold">Domèn Baz:</span>
            </div>
            <div className="flex-1 sm:max-w-md">
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="https://omnichurch.download"
                className="w-full px-3 py-1.5 rounded-lg bg-[#07132a] border border-cyan-500/40 text-cyan-300 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-cyan-400"
              />
            </div>
            <div className="text-[11px] text-blue-200/60">
              {SITEMAP_ENTRIES.length} adrès detekte
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleCopy}
              className="flex-1 sm:flex-initial py-2 px-4 rounded-xl bg-gradient-to-r from-[#087cff] to-[#35c9ff] hover:opacity-90 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md transition active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-300" />
                  <span>Kòd XML Kopye!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Kopye Kòd XML</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="flex-1 sm:flex-initial py-2 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition active:scale-95"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Telechaje sitemap.xml</span>
            </button>

            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-3 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 transition ml-auto"
              title="Ouvri fichye sitemap.xml an dirèk"
            >
              <span>Gade fichye dirèk</span>
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            </a>
          </div>

          {/* Code preview */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-blue-200/70 px-1">
              <span className="font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                Apèsi Kòd XML la (Fòma Estanda sitemaps.org)
              </span>
              <span className="text-[11px] font-mono text-cyan-300">UTF-8 / XML 1.0</span>
            </div>
            
            <div className="relative rounded-xl border border-white/10 bg-[#020610] p-3.5 overflow-x-auto max-h-64 font-mono text-xs text-blue-100/90 leading-relaxed shadow-inner">
              <pre className="whitespace-pre">{dynamicXml}</pre>
            </div>
          </div>

          {/* Google Search Console Guide */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-blue-950/40 to-cyan-950/20 border border-cyan-500/20 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 uppercase tracking-wider">
              <Search className="w-4 h-4 text-cyan-400" />
              <span>Kijan pou soumèt li sou Google Search Console</span>
            </div>
            
            <ol className="text-xs text-blue-100/80 space-y-1.5 list-decimal list-inside">
              <li>
                Ale sou{' '}
                <a
                  href="https://search.google.com/search-console"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 underline hover:text-cyan-300 font-semibold inline-flex items-center gap-0.5"
                >
                  Google Search Console
                  <ExternalLink className="w-3 h-3" />
                </a>{' '}
                epi chwazi domèn ou an.
              </li>
              <li>Nan meni a goch la, klike sou seksyon <strong>&quot;Sitemaps&quot;</strong>.</li>
              <li>
                Nan ti bwat <em>&quot;Add a new sitemap&quot;</em> la, jis tape:{' '}
                <code className="px-1.5 py-0.5 rounded bg-black/50 text-cyan-300 font-mono font-bold">sitemap.xml</code>
              </li>
              <li>Klike sou bouton ble <strong>&quot;Submit&quot;</strong>. Google ap kòmanse eksplore epi endekse sit la imedyatman!</li>
            </ol>
          </div>

        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-white/10 bg-white/[0.02] flex items-center justify-between text-xs text-blue-200/60">
          <span>OmniChurch SEO Engine • ZOUTIW</span>
          <button
            onClick={onClose}
            className="py-1.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold cursor-pointer transition"
          >
            Fèmen
          </button>
        </div>

      </div>
    </div>
  );
};
