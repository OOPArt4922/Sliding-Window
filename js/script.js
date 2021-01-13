let h;

function setup() {
	createCanvas(windowWidth, windowHeight);

	h = new Host(createVector(200, 50), "T", 10, 5, 3, true);
}

function draw() {
	background(255);

    h.show();
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
