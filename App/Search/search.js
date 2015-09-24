angular.module('app')
    .controller('SearchCtrl', ['$http','$timeout', function ($http, $timeout) {
        var timer;

        vm = this;
        vm.user = 'johnpapa';
        vm.focus = (vm.user) ? true : false;
        
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

            getRepo();
        }

        vm.onComplete = function (response) {
            $(document.body).ec_alertsToaster({
                message: 'data successful loaded',
                type: "state-success",
                toastLife: 2000
            });
            vm.feeds = response.data;
        }

        vm.getUser = function () {
            vm.userUrl = 'https://api.github.com/users/' + vm.user;
            return $http.get(vm.userUrl)
                .then(vm.onUserComplete, vm.onError);
        }
        var getRepo = function () {
            vm.repoUrl = 'https://api.github.com/users/' + vm.user + '/repos';
            return $http.get(vm.repoUrl)
                .then(vm.onComplete, vm.onError);
        }

        vm.getUser();

        vm.setFocus = function () {
            vm.focus = true;
        };
        vm.setBlur = function () {
            if (vm.user == "") {
                vm.focus = false;
            }
        };

    }])
    .directive('resultSection', function () {
        return {
            restrict: "A",
            scope: {
                block: "="
            },
            templateUrl: 'App/Search/section.html'
        };
    });
