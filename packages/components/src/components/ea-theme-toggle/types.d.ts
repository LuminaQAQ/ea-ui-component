export interface EaThemeToggleEventDetail {
  mode: "light" | "dark";
}

declare global {
  interface HTMLElementTagNameMap {
    "ea-theme-toggle": HTMLElement & {
      mode: "light" | "dark" | "auto";
    };
  }

  interface GlobalEventHandlersEventMap {
    "ea-theme-toggle-change": CustomEvent<EaThemeToggleEventDetail>;
  }
}

export interface EaThemeToggleVueComponent {
  props: {
    mode?: "light" | "dark" | "auto";
  };
  events: {
    "ea-theme-toggle-change": EaThemeToggleEventDetail;
  };
  slots: {};
}

export interface EaThemeToggleReactProps {
  mode?: "light" | "dark" | "auto";
  onEaThemeToggleChange?: (e: CustomEvent<EaThemeToggleEventDetail>) => void;
}
