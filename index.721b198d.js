const Themes=Object.freeze({Dark:"dark",Light:"light"});document.addEventListener("DOMContentLoaded",(()=>{const e=document.querySelector(".theme-toggle"),t=e.querySelector("a"),s=document.querySelector("body");function a(e){e===Themes.Dark?(s.classList.remove("light"),s.classList.add("dark"),t.innerText="go light"):(s.classList.remove("dark"),s.classList.add("light"),t.innerText="go dark"),window.localStorage.setItem("theme",e)}t.onclick=e=>{e.preventDefault(),s.classList.contains("light")?a(Themes.Dark):a(Themes.Light)};const o=window.localStorage.getItem("theme");o?a(o):window.matchMedia("(prefers-color-scheme: dark)").matches?a(Themes.Dark):window.matchMedia("(prefers-color-scheme: light)").matches&&a(Themes.Light),e.style.display="initial"}));
//# sourceMappingURL=index.721b198d.js.map