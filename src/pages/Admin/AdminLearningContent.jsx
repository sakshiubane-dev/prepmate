import React, { useState, useEffect, useRef } from 'react';
import { 
  Upload, FileText, Image as ImageIcon, Search, Filter, Trash2, 
  Download, Eye, Edit2, CheckCircle2, AlertCircle, Plus, HardDrive, 
  Calendar, RefreshCw, X, Sparkles, FolderOpen, ArrowRight, ShieldCheck,
  Presentation, FileSpreadsheet, Lock, Check, ChevronRight, Layers,
  ExternalLink, Database, AlertTriangle, ArrowUpRight
} from 'lucide-react';
import { ALL_SUBJECTS } from '../../lib/data/subjects.js';
import { ENGINEERING_BRANCHES } from '../../lib/config/engineeringBranches.js';
import { 
  getAllNotes, saveNote, deleteNote, updateNoteMetadata, replaceNoteFile, 
  downloadNoteFile, formatFileSize, validateStudyMaterialFile, 
  MATERIAL_TYPES, getStorageConfig, seedDefaultStudyNotesIfEmpty,
  MAX_FILE_SIZE_BYTES
} from '../../lib/services/notesStorage.js';
import { runModuleImportSync } from '../../lib/services/moduleImporter.js';
import NotesViewerModal from '../../components/notes/NotesViewerModal.jsx';

