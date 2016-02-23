// Controller
ElasticApp.controller('clusterController', function ($scope, $http, host) {

  $http.post(host+'/authenticate', {name: 'testuser', pass: '12345'})
      .success(function(data, status, headers, config) {
        var token = data.token;
        $http.defaults.headers.common['Accept'] = 'application/json';
        $http.defaults.headers.common.Authorization = 'Bearer ' + token;
        $http.get(host+'/documents/status')
            .success(function(data, status, headers, config) {
              $scope.paneName = 'Cluster State';
              $scope.clusterState = data;
              $scope.error = null;
            });
      })

});
