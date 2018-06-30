var linebarOptions = {
    responsive: true,
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
var ctx = document.getElementById("linechart");
var mylinechart = new Chart(ctx, {
    type: 'line',
    data: lineData,
    options: linebarOptions,
});
var barData = {
    labels: ['Today', 'This Week', 'This Month', 'This Year'],
    datasets: [{
        label: 'VJTI Garbage Data',
        backgroundColor: '#ffffff',
        borderColor: '#4286f4',
        borderWidth: '3',
        data: [11, 4, 8, 12],
    }]
}

var ctx = document.getElementById("barchart");
var mybarchart = new Chart(ctx, {
    type: 'bar',
    data: barData,
    options: linebarOptions,
});

var pieData = {
    labels: ['Dustbin 1', 'Dustbin 2', 'Dustbin 3', 'Dustbin 4'],
    datasets: [{
        label: 'VJTI Garbage Data',
        backgroundColor: ['#b9f442', '#fffa00', '#00fff6', '#3b00ff'],
        borderColor: '#ffffff   ',
        borderWidth: '3',
        data: [11, 2, 13, 4],
        fill: false
    }]
}
var pieOptions = {
    responsive: true,
    title: {
        display: true,
        position: "top",
        text: "Doughnut Chart",
        fontSize: 18,
        fontColor: "#111"
    }
}
var ctxpie = document.getElementById("piechart");
var mypiechart = new Chart(ctxpie, {
    type: 'doughnut',
    data: pieData,
    options: pieOptions,
});
// var canvas = document.getElementById("piechart");
// var ctx = canvas.getContext("2d");
// var midX = canvas.width / 2;
// var midY = canvas.height / 2


// var radius = mypiechart.outerRadius;

// function drawSegmentValues() {
//     for (var i = 0; i < mypiechart.segments.length; i++) {
//         ctx.fillStyle = "white";
//         var textSize = canvas.width / 10;
//         ctx.font = textSize + "px Verdana";
//         // Get needed variables
//         var value = mypiechart.segments[i].value;
//         var startAngle = mypiechart.segments[i].startAngle;
//         var endAngle = mypiechart.segments[i].endAngle;
//         var middleAngle = startAngle + ((endAngle - startAngle) / 2);

//         // Compute text location
//         var posX = (radius / 2) * Math.cos(middleAngle) + midX;
//         var posY = (radius / 2) * Math.sin(middleAngle) + midY;

//         // Text offside by middle
//         var w_offset = ctx.measureText(value).width / 2;
//         var h_offset = textSize / 4;

//         ctx.fillText(value, posX - w_offset, posY + h_offset);
//     }
// }
