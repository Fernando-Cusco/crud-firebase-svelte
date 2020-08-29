<script>
	import {db} from './firebase';
	import toastr from 'toastr';
	let tarea = {
		nombre: '',
		descripcion: ''
	}

	let tareas = [];
	let estado = false;
	let id = "";

	//listar las tareas desde la base de datos, con actualizacion en tiempo real
	db.collection('tareas').onSnapshot(querySnapshot => {
		let docs = [];
		querySnapshot.forEach(res => {
			docs.push({...res.data(), id: res.id});
		});
		tareas = [...docs];
		console.log(tareas);
	});

	const nuevaTarea = async () => {
		if(!estado) {
			await db.collection('tareas').doc().set({
			...tarea, createdAt: Date.now()
			});
			console.log('Tarea creada en firebase');
			tarea.nombre = '';
			tarea.descripcion = '';
		} else {
			await db.collection('tareas').doc(id).update(tarea);
			tarea.nombre = '';
			tarea.descripcion = '';
			estado =  false;
			toastr.success('Tarea actualizada', {
				timeOut: 1000,
				progressBar: true,
				positionClass: 'toast-bottom-right'
			});

		}
		
	};

	const eliminar = async (id) => {
		await db.collection('tareas').doc(id).delete();
	}

	const editar = (t) => {
		estado = true;
		tarea.nombre = t.nombre;
		tarea.descripcion = t.descripcion
		id = t.id;
		
	};

	const cancelar = () => {
		estado = false;
		tarea.nombre = '';
		tarea.descripcion = '';
	};


</script>

<main>
	<div class="container">
		<div class="row">
			<div class="col-md-4 offset-md-4">
				<form on:submit|preventDefault={nuevaTarea} class="card card-body">
					
						<input type="text" placeholder="Nueva tarea" bind:value={tarea.nombre} class="from-control">
					
						<textarea rows="3" placeholder="Descripcion de tu tarea" bind:value={tarea.descripcion} class="from-control"></textarea>
					
					<button class="btn btn-primary">
						{#if estado}
							Editar
						{:else}
							Guardar
						{/if}
					</button>
					{#if estado}
						<button on:click={cancelar} class="btn btn-danger">Cancelar</button>
					{/if}
				</form>
			
				{#each tareas as t}
					<div class="card card-body mt-2">
						<div class="d-flex justify-content-between">
							<h5>{t.nombre}</h5>
							<button class="btn btn-info" on:click={editar(t)}>Editar</button>
						</div>
						<p>{t.descripcion}</p>
						<button class="btn btn-danger" on:click={eliminar(t.id)}>
							<i class="material-icons">delete_forever</i>
						</button>
						
					</div>
				{/each}
			</div>
		</div>
	</div>

</main>

<style>
	
</style>