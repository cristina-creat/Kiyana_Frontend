/**
 * @interface defaultChartPieOptions - Describe default options for pie chart
 */
export var defaultChartPieOptions: any = {
    type: 'pie',
    data: {
      labels: ["SGMM", "CH", "Business Partner", "Seg. Auto", "Convenios", "Otros"],
      datasets: [{
          label: 'Publicaciones',
          data: [9,7 , 3, 5, 2, 10],
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
          borderWidth: 1
      }]
    }, 
    options: {
      title:{
          text:"Actividad x sección",
          display:true
      },
      legend: {
        position: 'right'
      },
      maintainAspectRatio: false
    }
};

/**
 * @interface defaultChartBarOptions - Describe default options for bar chart
 */
export var defaultChartBarOptions: any = {
    type: 'bar',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: [9,7 , 3, 5, 2, 10],
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
            borderWidth: 1
        }]
    }, 
    options: {
        title:{
            text:"Bar Chart",
            display:true
        },
        legend: {
            display: false
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
}

/**
 * @interface defaultChartLineOptions - Describe default options for line chart
 */
export var defaultChartLineOptions: any = {
    type: "line",
    data: {
        labels: ["January","February","March","April","May","June","July"],
        datasets: [
            {
                label: "My First Dataset",
                data: [65,59,80,81,56,55,40],
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                lineTension: 0.1 
            },
            {
                label: "My First Dataset",
                data: [60,79,70,80,50,65,80],
                fill: false,
                borderColor: "rgb(255, 202, 40)",
                lineTension: 0.1 
            }
        ]
    },
    options: {
        maintainAspectRatio: false
    }
  
}