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
              $scope.data = {
                repeatSelect: null,
                availableOptions: options,
              };
            });
      })

});
