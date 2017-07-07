// ==UserScript==
// @name        gitguide
// @author		Dean Turpin
// @description	Helper panel and coding standard checker for GitHub
// @namespace   deanturpin
// @include		https://github.com/*
// @version     4
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
            return (new Date(b.updated_at) - new Date(a.updated_at));
        });

        report("<i>Recent activity</i>");

        for (var i = 0; i < 5 && i < response.length; ++i)
            report("<a href='" + response[i].html_url + "'>"  + response[i].full_name.split("/").pop() + "</a>\n");
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
    report("");
}
