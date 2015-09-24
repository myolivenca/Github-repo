describe('app', function () {
    var scope,
    controller;

    beforeEach(function () {
        module('app');
    });

    describe('SearchCtrl', function () {
        beforeEach(inject(function ( $controller, $rootScope, $httpBackend) {
            vm = $rootScope.$new();

            controller = $controller('SearchCtrl', {
                '$scope': vm
            });

            $httpBackend.whenGET('https://api.github.com/users/' + vm.user)
                .respond({
                    'avatar_url': 'https://avatars.githubusercontent.com/u/1202528?v=3',
                    'name': 'John Papa'
                });
            $httpBackend.expectGET('https://api.github.com/users/' + vm.user);

            $httpBackend.whenGET('https://api.github.com/users/' + vm.repoUrl)
                .respond({ repo: 'repo1'},{ repo: 'repo2' });
            $httpBackend.expectGET('https://api.github.com/users/' + vm.repoUrl);
            
            
            $httpBackend.flush();
        }));

        it('sets the default name to johnpapa', function () {
            expect(vm.user).toBe('johnpapa');
        });

        it('get user data { \'avatar_url\': \'https://avatars.githubusercontent.com/u/1202528?v=3\', \'name\': \'John Papa\'}', function () {
            expect(vm.userdata).toEqual({
                'avatar_url': 'https://avatars.githubusercontent.com/u/1202528?v=3',
                'name': 'John Papa'
            });
        });
        it('get user avatar', function () {
            expect(vm.userdata.avatar_url).toEqual('https://avatars.githubusercontent.com/u/1202528?v=3');
        });

        it('get user name', function () {
            expect(vm.userdata.name).toEqual('John Papa');
        });

        it('get user repo list { repo: \'repo1\' }, { repo: \'repo2\' }', function () {
            expect(vm.feeds).toEqual({ repo: 'repo1' }, { repo: 'repo2' });
        });
    });
});

