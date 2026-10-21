/**
 * PrepMate Study Notes & Educational Storage Service
 * 
 * Supports:
 * - PDF documents (.pdf)
 * - Microsoft PowerPoint presentations (.ppt, .pptx)
 * - Microsoft Word documents (.doc, .docx)
 * - Plaintext & Markdown study notes (.txt, .md)
 * - Handwritten diagrams & schematics (.png, .jpg, .jpeg, .webp)
 * 
 * Storage Providers:
 * - Browser Persistent IndexedDB (Default offline/local high-capacity persistent storage)
 * - Cloudinary (Configured via VITE_CLOUDINARY_CLOUD_NAME & VITE_CLOUDINARY_UPLOAD_PRESET)
 * - S3-Compatible Object Storage (Configured via VITE_S3_ENDPOINT & VITE_S3_BUCKET)
 */

const DB_NAME = 'PrepMateStudyNotesDB';
const DB_VERSION = 2; // Incremented for new metadata schema
const STORE_NAME = 'study_notes';

export const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024; // 25 MB max limit

export const MATERIAL_TYPES = [
  'College Notes',
  'Lecture Slides',
  'Question Bank',
  'Solved Questions',
  'Lab Manual',
  'Reference Material',
  'Other'
];

export const ALLOWED_EXTENSIONS = [
  'pdf',
  'ppt',
  'pptx',
  'doc',
  'docx',
  'txt',
  'md',
  'png',
  'jpg',
  'jpeg',
  'webp'
];

export const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
  'text/markdown',
  'image/png',
  'image/jpeg',
  'image/webp'
];

const EXTENSION_TO_ALLOWED_MIME_TYPES = {
  pdf: ['application/pdf'],
  ppt: ['application/vnd.ms-powerpoint'],
  pptx: ['application/vnd.openxmlformats-officedocument.presentationml.presentation'],
  doc: ['application/msword'],
  docx: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  txt: ['text/plain'],
  md: ['text/plain', 'text/markdown', 'application/octet-stream'],
  png: ['image/png'],
  jpg: ['image/jpeg'],
  jpeg: ['image/jpeg'],
  webp: ['image/webp']
};

function mimeMatchesExtension(fileType, extension) {
  const normalizedType = String(fileType || '').toLowerCase().trim();
  const normalizedExtension = String(extension || '').toLowerCase().trim();

  if (!normalizedType) return true;
  const allowedMimeTypes = EXTENSION_TO_ALLOWED_MIME_TYPES[normalizedExtension] || [];
  if (!allowedMimeTypes.length) return false;
  return allowedMimeTypes.includes(normalizedType);
}

/**
 * Detects current active storage engine and credentials
 */
export function getStorageConfig() {
  const env = (typeof process !== 'undefined' && process.env) || (typeof import.meta !== 'undefined' && import.meta.env) || {};
  
  const provider = env.VITE_STORAGE_PROVIDER || 'indexeddb';
  const cloudinaryCloud = env.VITE_CLOUDINARY_CLOUD_NAME || null;
  const cloudinaryPreset = env.VITE_CLOUDINARY_UPLOAD_PRESET || null;
  const s3Endpoint = env.VITE_S3_ENDPOINT || null;
  const s3Bucket = env.VITE_S3_BUCKET || null;

  let activeEngine = 'indexeddb';
  let isCloudActive = false;

  if (provider === 'cloudinary' && cloudinaryCloud && cloudinaryPreset) {
    activeEngine = 'cloudinary';
    isCloudActive = true;
  } else if (provider === 's3' && s3Endpoint && s3Bucket) {
    activeEngine = 's3';
    isCloudActive = true;
  }

  return {
    provider: activeEngine,
    isCloudActive,
    details: activeEngine === 'cloudinary' 
      ? `Cloudinary (${cloudinaryCloud})` 
      : activeEngine === 's3' 
        ? `S3 Compatible (${s3Bucket})` 
        : 'Browser Persistent IndexedDB (Local Object Store)',
    cloudinary: { cloudName: cloudinaryCloud, preset: cloudinaryPreset },
    s3: { endpoint: s3Endpoint, bucket: s3Bucket }
  };
}

