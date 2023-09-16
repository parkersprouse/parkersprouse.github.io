(()=>{document.addEventListener("DOMContentLoaded",()=>{let t=Number.parseFloat(getComputedStyle(document.body).getPropertyValue("--breakpoint-width")),e=document.querySelector(".title");t&&e&&new ResizeObserver(()=>{window.innerWidth<t?e.style!==void 0&&(e.style.fontSize=`${e.offsetWidth*.75}%`):e.style.fontSize=void 0}).observe(document.body)});})();
//# sourceMappingURL=scripts.js.map
