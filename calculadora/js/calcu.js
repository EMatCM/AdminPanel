const pantalla = document.querySelector(".pantalla");
const botones = document.querySelectorAll(".bt");

botones.forEach((boton) => {
	boton.addEventListener("click", () => {
		const bta = boton.textContent;

		if (boton.id === "c") {
			pantalla.textContent = "0";
			return;
		}

		if (boton.id === "borrar") {
			if (pantalla.textContent.length === 1) {
				pantalla.textContent = "0";
			} else {
				if (pantalla.textContent === "Error!") {
					pantalla.textContent = "0";
				} else {
					pantalla.textContent = pantalla.textContent.slice(0, -1);
				}
			}
			return;
		}

		if (boton.id === "igual") {
			try {
				pantalla.textContent = eval(pantalla.textContent);
			} catch (error) {
				pantalla.textContent = "Error!";
			}

			return;
		}

		if (pantalla.textContent === "0" || pantalla.textContent === "Error!") {
			pantalla.textContent = bta;
		} else {
			pantalla.textContent += bta;
		}

		if (
			pantalla.textContent === "x" ||
			pantalla.textContent === "/" ||
			pantalla.textContent === "+"
		) {
			pantalla.textContent = "Error!";
			return;
		}
	});
});
