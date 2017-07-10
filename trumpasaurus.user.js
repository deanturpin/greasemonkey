// ==UserScript==
// @name        trumpasaurus
// @namespace   deanturpin
// @description Quick word stat check to find candidate speeches for further study
// @include     http://www.britishpoliticalspeech.org/*
// @version     3
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

popup.appendChild(defaultPopupText);
document.body.appendChild(popup);

// Initialise popup
popup.innerHTML = "<h1 style=\"color:red;\">TRUMPASAURUS 👌</h1>";

var speech = "";

// If there's a speech element then just use that
const speechElement = document.getElementsByClassName("speech-content")[0];

// If we've found a speech store the text and analyse it
if (speechElement !== undefined) {
    speech = speechElement.innerText;
    statistics();
}

// Let's generate some stats!
function statistics() {

    // const speech = window.getSelection().toString().toLowerCase()
    const words = speech.split(/[ !"\#$%&()*+,\-./:;<=>?@\[\\\]^_`{|}~”“]+/);

    var uniqueWords = [];

    // Use associative array to remove duplicates
    for (var i in words)
        uniqueWords[words[i]] = 1;

    // Word stats
    const totalWords = words.length;
    var uniqueWordCount = 0;

    // Loop through the sparse array counting the entries
    for (var j in uniqueWords)
        ++uniqueWordCount;

    // And calculate the important metric
    const uniqueWordRatio = (100 * uniqueWordCount / totalWords);

    popup.innerHTML += "Total words " + totalWords + "<br>";
    popup.innerHTML += "Unique word ratio " + uniqueWordRatio.toFixed(0) + "%<br>";

    // Summarise in a sentence
    var summary = "This speech ";

    // Interesting
    summary +=
        uniqueWordRatio < 25 ? "is repetitive and tiresome" :
    uniqueWordRatio < 30 ? "is overly finessed" :
    uniqueWordRatio < 33 ? "has had some work done" :
    uniqueWordRatio < 36 ? "is practiced but loose" :
    uniqueWordRatio < 42 ? "is spontaneous" : "is a rant";

    // Length
    summary += " ";
    summary +=
        totalWords < 500 ? "and is very short" :
    totalWords < 1000 ? "but at least it's short" :
    totalWords < 2000 ? "and is on the short side" :
    totalWords < 3000 ? "and is a good size" :
    totalWords < 4000 ? "and is dragging on a bit" :
    totalWords < 5000 ? "and is getting long" :
    totalWords < 7000 ? "and is SOOO long" :
    totalWords < 9000 ? "... kill me now"
    : "and is the longest I've seen";

    popup.innerHTML += "<br><i>" + summary + "</i><br>";
}
