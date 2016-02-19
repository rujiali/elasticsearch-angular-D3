function composePieChartOptions() {
  return {
    chart: {
      type: 'pieChart',
      height: 500,
      x: function(d){return d.key;},
      y: function(d){return d.y;},
      showLabels: false,
      duration: 500,
      labelThreshold: 0.01,
      labelSunbeamLayout: true,
      legend: {
        margin: {
          top: 5,
          right: 35,
          bottom: 5,
          left: 0
        }
      }
    }
  };
}

function composePieChartData(aggregations) {
  var key;
  for (key in aggregations) {
    if (aggregations[key].hasOwnProperty("buckets")) {
      var buckets = aggregations[key].buckets;
    }
  }

  var bucket;
  for (bucket in buckets) {
    buckets[bucket].y = buckets[bucket].doc_count;
    delete buckets[bucket].doc_count;
  }

  return buckets;
}
