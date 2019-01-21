var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "index.html",
            controller: "indexCtrl"
        })
        .when("/detail-survey", {
            templateUrl : "pages/detailSurvey.html"
        })
        .when("/detail-competition", {
            templateUrl : "pages/detailCompetition.html",
            controller: "detailCompCtrl"
        })
        .when("/faq", {
            templateUrl : "pages/FAQ-page.html",
            controller: "faqCtrl"
        })
        .when("/ep", {
            templateUrl : "pages/EP.html",
        })
        .when("/support", {
            templateUrl : "pages/support.html"
        })
        .when("/login", {
            templateUrl : "pages/login.html",
            controller: "loginCtrl"
        })
        .when("/register", {
            templateUrl : "pages/register.html",
            controller: "registerCtrl"
        })
        .when("/competition", {
            templateUrl : "pages/competitions.html",
            controller: "competitionCtrl"
        })
        .when("/survey", {
            templateUrl : "pages/surveys.html",
            controller: "surveyCtrl"
        });
});

//index controller
app.controller("indexCtrl", function ($scope, $location, $http) {
    if (!Cookies.get('access-token') && !sessionStorage.accessToken) {
        Swal(
            'Please login!',
            'You need to login to see the page content',
            'warning'
        );
        $location.path('/login')
    }

    $http({
        method: 'GET',
        url: "",
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
    }, function errorCallback(response) {
        console.log(response)
    });

    $scope.surveys = [
        {
            "title" : "Global Environmental Caring",
            "description" : "Online survey asks : Do we really care about the environment?",
            "image" : "https://www.evangelicalfellowship.ca/getmedia/8700f1c9-6d9a-4821-a3c2-cd5e801ac734/Topic-Environment-Banner.jpg.aspx?width=690&height=400&ext=.jpg"
        },
        {
            "title" : "Global Environmental Issues",
            "description" : "Survey on Global Environmental Issues",
            "image" : "https://www.incimages.com/uploaded_files/image/970x450/getty_517129164_279516.jpg"
        },
        {
            "title" : "Global Environmental Bullshit",
            "description" : "Survey on Global Environmental Bullshit lol asdew2%^$^&TGuyhgbfuasf",
            "image" : "https://www.incimages.com/uploaded_files/image/970x450/getty_517129164_279516.jpg"
        }
    ];
    $scope.competitions = [
        {
            "title" : "Environmental Caring competition",
            "description" : "This is a competition about environmental caring",
            "image" : "https://www.competitionsciences.org/wp-content/uploads/2017/12/Everyday-Young-Heroes-banner.png.jpg"
        },
        {
            "title" : "Environmental Caring competition",
            "description" : "This is a competition about environmental caring",
            "image" : "https://www.competitionsciences.org/wp-content/uploads/2017/12/Everyday-Young-Heroes-banner.png.jpg"
        },
        {
            "title" : "Environmental Caring competition",
            "description" : "This is a competition about environmental caring",
            "image" : "https://www.competitionsciences.org/wp-content/uploads/2017/12/Everyday-Young-Heroes-banner.png.jpg"
        }
    ]
});

//survey controller
app.controller("surveyCtrl", function ($scope, $location, $http) {
    // if (!Cookies.get('access-token') && !sessionStorage.accessToken) {
    //     Swal(
    //         'Please login!',
    //         'You need to login to see the page content',
    //         'warning'
    //     );
    //     $location.path('/login')
    // }

    $scope.totalPage = 3;
    $scope.is = [];
    for (var i= 1; i<=$scope.totalPage; i++) {
        $scope.is.push(i)
    }
    if (window.location.href.split("?page=")[1]) {
        $scope.page = parseInt(window.location.href.split("?page=")[1]);
    }
    else {$scope.page = 1}

    $http({
        method: 'GET',
        url: "",
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
    }, function errorCallback(response) {
        console.log(response)
    });
    $scope.surveys = [
        {
            "title" : "Global Environmental Caring",
            "description" : "Online survey asks : Do we really care about the environment?",
            "image" : "https://www.evangelicalfellowship.ca/getmedia/8700f1c9-6d9a-4821-a3c2-cd5e801ac734/Topic-Environment-Banner.jpg.aspx?width=690&height=400&ext=.jpg"
        },
        {
            "title" : "Global Environmental Issues",
            "description" : "Survey on Global Environmental Issues",
            "image" : "https://www.incimages.com/uploaded_files/image/970x450/getty_517129164_279516.jpg"
        },
        {
            "title" : "Global Environmental Bullshit",
            "description" : "Survey on Global Environmental Bullshit lol asdew2%^$^&TGuyhgbfuasf",
            "image" : "https://www.incimages.com/uploaded_files/image/970x450/getty_517129164_279516.jpg"
        }
    ]
});

