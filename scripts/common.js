document.addEventListener("DOMContentLoaded", () => {
	document
		.querySelector(".theme-dot")
		.addEventListener("click", function (event) {
			if (event.srcElement.getAttribute("theme") === "1") {
				event.srcElement.setAttribute("theme", "0");
				changeThemeTo(0, event.srcElement.getAttribute("target"));
			} else {
				event.srcElement.setAttribute("theme", "1");
				changeThemeTo(1, event.srcElement.getAttribute("target"));
			}
		});
});

const changeThemeTo = (to, target) => {
/* 	if (target !== null) { */
		// outHome
		if (to) {
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
			cssTransform(
				document.documentElement,
				"--svg-fill",
				"var(--x-white)"
			);
			cssTransform(
				document.documentElement,
				"--background-cource-box",
				"rgba(255, 255, 255, 1)"
			);
			cssTransform(
				document.documentElement,
				"--shadow-cource-box",
				"rgba(0, 0, 0, 0.1) 0px 4px 12px"
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
			cssTransform(
				document.documentElement,
				"--svg-fill",
				"var(--x-white)"
			);
			cssTransform(
				document.documentElement,
				"--background-cource-box",
				"rgba(0, 0, 0, 1)"
			);
			cssTransform(
				document.documentElement,
				"--shadow-cource-box",
				"rgba(255, 255, 255, 0.1) 0px 4px 12px"
			);
		}
/* 	} else {
		// fromHome
		cssTransform(
			document.documentElement,
			"--background-color",
			"var(--x-black)"
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
	} */
};

const cssTransform = (element, property, value) => {
	element.style.setProperty(property, value);
};
