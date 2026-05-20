import { X, Share2, Send, User, FileText, Clock, Info } from 'lucide-react';
import { useState } from 'react';
import { createPortal } from 'react-dom';

interface ShareUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShare: (content: string) => void;
  title: string;
  defaultContent: string;
  author: string;
}

export function ShareUpdateModal({ isOpen, onClose, onShare, title, defaultContent, author }: ShareUpdateModalProps) {
  const [content, setContent] = useState(defaultContent);

  if (!isOpen) return null;

  const handleShare = () => {
    if (content.trim()) {
      onShare(content);
      onClose();
    }
  };

  return (
    createPortal(
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center border border-slate-200">
              <Share2 className="w-4 h-4 text-slate-600" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900">Share as Update</h3>
              <p className="text-xs text-slate-600">Post to Incident Updates timeline</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5">
          {/* Content Summary Section */}
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-4 h-4 text-cyan-600" />
              <label className="text-xs font-semibold text-slate-900">Content Summary</label>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-slate-200">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-50 flex items-center justify-center border border-cyan-200 flex-shrink-0">
                  <Info className="w-4 h-4 text-cyan-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-slate-900 mb-1">{title}</div>
                  <div className="text-xs text-slate-600 leading-relaxed">
                    {defaultContent}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 pt-3 border-t border-slate-200">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-cyan-600" />
                  <span className="text-xs text-slate-700">Posted by <span className="font-semibold">{author}</span></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-600" />
                  <span className="text-xs text-slate-700">Timestamp: <span className="font-semibold">Current time</span></span>
                </div>
              </div>
            </div>
          </div>

          {/* Editable Message */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-slate-900 mb-2">
              Edit Message <span className="text-slate-500 font-normal">(Optional)</span>
            </label>
            <textarea
              className="w-full h-32 px-3 py-2.5 text-sm text-slate-700 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent resize-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Edit the update message before posting, or post as-is..."
            />
            <div className="flex items-center justify-between mt-2">
              <div className="text-xs text-slate-500">You can modify the message before posting</div>
              <div className="text-xs text-slate-500">{content.length} characters</div>
            </div>
          </div>

          {/* Preview Box */}
          <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
            <User className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-slate-900 mb-1">Timeline Preview</div>
              <div className="text-xs text-slate-600 leading-relaxed">
                This update will appear in the Incident Updates panel as a user post with your name, timestamp, and the message above.
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-2 p-5 border-t border-slate-200 bg-slate-50/50 rounded-b-xl sticky bottom-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 bg-white hover:bg-slate-100 rounded-lg border border-slate-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleShare}
            disabled={!content.trim()}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-500 hover:to-blue-700 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-3.5 h-3.5" />
            Post Update
          </button>
        </div>
      </div>
    </div>,
    document.body
    )
  );
}