//Check input value and calculate and fill values in other number systems
function convertDecimal() {	
	var decput = document.getElementById("decimal");
	var binput = document.getElementById("binary");
	var octput = document.getElementById("octal");
	var hexput = document.getElementById("hexadecimal");

	if (isNaN(decput.value) || decput.value === "") {
		alert("Not a valid decimal number: " + decput.value + ".");
		document.getElementById("decimal").focus();
		document.getElementById("decimal").select();
		return;
	}
	
	//Check lower and upper limits
	var dec = Number(decput.value);
	if (dec > 99999999999) {
		alert("Number is too big. Choose a smaller number.");
		document.getElementById("decimal").focus();
		document.getElementById("decimal").select();
		return;
	}
	
	if (dec < -99999999999) {
		alert("Number is too small. Choose a bigger number.");
		document.getElementById("decimal").focus();
		document.getElementById("decimal").select();
		return;
	}
	//Calculate and fill values in other number systems
	binput.value = dec.toString(2);
	octput.value = dec.toString(8);
	hexput.value = dec.toString(16);
	
	//Set fields' attributes
	decput.style.backgroundColor = "white";
	binput.style.backgroundColor = "yellow";
	octput.style.backgroundColor = "yellow";
	hexput.style.backgroundColor = "yellow";
	decput.style.fontWeight = "normal";
	binput.style.fontWeight = "bold";
	octput.style.fontWeight = "bold";
	hexput.style.fontWeight = "bold";
	document.getElementById("decimal").focus();
	document.getElementById("decimal").select();
}

//Check input value and calculate and fill values in other number systems
function convertBinary() {
	
	var decput = document.getElementById("decimal");
	var binput = document.getElementById("binary");
	var octput = document.getElementById("octal");
	var hexput = document.getElementById("hexadecimal");
	
	var bin = binput.value;
	
	
	//Check that input value is valid: first character is -, 0, or 1 and the rest are 0's or 1's	
	var binstr = bin.toString();
	
	if (!"-01".includes(binstr[0])|| binstr === "") {
		alert("Not a valid binary value: " + bin + ".");
		document.getElementById("binary").focus();
		document.getElementById("binary").select();
		return;
	}

	for (var i = 1; i < binstr.length; i++) {
		if ( !"01".includes(binstr[i]) ) {
			alert("Not a valid binary value: " + bin + ".");
			document.getElementById("binary").select();
			return;
		}
	}

	//Check binary numbers length
	if ((binstr.length == 22 && binstr[0] != '-') || 
		binstr.length > 22) {
		alert("Number is too long. Choose a shorter number.");
		document.getElementById("binary").select();
		return;
	}
	
	//Calculate and fill values in other number systems
	var dec = parseInt(bin, 2);
	decput.value = dec;
	octput.value = dec.toString(8);
	hexput.value = dec.toString(16);

	//Set fields' attributes
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

//Check input value and calculate and fill values in other number systems
function convertOctal() {

	var decput = document.getElementById("decimal");
	var binput = document.getElementById("binary");
	var octput = document.getElementById("octal");
	var hexput = document.getElementById("hexadecimal");
	
	//Check that input value is valid	
	var octstr = octput.value.toString();

	if (!"-01234567".includes(octstr[0]) || octstr === "") {
		alert("Not a valid octal number: " + octstr + ". ");
		document.getElementById("octal").select();
		return;
	}
	
	for (var i = 1; i < octstr.length; i++) {
		if (!"01234567".includes(octstr[i])) {
			alert("Not a valid octal number: " + octstr + ". ");
			document.getElementById("octal").select();
			return;
		} 
	}

	//Check lower and upper limits
	var oct = Number(octstr);
	var dec = parseInt(oct, 8);
	
	if (dec > 549755813887) {
		alert("Number is too big. Choose a smaller number.");
		document.getElementById("octal").select();
		return;
	}
	
	if (dec < -549755813887) {
		alert("Number is too small. Choose a bigger number.");
		document.getElementById("octal").select();
		return;
	}

	//Calculate and fill values in other number systems	
	decput.value = dec;
	binput.value = dec.toString(2);
	hexput.value = dec.toString(16);

	//Set fields' attributes
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
	
	var decput = document.getElementById("decimal");
	var binput = document.getElementById("binary");
	var octput = document.getElementById("octal");
	var hexput = document.getElementById("hexadecimal");
	
	//Check that input value is valid
	var hex = hexput.value.trim();
	var hexstr = hex.toString();
	
	if (!"-0123456789aAbBcCdDeEfF".includes(hexstr[0])  || hexstr === "") {
		alert("Not a valid hexadecimal number: " + hexstr + ". ");
		document.getElementById("hexadecimal").select();
		return;
	}
	
	for (var i = 1; i < hexstr.length; i++) {
		if (!"0123456789aAbBcCdDeEfF".includes(hexstr[i])) {
			alert("Not a valid hexadecimal number: " + hexstr + ". ");
			document.getElementById("hexadecimal").select();
			return;
		} 
	}
	
	var dec = parseInt(hex, 16);
	
	//Check lower and upper limits
	if (dec > 68719476735) {
		alert("Number is too big. Choose a smaller number.");
		document.getElementById("hexadecimal").select();
		return;
	}
	
	if (dec < -68719476735) {
		alert("Number is too small. Choose a bigger number.");
		document.getElementById("hexadecimal").select();
		return;
	}
	
	//Calculate and fill values in other number systems	
	decput.value = dec;
	binput.value = dec.toString(2);
	octput.value = dec.toString(8);
	//hexput.value = dec.toString(16);
	
	//Set fields' attributes
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

//Reset fields: set value to 0 and attributes to normal
function numsysreset() {
	
	var decput = document.getElementById("decimal");
	var binput = document.getElementById("binary");
	var octput = document.getElementById("octal");
	var hexput = document.getElementById("hexadecimal");
	
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
