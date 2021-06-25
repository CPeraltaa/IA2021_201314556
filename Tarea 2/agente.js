//Autor inicial Luis Espino
//Adaptacion del codigo Python a Javascript Cperaltaa - 201314556

const estados=[0,0,0,0,0,0,0,0]//8 posibles estados	

//donde ocurre la magia
function reflex_agent(location, state){
	if (state=="DIRTY") return "CLEAN";
	else if (location=="A") return "RIGHT";
	else if (location=="B") return "LEFT";
}

//asignando valores a cada uno de los estados, segun corresponda
function registrar_estado(pos,E1, E2){
	console.log(estados.toString())
	if (E1 == 'DIRTY' && E2 == 'DIRTY' && pos == 'A'){
		console.log('en estado 0')
		estados[0] = 1;
		return	
	} else if (E1 == 'DIRTY' && E2 == 'CLEAN' && pos == 'A'){
		console.log('en estado 1')
		estados[1] = 1
		return
	} else if (E1 == 'CLEAN' && E2 == 'DIRTY' && pos == 'A'){
		console.log('en estado 2')
		estados[2] = 1
		return
	} else if (E1 == 'CLEAN' && E2 == 'CLEAN' && pos == 'A'){
		console.log('en estado 3')
		estados[3] = 1
		return
	} else if (E1 == 'DIRTY' && E2 == 'DIRTY' && pos == 'B'){
		console.log('en estado 4')
		estados[4] = 1
		return
	} else if (E1 == 'DIRTY' && E2 == 'CLEAN' && pos == 'B'){
		console.log('en estado 5')
		estados[5] = 1
		return
	} else if (E1 == 'CLEAN' && E2 == 'DIRTY' && pos == 'B'){
		console.log('en estado 6')
		estados[6] = 1
		return
	} else if (E1 == 'CLEAN' && E2 == 'CLEAN' && pos == 'B'){
		console.log('en estado 7')
		estados[7] = 1
		return
	}
}

//permite convertir a dirty de forma aleatoria
function ensuciar_rand(states){
	var opciones = ['CLEAN', 'DIRTY']

    if (states[1] == 'CLEAN'){		
        states[1] = opciones[Math.floor(Math.random() * opciones.length)] 
	}
    if (states[2] == 'CLEAN'){
        states[2] = opciones[Math.floor(Math.random() * opciones.length)]  
	}
}

//validador 
function verif_estados(){
	var banderaCero;
	for (let i = 0; i < estados.length; i++) {
		if(estados[i] == 0){
			banderaCero = 1
		}
	}

	if (banderaCero == 1)
		return false
	else
		return true
}

function test(states){
	var location = states[0]
	var state = states[0] == "A" ? states[1] : states[2];
	var action = reflex_agent(location, state)

	registrar_estado(states[0],states[1],states[2])	
	document.getElementById("historico").innerHTML+="<br>Location: ".concat(location).concat(" | Action: ").concat(action);


	if (action == "CLEAN"){
		if (location == 'A') states[1] = "CLEAN"
		else if (location == 'B') states[2] = "CLEAN"
	}
	else if (action == "RIGHT") states[0]='B'
	else if (action == "LEFT") states[0]='A'

	ensuciar_rand(states)
	if (verif_estados()){
		return
	}
	//tiempo para ejecutar script (lento 3000, rapido 10)
	setTimeout(function(){ test(states); }, 10);
}

states = ["A","DIRTY","DIRTY"];
test(states);