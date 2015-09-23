﻿angular.module('app')
    .controller('SearchCtrl', ['$http','$timeout', function ($http, $timeout) {
        var timer;

        vm = this;
        vm.user = 'johnpapa';
        
        vm.onError = function() {
            $(document.body).ec_alertsToaster({
                message: 'error reading data',
                type: 'state-warning',
                toastLife: 3000
            });
        }

        vm.onUserComplete = function (response) {
            $(document.body).ec_alertsToaster({
                message: 'user loaded',
                type: "state-success",
                toastLife: 2000
            });
            var userdata = response.data;
            vm.avatar = userdata.avatar_url;
            vm.username = userdata.name;
        }

        vm.getUser = function () {
            vm.userUrl = 'https://api.github.com/users/' + vm.user;
            return $http.get(vm.userUrl)
                .then(vm.onUserComplete, vm.onError);
        }

        vm.getUser();

    }]);