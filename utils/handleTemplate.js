export const handleTemplate = (self, slotName, realSlot, tempSlot) => {
    const template = self.querySelector(`[slot="${slotName}"]`);
    if (!template) return;

    try {
        if (template.childNodes.length === 0) {
            realSlot.innerHTML = template.innerHTML;
        } else if (template.innerHTML === '') {
            const nodes = template.childNodes;
            realSlot.innerHTML = '';
            Array.from(nodes).forEach(node => {
                realSlot.appendChild(node.cloneNode(true));
            });
        }

        template.remove();
        tempSlot.remove();
    } catch (e) { }
}  