Hooks.once("init", function() {
    console.log("Initializing Liminal module")

    game.settings.register("liminal-csb-es", "firstTimeStart", {
       name: "Forzar mensaje de Bienvenida",
        hint: "Si marcas esta casilla te aparecerá el mensaje de bienvenida en el chat la próxima vez que entres.",
        scope: "client",
        config: true,
        default: false,
        type: Boolean
    })
})

Hooks.once("ready", function() {
	let buttonId=Date.now();
	let buttonId2=Date.now()+2;
	let mensbienv='<h1>Bienvenido al módulo de Liminal</h1>';
	let mensimpfirst='<p style= "font-family:Goudy_old_bold;font-size: 15px;">Importa los compendios para empezar a usar el módulo</p><button id='+buttonId2+' style= "font-family:Mason_Serif_Bold;font-size: 20px;">Importa los Compendios</button>';
	let mensimpact='<p style= "font-family:Goudy_old_bold;font-size: 15px;">Se ha actualizado el módulo desde la última vez que lo usaste. Importa los compendios para tener la última versión de las Templates de actores y objetos.</p><button id='+buttonId2+' style= "font-family:Mason_Serif_Bold;font-size: 20px;">Importa los Compendios</button>'
	let mensrecordtut='<p style= "font-family:Goudy_old_bold;font-size: 15px;">Recuerda: Puedes añadir un bonificador o penalizador a la tirada y marcar si tienes una especialidad si pulsas la tecla Mayus al hacer click en la Habilidad.</p><button id='+buttonId+' style= "font-family:Mason_Serif_Bold;font-size: 20px;">Ve al Tutorial</button>';
	
	let forzarbienvenida=game.settings.get("liminal-csb-es", "firstTimeStart");
	let forzarmensaje;
	console.log(forzarmensaje);
	if (forzarbienvenida==true) {
		forzarmensaje=true;
	}
	let versactual=game.modules.get("liminal-csb-es").version;
	let userisGM=game.user.isGM;
	if (userisGM) {
		if(!game.user.getFlag("liminal-csb-es", "welcomeMessage") || forzarmensaje==true) {
			let msg=mensbienv+mensimpfirst+mensrecordtut;
			ChatMessage.create({
        		speaker: {alias:"Liminal"},
        		content: msg,
				whisper : ChatMessage.getWhisperRecipients(game.user.name)
			}).then(() => {
				setTimeout(() => {
				function openInNewTab(url) {
					const win = window.open(url, '_blank');
					win.focus();
				}
				const button = document.getElementById(buttonId);
				if (button) {
					button.addEventListener("click",function () {
						openInNewTab('https://github.com/pedrobaringo/liminal-csb-es')
					});
				}
				const button2 = document.getElementById(buttonId2);
				if (button2) {
					button2.addEventListener("click",function () {
						let collection = game.packs.get("liminal-csb-es.templatesobjetos");
						console.log(collection);
						console.log(button2);
						let folderident=''
						if (game.folders.getName("Templates_Objetos")) {
							folderident=game.folders.getName("Templates_Objetos").id;
						}
						let docs = collection.importAll({folderId: folderident, folderName: "Templates_Objetos", keepId: true});
						setTimeout(() => {
							let collection2 = game.packs.get("liminal-csb-es.templatesactores");
							let folderident2=''
							if (game.folders.getName("Templates_Actores")) {
								folderident2=game.folders.getName("Templates_Actores").id;
							}
							let docs2 =  collection2.importAll({folderId: folderident2, folderName: "Templates_Actores", keepId: true});
						}, 500);
						game.user.setFlag("liminal-csb-es", "welcomeMessage", true);
						game.user.setFlag("liminal-csb-es", "lastVersion", game.modules.get("liminal-csb-es").version);
					});
				}
				}, 100);
			});
			game.settings.set("liminal-csb-es", "firstTimeStart", false);
		} else if (versactual!=game.user.getFlag("liminal-csb-es", "lastVersion")) {
			let msg=mensbienv+mensimpact+mensrecordtut;
			ChatMessage.create({
					speaker: {alias:"Liminal"},
					content: msg,
			   whisper : ChatMessage.getWhisperRecipients(game.user.name)
			}).then(() => {
				setTimeout(() => {
				function openInNewTab(url) {
					const win = window.open(url, '_blank');
					win.focus();
				}
				const button = document.getElementById(buttonId);
				if (button) {
					button.addEventListener("click",function () {
						openInNewTab('https://github.com/pedrobaringo/liminal-csb-es')
					});
				}
				const button2 = document.getElementById(buttonId2);
				if (button2) {
					button2.addEventListener("click",function () {
						let collection = game.packs.get("liminal-csb-es.templatesobjetos");
						console.log(collection);
						console.log(button2);
						let folderident=''
						if (game.folders.getName("Templates_Objetos")) {
							folderident=game.folders.getName("Templates_Objetos").id;
						}
						let docs = collection.importAll({folderId: folderident, folderName: "Templates_Objetos", keepId: true});
						setTimeout(() => {
							let collection2 = game.packs.get("liminal-csb-es.templatesactores");
							let folderident2=''
							if (game.folders.getName("Templates_Actores")) {
								folderident2=game.folders.getName("Templates_Actores").id;
							}
							let docs2 =  collection2.importAll({folderId: folderident2, folderName: "Templates_Actores", keepId: true});
						}, 500);
						game.user.setFlag("liminal-csb-es", "welcomeMessage", true);
						game.user.setFlag("liminal-csb-es", "lastVersion", game.modules.get("liminal-csb-es").version);
					});
				}
				}, 500);
			});
		}
	} else if (!game.user.getFlag("liminal-csb-es", "welcomeMessage") || forzarmensaje==true) {
		let msg = mensbienv+mensrecordtut;
		ChatMessage.create({
        		speaker: {alias:"Liminal"},
        		content: msg,
				whisper : ChatMessage.getWhisperRecipients(game.user.name)
		}).then(() => {
			setTimeout(() => {
			function openInNewTab(url) {
				const win = window.open(url, '_blank');
				win.focus();
			}
			const button = document.getElementById(buttonId);
			if (button) {
				button.addEventListener("click",function () {
					openInNewTab('https://github.com/pedrobaringo/liminal-csb-es');
				});
			}
			}, 100);
		});
		game.user.setFlag("liminal-csb-es", "welcomeMessage", true);
		game.settings.set("liminal-csb-es", "firstTimeStart", false);
	}
})