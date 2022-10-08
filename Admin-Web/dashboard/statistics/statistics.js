
if(!userID) {
    window.location.replace("../login/");
}



let totalAccuracy = 0;
let averageAccuracy = 0;
let accuracyHigh = 0;
let accuracyMedium = 0;
let accuracyLow = 0;
let accuracies = [];

document.querySelector(".areaChart-div").classList.add("loader");
document.querySelector(".pieChart-div").classList.add("loader");

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

        accuracies[(i-1) % 5] = data.accuracy;

        totalAccuracy += data.accuracy;
        averageAccuracy = totalAccuracy / i;

        if(data.accuracy > 66) {
            accuracyHigh++;
        }else if(data.accuracy > 33) {
            accuracyMedium++;
        }else if(data.accuracy > 0) {
            accuracyLow++;
        }

        graphAccuracy();

        graphPieAccuracy();

        document.querySelector(".areaChart-div").classList.remove("loader");
        document.querySelector(".pieChart-div").classList.remove("loader");

    });

});


function graphAccuracy() {

  var areaData = {
    labels: ["1", "2", "3", "4", "5"],
    datasets: [{
      label: 'Accuracies',
      data: accuracies,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1,
      fill: true,
    }]
  };

  var areaOptions = {
    plugins: {
      filler: {
        propagate: true
      }
    }
  }

  if ($("#areaChart").length) {
    var areaChartCanvas = $("#areaChart").get(0).getContext("2d");
    var areaChart = new Chart(areaChartCanvas, {
      type: 'line',
      data: areaData,
      options: areaOptions
    });
  }

}


function graphPieAccuracy() {

  var pieData = {
    datasets: [{
      data: [accuracyHigh, accuracyMedium, accuracyLow],
      backgroundColor: [
        'rgba(75, 192, 192, 0.5)',
        'rgba(255, 159, 64, 0.5)',
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(153, 102, 255, 0.5)',
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(153, 102, 255, 1)',
      ],
    }],

    labels: [
      'High',
      'Medium',
      'Low',
    ]
  };

  var pieOptions = {
    responsive: true,
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };

  if ($("#pieChart").length) {
    var pieChartCanvas = $("#pieChart").get(0).getContext("2d");
    var pieChart = new Chart(pieChartCanvas, {
      type: 'pie',
      data: pieData,
      options: pieOptions
    });
  }

}