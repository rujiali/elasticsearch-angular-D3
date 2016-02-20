// Controller
ElasticApp.controller('formController', function ($scope, $http) {

  $http.post('http://localhost:3000/authenticate', {name: 'testuser', pass: '12345'})
      .success(function(data, status, headers, config) {
        var token = data.token;
        $http.defaults.headers.common['Accept'] = 'application/json';
        $http.defaults.headers.common.Authorization = 'Bearer ' + token;
        var query_data = {
          "index": "public_toilets",
          "type": "logs"
        };
        $http.post('http://localhost:3000/documents/mapping', query_data)
            .success(function(data, status, headers, config) {
              var options = [];
              var properties = data.public_toilets.mappings.logs.properties;
              var key;
              for (key in properties) {
                if (properties[key].type == 'string' || properties[key].type == 'boolean') {
                  options.push({
                    'id': key,
                    'name': key
                  });
                }
              }
              $scope.condition = {
                aggregationSelect: null,
                availableAggregations: options,
                diagramSelect: null,
                availableDiagrams:[
                  {id: 'Pie Chart', name: 'Pie Chart'},
                  {id: 'Discretebar Chart', name: 'Discretebar Chart'},
                ]
              };
            });

        // form submit handler
        $scope.submit = function() {
          var query_data = composeQuery($scope.keywords, $scope.condition.aggregationSelect, 8);

          $http.post('http://localhost:3000/documents/msearch', query_data)
              .success(function(data, status, headers, config) {
                switch ($scope.condition.diagramSelect) {
                  case 'Pie Chart':
                    $scope.options = composePieChartOptions();
                    $scope.data = composePieChartData(data.responses[0].aggregations);
                    break;
                  case 'Discretebar Chart':
                    $scope.options = composeDiscretebarChartOptions();
                    $scope.data= composeDiscretepieChartData(data.responses[0].aggregations);
                    break;
                }
              });
        }
      })


});

function composeQuery(keywords, field, size) {
  return {
    "query_body": [
      {
        "index": "public_toilets",
        "type": "logs"
      },
      {
        "size": 0,
        "query": {
          "query_string": {
            "query": keywords,
            "analyze_wildcard": true
          }
        },
        "aggs": {
          "2": {
            "terms": {
              "field": field,
              "size": size,
              "order": {
                "_count": "desc"
              }
            }
          }
        }
      }
    ]
  };
}

