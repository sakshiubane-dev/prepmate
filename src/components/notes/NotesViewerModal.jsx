import React, { useState } from 'react';
import { 
  X, Download, Trash2, Edit2, FileText, Image as ImageIcon, 
  Calendar, HardDrive, Check, ZoomIn, ZoomOut, Sparkles,
  Presentation, FileSpreadsheet, Eye, ExternalLink, ShieldCheck, Tag
} from 'lucide-react';
import { downloadNoteFile, formatFileSize, deleteNote, updateNoteMetadata } from '../../lib/services/notesStorage.js';

export default function NotesViewerModal({ note, onClose, onNoteUpdated, onNoteDeleted, isAdmin = false }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(note?.title || note?.fileName || '');
  const [newDescription, setNewDescription] = useState(note?.description || '');
  const [zoomLevel, setZoomLevel] = useState(100);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isBusy, setIsBusy] = useState(false);

  if (!note) return null;

  const ext = (note.fileExtension || note.originalFileName?.split('.').pop() || '').toLowerCase();
  const isPdf = ext === 'pdf' || note.fileType === 'application/pdf';
  const isImage = ['png', 'jpg', 'jpeg', 'webp'].includes(ext) || note.fileType?.startsWith('image/');
  const isPresentation = ['ppt', 'pptx'].includes(ext);
  const isWordDoc = ['doc', 'docx'].includes(ext);
  const isText = ['txt', 'md'].includes(ext) || note.fileType?.startsWith('text/');

  const handleSaveMetadata = async () => {
    if (!newTitle.trim()) return;
    setIsBusy(true);
    try {
      const updated = await updateNoteMetadata(note.id, {
        title: newTitle.trim(),
        fileName: newTitle.trim(),
        description: newDescription.trim()
      });
      setIsEditing(false);
      if (onNoteUpdated) onNoteUpdated(updated);
    } catch (err) {
      alert('Failed to update note details: ' + err.message);
    } finally {
      setIsBusy(false);
    }
  };

  const handleDelete = async () => {
    setIsBusy(true);
    try {
      await deleteNote(note.id);
      if (onNoteDeleted) onNoteDeleted(note.id);
      onClose();
    } catch (err) {
      alert('Failed to delete note: ' + err.message);
    } finally {
      setIsBusy(false);
    }
  };

  const renderIcon = () => {
    if (isPdf) return <FileText size={20} color="#ef4444" />;
    if (isPresentation) return <Presentation size={20} color="#f97316" />;
    if (isWordDoc) return <FileSpreadsheet size={20} color="#3b82f6" />;
    if (isImage) return <ImageIcon size={20} color="var(--accent-primary)" />;
    return <FileText size={20} color="var(--accent-emerald)" />;
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.88)',
        backdropFilter: 'blur(8px)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem',
        animation: 'fadeIn 0.2s ease'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Top Header Bar */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'var(--bg-surface)',
          padding: '0.875rem 1.5rem',
          borderRadius: '0.75rem 0.75rem 0 0',
          border: '1px solid var(--border-color)',
          borderBottom: 'none'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', flex: 1, minWidth: 0 }}>
          <div 
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '0.5rem',
              backgroundColor: 'var(--bg-dark)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            {renderIcon()}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            {isEditing ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="input"
                  placeholder="Document Title"
                  style={{ padding: '0.35rem 0.5rem', fontSize: '0.9375rem', maxWidth: '400px' }}
                  autoFocus
                />
                <input
                  type="text"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="input"
                  placeholder="Optional brief description"
                  style={{ padding: '0.35rem 0.5rem', fontSize: '0.8125rem', maxWidth: '400px' }}
                />
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                  <button 
                    onClick={handleSaveMetadata} 
                    disabled={isBusy}
                    className="btn btn-primary btn-sm"
                    style={{ padding: '0.25rem 0.625rem' }}
                  >
                    <Check size={14} />
                    <span>Save Changes</span>
                  </button>
                  <button 
                    onClick={() => setIsEditing(false)} 
                    className="btn btn-secondary btn-sm"
                    style={{ padding: '0.25rem 0.625rem' }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <h3 
                    style={{ 
                      fontSize: '1.125rem', 
                      fontWeight: 700, 
                      color: 'var(--text-main)', 
                      margin: 0,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                    title={note.title || note.fileName}
                  >
                    {note.title || note.fileName}
                  </h3>
                  {isAdmin && (
                    <button 
                      onClick={() => setIsEditing(true)}
                      style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', padding: '0.25rem' }}
                      title="Edit Title & Description"
                    >
                      <Edit2 size={14} />
                    </button>
                  )}
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.35rem' }}>
                  <span className="badge badge-indigo" style={{ fontSize: '0.6875rem' }}>
                    {note.materialType || 'College Notes'}
                  </span>
                  <span>•</span>
                  <span style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>
                    {note.moduleTitle}
                  </span>
                  <span>•</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <HardDrive size={11} />
                    {note.formattedSize || formatFileSize(note.fileSize)}
                  </span>
                  <span>•</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Calendar size={11} />
                    {new Date(note.uploadDate).toLocaleDateString()}
                  </span>
                  {note.uploader?.name && (
                    <>
                      <span>•</span>
                      <span style={{ color: 'var(--text-muted)' }}>
                        By {note.uploader.name}
                      </span>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {isImage && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginRight: '0.5rem' }}>
              <button 
                onClick={() => setZoomLevel(prev => Math.max(50, prev - 25))} 
                className="btn btn-secondary btn-sm"
                title="Zoom Out"
              >
                <ZoomOut size={14} />
              </button>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', minWidth: '42px', textAlign: 'center' }}>
                {zoomLevel}%
              </span>
              <button 
                onClick={() => setZoomLevel(prev => Math.min(250, prev + 25))} 
                className="btn btn-secondary btn-sm"
                title="Zoom In"
              >
                <ZoomIn size={14} />
              </button>
            </div>
          )}

          <button 
            onClick={() => downloadNoteFile(note)} 
            className="btn btn-primary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}
            title="Download document to device"
          >
            <Download size={14} />
            <span>Download</span>
          </button>

          {isAdmin && (
            <>
              {showDeleteConfirm ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <button 
                    onClick={handleDelete} 
                    disabled={isBusy}
                    className="btn btn-sm"
                    style={{ backgroundColor: '#ef4444', color: 'white' }}
                  >
                    Confirm Delete
                  </button>
                  <button 
                    onClick={() => setShowDeleteConfirm(false)} 
                    className="btn btn-secondary btn-sm"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setShowDeleteConfirm(true)} 
                  className="btn btn-secondary btn-sm"
                  style={{ color: '#ef4444' }}
                  title="Delete Note"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </>
          )}

          <button 
            onClick={onClose} 
            className="btn btn-secondary btn-sm"
            style={{ marginLeft: '0.5rem' }}
            title="Close Viewer"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Main Preview Container */}
      <div 
        style={{
          flex: 1,
          backgroundColor: '#0a0f1d',
          border: '1px solid var(--border-color)',
          display: 'flex',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {isPdf && (
          <iframe 
            src={note.fileUrl || note.dataUrl} 
            title={note.title || note.fileName}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              backgroundColor: '#ffffff'
            }}
          />
        )}

        {isImage && (
          <div 
            style={{
              width: '100%',
              height: '100%',
              overflow: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem'
            }}
          >
            <img 
              src={note.fileUrl || note.dataUrl} 
              alt={note.title || note.fileName}
              style={{
                maxWidth: `${zoomLevel}%`,
                maxHeight: '85vh',
                objectFit: 'contain',
                borderRadius: '0.5rem',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
                transition: 'transform 0.15s ease'
              }}
            />
          </div>
        )}

        {isText && (
          <div style={{ width: '100%', height: '100%', overflow: 'auto', padding: '2rem' }}>
            <pre style={{
              fontFamily: 'monospace',
              fontSize: '0.9rem',
              color: 'var(--text-main)',
              lineHeight: 1.6,
              whiteSpace: 'pre-wrap',
              backgroundColor: 'var(--bg-surface)',
              padding: '1.5rem',
              borderRadius: '0.5rem',
              border: '1px solid var(--border-color)'
            }}>
              {note.textPreview || 'No text extracted.'}
            </pre>
          </div>
        )}

        {(isPresentation || isWordDoc) && (
          <div 
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '3rem',
              textAlign: 'center'
            }}
          >
            <div 
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '1rem',
                backgroundColor: isPresentation ? 'rgba(249, 115, 22, 0.15)' : 'rgba(59, 130, 246, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
                color: isPresentation ? '#f97316' : '#3b82f6'
              }}
            >
              {isPresentation ? <Presentation size={36} /> : <FileSpreadsheet size={36} />}
            </div>

            <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
              {note.title || note.fileName}
            </h3>
            
            <p style={{ color: 'var(--text-muted)', maxWidth: '520px', lineHeight: 1.6, marginBottom: '1.5rem', fontSize: '0.9375rem' }}>
              {note.description || `This ${isPresentation ? 'PowerPoint presentation (.pptx)' : 'Word document (.docx)'} is ready for study. You can download the original file directly to open it in Microsoft Office, Google Docs, or Keynote.`}
            </p>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <button 
                onClick={() => downloadNoteFile(note)} 
                className="btn btn-primary"
                style={{ gap: '0.5rem', padding: '0.75rem 1.5rem' }}
              >
                <Download size={18} />
                <span>Download {note.fileExtension?.toUpperCase()} ({note.formattedSize || formatFileSize(note.fileSize)})</span>
              </button>

              {note.fileUrl && note.fileUrl.startsWith('http') && (
                <a
                  href={`https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(note.fileUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                  style={{ gap: '0.5rem' }}
                >
                  <ExternalLink size={16} />
                  <span>Open in Office Online</span>
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Description & Metadata Footer */}
      {(note.description || note.extractedText) && (
        <div 
          style={{
            backgroundColor: 'var(--bg-surface)',
            padding: '0.75rem 1.25rem',
            borderRadius: '0 0 0.75rem 0.75rem',
            border: '1px solid var(--border-color)',
            borderTop: 'none',
            fontSize: '0.8125rem',
            color: 'var(--text-muted)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem'
          }}
        >
          {note.description && (
            <div>
              <strong style={{ color: 'var(--text-main)' }}>Description: </strong>
              <span>{note.description}</span>
            </div>
          )}
          {note.extractedText && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-dim)', fontSize: '0.75rem' }}>
              <Sparkles size={12} color="var(--accent-primary)" />
              <span>{note.extractedText}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
