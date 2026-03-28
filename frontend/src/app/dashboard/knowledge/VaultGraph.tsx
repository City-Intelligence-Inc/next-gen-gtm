"use client";

import { useRef, useEffect, useCallback, useState } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface GraphNode {
  id: string;
  label: string;
  category: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pinned: boolean;
}

interface GraphEdge {
  source: string;
  target: string;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const CATEGORY_COLORS: Record<string, string> = {
  concepts: "#3b82f6",
  motions: "#22c55e",
  frameworks: "#a855f7",
  tools: "#f97316",
  "case-studies": "#ef4444",
  architecture: "#06b6d4",
  "data-infrastructure": "#14b8a6",
  signals: "#eab308",
  roles: "#ec4899",
  resources: "#6b7280",
};

const NODES_BY_CATEGORY: Record<string, string[]> = {
  concepts: [
    "GTM Overview",
    "Current GTM Landscape",
    "GTM Pain Points",
    "Next-Gen GTM Thesis",
    "The Self-Improving GTM Engine",
    "Antifragile GTM",
    "Flywheel Effect",
    "Product-Market Fit",
    "Composable GTM Stack",
    "Death of Traditional CRM Deep Dive",
  ],
  motions: [
    "Sales-Led Growth",
    "Product-Led Growth",
    "Community-Led Growth",
    "Product-Led Sales",
    "Agent-Led Growth",
    "Agent-Led Growth Deep Dive",
  ],
  frameworks: [
    "MEDDIC-MEDDPICC",
    "Bow-Tie Funnel",
    "GTM Fit",
    "GTM Metrics That Matter",
    "JTBD for GTM",
    "OODA Loop for GTM",
    "Double-Loop Learning",
  ],
  tools: [
    "Clay",
    "Apollo",
    "Attio",
    "Common Room",
    "Unify",
    "Pocus",
    "Instantly",
    "Hightouch",
    "Rilo",
    "AI SDR Agents",
    "AI SDR Agents Deep Dive",
    "Apollo Vibe GTM Deep Dive",
    "Traditional GTM Tech Stack",
    "Coframe",
  ],
  "case-studies": [
    "Case Study - Ramp",
    "Case Study - Figma",
    "Case Study - Datadog",
    "Case Study - Notion",
    "Case Study - Clay",
    "Case Study - Coframe",
  ],
  architecture: [
    "Architecture - Core Layers",
    "GTM Operating System",
    "Composable GTM Stack Deep Dive",
  ],
  "data-infrastructure": [
    "Warehouse-Native GTM",
    "Warehouse-Native GTM Deep Dive",
    "Reverse ETL",
    "Identity Resolution",
    "Modern Data Stack for GTM",
    "Data Enrichment Waterfall",
    "Event-Driven GTM Architecture",
    "Composable CDP",
  ],
  signals: ["Signal-Based Selling", "Signal-Based Selling Deep Dive", "AI Agents in GTM"],
  roles: ["GTM Engineer", "GTM Engineering Deep Dive", "Bo Mohazzabi"],
  resources: ["Sources and Reading List"],
};

const EDGES: [string, string][] = [
  // Concepts internal links
  ["GTM Overview", "Current GTM Landscape"],
  ["GTM Overview", "Next-Gen GTM Thesis"],
  ["GTM Overview", "GTM Pain Points"],
  ["GTM Overview", "Product-Market Fit"],
  ["Current GTM Landscape", "GTM Pain Points"],
  ["Current GTM Landscape", "Traditional GTM Tech Stack"],
  ["Next-Gen GTM Thesis", "The Self-Improving GTM Engine"],
  ["Next-Gen GTM Thesis", "Composable GTM Stack"],
  ["Next-Gen GTM Thesis", "Agent-Led Growth"],
  ["The Self-Improving GTM Engine", "Antifragile GTM"],
  ["The Self-Improving GTM Engine", "Flywheel Effect"],
  ["The Self-Improving GTM Engine", "OODA Loop for GTM"],
  ["The Self-Improving GTM Engine", "Double-Loop Learning"],
  ["Antifragile GTM", "Flywheel Effect"],
  ["Product-Market Fit", "GTM Fit"],
  ["Composable GTM Stack", "Composable GTM Stack Deep Dive"],
  ["Composable GTM Stack", "Architecture - Core Layers"],
  ["Death of Traditional CRM Deep Dive", "Attio"],
  ["Death of Traditional CRM Deep Dive", "Current GTM Landscape"],

  // Motions cross-links
  ["Sales-Led Growth", "MEDDIC-MEDDPICC"],
  ["Sales-Led Growth", "Bow-Tie Funnel"],
  ["Product-Led Growth", "Product-Led Sales"],
  ["Product-Led Growth", "Case Study - Notion"],
  ["Product-Led Growth", "Case Study - Figma"],
  ["Community-Led Growth", "Case Study - Figma"],
  ["Product-Led Sales", "Pocus"],
  ["Agent-Led Growth", "Agent-Led Growth Deep Dive"],
  ["Agent-Led Growth", "AI Agents in GTM"],
  ["Agent-Led Growth", "AI SDR Agents"],
  ["Agent-Led Growth Deep Dive", "AI SDR Agents Deep Dive"],

  // Frameworks cross-links
  ["MEDDIC-MEDDPICC", "Bow-Tie Funnel"],
  ["GTM Fit", "GTM Metrics That Matter"],
  ["GTM Fit", "GTM Overview"],
  ["GTM Metrics That Matter", "Bow-Tie Funnel"],
  ["JTBD for GTM", "Composable GTM Stack"],
  ["OODA Loop for GTM", "Double-Loop Learning"],
  ["OODA Loop for GTM", "Signal-Based Selling"],

  // Tools cross-links
  ["Clay", "Case Study - Clay"],
  ["Clay", "Composable GTM Stack"],
  ["Clay", "Data Enrichment Waterfall"],
  ["Clay", "GTM Engineer"],
  ["Apollo", "Apollo Vibe GTM Deep Dive"],
  ["Apollo", "AI SDR Agents"],
  ["Apollo", "Sales-Led Growth"],
  ["Attio", "Composable GTM Stack"],
  ["Common Room", "Signal-Based Selling"],
  ["Common Room", "Community-Led Growth"],
  ["Unify", "Signal-Based Selling"],
  ["Unify", "Signal-Based Selling Deep Dive"],
  ["Pocus", "Product-Led Sales"],
  ["Pocus", "Signal-Based Selling"],
  ["Instantly", "AI SDR Agents"],
  ["Instantly", "Sales-Led Growth"],
  ["Hightouch", "Reverse ETL"],
  ["Hightouch", "Composable CDP"],
  ["Hightouch", "Warehouse-Native GTM"],
  ["Rilo", "GTM Engineer"],
  ["AI SDR Agents", "AI SDR Agents Deep Dive"],
  ["AI SDR Agents", "AI Agents in GTM"],
  ["Coframe", "Case Study - Coframe"],
  ["Coframe", "AI Agents in GTM"],
  ["Traditional GTM Tech Stack", "Composable GTM Stack"],
  ["Traditional GTM Tech Stack", "GTM Pain Points"],

  // Case study cross-links
  ["Case Study - Ramp", "Warehouse-Native GTM"],
  ["Case Study - Ramp", "GTM Engineer"],
  ["Case Study - Ramp", "Data Enrichment Waterfall"],
  ["Case Study - Datadog", "Product-Led Sales"],
  ["Case Study - Datadog", "Bow-Tie Funnel"],
  ["Case Study - Clay", "GTM Engineer"],
  ["Case Study - Clay", "Composable GTM Stack"],
  ["Case Study - Notion", "Community-Led Growth"],
  ["Case Study - Figma", "Product-Led Sales"],
  ["Case Study - Coframe", "Agent-Led Growth"],

  // Architecture cross-links
  ["Architecture - Core Layers", "GTM Operating System"],
  ["Architecture - Core Layers", "Modern Data Stack for GTM"],
  ["GTM Operating System", "The Self-Improving GTM Engine"],
  ["GTM Operating System", "GTM Metrics That Matter"],
  ["Composable GTM Stack Deep Dive", "JTBD for GTM"],
  ["Composable GTM Stack Deep Dive", "Clay"],

  // Data infrastructure cross-links
  ["Warehouse-Native GTM", "Warehouse-Native GTM Deep Dive"],
  ["Warehouse-Native GTM", "Modern Data Stack for GTM"],
  ["Warehouse-Native GTM", "Reverse ETL"],
  ["Reverse ETL", "Composable CDP"],
  ["Reverse ETL", "Hightouch"],
  ["Identity Resolution", "Modern Data Stack for GTM"],
  ["Identity Resolution", "Data Enrichment Waterfall"],
  ["Modern Data Stack for GTM", "Event-Driven GTM Architecture"],
  ["Modern Data Stack for GTM", "Composable CDP"],
  ["Data Enrichment Waterfall", "Apollo"],
  ["Event-Driven GTM Architecture", "Signal-Based Selling"],
  ["Composable CDP", "Warehouse-Native GTM"],

  // Signals cross-links
  ["Signal-Based Selling", "Signal-Based Selling Deep Dive"],
  ["Signal-Based Selling", "AI Agents in GTM"],
  ["Signal-Based Selling Deep Dive", "Common Room"],
  ["AI Agents in GTM", "GTM Engineer"],
  ["AI Agents in GTM", "Agent-Led Growth"],

  // Roles cross-links
  ["GTM Engineer", "GTM Engineering Deep Dive"],
  ["GTM Engineer", "Composable GTM Stack"],
  ["GTM Engineering Deep Dive", "Clay"],
  ["GTM Engineering Deep Dive", "Apollo"],
  ["Bo Mohazzabi", "GTM Engineer"],

  // Resources cross-links
  ["Sources and Reading List", "GTM Overview"],
  ["Sources and Reading List", "Next-Gen GTM Thesis"],
];

// ---------------------------------------------------------------------------
// Build graph data
// ---------------------------------------------------------------------------

function buildGraphData(): { nodes: GraphNode[]; edges: GraphEdge[] } {
  const nodes: GraphNode[] = [];
  const connectionCount: Record<string, number> = {};

  // Count connections
  for (const [a, b] of EDGES) {
    connectionCount[a] = (connectionCount[a] || 0) + 1;
    connectionCount[b] = (connectionCount[b] || 0) + 1;
  }

  // Create nodes
  for (const [category, names] of Object.entries(NODES_BY_CATEGORY)) {
    for (const name of names) {
      const conns = connectionCount[name] || 0;
      nodes.push({
        id: name,
        label: name,
        category,
        x: (Math.random() - 0.5) * 800,
        y: (Math.random() - 0.5) * 600,
        vx: 0,
        vy: 0,
        radius: Math.max(4, Math.min(14, 4 + conns * 1.2)),
        pinned: false,
      });
    }
  }

  const nodeIds = new Set(nodes.map((n) => n.id));
  const edges: GraphEdge[] = EDGES.filter(([s, t]) => nodeIds.has(s) && nodeIds.has(t)).map(
    ([s, t]) => ({ source: s, target: t })
  );

  return { nodes, edges };
}

// ---------------------------------------------------------------------------
// Force simulation helpers
// ---------------------------------------------------------------------------

function simulationTick(nodes: GraphNode[], edges: GraphEdge[], width: number, height: number) {
  const alpha = 0.3;
  const repulsion = 3000;
  const attraction = 0.005;
  const damping = 0.85;
  const centerStrength = 0.01;

  // Repulsion between all nodes
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i];
      const b = nodes[j];
      let dx = a.x - b.x;
      let dy = a.y - b.y;
      const distSq = dx * dx + dy * dy || 1;
      const dist = Math.sqrt(distSq);
      const force = (repulsion / distSq) * alpha;
      const fx = (dx / dist) * force;
      const fy = (dy / dist) * force;
      if (!a.pinned) {
        a.vx += fx;
        a.vy += fy;
      }
      if (!b.pinned) {
        b.vx -= fx;
        b.vy -= fy;
      }
    }
  }

  // Edge-based index for attraction
  const nodeMap = new Map<string, GraphNode>();
  for (const n of nodes) nodeMap.set(n.id, n);

  for (const edge of edges) {
    const a = nodeMap.get(edge.source);
    const b = nodeMap.get(edge.target);
    if (!a || !b) continue;
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
    const force = dist * attraction * alpha;
    const fx = (dx / dist) * force;
    const fy = (dy / dist) * force;
    if (!a.pinned) {
      a.vx += fx;
      a.vy += fy;
    }
    if (!b.pinned) {
      b.vx -= fx;
      b.vy -= fy;
    }
  }

  // Centering
  const cx = width / 2;
  const cy = height / 2;
  for (const n of nodes) {
    if (n.pinned) continue;
    n.vx += (cx - n.x) * centerStrength * alpha;
    n.vy += (cy - n.y) * centerStrength * alpha;
  }

  // Apply velocity
  for (const n of nodes) {
    if (n.pinned) continue;
    n.vx *= damping;
    n.vy *= damping;
    n.x += n.vx;
    n.y += n.vy;
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function VaultGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<{ nodes: GraphNode[]; edges: GraphEdge[] } | null>(null);
  const animRef = useRef<number>(0);

  // Camera state
  const cameraRef = useRef({ offsetX: 0, offsetY: 0, zoom: 1 });

  // Interaction state
  const dragRef = useRef<{
    node: GraphNode | null;
    panning: boolean;
    startX: number;
    startY: number;
    startOffsetX: number;
    startOffsetY: number;
  }>({ node: null, panning: false, startX: 0, startY: 0, startOffsetX: 0, startOffsetY: 0 });

  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const hoveredRef = useRef<string | null>(null);

  // Convert screen coords to world coords
  const screenToWorld = useCallback((sx: number, sy: number) => {
    const cam = cameraRef.current;
    const canvas = canvasRef.current;
    if (!canvas) return { x: sx, y: sy };
    const rect = canvas.getBoundingClientRect();
    const x = (sx - rect.left - canvas.width / 2) / cam.zoom + canvas.width / 2 - cam.offsetX;
    const y = (sy - rect.top - canvas.height / 2) / cam.zoom + canvas.height / 2 - cam.offsetY;
    return { x, y };
  }, []);

  const findNodeAt = useCallback(
    (sx: number, sy: number): GraphNode | null => {
      if (!graphRef.current) return null;
      const { x, y } = screenToWorld(sx, sy);
      for (let i = graphRef.current.nodes.length - 1; i >= 0; i--) {
        const n = graphRef.current.nodes[i];
        const dx = n.x - x;
        const dy = n.y - y;
        if (dx * dx + dy * dy < (n.radius + 4) * (n.radius + 4)) return n;
      }
      return null;
    },
    [screenToWorld]
  );

  // Draw
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const graph = graphRef.current;
    if (!canvas || !ctx || !graph) return;

    const cam = cameraRef.current;
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, w, h);

    ctx.save();
    ctx.translate(w / 2, h / 2);
    ctx.scale(cam.zoom, cam.zoom);
    ctx.translate(-w / 2 + cam.offsetX, -h / 2 + cam.offsetY);

    const nodeMap = new Map<string, GraphNode>();
    for (const n of graph.nodes) nodeMap.set(n.id, n);

    const hovered = hoveredRef.current;

    // Build adjacency for hover highlighting
    const adjacentToHovered = new Set<string>();
    const hoveredEdges = new Set<number>();
    if (hovered) {
      adjacentToHovered.add(hovered);
      graph.edges.forEach((e, i) => {
        if (e.source === hovered || e.target === hovered) {
          adjacentToHovered.add(e.source);
          adjacentToHovered.add(e.target);
          hoveredEdges.add(i);
        }
      });
    }

    // Draw edges
    graph.edges.forEach((edge, idx) => {
      const a = nodeMap.get(edge.source);
      const b = nodeMap.get(edge.target);
      if (!a || !b) return;

      if (hovered) {
        if (hoveredEdges.has(idx)) {
          ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
          ctx.lineWidth = 1.5;
        } else {
          ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
          ctx.lineWidth = 0.5;
        }
      } else {
        ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
        ctx.lineWidth = 0.7;
      }

      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    });

    // Draw nodes
    for (const node of graph.nodes) {
      const color = CATEGORY_COLORS[node.category] || "#6b7280";
      const isHovered = node.id === hovered;
      const isAdjacent = adjacentToHovered.has(node.id);
      const dimmed = hovered && !isAdjacent;

      // Glow for hovered node
      if (isHovered) {
        const gradient = ctx.createRadialGradient(
          node.x, node.y, node.radius,
          node.x, node.y, node.radius * 3
        );
        gradient.addColorStop(0, color + "60");
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Node circle
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      if (dimmed) {
        ctx.fillStyle = color + "30";
      } else {
        ctx.fillStyle = color + (isHovered ? "ff" : "cc");
      }
      ctx.fill();

      // Border
      if (isHovered) {
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Label — only show when zoomed in enough or when hovered/adjacent
      const showLabel = cam.zoom > 0.6 || isHovered || isAdjacent;
      if (showLabel) {
        const fontSize = Math.max(9, Math.min(12, 11 / cam.zoom));
        ctx.font = `${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "top";

        let label = node.label;
        if (label.length > 24 && !isHovered) label = label.slice(0, 22) + "...";

        if (dimmed) {
          ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
        } else if (isHovered) {
          ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
        } else {
          ctx.fillStyle = "rgba(255, 255, 255, 0.55)";
        }
        ctx.fillText(label, node.x, node.y + node.radius + 4);
      }
    }

    ctx.restore();

    // Hover tooltip in screen space
    if (hovered) {
      const node = nodeMap.get(hovered);
      if (node) {
        const cat = node.category.replace("-", " ");
        const connCount = graph.edges.filter(
          (e) => e.source === hovered || e.target === hovered
        ).length;
        const text = `${node.label}  |  ${cat}  |  ${connCount} connections`;
        ctx.font = "12px -apple-system, BlinkMacSystemFont, sans-serif";
        ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
        ctx.textAlign = "left";
        ctx.fillText(text, 12, h - 14);
      }
    }
  }, []);

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const graph = graphRef.current;
    if (!canvas || !graph) return;

    simulationTick(graph.nodes, graph.edges, canvas.width, canvas.height);
    draw();
    animRef.current = requestAnimationFrame(animate);
  }, [draw]);

  // Resize
  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);
    // Reset logical size for simulation
    canvas.width = rect.width;
    canvas.height = rect.height;
  }, []);

  // Init
  useEffect(() => {
    graphRef.current = buildGraphData();

    // Position nodes in category clusters initially
    const categories = Object.keys(NODES_BY_CATEGORY);
    const angleStep = (Math.PI * 2) / categories.length;
    const graph = graphRef.current;

    for (const node of graph.nodes) {
      const catIdx = categories.indexOf(node.category);
      const angle = catIdx * angleStep;
      const clusterRadius = 200;
      const cx = 400 + Math.cos(angle) * clusterRadius;
      const cy = 300 + Math.sin(angle) * clusterRadius;
      node.x = cx + (Math.random() - 0.5) * 100;
      node.y = cy + (Math.random() - 0.5) * 100;
    }

    resize();
    window.addEventListener("resize", resize);
    animRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [animate, resize]);

  // Mouse handlers
  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const node = findNodeAt(e.clientX, e.clientY);
      if (node) {
        node.pinned = true;
        dragRef.current = {
          node,
          panning: false,
          startX: e.clientX,
          startY: e.clientY,
          startOffsetX: 0,
          startOffsetY: 0,
        };
      } else {
        dragRef.current = {
          node: null,
          panning: true,
          startX: e.clientX,
          startY: e.clientY,
          startOffsetX: cameraRef.current.offsetX,
          startOffsetY: cameraRef.current.offsetY,
        };
      }
    },
    [findNodeAt]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const drag = dragRef.current;
      const cam = cameraRef.current;

      if (drag.node) {
        const { x, y } = screenToWorld(e.clientX, e.clientY);
        drag.node.x = x;
        drag.node.y = y;
        drag.node.vx = 0;
        drag.node.vy = 0;
      } else if (drag.panning) {
        cam.offsetX = drag.startOffsetX + (e.clientX - drag.startX) / cam.zoom;
        cam.offsetY = drag.startOffsetY + (e.clientY - drag.startY) / cam.zoom;
      } else {
        // Hover detection
        const node = findNodeAt(e.clientX, e.clientY);
        const id = node ? node.id : null;
        if (id !== hoveredRef.current) {
          hoveredRef.current = id;
          setHoveredNode(id);
        }
        const canvas = canvasRef.current;
        if (canvas) canvas.style.cursor = node ? "grab" : "default";
      }
    },
    [findNodeAt, screenToWorld]
  );

  const handleMouseUp = useCallback(() => {
    if (dragRef.current.node) {
      dragRef.current.node.pinned = false;
    }
    dragRef.current = {
      node: null,
      panning: false,
      startX: 0,
      startY: 0,
      startOffsetX: 0,
      startOffsetY: 0,
    };
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const cam = cameraRef.current;
    const delta = e.deltaY > 0 ? 0.92 : 1.08;
    cam.zoom = Math.max(0.2, Math.min(4, cam.zoom * delta));
  }, []);

  return (
    <div ref={containerRef} className="relative h-full w-full" style={{ minHeight: 500 }}>
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        className="block h-full w-full rounded-lg"
      />
      {/* Legend */}
      <div className="absolute bottom-3 right-3 flex flex-wrap gap-x-3 gap-y-1 rounded-lg bg-black/70 px-3 py-2 backdrop-blur-sm">
        {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
          <div key={cat} className="flex items-center gap-1.5">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="text-[10px] text-neutral-400">{cat}</span>
          </div>
        ))}
      </div>
      {/* Controls hint */}
      <div className="absolute top-3 right-3 rounded-lg bg-black/70 px-3 py-1.5 backdrop-blur-sm">
        <span className="text-[10px] text-neutral-500">
          Drag nodes &middot; Scroll to zoom &middot; Drag background to pan
        </span>
      </div>
    </div>
  );
}
