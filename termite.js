class Termite {

	constructor(pickup, x, y) {

		this.pickup = pickup;
		this.x = x * cellSize;
		this.y = y * cellSize;
	}

	draw(color) {

		context.fillStyle = color;
		context.fillRect(this.x, this.y, cellSize, cellSize);
	}

	move(dx, dy) {

		if (this.x + dx >= 0			// clamp movement to within the boundaries of width and height
			&& this.x + dx < width
			&& this.y + dy >= 0
			&& this.y + dy < height) {
		
			this.x += dx;
			this.y += dy;
		}
	}
}