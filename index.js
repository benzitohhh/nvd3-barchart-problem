var multi_series_data = [
  {
    key: 'series1',
    values: [
      {x: 'A', y: 10},
      {x: 'B', y: 13},
      {x: 'C', y: 15},
    ]
  },
  {
    key: 'series2',
    values: [
      {x: 'A', y: 4},
      {x: 'B', y: 5},
      {x: 'C', y: 8},
    ]
  }
]

var single_series_data = [
  {
    key: 'series1',
    values: [
      {x: 'A', y: 14},
      {x: 'B', y: 18},
      {x: 'C', y: 23},
    ]
  }
]

function render(chart, data) {
  d3.select('#container svg')
    .datum(data)
    .call(chart)
  ;
}

nv.addGraph(function() {
  var chart = nv.models.multiBarHorizontalChart()
    .margin({top: 30, right: 20, bottom: 50, left: 175})
    .stacked(true)
    .showControls(false)
  ;

  // click handler
  document.getElementById("single-series-selector").addEventListener("click", function(event) {
    if (event.currentTarget.checked) {
      // For barColor...
      // Set barColor on multibar
      chart.multibar.barColor(['red', 'green', 'purple']);
      render(chart, single_series_data);
    } else {
      // To get rid of barColor...
      // remove it from multibar
      chart.multibar.barColor(false);
      // And fix the first series (this can be done synchronously)
      d3.select('#container svg')
        .selectAll('.nv-series-0 .nv-bar')
        .attr('style', null)
      ;
      render(chart, multi_series_data);
    }
  });

  render(chart, multi_series_data);

  nv.utils.windowResize(chart.update);

  return chart;
});
