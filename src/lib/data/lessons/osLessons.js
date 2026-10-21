/**
 * PrepMate OS (Operating Systems) Lesson Content Registry
 * Covers all 12 core OS modules following the standard lesson schema.
 */

export const OS_LESSONS = {
  'processes': {
    id: 'processes',
    subjectId: 'os',
    order: 1,
    title: 'Processes',
    estimatedTime: '35 mins',
    learningObjectives: [
      'Define a Process as a program in execution with its own virtual address space.',
      'Analyze the Process Control Block (PCB): PID, registers, program counter, open files, accounting.',
      'Understand Process Lifecycle States: New, Ready, Running, Waiting/Blocked, Terminated.',
      'Explore context switching overhead, fork(), exec(), wait(), and exit() system calls.'
    ],
    prerequisites: ['Basic computer architecture'],
    theoryAndConcepts: [
      {
        heading: '1. What is a Process?',
        content: `A process is an active instance of a computer program being executed by one or many threads. Unlike passive code on disk, a process possesses active runtime context:
- Text Section: The compiled executable machine instructions.
- Data Section: Global and static variables.
- Heap: Dynamically allocated memory during runtime (malloc / new).
- Stack: Local variables, function parameters, and return addresses.`
      }
    ],
    interviewQuestions: [
      {
        q: "What causes a Context Switch and why is it considered computationally expensive?",
        a: "A context switch occurs when the OS CPU scheduler preempts a running process to switch to another (due to time-slice expiry, I/O wait, or high-priority interrupts). It is expensive because it requires saving/restoring CPU registers, potential address-space and cache effects; a TLB flush is not required on every context switch, and CPU caches are not necessarily invalidated."
      }
    ]
  },

  'threads': {
    id: 'threads',
    subjectId: 'os',
    order: 2,
    title: 'Threads',
    estimatedTime: '35 mins',
    learningObjectives: [
      'Define a Thread as a lightweight unit of CPU utilization within a parent process.',
      'Differentiate User-level Threads (ULT) vs Kernel-level Threads (KLT).',
      'Understand thread memory sharing: shared code/heap vs private stack/registers.'
    ],
    prerequisites: ['Processes'],
    theoryAndConcepts: [
      { heading: '1. Threads and shared memory', content: `Threads are execution paths within a process. Threads usually share the process address space and open resources but have separate stacks and register states. A data race occurs when unsynchronized threads access shared data and at least one access writes.` },
      { heading: '2. Practical details and common pitfalls', content: `User-level threading can be managed by a runtime; kernel threads are scheduled by the OS. Thread scheduling, blocking behavior, and mappings vary by platform.` }
    ],
  },

  'cpu-scheduling': {
    id: 'cpu-scheduling',
    subjectId: 'os',
    order: 3,
    title: 'CPU Scheduling',
    estimatedTime: '40 mins',
    learningObjectives: [
      'Understand Preemptive vs Non-Preemptive scheduling paradigms.',
      'Evaluate scheduling metrics: Turnaround Time, Waiting Time, Response Time, Throughput, CPU Utilization.'
    ],
    prerequisites: ['Processes'],
    theoryAndConcepts: [
      { heading: '1. Scheduling metrics', content: `CPU scheduling selects which ready process or thread receives processor time. Turnaround time = completion time - arrival time; waiting time = turnaround time - CPU burst time (for a simple single-burst workload); response time = first run time - arrival time.` },
      { heading: '2. Practical details and common pitfalls', content: `Preemptive schedulers can interrupt running tasks; non-preemptive schedulers wait for blocking or completion. Compare throughput, fairness, latency, and context-switch overhead.` }
    ],
  },

  'synchronization': {
    id: 'synchronization',
    subjectId: 'os',
    order: 4,
    title: 'Synchronization',
    estimatedTime: '45 mins',
    learningObjectives: [
      'Identify Race Conditions in multi-threaded programs.',
      'Master the Critical Section problem criteria: Mutual Exclusion, Progress, Bounded Waiting.',
      'Understand hardware primitives: Test-And-Set (TAS), Compare-And-Swap (CAS).',
      'Compare Mutexes, Counting/Binary Semaphores, Condition Variables, and Monitors.'
    ],
    prerequisites: ['Threads'],
    theoryAndConcepts: [
      { heading: '1. Critical sections and coordination', content: `A critical section accesses shared state that must not be modified concurrently. A mutex provides mutual exclusion; a counting semaphore manages a number of permits; a condition variable allows a thread to wait for a condition while releasing a lock.` },
      { heading: '2. Practical details and common pitfalls', content: `Example: incrementing a shared counter is a read-modify-write operation and is not automatically atomic. Protect it with a mutex or use an appropriate atomic operation. Locks must be released on every control path.` }
    ],
  },

  'deadlocks': {
    id: 'deadlocks',
    subjectId: 'os',
    order: 5,
    title: 'Deadlocks',
    estimatedTime: '40 mins',
    learningObjectives: [
      'The 4 Coffman Conditions: Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait.',
      'Deadlock Prevention vs Avoidance (Banker\'s Algorithm) vs Detection and Recovery.'
    ],
    prerequisites: ['Synchronization'],
    theoryAndConcepts: [
      { heading: '1. Deadlock conditions and handling', content: `A deadlock requires four conditions together: mutual exclusion, hold and wait, no preemption, and circular wait. Example: thread A holds lock X and waits for Y while thread B holds Y and waits for X.` },
      { heading: '2. Practical details and common pitfalls', content: `Prevent circular wait by acquiring locks in a global order. Banker’s algorithm avoids unsafe allocations when maximum resource demands are known; detection and recovery are other strategies.` }
    ],
  },

  'memory-management': {
    id: 'memory-management',
    subjectId: 'os',
    order: 6,
    title: 'Memory Management',
    estimatedTime: '35 mins',
    learningObjectives: [
      'Logical vs Physical address spaces and the Memory Management Unit (MMU).',
      'Analyze Contiguous Memory Allocation, Internal Fragmentation, and External Fragmentation.',
      'Compare allocation strategies: First Fit, Best Fit, Worst Fit.'
    ],
    prerequisites: ['Processes'],
    theoryAndConcepts: [
      { heading: '1. Address translation and allocation', content: `Programs use virtual addresses translated by the memory management unit (MMU) to physical memory. Allocation strategies include first fit, best fit, and worst fit. Contiguous allocation can suffer external fragmentation; fixed-size blocks can waste space internally.` },
      { heading: '2. Practical details and common pitfalls', content: `Virtual address spaces isolate processes and enable protection. The actual memory layout, page size, and translation structures depend on the OS and CPU architecture.` }
    ],
  },

  'virtual-memory': {
    id: 'virtual-memory',
    subjectId: 'os',
    order: 7,
    title: 'Virtual Memory',
    estimatedTime: '40 mins',
    learningObjectives: [
      'Understand Demand Paging and Page Fault handling routine.',
      'Analyze the Translation Lookaside Buffer (TLB) and Effective Memory Access Time (EMAT).',
      'Explain Thrashing and the Working Set Model.'
    ],
    prerequisites: ['Memory Management'],
    theoryAndConcepts: [
      { heading: '1. Demand paging and page faults', content: `Demand paging loads a page into RAM only when needed. On a page fault, the OS checks whether access is valid, obtains or allocates a frame, loads data if necessary, updates page tables, and resumes the instruction.` },
      { heading: '2. Practical details and common pitfalls', content: `A TLB caches recent virtual-to-physical translations. Thrashing happens when a workload spends excessive time paging because its active working set exceeds available memory.` }
    ],
  },

  'paging': {
    id: 'paging',
    subjectId: 'os',
    order: 8,
    title: 'Paging',
    estimatedTime: '35 mins',
    learningObjectives: [
      'Understand Fixed-size Pages (logical) mapped to Frames (physical).',
      'Multi-level Paging, Inverted Page Tables, and Page Table Entries (valid/invalid, dirty, protection bits).'
    ],
    prerequisites: ['Virtual Memory'],
    theoryAndConcepts: [
      { heading: '1. Pages, frames, and page tables', content: `Paging divides virtual memory into fixed-size pages and physical memory into same-sized frames. For a 4 KiB page, the lowest 12 address bits are the page offset; the remaining bits select the virtual page number.` },
      { heading: '2. Practical details and common pitfalls', content: `Page table entries hold frame mappings and protection/status bits. Multi-level page tables reduce page-table memory for sparse address spaces; TLBs speed repeated translations.` }
    ],
  },

  'segmentation': {
    id: 'segmentation',
    subjectId: 'os',
    order: 9,
    title: 'Segmentation',
    estimatedTime: '30 mins',
    learningObjectives: [
      'Variable-sized logical segments reflecting user view of program (code, stack, heap).',
      'Compare Paging vs Segmentation and combined Paged-Segmentation systems.'
    ],
    prerequisites: ['Paging'],
    theoryAndConcepts: [
      { heading: '1. Segmentation compared with paging', content: `Segmentation divides a program into logical variable-sized regions, such as code, stack, and data. A segment table can hold each segment’s base and limit; access is valid only when its offset is within bounds.` },
      { heading: '2. Practical details and common pitfalls', content: `Segmentation matches program structure but can cause external fragmentation. Paging uses fixed-size blocks and avoids external fragmentation of physical frames, while allowing some internal fragmentation.` }
    ],
  },

  'file-systems': {
    id: 'file-systems',
    subjectId: 'os',
    order: 10,
    title: 'File Systems',
    estimatedTime: '30 mins',
    learningObjectives: [
      'File Allocation Methods: Contiguous, Linked-List, Indexed (Inodes in Unix/Linux).',
      'Directory structures, file access permissions, and journaling file systems (ext4, NTFS).'
    ],
    prerequisites: ['Memory Management'],
    theoryAndConcepts: [
      { heading: '1. Files, metadata, and allocation', content: `A file system maps filenames and directories to persistent data blocks and metadata. Inode-based systems use inode structures for file metadata and block references; directory entries map names to inode identifiers.` },
      { heading: '2. Practical details and common pitfalls', content: `Contiguous allocation is fast but hard to grow; linked allocation avoids contiguous-space needs but hurts random access; indexed allocation supports direct block lookup. Journaling helps recover metadata consistency after crashes.` }
    ],
  },

  'io': {
    id: 'io',
    subjectId: 'os',
    order: 11,
    title: 'I/O',
    estimatedTime: '30 mins',
    learningObjectives: [
      'I/O Hardware: Polling, Interrupt-driven I/O, Direct Memory Access (DMA).',
      'Block devices vs Character devices and the OS Device Driver layer.'
    ],
    prerequisites: ['Processes'],
    theoryAndConcepts: [
      { heading: '1. Device I/O mechanisms', content: `Polling repeatedly checks a device status register. Interrupt-driven I/O lets a device notify the CPU when service is needed. DMA transfers blocks between a device and memory with limited CPU involvement.` },
      { heading: '2. Practical details and common pitfalls', content: `Block devices expose addressable blocks (for example, SSDs); character devices expose streams (for example, serial ports). Drivers translate OS requests into device-specific operations.` }
    ],
  },

  'scheduling-algorithms': {
    id: 'scheduling-algorithms',
    subjectId: 'os',
    order: 12,
    title: 'Scheduling Algorithms',
    estimatedTime: '40 mins',
    learningObjectives: [
      'FCFS (First-Come, First-Served) & Convoy Effect.',
      'SJF (Shortest Job First) & SRTF (Shortest Remaining Time First).',
      'Round Robin (RR) with dynamic time quantum tuning.',
      'Priority Scheduling & Aging, Multi-Level Feedback Queue (MLFQ).'
    ],
    prerequisites: ['CPU Scheduling'],
    theoryAndConcepts: [
      { heading: '1. FCFS, SJF, Round Robin, and priority', content: `FCFS runs jobs in arrival order and may cause the convoy effect. SJF selects the shortest estimated CPU burst; SRTF is its preemptive variant. Round Robin gives each ready job a time quantum before rotating it to the back of the queue.` },
      { heading: '2. Practical details and common pitfalls', content: `Priority scheduling can starve low-priority tasks; aging raises waiting tasks’ priority. A very small Round Robin quantum increases context-switch overhead, while a very large one approaches FCFS behavior.` }
    ],
  }
};

export const OS_MODULE_ORDER = [
  'processes',
  'threads',
  'cpu-scheduling',
  'synchronization',
  'deadlocks',
  'memory-management',
  'virtual-memory',
  'paging',
  'segmentation',
  'file-systems',
  'io',
  'scheduling-algorithms'
];

export function normalizeOsKey(key) {
  if (!key) return null;
  const clean = String(key).toLowerCase().trim().replace(/[\s&/]+/g, '-').replace(/[()]/g, '');
  if (OS_LESSONS[clean]) return clean;
  const aliases = {
    'process': 'processes',
    'thread': 'threads',
    'cpu': 'cpu-scheduling',
    'sync': 'synchronization',
    'deadlock': 'deadlocks',
    'memory': 'memory-management',
    'virtual': 'virtual-memory',
    'files': 'file-systems',
    'file': 'file-systems',
    'algorithms': 'scheduling-algorithms'
  };
  return aliases[clean] || (OS_LESSONS[clean] ? clean : null);
}

export function getOsLesson(key) {
  const k = normalizeOsKey(key);
  return k ? OS_LESSONS[k] : null;
}
