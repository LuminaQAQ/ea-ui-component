import { EaBreadcrumb } from "./components/ea-breadcrumb";
import { EaBreadcrumbItem } from "./components/ea-breadcrumb-item";

export { EaBreadcrumb, EaBreadcrumbItem };
export default { EaBreadcrumb, EaBreadcrumbItem };

declare global {
  interface HTMLElementTagNameMap {
    "ea-breadcrumb": EaBreadcrumb;
    "ea-breadcrumb-item": EaBreadcrumbItem;
  }
}
