
function enable(element, show, key = 0){
    element.style.opacity = show? 1 : 0;
    element.style.pointerEvents = show? "all" : "none";

    if(key==1){
        element.style.right = show? '0%' : '-110%';
    }
}

function handleMenu() {
    menuIcon.classList.toggle("change");
    menu.style.right = menuOn?"-80%":"0%";
    menuOn = !menuOn;
}