/**
 * Initializes and opens the IndexedDB database with proper indexes
 */
function openDB() {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB is not supported in this environment.'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      let store;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      } else {
        store = event.target.transaction.objectStore(STORE_NAME);
      }

      if (!store.indexNames.contains('subjectId')) {
        store.createIndex('subjectId', 'subjectId', { unique: false });
      }
      if (!store.indexNames.contains('moduleId')) {
        store.createIndex('moduleId', 'moduleId', { unique: false });
      }
      if (!store.indexNames.contains('branch')) {
        store.createIndex('branch', 'branch', { unique: false });
      }
      if (!store.indexNames.contains('uploadDate')) {
        store.createIndex('uploadDate', 'uploadDate', { unique: false });
      }
      if (!store.indexNames.contains('published')) {
        store.createIndex('published', 'published', { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Validates a file before processing
 */
export function validateStudyMaterialFile(file) {
  if (!file) {
    return { valid: false, error: 'No file selected for upload.' };
  }

  const fileName = file.name || '';
  const extension = fileName.includes('.') ? fileName.split('.').pop().toLowerCase() : '';
  const fileType = String(file.type || '').toLowerCase().trim();

  if (!ALLOWED_EXTENSIONS.includes(extension)) {
    return {
      valid: false,
      error: `Unsupported file extension (.${extension}). Allowed: PDF, PPT, PPTX, DOC, DOCX, TXT, PNG, JPG, WEBP.`
    };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
    return {
      valid: false,
      error: `File size (${sizeMB} MB) exceeds maximum allowed limit of 25 MB.`
    };
  }

  if (fileType && !ALLOWED_MIME_TYPES.includes(fileType)) {
    return {
      valid: false,
      error: `Unexpected MIME type for uploaded file: ${fileType}. Please upload a valid PDF, PPT, DOC, TXT, or image file.`
    };
  }

  if (fileType && !mimeMatchesExtension(fileType, extension)) {
    return {
      valid: false,
      error: `File extension and MIME type do not match for ${file.name}. Please verify the file is valid.`
    };
  }

  const isPdf = extension === 'pdf' || fileType === 'application/pdf';
  const isImage = ['png', 'jpg', 'jpeg', 'webp'].includes(extension) || fileType.startsWith('image/');
  const isPresentation = ['ppt', 'pptx'].includes(extension);
  const isWordDoc = ['doc', 'docx'].includes(extension);
  const isText = ['txt', 'md'].includes(extension) || fileType.startsWith('text/');

  return {
    valid: true,
    extension,
    isPdf,
    isImage,
    isPresentation,
    isWordDoc,
    isText
  };
}

/**
 * Backward compatibility alias for validateNoteFile
 */
export const validateNoteFile = validateStudyMaterialFile;

/**
 * Converts File to Base64 Data URL
 */
export function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

/**
 * Extracts preview text from documents
 */
export async function extractTextPreview(file) {
  try {
    if (file.type?.startsWith('text/') || file.name?.endsWith('.txt') || file.name?.endsWith('.md')) {
      const text = await file.text();
      return text.slice(0, 1500);
    }

    if (file.name?.endsWith('.pdf') || file.type === 'application/pdf') {
      const arrayBuffer = await file.arrayBuffer();
      const decoder = new TextDecoder('utf-8', { fatal: false });
      const content = decoder.decode(arrayBuffer);
      const matches = content.match(/\(([^()]{3,})\)/g);
      if (matches && matches.length > 5) {
        return matches
          .map(m => m.slice(1, -1))
          .filter(t => /[a-zA-Z]{3,}/.test(t))
          .slice(0, 100)
          .join(' ');
      }
    }
    return '';
  } catch (e) {
    return '';
  }
}

/**
 * Uploads file to Cloudinary if configured
 */
async function uploadToCloudinary(file, config) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', config.cloudinary.preset);
  formData.append('folder', 'prepmate_study_materials');

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${config.cloudinary.cloudName}/auto/upload`,
    {
      method: 'POST',
      body: formData
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Cloudinary upload failed: ${response.status} ${errorText}`);
  }

  const result = await response.json();
  return {
    url: result.secure_url || result.url,
    storageKey: result.public_id
  };
}

