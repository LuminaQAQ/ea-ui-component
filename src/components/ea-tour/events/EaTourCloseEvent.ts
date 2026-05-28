export class EaTourCloseEvent extends Event {
  readonly detail: EaTourCloseEventDetail;
  constructor(detail: EaTourCloseEventDetail) {
    super("ea-close", {
      bubbles: true,
      composed: true,
    });

    this.detail = detail;
  }
}

interface EaTourCloseEventDetail {
  current: number;
}

