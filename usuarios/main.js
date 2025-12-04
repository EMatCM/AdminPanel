const API_URL = "https://6931198a11a8738467cd3f3e.mockapi.io/Persona";

document.addEventListener("DOMContentLoaded", () => {
	const botonGuardar = document.getElementById("boton");

	async function guardarDatos() {
		const cedulaVal = document.getElementById("cedula").value.trim();
		const nombreVal = document.getElementById("nombre").value.trim();
		const apellidoVal = document.getElementById("apellido").value.trim();
		const emailVal = document.getElementById("email").value.trim();
		const telVal = document.getElementById("tel").value.trim();
		const sexoVal = document.getElementById("sexo").value;
		const tipoVal = document.getElementById("tipo").value;

		if (!cedulaVal || !nombreVal || !apellidoVal || !emailVal) {
			alert("Por favor complete los campos obligatorios");
			return;
		}

		const primerNombre = nombreVal.split(" ")[0];
		const primeraLetra = primerNombre.charAt(0);

		const passwordGenerada = `${primeraLetra}${cedulaVal}`;

		const nuevaPersona = {
			id: cedulaVal,
			name: `${nombreVal} ${apellidoVal}`,
			correo: emailVal,
			telefono: telVal,
			sexo: sexoVal,
			tipo: tipoVal,

			usuario: primerNombre,
			contrasena: passwordGenerada,
		};

		try {
			const checkRes = await fetch(`${API_URL}/${cedulaVal}`);
			if (checkRes.ok) {
				alert("Error: Ya existe una persona con esa Cédula (ID).");
				return;
			}

			const response = await fetch(API_URL, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(nuevaPersona),
			});

			if (response.ok) {
				alert(
					`Registro exitoso.\nSu Usuario es: ${primerNombre}\nSu Contraseña es: ${passwordGenerada}`
				);
				limpiarCampos();
			} else {
				alert("Error al guardar en la API.");
			}
		} catch (error) {
			console.error("Error:", error);
		}
	}

	function limpiarCampos() {
		document.getElementById("cedula").value = "";
		document.getElementById("nombre").value = "";
		document.getElementById("apellido").value = "";
		document.getElementById("email").value = "";
		document.getElementById("tel").value = "";
		document.getElementById("sexo").selectedIndex = 0;
		document.getElementById("tipo").selectedIndex = 0;
	}

	botonGuardar.addEventListener("click", guardarDatos);
});
