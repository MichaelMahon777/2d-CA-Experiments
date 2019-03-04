// tuning
var width = 1600;
var height = 900;
var zoom = 0;
var fps = 5;

var cellSize = 10;
var gridHeight = height / cellSize;
var gridWidth = width / cellSize;
	
// globals
var canvas;
var context;
var imageData;

var termites = Array(50);
var num_stones = 2000;

var grid = Array();

for (let i = 0; i < width; i++) {

	grid[i] = [];

  	for (let j = 0; j < height; j++) {

  		grid[i][j] = 0;

  	}
}

for (i = 0; i < num_stones; i++){

	grid[get_random_x()][get_random_y()] = 1;	// random grids are turned on with value of 1

}

for (i = 0; i < termites.length; i++){

	termites[i] = new Termite(false, get_random_x(), get_random_y());

}

// graphics initialization
const createDrawSurfaces = () => {
	canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	context = canvas.getContext("2d");
	imageData = context.getImageData(0, 0, width, height);

	// add to document
	document.body.appendChild(canvas);
}

const redraw = () => {
	
	context.fillStyle = "white"; // <<-- customize clear/background color here
	context.fillRect(0, 0, width, height);

	for (i = 0; i < termites.length; i++){ // go through all termites

		termites[i].draw("orange");
		
		// add clamp to borders of screen so termites coordinates dont go negative

		termites[i].move(get_random_dir(), get_random_dir());

	}

	draw_stones();

	for (i = 0; i < termites.length; i++){  // go through all termites

		if (grid[termites[i].x][termites[i].y] == 1){	// if tmermite is on a stone...

		console.log("Termite is on a stone");
		
		}

	}

	

	// for (i = 0; i < termites.length; i++){ // go through all termites
	// 	for (j = 0; j < stones.length; j++){ // go through all stones

	// 	if  (termites[i].pickup == true 					// if a termite is carrying a stone
	// 		&& termites[i].x != stones[j].x                 // and is not on top of a stone
	// 		&& termites[i].y != stones[j].y
	// 		&& termites[i].x + cellSize == stones[j].x      // and borders a stone
	// 		|| termites[i].x - cellSize == stones[j].x
	// 		|| termites[i].y + cellSize == stones[j].y
	// 		|| termites[i].y - cellSize == stones[j].y) {

	// 		termites[i].pickup = false;						// termite stops carrying and...

	// 		// stones.splice(j, 0, new GameObject(false, termites[i].x, termites[i].y)); // ...a new stone is created at termite's location

	// 		}
	// 	}	
	
}

const loop = () => {
	redraw();
		
	// allow fps to be modified, using fps global var
	setTimeout(function() {
		requestAnimationFrame(loop);
	}, 1000 / fps);
}

/*
set canvas size to match window
this uses an offscreen canvas with your specified resolution to draw to
it then cleanly resizes and draws this to a second canvas in the browser window
this second canvas is set to the nearest clean multiple of your desired size
*/
const setSize = () => {
	console.log("setting size. base width = " + width + ", base height = " + height);
	console.log("window inner size is " + window.innerWidth + ", " + window.innerHeight);
	// how many times will this fit in horizontally?
	var zoomX = Math.floor(window.innerWidth / width);
	// vertically?
	var zoomY = Math.floor(window.innerHeight / height);
	// the window won't necessarily be a clean match to the shape of the offscreen canvas, so check to see whether width or height will be the limiting factor
	console.log("x / y zoom: " + zoomX + " / " + zoomY);
	// we pick the lower number here. that's how far we can scale up cleanly.
	zoom = Math.min(zoomX, zoomY);
	zoom = Math.max(1, zoom);
	
	// it would be neat to add borders to all canvasses
	canvas.style.borderWidth = zoom + "px";
	
	canvas.style.width = zoom * width + "px";
	canvas.style.height = zoom * height + "px";
	console.log("setting canvas width to " + canvas.style.width);
	console.log("setting canvas height to " + canvas.style.height);
		
	// resizing clears the canvas, so redraw contents
	// imageSmoothingEnabled doesn't work in firefox
	// use webkitImageSmoothingEnabled instead
	context.imageSmoothingEnabled = false; // don't interpolate
	context.mozImageSmoothingEnabled = false;
	context.webkitImageSmoothingEnabled = false;
	context.msImageSmoothingEnabled = false;

	redraw();

	console.log("--------------------------------");
}

const initializeGraphics = () => {
	createDrawSurfaces();
	setSize(); // run once at top, then on resize
	window.onresize = setSize;
}

// entry point
// when everything is loaded, set up and start running
window.onload = () => {
	initializeGraphics();	
	loop(); // calling the update loop once starts it running
}