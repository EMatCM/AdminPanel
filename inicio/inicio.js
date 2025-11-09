document.addEventListener("DOMContentLoaded", () => {
	const windowElement = document.querySelector(".window");
	const menuLinks = document.querySelectorAll(".sidebar a");

	menuLinks.forEach((link) => {
		link.addEventListener("click", () => {
			windowElement.style.display = "none";
		});
	});
});