//competition controller
app.controller("competitionCtrl", function ($scope, $location) {
    // if (!Cookies.get('access-token') && !sessionStorage.accessToken) {
    //     Swal(
    //         'Please login!',
    //         'You need to login to see the page content',
    //         'warning'
    //     );
    //     $location.path('/login')
    // }

});

//competition detail controller
app.controller("detailCompCtrl", function ($scope) {
    $scope.active = 1;

});

//FAQ controller
app.controller("faqCtrl", function ($scope) {
    $scope.faqs = [
        {
            "question" : "Are u gay?",
            "answer" : "http://content.sweetim.com/sim/cpie/emoticons/0002011A.gif"
        },
        {
            "question" : "Do u like jav?",
            "answer" : "http://javhd.pro/"
        },
        {
            "question" : "what can i help u?",
            "answer" : "http://www.lmao.com/"
        }
    ];
    $scope.search = null;
});

//register controller
app.controller("registerCtrl", function ($scope, $http, $location) {
    if (Cookies.get('access-token')) {
        $location.path('/')
    }
    if (sessionStorage.accessToken) {
        $location.path('/')
    }

    $scope.member = {
        "username": "",
        "password": "",
        "name":"",
        "numberID": "",
        "job": "",
        "class": "",
        "seciton": "",
        "timejoin": "",
        "email": "",
        "phone": ""
    };

    $scope.register = function () {
        if ($scope.lrform.$valid) {
            $http({
                method: 'POST',
                url: 'https://projectsurvey20190107023309.azurewebsites.net/api/register',
                data: $scope.member
            }).then(function successCallback(response) {
                Swal(
                    'Register successfully!',
                    'Please check your email when accepted.',
                    'success'
                );
                lrform.reset();
            }, function errorCallback(response) {
                console.log(response)
            });
        }
    }

});

//login controller
app.controller('loginCtrl', function($scope, $http, $location) {
    if (Cookies.get('access-token')) {
        $location.path('/')
    }
    if (sessionStorage.accessToken) {
        $location.path('/')
    }

    $scope.memberL = {
        "username": "",
        "password": ""
    };

    $scope.rmbme = false;
    $scope.rmbmeF = function () {
        $scope.rmbme = !$scope.rmbme;
    };

    $scope.login = function () {
        if ($scope.loginform.$valid) {
            $http({
                method: 'POST',
                url: 'https://projectsurvey20190107023309.azurewebsites.net/api/login',
                data: $scope.memberL
            }).then(function successCallback(response) {
                if ($scope.rmbme === true) {
                    Cookies.set('access-token', response.data.data.accessToken);
                    Cookies.set('username', response.data.data.username);
                }
                else {
                    sessionStorage.accessToken = response.data.data.accessToken;
                    sessionStorage.username = response.data.data.username;
                }
            }, function errorCallback(response) {
                Swal(
                    'Login fail!',
                    response.data.message,
                    'error'
                );
                $scope.fLogin = true;
                console.log(response)
            }).then(function () {
                if (!$scope.fLogin)  {
                    location.reload();
                }
            })
        }
    }
});

//component navbar
app.component('navbar', {
    templateUrl: 'navbar.html',
    controller: function ($scope) {
        $scope.cusername = Cookies.get('username');
        $scope.ctoken = Cookies.get('access-token');

        $scope.susername = sessionStorage.username;
        $scope.stoken = sessionStorage.accessToken;
        
        $scope.logout = function () {
            if ($scope.ctoken) {
                Cookies.remove('access-token', { path: '/' });
                Cookies.remove('username', { path: '/' });
            }
            if ($scope.stoken) {
                sessionStorage.removeItem("accessToken");
                sessionStorage.removeItem("username");
            }
            location.reload();
        }
    }
});