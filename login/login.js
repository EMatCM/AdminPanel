document.getElementById("ingresar").addEventListener("click", () => {
	const usuario = document.getElementById("usuario").value.trim();
	const clave = document.getElementById("clave").value.trim();

	if (usuario && clave) {
		window.location.href = "../inicio/inico.html";
	} else {
		alert("Por favor ingresa usuario y contraseña");
	}
});
