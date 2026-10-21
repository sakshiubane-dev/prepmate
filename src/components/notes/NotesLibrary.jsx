import React, { useState, useEffect, useRef } from 'react';
import { 
  Upload, FileText, Image as ImageIcon, Search, Filter, Trash2, 
  Download, Eye, Edit2, CheckCircle2, AlertCircle, Plus, HardDrive, 
  Calendar, RefreshCw, X, Sparkles, FolderOpen, ArrowRight
} from 'lucide-react';
import { 
  getAllNotes, saveNote, deleteNote, renameNote, replaceNoteFile, 
  downloadNoteFile, formatFileSize, validateNoteFile, seedDefaultExtcNotesIfEmpty 
} from '../../lib/services/notesStorage.js';
import NotesViewerModal from './NotesViewerModal.jsx';

export default function NotesLibrary({ 
  subject, 
  initialModuleId = null,
  onOpenLesson = null 
}) {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedModuleFilter, setSelectedModuleFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Upload modal / section state
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedUploadModule, setSelectedUploadModule] = useState(initialModuleId || '');
  const [customTitle, setCustomTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Active note for preview modal
  const [activePreviewNote, setActivePreviewNote] = useState(null);

  // Drag-and-drop state
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const subjectId = subject?.id || 'electronic_devices';
  const availableTopics = subject?.topics || [];

  // Load notes on mount and on subject change
  const refreshNotes = async () => {
    setIsLoading(true);
    try {
      await seedDefaultExtcNotesIfEmpty();
      const loaded = await getAllNotes(subjectId);
      setNotes(loaded);
    } catch (err) {
      console.warn('Could not load notes:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshNotes();
    if (initialModuleId) {
      setSelectedUploadModule(initialModuleId);
      setSelectedModuleFilter(initialModuleId);
    } else if (availableTopics.length > 0) {
      setSelectedUploadModule(availableTopics[0]);
    }
  }, [subjectId, initialModuleId]);

  // Handle Drag & Drop
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFileSelected(file);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelected(e.target.files[0]);
    }
  };

  const handleFileSelected = (file) => {
    setUploadError(null);
    setUploadSuccess(null);

    const validation = validateNoteFile(file);
    if (!validation.valid) {
      setUploadError(validation.error);
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
    if (!customTitle) {
      setCustomTitle(file.name.replace(/\.[^/.]+$/, ''));
    }
    setShowUploadModal(true);
  };

  const handleExecuteUpload = async () => {
    if (!selectedFile) {
      setUploadError('Please select a PDF document or handwritten image note to upload.');
      return;
    }

    if (!selectedUploadModule) {
      setUploadError('Please choose the destination module for these study notes.');
      return;
    }

    setIsUploading(true);
    setUploadProgress(20);
    setUploadError(null);

    try {
      // Animate progress simulation
      const interval = setInterval(() => {
        setUploadProgress(prev => (prev < 90 ? prev + 25 : prev));
      }, 80);

      const targetTitle = availableTopics.find(t => 
        t.toLowerCase().replace(/\s+/g, '-') === selectedUploadModule.toLowerCase().replace(/\s+/g, '-') ||
        t === selectedUploadModule
      ) || selectedUploadModule;

      const saved = await saveNote({
        subjectId,
        moduleId: selectedUploadModule.toLowerCase().replace(/\s+/g, '-'),
        moduleTitle: targetTitle,
        file: selectedFile,
        customTitle: customTitle.trim() ? `${customTitle.trim()}.${selectedFile.name.split('.').pop()}` : selectedFile.name
      });

      clearInterval(interval);
      setUploadProgress(100);
      setUploadSuccess(`"${saved.fileName}" uploaded and attached to ${saved.moduleTitle}!`);

      setTimeout(async () => {
        await refreshNotes();
        setShowUploadModal(false);
        setSelectedFile(null);
        setCustomTitle('');
        setIsUploading(false);
        setUploadProgress(0);
        setUploadSuccess(null);
      }, 900);
    } catch (err) {
      setUploadError(err.message || 'Upload failed. Please check file format.');
      setIsUploading(false);
    }
  };

  const handleDeleteNote = async (noteId) => {
    if (!window.confirm('Are you sure you want to delete this study note?')) return;
    try {
      await deleteNote(noteId);
      await refreshNotes();
      if (activePreviewNote?.id === noteId) {
        setActivePreviewNote(null);
      }
    } catch (err) {
      alert('Failed to delete note: ' + err.message);
    }
  };

  // Filter notes
  const filteredNotes = notes.filter(n => {
    const matchesModule = selectedModuleFilter === 'ALL' || 
      n.moduleId === selectedModuleFilter.toLowerCase().replace(/\s+/g, '-') ||
      n.moduleTitle.toLowerCase() === selectedModuleFilter.toLowerCase();

    const matchesSearch = !searchQuery.trim() || 
      n.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.moduleTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (n.extractedText && n.extractedText.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesModule && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Banner & Upload Action Button */}
      <div 
        className="card"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          padding: '1.5rem',
          backgroundColor: 'var(--bg-surface)'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <FolderOpen size={20} color="var(--accent-primary)" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
              Study Notes Library ({subject?.name || 'EXTC Core'})
            </h3>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', margin: 0 }}>
            Upload PDFs and handwritten note scans attached directly to your syllabus modules for instant in-lesson revision.
          </p>
        </div>

        <button 
          onClick={() => {
            setSelectedFile(null);
            setUploadError(null);
            setUploadSuccess(null);
            setShowUploadModal(true);
          }}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Upload size={16} />
          <span>Upload New Notes</span>
        </button>
      </div>

      {/* Drag & Drop Quick Area */}
      <div 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        style={{
          padding: '2rem 1.5rem',
          border: isDragging ? '2px dashed var(--accent-primary)' : '2px dashed var(--border-color)',
          backgroundColor: isDragging ? 'rgba(124, 58, 237, 0.08)' : 'var(--bg-dark)',
          borderRadius: '0.75rem',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
      >
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileInputChange}
          accept=".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg"
          style={{ display: 'none' }}
        />
        <div 
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-surface)',
            color: 'var(--accent-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 0.75rem',
            border: '1px solid var(--border-color)'
          }}
        >
          <Upload size={22} />
        </div>
        <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
          Drag & Drop your Study Notes or Click to Browse
        </h4>
        <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', margin: 0 }}>
          Supports <strong>PDF lecture notes</strong> and <strong>PNG/JPG handwritten notes</strong> up to 20 MB
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div 
        style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          gap: '1rem' 
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, minWidth: '240px' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '380px' }}>
            <Search size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text"
              placeholder="Search notes by title or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input"
              style={{ paddingLeft: '2.25rem', fontSize: '0.875rem' }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Filter size={14} color="var(--text-dim)" />
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-dim)' }}>Filter by Module:</span>
          <select 
            value={selectedModuleFilter}
            onChange={(e) => setSelectedModuleFilter(e.target.value)}
            className="input"
            style={{ padding: '0.375rem 0.75rem', fontSize: '0.8125rem', minWidth: '180px' }}
          >
            <option value="ALL">All Modules ({notes.length})</option>
            {availableTopics.map((topic, i) => {
              const count = notes.filter(n => 
                n.moduleId === topic.toLowerCase().replace(/\s+/g, '-') ||
                n.moduleTitle.toLowerCase() === topic.toLowerCase()
              ).length;
              return (
                <option key={i} value={topic}>
                  {topic} ({count})
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* Notes Grid */}
      {isLoading ? (
        <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          <RefreshCw size={24} className="animate-spin" style={{ margin: '0 auto 0.75rem' }} />
          <span>Loading your study notes library...</span>
        </div>
      ) : filteredNotes.length === 0 ? (
        <div 
          className="card" 
          style={{ 
            padding: '3rem 2rem', 
            textAlign: 'center', 
            backgroundColor: 'var(--bg-surface)', 
            border: '1px dashed var(--border-color)' 
          }}
        >
          <FileText size={42} color="var(--text-dim)" style={{ margin: '0 auto 1rem', opacity: 0.6 }} />
          <h4 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
            No Notes Found
          </h4>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', maxWidth: '420px', margin: '0 auto 1.5rem' }}>
            {searchQuery 
              ? `No study notes matched "${searchQuery}". Try clearing your search query or module filter.` 
              : `You haven't attached any notes to ${selectedModuleFilter === 'ALL' ? 'this subject' : selectedModuleFilter} yet. Upload your handwritten notes or PDF slides to review them here!`}
          </p>
          <button 
            onClick={() => {
              fileInputRef.current?.click();
            }} 
            className="btn btn-primary"
            style={{ margin: '0 auto' }}
          >
            <Upload size={16} />
            <span>Upload Notes Now</span>
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem' }}>
          {filteredNotes.map(note => {
            const isPdf = note.fileType === 'application/pdf' || note.fileName.endsWith('.pdf');

            return (
              <div 
                key={note.id}
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '1.25rem',
                  backgroundColor: 'var(--bg-surface)',
                  transition: 'transform 0.15s ease, border-color 0.15s ease'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
                      <div 
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '0.5rem',
                          backgroundColor: isPdf ? 'rgba(239, 68, 68, 0.12)' : 'rgba(124, 58, 237, 0.12)',
                          color: isPdf ? '#ef4444' : 'var(--accent-primary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        {isPdf ? <FileText size={20} /> : <ImageIcon size={20} />}
                      </div>

                      <div style={{ minWidth: 0 }}>
                        <h4 
                          style={{ 
                            fontSize: '0.9375rem', 
                            fontWeight: 700, 
                            color: 'var(--text-main)', 
                            margin: 0,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}
                          title={note.fileName}
                        >
                          {note.fileName}
                        </h4>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block', marginTop: '0.125rem' }}>
                          {formatFileSize(note.fileSize)} • {new Date(note.uploadDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Attached Module Badge */}
                  <div style={{ marginBottom: '1rem' }}>
                    <span 
                      className="badge badge-indigo"
                      style={{ 
                        fontSize: '0.6875rem', 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '0.25rem' 
                      }}
                    >
                      <span>Attached:</span>
                      <strong>{note.moduleTitle}</strong>
                    </span>
                  </div>

                  {/* Extracted text preview if available */}
                  {note.extractedText && (
                    <p 
                      style={{ 
                        fontSize: '0.75rem', 
                        color: 'var(--text-muted)', 
                        lineHeight: 1.4, 
                        marginBottom: '1rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {note.extractedText}
                    </p>
                  )}
                </div>

                {/* Bottom Actions */}
                <div 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    paddingTop: '0.75rem', 
                    borderTop: '1px solid var(--border-color)',
                    fontSize: '0.8125rem' 
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button 
                      onClick={() => setActivePreviewNote(note)}
                      className="btn btn-primary btn-sm"
                      style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.375rem 0.75rem' }}
                    >
                      <Eye size={13} />
                      <span>Preview</span>
                    </button>

                    <button 
                      onClick={() => downloadNoteFile(note)}
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '0.375rem 0.625rem' }}
                      title="Download original file"
                    >
                      <Download size={13} />
                    </button>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    {onOpenLesson && (
                      <button 
                        onClick={() => onOpenLesson(note.moduleTitle || note.moduleId)}
                        className="btn btn-outline btn-sm"
                        style={{ fontSize: '0.6875rem', padding: '0.375rem 0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                        title="Read corresponding lesson"
                      >
                        <span>Lesson</span>
                        <ArrowRight size={11} />
                      </button>
                    )}

                    <button 
                      onClick={() => handleDeleteNote(note.id)}
                      className="btn btn-secondary btn-sm"
                      style={{ color: '#ef4444', padding: '0.375rem 0.5rem' }}
                      title="Delete note"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Upload Modal Dialog */}
      {showUploadModal && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(4px)',
            zIndex: 1100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            animation: 'fadeIn 0.2s ease'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget && !isUploading) setShowUploadModal(false);
          }}
        >
          <div 
            className="card" 
            style={{ 
              width: '100%', 
              maxWidth: '520px', 
              backgroundColor: 'var(--bg-surface)', 
              padding: '2rem',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Upload size={20} color="var(--accent-primary)" />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                  Upload Study Notes
                </h3>
              </div>
              <button 
                onClick={() => setShowUploadModal(false)}
                disabled={isUploading}
                style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Destination Module Selector (Required by prompt) */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.375rem' }}>
                Destination Engineering Module *
              </label>
              <select 
                value={selectedUploadModule}
                onChange={(e) => setSelectedUploadModule(e.target.value)}
                className="input"
                style={{ width: '100%', padding: '0.625rem' }}
                disabled={isUploading}
              >
                {availableTopics.map((topic, idx) => (
                  <option key={idx} value={topic}>
                    {idx + 1}. {topic}
                  </option>
                ))}
              </select>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.25rem', display: 'block' }}>
                Your note will be pinned and viewable directly inside this module's lesson.
              </span>
            </div>

            {/* Note Custom Title */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.375rem' }}>
                Note Title / Label (Optional)
              </label>
              <input 
                type="text" 
                placeholder="e.g. PN Junction V-I Derivations & Diagrams"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                className="input"
                style={{ width: '100%' }}
                disabled={isUploading}
              />
            </div>

            {/* Selected File Details or Picker */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.375rem' }}>
                Note File (PDF or PNG/JPG) *
              </label>

              {selectedFile ? (
                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    backgroundColor: 'var(--bg-dark)',
                    borderRadius: '0.5rem',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 0 }}>
                    {selectedFile.type.includes('pdf') ? <FileText size={18} color="#ef4444" /> : <ImageIcon size={18} color="var(--accent-primary)" />}
                    <div style={{ minWidth: 0 }}>
                      <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {selectedFile.name}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                        {formatFileSize(selectedFile.size)}
                      </span>
                    </div>
                  </div>

                  {!isUploading && (
                    <button 
                      onClick={() => setSelectedFile(null)}
                      style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              ) : (
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="btn btn-outline"
                  style={{ width: '100%', justifyContent: 'center', gap: '0.5rem', padding: '0.75rem' }}
                >
                  <Upload size={16} />
                  <span>Choose File from Computer</span>
                </button>
              )}
            </div>

            {/* Progress Bar */}
            {isUploading && (
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.25rem', color: 'var(--text-muted)' }}>
                  <span>Saving to local encrypted database...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div style={{ height: '6px', width: '100%', backgroundColor: 'var(--bg-dark)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div 
                    style={{ 
                      height: '100%', 
                      width: `${uploadProgress}%`, 
                      background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-emerald))',
                      transition: 'width 0.2s ease'
                    }} 
                  />
                </div>
              </div>
            )}

            {/* Success Message */}
            {uploadSuccess && (
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  padding: '0.75rem', 
                  backgroundColor: 'rgba(16, 185, 129, 0.1)', 
                  border: '1px solid var(--accent-emerald)', 
                  borderRadius: '0.5rem',
                  color: 'var(--accent-emerald)',
                  fontSize: '0.8125rem',
                  marginBottom: '1rem'
                }}
              >
                <CheckCircle2 size={16} />
                <span>{uploadSuccess}</span>
              </div>
            )}

            {/* Error Message */}
            {uploadError && (
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  padding: '0.75rem', 
                  backgroundColor: 'rgba(239, 68, 68, 0.1)', 
                  border: '1px solid #ef4444', 
                  borderRadius: '0.5rem',
                  color: '#ef4444',
                  fontSize: '0.8125rem',
                  marginBottom: '1rem'
                }}
              >
                <AlertCircle size={16} />
                <span>{uploadError}</span>
              </div>
            )}

            {/* Modal Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button 
                onClick={() => setShowUploadModal(false)}
                disabled={isUploading}
                className="btn btn-secondary"
              >
                Cancel
              </button>

              <button 
                onClick={handleExecuteUpload}
                disabled={isUploading || !selectedFile}
                className="btn btn-primary"
                style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}
              >
                {isUploading ? <RefreshCw size={14} className="animate-spin" /> : <Upload size={14} />}
                <span>{isUploading ? 'Uploading...' : 'Upload & Attach'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Note Previewer Modal */}
      {activePreviewNote && (
        <NotesViewerModal 
          note={activePreviewNote}
          onClose={() => setActivePreviewNote(null)}
          onNoteUpdated={refreshNotes}
          onNoteDeleted={refreshNotes}
        />
      )}
    </div>
  );
}
