var happyButton = document.getElementById("happyButton");
var sadButton = document.getElementById("sadButton");
var angryButton = document.getElementById("angryButton");
var grossButton = document.getElementById("grossButton");
var scaredButton = document.getElementById("scaredButton");

var happyDot = document.getElementById("happyDot");
var sadDot = document.getElementById("sadDot");
var angryDot = document.getElementById("angryDot");
var grossDot = document.getElementById("grossDot");
var scaredDot = document.getElementById("scaredDot");

var happyText = document.getElementById("happyText");
var sadText = document.getElementById("sadText");
var angryText = document.getElementById("angryText");
var grossText = document.getElementById("grossText");
var scaredText = document.getElementById("scaredText");


function clickButton(button){
    if(button == 'happy'){
        happyDot.style.opacity = 1;
        happyDot.classList.add("dotClicked");
        happyText.style.opacity = 1;
        happyText.style.color = 'black';

        sadDot.style.opacity = .4;
        sadText.style.opacity = .6;

        angryDot.style.opacity = .4;
        angryText.style.opacity = .6;

        grossDot.style.opacity = .4;
        grossText.style.opacity = .6;

        scaredDot.style.opacity = .4;
        scaredText.style.opacity = .6;
    }
}

happyButton.addEventListener('click', ()=>{
    clickButton('happy');
});




function enable(element, show, key = 0){
    element.style.opacity = show? 1 : 0;
    element.style.pointerEvents = show? "all" : "none";

}