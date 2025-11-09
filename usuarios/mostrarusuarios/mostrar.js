document.addEventListener("DOMContentLoaded", () => {
	const listaHTML = document.getElementById("lista");
	const buscarInput = document.getElementById("buscar");
	const tipoBusqueda = document.getElementById("tipoBusqueda");
	const btnBuscar = document.getElementById("btnBuscar");
	let personas = JSON.parse(localStorage.getItem("personas")) || [];

	// Variables para el modal de edición
	const modalEditar = document.getElementById("modalEditar");
	const formEditar = document.getElementById("formEditar");
	const btnCancelar = document.getElementById("btnCancelar");
	let indiceEditar = null;

	function mostrarLista(filtro = "") {
		listaHTML.innerHTML = "";
		personas
			.filter((persona) => {
				const texto =
					`${persona.cedula} ${persona.nombre} ${persona.apellido}`.toLowerCase();
				return texto.includes(filtro.toLowerCase());
			})
			.forEach((persona, index) => {
				const li = document.createElement("li");

				// Crear contenedor de información estructurada
				const infoDiv = document.createElement("div");
				infoDiv.className = "persona-info";
				infoDiv.innerHTML = `
					<div class="info-item">
						<span class="info-label">Cédula</span>
						<span class="info-value">${persona.cedula}</span>
					</div>
					<div class="info-item">
						<span class="info-label">Nombre Completo</span>
						<span class="info-value">${persona.nombre} ${persona.apellido}</span>
					</div>
					<div class="info-item">
						<span class="info-label">Email</span>
						<span class="info-value">${persona.email}</span>
					</div>
					<div class="info-item">
						<span class="info-label">Teléfono</span>
						<span class="info-value">${persona.tel}</span>
					</div>
					<div class="info-item">
						<span class="info-label">Sexo</span>
						<span class="info-value">${persona.sexo}</span>
					</div>
					<div class="info-item">
						<span class="info-label">Tipo</span>
						<span class="info-value">${persona.tipo}</span>
					</div>
				`;

				// Crear contenedor de botones
				const btnContainer = document.createElement("div");
				btnContainer.className = "btn-actions";

				// Botón editar
				const btnEditar = document.createElement("button");
				btnEditar.textContent = "Editar";
				btnEditar.classList.add("editar");
				btnEditar.addEventListener("click", () => abrirModalEditar(index));

				// Botón eliminar
				const btnEliminar = document.createElement("button");
				btnEliminar.textContent = "Eliminar";
				btnEliminar.classList.add("eliminar");
				btnEliminar.addEventListener("click", () => eliminarPersona(index));

				btnContainer.appendChild(btnEditar);
				btnContainer.appendChild(btnEliminar);

				li.appendChild(infoDiv);
				li.appendChild(btnContainer);
				listaHTML.appendChild(li);
			});
	}

	function mostrarbusqueda(filtro = "") {
		listaHTML.innerHTML = "";
		personas
			.filter((persona) => {
				const campo = tipoBusqueda.value;
				const texto = persona[campo]?.toLowerCase() || "";
				return texto.includes(filtro.toLowerCase());
			})
			.forEach((persona, index) => {
				const li = document.createElement("li");

				// Crear contenedor de información estructurada
				const infoDiv = document.createElement("div");
				infoDiv.className = "persona-info";
				infoDiv.innerHTML = `
					<div class="info-item">
						<span class="info-label">Cédula</span>
						<span class="info-value">${persona.cedula}</span>
					</div>
					<div class="info-item">
						<span class="info-label">Nombre Completo</span>
						<span class="info-value">${persona.nombre} ${persona.apellido}</span>
					</div>
					<div class="info-item">
						<span class="info-label">Email</span>
						<span class="info-value">${persona.email}</span>
					</div>
					<div class="info-item">
						<span class="info-label">Teléfono</span>
						<span class="info-value">${persona.tel}</span>
					</div>
					<div class="info-item">
						<span class="info-label">Sexo</span>
						<span class="info-value">${persona.sexo}</span>
					</div>
					<div class="info-item">
						<span class="info-label">Tipo</span>
						<span class="info-value">${persona.tipo}</span>
					</div>
				`;

				// Crear contenedor de botones
				const btnContainer = document.createElement("div");
				btnContainer.className = "btn-actions";

				// Botón editar
				const btnEditar = document.createElement("button");
				btnEditar.textContent = "Editar";
				btnEditar.classList.add("editar");
				btnEditar.addEventListener("click", () => abrirModalEditar(index));

				// Botón eliminar
				const btnEliminar = document.createElement("button");
				btnEliminar.textContent = "Eliminar";
				btnEliminar.classList.add("eliminar");
				btnEliminar.addEventListener("click", () => eliminarPersona(index));

				btnContainer.appendChild(btnEditar);
				btnContainer.appendChild(btnEliminar);

				li.appendChild(infoDiv);
				li.appendChild(btnContainer);
				listaHTML.appendChild(li);
			});
	}

	btnBuscar.addEventListener("click", () => {
		mostrarbusqueda(buscarInput.value);
	});

	function eliminarPersona(index) {
		personas.splice(index, 1);
		localStorage.setItem("personas", JSON.stringify(personas));
		mostrarLista(buscarInput.value);
	}

	// Función para abrir el modal de edición
	function abrirModalEditar(index) {
		indiceEditar = index;
		const persona = personas[index];

		document.getElementById("editCedula").value = persona.cedula;
		document.getElementById("editNombre").value = persona.nombre;
		document.getElementById("editApellido").value = persona.apellido;
		document.getElementById("editEmail").value = persona.email;
		document.getElementById("editTel").value = persona.tel;
		document.getElementById("editSexo").value = persona.sexo;
		document.getElementById("editTipo").value = persona.tipo;

		modalEditar.classList.add("active");
	}

	// Función para cerrar el modal
	function cerrarModal() {
		modalEditar.classList.remove("active");
		indiceEditar = null;
		formEditar.reset();
	}

	// Evento para guardar cambios
	formEditar.addEventListener("submit", (e) => {
		e.preventDefault();

		if (indiceEditar !== null) {
			personas[indiceEditar] = {
				cedula: document.getElementById("editCedula").value,
				nombre: document.getElementById("editNombre").value,
				apellido: document.getElementById("editApellido").value,
				email: document.getElementById("editEmail").value,
				tel: document.getElementById("editTel").value,
				sexo: document.getElementById("editSexo").value,
				sexo: document.getElementById("editTipo").value,
			};

			localStorage.setItem("personas", JSON.stringify(personas));
			mostrarLista(buscarInput.value);
			cerrarModal();
		}
	});

	// Evento para cancelar edición
	btnCancelar.addEventListener("click", cerrarModal);

	// Cerrar modal al hacer clic fuera
	modalEditar.addEventListener("click", (e) => {
		if (e.target === modalEditar) {
			cerrarModal();
		}
	});

	mostrarLista();
});
