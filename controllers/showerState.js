// Controller
ElasticApp.controller('showerController', function ($scope, $http, host, index, type) {

  $http.post(host+'/authenticate', {name: 'testuser', pass: '12345'})
      .success(function(data, status, headers, config) {
        var token = data.token;
        $http.defaults.headers.common['Accept'] = 'application/json';
        $http.defaults.headers.common.Authorization = 'Bearer ' + token;
        var query_data = {
          "query_body": [
            {
              "index": index,
              "type": type
            },
            {
              "size": 0,
              "query": {
                "query_string": {
                  "analyze_wildcard": true,
                  "query": "*"
                }
              },
              "aggs": {
                "3": {
                  "terms": {
                    "field": "State",
                    "size": 8,
                    "order": {
                      "_count": "desc"
                    }
                  },
                  "aggs": {
                    "4": {
                      "terms": {
                        "field": "Showers",
                        "size": 5,
                        "order": {
                          "_count": "desc"
                        }
                      }
                    }
                  }
                }
              }
            }
          ]
        };
        $http.post(host+'/documents/msearch', query_data)
            .success(function(data, status, headers, config) {
              $scope.paneName = 'Shower by State';
              $scope.showerState = data;
              $scope.error = null;

              // Compose pie chart using D3
              $scope.options = {
                chart: {
                  type: 'sunburstChart',
                  height: 450,
                  color: d3.scale.category20c(),
                  duration: 250
                }

              };

              var arr = [{
                "name": "australia",
                "children": []
              }];

              var aggregations = data.responses[0].aggregations;
              var key;
              for (key in aggregations) {
                if (aggregations[key].hasOwnProperty("buckets")) {
                  var buckets = aggregations[key].buckets;
                }
              }

              var key;
              var children = [];
              for (key in buckets) {
                var ckey;
                for (ckey in buckets[key]) {
                  if (typeof(buckets[key][ckey]) === 'object') {
                    children.push({
                      "name": buckets[key].key,
                      "children": [
                        {
                          "name": "no shower",
                          "size": buckets[key][ckey].buckets[0].doc_count
                        },
                        {
                          "name": "shower",
                          "size": buckets[key][ckey].buckets[1].doc_count
                        },
                      ]
                    });
                  }
                }

              }
              arr = [{
                "name": "australia",
                "children": children
              }];

              $scope.data = arr;
            });
      })
});
