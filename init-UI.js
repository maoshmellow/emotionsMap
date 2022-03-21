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

var activeDot;
var oldDot =  null;
var activeText;
var oldText = null;
var clicked = false;

var happyText = document.getElementById("happyText");
var sadText = document.getElementById("sadText");
var angryText = document.getElementById("angryText");
var grossText = document.getElementById("grossText");
var scaredText = document.getElementById("scaredText");

var downPrompt = document.getElementById("downPrompt");


function clickButton(button){
    if(!clicked){
        var downInterval = setInterval(() => {
            enable(downPrompt, true);
            clearInterval(downInterval);
        }, 450);
        
        clicked = true;
    }

    if(activeDot){
        oldDot = activeDot;
    }

    if(activeText){
        oldText = activeText;
    }

    if(button == 'happy'){
        activeDot = happyDot;
        activeText = happyText;

        happyDot.style.opacity = 1;
        happyText.style.opacity = 1;

        sadDot.style.opacity = .4;
        sadText.style.opacity = .6;

        angryDot.style.opacity = .4;
        angryText.style.opacity = .6;

        grossDot.style.opacity = .4;
        grossText.style.opacity = .6;

        scaredDot.style.opacity = .4;
        scaredText.style.opacity = .6;
    }

    if(button == 'sad'){
        activeDot = sadDot;
        activeText = sadText;

        sadDot.style.opacity = 1;
        sadDot.classList.add("dotClicked");
        sadText.style.opacity = 1;

        happyDot.style.opacity = .4;
        happyText.style.opacity = .6;

        angryDot.style.opacity = .4;
        angryText.style.opacity = .6;

        grossDot.style.opacity = .4;
        grossText.style.opacity = .6;

        scaredDot.style.opacity = .4;
        scaredText.style.opacity = .6;
    }

    if(button == 'angry'){
        activeDot = angryDot;
        activeText = angryText;

        angryDot.style.opacity = 1;
        angryDot.classList.add("dotClicked");
        angryText.style.opacity = 1;

        happyDot.style.opacity = .4;
        happyText.style.opacity = .6;

        sadDot.style.opacity = .4;
        sadText.style.opacity = .6;

        grossDot.style.opacity = .4;
        grossText.style.opacity = .6;

        scaredDot.style.opacity = .4;
        scaredText.style.opacity = .6;
    }

    if(button == 'gross'){
        activeDot = grossDot;
        activeText = grossText;

        grossDot.style.opacity = 1;
        grossDot.classList.add("dotClicked");
        grossText.style.opacity = 1;

        happyDot.style.opacity = .4;
        happyText.style.opacity = .6;

        sadDot.style.opacity = .4;
        sadText.style.opacity = .6;

        angryDot.style.opacity = .4;
        angryText.style.opacity = .6;

        scaredDot.style.opacity = .4;
        scaredText.style.opacity = .6;
    }

    if(button == 'scared'){
        activeDot = scaredDot;
        activeText = scaredText;

        scaredDot.style.opacity = 1;
        scaredDot.classList.add("dotClicked");
        scaredText.style.opacity = 1;

        happyDot.style.opacity = .4;
        happyText.style.opacity = .6;

        sadDot.style.opacity = .4;
        sadText.style.opacity = .6;

        angryDot.style.opacity = .4;
        angryText.style.opacity = .6;

        grossDot.style.opacity = .4;
        grossText.style.opacity = .6;
    }

    if(oldDot){
        oldDot.classList.remove('dotClicked')
    }
    
    if(oldText){
        oldText.style.color = '#333333';
    }
    
    activeDot.classList.add('dotClicked');
    activeText.style.color = 'black';
}

happyButton.addEventListener('click', ()=>{
    clickButton('happy');
});

sadButton.addEventListener('click', ()=>{
    clickButton('sad');
})

angryButton.addEventListener('click', ()=>{
    clickButton('angry');
})

grossButton.addEventListener('click', ()=>{
    clickButton('gross');
})

scaredButton.addEventListener('click', ()=>{
    clickButton('scared');
})

function enable(element, show, key = 0){
    element.style.opacity = show? 1 : 0;
    if(key == 1){
        element.style.pointerEvents = show? "all" : "none";
    }
}