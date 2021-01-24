let start,
	end,
	isSimulating = false,
	btns = document.querySelectorAll("input[type='button']"),
	iptNum = document.querySelectorAll("input[type='number']"),
	rtt,
	rto,
	speed = 1;

window.addEventListener("mouseup", e => {
	switch (e.path[0]) {
		case btns[0]:
			switch (btns[0].value) {
				case "Start":
					if (checkInput()) {
						start = new Host(createVector(200, 50), "T", +iptNum[0].value, +iptNum[1].value);
						end = new Host(createVector(windowWidth - 200, 50), "R", +iptNum[0].value, +iptNum[2].value, (isStart = false));

						rtt = +iptNum[3].value;
						rto = rtt + 5;

						isSimulating = true;

						btns[0].value = "Stop";
						btns[1].disabled = false;

						iptNum[0].parentElement.classList.add("invisible");
					}
					break;

				case "Stop":
					isSimulating = false;

					btns[0].value = "Start";
					btns[1].disabled = true;

					iptNum[0].parentElement.classList.remove("invisible");
					break;

				default:
					break;
			}
			break;
		case btns[1]:
			break;
		case document.querySelector("canvas"):
			if (isSimulating) {
				let p = start.clickedPacket(createVector(e.x, e.y));
				switch (e.button) {
					case 0:
						if (p?.state === Packet.states.TX) p?.speedUp();
						break;

					case 2:
						if (p?.state === Packet.states.TX) p?.intercept();
						break;

					default:
						break;
				}
			}
			break;
		default:
			break;
	}
});

function setup() {
	document.querySelectorAll("input[type='number']:not([name='RTT-start'])").forEach(i => (i.max = Host.MAX_PACKETS()));
	createCanvas(windowWidth, windowHeight);
}

function draw() {
	background(255);

	if (isSimulating) {
		start.show();
		end.show();
	}
}

function windowResized() {
	document.querySelectorAll("input[type='number']:not([name='RTT-start'])").forEach(i => (i.max = Host.MAX_PACKETS()));
	resizeCanvas(windowWidth, windowHeight);
}

function checkInput() {
	if (!(+iptNum[0].value >= 1 && +iptNum[0].value <= Host.MAX_PACKETS())) {
		alert("Invalid Number of Packets!");
		return false;
	}
	if (!(+iptNum[1].value >= 1 && +iptNum[1].value <= Host.MAX_PACKETS() && +iptNum[1].value <= +iptNum[0].value)) {
		alert("Invalid Start Window Size!");
		return false;
	}
	if (!(+iptNum[2].value >= 1 && +iptNum[2].value <= Host.MAX_PACKETS() && +iptNum[2].value <= +iptNum[0].value)) {
		alert("Invalid End Window Size!");
		return false;
	}
	if (!(+iptNum[3].value >= 1 && +iptNum[3].value <= 1000)) {
		alert("Invalid Starting RTT!");
		return false;
	}
	return true;
}
