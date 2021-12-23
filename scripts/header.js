$(function() {
    animateTitle();

    const mulMethods = ['pencil', 'booths', 'extended-booths'];
    for (const mulMethod of mulMethods) {
        hoverSelectedElem(mulMethod);
    }

    const elems = ['title', 'about', 'save'];
    for (const elem of elems) {
        hoverElem(elem);
    }

    hoverDropdown('display-mode');
    expandCollapseDropdown('display-mode');
    clickDropdown('display-mode');
});