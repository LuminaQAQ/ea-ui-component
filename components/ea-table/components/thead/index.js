import { h } from "../../utils/h";

/**
 * @typedef {Object} TheadAttributes
 * @property {String}
 */

/**
 * 渲染th
 * @param {import("../ea-table").EaTableColumnElement[]} columns
 * @param {TheadAttributes} attributes
 * @returns {string}
 */
export const thRenderer = (columns, attributes) => {
  return columns
    .map((column) =>
      h("th", { width: column.width }, column.label || column.prop || "")
    )
    .join("");
};

/**
 * 渲染thead
 * @param {import("../ea-table").EaTableColumnElement[]} columns
 * @param {TheadAttributes} attributes
 * @returns {string}
 */
export const theadRenderer = (columns, attributes) => {
  return h("thead", attributes, thRenderer(columns));
};
