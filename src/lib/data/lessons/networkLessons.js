/**
 * PrepMate CN (Computer Networks) Lesson Content Registry
 * Covers all 13 core Computer Networks modules following the standard lesson schema.
 */

export const NETWORK_LESSONS = {
  'osi-model': {
    id: 'osi-model',
    subjectId: 'networks',
    order: 1,
    title: 'OSI Model',
    estimatedTime: '40 mins',
    learningObjectives: [
      'Master the 7 Layers of the ISO-OSI Reference Model.',
      'Understand layer responsibilities: Physical, Data Link, Network, Transport, Session, Presentation, Application.',
      'Follow data encapsulation and decapsulation (Bits -> Frames -> Packets -> Segments -> Data PDU).'
    ],
    prerequisites: ['Basic computing concepts'],
    theoryAndConcepts: [
      {
        heading: '1. The 7 OSI Layers Breakdown',
        content: `1. Physical: Raw bit transmission over physical media (voltage, cables, radio).
2. Data Link: Node-to-node framing, MAC addressing, error detection (CRC).
3. Network: End-to-end logical packet routing across internetworks (IP, routers).
4. Transport: End-to-end process-to-process delivery, reliability, flow control (TCP, UDP).
5. Session: Managing dialogues, session checkpointing, and authentication tokens.
6. Presentation: Data syntax, character encoding, encryption/decryption (TLS), compression.
7. Application: User-facing network services and protocol interfaces (HTTP, DNS, SSH, SMTP).`
      }
    ],
    interviewQuestions: [
      {
        q: "What is the difference between a Hub, a Switch, and a Router in terms of OSI layers?",
        a: "A Hub operates at Layer 1 (Physical) repeating raw electrical bits to all ports. A Switch operates at Layer 2 (Data Link) forwarding frames based on hardware MAC addresses. A Router operates at Layer 3 (Network) routing packets between distinct IP subnets based on logical IP addresses."
      }
    ]
  },

  'tcp-ip': {
    id: 'tcp-ip',
    subjectId: 'networks',
    order: 2,
    title: 'TCP/IP',
    estimatedTime: '35 mins',
    learningObjectives: [
      'Compare OSI 7-layer vs TCP/IP 4-layer (or 5-layer) architectural models.',
      'Analyze the Hourglass architecture of the Internet centered on the IP layer.'
    ],
    prerequisites: ['OSI Model'],
    theoryAndConcepts: [
      { heading: '1. The TCP/IP model', content: `The four-layer TCP/IP model consists of Link, Internet, Transport, and Application layers. IP provides best-effort packet delivery across networks; TCP and UDP offer different transport services above IP.` },
      { heading: '2. Practical details and common pitfalls', content: `The OSI seven-layer model is a conceptual teaching model, while the TCP/IP model reflects deployed Internet protocols. Encapsulation wraps application data in transport segments/datagrams, IP packets, and link-layer frames.` }
    ],
  },

  'ip-addressing': {
    id: 'ip-addressing',
    subjectId: 'networks',
    order: 3,
    title: 'IP Addressing',
    estimatedTime: '35 mins',
    learningObjectives: [
      'IPv4 32-bit addresses vs IPv6 128-bit addresses.',
      'Public vs Private IP address spaces (RFC 1918) and Network Address Translation (NAT).'
    ],
    prerequisites: ['TCP/IP'],
    theoryAndConcepts: [
      { heading: '1. IPv4, IPv6, and NAT', content: `IPv4 addresses contain 32 bits (example 192.168.1.10), while IPv6 addresses contain 128 bits (example 2001:db8::1). CIDR prefixes identify network portions, such as 192.168.1.0/24.` },
      { heading: '2. Practical details and common pitfalls', content: `Private IPv4 blocks include 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16. NAT translates addresses or ports at a network boundary; it does not itself provide encryption.` }
    ],
  },

  'tcp-udp': {
    id: 'tcp-udp',
    subjectId: 'networks',
    order: 4,
    title: 'TCP & UDP',
    estimatedTime: '45 mins',
    learningObjectives: [
      'Connection-oriented TCP vs Connectionless UDP.',
      'TCP 3-Way Handshake (SYN, SYN-ACK, ACK) and 4-Way Connection Teardown (FIN, ACK, FIN, ACK).',
      'TCP Congestion Control (Slow Start, Congestion Avoidance, Fast Retransmit, Fast Recovery) and Flow Control (Sliding Window).'
    ],
    prerequisites: ['OSI Model', 'TCP/IP'],
    theoryAndConcepts: [
      {
        heading: '1. TCP vs UDP Comparison',
        content: `- TCP: Reliable, ordered, byte-stream protocol with built-in acknowledgment, retransmission, and flow/congestion control. Used by HTTP/1.1, HTTP/2, SSH, FTP, and many databases; HTTP/3 uses QUIC over UDP.
- UDP: Lightweight, unordered, message-oriented protocol with minimal 8-byte header overhead and no retransmission delays. Used by DNS queries, video streaming, VoIP, gaming.`
      }
    ]
  },

  'http-https': {
    id: 'http-https',
    subjectId: 'networks',
    order: 5,
    title: 'HTTP / HTTPS',
    estimatedTime: '40 mins',
    learningObjectives: [
      'HTTP Methods (GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD).',
      'HTTP Status Codes (1xx, 2xx, 3xx, 4xx, 5xx).',
      'Evolution: HTTP/1.1 (Keep-Alive, Pipelining) -> HTTP/2 (Multiplexing, HPACK) -> HTTP/3 (QUIC over UDP).',
      'HTTPS and the TLS 1.3 cryptographic handshake.'
    ],
    prerequisites: ['TCP & UDP'],
    theoryAndConcepts: [
      { heading: '1. HTTP requests and HTTPS', content: `HTTP is a request-response application protocol. GET retrieves resources; POST submits data; PUT replaces a resource representation; PATCH applies partial changes; DELETE requests removal. Status codes include 200 OK, 301 redirect, 404 Not Found, and 500 Server Error.` },
      { heading: '2. Practical details and common pitfalls', content: `HTTPS is HTTP protected by TLS, providing encryption, integrity, and server authentication when certificates are validated. HTTP/2 multiplexes streams; HTTP/3 uses QUIC over UDP.` }
    ],
  },

  'dns': {
    id: 'dns',
    subjectId: 'networks',
    order: 6,
    title: 'DNS',
    estimatedTime: '30 mins',
    learningObjectives: [
      'DNS Hierarchy: Root Servers -> TLD Servers -> Authoritative Name Servers.',
      'Recursive vs Iterative DNS resolution.',
      'DNS Record Types: A, AAAA, CNAME, MX, TXT, NS, PTR, SOA, TTL caching.'
    ],
    prerequisites: ['TCP & UDP'],
    theoryAndConcepts: [
      { heading: '1. DNS name resolution', content: `DNS translates domain names into resource records. A recursive resolver may query root, TLD, and authoritative servers and cache answers according to TTL. A records map names to IPv4; AAAA to IPv6; MX identifies mail exchangers; CNAME aliases names.` },
      { heading: '2. Practical details and common pitfalls', content: `DNS responses can be cached, so record changes may take time to propagate. DNS over HTTPS and DNS over TLS protect the resolver connection but do not automatically make all DNS data trustworthy.` }
    ],
  },

  'dhcp': {
    id: 'dhcp',
    subjectId: 'networks',
    order: 7,
    title: 'DHCP',
    estimatedTime: '25 mins',
    learningObjectives: [
      'Dynamic Host Configuration Protocol and the DORA workflow: Discover, Offer, Request, Acknowledge.',
      'IP address leasing, subnet mask assignment, default gateway, and DNS server provision.'
    ],
    prerequisites: ['IP Addressing'],
    theoryAndConcepts: [
      { heading: '1. DHCP address assignment', content: `A common DHCPv4 exchange is DORA: Discover, Offer, Request, Acknowledge. The server leases an IP address and can supply subnet mask, router, and DNS settings.` },
      { heading: '2. Practical details and common pitfalls', content: `Clients renew leases before expiration. DHCPv6 differs from DHCPv4, and IPv6 networks can also use SLAAC for address configuration.` }
    ],
  },

  'arp': {
    id: 'arp',
    subjectId: 'networks',
    order: 8,
    title: 'ARP',
    estimatedTime: '25 mins',
    learningObjectives: [
      'Address Resolution Protocol: Mapping 32-bit logical IP addresses to 48-bit hardware MAC addresses.',
      'ARP Request (Broadcast) vs ARP Reply (Unicast), ARP Cache table, and Gratuitous ARP.'
    ],
    prerequisites: ['OSI Model', 'IP Addressing'],
    theoryAndConcepts: [
      { heading: '1. Address Resolution Protocol', content: `On an IPv4 Ethernet LAN, ARP maps a next-hop IPv4 address to a MAC address. A host broadcasts an ARP request; the owner commonly replies with its MAC address, and the mapping is cached.` },
      { heading: '2. Practical details and common pitfalls', content: `ARP resolves local-link next hops, not remote destination MAC addresses. IPv6 uses Neighbor Discovery (ICMPv6), not ARP.` }
    ],
  },

  'routing-protocols': {
    id: 'routing-protocols',
    subjectId: 'networks',
    order: 9,
    title: 'Routing Protocols',
    estimatedTime: '35 mins',
    learningObjectives: [
      'Interior Gateway Protocols (IGP) vs Exterior Gateway Protocols (EGP).',
      'Distance Vector (RIP, Bellman-Ford) vs Link State (OSPF, Dijkstra) vs Path Vector (BGP).'
    ],
    prerequisites: ['IP Addressing'],
    theoryAndConcepts: [
      { heading: '1. How routers choose paths', content: `Routing selects next hops using forwarding tables. RIP is distance-vector and uses hop count; OSPF is link-state and computes shortest paths from a topology database; BGP exchanges reachability information and policy between autonomous systems.` },
      { heading: '2. Practical details and common pitfalls', content: `A routing protocol learns routes, while a forwarding plane sends individual packets. Longest-prefix matching selects the most specific matching route.` }
    ],
  },

  'switching': {
    id: 'switching',
    subjectId: 'networks',
    order: 10,
    title: 'Switching',
    estimatedTime: '30 mins',
    learningObjectives: [
      'Layer 2 Forwarding: MAC learning, Flooding, Forwarding, and Filtering.',
      'VLANs (Virtual LANs), 802.1Q tagging, and Spanning Tree Protocol (STP) loop prevention.'
    ],
    prerequisites: ['OSI Model'],
    theoryAndConcepts: [
      { heading: '1. Ethernet switching and VLANs', content: `An Ethernet switch learns source MAC addresses on incoming ports and forwards frames toward known destinations. Unknown unicast and broadcast frames are flooded within the VLAN.` },
      { heading: '2. Practical details and common pitfalls', content: `VLANs divide one physical switching infrastructure into separate Layer 2 broadcast domains. Spanning Tree Protocol blocks redundant paths to avoid Ethernet loops.` }
    ],
  },

  'subnetting': {
    id: 'subnetting',
    subjectId: 'networks',
    order: 11,
    title: 'Subnetting',
    estimatedTime: '40 mins',
    learningObjectives: [
      'CIDR (Classless Inter-Domain Routing) prefix notation (/24, /28).',
      'Calculate Network ID, Broadcast Address, First Usable Host, and Total Usable Hosts.',
      'Variable Length Subnet Masking (VLSM) for optimal IP address allocation.'
    ],
    prerequisites: ['IP Addressing'],
    theoryAndConcepts: [
      { heading: '1. CIDR subnet calculations', content: `For 192.168.10.0/28, the prefix uses 28 network bits and leaves 4 host bits: 16 total addresses. The network address is 192.168.10.0, broadcast is 192.168.10.15, and conventional usable host range is .1 through .14 (14 hosts).` },
      { heading: '2. Practical details and common pitfalls', content: `For ordinary IPv4 subnets with at least two host bits, usable hosts = 2^(32-prefix) - 2. /31 point-to-point links and /32 host routes are special cases.` }
    ],
  },

  'network-security': {
    id: 'network-security',
    subjectId: 'networks',
    order: 12,
    title: 'Network Security',
    estimatedTime: '35 mins',
    learningObjectives: [
      'Firewalls (Packet Filtering, Stateful Inspection, Next-Gen application firewalls).',
      'Common attacks: DDoS, SYN Flood, Man-in-the-Middle (MitM), DNS Spoofing, ARP Poisoning.',
      'VPNs, IPsec tunneling, and Zero Trust Network Architecture.'
    ],
    prerequisites: ['HTTP / HTTPS', 'OSI Model'],
    theoryAndConcepts: [
      { heading: '1. Network security controls', content: `Firewalls filter traffic by rules; stateful firewalls track connection state. TLS protects application connections, IPsec can protect IP traffic, and VPNs create protected tunnels across untrusted networks.` },
      { heading: '2. Practical details and common pitfalls', content: `Common threats include DDoS, spoofing, man-in-the-middle interception, and ARP poisoning. Layered defenses include authentication, segmentation, patching, monitoring, and least-privilege access.` }
    ],
  },

  'websockets': {
    id: 'websockets',
    subjectId: 'networks',
    order: 13,
    title: 'WebSockets',
    estimatedTime: '30 mins',
    learningObjectives: [
      'Full-duplex, bidirectional communication over a single long-lived TCP connection.',
      'WebSocket Upgrade Handshake from HTTP/1.1 (101 Switching Protocols).',
      'Compare WebSockets vs HTTP Polling vs Long-Polling vs Server-Sent Events (SSE).'
    ],
    prerequisites: ['HTTP / HTTPS', 'TCP & UDP'],
    theoryAndConcepts: [
      { heading: '1. Persistent bidirectional connections', content: `WebSockets enable full-duplex messages over a persistent connection. A typical HTTP/1.1 WebSocket handshake uses Upgrade and receives status 101 Switching Protocols when accepted.` },
      { heading: '2. Practical details and common pitfalls', content: `WebSockets suit chat and collaborative apps; Server-Sent Events provide server-to-client streams; polling repeatedly makes HTTP requests. Production clients should handle reconnects, authentication, and backpressure.` }
    ],
  }
};

export const NETWORK_MODULE_ORDER = [
  'osi-model',
  'tcp-ip',
  'ip-addressing',
  'tcp-udp',
  'http-https',
  'dns',
  'dhcp',
  'arp',
  'routing-protocols',
  'switching',
  'subnetting',
  'network-security',
  'websockets'
];

export function normalizeNetworkKey(key) {
  if (!key) return null;
  const clean = String(key).toLowerCase().trim().replace(/[\s&/]+/g, '-').replace(/[()]/g, '');
  if (NETWORK_LESSONS[clean]) return clean;
  const aliases = {
    'osi': 'osi-model',
    'tcp': 'tcp-udp',
    'udp': 'tcp-udp',
    'ip': 'ip-addressing',
    'http': 'http-https',
    'https': 'http-https',
    'routing': 'routing-protocols',
    'security': 'network-security',
    'websocket': 'websockets'
  };
  return aliases[clean] || (NETWORK_LESSONS[clean] ? clean : null);
}

export function getNetworkLesson(key) {
  const k = normalizeNetworkKey(key);
  return k ? NETWORK_LESSONS[k] : null;
}
