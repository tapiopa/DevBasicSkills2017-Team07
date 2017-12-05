function convertDecimal() {	
	let decput = document.getElementById("decimal");
	let binput = document.getElementById("binary");
	let octput = document.getElementById("octal");
	let hexput = document.getElementById("hexadecimal");
	
	if (isNaN(decput.value)) {
		alert("False");
	}
	
	let dec = Number(decput.value);
	
	binput.value = dec.toString(2)
	octput.value = dec.toString(8);
	hexput.value = dec.toString(16);
	decput.style.backgroundColor = "white";
	binput.style.backgroundColor = "yellow";
	octput.style.backgroundColor = "yellow";
	hexput.style.backgroundColor = "yellow";
	decput.style.fontWeight = "normal";
	binput.style.fontWeight = "bold";
	octput.style.fontWeight = "bold";
	hexput.style.fontWeight = "bold";
}

function convertBinary() {
	
	let decput = document.getElementById("decimal");
	let binput = document.getElementById("binary");
	let octput = document.getElementById("octal");
	let hexput = document.getElementById("hexadecimal");
	
	if (isNaN(binput.value)) {
		alert("False");
	}
	let bin = Number(binput.value);
	let dec = parseInt(bin, 2);
	decput.value = dec;
	//binput.value = dec.toString(2)
	octput.value = dec.toString(8);
	hexput.value = dec.toString(16);
	decput.style.backgroundColor = "yellow";
	binput.style.backgroundColor = "white";
	octput.style.backgroundColor = "yellow";
	hexput.style.backgroundColor = "yellow";
	decput.style.fontWeight = "bold";
	binput.style.fontWeight = "normal";
	octput.style.fontWeight = "bold";
	hexput.style.fontWeight = "bold";
}

function convertOctal() {
	
	let decput = document.getElementById("decimal");
	let binput = document.getElementById("binary");
	let octput = document.getElementById("octal");
	let hexput = document.getElementById("hexadecimal");
	
	if (isNaN(octput.value)) {
		alert("False");
	}
	let oct = Number(octput.value);
	let dec = parseInt(oct, 8);
	decput.value = dec;
	binput.value = dec.toString(2)
	//octput.value = dec.toString(8);
	hexput.value = dec.toString(16);
	decput.style.backgroundColor = "yellow";
	binput.style.backgroundColor = "yellow";
	octput.style.backgroundColor = "white";
	hexput.style.backgroundColor = "yellow";
	decput.style.fontWeight = "bold";
	binput.style.fontWeight = "bold";
	octput.style.fontWeight = "normal";
	hexput.style.fontWeight = "bold";
}

function convertHexadecimal() {
	
	let decput = document.getElementById("decimal");
	let binput = document.getElementById("binary");
	let octput = document.getElementById("octal");
	let hexput = document.getElementById("hexadecimal");
	
	/*if (isNaN(decput.value)) {
		alert("False");
	}*/
	let hex = hexput.value;
	let dec = parseInt(hex, 16);
	decput.value = dec;
	binput.value = dec.toString(2)
	octput.value = dec.toString(8);
	//hexput.value = dec.toString(16);
	decput.style.backgroundColor = "yellow";
	binput.style.backgroundColor = "yellow";
	octput.style.backgroundColor = "yellow";
	hexput.style.backgroundColor = "white";
	decput.style.fontWeight = "bold";
	binput.style.fontWeight = "bold";
	octput.style.fontWeight = "bold";
	hexput.style.fontWeight = "normal";
}

function reset() {
	
	let decput = document.getElementById("decimal");
	let binput = document.getElementById("binary");
	let octput = document.getElementById("octal");
	let hexput = document.getElementById("hexadecimal");
	
	decput.value = 0;
	binput.value = 0;
	octput.value = 0;
	hexput.value = 0;
	decput.style.backgroundColor = "white";
	binput.style.backgroundColor = "white";
	octput.style.backgroundColor = "white";
	hexput.style.backgroundColor = "white";
	decput.style.fontWeight = "normal";
	binput.style.fontWeight = "normal";
	octput.style.fontWeight = "normal";
	hexput.style.fontWeight = "normal";
}