export default function AdminLearningContent({ onNavigateToModule = null, isAdmin = false, canManageContent = false }) {

  // Storage and Notes State
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [storageConfig, setStorageConfig] = useState(() => getStorageConfig());

  // Form Cascading Selectors
  const [selectedBranch, setSelectedBranch] = useState('extc');
  const [selectedSubjectId, setSelectedSubjectId] = useState('electronic_devices');
  const [selectedModule, setSelectedModule] = useState('Semiconductor Physics');
  const [selectedTopic, setSelectedTopic] = useState('');
  
  // File Upload Form State
  const [materialType, setMaterialType] = useState('College Notes');
  const [customTitle, setCustomTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState(null);
  const [uploadErrorMessage, setUploadErrorMessage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Table Filters & Search
  const [filterBranch, setFilterBranch] = useState('ALL');
  const [filterSubject, setFilterSubject] = useState('ALL');
  const [filterType, setFilterType] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [activePreviewNote, setActivePreviewNote] = useState(null);
  const [editingNote, setEditingNote] = useState(null);
  const [replacingNote, setReplacingNote] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [importReport, setImportReport] = useState(null);

  const fileInputRef = useRef(null);
  const replaceFileInputRef = useRef(null);

  // Filter subjects for the selected branch in upload form
  const availableSubjectsForBranch = ALL_SUBJECTS.filter(s => s.branch === selectedBranch);

  // Active subject object
  const currentSubjectObj = ALL_SUBJECTS.find(s => s.id === selectedSubjectId) || availableSubjectsForBranch[0];
  const availableModules = currentSubjectObj?.topics || [];

  // When branch changes, auto-select first subject of that branch
  const handleBranchChange = (branchId) => {
    setSelectedBranch(branchId);
    const firstSubject = ALL_SUBJECTS.find(s => s.branch === branchId);
    if (firstSubject) {
      setSelectedSubjectId(firstSubject.id);
      if (firstSubject.topics?.length) {
        setSelectedModule(firstSubject.topics[0]);
      }
    }
  };

  // When subject changes, auto-select first module
  const handleSubjectChange = (subjectId) => {
    setSelectedSubjectId(subjectId);
    const sub = ALL_SUBJECTS.find(s => s.id === subjectId);
    if (sub && sub.topics?.length) {
      setSelectedModule(sub.topics[0]);
    }
  };

  // Load all notes from storage
  const loadNotesList = async () => {
    setIsLoading(true);
    try {
      await seedDefaultStudyNotesIfEmpty();
      const loaded = await getAllNotes();
      setNotes(loaded);
    } catch (err) {
      console.warn('Could not load study notes:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isAdmin || !canManageContent) {
      setIsLoading(false);
      return undefined;
    }
    loadNotesList();
    setStorageConfig(getStorageConfig());
  }, [isAdmin, canManageContent]);

  // Drag & drop handlers
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
      handleFilesSelected(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFilesSelected(Array.from(e.target.files));
    }
  };

  const handleFilesSelected = (files) => {
    setUploadErrorMessage(null);
    setUploadSuccessMessage(null);

    const validFiles = [];
    const errors = [];

    files.forEach(f => {
      const v = validateStudyMaterialFile(f);
      if (v.valid) {
        validFiles.push(f);
      } else {
        errors.push(`${f.name}: ${v.error}`);
      }
    });

    if (errors.length > 0) {
      setUploadErrorMessage(errors.join(' | '));
    }

    if (validFiles.length > 0) {
      setSelectedFiles(validFiles);
      if (validFiles.length === 1 && !customTitle) {
        setCustomTitle(validFiles[0].name.replace(/\.[^/.]+$/, ''));
      }
    }
  };

  const handleRemoveSelectedFile = (idx) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== idx));
  };

  // Execute Upload
  const handleExecuteUpload = async () => {
    if (!selectedFiles.length) {
      setUploadErrorMessage('Please select or drop at least one study material file.');
      return;
    }
    if (!selectedModule) {
      setUploadErrorMessage('Please select a target module.');
      return;
    }

    setIsUploading(true);
    setUploadProgress(15);
    setUploadErrorMessage(null);
    setUploadSuccessMessage(null);

    const progressTimer = setInterval(() => {
      setUploadProgress(p => (p < 85 ? p + 20 : p));
    }, 100);

    try {
      const branchObj = ENGINEERING_BRANCHES.find(b => b.id === selectedBranch);
      const subjectObj = ALL_SUBJECTS.find(s => s.id === selectedSubjectId);
      const moduleSlug = String(selectedModule).toLowerCase().replace(/[^a-z0-9]+/g, '-');

      let uploadedCount = 0;

      for (const file of selectedFiles) {
        const fileTitle = selectedFiles.length === 1 && customTitle.trim()
          ? customTitle.trim()
          : file.name.replace(/\.[^/.]+$/, '');

        await saveNote({
          branch: selectedBranch,
          branchName: branchObj?.label || selectedBranch,
          subjectId: selectedSubjectId,
          subjectName: subjectObj?.name || selectedSubjectId,
          moduleId: moduleSlug,
          moduleTitle: selectedModule,
          lessonId: selectedTopic || null,
          materialType,
          title: fileTitle,
          description: description.trim(),
          file,
          uploader: { name: 'Admin Faculty', role: 'Authorized Instructor' },
          published: true
        });

        uploadedCount++;
      }

      clearInterval(progressTimer);
      setUploadProgress(100);
      setUploadSuccessMessage(`Successfully uploaded ${uploadedCount} study document(s) to "${selectedModule}".`);
      setSelectedFiles([]);
      setCustomTitle('');
      setDescription('');
      if (fileInputRef.current) fileInputRef.current.value = '';
      
      // Refresh list
      await loadNotesList();
    } catch (err) {
      clearInterval(progressTimer);
      setUploadErrorMessage(err.message || 'Upload failed.');
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  // Replace file handler
  const handleReplaceFileChange = async (e) => {
    if (!replacingNote || !e.target.files?.length) return;
    const newFile = e.target.files[0];
    try {
      setIsLoading(true);
      await replaceNoteFile(replacingNote.id, newFile);
      setReplacingNote(null);
      await loadNotesList();
    } catch (err) {
      alert('Replace failed: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle Publish
  const handleTogglePublish = async (noteItem) => {
    try {
      await updateNoteMetadata(noteItem.id, { published: !noteItem.published });
      await loadNotesList();
    } catch (err) {
      alert('Could not change publication status: ' + err.message);
    }
  };

  // Delete note
  const handleDeleteNote = async (id) => {
    try {
      await deleteNote(id);
      setDeleteConfirmId(null);
      await loadNotesList();
    } catch (err) {
      alert('Failed to delete: ' + err.message);
    }
  };

  // Run Idempotent Module Sync Script
  const handleRunModuleSync = () => {
    const report = runModuleImportSync();
    setImportReport(report);
  };

  // Filtered notes list for table
  const filteredNotes = notes.filter(n => {
    const matchBranch = filterBranch === 'ALL' || n.branch === filterBranch;
    const matchSub = filterSubject === 'ALL' || n.subjectId === filterSubject;
    const matchType = filterType === 'ALL' || n.materialType === filterType;
    const q = searchQuery.toLowerCase().trim();
    const matchSearch = !q || (
      (n.title && n.title.toLowerCase().includes(q)) ||
      (n.moduleTitle && n.moduleTitle.toLowerCase().includes(q)) ||
      (n.originalFileName && n.originalFileName.toLowerCase().includes(q)) ||
      (n.subjectName && n.subjectName.toLowerCase().includes(q))
    );
    return matchBranch && matchSub && matchType && matchSearch;
  });

  if (!isAdmin) {
    return (
      <div style={{ maxWidth: '480px', margin: '4rem auto', padding: '1rem' }}>
        <div className="card" style={{ padding: '2.5rem', textAlign: 'center' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '1rem',
            backgroundColor: 'rgba(124, 58, 237, 0.15)',
            color: 'var(--accent-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem'
          }}>
            <Lock size={28} />
          </div>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
            Faculty & Admin Portal
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
            This account does not have an administrator role.
          </p>

        </div>
      </div>
    );
  }

  if (!canManageContent) {
    return (
      <div style={{ maxWidth: '640px', margin: '4rem auto', padding: '1rem' }}>
        <div className="card" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.75rem' }}>Admin content management is disabled</h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
            Admin identity is verified from the user_roles table, but note uploads, edits, publishing, deletion, and module sync remain disabled until trusted backend authorization and storage are configured.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '2.5rem 3rem', maxWidth: '1440px', margin: '0 auto' }}>
      {/* Header Banner */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', margin: 0 }}>
              Learning Content & Notes Studio
            </h1>
            <span className="badge badge-indigo" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <ShieldCheck size={13} />
              Admin Mode
            </span>
          </div>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)' }}>
            Upload, categorize, and manage lecture slides, handwritten professor notes, question banks, and lab manuals directly attached to specific branches and modules.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button 
            onClick={handleRunModuleSync} 
            className="btn btn-outline btn-sm"
            style={{ gap: '0.5rem' }}
            title="Verify and synchronize module order without altering existing notes"
          >
            <RefreshCw size={14} />
            <span>Verify Module Integrity</span>
          </button>

        </div>
      </div>

      {/* Storage Provider Status Banner */}
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: '0.75rem',
        padding: '0.875rem 1.25rem',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '0.375rem',
            backgroundColor: storageConfig.isCloudActive ? 'rgba(16, 185, 129, 0.15)' : 'rgba(124, 58, 237, 0.15)',
            color: storageConfig.isCloudActive ? 'var(--accent-emerald)' : 'var(--accent-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <HardDrive size={16} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)' }}>
                Active Storage Engine: {storageConfig.details}
              </span>
              <span className={`badge ${storageConfig.isCloudActive ? 'badge-emerald' : 'badge-indigo'}`} style={{ fontSize: '0.6875rem' }}>
                {storageConfig.isCloudActive ? 'Cloud Live' : 'Persistent IndexedDB'}
              </span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
              Total uploaded study materials: <strong>{notes.length}</strong> items • Max limit: 25 MB per file
            </span>
          </div>
        </div>

        <div style={{ fontSize: '0.8125rem', color: 'var(--text-dim)' }}>
          To enable Cloudinary or S3 storage, set credentials in <code>.env</code> (see <code>.env.example</code>).
        </div>
      </div>

      {/* Import / Sync Report Alert */}
      {importReport && (
        <div style={{
          backgroundColor: 'rgba(16, 185, 129, 0.08)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: '0.75rem',
          padding: '1.25rem',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>
              <CheckCircle2 size={18} />
              <span>Module Integrity Check Completed</span>
            </div>
            <button onClick={() => setImportReport(null)} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}>
              <X size={16} />
            </button>
          </div>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', margin: '0 0 0.5rem' }}>
            Checked <strong>{importReport.totalSubjectsChecked}</strong> core subject categories. Preserved all existing user progress and lessons.
          </p>
          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem' }}>
            <span style={{ color: 'var(--accent-emerald)' }}>✓ {importReport.skipped} Canonical Modules Verified & Preserved</span>
            {importReport.created > 0 && <span style={{ color: 'var(--accent-primary)' }}>+ {importReport.created} New Modules Registered</span>}
          </div>
        </div>
      )}

      {/* 2-COLUMN WORKSPACE: LEFT UPLOAD FORM, RIGHT RECENT / STATS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '2rem', marginBottom: '2.5rem' }}>
        {/* Upload Form Card */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <Upload size={18} color="var(--accent-primary)" />
            <h2 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
              Upload New Study Material
            </h2>
          </div>

          {/* 1. Branch Selector */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
              1. Engineering Branch
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.5rem' }}>
              {ENGINEERING_BRANCHES.map(b => (
                <button
                  type="button"
                  key={b.id}
                  onClick={() => handleBranchChange(b.id)}
                  className={`btn btn-sm ${selectedBranch === b.id ? 'btn-primary' : 'btn-outline'}`}
                  style={{ padding: '0.5rem 0.75rem', fontSize: '0.8125rem', justifyContent: 'center' }}
                >
                  {b.shortLabel || b.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Subject Selector */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', marginBottom: '0.375rem', textTransform: 'uppercase' }}>
                2. Subject ({availableSubjectsForBranch.length})
              </label>
              <select
                value={selectedSubjectId}
                onChange={(e) => handleSubjectChange(e.target.value)}
                className="input"
                style={{ width: '100%', padding: '0.625rem 0.75rem', fontSize: '0.875rem' }}
              >
                {availableSubjectsForBranch.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Module Selector */}
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', marginBottom: '0.375rem', textTransform: 'uppercase' }}>
                3. Target Module ({availableModules.length})
              </label>
              <select
                value={selectedModule}
                onChange={(e) => setSelectedModule(e.target.value)}
                className="input"
                style={{ width: '100%', padding: '0.625rem 0.75rem', fontSize: '0.875rem' }}
              >
                {availableModules.map((m, idx) => (
                  <option key={idx} value={m}>
                    {idx + 1}. {m}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 4. Material Type & Custom Title */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', marginBottom: '0.375rem', textTransform: 'uppercase' }}>
                4. Material Type
              </label>
              <select
                value={materialType}
                onChange={(e) => setMaterialType(e.target.value)}
                className="input"
                style={{ width: '100%', padding: '0.625rem 0.75rem', fontSize: '0.875rem' }}
              >
                {MATERIAL_TYPES.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', marginBottom: '0.375rem', textTransform: 'uppercase' }}>
                File Title (Custom)
              </label>
              <input
                type="text"
                placeholder="e.g. Prof. Sharma - PN Junction Derivations"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                className="input"
                style={{ width: '100%', padding: '0.625rem 0.75rem', fontSize: '0.875rem' }}
              />
            </div>
          </div>

          {/* Optional Description */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', marginBottom: '0.375rem', textTransform: 'uppercase' }}>
              Optional Description / Topics Covered
            </label>
            <input
              type="text"
              placeholder="e.g. Complete classroom derivations of depletion width, Fermi levels, and practice questions."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input"
              style={{ width: '100%', padding: '0.625rem 0.75rem', fontSize: '0.875rem' }}
            />
          </div>

          {/* Drag & Drop Upload Zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            style={{
              border: isDragging ? '2px dashed var(--accent-primary)' : '2px dashed var(--border-color)',
              backgroundColor: isDragging ? 'rgba(124, 58, 237, 0.08)' : 'var(--bg-dark)',
              borderRadius: '0.75rem',
              padding: '2rem 1.5rem',
              textAlign: 'center',
              cursor: 'pointer',
              marginBottom: '1.25rem',
              transition: 'all 0.2s ease'
            }}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInputChange}
              multiple
              accept=".pdf,.ppt,.pptx,.doc,.docx,.txt,.md,.png,.jpg,.jpeg,.webp"
              style={{ display: 'none' }}
            />
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: 'rgba(124, 58, 237, 0.15)',
              color: 'var(--accent-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem'
            }}>
              <Upload size={24} />
            </div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
              Drag & Drop study documents here, or click to browse
            </h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', margin: 0 }}>
              Supports PDF, PPT, PPTX, DOC, DOCX, TXT, PNG, JPG (up to 25 MB per file)
            </p>
          </div>

          {/* Selected Files Preview List */}
          {selectedFiles.length > 0 && (
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                Selected Files ({selectedFiles.length})
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {selectedFiles.map((file, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.625rem 0.875rem',
                    backgroundColor: 'var(--bg-dark)',
                    borderRadius: '0.5rem',
                    border: '1px solid var(--border-color)',
                    fontSize: '0.8125rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', overflow: 'hidden' }}>
                      <FileText size={16} color="var(--accent-primary)" style={{ flexShrink: 0 }} />
                      <span style={{ color: 'var(--text-main)', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {file.name}
                      </span>
                      <span style={{ color: 'var(--text-dim)', fontSize: '0.75rem', flexShrink: 0 }}>
                        ({formatFileSize(file.size)})
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveSelectedFile(idx);
                      }}
                      style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.25rem' }}
                      title="Remove"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Progress bar */}
          {isUploading && (
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '0.25rem' }}>
                <span>Uploading study material...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div style={{ height: '6px', backgroundColor: 'var(--bg-dark)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${uploadProgress}%`, backgroundColor: 'var(--accent-primary)', transition: 'width 0.2s ease' }} />
              </div>
            </div>
          )}

          {/* Alerts */}
          {uploadErrorMessage && (
            <div style={{ padding: '0.75rem 1rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '0.5rem', color: '#ef4444', fontSize: '0.8125rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span>{uploadErrorMessage}</span>
            </div>
          )}

          {uploadSuccessMessage && (
            <div style={{ padding: '0.75rem 1rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '0.5rem', color: 'var(--accent-emerald)', fontSize: '0.8125rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={16} style={{ flexShrink: 0 }} />
              <span>{uploadSuccessMessage}</span>
            </div>
          )}

          {/* Upload Button */}
          <button
            type="button"
            onClick={handleExecuteUpload}
            disabled={isUploading || selectedFiles.length === 0}
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '0.875rem' }}
          >
            <Upload size={16} />
            <span>Publish Material to {selectedModule}</span>
          </button>
        </div>

        {/* Right Column: Quick Status & Attached Materials Overview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Target Module Preview Card */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                Active Target Module
              </div>
              <span className="badge badge-indigo">{selectedBranch.toUpperCase()}</span>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
              {selectedModule}
            </h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Under: <strong>{currentSubjectObj?.name}</strong>
            </p>

            <div style={{ padding: '0.875rem', backgroundColor: 'var(--bg-dark)', borderRadius: '0.5rem', border: '1px solid var(--border-color)', marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '0.25rem' }}>
                Attached Materials in this Module:
              </div>
              {(() => {
                const modSlug = String(selectedModule).toLowerCase().replace(/[^a-z0-9]+/g, '-');
                const attached = notes.filter(n => 
                  n.subjectId === selectedSubjectId && 
                  (n.moduleId === modSlug || n.moduleTitle?.toLowerCase() === selectedModule.toLowerCase())
                );
                return (
                  <div>
                    <span style={{ fontSize: '1.125rem', fontWeight: 800, color: attached.length ? 'var(--accent-emerald)' : 'var(--text-dim)' }}>
                      {attached.length} file(s) available
                    </span>
                    {attached.length > 0 && (
                      <ul style={{ margin: '0.5rem 0 0', paddingLeft: '1.25rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {attached.slice(0, 3).map((a, i) => (
                          <li key={i}>{a.title} ({a.materialType})</li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })()}
            </div>

            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              💡 When you publish materials here, students will immediately see them under the <strong>Study Materials</strong> section when they click "Read Lesson" on this module.
            </div>
          </div>

          {/* Material Type Guidelines */}
          <div className="card">
            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
              Recommended Study Categories
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.75rem' }}>
              <div style={{ padding: '0.5rem', backgroundColor: 'var(--bg-dark)', borderRadius: '0.375rem', border: '1px solid var(--border-color)' }}>
                <strong style={{ color: 'var(--accent-primary)', display: 'block' }}>College Notes</strong>
                <span style={{ color: 'var(--text-dim)' }}>Professor derivations & formula sheets</span>
              </div>
              <div style={{ padding: '0.5rem', backgroundColor: 'var(--bg-dark)', borderRadius: '0.375rem', border: '1px solid var(--border-color)' }}>
                <strong style={{ color: '#f97316', display: 'block' }}>Lecture Slides</strong>
                <span style={{ color: 'var(--text-dim)' }}>PPT / PPTX presentations</span>
              </div>
              <div style={{ padding: '0.5rem', backgroundColor: 'var(--bg-dark)', borderRadius: '0.375rem', border: '1px solid var(--border-color)' }}>
                <strong style={{ color: 'var(--accent-emerald)', display: 'block' }}>Question Bank</strong>
                <span style={{ color: 'var(--text-dim)' }}>University & MNC interview sets</span>
              </div>
              <div style={{ padding: '0.5rem', backgroundColor: 'var(--bg-dark)', borderRadius: '0.375rem', border: '1px solid var(--border-color)' }}>
                <strong style={{ color: '#3b82f6', display: 'block' }}>Lab Manual</strong>
                <span style={{ color: 'var(--text-dim)' }}>Circuit diagrams & code outputs</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* REPOSITORY TABLE: ALL UPLOADED FILES WITH FILTERS & ACTIONS */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 0.25rem' }}>
              Uploaded Study Materials Repository ({filteredNotes.length})
            </h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', margin: 0 }}>
              Search, filter, edit metadata, replace underlying files, or unpublish educational materials.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            {/* Search */}
            <div style={{ position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
              <input
                type="text"
                placeholder="Search materials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input"
                style={{ padding: '0.45rem 0.75rem 0.45rem 2.25rem', fontSize: '0.8125rem', width: '220px' }}
              />
            </div>

            {/* Filter Branch */}
            <select
              value={filterBranch}
              onChange={(e) => setFilterBranch(e.target.value)}
              className="input"
              style={{ padding: '0.45rem 0.75rem', fontSize: '0.8125rem' }}
            >
              <option value="ALL">All Branches</option>
              {ENGINEERING_BRANCHES.map(b => (
                <option key={b.id} value={b.id}>{b.shortLabel || b.label}</option>
              ))}
            </select>

            {/* Filter Type */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="input"
              style={{ padding: '0.45rem 0.75rem', fontSize: '0.8125rem' }}
            >
              <option value="ALL">All Material Types</option>
              {MATERIAL_TYPES.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        {isLoading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-dim)' }}>
            Loading study documents...
          </div>
        ) : filteredNotes.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-dim)' }}>
            <FolderOpen size={40} style={{ margin: '0 auto 0.75rem', opacity: 0.5 }} />
            <h4 style={{ fontSize: '1rem', color: 'var(--text-main)', marginBottom: '0.25rem' }}>No materials match your filters</h4>
            <p style={{ fontSize: '0.8125rem' }}>Upload files using the studio form above or clear your search filters.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8125rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-dim)' }}>
                  <th style={{ padding: '0.75rem 1rem' }}>Title & Description</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Branch & Subject</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Module</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Type</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Format & Size</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Status</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredNotes.map(item => {
                  const ext = (item.fileExtension || item.originalFileName?.split('.').pop() || '').toUpperCase();
                  const isPublished = item.published !== false;

                  return (
                    <tr key={item.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background-color 0.15s ease' }}>
                      <td style={{ padding: '0.875rem 1rem', maxWidth: '280px' }}>
                        <div style={{ fontWeight: 700, color: 'var(--text-main)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {item.title || item.fileName}
                        </div>
                        {item.description && (
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {item.description}
                          </div>
                        )}
                        <div style={{ fontSize: '0.6875rem', color: 'var(--text-dim)', marginTop: '0.125rem' }}>
                          {item.originalFileName}
                        </div>
                      </td>

                      <td style={{ padding: '0.875rem 1rem', whiteSpace: 'nowrap' }}>
                        <div style={{ color: 'var(--text-main)', fontWeight: 600 }}>{item.subjectName}</div>
                        <div style={{ fontSize: '0.6875rem', color: 'var(--text-dim)' }}>{item.branchName}</div>
                      </td>

                      <td style={{ padding: '0.875rem 1rem', whiteSpace: 'nowrap' }}>
                        <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>
                          {item.moduleTitle}
                        </span>
                      </td>

                      <td style={{ padding: '0.875rem 1rem', whiteSpace: 'nowrap' }}>
                        <span className="badge badge-indigo" style={{ fontSize: '0.6875rem' }}>
                          {item.materialType}
                        </span>
                      </td>

                      <td style={{ padding: '0.875rem 1rem', whiteSpace: 'nowrap' }}>
                        <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{ext}</span>
                        <span style={{ color: 'var(--text-dim)', marginLeft: '0.35rem' }}>
                          ({item.formattedSize || formatFileSize(item.fileSize)})
                        </span>
                      </td>

                      <td style={{ padding: '0.875rem 1rem', whiteSpace: 'nowrap' }}>
                        <button
                          onClick={() => handleTogglePublish(item)}
                          className={`badge ${isPublished ? 'badge-emerald' : 'badge-amber'}`}
                          style={{ cursor: 'pointer', border: 'none' }}
                          title="Click to toggle publish status"
                        >
                          {isPublished ? 'Published' : 'Draft / Hidden'}
                        </button>
                      </td>

                      <td style={{ padding: '0.875rem 1rem', textAlign: 'right', whiteSpace: 'nowrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.375rem' }}>
                          {/* Preview in modal */}
                          <button
                            onClick={() => setActivePreviewNote(item)}
                            className="btn btn-secondary btn-sm"
                            style={{ padding: '0.3rem 0.5rem' }}
                            title="Preview file"
                          >
                            <Eye size={13} />
                          </button>

                          {/* Download */}
                          <button
                            onClick={() => downloadNoteFile(item)}
                            className="btn btn-secondary btn-sm"
                            style={{ padding: '0.3rem 0.5rem' }}
                            title="Download file"
                          >
                            <Download size={13} />
                          </button>

                          {/* Edit Metadata */}
                          <button
                            onClick={() => setEditingNote(item)}
                            className="btn btn-secondary btn-sm"
                            style={{ padding: '0.3rem 0.5rem' }}
                            title="Edit metadata"
                          >
                            <Edit2 size={13} />
                          </button>

                          {/* Replace File */}
                          <button
                            onClick={() => {
                              setReplacingNote(item);
                              replaceFileInputRef.current?.click();
                            }}
                            className="btn btn-secondary btn-sm"
                            style={{ padding: '0.3rem 0.5rem' }}
                            title="Replace underlying file"
                          >
                            <RefreshCw size={13} />
                          </button>

                          {/* Delete with confirmation */}
                          {deleteConfirmId === item.id ? (
                            <div style={{ display: 'inline-flex', gap: '0.25rem' }}>
                              <button
                                onClick={() => handleDeleteNote(item.id)}
                                className="btn btn-sm"
                                style={{ backgroundColor: '#ef4444', color: 'white', padding: '0.3rem 0.5rem' }}
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => setDeleteConfirmId(null)}
                                className="btn btn-secondary btn-sm"
                                style={{ padding: '0.3rem 0.5rem' }}
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirmId(item.id)}
                              className="btn btn-secondary btn-sm"
                              style={{ padding: '0.3rem 0.5rem', color: '#ef4444' }}
                              title="Delete file"
                            >
                              <Trash2 size={13} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Hidden input for replacing file */}
      <input
        type="file"
        ref={replaceFileInputRef}
        onChange={handleReplaceFileChange}
        style={{ display: 'none' }}
        accept=".pdf,.ppt,.pptx,.doc,.docx,.txt,.md,.png,.jpg,.jpeg,.webp"
      />

      {/* Preview Modal */}
      {activePreviewNote && (
        <NotesViewerModal
          note={activePreviewNote}
          onClose={() => setActivePreviewNote(null)}
          onNoteUpdated={loadNotesList}
          onNoteDeleted={loadNotesList}
          isAdmin={true}
        />
      )}

      {/* Edit Metadata Modal */}
      {editingNote && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.8)',
          zIndex: 1100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div className="card" style={{ maxWidth: '520px', width: '100%', padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                Edit Material Metadata
              </h3>
              <button onClick={() => setEditingNote(null)} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', marginBottom: '0.375rem', textTransform: 'uppercase' }}>
                Title
              </label>
              <input
                type="text"
                value={editingNote.title}
                onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })}
                className="input"
                style={{ width: '100%', padding: '0.625rem 0.75rem' }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', marginBottom: '0.375rem', textTransform: 'uppercase' }}>
                Description
              </label>
              <textarea
                value={editingNote.description || ''}
                onChange={(e) => setEditingNote({ ...editingNote, description: e.target.value })}
                className="input"
                rows={3}
                style={{ width: '100%', padding: '0.625rem 0.75rem', resize: 'vertical' }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', marginBottom: '0.375rem', textTransform: 'uppercase' }}>
                Material Type
              </label>
              <select
                value={editingNote.materialType}
                onChange={(e) => setEditingNote({ ...editingNote, materialType: e.target.value })}
                className="input"
                style={{ width: '100%', padding: '0.625rem 0.75rem' }}
              >
                {MATERIAL_TYPES.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => setEditingNote(null)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={async () => {
                  await updateNoteMetadata(editingNote.id, {
                    title: editingNote.title,
                    description: editingNote.description,
                    materialType: editingNote.materialType
                  });
                  setEditingNote(null);
                  await loadNotesList();
                }}
                className="btn btn-primary"
              >
                Save Metadata
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
