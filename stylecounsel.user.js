// ==UserScript==
// @name        stylecounsel
// @author			Dean Turpin
// @description	Source code coding standard checker for GitHub
// @namespace   deanturpin
// @include			https://github.com/*
// @version     1
// @grant       none
// ==/UserScript==

// Create a popup
var popup = document.createElement("div");
var t = document.createTextNode("");

// Style the popup
var props = "text-align: left; font-family: sans-serif;";
props += "background-color: magenta; color: white;";
props += "position: fixed; bottom: 0; right: 0; margin: 40px 0px;";
props += "padding: 20px;";
props += "box-shadow: 10px 10px 5px #888;";
props += "border-radius: 10px 0px 0px 10px;";
popup.style = props;

// And render it
popup.appendChild(t);
document.body.appendChild(popup);

// Wrap all debug
function report(str) { popup.innerHTML += str + "<br>"; }

report("WE ARE COUNSEL <a href='https://github.com/deanturpin/stylepolice'>:)</a>");

// Find the element containing the source code
const source = document.body.getElementsByClassName("blob-wrapper")[0];

// If we failed then quit
if (source !== undefined) {

    const sourceElement = source.children[0].children[0];

    // Get the plaintext ssource to parse
    const lines = sourceElement.innerText.split("\n");

    // Things we'll report
    var longLines = 0;

    // Let's analyse
    for (var i = 0; i < sourceElement.childElementCount; ++i)
        if (lines[i] && lines[i].length > 80) {
            
            sourceElement.children[i].innerHTML += " <- long line (" + lines[i].length + ")";
            ++longLines;
        }

    // Report some things
    report("Lines " + sourceElement.childElementCount);
    report("File type " + window.location.pathname.split(".").pop());
    report("Long lines " + longLines);
}
else
    report("We have nothing");
