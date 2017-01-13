// Sales dynamics chart

$("#charts").click(function () {
    $('html, body').animate({
        scrollTop: $("#footer").offset().top
    }, 500);
});

$(function () {
    Highcharts.chart('chart', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Sales dynamics'
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Sold per day'
            }
        },
        plotOptions: {
            series: {
                borderWidth: 0
            }
        },
        series: [{
            name: '2015',
            color: '#73c4ff',
            data: [
                {
                    name: 'Jan',
                    y: 29.19,
                    drilldown: 'nov'
                },
                {
                    name: 'Feb',
                    y: 74.50,
                    drilldown: 'nov'
                },
                {
                    name: 'Mar',
                    y: 106.40,
                    drilldown: 'nov'
                },
                {
                    name: 'Apr',
                    y: 129.20,
                    drilldown: 'nov'
                },
                {
                    name: 'May',
                    y: 144.00,
                    drilldown: 'nov'
                },
                {
                    name: 'Jun',
                    y: 176.00,
                    drilldown: 'nov'
                },
                {
                    name: 'Jul',
                    y: 165.60,
                    drilldown: 'nov'
                },
                {
                    name: 'Aug',
                    y: 148.50,
                    drilldown: 'nov'
                },
                {
                    name: 'Sep',
                    y: 216.40,
                    drilldown: 'nov'
                },
                {
                    name: 'Oct',
                    y: 194.10,
                    drilldown: 'nov'
                },
                {
                    name: 'Nov',
                    y: 95.60,
                    drilldown: 'nov'
                },
                {
                    name: 'Dec',
                    y: 354.40,
                    drilldown: 'nov'
                },
            ],
            type: 'line'
        }, {
            name: '2016',
            color: '#ff020a',
            data: [
                {
                    name: 'Jan',
                    y: 69.19,
                    drilldown: 'nov'
                },
                {
                    name: 'Feb',
                    y: 110.50,
                    drilldown: 'nov'
                },
                {
                    name: 'Mar',
                    y: 156.40,
                    drilldown: 'nov'
                },
                {
                    name: 'Apr',
                    y: 142.20,
                    drilldown: 'nov'
                },
                {
                    name: 'May',
                    y: 150.00,
                    drilldown: 'nov'
                },
                {
                    name: 'Jun',
                    y: 206.00,
                    drilldown: 'nov'
                },
                {
                    name: 'Jul',
                    y: 180.60,
                    drilldown: 'nov'
                },
                {
                    name: 'Aug',
                    y: 165.50,
                    drilldown: 'nov'
                },
                {
                    name: 'Sep',
                    y: 228.40,
                    drilldown: 'nov'
                },
                {
                    name: 'Oct',
                    y: 220.10,
                    drilldown: 'nov'
                },
                {
                    name: 'Nov',
                    y: 145.60,
                    drilldown: 'nov'
                },
                {
                    name: 'Dec',
                    y: 376.40,
                    drilldown: 'nov'
                },
            ],
            type: 'line'
        }],
        drilldown: {
            series: [{
                id: 'nov',
                name: 'November',
                data: [
                    ['1	', 30],
                    ['2	', 86],
                    ['3	', 91],
                    ['4	', 142],
                    ['5	', 30],
                    ['6	', 152],
                    ['7	', 106],
                    ['8	', 30],
                    ['9	', 30],
                    ['10', 30],
                    ['11', 58],
                    ['12', 30],
                    ['13', 30],
                    ['14', 67],
                    ['15', 144],
                    ['16', 41],
                    ['17', 158],
                    ['18', 48],
                    ['19', 82],
                    ['20', 152],
                    ['21', 119],
                    ['22', 183],
                    ['23', 160],
                    ['24', 30],
                    ['25', 147],
                    ['26', 170],
                    ['27', 124],
                    ['28', 104],
                    ['29', 125],
                    ['30', 103],
                    ['31', 163]
                ]
            }]
        }
    });
});
