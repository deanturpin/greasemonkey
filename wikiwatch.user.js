// ==UserScript==
// @name				wikiwatch
// @author			Dean Turpin
// @description	Wiki helper
// @namespace   deanturpin
// @include			https://en.wikipedia.org/wiki/*
// @version     1
// @grant       none
// ==/UserScript==

// Create a popup
var popup = document.createElement("div");
var t = document.createTextNode("");
popup.innerHTML += "WIKIWATCH"

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
