const globalConfig={fontelloCSS:"https://cdn.jsdelivr.net/npm/easy-component-ui/components/ea-icon/css/fontello.css"};function setConfig(n){Object.assign(globalConfig,n),document.dispatchEvent(new CustomEvent("configChanged",{detail:globalConfig}))}export{setConfig};