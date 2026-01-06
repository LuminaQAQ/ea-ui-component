export class EaRemoveEvent extends Event {
  /** @readonly */
  detail;

  /**
   *
   * @param {Object} detail
   * @param {string} detail.text
   */
  constructor(detail) {
    super("ea-remove", {
      bubbles: true,
      composed: true,
    });

    this.detail = detail;
  }
}
