var config1 = {
	type: 'line',
	data: {
		labels:[],
		datasets: [{
			label: '실시간 조도 측정',
			backgroundColor:'yellow',
			borderColor:'rgb(244, 163, 59)',
			borderWidth: 2,
			data: [],
			fill: false,
		}]
	},
	options: {
		responsive: false,
		scales: {
			xAxes: [{
				display: true,
				scaleLabel: {display: true, labelString:'시간'},
			}],
			yAxes: [{
				display: true,
				scaleLabel: {display: true, labelString: '밝기' }
			}]
		}
	}
};


var config2 = {
	type: 'line',
	data: {
		labels:[],
		datasets: [{
			label: '실시간 온도 측정',
			backgroundColor:'yellow',
			borderColor:'rgb(255, 99, 132)',
			borderWidth: 2,
			data: [],
			fill: false,
			yAxisID: 'y1',
		},
		{
			label: '실시간 습도 측정',
			backgroundColor:'yellow',
			borderColor:'rgb(47, 146, 192)',
			borderWidth: 2,
			data: [],
			fill: false,
			yAxisID: 'y2',
		}]
	},
	options: {
		responsive: false,
		scales: {
			xAxes: [{
				display: true,
				scaleLabel: {display: true, labelString:'시간' },
			}],

			yAxes: [{
				id: 'y1',
				type: 'linear',
				position: 'left',
				scaleLabel: {display: true, labelString:'온도'},
			}, {
				id: 'y2',
				type: 'linear',
				position: 'right',
				scaleLabel: {display: true, labelString:'습도(%)'},
			}]
		}
	}
};


var config3 = {
	type: 'line',
	data: {
		labels:[],
		datasets: [{
			label: '실시간 거리 측정',
			backgroundColor:'yellow',
			borderColor:'rgb(186, 147, 223)',
			borderWidth: 2,
			data: [],
			fill: false,
		}]
	},
	options: {
		responsive: false,
		scales: {
			xAxes: [{
				display: true,
				scaleLabel: {display: true, labelString:'시간'},
			}],
			yAxes: [{
				display: true,
				scaleLabel: {display: true, labelString: '거리' }
			}]
		}
	}
};

/*---------------------------------------------------------------------------------*/

var i_ctx = null
var i_chart = null
var i_tick = 0;

var th_ctx = null
var th_chart = null
var t_tick = 0;
var h_tick = 0;

var d_ctx = null
var d_chart = null
var d_tick = 0;

var LABEL_SIZE = 20;


//조도
function drawIllumChart(){
	i_ctx = document.getElementById('canvas1').getContext('2d');
	i_chart = new Chart(i_ctx, config1);
	i_init()
}

//온도
function drawTempHumChart(){
	th_ctx = document.getElementById('canvas2').getContext('2d');
	th_chart = new Chart(th_ctx, config2);
	th_init()
}

//거리
function drawDistanceChart(){
	d_ctx = document.getElementById('canvas3').getContext('2d');
	d_chart = new Chart(d_ctx, config3);
	d_init()
}

/*---------------------------------------------------------------------------------*/

function i_init(){
	for (let i=0; i<LABEL_SIZE; i++){
		i_chart.data.labels[i] = i;
	}
	i_chart.update();
}

function th_init(){
	for (let i=0; i<LABEL_SIZE; i++){
		th_chart.data.labels[i] = i;
	}
	th_chart.update();
}

function d_init(){
	for (let i=0; i<LABEL_SIZE; i++){
		d_chart.data.labels[i] = i;
	}
	d_chart.update();
}

/*---------------------------------------------------------------------------------*/

function i_addChartData(value){
	i_tick++;
	i_tick %= 100;
	let a = i_chart.data.datasets[0].data.length;

	if(a < LABEL_SIZE)
		i_chart.data.datasets[0].data.push(value);
	else {
		i_chart.data.datasets[0].data.push(value);
		i_chart.data.datasets[0].data.shift();

		i_chart.data.labels.push(i_tick);
		i_chart.data.labels.shift();
	}
	i_chart.update();
}

function t_addChartData(value){
	t_tick++;
	t_tick %= 100;
	let b = th_chart.data.datasets[0].data.length;

	if(b < LABEL_SIZE)
		th_chart.data.datasets[0].data.push(value);
	else {
		th_chart.data.datasets[0].data.push(value);
		th_chart.data.datasets[0].data.shift();

		th_chart.data.labels.push(t_tick);
		th_chart.data.labels.shift();
	}
	th_chart.update();
}

function h_addChartData(value){
	h_tick++;
	h_tick %= 100;
	let c = th_chart.data.datasets[1].data.length;

	if(c < LABEL_SIZE)
		th_chart.data.datasets[1].data.push(value);
	else {
		th_chart.data.datasets[1].data.push(value);
		th_chart.data.datasets[1].data.shift();

		th_chart.data.labels.push(h_tick);
		th_chart.data.labels.shift();
	}
	th_chart.update();
}

function d_addChartData(value){
	d_tick++;
	d_tick %= 100;
	let d = d_chart.data.datasets[0].data.length;

	if(d < LABEL_SIZE)
		d_chart.data.datasets[0].data.push(value);
	else {
		d_chart.data.datasets[0].data.push(value);
		d_chart.data.datasets[0].data.shift();

		d_chart.data.labels.push(d_tick);
		d_chart.data.labels.shift();
	}
	d_chart.update();
}

/*---------------------------------------------------------------------------------*/

function hideshow1(){
	if(canvas1.style.display == "none") canvas1.style.display="block"
	else canvas1.style.display = "none"
}

function hideshow2(){
	if(canvas2.style.display == "none") canvas2.style.display="block"
	else canvas2.style.display = "none"
}

function hideshow3(){
	if(canvas3.style.display == "none") canvas3.style.display="block"
	else canvas3.style.display = "none"
}

/*---------------------------------------------------------------------------------*/

function loading(){
	drawIllumChart()
	drawTempHumChart()
	drawDistanceChart()
}

window.addEventListener("load", loading)