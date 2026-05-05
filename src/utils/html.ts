import createDOMPurify from "dompurify";

const DOMPurify = createDOMPurify(window);

/**
 * 清洗 HTML 字符串，防止 XSS 攻击
 * @param dirtyHTML 原始 HTML 字符串
 * @returns 清洗后的安全 HTML
 */
export const html = (dirtyHTML: string): string => {
  const slotPlaceholders: string[] = [];
  const protectedHTML = dirtyHTML.replace(/<\/?slot\b[^>]*>/g, match => {
    const placeholder = `___SLOT_${slotPlaceholders.length}___`;
    slotPlaceholders.push(match);
    return placeholder;
  });

  let clean = DOMPurify.sanitize(protectedHTML, {
    USE_PROFILES: { html: true, svg: true, svgFilters: true },
    CUSTOM_ELEMENT_HANDLING: {
      tagNameCheck: /^ea-/,
      attributeNameCheck: /.*/,
      allowCustomizedBuiltInElements: true,
    },
  });

  slotPlaceholders.forEach((slot, index) => {
    clean = clean.replace(`___SLOT_${index}___`, slot);
  });

  return clean;
};

export default html;
