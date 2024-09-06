const callback = (item) => {
    item.actived = false;
}

function cancelItemActived(menuItems, subMenuItems, menuItemGroups) {
    menuItems.forEach(callback);

    subMenuItems.forEach(callback);

    menuItemGroups.forEach(callback);
}

export function handleMenuItemEvent(menuItems, subMenuItems, menuItemGroups) {
    menuItems.forEach((item, index) => {
        item.itemIndex = index;

        item.addEventListener('item-selected', (e) => {
            const itemTitle = e.detail.title;

            cancelItemActived(menuItems, subMenuItems, menuItemGroups);

            item.actived = true;

            this.dispatchEvent(new CustomEvent('select', {
                detail: {
                    index,
                    title: itemTitle,
                },
            }));
        });
    });
}