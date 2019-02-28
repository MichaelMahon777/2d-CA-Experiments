// tuning
var width = 1600;
var height = 900;
var zoom = 0;

// globals
var canvas;
var context;
var imageData;

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
	context.fillStyle = "white"; // <<-- customize clear color here
	context.fillRect(0, 0, width, height);
}


const loop = () => {
	redraw();
	draw_grid();
	requestAnimationFrame(loop);
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