export function newElement(id, cName, type) {
    const el = document.createElement(type);
    el.id = id;
    el.className = cName;
    return el;
}
