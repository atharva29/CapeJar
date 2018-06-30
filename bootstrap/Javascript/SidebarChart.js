var linebarOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
        yAxes: [{
            scaleLabel: {
                display: true,
                labelString: 'Weight in Kg'
            }
        }],
        xAxes: [{
            scaleLabel: {
                display: true,
                labelString: 'Time'
            }
        }],
    }
}
var lineData = {
    labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    datasets: [{
            label: 'VJTI Garbage Data',
            backgroundColor: '#ffffff',
            borderColor: '#4286f4',
            borderWidth: '3',
            data: [11, 2, 13, 4, 9, 10, 12],
            fill: false
        }, // {
        // label: 'previous year',
        // backgroundColor: '#03586A',
        // data: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
        // }
    ]
}
var ctx = document.getElementById("smallchart");

var mylinechart = new Chart(ctx, {
    type: 'line',
    data: lineData,
    options: linebarOptions,
});

