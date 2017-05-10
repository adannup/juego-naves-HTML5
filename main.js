var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

//Ojeto nave
var nave = {
	x: 100,
	y: canvas.height - 100,
	width: 50,
	height: 50
};

var teclado = {};
var juego = {
	estado: 'iniciando'
};
var disparos = [];
var enemigos = [];

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

function drawEnemies(){
	for(var i in enemigos){
		var enemigo = enemigos[i];
		ctx.save();
		if(enemigo.estado ==='vivo') ctx.fillStyle = 'red';
		if(enemigo.estado === 'muerto') ctx.fillStyle = 'black';
		ctx.fillRect(enemigo.x, enemigo.y, enemigo.width, enemigo.height);
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
		teclado[e.keyCode] = true;
	});

	agregarEvento(document, "keyup", function(e){
		//Ponemos en true la tecla dejo de ser presionada
		teclado[e.keyCode] = false;
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

function moverNave(){
	if(teclado[37]){
		//Movimiento a la izquierda
		nave.x -= 6;
		if(nave.x < 0) nave.x = 0;
	}

	if(teclado[39]){
		//Movimiento a la izquierda
		var limite = canvas.width - nave.width;
		nave.x += 6;
		if(nave.x > limite) nave.x = limite;
	}

	if(teclado[32]){
		//Disparos
		if(!teclado.fire){
			fire();
			teclado.fire =  true;
		}	
	}else{
		teclado.fire =  false;
	}
}

function updateEnemies(){
	if(juego.estado === 'iniciando'){
		for(var i=0; i<9; i++){
			enemigos.push({
				x: 10 + (i*50),
				y: 10,
				height: 40,
				width: 40,
				estado: 'vivo',
				contador: 0
			});
		}
		juego.estado = 'jugando';
	}

	for(var i in enemigos){
		var enemigo = enemigos[i];
		if(!enemigo) continue;
		if(enemigo && enemigo.estado === 'vivo'){
			enemigo.contador++;
			enemigo.x += Math.sin(enemigo.contador * Math.PI/90)*6;
		}
	}
}

function moverDisparos(){
	for(var i in disparos){
		var disparo = disparos[i];
		disparo.y -= 2;
	}
	disparos = disparos.filter(function(){
		return disparo.y > 0;
	});
}

function fire(){
	disparos.push({
		x: nave.x + 20,
		y: nave.y - 10,
		width: 10,
		height: 30
	})
}

function drawShots(){
	ctx.save();
	ctx.fillStyle = 'white';
	for( var i in disparos){
		var disparo = disparos[i];
		ctx.fillRect(disparo.x, disparo.y, disparo.width, disparo.height);
	}
	ctx.restore();
}

function hit(a,b){
	var hit = false;
	if(b.x + b.width >= a.x && b.x < a.x + a.width){
		if(b.y + b.height >= a.y && b.y < a.y + a.height){
			hit = true;
		}
	}
	if(b.x <= a.x && b.x +b.width >= a.x + a.width){
		if(b.y <= a.y && b.y + b.height >= a.y + a.height){
			hit = true;
		}
	}
	if(a.x <= b.x && a.x +a.width >= b.x + b.width){
		if(a.y <= b.y && a.y + a.height >= b.y + b.height){
			hit = true;
		}
	}
	return hit;
}

function frameLoop(){
	moverNave();
	updateEnemies();
	moverDisparos();
	drawBackground();
	drawEnemies();
	drawSpaceShip();
	drawShots();
}

//Ejecucion de funciones
loadMedia();
agregarEventosTeclado();