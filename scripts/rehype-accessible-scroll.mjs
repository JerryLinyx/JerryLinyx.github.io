// Preserve native math/table semantics while allowing keyboard users to scroll.
export default function rehypeAccessibleScroll() {
  return (tree) => {
    function visit(node) {
      if (node.type === "element") {
        const classes = node.properties?.className || [];
        if (node.tagName === "table" || classes.includes("katex-display")) {
          node.properties ||= {};
          node.properties.tabIndex = 0;
          if (node.tagName === "table")
            node.properties.ariaLabel = "数据表格，可横向滚动";
        }
      }
      node.children?.forEach(visit);
    }
    visit(tree);
  };
}
