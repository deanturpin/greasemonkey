// ==UserScript==
// @name		wikiwatch
// @author		Dean Turpin
// @description	Wiki helper
// @namespace   deanturpin
// @include		https://en.wikipedia.org/wiki/*
// @version     1
// @grant       none
// ==/UserScript==

// Create a popup
const popup = document.createElement("div");
const text = document.createTextNode("");

// Style the popup
var props = "text-align: left; font-family: serif;";
props += "background-color: magenta; color: white;";
props += "position: fixed; top: 0; right: 0; margin: 100px 0px;";
props += "padding: 20px; width: 200px;";
props += "opacity: 0.5;";
props += "box-shadow: 10px 10px 5px #888;";
props += "border: 2px solid black;";
props += "border-radius: 10px 0px 0px 10px;";
popup.style = props;

// And render it
popup.appendChild(text);
document.body.appendChild(popup);

// Get page title
const title = window.location.href.split("/").pop().replace(/_/g,' ');
popup.innerHTML += "<i>" + title + "</i>";