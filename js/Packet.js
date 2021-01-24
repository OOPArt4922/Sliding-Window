class Packet {
	static width = 100;
	static height = 20;
	static spacing = 10;
	static states = {
		NONE: 0,
		READY: 1,
		GO: 2,
		TX: 3,
		LIMBO: 4,
		ARRIVED: 5,
		CONFIRMED: 6,
	};

	constructor(pos, label) {
		this.pos = pos;
		this.label = label;
		this.empty = empty;
		this.speed = createVector(5, 0);
		this.state = Packet.states.NONE;
	}

	show() {
		fill("red");
		strokeWeight(1);
		stroke(0);
		rect(this.pos.x, this.pos.y, Packet.width, Packet.height);

		fill(0);
		noStroke();
		textSize(15);
		textStyle(BOLD);
		textFont("Roboto Mono");
		text(this.label, this.pos.x + 5, this.pos.y + 15);
	}

	move() {
		this.pos.add(this.speed);
	}

	speedUp() {
		this.pos.mul(2);
	}

	intercept() {
		this.state = Packet.states.LIMBO;
	}

	clicked(pos) {
		return pos.x >= this.pos.x && pos.x <= this.pos.x + Packet.width && pos.y >= this.pos.y && pos.y <= this.pos.y + Packet.height;
	}
}
