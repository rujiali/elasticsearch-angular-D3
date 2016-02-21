function composeDiscretebarChartOptions() {
  return {
    chart: {
      type: 'discreteBarChart',
      height: 450,
      margin : {
        top: 20,
        right: 20,
        bottom: 60,
        left: 55
      },
      x: function(d){ return d.label; },
      y: function(d){ return d.value; },
      showValues: true,
      valueFormat: function(d){
        return d3.format(',.2r')(d);
      },
      transitionDuration: 500,
      xAxis: {
        axisLabel: 'X Axis'
      },
      yAxis: {
        axisLabel: 'Y Axis',
        axisLabelDistance: 30
      }
    }
  };
}

function composeDiscretepieChartData(aggregations) {
  var key;
  for (key in aggregations) {
    if (aggregations[key].hasOwnProperty("buckets")) {
      var buckets = aggregations[key].buckets;
    }
  }

  var bucket;
  for (bucket in buckets) {
    buckets[bucket].value = buckets[bucket].doc_count;
    delete buckets[bucket].doc_count;
    buckets[bucket].label = buckets[bucket].key;
    delete buckets[bucket].key;
  }
  return [
    {
      key: "toilets",
      values: buckets
    }
  ];
}
