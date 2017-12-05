function doNot() {
	document.getElementById("operation").innerHTML = "&not;p";
	document.getElementById("o1").innerHTML = document.getElementById("p1").innerHTML == "T" ? "F" : "T";
	document.getElementById("o2").innerHTML = document.getElementById("p2").innerHTML == "T" ? "F" : "T";
	document.getElementById("o3").innerHTML = document.getElementById("p3").innerHTML == "T" ? "F" : "T";
	document.getElementById("o4").innerHTML = document.getElementById("p4").innerHTML == "T" ? "F" : "T";			
}

function doAnd() {
	document.getElementById("operation").innerHTML = "p &and; q";
	document.getElementById("o1").innerHTML = document.getElementById("p1").innerHTML == "T" && document.getElementById("q1").innerHTML == "T" ? "T" : "F";
	document.getElementById("o2").innerHTML = document.getElementById("p2").innerHTML == "T" && document.getElementById("q2").innerHTML == "T" ? "T" : "F";
	document.getElementById("o3").innerHTML = document.getElementById("p3").innerHTML == "T" && document.getElementById("q3").innerHTML == "T" ? "T" : "F";
	document.getElementById("o4").innerHTML = document.getElementById("p4").innerHTML == "T" && document.getElementById("q4").innerHTML == "T" ? "T" : "F";
}

function doOr() {
	document.getElementById("operation").innerHTML = "p &or; q";
	document.getElementById("o1").innerHTML = document.getElementById("p1").innerHTML == "T" || document.getElementById("q1").innerHTML == "T" ? "T" : "F";
	document.getElementById("o2").innerHTML = document.getElementById("p2").innerHTML == "T" || document.getElementById("q2").innerHTML == "T" ? "T" : "F";
	document.getElementById("o3").innerHTML = document.getElementById("p3").innerHTML == "T" || document.getElementById("q3").innerHTML == "T" ? "T" : "F";
	document.getElementById("o4").innerHTML = document.getElementById("p4").innerHTML == "T" || document.getElementById("q4").innerHTML == "T" ? "T" : "F";
}

function doXor() {
	document.getElementById("operation").innerHTML = "p &oplus; q";
	document.getElementById("o1").innerHTML = 
		(document.getElementById("p1").innerHTML == "T" && document.getElementById("q1").innerHTML != "T") || 
		(document.getElementById("p1").innerHTML != "T" && document.getElementById("q1").innerHTML == "T") ? "T" : "F";
	document.getElementById("o2").innerHTML = 
		(document.getElementById("p2").innerHTML == "T" && document.getElementById("q2").innerHTML != "T") || 
		(document.getElementById("p2").innerHTML != "T" && document.getElementById("q2").innerHTML == "T") ? "T" : "F";
	document.getElementById("o3").innerHTML = 
		(document.getElementById("p3").innerHTML == "T" && document.getElementById("q3").innerHTML != "T") || 
		(document.getElementById("p3").innerHTML != "T" && document.getElementById("q3").innerHTML == "T") ? "T" : "F";
	document.getElementById("o4").innerHTML = 
		(document.getElementById("p4").innerHTML == "T" && document.getElementById("q4").innerHTML != "T") || 
		(document.getElementById("p4").innerHTML != "T" && document.getElementById("q4").innerHTML == "T") ? "T" : "F";
}

function doImplication() {
	document.getElementById("operation").innerHTML = "p &rArr; q";
	document.getElementById("o1").innerHTML = document.getElementById("p1").innerHTML == "T" && document.getElementById("q1").innerHTML == "F" ? "F" : "T";
	document.getElementById("o2").innerHTML = document.getElementById("p2").innerHTML == "T" && document.getElementById("q2").innerHTML == "F" ? "F" : "T";
	document.getElementById("o3").innerHTML = document.getElementById("p3").innerHTML == "T" && document.getElementById("q3").innerHTML == "F" ? "F" : "T";
	document.getElementById("o4").innerHTML = document.getElementById("p4").innerHTML == "T" && document.getElementById("q4").innerHTML == "F" ? "F" : "T";
}

function doEquivalence() {
	document.getElementById("operation").innerHTML = "p &hArr; q";
	document.getElementById("o1").innerHTML = document.getElementById("p1").innerHTML == document.getElementById("q1").innerHTML ? "T" : "F";
	document.getElementById("o2").innerHTML = document.getElementById("p2").innerHTML == document.getElementById("q2").innerHTML ? "T" : "F";
	document.getElementById("o3").innerHTML = document.getElementById("p3").innerHTML == document.getElementById("q3").innerHTML ? "T" : "F";
	document.getElementById("o4").innerHTML = document.getElementById("p4").innerHTML == document.getElementById("q4").innerHTML ? "T" : "F";
}

function fillTruths() {
	document.getElementById("p1").innerHTML = "T";
	document.getElementById("q1").innerHTML = "T";
	document.getElementById("p2").innerHTML = "T";
	document.getElementById("q2").innerHTML = "F";
	document.getElementById("p3").innerHTML = "F";
	document.getElementById("q3").innerHTML = "T";
	document.getElementById("p4").innerHTML = "F";
	document.getElementById("q4").innerHTML = "F";		
	document.getElementById("o1").innerHTML = "";
	document.getElementById("o2").innerHTML = "";
	document.getElementById("o3").innerHTML = "";	
	document.getElementById("o4").innerHTML = "";			
}
