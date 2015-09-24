angular.module('app')
    .factory('gitHubApi', function ($http) {
        return {
            getUser: function (user) {
                return $http.get('https://api.github.com/users/' + user);
            },
            getRepo: function (repo) {
                return $http.get('https://api.github.com/users/' + repo);
            },
        }
    })
    .controller('SearchCtrl', ['$http', '$timeout', 'gitHubApi', function ($http, $timeout, gitHubApi) {
        var timer;

        vm = this;
        vm.user = 'johnpapa';
        vm.repoUrl = vm.user + '/repos';
        vm.focus = (vm.user) ? true : false;

        vm.getUser = function () {
            gitHubApi.getUser(vm.user)
                .then(vm.onUserComplete, vm.onError);
        }

        vm.getRepo = function () {
            gitHubApi.getRepo(vm.repoUrl)
                .then(vm.onComplete, vm.onError);
        }
        vm.getUser();

        vm.onClick = function (scope) {
            console.log(scope);
            vm.seeDetails = !vm.seeDetails;
            vm.details = scope;
        }

        vm.keyupSearch = function () {
            $timeout.cancel(timer);
            timer = $timeout(function () {
                if (vm.user) {
                    vm.getUser();
                }
            }, 1000);
        };

        vm.back = function () {
            vm.seeDetails = false;
        };

        vm.onError = function () {
            $(document.body).ec_alertsToaster({
                message: 'error reading data',
                type: 'state-warning',
                toastLife: 3000
            });
        }

        vm.onComplete = function (response) {
            $(document.body).ec_alertsToaster({
                message: 'data successful loaded',
                type: "state-success",
                toastLife: 2000
            });
            vm.feeds = response.data;

        }

        vm.onUserComplete = function (response) {
            $(document.body).ec_alertsToaster({
                message: 'user loaded',
                type: "state-success",
                toastLife: 2000
            });
            vm.userdata = response.data;
            vm.seeDetails = false;
            vm.repoUrl = vm.user + '/repos';
            vm.getRepo();

        }

        vm.setFocus = function () {
            vm.focus = true;
        };
        vm.setBlur = function () {
            if (vm.user == "") {
                vm.focus = false;
            }
        };

        vm.getUser();
    }])
    .directive('resultSection', function () {
        return {
            restrict: "A",
            scope: {
                block: "=",
                onClick: "&onClick"
            },
            templateUrl: 'App/Search/section.html'
        };
    });
