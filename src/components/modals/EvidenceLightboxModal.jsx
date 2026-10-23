import React from 'react';

export const EvidenceLightboxModal = ({ evidence, onClose }) => {
  if (!evidence) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative bg-surface-container-lowest border border-outline-variant max-w-3xl w-full rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-outline-variant flex items-center justify-between bg-surface-container-low">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl">image</span>
            <div>
              <h3 className="font-bold text-on-surface text-title-md">{evidence.label}</h3>
              <p className="text-body-sm text-on-surface-variant">Cryptographic Chain-of-Custody Verified • SHA-256 Signed</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-lg transition-colors"
            aria-label="Close Preview"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="p-4 bg-inverse-surface/90 flex items-center justify-center min-h-[320px] max-h-[70vh] overflow-hidden">
          <img
            src={evidence.url}
            alt={evidence.alt}
            className="max-h-[60vh] max-w-full object-contain rounded shadow-lg"
          />
        </div>

        <div className="p-4 bg-surface-container-low border-t border-outline-variant text-body-sm space-y-2">
          <p className="text-on-surface font-medium">{evidence.alt}</p>
          <div className="flex flex-wrap items-center justify-between text-label-sm text-outline gap-2 pt-2 border-t border-outline-variant/40">
            <span>Timestamp: 24 Oct 2025, 10:18:22 UTC+1</span>
            <span>File Source: Secure Officer Camera Uplink</span>
            <button 
              onClick={() => window.open(evidence.url, '_blank')}
              className="text-primary hover:underline font-bold inline-flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">open_in_new</span>
              Open Original Raw File
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
