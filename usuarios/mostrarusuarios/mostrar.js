const API_URL = "https://6931198a11a8738467cd3f3e.mockapi.io/Persona";

document.addEventListener("DOMContentLoaded", () => {
	const listaHTML = document.getElementById("lista");
	const buscarInput = document.getElementById("buscar");
	const btnBuscar = document.getElementById("btnBuscar");

	const modalEditar = document.getElementById("modalEditar");
	const formEditar = document.getElementById("formEditar");
	const btnCancelar = document.getElementById("btnCancelar");

	let idRegistroActual = null;
	let personas = [];

	async function obtenerPersonas() {
		try {
			const res = await fetch(API_URL);
			personas = await res.json();
			mostrarLista();
		} catch (error) {
			console.error("Error:", error);
		}
	}

	function renderizar(lista) {
		listaHTML.innerHTML = "";
		lista.forEach((p) => {
			const li = document.createElement("li");

			const infoDiv = document.createElement("div");
			infoDiv.className = "persona-info";
			infoDiv.innerHTML = `
                <div class="info-item"><span class="info-label">Cédula (ID)</span><span class="info-value">${p.id}</span></div>
                <div class="info-item"><span class="info-label">Usuario</span><span class="info-value">${p.usuario}</span></div>
                <div class="info-item"><span class="info-label">Nombre</span><span class="info-value">${p.name}</span></div>
                <div class="info-item"><span class="info-label">Email</span><span class="info-value">${p.correo}</span></div>
                <div class="info-item"><span class="info-label">Teléfono</span><span class="info-value">${p.telefono}</span></div>
                <div class="info-item"><span class="info-label">Sexo</span><span class="info-value">${p.sexo}</span></div>
                <div class="info-item"><span class="info-label">Tipo</span><span class="info-value">${p.tipo}</span></div>
            `;

			const btnContainer = document.createElement("div");
			btnContainer.className = "btn-actions";

			const btnEditar = document.createElement("button");
			btnEditar.textContent = "Editar";
			btnEditar.classList.add("editar");
			btnEditar.addEventListener("click", () => abrirModalEditar(p));

			const btnEliminar = document.createElement("button");
			btnEliminar.textContent = "Eliminar";
			btnEliminar.classList.add("eliminar");
			btnEliminar.addEventListener("click", () => eliminarPersona(p.id));

			btnContainer.append(btnEditar, btnEliminar);
			li.append(infoDiv, btnContainer);
			listaHTML.appendChild(li);
		});
	}

	function mostrarLista(filtro = "") {
		const filtradas = personas.filter((p) => {
			const texto = `${p.id} ${p.name}`.toLowerCase();
			return texto.includes(filtro.toLowerCase());
		});
		renderizar(filtradas);
	}

	btnBuscar.addEventListener("click", () => mostrarLista(buscarInput.value));

	async function eliminarPersona(id) {
		if (!confirm("¿Eliminar registro?")) return;
		try {
			await fetch(`${API_URL}/${id}`, { method: "DELETE" });
			obtenerPersonas();
		} catch (e) {
			alert("Error al eliminar");
		}
	}

	function abrirModalEditar(persona) {
		idRegistroActual = persona.id;

		const partes = persona.name.split(" ");
		const nombre = partes[0];
		const apellido = partes.slice(1).join(" ");

		document.getElementById("editCedula").value = persona.id;
		document.getElementById("editCedula").disabled = true;

		document.getElementById("editNombre").value = nombre;
		document.getElementById("editApellido").value = apellido;
		document.getElementById("editEmail").value = persona.correo;
		document.getElementById("editTel").value = persona.telefono;
		document.getElementById("editSexo").value = persona.sexo;
		document.getElementById("editTipo").value = persona.tipo;

		modalEditar.classList.add("active");
	}

	formEditar.addEventListener("submit", async (e) => {
		e.preventDefault();
		if (!idRegistroActual) return;

		const nombreVal = document.getElementById("editNombre").value.trim();
		const cedulaVal = document.getElementById("editCedula").value;

		const primerNombre = nombreVal.split(" ")[0];
		const primeraLetra = primerNombre.charAt(0);
		const passwordGenerada = `${primeraLetra}${cedulaVal}`;

		const objActualizado = {
			name: `${nombreVal} ${document.getElementById("editApellido").value}`,
			correo: document.getElementById("editEmail").value,
			telefono: document.getElementById("editTel").value,
			sexo: document.getElementById("editSexo").value,
			tipo: document.getElementById("editTipo").value,

			usuario: primerNombre,
			contrasena: passwordGenerada,
		};

		try {
			await fetch(`${API_URL}/${idRegistroActual}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(objActualizado),
			});
			cerrarModal();
			obtenerPersonas();
			alert("Usuario actualizado");
		} catch (e) {
			alert("Error al actualizar");
		}
	});

	function cerrarModal() {
		modalEditar.classList.remove("active");
		idRegistroActual = null;
		formEditar.reset();
		document.getElementById("editCedula").disabled = false;
	}

	btnCancelar.addEventListener("click", cerrarModal);

	obtenerPersonas();
});
