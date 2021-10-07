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
    chart: {
        height: 350,
        type: "line",
        stacked: false
    },
    dataLabels: {
        enabled: false
    },
    colors: ["#FF1654", "#247BA0"],
    series: [
        {
            name: "Tổng chi phí",
            data: inputTableToursChiPhi
        },
        {
            name: "Số đoàn đã đi",
            data: inputTableToursCount
        }
    ],
    stroke: {
        width: [4, 4]
    },
    plotOptions: {
        bar: {
            columnWidth: "20%"
        }
    },
    xaxis: {
        categories: inputTableToursMaTour
    },
    yaxis: [
        {
            axisTicks: {
                show: true
            },
            axisBorder: {
                show: true,
                color: "#FF1654"
            },
            labels: {
                style: {
                    colors: "#FF1654"
                }
            },
            title: {
                text: "Tổng chi phí",
                style: {
                    color: "#FF1654"
                }
            }
        },
        {
            opposite: true,
            axisTicks: {
                show: true
            },
            axisBorder: {
                show: true,
                color: "#247BA0"
            },
            labels: {
                style: {
                    colors: "#247BA0"
                }
            },
            title: {
                text: "Số đoàn đã đi",
                style: {
                    color: "#247BA0"
                }
            }
        }
    ],
    tooltip: {
        shared: false,
        intersect: true,
        x: {
            show: false
        }
    },
    legend: {
        horizontalAlign: "left",
        offsetX: 40
    }
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

