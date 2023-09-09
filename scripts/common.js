const savedTheme = localStorage.getItem("theme");

if (savedTheme === null) {
    localStorage.setItem("theme", 1);
}

document.addEventListener("DOMContentLoaded", () => {
    document
        .querySelector(".theme-dot")
        .addEventListener("click", function (event) {
            if (event.srcElement.getAttribute("theme") === "1") {
                event.srcElement.setAttribute("theme", "0");
                localStorage.setItem("theme", 0);
                changeThemeTo(0, event.srcElement.getAttribute("target"));
            } else {
                event.srcElement.setAttribute("theme", "1");
                localStorage.setItem("theme", 1);
                changeThemeTo(1, event.srcElement.getAttribute("target"));
            }
        });
});

const changeThemeTo = (to, target) => {
    if (to == 1) {
        // Light
        cssTransform(
            document.documentElement,
            "--background-color",
            "var(--x-green)"
        );
        cssTransform(
            document.documentElement,
            "--foreground-color",
            "var(--x-white)"
        );
        cssTransform(document.body, "background-color", "var(--x-green)");
        cssTransform(
            document.getElementsByTagName("html")[0],
            "background-color",
            "var(--x-green)"
        );
        cssTransform(
            document.querySelector(".theme-dot"),
            "background-color",
            "var(--x-black)"
        );
        cssTransform(
            document.querySelector(".global-header-wrapper.headder-shadow"),
            "--shadow-color",
            "0 2px 10px 0 rgb(0 0 0 / 7%)"
        );
        cssTransform(document.documentElement, "--svg-fill", "var(--x-white)");
        cssTransform(
            document.documentElement,
            "--background-cource-box",
            "rgba(0, 0, 0, 0.3)"
        );
        cssTransform(
            document.documentElement,
            "--shadow-cource-box",
            "rgba(0, 0, 0, 0.1) 0px 4px 12px"
        );
        cssTransform(
            document.documentElement,
            "--input-background",
            "rgba(0, 0, 0, 0.1)"
        );
        cssTransform(
            document.documentElement,
            "--tabulator-background",
            "rgba(0, 0, 0, 0.1)"
        );
        cssTransform(
            document.documentElement,
            "--tabulator-foreground",
            "var(--x-black)"
        );
    } else {
        // Dark
        cssTransform(
            document.documentElement,
            "--background-color",
            "var(--x-black)"
        );
        cssTransform(
            document.documentElement,
            "--foreground-color",
            "var(--x-white)"
        );
        cssTransform(document.body, "background-color", "var(--x-black)");
        cssTransform(
            document.getElementsByTagName("html")[0],
            "background-color",
            "var(--x-black)"
        );
        cssTransform(
            document.querySelector(".theme-dot"),
            "background-color",
            "var(--x-green)"
        );
        cssTransform(
            document.querySelector(".global-header-wrapper.headder-shadow"),
            "--shadow-color",
            "0 2px 10px 0 rgb(255 255 255 / 7%)"
        );
        cssTransform(document.documentElement, "--svg-fill", "var(--x-white)");
        cssTransform(
            document.documentElement,
            "--background-cource-box",
            "rgba(255, 255, 255, 0.1)"
        );
        cssTransform(
            document.documentElement,
            "--shadow-cource-box",
            "rgba(255, 255, 255, 0.1) 0px 4px 12px"
        );
        cssTransform(
            document.documentElement,
            "--input-background",
            "rgba(255, 255, 255, 0.1)"
        );
        cssTransform(
            document.documentElement,
            "--tabulator-background",
            "rgba(255, 255, 255, 0.1)"
        );
        cssTransform(
            document.documentElement,
            "--tabulator-foreground",
            "var(--x-white)"
        );
    }
};

const cssTransform = (element, property, value) => {
    element.style.setProperty(property, value);
};

function openNavigation() {
    document.getElementById("side-panel").style.width = "100%";
}

function closeNavigation() {
    document.getElementById("side-panel").style.width = "0";
}
