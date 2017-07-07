// ==UserScript==
// @name        stylecounsel
// @author		Dean Turpin
// @description	Source code coding standard checker for GitHub
// @namespace   deanturpin
// @include		https://github.com/*
// @version     3
// @grant       none
// ==/UserScript==

// Create a popup
var popup = document.createElement("div");
var t = document.createTextNode("");

// Style the popup
var props = "text-align: right; font-family: sans-serif;";
props += "background-color: orange; color: white;";
props += "position: fixed; bottom: 0; right: 0; margin: 40px 0px;";
props += "padding: 20px;";
props += "opacity: 0.8;";
props += "box-shadow: 10px 10px 5px #888;";
props += "border-radius: 10px 0px 0px 10px;";
popup.style = props;

// And render it
popup.appendChild(t);
document.body.appendChild(popup);

// Extract current repo info
const urlTokens = window.location.href.split("/");
const user = urlTokens[3];
report("<b>" + urlTokens.pop() + "</b><hr>");

// Wrap all debug
function report(str) { popup.innerHTML += str + "<br>"; }

// Create a new AJAX request
var client = new XMLHttpRequest();

// Set up handler for AJAX response
client.onreadystatechange = function() {

    // Check response is a good one
    if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(client.responseText);

        // Sort the response by date
        response.sort(function(a, b) {
            return (new Date(b.pushed_at) - new Date(a.pushed_at));
        });

        report("<i>Recent activity</i>");

        for (var i = 0; i < 5 && i < response.length; ++i)
            report("<a href='" + response[i].html_url + "'>"  + response[i].full_name.split("/").pop() + "</a>\n");
    }
};

// Check if there's a valid user
if (user !== "") {

    // Request recent repos
    client.open("GET", "https://api.github.com/users/" + user + "/repos");
    client.send();
}

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