const interview = (question, answer) => ({ question, answer });
const mcq = (question, options, correctAnswer, explanation) => ({ question, options, correctAnswer, explanation });

export const SYSTEM_DESIGN_MODULE_ORDER = [
  'scalability',
  'load-balancers',
  'distributed-caching',
  'database-sharding',
  'message-queues',
  'cdn',
  'cap-theorem',
  'rest-vs-grpc',
  'microservices',
  'rate-limiting'
];

export const SYSTEM_DESIGN_LESSONS = {
  scalability: {
    id: 'scalability', subjectId: 'systemdesign', order: 1, title: 'Scalability', estimatedTime: '45 mins',
    introduction: 'Scalability is a system\'s ability to handle increased demand while meeting its latency, availability, and correctness goals. Good design starts by identifying the constrained resource and the workload, not by adding servers blindly.',
    learningObjectives: [
      'Distinguish vertical scaling from horizontal scaling and state when each is useful.',
      'Reason about throughput, latency, concurrency, capacity, and bottlenecks.',
      'Explain statelessness, partitioning, replication, and asynchronous work as scaling techniques.',
      'Use workload measurements and load tests to make capacity decisions.'
    ],
    prerequisites: ['Basic networking', 'HTTP request/response', 'Database fundamentals'],
    theoryAndConcepts: [
      { heading: '1. Define the workload and the goal', content: 'Specify request rate, read/write mix, payload size, burstiness, concurrency, and geographic distribution. Set service-level objectives such as p95 latency and availability. Throughput is completed work per unit time; latency is the time one operation takes. Increasing throughput does not guarantee lower latency, especially when queues grow near saturation.' },
      { heading: '2. Vertical and horizontal growth', content: 'Vertical scaling gives one machine more CPU, memory, or I/O capacity. It is operationally simple and can be effective early, but has hardware limits, can increase cost non-linearly, and leaves a larger failure domain. Horizontal scaling adds instances. It raises aggregate capacity and can improve fault isolation, but requires request distribution, shared or partitioned state, coordination, and deployment automation.' },
      { heading: '3. Find bottlenecks before scaling', content: 'A service is limited by its narrowest constrained resource: CPU, memory, disk, network, database locks, connection pools, or a downstream dependency. Profile representative traffic, inspect saturation and queue depth, then change one bottleneck at a time. Little\'s Law (L = lambda W) relates average in-flight work L, arrival rate lambda, and average time in the system W; growing queues are a warning that arrival rate is approaching or exceeding service capacity.' },
      { heading: '4. Make scale-out possible', content: 'Keep request handlers stateless where practical so any healthy instance can serve a request; place durable state in databases or purpose-built stores. Add capacity using replication for read-heavy paths, partitioning for data or write throughput, caching for reusable reads, and queues for work that can be delayed. These techniques move load and complexity rather than eliminating it, so define consistency, retry, and failure behavior explicitly.' }
    ],
    importantDefinitions: [
      { term: 'Throughput', definition: 'The amount of useful work completed per unit time, such as requests per second.' },
      { term: 'Latency', definition: 'Elapsed time for an operation; percentile latency (for example p95) exposes tail behavior.' },
      { term: 'Bottleneck', definition: 'The resource or dependency whose capacity constrains end-to-end system throughput.' },
      { term: 'Horizontal scaling', definition: 'Increasing capacity by adding cooperating instances or partitions.' },
      { term: 'Stateless service', definition: 'A service whose instances do not require local session state to process later requests.' }
    ],
    stepByStepExamples: [{ title: 'Scale a read-heavy product catalog', steps: [
      'Measure requests by endpoint, read/write ratio, p95 latency, CPU, database connections, and query time.',
      'Use an indexed query plan and remove repeated work before adding capacity.',
      'Add stateless API instances behind a load balancer and keep session state in a shared store or signed client token.',
      'Cache safe, frequently read catalog responses with explicit expiry and invalidation rules.',
      'Load-test realistic bursts and verify database, cache, and network headroom; scale the first saturated dependency.'
    ] }],
    realWorldExamples: [
      { title: 'Online storefront', description: 'Scale stateless product and search APIs horizontally during a sale, while protecting the database with read replicas, cache limits, and back-pressure.' },
      { title: 'Video processing', description: 'Accept uploads quickly, enqueue transcoding jobs, and add workers according to queue age and processing capacity.' }
    ],
    visualExample: 'Clients -> Load balancer -> Stateless API instances -> Cache -> Database\n                                      |\n                                      +-> Queue -> Worker pool\n\nScale the saturated tier; monitor queue depth, latency, errors, and resource saturation.',
    designTradeoffs: {
      advantages: ['Horizontal scale can grow capacity incrementally and improve instance-level fault isolation.', 'Caching, replicas, and queues let different workload paths scale independently.'],
      disadvantages: ['Distributed state, deployments, observability, and failure handling become more complex.', 'Extra replicas and caches create freshness, coordination, and operational costs.'],
      tradeoffs: ['Choose vertical scale for simplicity and predictable single-node workloads; choose horizontal scale when demand or availability goals exceed one node.', 'Optimize p95/p99 and correctness alongside throughput; do not trade consistency or availability accidentally just to report higher requests per second.']
    },
    commonMistakes: ['Adding instances while a shared database remains the bottleneck.', 'Treating average latency as sufficient and ignoring tail latency and queue growth.', 'Assuming every task can be made parallel or moved to a cache without changing semantics.'],
    bestPractices: ['Define measurable SLOs and test the expected peak plus a safety margin.', 'Instrument per-tier saturation, queue age, errors, and latency percentiles.', 'Use load shedding, timeouts, and bounded queues to prevent overload from cascading.'],
    interviewQuestions: [
      interview('What is the difference between vertical and horizontal scaling?', 'Vertical scaling increases the resources of one machine; horizontal scaling adds machines or partitions. Vertical scaling is simpler but bounded by one host and its failure domain. Horizontal scaling offers aggregate capacity and resilience but requires distributed coordination and state handling.'),
      interview('Why can latency rise sharply as a service approaches full utilization?', 'When arrivals nearly match service capacity, small bursts create queues that take longer to drain. Variance and contention make tail latency rise before average throughput visibly fails.'),
      interview('How would you identify the first bottleneck in a service?', 'Use representative load and correlate latency and errors with CPU, memory, I/O, connection pools, queue depth, and downstream timings. Confirm a suspected limit with profiling or a controlled load test before scaling.'),
      interview('What does making an API stateless enable?', 'Any healthy instance can handle a request, which simplifies load balancing, replacement, and horizontal scaling. Durable or session state must live elsewhere, and that store then needs its own capacity and failure design.'),
      interview('When is adding a cache not an appropriate scaling fix?', 'When reads are not reusable, data freshness is strict, cache hit rate is low, or the bottleneck is elsewhere. A cache also adds invalidation, memory, and stampede risks.'),
    ],
    mcqs: [
      mcq('Which change is horizontal scaling?', ['Upgrade one server from 8 to 32 CPU cores', 'Add four API instances behind a load balancer', 'Increase a process heap limit', 'Replace a disk with a faster disk'], 1, 'Horizontal scaling adds cooperating instances. The other choices increase resources on an existing host.'),
      mcq('A service has rising queue depth and p99 latency while CPU is mostly idle. What should be investigated first?', ['The downstream dependency or I/O wait', 'Adding more CPU cores immediately', 'Reducing log retention only', 'Increasing the client timeout without measurement'], 0, 'Idle CPU with growing queues often points to a blocked downstream dependency, I/O, locks, or connection-pool exhaustion.'),
      mcq('What does Little\'s Law relate for a stable system?', ['Average in-flight work, arrival rate, and time in system', 'Cache size, hash collisions, and key length', 'Availability, durability, and replication factor', 'CPU frequency, memory bandwidth, and disk size'], 0, 'Little\'s Law is L = lambda W for average items in the system, arrival rate, and average time in the system.'),
      mcq('Why are p95 and p99 latency useful?', ['They show behavior near the slow tail that averages can hide', 'They measure only successful writes', 'They guarantee a fixed maximum response time', 'They remove the need for load testing'], 0, 'Tail percentiles reveal slow requests that disproportionately affect user experience and can indicate queueing or uneven dependencies.'),
      mcq('Which is a common consequence of adding a read replica?', ['Reads can be distributed, but replica lag may expose stale data', 'All writes become strongly consistent across regions automatically', 'Database storage requirements disappear', 'The primary database no longer needs monitoring'], 0, 'Read replicas can increase read capacity, but asynchronous replication commonly introduces lag and stale reads.'),
    ],
    practicalExercise: {
      title: 'Scale a flash-sale checkout',
      prompt: 'Design a checkout path for a flash sale with sharp traffic bursts, inventory correctness requirements, and a third-party payment provider.',
      requirements: ['State peak workload assumptions and latency/availability goals.', 'Identify the likely bottlenecks and how to measure them.', 'Explain how API instances, inventory writes, and payment calls behave under overload.', 'Describe one failure mode and how users recover safely.'],
      hints: ['Separate read-heavy browsing from correctness-sensitive inventory reservation.', 'Use bounded queues or admission control only where delayed work is acceptable.', 'Use idempotency keys for payment retries and do not claim a successful charge before confirmation.'],
      suggestedSolution: 'Serve catalog reads from cache and read replicas, with explicit freshness bounds. Keep checkout APIs stateless behind a load balancer. Reserve inventory using an atomic database operation or a single-writer partition, enforce idempotency for order/payment commands, and apply per-dependency timeouts and concurrency limits. Shed excess requests with a clear retry response, monitor queue age and payment latency, then load-test the full dependency chain.',
      reviewChecklist: ['Workload, SLOs, and bottlenecks are explicit.', 'Inventory correctness is protected under concurrent requests.', 'Payment retries cannot create duplicate charges.', 'Overload and recovery behavior are described.']
    },
    revisionSummary: ['Scale vertically for a bounded simple node; scale horizontally for aggregate capacity and resilience.', 'Measure the bottleneck and tail latency before adding capacity.', 'Stateless instances, caches, replicas, partitions, and queues solve different workload constraints.', 'Distributed scaling adds consistency, retry, and operations trade-offs.']
  },

  'load-balancers': {
    id: 'load-balancers', subjectId: 'systemdesign', order: 2, title: 'Load Balancers', estimatedTime: '45 mins',
    introduction: 'A load balancer accepts traffic for a service and selects a healthy backend. It improves distribution and failover, but cannot make an unhealthy dependency or overloaded system healthy by itself.',
    learningObjectives: ['Explain Layer 4 and Layer 7 balancing.', 'Compare common backend-selection algorithms and health checks.', 'Describe TLS termination, connection behavior, and session affinity.', 'Design safe retries, draining, and failure detection.'],
    prerequisites: ['TCP/IP basics', 'HTTP request lifecycle', 'Scalability'],
    theoryAndConcepts: [
      { heading: '1. Where a load balancer operates', content: 'Layer 4 balancers route using transport information such as IP addresses and TCP/UDP ports. They are protocol-agnostic and can be efficient, but do not understand HTTP paths or headers. Layer 7 balancers terminate or inspect application protocols and can route by host, path, header, or cookie, at the cost of more processing and protocol-specific configuration.' },
      { heading: '2. Backend selection and health', content: 'Round robin rotates through eligible backends; weighted round robin accounts for capacity; least-connections or least-outstanding-requests can help when request costs vary; consistent hashing can preserve locality. Active health probes test configured endpoints, while passive checks infer failure from real traffic. Health checks need realistic thresholds: overly aggressive probes can eject healthy nodes during transient slowdowns.' },
      { heading: '3. Connections, TLS, and client identity', content: 'A proxy may terminate TLS and open a separate backend connection, or pass encrypted traffic through. Termination enables HTTP-aware routing and centralized certificates but moves trust and key management to the proxy. Preserve client address via trusted forwarding headers or proxy protocol; never trust client-supplied forwarding headers without a trusted-proxy boundary.' },
      { heading: '4. Failure and deployment behavior', content: 'Retries can mask transient failures but amplify load, so limit attempts, retry only safe/idempotent operations, and use a deadline budget. Connection draining lets existing requests finish while a node is removed from service. Redundant balancers, zones, and configuration rollout controls are required to avoid the load balancer becoming a single point of failure.' }
    ],
    importantDefinitions: [
      { term: 'Layer 4 balancer', definition: 'Routes transport connections based on network and transport metadata, without interpreting application content.' },
      { term: 'Layer 7 balancer', definition: 'Routes application requests using protocol-level fields such as HTTP host, path, or headers.' },
      { term: 'Health check', definition: 'A probe or signal used to decide whether a backend should receive new traffic.' },
      { term: 'Connection draining', definition: 'Stops assigning new work to a backend while allowing existing work to finish.' },
      { term: 'Session affinity', definition: 'A policy that sends a client repeatedly to the same backend, often using a cookie or hash.' }
    ],
    stepByStepExamples: [{ title: 'Roll out a new API version safely', steps: ['Register new instances but keep them out of rotation until readiness checks pass.', 'Send a small weighted share of traffic to the new version and compare errors and latency.', 'Increase the weight gradually while watching service and dependency saturation.', 'On failure, stop new traffic to the version and drain existing connections.', 'Keep retry limits and request idempotency in place during the transition.'] }],
    realWorldExamples: [
      { title: 'Regional web service', description: 'A global DNS or edge layer directs users to a region; a regional Layer 7 proxy routes paths to API pools.' },
      { title: 'Internal TCP service', description: 'A Layer 4 virtual IP distributes long-lived database-proxy or service connections among healthy endpoints.' }
    ],
    visualExample: 'Client --TLS--> Layer 7 proxy --HTTP/TLS--> Backend pool\n                         |\n                 readiness + health checks\n                         |\n               drain unhealthy/old nodes',
    designTradeoffs: { advantages: ['Centralizes traffic distribution, health-based routing, TLS policy, and gradual rollouts.', 'Can route by application context and protect clients from individual backend replacement.'], disadvantages: ['Adds a network hop, configuration surface, and a potential capacity or availability bottleneck.', 'TLS termination and retries create security and correctness responsibilities.'], tradeoffs: ['Layer 4 is simpler and protocol-neutral; Layer 7 enables richer routing but consumes more resources.', 'Sticky sessions may preserve local state but reduce evenness and complicate failover; prefer external session state when practical.'] },
    commonMistakes: ['Using a shallow TCP check as proof that the application is ready.', 'Retrying non-idempotent requests without deduplication.', 'Trusting arbitrary client-supplied X-Forwarded-For headers.', 'Deploying one balancer instance with no failover.'],
    bestPractices: ['Use redundant balancers and capacity-test them as part of the service.', 'Set readiness separately from liveness and tune probe thresholds.', 'Drain connections before shutdown and set explicit request deadlines.', 'Preserve client identity only through a trusted proxy chain.'],
    interviewQuestions: [
      interview('How does a Layer 4 load balancer differ from a Layer 7 load balancer?', 'Layer 4 selects paths based on transport metadata such as address and port. Layer 7 understands application requests and can route by host, path, or headers; this enables richer behavior but requires protocol termination or inspection.'),
      interview('When is least-connections preferable to round robin?', 'When requests have materially different durations and active connection count roughly represents work. It is not universally better: HTTP/2 multiplexing, uneven request cost, or long idle connections can make connection count a poor load signal.'),
      interview('What is the difference between liveness and readiness checks?', 'Liveness indicates whether a process should be restarted; readiness indicates whether it should receive new traffic. A temporarily overloaded but recoverable instance may be unready without being dead.'),
      interview('Why can automatic retries make an outage worse?', 'Retries add traffic to an already failing dependency and can synchronize into retry storms. Use deadlines, bounded attempts, jitter, backoff, and retry only operations whose effects are safe or idempotent.'),
      interview('How do you remove a backend without dropping active requests?', 'Mark it unready or disable new assignment, allow existing connections to drain for a bounded period, then terminate it. Enforce request deadlines so draining cannot last forever.'),
    ],
    mcqs: [
      mcq('Which routing decision typically requires Layer 7 awareness?', ['Select a backend by HTTP URL path', 'Select a backend by destination TCP port only', 'Forward an opaque TCP stream', 'Choose a route from IP and port'], 0, 'HTTP path routing requires inspecting the application request and is a Layer 7 capability.'),
      mcq('What does readiness normally control?', ['Whether an instance receives new traffic', 'Whether a machine has a valid DNS name', 'Whether an application must be restarted', 'Whether a client may use TLS'], 0, 'Readiness signals that an instance is prepared to serve; liveness is more closely associated with restart decisions.'),
      mcq('Why should retries be bounded and deadline-aware?', ['To avoid amplifying load and exceeding the caller\'s useful time budget', 'To guarantee every request succeeds', 'To remove the need for health checks', 'To make writes exactly-once'], 0, 'Unbounded or late retries waste capacity and can worsen dependency failures; retries also cannot guarantee success.'),
      mcq('What is connection draining for?', ['Allow current work to finish after stopping new assignments', 'Force all clients to reconnect on every request', 'Copy application state into the balancer', 'Make a health check succeed'], 0, 'Draining provides a controlled removal period for in-flight work.'),
      mcq('Which is a risk of trusting an arbitrary X-Forwarded-For header?', ['A client can spoof its apparent source address', 'The TCP handshake becomes encrypted', 'The balancer cannot select a backend', 'It disables health checks'], 0, 'Only headers added by a trusted proxy chain should be used for client identity; otherwise clients can spoof the value.'),
    ],
    practicalExercise: {
      title: 'Design a resilient API entry tier', prompt: 'Route web and mobile traffic to a multi-zone API service with gradual releases and safe backend removal.',
      requirements: ['Choose Layer 4 or Layer 7 and justify it.', 'Specify health and readiness behavior.', 'Explain TLS and client IP handling.', 'Describe rollout, draining, and retry policy.'],
      hints: ['Separate readiness from process liveness.', 'Retries need deadlines and idempotency.', 'The balancer itself needs redundant capacity and configuration validation.'],
      suggestedSolution: 'Use redundant regional Layer 7 proxies for host/path routing and TLS policy, with certificate rotation and a trusted proxy chain. Backends expose readiness and liveness separately. Deploy to a small weighted cohort, compare SLOs, then increase traffic. On removal, stop new assignments and drain within a bounded grace period. Retry only idempotent requests within the caller deadline, with jitter and a strict attempt cap.',
      reviewChecklist: ['Layer choice matches routing needs.', 'Readiness, liveness, and health thresholds are distinguished.', 'TLS and forwarded client identity have an explicit trust boundary.', 'Rollout and draining avoid unbounded retries.']
    },
    revisionSummary: ['Layer 4 routes transport flows; Layer 7 routes application requests.', 'Health checks determine eligibility, but probe design matters.', 'Retries can amplify outages; bound them by operation safety and deadline.', 'Use readiness, draining, redundancy, and trusted client identity handling.']
  },

  'distributed-caching': {
    id: 'distributed-caching', subjectId: 'systemdesign', order: 3, title: 'Distributed Caching', estimatedTime: '50 mins',
    introduction: 'A distributed cache stores reusable data across multiple nodes so applications can reduce repeated computation or database reads. Its value depends on hit rate, freshness requirements, and behavior when the cache is slow or unavailable.',
    learningObjectives: ['Compare cache-aside, read-through, write-through, and write-behind patterns.', 'Explain eviction, TTL, invalidation, and consistency choices.', 'Recognize stampedes, hot keys, and cache penetration.', 'Design safe degradation when a cache cluster fails.'],
    prerequisites: ['Key-value stores', 'Database reads and writes', 'Basic distributed systems'],
    theoryAndConcepts: [
      { heading: '1. Cache placement and access patterns', content: 'In cache-aside, the application checks the cache, loads a miss from the source, then populates the cache. Read-through delegates loading to the cache layer. Write-through updates the source and cache together from the caller\'s perspective; write-behind acknowledges cache writes before asynchronously persisting them and therefore risks data loss unless durability is designed carefully. Choose a pattern based on source-of-truth and latency requirements.' },
      { heading: '2. Freshness and invalidation', content: 'A TTL bounds how long an entry may remain without refresh, but does not guarantee immediate consistency. Invalidation on writes can reduce stale windows but introduces ordering and race conditions. Versioned keys, short TTLs, explicit invalidation, and stale-while-revalidate are useful tools. Decide whether each consumer can tolerate stale values and document that contract.' },
      { heading: '3. Distributed placement and eviction', content: 'A cluster maps keys to nodes, often using consistent hashing or a proxy-managed partition map. Replication may improve availability but adds write coordination and stale-copy behavior. LRU/LFU or size-aware eviction protects bounded memory; eviction is expected, so cache entries must be reconstructible. Monitor hit rate, memory pressure, evictions, latency, and hot-key concentration.' },
      { heading: '4. Protect the source of truth', content: 'A cache stampede occurs when many requests simultaneously reload one expired key. Use request coalescing, randomized TTL jitter, refresh-ahead, or a bounded lock. Negative-cache missing keys briefly to reduce repeated misses, while validating inputs to prevent cache penetration. Apply timeouts and bulkheads so cache failure does not overwhelm the database.' }
    ],
    importantDefinitions: [
      { term: 'Cache-aside', definition: 'The application reads the cache first and fills it from the source after a miss.' },
      { term: 'TTL', definition: 'Time-to-live: an expiry bound after which an entry is treated as stale or absent.' },
      { term: 'Cache stampede', definition: 'A burst of concurrent misses that reloads the same expensive item and overloads its source.' },
      { term: 'Cache invalidation', definition: 'Removing or updating cached state when source data changes.' },
      { term: 'Hot key', definition: 'A key receiving disproportionate traffic and concentrating load on one cache partition.' }
    ],
    stepByStepExamples: [{ title: 'Serve a product detail request with cache-aside', steps: ['Build a canonical cache key from product ID and representation version.', 'Read the cache with a short timeout; on hit, return the value with its freshness metadata.', 'On miss, query the source of truth and handle not-found separately.', 'Populate the cache with a bounded TTL plus jitter; coalesce concurrent loads for a hot miss.', 'On cache failure, fall back only within database concurrency limits and report degraded behavior.'] }],
    realWorldExamples: [
      { title: 'Product catalog', description: 'Cache public product details for seconds or minutes while invalidating or versioning entries after catalog updates.' },
      { title: 'User session lookup', description: 'Cache a frequently accessed session record with a TTL that does not exceed its authorization lifetime.' }
    ],
    visualExample: 'Request -> App -> Cache cluster --hit--> Response\n                    | miss\n                    v\n                 Database -> populate cache -> Response\n\nWrites update source of truth; invalidate/version cached representations.',
    designTradeoffs: { advantages: ['Reduces repeated source reads and often lowers latency.', 'Can absorb read bursts and isolate source databases from reusable work.'], disadvantages: ['Adds stale-data windows, invalidation complexity, memory cost, and another dependency.', 'Hit-rate collapse or cache failure can expose a much higher source load.'], tradeoffs: ['Long TTL improves hit rate but extends staleness; short TTL improves freshness but increases misses.', 'Cache-aside is simple and resilient to cache loss, while write-through and write-behind change write latency and durability semantics.'] },
    commonMistakes: ['Treating a cache as the durable source of truth without an explicit persistence guarantee.', 'Using identical TTLs for all keys and causing synchronized expiration.', 'Caching authorization decisions beyond their valid lifetime.', 'Failing open to an overloaded database when the cache is unavailable.'],
    bestPractices: ['Define freshness and stale-read limits per data type.', 'Use bounded timeouts, TTL jitter, request coalescing, and negative caching where appropriate.', 'Keep keys versioned and canonical; avoid putting secrets or unbounded user input in keys.', 'Load-test cold-cache and cache-outage behavior.'],
    interviewQuestions: [
      interview('Describe cache-aside and its main failure mode.', 'The application checks the cache, loads the source on a miss, and writes the result back. It is simple and tolerates cache loss, but concurrent misses can stampede the source and cached values can remain stale until expiry or invalidation.'),
      interview('Does a TTL guarantee that cached data is fresh?', 'No. TTL bounds the cache entry lifetime after insertion, but data can become stale before expiry. It also does not guarantee synchronized invalidation across replicas.'),
      interview('How do you prevent a cache stampede?', 'Coalesce concurrent loads for the same key, add TTL jitter, refresh ahead, or use a carefully bounded single-flight lock. Protect the origin with concurrency limits and timeouts.'),
      interview('When is write-behind risky?', 'When the cache acknowledges data before durable persistence and a crash or eviction can lose writes. It requires durable queues/logging, replay, ordering, and an explicit accepted-loss model.'),
      interview('What metrics indicate a cache problem?', 'Hit rate alone is insufficient. Watch latency, errors, evictions, memory pressure, hot-key skew, origin load on misses, and stale-data behavior.'),
    ],
    mcqs: [
      mcq('In cache-aside, who typically loads the source after a miss?', ['The application', 'The database automatically pushes every row', 'The DNS resolver', 'The load balancer'], 0, 'The application checks the cache, queries the source on a miss, then populates the cache.'),
      mcq('What is a cache stampede?', ['Many concurrent misses reload the same expensive item', 'A cache key is encrypted at rest', 'An eviction policy removes least-used entries', 'A database replica catches up'], 0, 'An expired or missing hot key can trigger many identical source loads at once.'),
      mcq('What does a TTL primarily provide?', ['A bound on the age of an entry since it was cached', 'Immediate consistency across all replicas', 'Permanent storage', 'Exactly-once write delivery'], 0, 'TTL expiration limits residence time; it does not promise instant synchronization.'),
      mcq('Why add random jitter to cache TTLs?', ['To avoid many entries expiring simultaneously', 'To make cache keys unique per request', 'To prevent all evictions', 'To guarantee the origin never receives a miss'], 0, 'Jitter spreads expiration times and reduces synchronized bursts against the source.'),
      mcq('What should happen if cached data is evicted?', ['The application should be able to reconstruct it from an authoritative source', 'The cache must restore it from a client', 'Eviction means the data is permanently lost', 'The load balancer should return the cached value'], 0, 'A cache is generally an optimization; evicted values must be reloadable unless a durable cache design is explicitly intended.'),
    ],
    practicalExercise: {
      title: 'Cache a changing product catalog', prompt: 'Design caching for product detail reads that are frequent, while prices and inventory can change during a sale.',
      requirements: ['Identify cache keys and which fields may be cached together.', 'Set freshness policies for descriptive fields, price, and inventory.', 'Handle hot items and a cache outage.', 'Explain invalidation after an update.'],
      hints: ['Different fields may need different freshness guarantees.', 'Do not let cache failure create unlimited database concurrency.', 'TTL jitter and request coalescing help with hot keys.'],
      suggestedSolution: 'Cache product descriptions by product ID and representation version with a moderate TTL and jitter. Treat price and inventory as separately versioned or freshly read values if checkout correctness requires it. Publish invalidation/version updates after committed catalog writes. Coalesce hot misses and cap origin concurrency. During cache failure, serve only data whose stale policy permits it and protect the database with admission control.',
      reviewChecklist: ['Cache is not treated as the source of truth.', 'Freshness differs appropriately by data type.', 'Hot-key/cold-cache behavior is addressed.', 'Outage behavior protects the origin database.']
    },
    revisionSummary: ['A cache improves repeated work; its entries should be reconstructible.', 'Choose cache pattern and staleness contract deliberately.', 'TTL, invalidation, jitter, coalescing, and negative caching address different problems.', 'Test cache outage and cold-start load, not only the warm hit path.']
  },

  'database-sharding': {
    id: 'database-sharding', subjectId: 'systemdesign', order: 4, title: 'Database Sharding', estimatedTime: '50 mins',
    introduction: 'Sharding partitions a dataset across independent database nodes so storage and request load can grow beyond one machine. It can improve write capacity, but makes routing, rebalancing, transactions, and operations more complex.',
    learningObjectives: ['Distinguish sharding from replication and partitioning within one database.', 'Choose and evaluate a shard key.', 'Explain routing, hot partitions, cross-shard queries, and rebalancing.', 'Plan shard-key evolution and failure recovery.'],
    prerequisites: ['Relational databases', 'Indexes and transactions', 'Scalability'],
    theoryAndConcepts: [
      { heading: '1. Partition data and route requests', content: 'A shard is an independently managed subset of data. Hash sharding maps a key to a shard and tends to distribute load evenly, but range queries and range locality are weaker. Range sharding preserves key order and supports ranges, but sequential or skewed keys can create hotspots. Directory-based sharding uses a lookup service for flexible placement, at the cost of another critical mapping layer.' },
      { heading: '2. Select a shard key', content: 'A useful shard key has high cardinality, distributes reads and writes, and appears in common request predicates. It also needs to align with transactions and query locality. If a request frequently needs multiple shards, the system may fan out and merge results. Avoid choosing a key solely because it is a primary key; model real access patterns and tenant skew.' },
      { heading: '3. Reshard and rebalance', content: 'Adding nodes can require moving data while writes continue. Use a migration plan with dual reads or writes only when correctness can be proven, copy checkpoints, checksums, cutover gates, and rollback. Consistent hashing reduces remapping in some designs but does not remove data movement or operational complexity. Capacity planning should include uneven shards and growth headroom.' },
      { heading: '4. Transactions and global constraints', content: 'Single-shard transactions retain local database guarantees. Cross-shard atomic transactions are harder and may require distributed transaction protocols, sagas, or application-level invariants. Global uniqueness, ordering, joins, and backups need deliberate design. Replication can be layered onto shards for availability, but it is not a substitute for partitioning.' }
    ],
    importantDefinitions: [
      { term: 'Shard', definition: 'An independently stored and served partition of a larger logical dataset.' },
      { term: 'Shard key', definition: 'The value used to determine which shard owns a record or request.' },
      { term: 'Fan-out query', definition: 'A query sent to multiple shards whose results must be combined.' },
      { term: 'Hot shard', definition: 'A partition receiving disproportionate traffic or storage growth.' },
      { term: 'Rebalancing', definition: 'Moving data or ownership among shards to restore capacity or distribution.' }
    ],
    stepByStepExamples: [{ title: 'Partition a multi-tenant event store', steps: ['Measure tenant request rates, data volume, retention, and query patterns.', 'Choose a tenant-aware shard key only if large tenants can be isolated or subdivided.', 'Create a routing map and make every read/write path use the same ownership rule.', 'Backfill existing events with checkpoints and checksums while preserving ongoing writes.', 'Cut over a bounded cohort, verify read/write parity, then expand and retain a rollback path.'] }],
    realWorldExamples: [
      { title: 'Multi-tenant SaaS', description: 'Route records by tenant so tenant-scoped queries stay local; isolate unusually large tenants to prevent one customer dominating a shared shard.' },
      { title: 'Time-series events', description: 'Partition by time and another distribution key to support retention windows, while preventing current-time writes from all hitting one range shard.' }
    ],
    visualExample: 'request(tenantId, recordId)\n        |\n   shard map / hash(tenantId)\n      /       |       \\\n  Shard A   Shard B   Shard C\n\nTenant-local reads -> one shard\nCross-tenant analytics -> fan-out or separate analytical store',
    designTradeoffs: { advantages: ['Distributes storage and write throughput beyond one database node.', 'Can isolate tenants or workloads and allow independent capacity growth.'], disadvantages: ['Cross-shard transactions, joins, uniqueness, backup, and query fan-out are harder.', 'A poor key creates hot shards and re-sharding is an operationally risky migration.'], tradeoffs: ['Hash keys improve distribution but can weaken range locality; range keys preserve locality but can skew.', 'Shard only after simpler options such as indexing, query tuning, vertical capacity, and read replicas no longer meet measured goals.'] },
    commonMistakes: ['Using a low-cardinality or skewed shard key.', 'Assuming a database primary key automatically distributes workload.', 'Ignoring cross-shard uniqueness and transaction requirements.', 'Treating consistent hashing as eliminating data migration.'],
    bestPractices: ['Model query patterns and tenant skew before choosing the key.', 'Keep shard routing observable, deterministic, and versioned.', 'Run migration rehearsals with checksums, checkpoints, and rollback criteria.', 'Keep shard count and placement flexible enough for expected growth.'],
    interviewQuestions: [
      interview('How is sharding different from replication?', 'Sharding divides records among nodes to distribute storage and request work. Replication copies data among nodes, commonly to improve read capacity or availability. Systems often combine both.'),
      interview('What makes a good shard key?', 'It distributes volume and traffic, has sufficient cardinality, and aligns with common query and transaction boundaries. Tenant skew and future access patterns matter as much as theoretical uniformity.'),
      interview('What is a hot shard and how might you address it?', 'A shard with disproportionate load or growth. Repartition, split a large tenant, add a secondary distribution dimension, or isolate the hot workload; each option changes routing and migration complexity.'),
      interview('Why are cross-shard joins expensive?', 'Data must be fetched from multiple nodes, transferred, and merged, often with weaker transactional guarantees and higher tail latency. Data locality or a separate analytical model can reduce this cost.'),
      interview('How would you migrate to a new shard layout safely?', 'Copy data with checkpoints and checksums, define how concurrent writes are captured, verify old/new reads, cut over gradually, monitor parity and errors, and retain a bounded rollback strategy.'),
    ],
    mcqs: [
      mcq('What is the primary purpose of sharding?', ['Partition data and workload across independent nodes', 'Keep an identical full copy on every node', 'Replace indexes with caches', 'Guarantee globally serializable transactions'], 0, 'Sharding distributes subsets of data; replication copies data and does not itself partition it.'),
      mcq('Which shard key is most likely to create a hot range shard for new events?', ['A monotonically increasing timestamp used as the sole range key', 'A balanced tenant hash with measured skew controls', 'A stable high-cardinality customer ID', 'A directory mapping with bounded partitions'], 0, 'New timestamps cluster at the newest range, concentrating writes on the current partition.'),
      mcq('What is a common cost of hash sharding?', ['Range queries may need to visit many shards', 'Every write is automatically replicated synchronously', 'It prevents record-level lookups', 'It removes the need for a shard key'], 0, 'Hashing spreads keys but loses ordering locality, so range queries can fan out.'),
      mcq('Why is replication not a replacement for sharding?', ['Replicas usually contain copies rather than separate data subsets', 'Replication cannot improve availability', 'Sharding always improves read consistency', 'Replicas do not store data'], 0, 'Replication duplicates data; sharding partitions it to distribute storage and write work.'),
      mcq('Which migration safeguard helps detect incomplete or corrupted copies?', ['Checksums and row-count or range parity verification', 'Increasing client retries without limits', 'Disabling all monitoring during cutover', 'Changing shard keys without recording mapping'], 0, 'Checksums and parity checks provide evidence that copied data matches before cutover.'),
    ],
    practicalExercise: {
      title: 'Shard a tenant event database', prompt: 'A SaaS event table has outgrown one database. Tenants query their own events; a few tenants are much larger than average.',
      requirements: ['Choose a partition key and address large-tenant skew.', 'Explain tenant-scoped and cross-tenant query behavior.', 'Describe online migration and rollback.', 'State how backups and global identifiers work.'],
      hints: ['A tenant ID may preserve locality but needs a plan for whales.', 'Global IDs do not automatically enforce uniqueness across shards.', 'Cross-tenant analytics can use a separate read model.'],
      suggestedSolution: 'Route most tenants by a stable tenant hash, but maintain a directory that can assign oversized tenants multiple subpartitions or dedicated shards. Keep tenant-scoped operations local; send cross-tenant reporting to an asynchronous analytical store. Use globally unique IDs or scoped uniqueness rules. Backfill with checkpoints and checksums, capture concurrent writes, compare reads, then cut over gradually with a reversible routing map. Back up each shard and test restore at the logical dataset level.',
      reviewChecklist: ['Shard key reflects query locality and tenant skew.', 'Cross-shard operations have an explicit plan.', 'Migration captures live writes and verifies copied data.', 'Uniqueness, backup, and rollback are addressed.']
    },
    revisionSummary: ['Sharding partitions data; replication copies it.', 'Select keys using distribution, access patterns, transactions, and skew.', 'Cross-shard queries and invariants cost latency and complexity.', 'Re-sharding is a migration requiring verification and rollback.']
  },

  'message-queues': {
    id: 'message-queues', subjectId: 'systemdesign', order: 5, title: 'Message Queues', estimatedTime: '50 mins',
    introduction: 'A message queue decouples producers from consumers and buffers work across time. It improves resilience and burst handling only when delivery semantics, ordering, retries, and back-pressure are designed explicitly.',
    learningObjectives: ['Distinguish queues from pub/sub logs and understand consumer groups.', 'Explain acknowledgment, redelivery, ordering, and delivery guarantees.', 'Design idempotent consumers, retries, and dead-letter handling.', 'Use queue depth and age to reason about capacity and overload.'],
    prerequisites: ['HTTP request lifecycle', 'Database transactions', 'Basic concurrency'],
    theoryAndConcepts: [
      { heading: '1. Producer, broker, and consumer', content: 'A producer publishes a message to a broker; the broker persists or buffers it according to configured durability; a consumer retrieves and processes it. A queue commonly distributes each message to one competing consumer. A pub/sub topic can deliver each event to multiple subscriptions. A partitioned log retains ordered records per partition and lets consumer groups track offsets.' },
      { heading: '2. Delivery and acknowledgment', content: 'At-most-once can lose work; at-least-once redelivers until acknowledged and can produce duplicates; exactly-once claims usually apply only within bounded broker/transaction scopes and do not magically cover external side effects. Acknowledge after durable processing, and make effects idempotent using a message ID, unique constraint, or deduplication record.' },
      { heading: '3. Ordering, retries, and poison messages', content: 'Global ordering limits parallelism; partition ordering preserves order only within a partition/key. Retry transient failures with bounded exponential backoff and jitter. A permanently invalid message should not block a partition forever; after policy-defined attempts, route it to a dead-letter queue with diagnostics and a replay procedure.' },
      { heading: '4. Back-pressure and operations', content: 'Queues absorb bursts but do not create processing capacity. If arrivals exceed consumer throughput for long enough, backlog grows until storage or latency goals fail. Monitor oldest-message age, enqueue/dequeue rates, redeliveries, consumer lag, and dead-letter volume. Bound message size, retention, concurrency, and producer buffering.' }
    ],
    importantDefinitions: [
      { term: 'Acknowledgment', definition: 'A consumer signal that allows the broker to consider a message successfully handled.' },
      { term: 'At-least-once delivery', definition: 'Messages are retried until acknowledged, so duplicates are possible.' },
      { term: 'Idempotent consumer', definition: 'A consumer whose repeated processing of the same logical message has no additional harmful effect.' },
      { term: 'Consumer lag', definition: 'The amount or age of published work not yet processed by a consumer group.' },
      { term: 'Dead-letter queue', definition: 'A destination for messages that exceed retry or validity policy, enabling inspection and controlled replay.' }
    ],
    stepByStepExamples: [{ title: 'Process an order confirmation event', steps: ['Persist the order and an outbox event in one database transaction.', 'Publish the outbox event with a stable event ID and schema version.', 'Consumer reads the event and checks a durable deduplication key.', 'Apply the notification side effect with an idempotency key, then acknowledge.', 'Retry transient failures with backoff; send poison messages to a monitored dead-letter path.'] }],
    realWorldExamples: [
      { title: 'Order processing', description: 'An order event triggers independent fulfillment, email, and analytics subscriptions without making checkout wait for each consumer.' },
      { title: 'Image transformations', description: 'Upload requests enqueue resize jobs; workers scale with backlog age while the API remains responsive.' }
    ],
    visualExample: 'Producer -> durable broker / topic -> consumer group\n                         |                 |\n                   retention       retry + acknowledge\n                                           | failure limit\n                                           v\n                                      dead-letter queue',
    designTradeoffs: { advantages: ['Decouples service availability and absorbs short-lived bursts.', 'Enables independent consumer scaling and asynchronous workflows.'], disadvantages: ['Adds eventual consistency, duplicate delivery, operational infrastructure, and debugging complexity.', 'Backlogs can hide failures and increase end-to-end completion time.'], tradeoffs: ['Higher durability and replication can add publish latency and cost.', 'More ordering reduces parallelism; larger concurrency increases throughput but may overload downstream systems.'] },
    commonMistakes: ['Assuming at-least-once delivery means exactly-once side effects.', 'Acknowledging before work is durable.', 'Retrying permanent failures forever and blocking useful work.', 'Scaling producers without watching consumer capacity and oldest-message age.'],
    bestPractices: ['Use stable event IDs, versioned schemas, and idempotent consumers.', 'Use an outbox or equivalent to avoid database/event dual-write loss.', 'Set bounded retries, dead-letter policy, retention, and replay ownership.', 'Alert on message age and consumer lag, not only queue depth.'],
    interviewQuestions: [
      interview('Why can a queue improve resilience but not guarantee availability?', 'It can buffer work during temporary consumer failures, but broker failure, exhausted retention, or prolonged consumer under-capacity still stops progress. Durability and recovery depend on its configuration and operations.'),
      interview('How do at-least-once and at-most-once differ?', 'At-least-once retries until acknowledgment and may duplicate; at-most-once avoids redelivery but may lose work. The right choice depends on whether duplicates or loss are more acceptable.'),
      interview('How do you make a consumer safe under redelivery?', 'Use a stable message ID and make processing idempotent, for example with a unique database constraint or a transactional deduplication record. Coordinate external side effects with idempotency keys where available.'),
      interview('What does a dead-letter queue solve, and what does it not solve?', 'It isolates messages that repeatedly fail so they do not block normal processing and can be inspected. It does not fix the underlying issue; alerting, ownership, replay safety, and retention are still needed.'),
      interview('How do partitions affect ordering and throughput?', 'Ordering is usually guaranteed only within a partition. More partitions can increase parallelism, but consumers processing the same key must preserve the required per-key order.'),
    ],
    mcqs: [
      mcq('What delivery behavior commonly creates duplicate processing?', ['At-least-once redelivery after a consumer fails before acknowledgment', 'A message with a schema version', 'A queue with retention', 'A consumer group with one member'], 0, 'If processing completes but acknowledgment is lost, the broker may redeliver the message.'),
      mcq('When should a consumer acknowledge a message?', ['After its required effects are durably recorded', 'Before parsing the message', 'As soon as it is received, regardless of work', 'Only after the queue is empty'], 0, 'Acknowledging too early can lose work after a crash; exact sequencing depends on the consumer transaction design.'),
      mcq('What metric best reflects how long queued work has waited?', ['Age of the oldest unprocessed message', 'Number of producer hosts', 'Broker hostname length', 'Average payload character count'], 0, 'Oldest-message age directly reveals user-visible processing delay and stalled consumers.'),
      mcq('What is a dead-letter queue for?', ['Isolating messages that exceed failure policy for inspection', 'Guaranteeing exactly-once delivery', 'Replacing consumer acknowledgments', 'Storing every successful response forever'], 0, 'DLQs provide a controlled path for poison messages; they do not solve their cause automatically.'),
      mcq('Why use an outbox pattern?', ['To atomically record business state and an event intent in one database transaction', 'To avoid all message duplication', 'To guarantee external APIs never fail', 'To make consumers synchronous'], 0, 'An outbox avoids a dual-write gap between committing database state and publishing the corresponding event.'),
    ],
    practicalExercise: {
      title: 'Design asynchronous order fulfillment', prompt: 'After checkout, notify fulfillment, email, and analytics systems without making checkout wait for all three.',
      requirements: ['Define the event and delivery guarantee.', 'Prevent lost publication between database commit and broker publish.', 'Handle duplicates and a failing consumer.', 'Explain ordering, retries, and monitoring.'],
      hints: ['Use a transactional outbox for the order database/event boundary.', 'Consumers should be idempotent.', 'Separate consumer groups when each subscriber needs its own copy.'],
      suggestedSolution: 'Commit the order and an outbox row atomically. A publisher reads outbox rows and publishes versioned OrderPlaced events with stable IDs. Use separate subscriptions for fulfillment, email, and analytics. Each consumer deduplicates by event ID and acknowledges only after durable handling. Retry transient failures with backoff; route invalid or exhausted messages to a monitored DLQ. Track oldest-event age, lag, retries, and replay results.',
      reviewChecklist: ['Database commit and event publication cannot silently diverge.', 'Duplicate handling is explicit.', 'Independent subscribers each receive required events.', 'Retry/DLQ and lag monitoring have an owner.']
    },
    revisionSummary: ['Queues decouple time and availability; they do not add consumer capacity.', 'At-least-once means duplicates are possible; use idempotency.', 'Ordering is generally scoped to a queue or partition.', 'Monitor oldest-message age, lag, retries, and dead letters.']
  },

  cdn: {
    id: 'cdn', subjectId: 'systemdesign', order: 6, title: 'CDN', estimatedTime: '40 mins',
    introduction: 'A content delivery network serves cacheable content from points of presence closer to users. It can reduce origin load and delivery latency, but cache keys, freshness, and invalidation must match the content and security model.',
    learningObjectives: ['Explain edge, regional cache, and origin roles.', 'Design cache keys and HTTP cache policy.', 'Distinguish TTL expiry, purge, and versioned assets.', 'Protect personalized and private content from cache leakage.'],
    prerequisites: ['HTTP headers', 'DNS basics', 'Distributed caching'],
    theoryAndConcepts: [
      { heading: '1. Request path and cache hierarchy', content: 'A client resolves a hostname to a nearby CDN point of presence. The edge checks its cache; on a miss it may consult a regional tier or fetch from the origin. A hit serves content without repeating the origin request. Anycast, DNS steering, and provider routing can influence edge selection; the exact mechanism is provider-dependent.' },
      { heading: '2. Cache key and HTTP policy', content: 'A cache key commonly includes host, path, and selected query/header dimensions. Including too many dimensions reduces hit rate; omitting a representation dimension can serve the wrong variant. Cache-Control directives, shared-cache rules, validators such as ETag, and Vary define freshness and reuse. Cookies and authorization require particular care.' },
      { heading: '3. Invalidation and content updates', content: 'TTL expiry is simple but can leave old content until the freshness window ends. Purge APIs remove selected objects but may be asynchronous or expensive at scale. Content-addressed or versioned filenames make immutable assets easy to cache for a long time; HTML or manifests can point to the new version. Stale-while-revalidate can improve resilience when stale content is acceptable.' },
      { heading: '4. Security and origin protection', content: 'Prevent direct origin access where possible, use authenticated origin pulls or signed requests, and ensure cache rules respect user authorization. Signed URLs/cookies can grant time-limited access to private objects. Rate limits and origin shielding reduce abuse and miss storms. Observe hit ratio by path class, origin egress, cache status, and purge outcomes.' }
    ],
    importantDefinitions: [
      { term: 'Point of presence (PoP)', definition: 'A CDN edge location where requests can be served or forwarded.' },
      { term: 'Cache key', definition: 'The request attributes that determine whether two requests may reuse the same cached response.' },
      { term: 'Origin', definition: 'The authoritative server from which a CDN obtains content on a cache miss.' },
      { term: 'Cache-Control', definition: 'HTTP response directives that communicate freshness and shared/private caching policy.' },
      { term: 'Origin shielding', definition: 'An intermediate cache tier that consolidates edge misses before they reach the origin.' }
    ],
    stepByStepExamples: [{ title: 'Publish versioned frontend assets', steps: ['Build assets with content hashes in their filenames.', 'Configure the origin to return long-lived immutable caching for those assets.', 'Use a short-lived or revalidated HTML document that references the current hashed assets.', 'Deploy new files before publishing HTML that references them.', 'Purge or revalidate only mutable entry documents; retain old assets long enough for active clients.'] }],
    realWorldExamples: [
      { title: 'Global media delivery', description: 'Images and video segments are cached near viewers, reducing origin bandwidth and improving startup latency.' },
      { title: 'Software download portal', description: 'Versioned binaries are immutable and can be cached for long periods with integrity checks.' }
    ],
    visualExample: 'Browser -> nearest CDN edge -> regional shield -> origin\n             | hit          | miss              |\n             +--------------+-------------------+\n                  serve cached representation\n\nCache key + HTTP policy determine which response is reusable.',
    designTradeoffs: { advantages: ['Moves static or cacheable bytes closer to users and reduces origin bandwidth.', 'Absorbs some traffic spikes and can provide edge TLS, routing, and security controls.'], disadvantages: ['Invalidation, cache-key correctness, provider dependency, and debugging add complexity.', 'A misconfigured shared cache can leak private or personalized content.'], tradeoffs: ['Long freshness improves hit ratio but delays updates; short freshness increases origin traffic.', 'Purge is flexible but can be costly or eventually applied; versioned immutable paths are predictable for static assets.'] },
    commonMistakes: ['Caching authenticated responses as public shared content.', 'Ignoring query parameters or headers that change the representation.', 'Publishing HTML before its versioned assets are available.', 'Assuming a purge instantly clears every edge and browser cache.'],
    bestPractices: ['Separate public immutable assets from personalized or sensitive responses.', 'Use explicit cache keys and test variants, cookies, authorization, and query strings.', 'Version static asset URLs and use validators for mutable documents.', 'Restrict origin access and monitor cache status and purge completion.'],
    interviewQuestions: [
      interview('How does a CDN reduce latency and origin load?', 'It serves reusable content from edge locations nearer to clients. Cache hits avoid an origin round trip and reduce repeated origin work; misses still fetch from upstream.'),
      interview('Why is cache-key design important?', 'Requests with the same key may share a response. Omitting a representation dimension can return incorrect or private content; adding unnecessary dimensions lowers hit ratio.'),
      interview('How do versioned assets simplify invalidation?', 'A content-hashed URL changes when the asset changes, so old cached content cannot be mistaken for the new version. The HTML or manifest that references it can have a shorter freshness policy.'),
      interview('What is the risk of caching a response with user-specific data?', 'A shared cache can serve one user\'s response to another if the key or cache directives do not isolate identity. Private/authenticated responses should not be shared unless authorization is safely part of the cache design.'),
      interview('What does origin shielding do?', 'It consolidates requests from multiple edges through an intermediate cache, reducing duplicate origin fetches. It adds a tier and may add latency on misses.'),
    ],
    mcqs: [
      mcq('What does a CDN cache hit usually avoid?', ['A fetch from the origin for that representation', 'All DNS lookups permanently', 'The need for a correct cache key', 'The client\'s network connection'], 0, 'A hit allows an edge or cache tier to serve the stored representation without contacting the origin.'),
      mcq('What is a dangerous cache-key mistake?', ['Omitting a header that changes personalized response content', 'Including the hostname in the key', 'Versioning immutable asset filenames', 'Using an ETag validator'], 0, 'If responses differ by a missing key dimension, a shared cache may return the wrong user\'s or variant\'s content.'),
      mcq('Why are content-hashed static filenames useful?', ['A changed asset gets a new URL that can be cached immutably', 'They make mutable HTML permanently fresh', 'They eliminate the need to deploy assets', 'They guarantee CDN availability'], 0, 'A content hash changes when bytes change, allowing long-lived caching without confusing old and new assets.'),
      mcq('What is origin shielding intended to do?', ['Consolidate edge misses before they reach the origin', 'Encrypt browser storage', 'Replace all cache keys', 'Force every request to the origin'], 0, 'A shield tier can collapse duplicated edge misses and reduce origin load.'),
      mcq('Which response is generally unsafe for shared public caching by default?', ['A personalized account page containing private user data', 'A versioned public logo', 'A public documentation stylesheet', 'A content-addressed public font file'], 0, 'Personalized data must not be reused across users by a shared cache without a carefully isolated authorization-aware design.'),
    ],
    practicalExercise: {
      title: 'Deliver a global learning portal', prompt: 'Design CDN behavior for public course images, versioned JS/CSS, and authenticated student dashboards.',
      requirements: ['Define cache policy for each content class.', 'Explain cache keys and invalidation.', 'Protect private dashboard data and origin.', 'Describe deployment ordering and monitoring.'],
      hints: ['Public immutable files and personalized HTML need different policies.', 'Ensure query, cookie, and authorization variants are intentional.', 'Deploy content before references to it.'],
      suggestedSolution: 'Cache public images and hashed JS/CSS with long immutable freshness. Use short freshness or revalidation for public HTML. Mark authenticated dashboards private/no-store unless a deliberate per-user edge cache is implemented. Restrict origin access to the CDN, validate signed access for protected downloads, and monitor cache hit ratio, origin errors, and purge completion. Deploy hashed assets before publishing the new HTML manifest.',
      reviewChecklist: ['Content classes have distinct freshness policies.', 'Private responses cannot cross user boundaries.', 'Cache key dimensions are explicit.', 'Deployment and invalidation sequencing are safe.']
    },
    revisionSummary: ['CDNs cache reusable representations near clients.', 'Cache-key correctness is both a correctness and security requirement.', 'Version immutable assets; revalidate mutable documents.', 'Treat purges as distributed operations and protect the origin.']
  },

  'cap-theorem': {
    id: 'cap-theorem', subjectId: 'systemdesign', order: 7, title: 'CAP Theorem', estimatedTime: '45 mins',
    introduction: 'CAP describes a trade-off that appears when a distributed data system experiences a network partition: it cannot guarantee both a single-copy consistent response and a successful response from every non-failing node. The theorem is about behavior during partitions, not a simple permanent choice of two letters.',
    learningObjectives: ['Define consistency, availability, and partition tolerance in CAP terms.', 'Explain why partitions force a consistency/availability choice for affected operations.', 'Distinguish CAP consistency from ACID consistency and linearizability.', 'Relate CAP to quorum reads/writes and real product requirements.'],
    prerequisites: ['Replication', 'Network failures', 'Database consistency'],
    theoryAndConcepts: [
      { heading: '1. The three properties', content: 'CAP consistency is commonly formalized as linearizability: operations appear to take effect atomically in one order consistent with real time. Availability means every request to a non-failing node receives a non-error response, though the response may not contain the latest value. Partition tolerance means the system continues operating despite messages being lost or delayed between groups of nodes. In a real distributed network, partitions must be handled rather than assumed away.' },
      { heading: '2. What the trade-off actually says', content: 'When a partition separates replicas, a request may reach only one side. A system that accepts conflicting writes on both sides can remain responsive but later needs conflict resolution and may expose stale state. A system that refuses operations without quorum can preserve a single-copy history but some requests fail or wait. Thus CP and AP describe choices under partition for a particular operation/system design, not a claim that a product never has the third property.' },
      { heading: '3. Quorums and consistency models', content: 'For N replicas, read quorum R and write quorum W with R + W > N ensure overlap under assumptions about membership and successful writes, but do not alone guarantee linearizability; ordering, consensus, failure detection, and configuration changes matter. Eventual consistency allows replicas to converge if updates stop and communication resumes. Stronger models cost latency, coordination, or availability under failures.' },
      { heading: '4. Choose by operation semantics', content: 'A shopping cart may accept concurrent updates and reconcile them, while a bank balance or seat reservation may reject writes without coordination to prevent invalid states. Define what stale reads or rejected writes mean to the user. CAP does not replace analysis of latency, durability, consistency models, or failures outside partitions.' }
    ],
    importantDefinitions: [
      { term: 'CAP consistency', definition: 'Linearizable behavior: each completed operation appears to occur atomically in a real-time-consistent order.' },
      { term: 'Availability (CAP)', definition: 'Every request to a non-failing node receives a non-error response, not necessarily the latest value.' },
      { term: 'Partition tolerance', definition: 'The system continues to operate despite communication failures between node groups.' },
      { term: 'Eventual consistency', definition: 'Replicas converge if updates stop and communication continues, without promising every read is immediately current.' },
      { term: 'Quorum', definition: 'A threshold number of replicas required to acknowledge a read or write operation.' }
    ],
    stepByStepExamples: [{ title: 'Reason about a partitioned inventory service', steps: ['Identify the invariant: a limited item must not be sold more times than stock allows.', 'Model a partition that leaves two replica groups unable to coordinate.', 'Decide whether both groups may accept reservations or one group must reject/wait.', 'Define what the client sees on timeout and how it retries without duplicating a reservation.', 'Test healing behavior, conflict resolution, and reconciliation of any accepted updates.'] }],
    realWorldExamples: [
      { title: 'Bank account transfer', description: 'A service may reject or delay a transfer when it cannot coordinate the authoritative balance, favoring invariant preservation over accepting every write.' },
      { title: 'Social reaction counter', description: 'A system may accept updates in multiple regions and reconcile a slightly stale count later if brief disagreement is acceptable.' }
    ],
    visualExample: 'Before partition: Replica A <---- network ----> Replica B\nDuring partition: Replica A   X   Replica B\n\nCP-style operation: one side refuses/waits without safe quorum\nAP-style operation: both sides respond; conflict/staleness is part of the contract',
    designTradeoffs: { advantages: ['CAP gives a useful way to discuss failure behavior and user-visible semantics.', 'It forces explicit decisions about coordination, stale data, and rejected writes.'], disadvantages: ['It is often oversimplified into a permanent pick-two slogan.', 'It says little by itself about latency, durability, recovery, or normal-operation behavior.'], tradeoffs: ['During a partition, prioritize consistency for invariants that cannot tolerate conflicting accepted writes; prioritize availability where stale or mergeable results are acceptable.', 'The choice may differ by operation, key, or subsystem rather than applying to an entire product.'] },
    commonMistakes: ['Saying a system permanently chooses any two of C, A, and P.', 'Confusing CAP consistency with ACID constraint consistency.', 'Calling every timeout a partition or assuming all partitions are symmetric.', 'Claiming quorum overlap alone guarantees linearizability.'],
    bestPractices: ['Describe the failure scenario and specific operation before naming CP/AP.', 'State exactly whether a request can fail, wait, return stale data, or accept a conflict.', 'Treat retries as potentially duplicated operations and use idempotency.', 'Discuss recovery and reconciliation as part of the design.'],
    interviewQuestions: [
      interview('What does CAP say during a network partition?', 'For operations affected by a partition, a distributed system cannot guarantee both linearizable consistency and CAP availability. It must reject or delay some operations to preserve consistency, or answer them and permit stale or conflicting results.'),
      interview('Does CAP mean a system permanently chooses two properties?', 'No. Partition tolerance is a reality to handle, and the trade-off becomes relevant when a partition occurs. Normal-operation behavior and different operations can have different guarantees.'),
      interview('How does CAP consistency differ from ACID consistency?', 'CAP consistency usually means linearizability or a single-copy real-time order. ACID consistency means transactions preserve application-defined invariants and constraints. They are different uses of the word consistency.'),
      interview('Does R + W > N guarantee linearizability?', 'No. It can ensure read/write quorum overlap under assumptions, but linearizability also depends on ordering, consensus or equivalent coordination, membership changes, and the exact read/write protocol.'),
      interview('Give an example of choosing availability during a partition.', 'A social reaction counter may accept increments in multiple regions and reconcile later if duplicate-safe merging is possible. The product accepts temporary stale counts rather than rejecting every update.'),
    ],
    mcqs: [
      mcq('In CAP, what is the relevant forced trade-off during a partition?', ['Linearizable consistency versus CAP availability', 'Durability versus indexing', 'Latency versus compression', 'Replication versus backup'], 0, 'The theorem says a partitioned system cannot guarantee both linearizable responses and a successful response from every non-failing node.'),
      mcq('What does CAP availability require?', ['Every request to a non-failing node receives a non-error response', 'Every response is the newest possible value', 'Every write is durable forever', 'Every node has identical storage'], 0, 'Availability in CAP is a response guarantee; it does not itself promise freshness.'),
      mcq('Which statement about CAP is accurate?', ['The trade-off is relevant when a partition occurs', 'Every product permanently selects exactly two letters', 'Partition tolerance is optional in a distributed network', 'CAP defines all ACID transaction properties'], 0, 'CAP is specifically about behavior under network partitions, not a fixed permanent product label.'),
      mcq('What is a likely consistency-first response for a bank transfer during loss of quorum?', ['Reject or wait rather than risk conflicting balance updates', 'Accept the transfer independently on every isolated replica', 'Return a random balance', 'Disable durable storage'], 0, 'Preserving balance invariants can require refusing writes until coordination is safe.'),
      mcq('Why is quorum overlap not by itself a proof of linearizability?', ['Ordering and consensus assumptions also matter', 'Quorums cannot contain replicas', 'Linearizability is the same as caching', 'A read quorum always has zero latency'], 0, 'Overlap helps ensure shared replicas, but a correct protocol must also order operations and handle membership/failure transitions.'),
    ],
    practicalExercise: {
      title: 'Choose semantics for carts and reservations', prompt: 'A multi-region travel service supports a collaborative saved itinerary and limited-seat reservations. Decide behavior during a region-to-region partition.',
      requirements: ['State the invariant for each feature.', 'Choose acceptable read/write behavior during partition.', 'Explain conflict resolution or rejection.', 'Define retry and recovery behavior.'],
      hints: ['The itinerary can often merge independent edits more safely than seat inventory.', 'A timeout does not tell a client whether a write committed.', 'Use operation IDs and a reconciliation plan.'],
      suggestedSolution: 'Allow itinerary edits in both regions with versioned operations and a deterministic merge policy, accepting temporary divergence. For seat reservations, route writes through a quorum or single authoritative inventory partition and reject or queue reservations when safe coordination is unavailable. Return an explicit pending/unknown result for ambiguous timeouts and let clients query by idempotency key. Reconcile itinerary replicas after connectivity returns and audit reservation invariants.',
      reviewChecklist: ['Each feature has a clearly stated invariant.', 'Partition behavior is described per operation.', 'Timeout/retry ambiguity is handled idempotently.', 'Recovery and conflict resolution are explicit.']
    },
    revisionSummary: ['CAP concerns behavior under network partition.', 'Consistency is usually linearizability here; availability is response, not freshness.', 'A partition forces a choice for affected operations, not a permanent two-letter product label.', 'Quorum math alone does not prove linearizability; specify the protocol and semantics.']
  },

  'rest-vs-grpc': {
    id: 'rest-vs-grpc', subjectId: 'systemdesign', order: 8, title: 'REST vs gRPC', estimatedTime: '45 mins',
    introduction: 'REST and gRPC are ways to define and invoke service APIs, not mutually exclusive system architectures. REST commonly uses resource-oriented HTTP semantics and JSON; gRPC uses generated RPC contracts, Protocol Buffers, and HTTP/2 features.',
    learningObjectives: ['Compare REST resource semantics with RPC methods.', 'Explain serialization, schema evolution, and generated clients.', 'Choose between JSON/HTTP and gRPC based on clients and workload.', 'Discuss streaming, browser constraints, observability, and compatibility.'],
    prerequisites: ['HTTP methods and status codes', 'JSON', 'API design basics'],
    theoryAndConcepts: [
      { heading: '1. REST-style HTTP APIs', content: 'REST models resources and uses HTTP methods and status codes with representations, often JSON. It is broadly interoperable with browsers, command-line tools, proxies, and standard HTTP infrastructure. A good API uses resource nouns, safe/idempotent semantics where appropriate, pagination, versioning or compatible evolution, and clear error formats; calling any JSON endpoint REST does not guarantee good REST design.' },
      { heading: '2. gRPC and Protocol Buffers', content: 'gRPC defines service methods and typed messages in a schema, generates client/server code, and commonly transports protobuf messages over HTTP/2. Compact binary encoding and multiplexed connections can help service-to-service communication. The contract enables compile-time tooling but introduces code generation, schema governance, and less direct browser/tool interoperability.' },
      { heading: '3. Streaming and operational fit', content: 'gRPC supports unary, server-streaming, client-streaming, and bidirectional-streaming RPCs. REST can also stream using HTTP mechanisms, but conventions and tooling differ. Browsers generally need gRPC-Web or a gateway for standard gRPC. Proxies, load balancers, deadlines, cancellation, tracing, and error mapping must be configured for the chosen protocol.' },
      { heading: '4. Compatibility and evolution', content: 'Protobuf field numbers are part of the wire contract: do not reuse removed field numbers, and make additive changes compatibly. REST JSON clients may tolerate unknown fields, but changing meanings or required behavior can still break clients. Define timeouts, idempotency, authentication, pagination, and deprecation policies independent of serialization format.' }
    ],
    importantDefinitions: [
      { term: 'Resource', definition: 'A domain entity or collection addressed by a URI in a resource-oriented API.' },
      { term: 'RPC', definition: 'Remote Procedure Call: invoke a named operation on a remote service using a defined request/response contract.' },
      { term: 'Protocol Buffers', definition: 'A schema-based binary serialization format with generated code and numbered fields.' },
      { term: 'Idempotent operation', definition: 'An operation that can be repeated with the same intended effect, important for safe retries.' },
      { term: 'Deadline', definition: 'The latest time by which a caller considers an operation useful; it bounds work and downstream calls.' }
    ],
    stepByStepExamples: [{ title: 'Design an internal inventory API', steps: ['List the operations, caller types, latency needs, and whether streaming is required.', 'Define the contract and error semantics before selecting transport.', 'If using gRPC, define protobuf messages and reserve removed field numbers; generate clients in supported languages.', 'Set deadlines, cancellation propagation, authentication, and observability across proxies.', 'Test compatibility with old clients and add a gateway if browser or external interoperability is required.'] }],
    realWorldExamples: [
      { title: 'Public developer API', description: 'A REST/JSON interface is easy to inspect with browser tools and works across diverse client environments.' },
      { title: 'Internal telemetry stream', description: 'A gRPC bidirectional stream can efficiently exchange typed updates between controlled services.' }
    ],
    visualExample: 'REST client --HTTP + JSON--> /orders/{id} resource API\n\nTyped client --gRPC + protobuf/HTTP2--> Inventory.GetStock(request)\n                                  <--> stream messages when needed',
    designTradeoffs: { advantages: ['REST/JSON is widely interoperable, inspectable, and supported by generic web infrastructure.', 'gRPC provides typed contracts, generated clients, compact messages, and standardized streaming.'], disadvantages: ['REST APIs can drift without schema tooling and may be verbose for high-volume internal calls.', 'gRPC adds code generation and browser/proxy constraints; binary payloads are less human-readable.'], tradeoffs: ['Choose based on client ecosystem, streaming needs, operational tooling, and compatibility—not a blanket performance claim.', 'A gateway can expose REST externally while using gRPC internally, but introduces translation and duplicated contract concerns.'] },
    commonMistakes: ['Assuming gRPC is always faster without measuring payloads, connection reuse, and end-to-end latency.', 'Reusing a deleted protobuf field number.', 'Retrying non-idempotent RPCs after ambiguous timeouts.', 'Treating HTTP status and gRPC status as interchangeable without a mapping policy.'],
    bestPractices: ['Define deadlines and cancellation propagation on every RPC.', 'Use compatible schema evolution and reserve removed protobuf fields.', 'Document idempotency, pagination, errors, auth, and deprecation.', 'Test through production-like proxies and browser paths where relevant.'],
    interviewQuestions: [
      interview('When might you choose REST over gRPC?', 'For a public or browser-facing API with broad interoperability, easy inspection, and standard HTTP tooling, REST/JSON is often simpler. The choice still depends on streaming and contract needs.'),
      interview('What does protobuf field numbering mean for schema evolution?', 'Field numbers identify fields on the wire. Removed numbers must not be reused because old and new binaries could interpret the same encoded field differently; additive optional fields are generally safer.'),
      interview('Does gRPC guarantee lower latency?', 'No. Binary encoding and HTTP/2 can help certain workloads, but network topology, payload, connection reuse, proxy behavior, serialization, and server work determine end-to-end latency. Benchmark the actual path.'),
      interview('How do deadlines differ from client-side timeouts?', 'A deadline is a time budget propagated through downstream calls so servers can stop useless work. A client-only timeout may abandon the response while the server continues consuming resources.'),
      interview('How can a browser call a gRPC service?', 'Use gRPC-Web with a compatible proxy/gateway or expose a REST/JSON facade. Native browser APIs do not generally provide arbitrary full gRPC HTTP/2 behavior.'),
    ],
    mcqs: [
      mcq('Which is a typical gRPC feature?', ['Generated typed clients from a service schema', 'Mandatory URL resource semantics', 'JSON-only wire encoding', 'No support for streaming'], 0, 'gRPC commonly uses protobuf schemas to generate typed clients and supports multiple streaming modes.'),
      mcq('What is a safe protobuf schema-evolution practice?', ['Reserve field numbers after removing fields', 'Reuse a deleted field number for a new meaning', 'Change field types freely in deployed APIs', 'Renumber all fields for readability'], 0, 'Field numbers are wire identifiers; reserving removed numbers prevents old and new schemas from misinterpreting data.'),
      mcq('Which is a reasonable reason to choose REST/JSON?', ['Broad browser and generic HTTP tooling interoperability', 'A guarantee of lower latency in all cases', 'Automatic exactly-once delivery', 'No need to define errors'], 0, 'REST/JSON works naturally with diverse web clients and HTTP tooling, though it still needs careful contract design.'),
      mcq('What should a deadline ideally do in a service call chain?', ['Bound useful work and propagate a remaining time budget downstream', 'Restart every downstream server', 'Guarantee a request succeeds before the deadline', 'Replace authentication'], 0, 'Deadline propagation allows downstream services to cancel work that can no longer satisfy the caller.'),
      mcq('After a client timeout on a non-idempotent RPC, what is the key concern?', ['The operation may have committed even though the response was lost', 'The protobuf schema is automatically rolled back', 'The server must have rejected the request', 'The network guarantees no duplicate'], 0, 'A timeout leaves outcome ambiguous; retries need idempotency keys or a queryable operation state.'),
    ],
    practicalExercise: {
      title: 'Choose APIs for a commerce platform', prompt: 'A platform has public product APIs used by web/mobile clients and high-volume internal inventory calls that need streaming updates.',
      requirements: ['Choose protocol by client boundary and operation.', 'Define compatibility and error behavior.', 'Address deadlines, retries, and observability.', 'Explain any gateway or translation layer.'],
      hints: ['Different boundaries can use different protocols.', 'Streaming support and browser interoperability differ.', 'Protocol choice does not remove idempotency or schema evolution requirements.'],
      suggestedSolution: 'Expose a versioned REST/JSON public API for products and checkout, with documented HTTP status, pagination, and idempotency keys. Use gRPC/protobuf for controlled internal inventory operations and streaming updates. Generate clients from a reviewed schema, reserve removed field numbers, propagate deadlines/cancellation, and map errors consistently. Add a gateway only where browser or partner interoperability requires it, and test both sides through deployed proxies.',
      reviewChecklist: ['Protocol choices match client and streaming needs.', 'Contract evolution and errors are defined.', 'Timeout/retry ambiguity is addressed.', 'Gateway costs and observability are included.']
    },
    revisionSummary: ['REST commonly models resources over HTTP; gRPC defines typed RPC methods.', 'gRPC supports generated contracts and streaming; browser clients may need a gateway.', 'Neither protocol guarantees a performance result without measurement.', 'Deadlines, idempotency, and compatible schema evolution matter for both.']
  },

  microservices: {
    id: 'microservices', subjectId: 'systemdesign', order: 9, title: 'Microservices', estimatedTime: '50 mins',
    introduction: 'Microservices split a system into independently deployable services organized around business capabilities. They can improve team autonomy and isolate change, but introduce network failure, data ownership, deployment, and observability costs.',
    learningObjectives: ['Explain service boundaries and bounded contexts.', 'Compare independent service data ownership with a shared database.', 'Design synchronous and asynchronous service communication.', 'Recognize when a modular monolith is the better starting point.'],
    prerequisites: ['HTTP/RPC', 'Databases and transactions', 'Deployment fundamentals'],
    theoryAndConcepts: [
      { heading: '1. Boundaries and ownership', content: 'A service boundary should align with a cohesive business capability, language, and ownership model. Each service owns its data and exposes behavior through an API or events; direct cross-service table access couples deployments and schemas. Split around stable domain boundaries, not every entity or code layer.' },
      { heading: '2. Communication and consistency', content: 'Synchronous calls are straightforward but propagate latency and availability dependencies. Asynchronous events reduce temporal coupling but introduce eventual consistency, duplicate delivery, and workflow coordination. Cross-service business transactions commonly use a saga with compensating actions rather than a distributed database transaction; compensation is not always a true rollback.' },
      { heading: '3. Reliability and operations', content: 'Every network call needs a timeout, bounded retry policy, authentication, and useful tracing. Bulkheads, circuit breakers, rate limits, and queues can contain failures, but must be tuned to actual capacity. Service discovery, deployment compatibility, schema evolution, logs, metrics, traces, and on-call ownership become part of the platform.' },
      { heading: '4. Organizational and architectural costs', content: 'Independent deployability works only when teams can own build, deploy, data, and production support. A microservice architecture can reduce coordination for large teams but increases network, infrastructure, and debugging overhead. A modular monolith with clear boundaries can preserve separation while keeping in-process transactions and simpler deployments until scale or team structure justifies extraction.' }
    ],
    importantDefinitions: [
      { term: 'Bounded context', definition: 'A boundary within which a domain model and its terms have a consistent meaning.' },
      { term: 'Service ownership', definition: 'A service team controls its behavior, interface, data lifecycle, and operational responsibility.' },
      { term: 'Saga', definition: 'A sequence of local transactions coordinated across services, with compensating actions for some failures.' },
      { term: 'Modular monolith', definition: 'One deployable application organized into explicit modules with controlled dependencies.' },
      { term: 'Distributed tracing', definition: 'Correlates spans across service calls to show an end-to-end request path and timing.' }
    ],
    stepByStepExamples: [{ title: 'Split order and payment capabilities', steps: ['Identify separate business ownership and data invariants before choosing service boundaries.', 'Keep order records in the order service and payment state behind the payment service API.', 'Define an idempotent payment command and durable order state transitions.', 'Coordinate authorization/capture with events or a saga and model compensation explicitly.', 'Add tracing, timeouts, retry limits, schema compatibility, and independent deployment checks.'] }],
    realWorldExamples: [
      { title: 'Commerce platform', description: 'Catalog, checkout, payment, and fulfillment may be separate capabilities owned by distinct teams, with events coordinating order progress.' },
      { title: 'Early-stage product', description: 'A modular monolith can keep a small team productive while preserving boundaries that may later be extracted.' }
    ],
    visualExample: 'Web/API -> Order service -> Order database\n                  | event\n                  v\n              Payment service -> Payment provider\n                  | event\n                  v\n              Fulfillment service\n\nEach service owns its data; cross-service workflows need explicit failure handling.',
    designTradeoffs: { advantages: ['Independent deploy and scale choices can align with team and workload boundaries.', 'A failure or technology choice can be isolated when interfaces and data ownership are clear.'], disadvantages: ['Network calls, distributed transactions, observability, deployment compatibility, and on-call load increase.', 'Poorly cut services create chatty coupling and partial failures without real autonomy.'], tradeoffs: ['Use synchronous calls for immediate decisions with tight deadlines; events for durable decoupled work with eventual consistency.', 'Prefer a modular monolith until independent scaling, ownership, or release constraints justify distributed operation.'] },
    commonMistakes: ['Splitting too early by database table or technical layer.', 'Sharing a database schema across services while calling them independent.', 'Building long synchronous call chains with no deadline budget.', 'Using a saga without defining idempotency, compensation, or stuck-work recovery.'],
    bestPractices: ['Align service boundaries with business capability and team ownership.', 'Keep data private and evolve APIs/events compatibly.', 'Instrument traces and define per-service SLOs and failure budgets.', 'Automate deployment, rollback, and contract tests before increasing service count.'],
    interviewQuestions: [
      interview('When would you choose a modular monolith over microservices?', 'For a small team or product without independent scaling or release constraints, a modular monolith keeps clear code boundaries with simpler deployment and local transactions. Extract services when a concrete ownership, scaling, or fault-isolation need justifies the operational cost.'),
      interview('Why should each microservice own its data?', 'Independent data ownership prevents other services from coupling to internal schemas and allows evolution. Other services use APIs or events; cross-service queries may need read models or composition.'),
      interview('What is a saga?', 'A distributed workflow composed of local transactions with messages or orchestration and compensating actions for some failures. Compensation is a new business action, not necessarily a perfect rollback.'),
      interview('How do synchronous calls affect availability?', 'A caller depends on the callee being reachable and timely. Chains multiply latency and failure probability, so use deadlines, bounded retries, bulkheads, and consider asynchronous workflows.'),
      interview('What operational capabilities are needed before adopting many services?', 'Automated build/deploy, service ownership, centralized logs/metrics/traces, discovery/configuration, secret management, schema compatibility, incident response, and rollback practices.'),
    ],
    mcqs: [
      mcq('What is a strong reason to split a service?', ['A stable business capability with independent ownership or scaling needs', 'Every database table should have a process', 'To avoid writing tests', 'Because network calls are always cheaper than function calls'], 0, 'Service boundaries should serve ownership, deployment, scaling, or fault-isolation needs, not arbitrary code granularity.'),
      mcq('What does service-owned data mean?', ['Other services use an interface rather than directly depending on its private schema', 'All services share one writable table', 'The service cannot back up its database', 'The service has no API'], 0, 'Private data ownership prevents schema coupling and enables independent evolution.'),
      mcq('What is a compensation in a saga?', ['A new business action that semantically counteracts an earlier step where possible', 'A database rollback spanning all services', 'A retry that always succeeds', 'A cache invalidation'], 0, 'Saga compensation is application-level behavior and may not exactly reverse an external side effect.'),
      mcq('Why can a long synchronous call chain be fragile?', ['Latency and failures propagate across dependencies', 'It eliminates network use', 'It guarantees exactly-once execution', 'It makes tracing unnecessary'], 0, 'Each call adds latency and another dependency that may fail or time out.'),
      mcq('Which is a reasonable early architecture for a small team?', ['A modular monolith with explicit boundaries', 'Hundreds of independently deployed services by default', 'A shared database with unrestricted writes by every team', 'No deployment automation'], 0, 'A modular monolith can preserve boundaries while avoiding distributed operational overhead until needed.'),
    ],
    practicalExercise: {
      title: 'Design an order lifecycle', prompt: 'Model checkout, payment, inventory reservation, and fulfillment across teams with independent deployments.',
      requirements: ['Define service boundaries and data ownership.', 'Describe a successful flow and at least two failure cases.', 'Handle duplicate events and compensation.', 'Define observability and deployment compatibility.'],
      hints: ['Keep the order state machine explicit.', 'External payment outcomes can be ambiguous after a timeout.', 'Compensation may require refund or release actions, not database rollback.'],
      suggestedSolution: 'Use Order, Payment, Inventory, and Fulfillment capabilities only if separate ownership or scaling warrants them; otherwise begin modular. The Order service records a pending order and emits a versioned event via outbox. Payment and Inventory consume idempotently and report outcomes. An orchestrated or choreographed saga advances the order; failures trigger explicit release/refund actions and a recoverable state. Propagate trace IDs and deadlines, monitor stuck workflows, and deploy compatible event schemas.',
      reviewChecklist: ['Boundaries have clear owners and private data.', 'Happy path and partial failures are modeled.', 'Duplicate delivery and external timeout ambiguity are handled.', 'Stuck workflows and compatible deployments are observable.']
    },
    revisionSummary: ['Microservices trade local simplicity for independent ownership/deployment.', 'Boundaries should follow business capabilities, not arbitrary technical layers.', 'Data ownership, compatibility, and distributed workflow semantics are central.', 'A modular monolith is often the right starting point.']
  },

  'rate-limiting': {
    id: 'rate-limiting', subjectId: 'systemdesign', order: 10, title: 'Rate Limiting', estimatedTime: '45 mins',
    introduction: 'Rate limiting constrains how quickly a client or workload may consume a service. It protects capacity and enforces fairness, but the algorithm, identity key, distributed state, and rejection behavior must match the API contract.',
    learningObjectives: ['Compare fixed window, sliding window, token bucket, and leaky bucket.', 'Choose a rate-limit identity and scope.', 'Reason about distributed counters, clock boundaries, and fail-open/closed behavior.', 'Return useful retry information and protect critical dependencies.'],
    prerequisites: ['HTTP status codes', 'Load balancing', 'Distributed caching'],
    theoryAndConcepts: [
      { heading: '1. Algorithms and traffic shape', content: 'A fixed window counts requests in aligned intervals; it is simple but permits bursts at boundaries. A sliding log is accurate but stores timestamps per request. A sliding counter approximates a moving window with less state. A token bucket refills tokens at a configured rate and allows a bounded burst; a leaky bucket drains at a steady rate and smooths output. These algorithms express different fairness and burst policies.' },
      { heading: '2. Identity and policy', content: 'Limits can apply per account, API key, IP, route, tenant, or global dependency. IP-only limits can penalize NAT users and are weak against distributed clients; account-only limits may not protect anonymous endpoints. Combine scopes where needed and separate abuse controls from product quotas. Ensure authenticated identity is established before applying account-specific policy.' },
      { heading: '3. Distributed enforcement', content: 'A single process counter is inaccurate across replicas. A shared atomic store or gateway can coordinate counters, but adds latency and can itself become a bottleneck. Approximate local limits can protect each instance, while global quotas require shared coordination. Define behavior when the limiter store fails: fail-open preserves requests but risks overload; fail-closed protects the dependency but rejects legitimate traffic.' },
      { heading: '4. Client contract and operations', content: 'Return HTTP 429 for a rejected request and, where useful, include Retry-After or standardized limit/reset metadata. Apply limits before expensive work and protect downstream dependencies with their own concurrency controls. Monitor allowed/rejected rates by policy, false positives, hot keys, limiter latency, and store errors. Ensure retries respect the reset/backoff signal.' }
    ],
    importantDefinitions: [
      { term: 'Token bucket', definition: 'A limiter that refills tokens at a rate and allows requests while tokens remain, permitting a bounded burst.' },
      { term: 'Fixed window', definition: 'A counter reset at fixed interval boundaries; simple but allows boundary bursts.' },
      { term: 'Sliding window', definition: 'A policy measured over a moving interval, with exact or approximate implementations.' },
      { term: 'Quota', definition: 'A usage allowance over a longer period, such as requests per day or monthly units.' },
      { term: 'Retry-After', definition: 'An HTTP response field that can tell a client how long to wait before retrying.' }
    ],
    stepByStepExamples: [{ title: 'Protect a public search API', steps: ['Choose identities: account/API key for fairness, with an IP-based abuse limit for unauthenticated traffic.', 'Use a token bucket per identity and route with an explicit refill rate and burst capacity.', 'Perform the check before expensive search work using an atomic limiter operation.', 'Return 429 and a retry hint when no capacity remains; do not retry automatically without respecting it.', 'Monitor policy hits, limiter-store latency/errors, hot identities, and search dependency saturation.'] }],
    realWorldExamples: [
      { title: 'Public API plan quotas', description: 'Per-key sustained request budgets provide predictable customer usage while burst capacity supports short client spikes.' },
      { title: 'Login endpoint abuse control', description: 'Combine account and network signals with progressive controls; avoid relying on one IP counter that can lock out shared networks.' }
    ],
    visualExample: 'Request -> authenticate / identify key -> atomic limiter check\n                                         | token available\n                                         v\n                                  downstream service\n                                         | empty\n                                         v\n                           429 + Retry-After / reset hint',
    designTradeoffs: { advantages: ['Protects service capacity, improves fairness, and bounds abusive or accidental bursts.', 'Makes customer quotas and predictable resource allocation enforceable.'], disadvantages: ['Distributed exact counters add latency and shared-state failure modes.', 'Poor identity or policy choices can penalize legitimate users or be bypassed.'], tradeoffs: ['Fail-open improves request availability but can overload dependencies; fail-closed protects capacity but may reject valid traffic.', 'Exact global limits cost coordination; approximate per-instance limits are cheaper but allow aggregate overshoot.'] },
    commonMistakes: ['Using a fixed window without accounting for boundary bursts.', 'Applying only per-IP limits to authenticated users behind NAT or proxies.', 'Retrying every 429 immediately and creating another burst.', 'Failing to define limiter-store failure behavior.'],
    bestPractices: ['Use atomic updates for shared counters and bound limiter latency.', 'Combine identity scopes according to abuse and fairness risks.', 'Return 429 with actionable retry metadata and document quota scope.', 'Protect downstream work with concurrency limits as well as request-rate limits.'],
    interviewQuestions: [
      interview('How does a token bucket differ from a fixed window?', 'A token bucket refills continuously at a configured rate and allows a bounded burst based on accumulated tokens. A fixed window counts within aligned intervals and can allow nearly twice the nominal rate around a boundary.'),
      interview('Where should a rate limiter run?', 'As early as practical before expensive work, often at an edge gateway for coarse protection and in a service for resource-specific policies. A single layer may not know all relevant identities or dependency costs.'),
      interview('How do you implement a global limit across service replicas?', 'Use a shared atomic counter/token operation or a coordinated gateway/store. This adds latency and a dependency; local approximations reduce coordination but can overshoot the global rate.'),
      interview('Should a limiter fail open or fail closed?', 'It depends on the protected resource and product requirement. Fail-open favors legitimate request availability but risks overload; fail-closed protects capacity but can reject traffic during limiter failure. Use explicit policy and monitoring.'),
      interview('Why return Retry-After on HTTP 429?', 'It gives clients a useful delay hint and reduces synchronized immediate retries. Clients should still use jitter and respect their own deadlines.'),
    ],
    mcqs: [
      mcq('Which algorithm permits a bounded burst while enforcing a sustained refill rate?', ['Token bucket', 'Unbounded queue', 'Fixed database snapshot', 'Round robin'], 0, 'Tokens accumulate up to bucket capacity and are consumed by requests, giving a bounded burst.'),
      mcq('What is a common fixed-window weakness?', ['Requests can burst on both sides of a window boundary', 'It requires storing every request timestamp', 'It cannot count requests', 'It guarantees even spacing'], 0, 'A client can spend its full quota just before and just after a reset boundary.'),
      mcq('Why can per-IP limits be unfair?', ['Many legitimate users may share a NAT address', 'IP addresses are always authenticated identities', 'They require a database shard for every request', 'They cannot limit traffic'], 0, 'Shared networks can make many unrelated users appear as one IP; proxies can also obscure identity.'),
      mcq('What is a standard HTTP response for a rate-limited request?', ['429 Too Many Requests', '201 Created', '304 Not Modified', '101 Switching Protocols'], 0, 'HTTP 429 communicates that the client exceeded a rate or usage limit.'),
      mcq('What is a likely consequence of fail-open limiter behavior when the store is down?', ['Traffic continues, potentially overloading the protected service', 'All user requests are guaranteed rejected', 'The rate becomes globally exact', 'The downstream service cannot be reached'], 0, 'Fail-open prioritizes request availability, trading away enforcement during limiter failure.'),
    ],
    practicalExercise: {
      title: 'Limit a multi-tenant search API', prompt: 'Protect search capacity while offering per-customer quotas, allowing short bursts, and serving clients across multiple API replicas.',
      requirements: ['Choose algorithm, sustained rate, and burst size.', 'Define identity and endpoint scopes.', 'Describe shared state and store-failure behavior.', 'Specify 429 response, retries, and monitoring.'],
      hints: ['Use tenant identity after authentication, with separate abuse limits for anonymous traffic.', 'A token bucket expresses burst plus sustained rate.', 'Use an atomic shared operation for an exact global limit, or document approximation.'],
      suggestedSolution: 'Apply a per-tenant token bucket keyed by tenant and route in a shared atomic limiter near the gateway, plus a coarse IP abuse limit for anonymous requests. Set bucket capacity for an accepted short burst and refill for sustainable search capacity. Return 429 with Retry-After/reset metadata. Choose fail-closed for a costly search backend if overload threatens availability, with a small local emergency budget only if bounded. Monitor rejects, limiter latency, store failures, hot tenants, and backend saturation.',
      reviewChecklist: ['Algorithm expresses both burst and sustained rate.', 'Identity avoids unfairly grouping unrelated clients.', 'Replica coordination and failure behavior are stated.', 'Clients receive useful retry guidance and operations are observable.']
    },
    revisionSummary: ['Fixed windows are simple but permit boundary bursts.', 'Token buckets allow bounded bursts at a sustained refill rate.', 'Distributed enforcement needs atomic shared state or accepts approximation.', 'Use 429 and actionable retry guidance; choose fail-open/closed deliberately.']
  }
};

export function normalizeSystemDesignKey(key) {
  if (!key) return null;
  const normalized = String(key).trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return SYSTEM_DESIGN_LESSONS[normalized] ? normalized : null;
}

export function getSystemDesignLesson(key) {
  const normalized = normalizeSystemDesignKey(key);
  return normalized ? SYSTEM_DESIGN_LESSONS[normalized] : null;
}