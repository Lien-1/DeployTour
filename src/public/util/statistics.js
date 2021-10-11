// table tours
let indexStatisticTours = $('.statistic-tableTours-MaTour').length
let inputTableToursMaTour = []
let inputTableToursChiPhi = []
let inputTableToursCount = []
for (let i = 0; i < indexStatisticTours; ++i) {
    inputTableToursMaTour.push($('.statistic-tableTours-MaTour').eq(i).html())
    inputTableToursChiPhi.push($('.statistic-tableTours-ChiPhi').eq(i).html())
    inputTableToursCount.push($('.statistic-tableTours-Count').eq(i).html())
}
console.log(inputTableToursChiPhi, inputTableToursCount, inputTableToursMaTour)

// table nhanviens
let indexStatisticNhanVien = $('.statistic-tableNhanViens-MaNhanVien').length
let inputTableNhanViensMaNhanVien = []
let inputTableNhanViensCountMaDoan = []
for (let i = 0; i < indexStatisticNhanVien; ++i) {
    inputTableNhanViensMaNhanVien.push($('.statistic-tableNhanViens-MaNhanVien').eq(i).html())
    inputTableNhanViensCountMaDoan.push($('.statistic-tableNhanViens-CountMaDoan').eq(i).html())

}

var optionsTour = {
    series: [{
        name: 'Số đoàn đã đi',
        type: 'column',
        data: inputTableToursCount
    }, {
        name: 'Chi phí',
        type: 'line',
        data: inputTableToursChiPhi
    }],
    chart: {
        height: 350,
        type: 'line',
    },
    stroke: {
        width: [0, 2]
    },
    // title: {
    //     text: 'Traffic Sources'
    // },
    dataLabels: {
        enabled: true,
        enabledOnSeries: [1]
    },
    labels: inputTableToursMaTour,
    // xaxis: {
    //     type: 'datetime'
    // },
    yaxis: [{
        title: {
            text: 'Số đoàn đã đi',
        },

    }, {
        opposite: true,
        title: {
            text: 'Chi phí'
        }
    }]
};

var chartTour = new ApexCharts(document.querySelector("#chart-tour"), optionsTour);

chartTour.render();

var options = {
    series: [
        {
            name: "Số lần đã đi tour",
            data: inputTableNhanViensCountMaDoan
        },
    ],
    chart: {
        type: "bar",
        height: 350
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded"
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
    },
    xaxis: {
        categories: inputTableNhanViensMaNhanVien
    },
    yaxis: {
        title: {
            text: "Số lần đi tour"
        }
    },
    fill: {
        opacity: 1
    },
    tooltip: {
        y: {
            formatter: function (val) {
                return val;
            }
        }
    }
};


var chartNhanVien = new ApexCharts(document.querySelector("#chart-nhanvien"), options);

chartNhanVien.render();

