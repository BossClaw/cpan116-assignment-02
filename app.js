// ASSIGNMENT 02 - DESK CALC

export function main(output_div_a, output_div_b, output_div_c) {
	// DO AUTO TESTS w/REUSE
	calc_output(90.0, 90.0, 2, "mahogany", output_div_a);
	calc_output(50.0, 45.0, 3, "oak", output_div_b);
	calc_output(75.0, 68.0, 1, "pine", output_div_c);
}


export function calc_output(desk_length, desk_width, desk_drawers, type_of_wood, output_div) {
	console.log("CALC IT [", desk_length, desk_width, desk_drawers, type_of_wood, "]");

	// CALC IT!
	const newDesk = new Desk(desk_length, desk_width, desk_drawers, type_of_wood);
    newDesk.calculateCost();

	// MAKE THE OUTPUT TEXT USING THE GETTERS
	let retText = "Your order of computer desk\n\n"


    // SURFACE
	retText += `It's surface is ${newDesk.getLength().toFixed(3)} x ${newDesk.getWidth().toFixed(3)} inches which is ${newDesk.getSurfaceArea().toFixed(3)} in2 \n`;

	if (newDesk.getSurfaceArea() > 750) {
		retText += `Because it's over 750 in2 it has an extra $50 charge\n`;
	}

    // DRAWERs
	retText += `\nIt has ${newDesk.getDrawers()} drawers.\n`;


    // WOOD TYPE
	retText += `\nIt's made of ${newDesk.getWoodType()}.\n`;

	if (newDesk.getWoodTypeCharge() > 0) {
		retText += `Which is an extra charge of $${newDesk.getWoodTypeCharge()}.\n`;
		retText += `(maybe consider pine next time?)\n`;
	}

    // RESULT
    retText += "\nFinal cost $" + newDesk.getTotalCost().toFixed(2) + "\n";

	// SET TEXT ON OUTPUT DIV & LOG
	output_div.innerText = retText;

	// LOG IT
	console.log(retText);
}

class Desk {
	#length;
	#width;
	#drawers;
	#woodType;
	#basePrice = 200.0;
	#drawerCost = 30.0;
	#woodCost = { mahogany: 150.0, oak: 125.0, pine: 0.0 };

	#woodTypeCharge = 0.0;
	#surfaceArea = 0.0;

	#totalCost = 0.0;

	constructor(length, width, drawers, woodType) {
		this.#length = length * 0.3937008;
		this.#width = width * 0.3937008;
		this.#drawers = drawers;
		this.#woodType = woodType.toLowerCase();
        this.#woodTypeCharge = 0;
        this.#surfaceArea = 0;
	}

	calculateCost() {
		// RESET CUR COST
		this.#totalCost = this.#basePrice;

		// CALC AREA AND ADD OVERAGE
        this.#surfaceArea = this.#length * this.#width;
        console.log("SA[" + this.#surfaceArea+ "]");

		if (this.#surfaceArea > 750) {
            console.log("SA EXTRA COST!");
			this.#totalCost += 50;
		}

		// ADD DRAWER COST
		this.#totalCost += this.#drawers * this.#drawerCost;

		// ADD WOOD TYPE COST
        this.#woodTypeCharge = this.#woodCost[this.#woodType] || 0;

        console.log("WC[" + this.#woodTypeCharge + "]");
        console.log("SA[" + this.#surfaceArea + "]");

		this.#totalCost += this.#woodTypeCharge;
	}

	getLength() {
		return this.#length;
	}
	getWidth() {
		return this.#width;
	}
	getDrawers() {
		return this.#drawers;
	}
	getWoodType() {
		return this.#woodType;
	}
	
	// MADE SETTERS, BUT DIDN'T USE THEM
	setLength(new_val) {
		this.#length = new_val;
	}
	setWidth(new_val) {
		this.#width = new_val;
	}
	setDrawers(new_val) {
		this.#drawers = new_val;
	}
	setWoodType(new_val) {
		this.#woodType = new_val;
	}


	getTotalCost() {
		this.calculateCost();
		return this.#totalCost;
	}

	getWoodTypeCharge() {
		return this.#woodTypeCharge;
	}
	getSurfaceArea() {
		return this.#surfaceArea;
	}
}
