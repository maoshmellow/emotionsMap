
function enable(element, show, key = 0){
    element.style.opacity = show? 1 : 0;
    element.style.pointerEvents = show? "all" : "none";

}