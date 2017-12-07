// 111111111111111111111111111111111111111111111

function convertDecimal() {	
	let decput = document.getElementById("decimal");
	let binput = document.getElementById("binary");
	let octput = document.getElementById("octal");
	let hexput = document.getElementById("hexadecimal");
	
	if (isNaN(decput.value)) {
		alert("Not a valid decimal number: " + decput.value + ".");
		document.getElementById("decimal").select();
		return;
	}
	
	let dec = Number(decput.value);
	if (dec > 99999999999) {
		alert("Number is too big. Choose a smaller number.");
		document.getElementById("decimal").select();
		return;
	}
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
	document.getElementById("decimal").select();
}

function convertBinary() {
	
	let decput = document.getElementById("decimal");
	let binput = document.getElementById("binary");
	let octput = document.getElementById("octal");
	let hexput = document.getElementById("hexadecimal");
	
	if (isNaN(binput.value)) {
		alert("Not a valid binary value: " + binput.value + ".");
		document.getElementById("binary").select();
		return;
	}
	let bin = Number(binput.value);
	let binstr = bin.toString();
	let dec = parseInt(bin, 2);
	//alert(dec);
	//111111111111111111111
	if (dec > 2097136 || binstr.length > 21) {
		alert("Number is too big. Choose a smaller number.");
		document.getElementById("binary").select();
		return;
	}
	
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
	document.getElementById("binary").select();
}

function convertOctal() {
	
	let decput = document.getElementById("decimal");
	let binput = document.getElementById("binary");
	let octput = document.getElementById("octal");
	let hexput = document.getElementById("hexadecimal");
	
	let chrs = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
	let oct = Number(octput.value);	
	let octstr = oct.toString();

	for (var i = 0; i < octstr.length; i++) {
		if (!chrs.includes(octstr[i])) {
			alert("Not a valid octal number: " + octstr + ". ");
			document.getElementById("octal").select();
			return;
		} 
	}

	let dec = parseInt(oct, 8);
	
	if (dec > 549755813887) {
		alert("Number is too big. Choose a smaller number.");
		document.getElementById("octal").select();
		return;
	}
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
	document.getElementById("octal").select();
}

function convertHexadecimal() {
	
	let decput = document.getElementById("decimal");
	let binput = document.getElementById("binary");
	let octput = document.getElementById("octal");
	let hexput = document.getElementById("hexadecimal");
	let hex = hexput.value;
	let hexstr = hex.toString();
	
	let chrs = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'a', 'A', 'b', 'B', 'c', 'C', 'd', 'D', 'e', 'E', 'f', 'F'];
	for (var i = 0; i < hexstr.length; i++) {
		if (!chrs.includes(hexstr[i])) {
			alert("Not a valid hexadecimal number: " + hexstr + ". ");
			document.getElementById("hexadecimal").select();
			return;
		} 
	}
	/*if (isNaN(decput.value)) {
		alert("False");
	}*/
	
	let dec = parseInt(hex, 16);
	
	
	if (dec > 68719476735) {
		alert("Number is too big. Choose a smaller number.");
		document.getElementById("octal").select();
		return;
	}
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
	document.getElementById("hexadecimal").select();
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

