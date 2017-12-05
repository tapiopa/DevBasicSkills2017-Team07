function createRandoms() {
			/*let numtext = document.getElementById("rounds").value;
			if (isNaN(numtext)) {
				alert("False");
			}
			let nums = Number(numtext);
			if (nums < 200) {
				return getAFewRandomNumbers();
			} else {
				return getALotRandomNumbers();
			}
			*/		
			return getAFewRandomNumbers();	
		}
		
		function randomNumbers() {
			// Get controls, check them and convert to numbers
			let mintext = document.getElementById("floor").value;
			let maxtext = document.getElementById("ceiling").value;
			let numtext = document.getElementById("rounds").value;
			if (isNaN(mintext) || isNaN(maxtext) || isNaN(numtext)) {
				alert("False");
			}
			let min = Number(mintext);
			let max = Number(maxtext);
			let nums = Number(numtext);
			
			
			let range = max - min;
			var randoms = [];
			//var bins = [];
			let binsize = 100;
			
			for (var i = 0; i < nums; i++) {
				let rand = Math.random() * range + min;
				randoms.push(rand);
			}
			
			for (var i = 0; i < binsize; i++) {
				bins.push({ x: i, y: 0 });
			}
			
			var divider = range/binsize;
			
			for (var i = 0; i < nums; i++) {
				let binnumber = Math.floor(randoms[i] / divider);
				bins[binnumber]++; 
			}
			
		}
		
		function getAFewRandomNumbers() {
			
			let mintext = document.getElementById("floor").value;
			let maxtext = document.getElementById("ceiling").value;
			let numtext = document.getElementById("rounds").value;
			if (isNaN(mintext) || isNaN(maxtext) || isNaN(numtext)) {
				alert("False");
			}
			let min = Number(mintext);
			let max = Number(maxtext);
			let nums = Number(numtext);
			
			let range = max - min;
			var randoms = [];
			let binsize = 100;
			
			for (var i = 0; i < nums; i++) {
				let rand = Math.floor(Math.random() * range + min);
				randoms.push({ x: i, y: rand });
			}
			return randoms;
		}
		
		function getBins(data) {
			
			var min = Number.MAX_SAFE_INTEGER;
			var max = Number.MIN_SAFE_INTEGER;
			var size = data.length;
			
			for (var i = 0; i < size; i++) {
				if (data[i].y < min) {
					min = data[i].y;
				}
				if (data[i].y > max) {
					max = data[i].y;
				}
			}
			
			var bins = [];
			let binsize = max - min;

			for (i = 0; i < binsize + 1; i++) {
				//bins.push({ x: i, y: 0 });
				bins.push(0);
			}
			
			for (var i = 0; i < size; i++) {
				let binnumber = Math.floor(data[i].y - min);
				//bins[binnumber].y++;
				bins[binnumber]++;
			}

			return bins;
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
		
		function createLabels() {
			var labels = [];
			for (var i = 0; i < 100; i++) {
				labels.push("#" + i.toString());
			}
			return labels;
		}

		function createChart() {
			var datas = createRandoms();
			var chartlabels = createLabels();
			var avg = getRunningAverages(datas);
			var bins = getBins(datas);
			//alert(bins);
			for (var i = 0; i < 100; i++) {
				//datas.push( { x: i, y: Math.random() * 100 } );
				chartlabels.push("#" + i.toString());
			}
			
			var ctx = document.getElementById("myChart").getContext('2d');
			
			var myChart = new Chart(ctx, {
			    type: 'bar',
			    data: {
			        labels: chartlabels,
			        datasets: [{
					        label: 'Running Average', 
					        data: avg, 
					        borderColor: 'red', 
					        lineTension: 0, 
					        fill: 'false', 
					        showLine: 'true', 
					        yAxisID: 'randomY',
					        xAxisID: 'randomX',
					        type: 'line'					        
				        }, 
				        {
					        label: 'Bins', 
					        data: bins, 
					        borderColor: 'green', 
					        backgroundColor: 'green', 
					        //yAxisID: 'binsY',
					        //xAxisID: 'binsX', 
					        //barPercentage: 1.0,
					        //barThickness: 3,
					        //borderWidth: 1, 
					        type: 'bar'					        
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
				                    beginAtZero:true
				                }
			                }, 
			                {
				                id: 'binsY', 
				                type: 'linear', 
				                position: 'right', 
				                ticks: {
				                    beginAtZero:true
				                }
			            	}],
			            xAxes: 
			            	[{
					            id: 'randomX', 
					            type: 'linear', 
					            position: 'bottom', 
					            ticks: {
						            beginAtZero: true
					            }
							}/*, 
							{
						        id: 'binsX', 
						        type: 'linear', 
						        position: 'top', 
						        ticks: {
							        beginAtZero: true
					            }
			            	}*/]
			            } 
			        }
			    }
			);
		}