/**
 * Saves a new study note / document to storage
 */
export async function saveNote({
  branch = 'extc',
  branchName = 'EXTC / E&TC',
  subjectId = 'electronic_devices',
  subjectName = 'Electronic Devices & Circuits',
  moduleId = 'semiconductor-physics',
  moduleTitle = 'Semiconductor Physics',
  lessonId = null,
  materialType = 'College Notes',
  title = null,
  description = '',
  file,
  uploader = { name: 'Admin Instructor', role: 'Faculty / Administrator' },
  published = true,
  tags = []
}) {
  const validation = validateStudyMaterialFile(file);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const storageConfig = getStorageConfig();
  let fileUrl = null;
  let storageKey = `file_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
  let dataUrl = null;

  // Attempt cloud upload if configured
  if (storageConfig.isCloudActive && storageConfig.provider === 'cloudinary') {
    try {
      const cloudUpload = await uploadToCloudinary(file, storageConfig);
      fileUrl = cloudUpload.url;
      storageKey = cloudUpload.storageKey;
    } catch (cloudErr) {
      console.warn('Cloud storage failed, falling back to persistent IndexedDB:', cloudErr);
    }
  }

  // Always retain dataUrl for local instant preview / fallback
  dataUrl = await fileToDataUrl(file);
  const textPreview = await extractTextPreview(file);

  const finalTitle = title && title.trim() ? title.trim() : file.name.replace(/\.[^/.]+$/, '');
  const extension = file.name.split('.').pop().toLowerCase();

  const noteRecord = {
    id: `mat_${Date.now()}_${Math.random().toString(36).substr(2, 8)}`,
    title: finalTitle,
    description: description || '',
    branch,
    branchName,
    subjectId,
    subjectName,
    moduleId,
    moduleTitle,
    lessonId,
    materialType: MATERIAL_TYPES.includes(materialType) ? materialType : 'College Notes',
    fileName: finalTitle,
    originalFileName: file.name,
    fileSize: file.size,
    formattedSize: formatFileSize(file.size),
    fileType: file.type || `application/${extension}`,
    fileExtension: extension,
    storageKey,
    storageProvider: fileUrl ? storageConfig.provider : 'indexeddb',
    fileUrl: fileUrl || dataUrl,
    dataUrl,
    textPreview,
    uploader: uploader || { name: 'Faculty Member', role: 'Instructor' },
    published: published !== false,
    uploadDate: new Date().toISOString(),
    lastModified: new Date().toISOString(),
    tags: tags.length ? tags : [moduleTitle, branchName, materialType],
    isSample: false
  };

  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const request = store.add(noteRecord);

    request.onsuccess = () => resolve(noteRecord);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Retrieves notes with optional filtering
 */
export async function getAllNotes(filters = {}) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => {
      let results = request.result || [];

      // If called with a string, treat as subjectId for backward compatibility
      if (typeof filters === 'string') {
        results = results.filter(n => n.subjectId === filters);
      } else if (filters && typeof filters === 'object') {
        const { branch, subjectId, moduleId, publishedOnly, materialType, search } = filters;

        if (branch && branch !== 'ALL') {
          results = results.filter(n => n.branch === branch);
        }
        if (subjectId && subjectId !== 'ALL') {
          results = results.filter(n => n.subjectId === subjectId);
        }
        if (moduleId && moduleId !== 'ALL') {
          results = results.filter(n => n.moduleId === moduleId);
        }
        if (materialType && materialType !== 'ALL') {
          results = results.filter(n => n.materialType === materialType);
        }
        if (publishedOnly) {
          results = results.filter(n => n.published !== false);
        }
        if (search && search.trim()) {
          const q = search.toLowerCase().trim();
          results = results.filter(n => 
            (n.title && n.title.toLowerCase().includes(q)) ||
            (n.description && n.description.toLowerCase().includes(q)) ||
            (n.moduleTitle && n.moduleTitle.toLowerCase().includes(q)) ||
            (n.originalFileName && n.originalFileName.toLowerCase().includes(q)) ||
            (n.subjectName && n.subjectName.toLowerCase().includes(q))
          );
        }
      }

      // Sort newest first
      results.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
      resolve(results);
    };
    request.onerror = () => reject(request.error);
  });
}

/**
 * Retrieves notes attached to a specific module
 */
export async function getNotesForModule(subjectId, moduleId, publishedOnly = true) {
  const all = await getAllNotes();
  const cleanMod = String(moduleId).toLowerCase().replace(/[^a-z0-9]+/g, '-');

  return all.filter(n => {
    const matchesSubject = !subjectId || n.subjectId === subjectId;
    const noteMod = String(n.moduleId).toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const matchesModule = noteMod === cleanMod || n.moduleId === moduleId || n.moduleTitle?.toLowerCase() === String(moduleId).toLowerCase();
    const matchesPublished = !publishedOnly || n.published !== false;
    return matchesSubject && matchesModule && matchesPublished;
  });
}

/**
 * Retrieves a single note by ID
 */
export async function getNoteById(noteId) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const request = store.get(noteId);

    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Updates metadata for an existing note
 */
export async function updateNoteMetadata(noteId, updates = {}) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const getReq = store.get(noteId);

    getReq.onsuccess = () => {
      const record = getReq.result;
      if (!record) {
        reject(new Error('Material not found.'));
        return;
      }

      if (updates.title) record.title = updates.title.trim();
      if (updates.fileName) record.fileName = updates.fileName.trim();
      if (updates.description !== undefined) record.description = updates.description;
      if (updates.materialType) record.materialType = updates.materialType;
      if (updates.moduleId) record.moduleId = updates.moduleId;
      if (updates.moduleTitle) record.moduleTitle = updates.moduleTitle;
      if (updates.published !== undefined) record.published = updates.published;
      record.lastModified = new Date().toISOString();

      const updateReq = store.put(record);
      updateReq.onsuccess = () => resolve(record);
      updateReq.onerror = () => reject(updateReq.error);
    };
    getReq.onerror = () => reject(getReq.error);
  });
}

/**
 * Toggles published status
 */
export async function togglePublishNote(noteId, isPublished) {
  return updateNoteMetadata(noteId, { published: isPublished });
}

/**
 * Replaces the underlying file of an existing note
 */
export async function replaceNoteFile(noteId, newFile) {
  const validation = validateStudyMaterialFile(newFile);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const db = await openDB();
  const dataUrl = await fileToDataUrl(newFile);
  const textPreview = await extractTextPreview(newFile);
  const extension = newFile.name.split('.').pop().toLowerCase();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const getReq = store.get(noteId);

    getReq.onsuccess = () => {
      const record = getReq.result;
      if (!record) {
        reject(new Error('Study material not found.'));
        return;
      }

      record.fileSize = newFile.size;
      record.formattedSize = formatFileSize(newFile.size);
      record.fileType = newFile.type || `application/${extension}`;
      record.fileExtension = extension;
      record.originalFileName = newFile.name;
      record.dataUrl = dataUrl;
      record.fileUrl = dataUrl;
      record.textPreview = textPreview;
      record.lastModified = new Date().toISOString();

      const updateReq = store.put(record);
      updateReq.onsuccess = () => resolve(record);
      updateReq.onerror = () => reject(updateReq.error);
    };
    getReq.onerror = () => reject(getReq.error);
  });
}

/**
 * Deletes a note by ID
 */
export async function deleteNote(noteId) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const request = store.delete(noteId);

    request.onsuccess = () => resolve(true);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Triggers a browser download of the note file
 */
export function downloadNoteFile(note) {
  if (!note || (!note.dataUrl && !note.fileUrl)) return;
  const link = document.createElement('a');
  link.href = note.fileUrl || note.dataUrl;
  link.download = note.originalFileName || `${note.title || 'StudyMaterial'}.${note.fileExtension || 'pdf'}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Formats byte size into human readable string
 */
export function formatFileSize(bytes) {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

/**
 * Creates a valid, well-formed sample PDF data URL with custom title & subtitle
 */
function createSamplePdfDataUrl(title, branch = 'EXTC', desc = 'Mathematical derivations & exam notes.') {
  const pdfString = `%PDF-1.4
1 0 obj <</Type /Catalog /Pages 2 0 R>> endobj
2 0 obj <</Type /Pages /Kids [3 0 R] /Count 1>> endobj
3 0 obj <</Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources <</Font <</F1 5 0 R>>>>>> endobj
4 0 obj <</Length 240>> stream
BT
/F1 20 Tf
50 720 Td
(${title}) Tj
/F1 12 Tf
0 -40 Td
(PrepMate Study Notes - ${branch}) Tj
0 -25 Td
(${desc}) Tj
0 -25 Td
(Official College Notes uploaded by Instructor. Open for classroom review.) Tj
ET
endstream
endobj
5 0 obj <</Type /Font /Subtype /Type1 /BaseFont /Helvetica>> endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000244 00000 n 
0000000536 00000 n 
trailer <</Size 6 /Root 1 0 R>>
startxref
615
%%EOF`;

  return `data:application/pdf;base64,${btoa(pdfString)}`;
}

/**
 * Seeds initial curated sample study materials across EXTC, CS, DSA, OOP, DBMS, OS
 */
export async function seedDefaultStudyNotesIfEmpty() {
  try {
    const existing = await getAllNotes();
    if (existing.length > 0) return existing;

    const sampleNotes = [
      // EXTC - Semiconductor Physics
      {
        id: 'seed_semi_physics_notes',
        title: 'Prof. Kulkarni - Semiconductor Physics & Fermi Levels',
        description: 'Detailed derivations of intrinsic carrier concentration, mass action law, drift/diffusion currents, and Fermi level shifts.',
        branch: 'extc',
        branchName: 'EXTC / E&TC Engineering',
        subjectId: 'electronic_devices',
        subjectName: 'Electronic Devices & Circuits',
        moduleId: 'semiconductor-physics',
        moduleTitle: 'Semiconductor Physics',
        materialType: 'College Notes',
        fileName: 'Prof_Kulkarni_Semiconductor_Physics.pdf',
        originalFileName: 'Semiconductor_Physics_Handwritten_Notes.pdf',
        fileSize: 485000,
        formattedSize: '473.6 KB',
        fileType: 'application/pdf',
        fileExtension: 'pdf',
        storageKey: 'seed_semi_physics',
        storageProvider: 'indexeddb',
        dataUrl: createSamplePdfDataUrl('Semiconductor Physics & Fermi Level Derivations', 'EXTC', 'Energy band gap theory, mass-action law, carrier mobility.'),
        fileUrl: createSamplePdfDataUrl('Semiconductor Physics & Fermi Level Derivations', 'EXTC', 'Energy band gap theory, mass-action law, carrier mobility.'),
        uploader: { name: 'Prof. S. Kulkarni', role: 'Head of Electronics Dept' },
        published: true,
        uploadDate: new Date(Date.now() - 86400000 * 3).toISOString(),
        lastModified: new Date(Date.now() - 86400000 * 3).toISOString(),
        tags: ['EXTC', 'Semiconductor Physics', 'College Notes', 'Derivations'],
        isSample: true
      },
      // EXTC - PN Junction
      {
        id: 'seed_pn_junction_notes',
        title: 'PN Junction Space Charge & V-I Derivations',
        description: 'Depletion layer width W, built-in barrier potential V0, and Shockley diode equation derivations with diagrams.',
        branch: 'extc',
        branchName: 'EXTC / E&TC Engineering',
        subjectId: 'electronic_devices',
        subjectName: 'Electronic Devices & Circuits',
        moduleId: 'pn-junction',
        moduleTitle: 'PN Junction',
        materialType: 'Lecture Slides',
        fileName: 'PN_Junction_Depletion_Width.pdf',
        originalFileName: 'PN_Junction_Lecture_Slides.pdf',
        fileSize: 428000,
        formattedSize: '418.0 KB',
        fileType: 'application/pdf',
        fileExtension: 'pdf',
        storageKey: 'seed_pn_junction',
        storageProvider: 'indexeddb',
        dataUrl: createSamplePdfDataUrl('PN Junction Depletion Layer & V-I Characteristics', 'EXTC', 'Poisson equation space charge solution and barrier derivations.'),
        fileUrl: createSamplePdfDataUrl('PN Junction Depletion Layer & V-I Characteristics', 'EXTC', 'Poisson equation space charge solution and barrier derivations.'),
        uploader: { name: 'Prof. R. Sharma', role: 'Associate Professor' },
        published: true,
        uploadDate: new Date(Date.now() - 86400000 * 2).toISOString(),
        lastModified: new Date(Date.now() - 86400000 * 2).toISOString(),
        tags: ['EXTC', 'PN Junction', 'Lecture Slides'],
        isSample: true
      },
      // EXTC - Transistor Biasing
      {
        id: 'seed_bjt_biasing_notes',
        title: 'BJT Voltage Divider Bias & Stability Analysis',
        description: 'Complete analysis of voltage divider bias, thermal runaway, Q-point stabilization, and stability factor S derivations.',
        branch: 'extc',
        branchName: 'EXTC / E&TC Engineering',
        subjectId: 'electronic_devices',
        subjectName: 'Electronic Devices & Circuits',
        moduleId: 'transistor-biasing',
        moduleTitle: 'Transistor Biasing',
        materialType: 'Question Bank',
        fileName: 'BJT_Biasing_Stability_Solved_Problems.pdf',
        originalFileName: 'BJT_Biasing_Problems.pdf',
        fileSize: 315000,
        formattedSize: '307.6 KB',
        fileType: 'application/pdf',
        fileExtension: 'pdf',
        storageKey: 'seed_bjt_biasing',
        storageProvider: 'indexeddb',
        dataUrl: createSamplePdfDataUrl('BJT Transistor Biasing & Stability Factor S Derivations', 'EXTC', 'DC load line, Q-point stability, and thermal runaway prevention.'),
        fileUrl: createSamplePdfDataUrl('BJT Transistor Biasing & Stability Factor S Derivations', 'EXTC', 'DC load line, Q-point stability, and thermal runaway prevention.'),
        uploader: { name: 'Dr. V. Mehta', role: 'Faculty' },
        published: true,
        uploadDate: new Date(Date.now() - 86400000).toISOString(),
        lastModified: new Date(Date.now() - 86400000).toISOString(),
        tags: ['EXTC', 'Transistor Biasing', 'Solved Questions'],
        isSample: true
      },
      // CS - DSA: Queues
      {
        id: 'seed_dsa_queues_notes',
        title: 'Circular Queues & Monotonic Queue Architectures',
        description: 'Ring buffer arrays, two-pointer modular indexing, sliding window maximums, and lock-free concurrency queues.',
        branch: 'cs',
        branchName: 'Computer Science / IT',
        subjectId: 'dsa',
        subjectName: 'Data Structures & Algorithms',
        moduleId: 'queues',
        moduleTitle: 'Queues',
        materialType: 'College Notes',
        fileName: 'Prof_Gupta_Queues_And_Ring_Buffers.pdf',
        originalFileName: 'DSA_Queues_Comprehensive.pdf',
        fileSize: 390000,
        formattedSize: '380.9 KB',
        fileType: 'application/pdf',
        fileExtension: 'pdf',
        storageKey: 'seed_dsa_queues',
        storageProvider: 'indexeddb',
        dataUrl: createSamplePdfDataUrl('Circular Queues, Monotonic Queues & Ring Buffers', 'CS / IT', 'O(1) amortized enqueue/dequeue, BFS implementations, and Ring Buffer arrays.'),
        fileUrl: createSamplePdfDataUrl('Circular Queues, Monotonic Queues & Ring Buffers', 'CS / IT', 'O(1) amortized enqueue/dequeue, BFS implementations, and Ring Buffer arrays.'),
        uploader: { name: 'Prof. A. Gupta', role: 'Algorithms Professor' },
        published: true,
        uploadDate: new Date(Date.now() - 86400000 * 4).toISOString(),
        lastModified: new Date(Date.now() - 86400000 * 4).toISOString(),
        tags: ['DSA', 'Queues', 'College Notes'],
        isSample: true
      },
      // CS - OOP: SOLID Principles
      {
        id: 'seed_oop_solid_notes',
        title: 'SOLID Principles Enterprise Architecture Cheatsheet',
        description: 'Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion real code examples.',
        branch: 'cs',
        branchName: 'Computer Science / IT',
        subjectId: 'oop',
        subjectName: 'Object Oriented Programming',
        moduleId: 'solid-principles',
        moduleTitle: 'SOLID Principles',
        materialType: 'Reference Material',
        fileName: 'SOLID_Principles_Architecture_Guide.pdf',
        originalFileName: 'SOLID_Reference_Manual.pdf',
        fileSize: 520000,
        formattedSize: '507.8 KB',
        fileType: 'application/pdf',
        fileExtension: 'pdf',
        storageKey: 'seed_oop_solid',
        storageProvider: 'indexeddb',
        dataUrl: createSamplePdfDataUrl('SOLID Design Principles for Clean Code & Architecture', 'CS / IT', 'Clean Architecture, Dependency Injection, and refactoring anti-patterns.'),
        fileUrl: createSamplePdfDataUrl('SOLID Design Principles for Clean Code & Architecture', 'CS / IT', 'Clean Architecture, Dependency Injection, and refactoring anti-patterns.'),
        uploader: { name: 'Staff Engineer Mentor', role: 'Industry Visiting Faculty' },
        published: true,
        uploadDate: new Date(Date.now() - 86400000 * 5).toISOString(),
        lastModified: new Date(Date.now() - 86400000 * 5).toISOString(),
        tags: ['OOP', 'SOLID', 'Design Patterns'],
        isSample: true
      },
      // CS - DBMS: Normalization
      {
        id: 'seed_dbms_normalization_notes',
        title: 'Database Normalization: 1NF to BCNF with Solved Proofs',
        description: 'Lossless join decompositions, dependency preservation theorems, and step-by-step algorithms for testing 3NF vs BCNF.',
        branch: 'cs',
        branchName: 'Computer Science / IT',
        subjectId: 'dbms',
        subjectName: 'Database Management Systems',
        moduleId: 'normalization',
        moduleTitle: 'Normalization',
        materialType: 'Solved Questions',
        fileName: 'DBMS_Normalization_Solved_Decompositions.pdf',
        originalFileName: 'Normalization_Tutorial_Proofs.pdf',
        fileSize: 460000,
        formattedSize: '449.2 KB',
        fileType: 'application/pdf',
        fileExtension: 'pdf',
        storageKey: 'seed_dbms_normalization',
        storageProvider: 'indexeddb',
        dataUrl: createSamplePdfDataUrl('Database Normalization: 1NF to BCNF Step-by-Step Proofs', 'CS / IT', 'Functional dependency closure, minimal covers, and lossless decomposition.'),
        fileUrl: createSamplePdfDataUrl('Database Normalization: 1NF to BCNF Step-by-Step Proofs', 'CS / IT', 'Functional dependency closure, minimal covers, and lossless decomposition.'),
        uploader: { name: 'Prof. N. Deshmukh', role: 'DBMS Faculty' },
        published: true,
        uploadDate: new Date(Date.now() - 86400000 * 6).toISOString(),
        lastModified: new Date(Date.now() - 86400000 * 6).toISOString(),
        tags: ['DBMS', 'Normalization', 'Solved Questions'],
        isSample: true
      }
    ];

    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    sampleNotes.forEach(note => store.add(note));
    return sampleNotes;
  } catch (e) {
    console.warn('Could not seed sample study materials:', e);
    return [];
  }
}

/**
 * Backward compatibility alias
 */
export const seedDefaultExtcNotesIfEmpty = seedDefaultStudyNotesIfEmpty;
export const renameNote = (id, newTitle) => updateNoteMetadata(id, { title: newTitle, fileName: newTitle });
