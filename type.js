const tbar = document.querySelector('#textbar');
const mn = document.querySelector('#main');
const cdmn = document.querySelector('#codomain');
const cur = document.querySelector('#cur');
const tab = document.querySelector('#ancTab');
const shadow = document.querySelector('#ancShd');
const anch = document.querySelector('#anchor');
const blue = document.querySelector('#blue');
const blue1 = document.querySelector('#selTab');
const blue2 = document.querySelector('#select');
let rngAnc, rngCur, rngSel;

mn.addEventListener('mouseup',C2T);
tbar.addEventListener('input',T2C);
tbar.addEventListener('select',T2C);
tbar.addEventListener('keydown',()=>{
    if(window.event.keyCode >= 37 && window.event.keyCode <= 40){setTimeout(T2C,1);};
});
cdmn.addEventListener('mousemove',()=>{
    if(event.buttons & 1 == 1){setCursor();};
});

function setCursor(){
    sel = window.getSelection();
    rngSel = sel.getRangeAt(0);
    rngAnc = new Range();
    rngAnc.setStartBefore(cdmn);
    rngCur = rngAnc.cloneRange();
    rngAnc.setEnd(rngSel.startContainer,rngSel.startOffset);
    rngCur.setEnd(sel.extentNode,sel.extentOffset);
    blue1.innerHTML = rngAnc.toString();
    blue2.innerHTML = rngSel.toString();
    tab.innerHTML = rngCur.toString();
    renderCur();
};
function C2T(){
    setCursor();
    tbar.focus();
    if(rngAnc.toString()==rngCur.toString()){
        tbar.setSelectionRange(rngAnc.toString().length,rngAnc.toString().length+rngSel.toString().length,'backward');
    }else{
        tbar.setSelectionRange(rngAnc.toString().length,rngAnc.toString().length+rngSel.toString().length,'forward');
    };
};
function T2C(){
    cdmn.innerHTML = tbar.value;
    blue1.innerHTML = tbar.value.substring(0,tbar.selectionStart);
    blue2.innerHTML = tbar.value.substring(tbar.selectionStart,tbar.selectionEnd);
    if(tbar.selectionDirection == 'forward'){
        tab.innerHTML = tbar.value.substring(0,tbar.selectionEnd);
    }else{
        tab.innerHTML = tbar.value.substring(0,tbar.selectionStart);
    };
    renderCur();
};
function renderCur(){
    anch.style.setProperty('top',shadow.offsetTop+1.1+'px');
    anch.style.setProperty('left',shadow.offsetLeft+'px');
};
// cdmn.innerHTML = 'aaaa\nbbbaaaa\nbbb'