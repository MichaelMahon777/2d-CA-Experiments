// tuning
var width = 1600;
var height = 900;
var zoom = 0;
var fps = 60;

var cellSize = 10;
var gridHeight = height / cellSize;
var gridWidth = width / cellSize;
	
// globals
var canvas;
var context;
var imageData;

var termites = Array(50);
var num_stones = 1000;

var grid = [];

for (var i = 0; i < gridWidth; i++) {	
	
		grid[i] = [];							//initialize grid with 0's

  	for (var j = 0; j < gridHeight; j++) {

  		grid[i][j] = 0;

  	}
}

// create stone grid
for (var i = 0; i < num_stones; i++){

	var grid_x = get_random_x();
	var grid_y = get_random_y();
	grid[grid_x][grid_y] = 1;					// random grid locations are 'turned on' with value of 1

}

// create termite objects
for (var i = 0; i < termites.length; i++){

	termites[i] = new Termite(false, get_random_x(), get_random_y());

}

function draw_stones(){

	for (var i = 0; i < gridWidth; i++) {

		for (var j = 0; j < gridHeight; j++) {

  			if (grid[i][j] == 1){

  				context.fillStyle = "black"; // <<-- customize clear/background color here
				context.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);

  			} else if (grid[i][j] == 0){

  				context.fillStyle = "white"; // <<-- customize clear/background color here
				context.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);

  			}
		}
	}
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

	draw_stones();

	// Termite draw and move
	for (var i = 0; i < termites.length; i++){ 						// go through all termites

		termites[i].draw("orange"); 								// draw the termites
		
		termites[i].move(get_random_dir(), get_random_dir()); 		// move the termites based on random direction

	}

	// Termite pick up and drop stones
	for (var i = 0; i < termites.length; i++){			// boundary check to calculate termite location

		if (termites[i].x > 0){

			term_x = termites[i].x / cellSize;

		} else {

			term_x = 0;
		}

		if (termites[i].y > 0){

			term_y = termites[i].y / cellSize;

		} else {

			term_y = 0;
		}

		if (grid[term_x][term_y] == 1 && termites[i].pickup == false){			// if on a stone, not carrying...start carrying, remove stone					

			termites[i].pickup = true;													
			grid[term_x][term_y] = 0;	

		} else if (grid[term_x][term_y] == 1 && termites[i].pickup == true){	// if on a stone, is carrying...continue carrying, leave stone

			termites[i].pickup = true;													
			grid[term_x][term_y] = 1;	

		} else if (grid[term_x][term_y] == 0 && termites[i].pickup == false){	// if on white space, not carrying...continue not carrying, leave as white

			termites[i].pickup = false;													
			grid[term_x][term_y] = 0;	


		// if on white space, and carrying...determine if there are neighbors (up, down, left, right only)...if so: drop stone
		} else if (termites[i].x != 0 && termites[i].x != (width - cellSize) && termites[i].y != 0 && termites[i].y !=0 && termites[i].y !=(height - cellSize)){  // boundary check	

			if   (grid[term_x - 1][term_y] == 1		// check for neighbor stones
			   || grid[term_x + 1][term_y] == 1
			   || grid[term_x][term_y + 1] == 1
			   || grid[term_x][term_y - 1] == 1){

				termites[i].pickup = false;													
				grid[term_x][term_y] = 1;
			
			} else {

				termites[i].pickup = true;													
				grid[term_x][term_y] = 0;

			}
		}		
	}
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
this uses an off-screen canvas with your specified resolution to draw to
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