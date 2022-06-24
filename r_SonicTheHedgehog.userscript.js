// ==UserScript==
// @name         r/SonicTheHedgehog - rules for old.reddit
// @namespace    sonichedgehogiscool
// @version      1
// @description  r/SonicTheHedgehog - rules for old.reddit
// @author       Miles Prower
// @match        https://old.reddit.com/r/SonicTheHedgehog*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=reddit.com
// @grant        none
// @run-at document-end
// ==/UserScript==

(function () {
    'use strict';
    let box = document.querySelector("div.titlebox .usertext-body.md-container .md");
    box.innerHTML = "";

    async function get_description() {
        let description = await fetch('https://api.reddit.com/r/sonicthehedgehog/about');
        let description_json = await description.json();
        return `<p>${description_json.data.public_description}</p>`;
    }

    async function get_rules() {
        let rules = await fetch('https://api.reddit.com/r/sonicthehedgehog/about/rules');
        let rules_json = await rules.json();
        return rules_json.rules.map(rule => {
            return `<h3>${rule.short_name}</h3>
        <ul>
        <li>${rule.description}</li>
        </ul>`
        }).join("\n");
    }

    (async () => {
        box.innerHTML = (await get_description() + "<h2><strong>Tips on being Way past cool</strong></h2>" + await get_rules() + "<h2><strong>Other tips</strong></h2><h3>Things to know</h3><ul><li><a href=\"https://discord.gg/sonic\">The Official Subreddit Sonic Discord Chat!</a> discord.gg/sonic</li><li><a href=\"/r/SonicTheHedgehog\">/r/SonicTheHedgehog</a> is still awaiting the promised CSS support for new.reddit.com</li></ul>");
    })();
})();