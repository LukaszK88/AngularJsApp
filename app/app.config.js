'use strict';

angular.module('myApp').
    config(
        function(
            $locationProvider,
            $routeProvider,
            $httpProvider,
            $authProvider

            ){
                $locationProvider.html5Mode(true);
                //$httpProvider.interceptors.push('AuthInterceptors');
            //$authProvider.httpInterceptor = false;

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





            $routeProvider.
                    when("/", {template:"<home></home>"}).
                    when("/ranking", {template:"<ranking-nav></ranking-nav><table-all></table-all>"}).
                    when("/ranking/bohurt", {template:"<ranking-nav></ranking-nav><table-bohurt></table-bohurt>"}).
                    when("/register", {
                        templateUrl:'app/templates/register.template.html',
                         controller: 'SignupCtrl'
                    }).
                    when("/login", {templateUrl:'app/templates/login.template.html'}).
                    otherwise({template: "not found"})

});