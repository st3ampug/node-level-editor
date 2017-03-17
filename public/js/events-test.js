// Variables ===========================================================================

const SELECTED = "selected";
const NOTSELECTED = "no";
const CONTAINERTABLE = "containerTable";
const INITTABLE = "initTable";
const FINALTABLE = "finalTable";
const HEADERTILEPARTIAL = "headerTile";
const ROWTILEPARTIAL = "rowTile";
const PLACEHOLDER = "placegholder.png";
const INITROWPARTIAL = "initRow";
const INITPARTIAL = "init";
const FiNALPARTIAL = "final";

var containerTable = document.getElementById(CONTAINERTABLE);
var initTable = document.getElementById(INITTABLE);

var lastSelected = -1;
var currentSelected = -1;
var usedTiles = [];

// =====================================================================================

// Event Listeners =====================================================================

window.addEventListener('load', function(){
    console.log("onload");

    containerTable.addEventListener('click', function(ev) {
        if(ev.target.tagName.toLowerCase() == "img") {
            var num = returnTileNumber(ev.target.parentNode.id);
            setCurrentSelected(num);
            unSelectLast();
            selectTh(HEADERTILEPARTIAL + num);
            setLastSelected(num);
        }
        if(ev.target.tagName.toLowerCase() == "td") {
            console.log(ev.target.tagName.toLowerCase() + " >> " + ev.target.parentNode.id);
        }
        if(ev.target.tagName.toLowerCase() == "tr") {
            console.log(ev.target.id);
        }

    });

    initTable.addEventListener('click', function(ev) {
        if(ev.target.tagName.toLowerCase() == "img") {
            var coords = getCoordsFromId(ev.target.parentNode.id, INITPARTIAL);
            console.log(coords);
        }
        if(ev.target.tagName.toLowerCase() == "td") {
            var coords = getCoordsFromId(ev.target.id, INITPARTIAL);
            console.log(coords);
        }
    });
});

// =====================================================================================

// Helpers =============================================================================

function setLastSelected(num) {
    lastSelected = num;
}
function setCurrentSelected(num) {
    currentSelected = num;
}

function selectTh(id) {
    var elem = document.getElementById(id);
    if(elem.getAttribute(SELECTED) != SELECTED)
        elem.setAttribute(SELECTED, SELECTED);
    else
        elem.setAttribute(SELECTED, NOTSELECTED);
}

function unSelectLast() {
    if(lastSelected != -1) {
        var elem = document.getElementById(HEADERTILEPARTIAL + lastSelected);
        elem.setAttribute(SELECTED, NOTSELECTED);
    }
}

function returnTileNumber(id) {
    var partiallength = ROWTILEPARTIAL.length;
    var num = id.slice(partiallength);
    return num;
}

function getCoordsFromId(id, partial) {
    var partiallength = partial.length;
    var coords = [];
    coords.push(id.slice(partiallength, partiallength + 1));
    coords.push(id.slice(partiallength + 1, partiallength + 2));

    return coords;
}

// =====================================================================================