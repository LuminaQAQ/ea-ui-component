import { h } from "../../utils/h";

/**
 * 渲染col
 * @param {import("../ea-table").EaTableColumnElement[]} columns
 * @param {TheadAttributes} attributes
 * @returns {string}
 */
export const colRenderer = (columns) => {
  return columns.map((column) => h("col", { width: column.width })).join("");
};

/**
 * 渲染colgroup
 * @param {import("../ea-table").EaTableColumnElement[]} columns
 * @param {TheadAttributes} attributes
 * @returns
 */
export const colgroupRenderer = (columns, attributes) => {
  return h("colgroup", attributes, colRenderer(columns));
};
