import createDOMPurify from "dompurify";

const DOMPurify = createDOMPurify(window);

/**
 * 清洗 HTML 字符串，防止 XSS 攻击
 * @param dirtyHTML 原始 HTML 字符串
 * @returns 清洗后的安全 HTML
 */
export const html = (dirtyHTML: string): string => {
  return DOMPurify.sanitize(dirtyHTML, {
    RETURN_TRUSTED_TYPE: true,
    USE_PROFILES: { html: true, svg: true, svgFilters: true },

    CUSTOM_ELEMENT_HANDLING: {
      tagNameCheck: /^ea-/,
      attributeNameCheck: /.*/,
      allowCustomizedBuiltInElements: true,
    },
  }) as unknown as string;
};

export default html;
