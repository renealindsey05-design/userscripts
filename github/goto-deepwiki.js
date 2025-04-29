// ==UserScript==
// @name         Goto DeepWiki
// @namespace    userscripts.henryfour.com
// @version      0.1
// @description  在 GitHub 页面添加跳转到 DeepWiki 的按钮
// @match        https://github.com/*
// @icon         https://deepwiki.com/favicon.ico
// @grant        none
// @author       HenryFour
// @license      MIT
// @run-at       document-end
// ==/UserScript==

(function () {
  "use strict";

  const body = document.querySelector("body");
  if (body) {
    watch(body, main);
    main();
  }
})();

function watch(dom, callback) {
  const observer = new MutationObserver(() => {
    callback();
  });
  observer.observe(dom, {
    childList: true,
    subtree: true,
  });
}

function main() {
  if (document.getElementById("goto-deepwiki")) {
    return;
  }

  // 获取导航栏
  const nav = document.querySelector("nav[role='navigation']");
  if (!nav) {
    return;
  }
  // 在导航条右侧添加按钮
  nav.appendChild(createDeepWikiBtn());
}

function createDeepWikiBtn() {
  const btn = document.createElement("div");
  const pathParts = location.pathname.split("/").filter(Boolean);
  const repName = pathParts.slice(0, 2).join("/");
  const targetUrl = `https://deepwiki.com/${repName}`;

  btn.style.cssText = `
    display: inline-flex;
    align-items: center;
    padding: 4px 8px;
    border: 1px solid #d0d7de;
    border-radius: 6px;
    background-color: rgb(179, 232, 249);
    font-weight: 500;
    transition: all 0.2s;
    margin-left: 20px;
  `;
  // margin-left: auto;

  btn.innerHTML = `
    <a id="goto-deepwiki" 
       href="${targetUrl}" 
       target="_blank" 
       style="
         text-decoration: none;
         display: inline-block;
         color: #333333;
       ">
      💠 Goto DeepWiki
    </a>
  `;

  return btn;
}
