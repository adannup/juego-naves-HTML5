var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

//Ojeto nave
var nave = {
	x: 100,
	y: canvas.height - 100,
	width: 50,
	height: 50
};

//Variables para las imagenes
var fondo;

//Definicion de funciones
function loadMedia(){
	fondo = new Image();
	fondo.src = 'https://68.media.tumblr.com/6d1529ed59f2d784dac516fa8e1adffb/tumblr_opol9givvR1qbg3s6o1_540.png';
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

function frameLoop(){
	drawBackground();
	drawSpaceShip();
}

//Ejecucion de funciones
loadMedia();