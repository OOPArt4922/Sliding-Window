class WindowBuffer{
    constructor(windowSz, pos) {
        this.pos = createVector(pos.x - 5, pos.y - 5);
        this.width = Packet.width + 10;
        this.height = windowSz * (Packet.height + 10);
        this.windowSz = windowSz;
    }

    show() {
        noFill();
		strokeWeight(1);
		stroke(0);
		rect(this.pos.x, this.pos.y, this.width, this.height);
    }

    move() {
        this.pos.add(createVector(0, Packet.height + 10));
    }

    resize(windowSz) {
        this.height = windowSz * (Packet.height + 10);
    }
}