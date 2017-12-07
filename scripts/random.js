		function createRandoms() {	
			//alert("hep-1");	
			let mintext = document.getElementById("floor").value;
			let maxtext = document.getElementById("ceiling").value;
			let numstext = document.getElementById("rounds").value;
			//alert("hep0");
			//alert(mintext);
			//alert(maxtext);
			//alert(numstext);
			//alert(checkValue(mintext));
			//alert(checkValue(maxtext));
			//alert(checkValue(numstext));
			if ( !(checkValue(mintext) && checkValue(maxtext) && checkValue(numstext)) ) {
				alert("Given value is not a number.");
				return;
			}
			
			//alert("hep1");
			let min = Number(mintext);
			let max = Number(maxtext);
			let nums = Number(numstext);

			if (min > max) {
				alert("Minimum should be less than maximum.");
				return;
			}
			
			if (nums <= 0) {
				alert("Number of randoms should more than 0.");
				return;
			}

			let range = max - min;
			var randoms = [];
			let binsize = 100;
			
			for (var i = 0; i < nums; i++) {
				//let rand = Math.floor(Math.random() * range + min);
				let rand = Math.random() * range + min;
				randoms.push({ x: i, y: rand });
			}

			return randoms;
		}

		function checkValue(value) {
			//alert("check: " + value);
			//alert(value + ", value[0] = " + value[0] + ", is number: " + "0123456789".includes(value[0]) + ".");
			//alert("value.length: " + value.length);
			//alert("value.lenght: " + value.length + ", isNaN(" + value[0] + "): " + isNaN(value[0]));
			//alert("ehto1: " + (value.length == 1));
			//alert("value[0]: " + value[0]);
			//alert("ehto2 (" + value[0] + "): " + ( isNaN(value[0]) ) );
			//alert("ehto3: " + (value.length > 1));
			//alert("ehto4: " + (!"-0123456789".includes(value[0])));
			if ((value.length == 1 && isNaN(value[0])) || 
				(value.length > 1 && (!"-0123456789".includes(value[0])) ) ) {
				//alert("length 1 and value is not a number");
				return false;
			} else if (value.length > 1) {			
				for (var i = 1; i < value.length; i++) {
					//alert("i: " + i + ", value[" + i + "] = " + value[i] + ".");
					if (!"0123456789".includes(value[i])) {
						//alert("checkValue Given value is not a number.");
						return false;
					}
				}
			}
			//alert("returning true");
			return true;
		} 


		function getRunningAverages(data) {
			var averages = [];
			var sum = 0;
			for (var i = 0; i < data.length; i++) {
				if (i > 10) {
					averages.push({ x: i, y: sum / i });	
					//averages.push(sum / i);				
				}
				sum = sum + data[i].y;
			}
			return averages;
		}
				
		function createChart() {
			
			var datas = createRandoms();
			var avg = getRunningAverages(datas);
			
			var ctx = document.getElementById("myChart").getContext('2d');
			
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
