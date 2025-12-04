const API_URL = "https://6931198a11a8738467cd3f3e.mockapi.io/Persona";

document.getElementById("ingresar").addEventListener("click", async () => {
	const user = document.getElementById("usuario").value.trim();
	const password = document.getElementById("clave").value.trim();

	if (!user || !password) {
		alert("Por favor ingrese usuario y contraseña");
		return;
	}

	try {
		const res = await fetch(API_URL);
		const personas = await res.json();

		const usuarioEncontrado = personas.find((p) => {
			return p.usuario.toLowerCase() === user.toLowerCase() && p.contrasena === password;
		});

		if (usuarioEncontrado) {
			if (usuarioEncontrado.tipo.toLowerCase() === "admin") {
				window.location.href = "../inicio/inico.html";
			} else {
				alert("Acceso denegado: Usted no tiene permisos de Administrador.");
			}
		} else {
			alert("Error de usuario o contraseña.");
		}
	} catch (error) {
		console.error("Error login:", error);
		alert("Error de conexión con la base de datos");
	}
});
