/**
 * File containing the function calls for the behaviors in the header.
 */

$(function() {
    animateTitle();

    const mulMethods = ['pencil', 'booths', 'extended-booths'];
    for (const mulMethod of mulMethods) {
        hoverSelectedElem(mulMethod);
        clickMulMethod(mulMethods, mulMethod);
    }

    const elems = ['title', 'about', 'save'];
    for (const elem of elems) {
        hoverElem(elem);
    }
    
    hoverDropdown('display-mode');
    controlDropdown('display-mode');
});