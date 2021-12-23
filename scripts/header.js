$(function() {
    animateTitle();

    const mulMethods = ['pencil', 'booths', 'extended-booths'];
    for (let mulMethod of mulMethods) {
        hoverSelectedElem(mulMethod);
    }

    const elems = ['title', 'about', 'save'];
    for (let elem of elems) {
        hoverElem(elem);
    }

    hoverDropdown('display-mode');
    expandCollapseDropdown('display-mode');
});