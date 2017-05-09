var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

//Ojeto nave
var nave = {
	x: 100,
	y: canvas.height - 100,
	width: 50,
	height: 50
};

var teclado {};
//Variables para las imagenes
var fondo;

//Definicion de funciones
function loadMedia(){
	fondo = new Image();
	fondo.src = 'background.png';
	fondo.onload = function(){
		var intervalo = window.setInterval(frameLoop, 1000/55);
	}
}

function drawBackground(){
	ctx.drawImage(fondo,0,0);
}

function drawSpaceShip(){
	ctx.save();
	ctx.fillStyle = 'white';
	ctx.fillRect(nave.x, nave.y, nave.width, nave.height);
	ctx.restore();
}

function agregarEventosTeclado(){
	agregarEvento(document, "keydown", function(e){
		//Ponemos en true la tecla presionada
		teclado[e.keycode] = true;
	});

	agregarEvento(document, "keyup", function(e){
		//Ponemos en true la tecla presionada
		teclado[e.keycode] = false;
	});

	function agregarEvento(elemento, nombreEvento, funcion){
		if(elemento.addEventListener){
			//Navegadores actuales
			elemento.addEventListener(nombreEvento, funcion, false);
		}else if(elemento.attachEvent){
			//IE
			elemento.attachEvent(nombreEvento, funcion);
		}
	}
}

function frameLoop(){
	drawBackground();
	drawSpaceShip();
}

//Ejecucion de funciones
loadMedia();
agregarEventosTeclado();