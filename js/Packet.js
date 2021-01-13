class Packet {
	static width = 100;
	static height = 20;
	static spacing = 10;
	static states = {
		READY: 0,
		MOVING: 1,
		CONFIRMED: 2,
		EMPTY: 3,
	};

	constructor(pos, label, empty) {
		this.pos = pos;
		this.label = label;
		this.empty = empty;
		this.speed = createVector(5, 0);
		this.state = empty ? Packet.states.EMPTY : Packet.states.READY;
	}

	show() {
		fill(this.empty ? 100 : "red");
		strokeWeight(1);
		stroke(0);
		rect(this.pos.x, this.pos.y, Packet.width, Packet.height);

		if (!this.empty) {
			fill(0);
			noStroke();
			textSize(15);
			textStyle(BOLD);
			textFont("Roboto Mono");
			text(this.label, this.pos.x + 5, this.pos.y + 15);
		}
	}

	move() {
		this.pos.add(this.speed);
	}
}
