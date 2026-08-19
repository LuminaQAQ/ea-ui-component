const effectsMeta: Record<string, { name: string; category: string; kind: "animation" | "transition"; duration: string }> = {
  fadeIn: { name: "fadeIn", category: "fade", kind: "animation", duration: ".75s" },
  grow: { name: "grow", category: "2d", kind: "transition", duration: ".3s" },
  bounce: { name: "bounce", category: "entrance", kind: "animation", duration: ".9s" },
};

export default effectsMeta;
