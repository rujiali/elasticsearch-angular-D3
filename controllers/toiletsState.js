// Controller
ElasticApp.controller('stateController', function ($scope, $http) {

  $http.post('http://localhost:3000/authenticate', {name: 'testuser', pass: '12345'})
      .success(function(data, status, headers, config) {
        var token = data.token;
        $http.defaults.headers.common['Accept'] = 'application/json';
        $http.defaults.headers.common.Authorization = 'Bearer ' + token;
        var query_data = {
          "query_body": [
            {
              "index": "public_toilets",
              "type": "logs"
            },
            {
              "size": 0,
              "query": {
                "query_string": {
                  "query": "*",
                  "analyze_wildcard": true
                }
              },
              "aggs": {
                "2": {
                  "terms": {
                    "field": "State",
                    "size": 8,
                    "order": {
                      "_count": "desc"
                    }
                  }
                }
              }
            }
          ]
        };
        $http.post('http://localhost:3000/documents/msearch', query_data)
            .success(function(data, status, headers, config) {
              $scope.paneName = 'Toilets by State';
              $scope.toiletsState = data;
              $scope.error = null;

              // Compose pie chart using D3
              $scope.options = {
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

              var aggregations = data.responses[0].aggregations;
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
              $scope.data = buckets;
            });
      })
});
