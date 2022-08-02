module.exports = {
  chart: {
    height: (278 / 408 * 100) + '%',
    zoomType: 'x',
    style: {
      fontFamily: 'inherit'
    },
    backgroundColor: ""
  },
  title: {
    text: ""
  },
  subtitle: {
    text: "",
  },
  yAxis: {
    title: {
      text: ""
    },
    gridLineWidth: 0.75,
    gridLineDashStyle: "dash"
  },
  xAxis: {
    type: 'datetime',
    title: {
      text: "Time range"
    },
    accessibility: {
      rangeDescription: 'Line chart data'
    },
    gridLineWidth: 0.75,
    gridLineDashStyle: "dash"
  },
  credits: {
    enabled: false
  },
  legend: {
    enabled: false,
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle'
  },
  plotOptions: {
    series: {
      label: {
        connectorAllowed: false
      }
    },
    area: {
      fillOpacity: 0.30
    },

  },
  series: [],
  lang: {
    noData: "No data"
  },
  noData: {
    style: {
      fontWeight: 'bold',
      fontSize: '15px',
      color: '#303030'
    }
  },
  responsive: {
    rules: [{
      condition: {
        maxWidth: 500
      },
      chartOptions: {
        legend: {
          layout: 'horizontal',
          align: 'center',
          verticalAlign: 'bottom'
        }
      }
    }]
  },
  exporting: {
    enabled: true
  },
  accessibility: {
    enabled: false
  }
}