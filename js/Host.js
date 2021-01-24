class Host {
	constructor(pos, label, pktNum, windowSz, isStart = true) {
		this.pos = p5.Vector.add(pos, createVector(0, 20));

		this.label = `${label}x`;

		this.pktNum = pktNum;

		if (isStart)
			this.pkts = [...Array(pktNum).keys()].map(
				i =>
					new Packet(
						createVector(this.pos.x - 120, this.pos.y + i * (Packet.height + Packet.spacing)),
						`${label}${i}`,
						isStart ? false : true
					)
			);
		else this.pkts = new Array(pktNum);

		this.idx = 0;

		this.window = new WindowBuffer(windowSz, createVector(this.pos.x + (isStart ? -120 : 20), this.pos.y));

		this.isStart = isStart;
	}

	show() {
		//#region Draw Label
		fill(0);
		noStroke();
		textSize(20);
		textStyle(BOLD);
		textFont("Roboto Mono");
		text(this.label, this.pos.x - 10, this.pos.y - 20);
		//#endregion Draw Label
		//#region Draw Line
		strokeWeight(5);
		stroke(0);
		line(
			this.pos.x,
			this.pos.y - Packet.spacing,
			this.pos.x,
			this.pos.y + this.pktNum * (Packet.height + Packet.spacing) - Packet.spacing
		);
		//#endregion Draw Line
		//#region Draw Empty Packets
		for (let i = 0; i < this.pktNum; i++) {
			fill(100);
			strokeWeight(1);
			stroke(0);
			rect(this.pos.x + (this.isStart ? -120 : 20), this.pos.y + i * (Packet.height + Packet.spacing), Packet.width, Packet.height);
		}
		//#endregion Draw Empty Packets

		this.pkts.forEach(i => i.show());

		this.window.show();
	}

	moveWindow() {
		if (this.idx < this.pktNum - 1) {
			this.idx++;

			this.window.resize(this.pktNum - this.idx >= this.window.windowSz ? this.window.windowSz : this.pktNum - this.idx);
			this.window.move();
		}
	}

	clickedPacket(pos) {
		return this.pkts.filter(i => i.clicked(pos))[0];
	}

	static MAX_PACKETS = () => ~~((windowHeight - 40) / (Packet.height + Packet.spacing) - 1);
}
