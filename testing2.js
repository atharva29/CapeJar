var myChart = {}
var config = {
  type: 'line',
  data: {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [{
      label: "My First dataset",
      data: [65, 0, 80, 81, 56, 85],
      fill: false
    }]
  }
};


function initChart() {
  var ctx = document.getElementById("myChart").getContext("2d");
  myChart = new Chart(ctx, config);
  //addData(myChart, config,'lib',0)
}

function addData(myChart, config, lab, dat) {
  config.data.labels.push(lab);
  config.data.datasets[0].data.push(dat);
  myChart.update();
}



initChart();
addData(myChart, config,'lab' ,0);
var ws = new WebSocket("ws://localhost:3000/ws1")
ws.onmessage = function(event) {
  var info = JSON.parse(event.data);
  console.log(info);
  addData(myChart, config,'lab' ,info.Color);
}
