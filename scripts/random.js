//Create random values as specified in input fields
function createRandoms() {		
	var mintext = document.getElementById("floor").value;
	var maxtext = document.getElementById("ceiling").value;
	var numstext = document.getElementById("rounds").value;

	//Check if input values are numbers
	if ( !(isANumber(mintext) && isANumber(maxtext) && isANumber(numstext)) ) {
		alert("Given value is not a number.");
		return;
	}
	
	var min = Number(mintext);
	var max = Number(maxtext);
	var nums = Number(numstext);

	//Check if values are reasonable
	if (min > max) {
		alert("Minimum should be less than maximum.");
		document.getElementById("floor").focus();
		document.getElementById("floor").select();
		return;
	}
	
	if (nums <= 0) {
		alert("Number of randoms should be more than 0.");
		document.getElementById("rounds").focus();
		document.getElementById("rounds").select();
		return;
	}


	//Create random values in an array and return them
	var range = max - min;
	var randoms = [];
	
	for (var i = 0; i < nums; i++) {
		var rand = Math.random() * range + min;
		randoms.push({ x: i, y: rand });
	}
	return randoms;
}

//Check if a string is a decimal number
function isANumber(value) {
	if ((value.length == 1 && isNaN(value[0])) || 
		(value.length > 1 && (!"-0123456789".includes(value[0])) ) ) {
		return false;
	} else if (value.length > 1) {			
		for (var i = 1; i < value.length; i++) {
			if (!"0123456789".includes(value[i])) {
				return false;
			}
		}
	}
	return true;
} 

//Calculate running averages for a given data set
function getRunningAverages(data) {
	var averages = [];
	var sum = 0;
	var lowerLimit = 10; //How many values must there be before the average for those numbers is calculated
	
	for (var i = 0; i < data.length; i++) {
		if (i > 10) {
			averages.push({ x: i, y: sum / i });					
		}
		sum = sum + data[i].y;
	}
	return averages;
}
		
//Creates chart, called from web page, calls functions for creating random numbers and running averages. Uses chart.js chart library. See: http://www.chartjs.org 	
function createChart() {
	//Create random numbers and running averages
	var datas = createRandoms();
	var avg = getRunningAverages(datas);
	
	//Create chart
	var ctx = document.getElementById("myChart").getContext('2d');
	//Define datasets and axes
	var myChart = new Chart(ctx, {
	    type: 'bar',
	    data: {
	        datasets: [{
			        label: 'Running Average', 
			        data: avg, 
			        borderColor: 'red',
			        backgroundColor: 'red', 
			        lineTension: 0, 
			        fill: 'true', 
			        showLine: 'true', 
			        yAxisID: 'randomY',
			        xAxisID: 'randomX',
			        type: 'line'					        
		        }, 
		        {
		            label: 'Random Numbers',
		            data: datas, 
		            backgroundColor: 'black', 
		            borderColor: 'black', 
		            yAxisID: 'randomY',
		            xAxisID: 'randomX',
		            type: 'scatter', 
		            showLine: false, 
		            borderWidth: 1
	        	}]
	    },
	    options: {
	        scales: {
	            yAxes: 
	            	[{
			            id: 'randomY', 
			            type: 'linear', 
			            position: 'left',
		                ticks: {
		                    beginAtZero:false
		                }
	                }],
	            xAxes: 
	            	[{
			            id: 'randomX', 
			            type: 'linear', 
			            position: 'bottom', 
			            ticks: {
				            beginAtZero: false
			            }
					}]
	            } 
	        }
	    }
	);
}
