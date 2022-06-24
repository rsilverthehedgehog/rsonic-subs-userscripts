// ==UserScript==
// @name         r/MoonPissing - rules for old.reddit
// @namespace    sonichedgehogiscool
// @version      1
// @description  r/MoonPissing - rules for old.reddit
// @author       Miles Prower
// @match        https://old.reddit.com/r/MoonPissing*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=reddit.com
// @grant        none
// @run-at document-end
// ==/UserScript==

(function () {
    'use strict';
    let box = document.querySelector("div.titlebox .usertext-body.md-container .md");
    box.innerHTML = "";

    async function get_rules() {
        let rules = await fetch('https://api.reddit.com/r/moonpissing/about/rules');
        let rules_json = await rules.json();
        return rules_json.rules.map(rule => {
            return `<h3>${rule.short_name}</h3>
        <ul>
        <li>${rule.description}</li>
        </ul>`
        }).join("\n");
    }

    (async () => {
        box.innerHTML = ("<p>The more light-hearted &amp; chaotic sibling to <a href=\"/r/SonicTheHedgehog\">/r/SonicTheHedgehog</a>.</p>" + await get_rules());
    })();
})();