// Controller
ElasticApp.controller('stateController', function ($scope, $http, host, index, type) {

  $http.post('http://localhost:3000/authenticate', {name: 'testuser', pass: '12345'})
      .success(function(data, status, headers, config) {
        var token = data.token;
        $http.defaults.headers.common['Accept'] = 'application/json';
        $http.defaults.headers.common.Authorization = 'Bearer ' + token;
        var query_data = composeQuery('*', 'State', 8, index, type);
        $http.post(host+'/documents/msearch', query_data)
            .success(function(data, status, headers, config) {
              $scope.paneName = 'Toilets by State';
              $scope.toiletsState = data;
              $scope.error = null;

              // Compose pie chart using D3
              $scope.options = composePieChartOptions();

              var aggregations = data.responses[0].aggregations;
              $scope.data = composePieChartData(aggregations);
            });
      })
});
