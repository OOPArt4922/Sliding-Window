class Host {
	constructor(pos, label, pktNum, windowSz, isStart = true) {
		this.pos = pos.copy();
		this.pos.add(createVector(0, 20));
		this.label = `${label}x`;
		this.pkts = [...Array(pktNum).keys()].map(
			i =>
				new Packet(
					createVector(this.pos.x + (isStart ? -120 : 20), this.pos.y + i * (Packet.height + Packet.spacing)),
					`${label}${i}`,
					isStart ? false : true
				)
		);
		this.window = new WindowBuffer(windowSz, this.pkts[0].pos);
		this.idx = 0;
		this.isStart = isStart;
		if (isStart) this.endPoint = new Host(createVector(windowWidth - pos.x, pos.y), "R", pktNum, windowSz, false);
	}

	show() {
		fill(0);
		noStroke();
		textSize(20);
		textStyle(BOLD);
		textFont("Roboto Mono");
		text(this.label, this.pos.x - 10, this.pos.y - 20);

		strokeWeight(5);
		stroke(0);
		line(
			this.pos.x,
			this.pos.y - Packet.spacing,
			this.pos.x,
			this.pos.y + this.pkts.length * (Packet.height + Packet.spacing) - Packet.spacing
		);

		this.pkts.forEach(i => i.show());

		this.window.show();

		if (this.isStart) this.endPoint.show();
	}

	moveWindow() {
		if (this.idx < this.pkts.length - 1) {
			this.idx++;

			this.window.resize(this.pkts.length - this.idx >= this.window.windowSz ? this.window.windowSz : this.pkts.length - this.idx);
			this.window.move();
		}
	}

	static MAX_PACKETS() {
		return ~~((windowHeight - 40) / (Packet.height + Packet.spacing) - 1);
	}
}
