// ==UserScript==
// @name        gitguide
// @author		Dean Turpin
// @description	Helper panel and coding standard checker for GitHub
// @namespace   deanturpin
// @include		https://github.com/*
// @version     9
// @grant       GM_addStyle
// @grant       GM_getResourceText
// @resource    css https://deanturpin.github.io/greasemonkey/grease.css
// ==/UserScript==

// Create a popup
const popup = document.createElement("div");
const defaultPopupText = document.createTextNode("");

// Give it a good ID to apply style to later
popup.id = "gmpopup";

// Style the popup
GM_addStyle(GM_getResourceText("css"));

// And render it
popup.appendChild(defaultPopupText);
document.body.appendChild(popup);

// Extract current repo info
const urlTokens = window.location.href.split("/");
const user = urlTokens[3];
report("<b>" + urlTokens.pop().toUpperCase() + "</b>");

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

        for (var i = 0; i < 10 && i < response.length; ++i) {

            // Construct links to recent repos and new issue
            const url = response[i].html_url;
            const name = response[i].name;
            var link = "<a href='" + url + "'>"  + name + "</a>";
            link += " <a href='" + url + "/issues/new'>+</a>";
            report(link);
        }
    }
};

// Check if there's a valid user
if (user !== "") {

    // Request recent repos
    client.open("GET", "https://api.github.com/users/" + user + "/repos?per_page=5000");
    client.send();
}

// Find the element containing the source code
const source = document.body.getElementsByClassName("blob-wrapper")[0];

// If we failed then quit
if (source !== undefined) {

    // Get the plaintext source to parse
    const lines = source.children[0].children[0].innerText.split("\n");

    // Things we'll report
    var longLines = 0;

    // Let's check some things
    for (var i = 0; i < lines.length; ++i)
        if (lines[i] && lines[i].length > 80)
            ++longLines;

    // Report some things
    report("Lines " + lines.length);
    report("Long lines " + longLines);
}
