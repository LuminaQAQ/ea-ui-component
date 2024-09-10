const globalConfig = {
    fontelloCSS: 'https://cdn.jsdelivr.net/npm/easy-component-ui/components/ea-icon/css/fontello.css',
};

function setConfig(newConfig) {
    Object.assign(globalConfig, newConfig);
    document.dispatchEvent(new CustomEvent('configChanged', { detail: globalConfig }));
}

export { setConfig };