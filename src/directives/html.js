import createDOMPurify from "dompurify";

const DOMPurify = createDOMPurify(window);

export const html = dirtyHTML => {
  return DOMPurify.sanitize(dirtyHTML, {
    RETURN_TRUSTED_TYPE: true,
    USE_PROFILES: { html: true, svg: true, svgFilters: true },

    CUSTOM_ELEMENT_HANDLING: {
      tagNameCheck: /^ea-/,
      attributeNameCheck: /.*/,
      allowCustomizedBuiltInElements: true,
    },
  });
};
