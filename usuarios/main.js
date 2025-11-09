document.addEventListener("DOMContentLoaded", () => {
	const botonGuardar = document.getElementById("boton");

	// Recuperar personas desde localStorage o inicializar vacío
	let personas = JSON.parse(localStorage.getItem("personas")) || [];

	// Guardar datos
	function guardarDatos() {
		const persona = {
			cedula: document.getElementById("cedula").value.trim(),
			nombre: document.getElementById("nombre").value.trim(),
			apellido: document.getElementById("apellido").value.trim(),
			email: document.getElementById("email").value.trim(),
			tel: document.getElementById("tel").value.trim(),
			sexo: document.getElementById("sexo").value,
			tipo: document.getElementById("tipo").value,
		};

		// Validar campos obligatorios
		if (
			!persona.cedula ||
			!persona.nombre ||
			!persona.apellido ||
			!persona.email ||
			!persona.tipo
		) {
			alert("Por favor complete todos los campos obligatorios");
			return;
		}

		// Evitar duplicados por cédula
		if (personas.some((p) => p.cedula === persona.cedula)) {
			alert("Ya existe una persona con esa cédula");
			return;
		}

		personas.push(persona);
		localStorage.setItem("personas", JSON.stringify(personas));

		limpiarCampos();
		alert("Agregado con exito");
	}

	// Limpiar campos
	function limpiarCampos() {
		document.getElementById("cedula").value = "";
		document.getElementById("nombre").value = "";
		document.getElementById("apellido").value = "";
		document.getElementById("email").value = "";
		document.getElementById("tel").value = "";
		document.getElementById("sexo").selectedIndex = 0;
		document.getElementById("tipo").selectedIndex = 0;
	}

	// Eventos
	botonGuardar.addEventListener("click", guardarDatos);
});
