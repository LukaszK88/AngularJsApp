
/// <reference path="_all.ts" />
/// <reference path="components/ranking/tableAllController.ts" />
angular.module('myApp').config(['$stateProvider', '$locationProvider', '$authProvider',
    function routes($stateProvider: any,
                    $locationProvider: ng.ILocationProvider,
                    $authProvider: any

    ) {
        $authProvider.facebook({
                clientId: '1884018281856728'
            });

            $authProvider.google({
                clientId: '230761834733-cn34419a1ftkee8lgha90ija7nvckks6.apps.googleusercontent.com'
            });


            $authProvider.baseUrl = '/';
            $authProvider.loginUrl = 'http://127.0.0.1:8000/api/fighters/authenticate';
            $authProvider.signupUrl = 'http://127.0.0.1:8000/api/fighters/store';
            $authProvider.tokenPrefix = '';
            $authProvider.tokenName = 'token';
            $authProvider.storageType = 'localStorage';


// Facebook
            $authProvider.facebook({
                name: 'facebook',
                url: 'http://127.0.0.1:8000/api/login/facebook',
                authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
                redirectUri: window.location.origin + '/',
                requiredUrlParams: ['display', 'scope'],
                scope: ['email'],
                scopeDelimiter: ',',
                display: 'popup',
                oauthType: '2.0',
                popupOptions: { width: 580, height: 400 }
            });

            // Google
            $authProvider.google({
                url: 'http://127.0.0.1:8000/api/login/google',
                authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
                redirectUri: window.location.origin,
                requiredUrlParams: ['scope'],
                optionalUrlParams: ['display'],
                scope: ['profile', 'email'],
                scopePrefix: 'openid',
                scopeDelimiter: ' ',
                display: 'popup',
                oauthType: '2.0',
                popupOptions: { width: 452, height: 633 }
            });
        $locationProvider.html5Mode(true);

        $stateProvider
            .state('index', <any>{
            url: "/",
           templateUrl:'app/templates/home.template.html'
        })

            .state("ranking", <any>{
                url: "/ranking",
                templateUrl:'app/components/ranking/ranking.html',
                controller: 'myApp.ranking.TableAllController',
                controllerAs: 'ranking'
            })
            .state("fighterDetail", <any>{
                url: "/fighters/:fighterId",
                templateUrl:'app/components/fighter/fighterDetail.template.html',
                controller: 'myApp.FighterCtrl',
                controllerAs: 'fighterCtrl'
            })
            // .state("bohurt", <any>{
            //     url: "/ranking/bohurt",
            //     templateUrl:'app/components/ranking/ranking.html',
            //     controller: 'myApp.ranking.TableAllController',
            //     controllerAs: 'ranking'
            // })
            .state("register", {
                url: "/register",
                templateUrl:'app/templates/register.template.html',
                controller: 'myApp.SignupCtrl'
            }).
            state("login", <any>{
                url: "/login",
                    templateUrl:'app/templates/login.template.html'
                })

    }
]);
