document.getElementById("ingresar").addEventListener("click", () => {
	const usuario = document.getElementById("usuario").value.trim().toLowerCase();
	const clave = document.getElementById("clave").value.trim();

	const personas = JSON.parse(localStorage.getItem("personas")) || [];

	// Buscar coincidencia
	const adminValido = personas.find((p) => {
		const primerNombre = p.nombre.trim().split(" ")[0].toLowerCase();
		return (
			p.tipo.toLowerCase() === "admin" && primerNombre === usuario && p.cedula === clave
		);
	});

	if (adminValido) {
		window.location.href = "../inicio/inico.html";
	} else {
		alert("Usuario o contraseña incorrectos, o no tiene permisos de administrador");
	}
});
