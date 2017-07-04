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
var props = "";
props += "text-align: left; font-family: serif;";
props += "background-color: magenta; color: white;";
props += "position: fixed; bottom: 0; left: 50%;";
props += "width: 200px; height: 100px;";
props += "opacity: 0.7;";
props += "box-shadow: 10px 10px 5px #888;";

// Apply the styl and render it
popup.style = props;
popup.appendChild(text);
document.body.appendChild(popup);

// Get page title
const title = window.location.href.split("/").pop().replace(/_/g,' ');
popup.innerHTML += "<i>" + title + "</i>";