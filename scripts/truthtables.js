//Fill truth values for 'NEGATION' operation, check first if basic truth values have been filled
function doNegation() {
	checkTruths();
	document.getElementById("operation").innerHTML = "&not;p";
	document.getElementById("o1").innerHTML = document.getElementById("p1").innerHTML == "T" ? "F" : "T";
	document.getElementById("o2").innerHTML = document.getElementById("p2").innerHTML == "T" ? "F" : "T";
	document.getElementById("o3").innerHTML = document.getElementById("p3").innerHTML == "T" ? "F" : "T";
	document.getElementById("o4").innerHTML = document.getElementById("p4").innerHTML == "T" ? "F" : "T";			
}

//Fill truth values for 'CONJUNCTION' operation, check first if basic truth values have been filled
function doAnd() {
	checkTruths();
	document.getElementById("operation").innerHTML = "p &and; q";
	document.getElementById("o1").innerHTML = document.getElementById("p1").innerHTML == "T" && document.getElementById("q1").innerHTML == "T" ? "T" : "F";
	document.getElementById("o2").innerHTML = document.getElementById("p2").innerHTML == "T" && document.getElementById("q2").innerHTML == "T" ? "T" : "F";
	document.getElementById("o3").innerHTML = document.getElementById("p3").innerHTML == "T" && document.getElementById("q3").innerHTML == "T" ? "T" : "F";
	document.getElementById("o4").innerHTML = document.getElementById("p4").innerHTML == "T" && document.getElementById("q4").innerHTML == "T" ? "T" : "F";
}

//Fill truth values for 'DISJUNCTION' operation, check first if basic truth values have been filled
function doOr() {
	checkTruths();
	document.getElementById("operation").innerHTML = "p &or; q";
	document.getElementById("o1").innerHTML = document.getElementById("p1").innerHTML == "T" || document.getElementById("q1").innerHTML == "T" ? "T" : "F";
	document.getElementById("o2").innerHTML = document.getElementById("p2").innerHTML == "T" || document.getElementById("q2").innerHTML == "T" ? "T" : "F";
	document.getElementById("o3").innerHTML = document.getElementById("p3").innerHTML == "T" || document.getElementById("q3").innerHTML == "T" ? "T" : "F";
	document.getElementById("o4").innerHTML = document.getElementById("p4").innerHTML == "T" || document.getElementById("q4").innerHTML == "T" ? "T" : "F";
}

//Fill truth values for 'EXCLUSIVE DISJUNCTION' operation, check first if basic truth values have been filled
function doXor() {
	checkTruths();
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

//Fill truth values for 'IMPLICATION', check first if basic truth values have been filled
function doImplication() {
	checkTruths();
	document.getElementById("operation").innerHTML = "p &rArr; q";
	document.getElementById("o1").innerHTML = document.getElementById("p1").innerHTML == "T" && document.getElementById("q1").innerHTML == "F" ? "F" : "T";
	document.getElementById("o2").innerHTML = document.getElementById("p2").innerHTML == "T" && document.getElementById("q2").innerHTML == "F" ? "F" : "T";
	document.getElementById("o3").innerHTML = document.getElementById("p3").innerHTML == "T" && document.getElementById("q3").innerHTML == "F" ? "F" : "T";
	document.getElementById("o4").innerHTML = document.getElementById("p4").innerHTML == "T" && document.getElementById("q4").innerHTML == "F" ? "F" : "T";
}

//Fill truth values for 'EQUIVALENCE', check first if basic truth values have been filled
function doEquivalence() {
	checkTruths();
	document.getElementById("operation").innerHTML = "p &hArr; q";
	document.getElementById("o1").innerHTML = document.getElementById("p1").innerHTML == document.getElementById("q1").innerHTML ? "T" : "F";
	document.getElementById("o2").innerHTML = document.getElementById("p2").innerHTML == document.getElementById("q2").innerHTML ? "T" : "F";
	document.getElementById("o3").innerHTML = document.getElementById("p3").innerHTML == document.getElementById("q3").innerHTML ? "T" : "F";
	document.getElementById("o4").innerHTML = document.getElementById("p4").innerHTML == document.getElementById("q4").innerHTML ? "T" : "F";
}

//Fill basic truth values and reset result column
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

//Reset all columns
function truthtablereset() {
	document.getElementById("p1").innerHTML = "";
	document.getElementById("q1").innerHTML = "";
	document.getElementById("p2").innerHTML = "";
	document.getElementById("q2").innerHTML = "";
	document.getElementById("p3").innerHTML = "";
	document.getElementById("q3").innerHTML = "";
	document.getElementById("p4").innerHTML = "";
	document.getElementById("q4").innerHTML = "";		
	document.getElementById("o1").innerHTML = "";
	document.getElementById("o2").innerHTML = "";
	document.getElementById("o3").innerHTML = "";	
	document.getElementById("o4").innerHTML = "";	
	document.getElementById("operation").innerHTML = "";
}

//Check if basic truth values have been filled and fill them if they are empty (checks only one truth value, really)
function checkTruths() {
	if (document.getElementById("p1").innerHTML != "T") {
		fillTruths();
	}
}