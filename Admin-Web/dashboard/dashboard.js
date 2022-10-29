
if(!userID) {
    window.location.replace("../login/");
}

let completedData = 0;

document.querySelector(".dashboard").classList.add("loader");

let noCriminals = 0;
let noTrackings = 0;
let noDetected = 0;
let noCaught = 0;

fDatabase.ref('Criminals').on('value', (list) => {

    noCriminals = 0;
    noTrackings = 0;
    noDetected = 0;
    noCaught = 0;

    let i = 0;
    let counts = list.numChildren();
    list.forEach((item) => {

        i++;

        const id = item.key;
        const data = item.val();

        noCriminals++;

        if(data.isTracking == true) {
            noTrackings++;
        }

        if(data.isDetected == true) {
            noDetected++;
        }

        if(data.isCaught == true) {
            noCaught++;
        }

        document.querySelector(".count-criminals").innerHTML = noCriminals;
        document.querySelector(".count-trackings").innerHTML = noTrackings;
        document.querySelector(".count-detected").innerHTML = noDetected;
        document.querySelector(".count-caught").innerHTML = noCaught;

        if(counts == i) {
            completedData++;
        }
        if(completedData >= 2) {
            document.querySelector(".dashboard").classList.remove("loader");
        }

    });

});




let noPolice = 0;
let noPoliceActive = 0;
let noPoliceDisabled = 0;

fDatabase.ref('Agents').on('value', (list) => {

    noPolice = 0;
    noPoliceActive = 0;
    noPoliceDisabled = 0;

    let i = 0;
    let counts = list.numChildren();
    list.forEach((item) => {

        i++;

        const id = item.key;
        const data = item.val();

        noPolice++;

        if(data.isActive == true) {
            noPoliceActive++;
        }else {
            noPoliceDisabled++;
        }

        document.querySelector(".count-police-active").innerHTML = noPoliceActive;

        if(counts == i) {
            completedData++;
        }
        if(completedData >= 2) {
            document.querySelector(".dashboard").classList.remove("loader");
        }

    });

});




let totalAccuracy = 0;
let averageAccuracy = 0;
let accuracyHigh = 0;
let accuracyMedium = 0;
let accuracyLow = 0;

fDatabase.ref('Detections').on('value', (list) => {

    totalAccuracy = 0;
    averageAccuracy = 0;
    accuracyHigh = 0;
    accuracyMedium = 0;
    accuracyLow = 0;

    let i = 0;
    let counts = list.numChildren();
    list.forEach((item) => {

        i++;

        const id = item.key;
        const data = item.val();

        totalAccuracy += !isNaN(data.accuracy) ? data.accuracy : 0;
        averageAccuracy = totalAccuracy / i;

        if(data.accuracy > 66) {
            accuracyHigh++;
        }else if(data.accuracy > 33) {
            accuracyMedium++;
        }else if(data.accuracy > 0) {
            accuracyLow++;
        }

        graphAccuracyNo();

        if(counts == i) {
            completedData++;
        }
        if(completedData >= 3) {
            document.querySelector(".dashboard").classList.remove("loader");
        }

    });

});



window.addEventListener('popstate', (event) => {
    history.go(1);
});
history.pushState({ state: 1 }, '');



function graphAccuracyNo() {

    if ($("#graph-accuracy-no").length) {
        var areaData = {
          labels: ["", "", ""],
          datasets: [{
              data: [averageAccuracy, 100 - averageAccuracy, 0],
              backgroundColor: [
                 "#4B49AC","#EEEEEE", "#4B49AC",
              ],
              borderColor: "rgba(0,0,0,0)"
            }
          ]
        };
        var areaOptions = {
          responsive: true,
          maintainAspectRatio: true,
          segmentShowStroke: false,
          cutoutPercentage: 78,
          elements: {
            arc: {
                borderWidth: 4
            }
          },      
          legend: {
            display: false
          },
          tooltips: {
            enabled: true
          },
          legendCallback: function(chart) { 
            var text = [];
            text.push('<div class="report-chart hidden">');
              text.push('<div class="d-flex justify-content-between mx-4 mx-xl-5 mt-3"><div class="d-flex align-items-center"><div class="mr-3" style="width:20px; height:20px; border-radius: 50%; background-color: ' + chart.data.datasets[0].backgroundColor[0] + '"></div><p class="mb-0">Offline sales</p></div>');
              text.push('<p class="mb-0">88333</p>');
              text.push('</div>');
              text.push('<div class="d-flex justify-content-between mx-4 mx-xl-5 mt-3"><div class="d-flex align-items-center"><div class="mr-3" style="width:20px; height:20px; border-radius: 50%; background-color: ' + chart.data.datasets[0].backgroundColor[1] + '"></div><p class="mb-0">Online sales</p></div>');
              text.push('<p class="mb-0">66093</p>');
              text.push('</div>');
              text.push('<div class="d-flex justify-content-between mx-4 mx-xl-5 mt-3"><div class="d-flex align-items-center"><div class="mr-3" style="width:20px; height:20px; border-radius: 50%; background-color: ' + chart.data.datasets[0].backgroundColor[2] + '"></div><p class="mb-0">Returns</p></div>');
              text.push('<p class="mb-0">39836</p>');
              text.push('</div>');
            text.push('</div>');
            return text.join("");
          },
        }
        var graphAccuracyNoPlugins = {
          beforeDraw: function(chart) {
            var width = chart.chart.width,
                height = chart.chart.height,
                ctx = chart.chart.ctx;
        
            ctx.restore();
            var fontSize = 3.125;
            ctx.font = "500 " + fontSize + "em sans-serif";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#13381B";
        
            var text = Math.round(averageAccuracy),
                textX = Math.round((width - ctx.measureText(text).width) / 2),
                textY = height / 2;
        
            ctx.fillText(text, textX, textY);
            ctx.save();
          }
        }
        var graphAccuracyNoCanvas = $("#graph-accuracy-no").get(0).getContext("2d");
        var graphAccuracyNo = new Chart(graphAccuracyNoCanvas, {
          type: 'doughnut',
          data: areaData,
          options: areaOptions,
          plugins: graphAccuracyNoPlugins
        });
        document.getElementById('graph-accuracy-legend').innerHTML = graphAccuracyNo.generateLegend();
      }

}