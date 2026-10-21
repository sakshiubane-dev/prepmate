/**
 * PrepMate DBMS (Database Management Systems) Lesson Content Registry
 * Covers all 16 core DBMS modules following the standard lesson schema.
 */

export const DBMS_LESSONS = {
  'er-models': {
    id: 'er-models',
    subjectId: 'dbms',
    order: 1,
    title: 'ER Models',
    estimatedTime: '35 mins',
    learningObjectives: [
      'Define Entities, Attributes (Simple, Composite, Multi-valued, Derived), and Relationships.',
      'Understand Cardinality (1:1, 1:N, M:N) and Participation constraints (Total vs Partial).',
      'Model Weak Entities and Identifying Relationships.',
      'Convert Entity-Relationship diagrams into normalized Relational Schemas.'
    ],
    prerequisites: ['Basic data management concepts'],
    theoryAndConcepts: [
      {
        heading: '1. Entity-Relationship Modeling Fundamentals',
        content: `An ER diagram is a high-level conceptual data model that visually represents how real-world data elements relate to one another.
- Entity: An object that exists and is distinguishable from other objects (e.g., Student, Course).
- Attribute: Property or characteristic of an entity (e.g., Student_ID, GPA).
- Relationship: Association among several entities (e.g., Student ENROLLS_IN Course).`
      }
    ],
    interviewQuestions: [
      {
        q: "What is a Weak Entity in an ER model and how is it represented in a relational schema?",
        a: "A weak entity cannot be uniquely identified by its own attributes alone and depends on an owner entity for its existence (via an identifying relationship). In a relational schema, the primary key of the weak entity table is formed by combining the foreign key referencing the owner entity with the weak entity's partial key (discriminator)."
      }
    ]
  },

  'relational-model': {
    id: 'relational-model',
    subjectId: 'dbms',
    order: 2,
    title: 'Relational Model',
    estimatedTime: '30 mins',
    learningObjectives: [
      'Understand relations (tables), tuples (rows), and attributes (columns).',
      'Analyze domain constraints, entity integrity constraints, and referential integrity constraints.',
      'Execute Relational Algebra operations: Selection (σ), Projection (π), Cartesian Product (×), and Join (⨝).'
    ],
    prerequisites: ['ER Models'],
    theoryAndConcepts: [
      {
        heading: '1. Relational Integrity Constraints',
        content: `- Domain Constraint: Each attribute must hold an atomic value from that attribute's defined domain.
- Entity Integrity: The primary key of a relation cannot accept NULL values.
- Referential Integrity: A foreign key in one relation must either match a valid primary key in the referenced relation or be NULL.`
      }
    ]
  },

  'keys': {
    id: 'keys',
    subjectId: 'dbms',
    order: 3,
    title: 'Keys',
    estimatedTime: '30 mins',
    learningObjectives: [
      'Distinguish Super Key, Candidate Key, Primary Key, Alternate Key, Foreign Key, and Composite Key.',
      'Understand minimal super keys and determining candidate keys using functional dependencies.'
    ],
    prerequisites: ['Relational Model'],
    theoryAndConcepts: [
      {
        heading: '1. Relational Keys Hierarchy',
        content: `- Super Key: Any set of attributes that uniquely identifies a tuple within a relation.
- Candidate Key: A minimal super key (no proper subset is a super key).
- Primary Key: The single candidate key selected by the database designer as the primary tuple identifier.
- Foreign Key: An attribute or collection of attributes that references the primary key of another relation.`
      }
    ]
  },

  'normalization': {
    id: 'normalization',
    subjectId: 'dbms',
    order: 4,
    title: 'Normalization',
    estimatedTime: '45 mins',
    learningObjectives: [
      'Analyze insertion, deletion, and update anomalies caused by data redundancy.',
      'Master 1NF (Atomic values), 2NF (No partial dependency), 3NF (No transitive dependency).',
      'Understand Boyce-Codd Normal Form (BCNF): for every non-trivial X -> Y, X must be a super key.',
      'Evaluate lossless-join and dependency-preserving decompositions.'
    ],
    prerequisites: ['Keys', 'Functional Dependencies'],
    theoryAndConcepts: [
      {
        heading: '1. Normal Forms Hierarchy',
        content: `Normalization is the systematic process of decomposing tables to eliminate duplicate redundant data and prevent data modification anomalies:
- 1NF: Every attribute cell must contain single atomic values (no multi-valued lists or arrays).
- 2NF: In 1NF and no non-prime attribute is partially dependent on any candidate key.
- 3NF: In 2NF and no non-prime attribute is transitively dependent on any candidate key (X -> Y requires X is super key or Y is prime attribute).
- BCNF: Stricter version of 3NF where for EVERY functional dependency X -> Y, X MUST be a super key.`
      }
    ],
    interviewQuestions: [
      {
        q: "What is the difference between 3NF and BCNF?",
        a: "In 3NF, in a dependency X -> Y, if X is not a super key, it is still permitted as long as Y is a prime attribute (part of any candidate key). In BCNF, this exception is removed: X must strictly be a super key, period."
      }
    ]
  },

  'sql': {
    id: 'sql',
    subjectId: 'dbms',
    order: 5,
    title: 'SQL',
    estimatedTime: '40 mins',
    learningObjectives: [
      'Master DDL (CREATE, ALTER, DROP, TRUNCATE) vs DML (SELECT, INSERT, UPDATE, DELETE).',
      'Understand DCL (GRANT, REVOKE) and TCL (COMMIT, ROLLBACK, SAVEPOINT).',
      'Execute aggregate functions (COUNT, SUM, AVG, MIN, MAX) with GROUP BY and HAVING clauses.'
    ],
    prerequisites: ['Relational Model'],
    theoryAndConcepts: [
      { heading: '1. SQL query fundamentals', content: `SQL is a declarative language: specify which rows you want, not the physical retrieval algorithm. SELECT chooses expressions, FROM identifies sources, WHERE filters rows before grouping, GROUP BY forms groups, HAVING filters groups, and ORDER BY sorts the result. Example: SELECT department, COUNT(*) AS total FROM employees WHERE active = 1 GROUP BY department HAVING COUNT(*) >= 2 ORDER BY total DESC.` },
      { heading: '2. Practical details and common pitfalls', content: `Use parameterized queries for user input rather than string concatenation to prevent SQL injection. WHERE salary = NULL is not correct: use IS NULL. COUNT(*) counts rows while COUNT(column) excludes NULL values.` }
    ],
  },

  'joins': {
    id: 'joins',
    subjectId: 'dbms',
    order: 6,
    title: 'Joins',
    estimatedTime: '35 mins',
    learningObjectives: [
      'Differentiate INNER JOIN, LEFT (OUTER) JOIN, RIGHT (OUTER) JOIN, FULL OUTER JOIN, and CROSS JOIN.',
      'Understand Self Joins and Natural Joins.',
      'Analyze join execution algorithms: Nested Loop Join, Hash Join, Sort-Merge Join.'
    ],
    prerequisites: ['SQL'],
    theoryAndConcepts: [
      { heading: '1. Joining related tables', content: `INNER JOIN returns matching rows from both inputs; LEFT JOIN preserves every left row and fills missing right-side columns with NULL. Example: SELECT s.name, c.title FROM students s LEFT JOIN enrollments e ON e.student_id = s.id LEFT JOIN courses c ON c.id = e.course_id. A CROSS JOIN produces every pair of rows.` },
      { heading: '2. Practical details and common pitfalls', content: `A one-to-many join can multiply rows, so COUNT(*) after a join may overcount entities. Place right-table filters in the ON clause when you must preserve unmatched left rows; putting them in WHERE can turn a LEFT JOIN into an effective INNER JOIN.` }
    ],
  },

  'subqueries': {
    id: 'subqueries',
    subjectId: 'dbms',
    order: 7,
    title: 'Subqueries',
    estimatedTime: '30 mins',
    learningObjectives: [
      'Distinguish Single-Row, Multi-Row (IN, ANY, ALL), and Correlated Subqueries.',
      'Compare performance of Correlated Subqueries vs JOINs with CTEs (Common Table Expressions).'
    ],
    prerequisites: ['SQL', 'Joins'],
    theoryAndConcepts: [
      { heading: '1. Subqueries and correlation', content: `A subquery is a query nested inside another SQL statement. IN tests membership; EXISTS checks whether at least one matching row exists. A correlated subquery refers to columns of the outer query. Example: SELECT name FROM employees e WHERE salary > (SELECT AVG(salary) FROM employees WHERE department_id = e.department_id).` },
      { heading: '2. Practical details and common pitfalls', content: `NOT IN can behave unexpectedly if its subquery produces NULL. NOT EXISTS is often safer for anti-joins. Query optimizers may rewrite correlated subqueries into joins, so compare execution plans instead of assuming one syntax is always faster.` }
    ],
  },

  'indexing': {
    id: 'indexing',
    subjectId: 'dbms',
    order: 8,
    title: 'Indexing',
    estimatedTime: '45 mins',
    learningObjectives: [
      'Analyze Clustered vs Non-Clustered Indexes.',
      'Understand why database engines use B+ Trees instead of Binary Search Trees or Hash Tables for disk storage.',
      'Evaluate composite indexes, leftmost prefix rule, and index selectivity.',
      'Quantify the performance trade-off: fast reads vs write/insert overhead.'
    ],
    prerequisites: ['SQL'],
    theoryAndConcepts: [
      {
        heading: '1. B+ Trees for Disk-Based Indexing',
        content: `B+ Trees are self-balancing search trees optimized for disk systems:
- Index entries (and, depending on the index design, record pointers or stored data) are held in leaf nodes, creating uniform lookup paths.
- Leaf nodes are commonly linked for efficient sequential scans, enabling extremely fast O(log N) + range scan queries.
- Internal nodes hold only routing keys, allowing high fan-out (many child pointers per page) and shallow tree depths (typically 3-4 levels for billions of rows).`
      }
    ]
  },

  'transactions': {
    id: 'transactions',
    subjectId: 'dbms',
    order: 9,
    title: 'Transactions',
    estimatedTime: '35 mins',
    learningObjectives: [
      'Define a Database Transaction as an indivisible unit of work.',
      'Explore Transaction States: Active, Partially Committed, Failed, Aborted, Committed.',
      'Understand Write-Ahead Logging (WAL) and checkpoint recovery.'
    ],
    prerequisites: ['SQL'],
    theoryAndConcepts: [
      { heading: '1. Transactions and recovery', content: `A transaction groups related changes into one logical unit. Example: BEGIN; UPDATE accounts SET balance = balance - 100 WHERE id = 1; UPDATE accounts SET balance = balance + 100 WHERE id = 2; COMMIT. If an operation fails, ROLLBACK restores the prior committed state.` },
      { heading: '2. Practical details and common pitfalls', content: `Write-ahead logging records recovery information before modified database pages are persisted. The exact logging and commit guarantees depend on the database engine and durability configuration.` }
    ],
  },

  'acid': {
    id: 'acid',
    subjectId: 'dbms',
    order: 10,
    title: 'ACID',
    estimatedTime: '40 mins',
    learningObjectives: [
      'Atomicity: All-or-nothing execution backed by rollback undo logs.',
      'Consistency: Data transitions only from one valid state to another, preserving all integrity constraints.',
      'Isolation: Concurrent transactions execute without mutual interference.',
      'Durability: Committed updates survive system crashes via redo logs and non-volatile storage.'
    ],
    prerequisites: ['Transactions'],
    theoryAndConcepts: [
      {
        heading: '1. The Four ACID Pillars',
        content: `ACID properties ensure database reliability:
- Atomicity ensures that if a transaction fails halfway through transferring money between accounts, the partial debit is reversed completely.
- Durability guarantees that once a client receives a commit acknowledgment, the written data will not be lost even during sudden power failure.`
      }
    ]
  },

  'concurrency': {
    id: 'concurrency',
    subjectId: 'dbms',
    order: 11,
    title: 'Concurrency',
    estimatedTime: '40 mins',
    learningObjectives: [
      'Identify concurrency anomalies: Dirty Reads, Non-Repeatable Reads, Phantom Reads, Lost Updates.',
      'Understand Conflict Serializability and precedence graphs (serialization graphs).'
    ],
    prerequisites: ['Transactions', 'ACID'],
    theoryAndConcepts: [
      { heading: '1. Concurrent transactions', content: `When transactions overlap, a dirty read observes uncommitted data; a non-repeatable read sees a previously read row change; a phantom read sees the set of qualifying rows change; a lost update overwrites another transaction’s change.` },
      { heading: '2. Practical details and common pitfalls', content: `Conflict serializability means an interleaved schedule is equivalent to some serial schedule under conflicting operations. Build a precedence graph with one node per transaction and edges for conflicting accesses; a cycle means the schedule is not conflict-serializable.` }
    ],
  },

  'locks': {
    id: 'locks',
    subjectId: 'dbms',
    order: 12,
    title: 'Locks',
    estimatedTime: '35 mins',
    learningObjectives: [
      'Shared (S) Read Locks vs Exclusive (X) Write Locks.',
      'Two-Phase Locking (2PL): Growing Phase vs Shrinking Phase.',
      'Strict 2PL and Rigorous 2PL to prevent cascading rollbacks.',
      'Deadlock detection (wait-for graphs) and prevention (Wait-Die, Wound-Wait).'
    ],
    prerequisites: ['Concurrency'],
    theoryAndConcepts: [
      { heading: '1. Database locks', content: `Shared (S) locks permit multiple readers; exclusive (X) locks protect writes from conflicting reads or writes under lock-based isolation. Two-phase locking first acquires locks and then releases them without acquiring new locks in the shrinking phase.` },
      { heading: '2. Practical details and common pitfalls', content: `Strict 2PL retains exclusive locks until commit or rollback to prevent dirty writes and cascading aborts. Deadlocks occur when transactions wait in a cycle; a wait-for graph helps detect them.` }
    ],
  },

  'isolation-levels': {
    id: 'isolation-levels',
    subjectId: 'dbms',
    order: 13,
    title: 'Isolation Levels',
    estimatedTime: '35 mins',
    learningObjectives: [
      'Compare standard SQL Isolation Levels: Read Uncommitted, Read Committed, Repeatable Read, Serializable.',
      'Understand Multi-Version Concurrency Control (MVCC) in modern databases (PostgreSQL, MySQL InnoDB).'
    ],
    prerequisites: ['Concurrency', 'Locks'],
    theoryAndConcepts: [
      { heading: '1. SQL isolation levels', content: `Read Uncommitted permits dirty reads; Read Committed prevents dirty reads; Repeatable Read also prevents non-repeatable reads under the SQL standard; Serializable aims for results equivalent to serial execution. Exact behavior, especially phantom reads and MVCC snapshots, varies by database implementation.` },
      { heading: '2. Practical details and common pitfalls', content: `MVCC keeps multiple row versions so readers can often access a consistent snapshot without blocking writers. Stronger isolation can reduce anomalies but may increase contention or retries.` }
    ],
  },

  'query-optimization': {
    id: 'query-optimization',
    subjectId: 'dbms',
    order: 14,
    title: 'Query Optimization',
    estimatedTime: '35 mins',
    learningObjectives: [
      'Understand the SQL query execution lifecycle: Parser, Optimizer, Execution Engine.',
      'Read EXPLAIN and EXPLAIN ANALYZE execution plans.',
      'Identify bottlenecks: Sequential Table Scans vs Index Seek, temporary disk spills.'
    ],
    prerequisites: ['SQL', 'Indexing'],
    theoryAndConcepts: [
      { heading: '1. Reading execution plans', content: `A query optimizer estimates costs of alternative access paths, join orders, and join algorithms. EXPLAIN displays a plan; EXPLAIN ANALYZE (where supported) executes the query and reports observed timing and row counts.` },
      { heading: '2. Practical details and common pitfalls', content: `Check actual versus estimated row counts, scan types, index usage, join methods, and sort/hash spills. An index is not always faster than a sequential scan when most rows are required.` }
    ],
  },

  'views': {
    id: 'views',
    subjectId: 'dbms',
    order: 15,
    title: 'Views',
    estimatedTime: '25 mins',
    learningObjectives: [
      'Standard Virtual Views vs Materialized Views with automatic/manual refresh.',
      'Enhance database security and simplify complex reporting queries using views.'
    ],
    prerequisites: ['SQL'],
    theoryAndConcepts: [
      { heading: '1. Views and materialized views', content: `A normal view stores a query definition, not usually a separate copy of its result. CREATE VIEW active_users AS SELECT id, name FROM users WHERE active = 1. Querying the view executes the underlying query according to the database engine.` },
      { heading: '2. Practical details and common pitfalls', content: `A materialized view stores query results and requires refresh to reflect changes; refresh policies vary by engine. Views simplify queries and can help restrict column exposure, but access permissions must still be configured correctly.` }
    ],
  },

  'stored-procedures': {
    id: 'stored-procedures',
    subjectId: 'dbms',
    order: 16,
    title: 'Stored Procedures',
    estimatedTime: '30 mins',
    learningObjectives: [
      'Define Stored Procedures and User-Defined Functions (UDFs).',
      'Analyze pros (reduced network round-trips, pre-compiled plans) and cons (vendor lock-in, testing difficulty).',
      'Understand Database Triggers and auditing hooks.'
    ],
    prerequisites: ['SQL', 'Transactions'],
    theoryAndConcepts: [
      { heading: '1. Procedures, functions, and triggers', content: `A stored procedure is a database-side routine that can run multiple SQL statements with parameters. A function generally returns a value or table and may be usable in expressions, depending on the database.` },
      { heading: '2. Practical details and common pitfalls', content: `Triggers run automatically in response to events such as INSERT or UPDATE. They can support auditing and validation but may hide side effects and complicate debugging. Syntax and transactional behavior are vendor-specific.` }
    ],
  }
};

export const DBMS_MODULE_ORDER = [
  'er-models',
  'relational-model',
  'keys',
  'normalization',
  'sql',
  'joins',
  'subqueries',
  'indexing',
  'transactions',
  'acid',
  'concurrency',
  'locks',
  'isolation-levels',
  'query-optimization',
  'views',
  'stored-procedures'
];

export function normalizeDbmsKey(key) {
  if (!key) return null;
  const clean = String(key).toLowerCase().trim().replace(/[\s&/]+/g, '-').replace(/[()]/g, '');
  if (DBMS_LESSONS[clean]) return clean;
  const aliases = {
    'er': 'er-models',
    'er-model': 'er-models',
    'relational': 'relational-model',
    'indexes': 'indexing',
    'isolation': 'isolation-levels',
    'optimization': 'query-optimization',
    'procedures': 'stored-procedures'
  };
  return aliases[clean] || (DBMS_LESSONS[clean] ? clean : null);
}

export function getDbmsLesson(key) {
  const k = normalizeDbmsKey(key);
  return k ? DBMS_LESSONS[k] : null;
}
