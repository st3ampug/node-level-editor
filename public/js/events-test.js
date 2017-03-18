// Variables ===========================================================================

const SELECTED = "selected";
const NOTSELECTED = "no";
const IMGPATH = "img/tiles/"
const IMGEXTENSION = ".png";
const CONTAINERTABLE = "containerTable";
const INITTABLE = "initTable";
const FINALTABLE = "finalTable";
const HEADERTILEPARTIAL = "headerTile";
const ROWTILEPARTIAL = "rowTile";
const PLACEHOLDER = "placegholder.png";
const INITROWPARTIAL = "initRow";
const INITPARTIAL = "init";
const FiNALPARTIAL = "final";
const PICPARTIAL = "Pic";

var containerTable = document.getElementById(CONTAINERTABLE);
var initTable = document.getElementById(INITTABLE);

var lastSelected = -1;
var currentSelected = -1;
var usedTilesInit = [];
var usedTilesFinal = [];

var objTemplate = {
    num: "",
    coords: []
}

// =====================================================================================

// Event Listeners =====================================================================

window.addEventListener('load', function(){
    console.log("onload");

    containerTable.addEventListener('click', function(ev) {
        if(ev.target.tagName.toLowerCase() == "img") {
            var num = returnTileNumber(ev.target.parentNode.id);

            // setting selection
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
        var coords = [];
        if(ev.target.tagName.toLowerCase() == "img") {
            coords = getCoordsFromId(ev.target.parentNode.id, INITPARTIAL);
            console.log(coords);
        }
        if(ev.target.tagName.toLowerCase() == "td") {
            coords = getCoordsFromId(ev.target.id, INITPARTIAL);
            console.log(coords);
        }

        if(checkTileUsage(usedTilesInit)) {

            // make sure to deal with the issue of: you click on the number that has already been usedTilesFinal
            // maybe you will need to use some class library, so you can store the coords for the already used numvers
            // actually you can just have an object describing the number and it's coords, and just use that to push to the array
            if(coords.length == 2) {
                var img = document.getElementById(INITPARTIAL + PICPARTIAL + coords[0] + coords[1]);
                img.setAttribute("src", IMGPATH + currentSelected + IMGEXTENSION);
                usedTilesInit.push(currentSelected);
            }
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

function checkTileUsage(tilearray, currentSelected) {
    for(var i = 0; i < tilearray.length; i++) {
        if(tilearray[i].equals(currentSelected))
            return false;
    }
    return true;
}

// =====================================================================================