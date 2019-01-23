var app = angular.module("myApp", ["ngRoute"]);
var j = jQuery.noConflict();
app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "index.html",
            controller: "indexCtrl"
        })
        .when("/detail-survey/:id", {
            templateUrl : "pages/detailSurvey.html",
            controller: "detailSurCtrl"
        })
        .when("/detail-competition/:id", {
            templateUrl : "pages/detailCompetition.html",
            controller: "detailCompCtrl"
        })
        .when("/faq", {
            templateUrl : "pages/FAQ-page.html",
            controller: "faqCtrl"
        })
        .when("/ep", {
            templateUrl : "pages/detailEP.html",
            controller: "epCtrl"
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
    var url = ""; var auth = ""; var userId;
    if (!Cookies.get('access-token') && !sessionStorage.accessToken) {
        url = "https://projectsurvey20190122034118.azurewebsites.net/api/Surveys";
    }
    else {
        url = "https://projectsurvey20190122034118.azurewebsites.net/api/Surveys/Role";
        if (Cookies.get('access-token')) {
            auth = Cookies.get('access-token')
        }
        if (sessionStorage.accessToken) {
            auth = sessionStorage.accessToken
        }
    }
    if (Cookies.get('userId')) {
        userId = Cookies.get('userId')
    }
    if (sessionStorage.userId) {
        userId = sessionStorage.userId
    }

    var q = new Date();
    var m = q.getMonth();
    var d = q.getDay();
    var y = q.getFullYear();
    var date = new Date(y,m,d);
    $scope.std = 0;
    $scope.hasP = 0;
    $scope.surveys = [];
    if (Cookies.get('access-token'))  {
        var auth = Cookies.get('access-token');
    }
    $http({
        method: 'GET',
        url: url,
        headers: {
            'Authorization': 'Bearer ' + auth
        },
    }).then(function successCallback(response) {
        $scope.surveysAll = response.data;
        if ($scope.surveysAll.length > 6) {
            for (var i=0; i<6; i++) {
                $scope.surveys.push($scope.surveysAll[i]);
                $scope.surveys = $scope.surveys.reverse();
            }
        }
        else {
            $scope.surveys = $scope.surveysAll
        }
        $scope.surveysAll.forEach(function (e) {
            if (new Date(e.end) > date) {
                $scope.std++
            }
        });
    }, function errorCallback(response) {
        console.log(response)
    });
    $http({
        method: 'GET',
        url: "https://projectsurvey20190122034118.azurewebsites.net/api/competions",
    }).then(function successCallback(response) {
        $scope.competitions = response.data;
    }, function errorCallback(response) {
        console.log(response)
    });
    $http({
        method: 'GET',
        url: "https://projectsurvey20190122034118.azurewebsites.net/api/points/users/" + userId,
    }).then(function successCallback(response) {
        $scope.hasP = response.data.length;
    }, function errorCallback(response) {
        console.log(response)
    });

    $scope.checklogin = function (id) {
        if (!Cookies.get('access-token') && !sessionStorage.accessToken) {
            Swal.fire(
                'Please login!',
                'You need to login to see the page content',
                'warning'
            );
            $location.path('/login')
        }
        else {
            $location.path('/detail-survey/' + id);
        }
    }
});

//survey controller
app.controller("surveyCtrl", function ($scope, $location, $http) {
    // if (!Cookies.get('access-token') && !sessionStorage.accessToken) {
    //     Swal.fire(
    //         'Please login!',
    //         'You need to login to see the page content',
    //         'warning'
    //     );
    //     $location.path('/login')
    // }
    var auth = "";
    if (Cookies.get('access-token')) {
        auth = Cookies.get('access-token')
    }
    if (sessionStorage.accessToken) {
        auth = sessionStorage.accessToken
    }
    $scope.surveys = [];
    $http({
        method: 'GET',
        url: "https://projectsurvey20190122034118.azurewebsites.net/api/Surveys/role",
        headers: {
            'Authorization': 'Bearer ' + auth
        },
    }).then(function successCallback(response) {
        // console.log(response);
        $scope.totalPage = Math.ceil(response.data.length/6);
        $scope.is = [];
        for (var i= 1; i<=$scope.totalPage; i++) {
            $scope.is.push(i)
        }
        if (window.location.href.split("?page=")[1]) {
            $scope.page = parseInt(window.location.href.split("?page=")[1]);
            $scope.surveys = [];
        }
        else {$scope.page = 1}
        for (var j=($scope.page-1)*6; j<$scope.page*6 && j<response.data.length; j++) {
            $scope.surveys.push(response.data[j]);
        }
    }, function errorCallback(response) {
        console.log(response)
    });
    $scope.detailS = function (id) {
        $location.path('/detail-survey/' + id);
    }
});

//survey detail controller
app.controller("detailSurCtrl", function ($scope, $location, $http) {
    if (window.location.href.split("?page=")[1]) {
        window.location.href = window.location.href.replace("?page=" + window.location.href.split("?page=")[1], "")
    }
    var userId;
    if (Cookies.get('userId')) {
        userId = Cookies.get('userId')
    }
    if (sessionStorage.userId) {
        userId = sessionStorage.userId
    }
    $http({
        method: 'GET',
        url: "https://projectsurvey20190122034118.azurewebsites.net/api/Questions/users/" + userId + "/Surveys/" + window.location.href.split("detail-survey/")[1],
    }).then(function successCallback(response) {
        if (response.data.length === 0) {
            $http({
                method: 'GET',
                url: "https://projectsurvey20190122034118.azurewebsites.net/api/Questions/Surveys/" + window.location.href.split("detail-survey/")[1],
            }).then(function successCallback(response) {
                // console.log(response);
                $scope.questions = response.data;
            }, function errorCallback(response) {
                console.log(response)
            });

            $scope.sbm = function () {
                if (j("input[type='radio']:checked").length === $scope.questions.length){
                    var point = 0;
                    for (var i=0; i<j("input[type='radio']:checked").length; i++) {
                        if (j("input[name='" + $scope.questions[i].id + "']:checked").val()===$scope.questions[i].answer) {
                            point++
                        }
                    }
                    $http({
                        method: 'POST',
                        url: "https://projectsurvey20190122034118.azurewebsites.net/api/points",
                        data: {
                            "UserId": userId,
                            "SurveyId": parseInt(window.location.href.split("detail-survey/")[1]),
                            "TotalScore": point
                        }
                    }).then(function successCallback(response) {
                        Swal.fire({
                                title: "Successfully!",
                                text: "Your score: " + point,
                                type: "success",
                                confirmButtonText: 'OK'
                            }).then(
                            function () { location.reload() },
                            function () { return false; });
                    }, function errorCallback(response) {
                        console.log(response)
                    });
                }
                else {
                    alert("Nào k troll")
                }
            }
        }
        else {
            $scope.alrSbm = "You have already submitted this survey."
        }
    }, function errorCallback(response) {
        console.log(response)
    });

});

//competition controller
app.controller("competitionCtrl", function ($scope, $location, $http) {
    // if (!Cookies.get('access-token') && !sessionStorage.accessToken) {
    //     Swal.fire(
    //         'Please login!',
    //         'You need to login to see the page content',
    //         'warning'
    //     );
    //     $location.path('/login')
    // }
    $scope.competitions = [];
    $http({
        method: 'GET',
        url: "https://projectsurvey20190122034118.azurewebsites.net/api/competions",
    }).then(function successCallback(response) {
        $scope.totalPage = Math.ceil(response.data.length/6);
        $scope.is = [];
        for (var i= 1; i<=$scope.totalPage; i++) {
            $scope.is.push(i)
        }
        if (window.location.href.split("?page=")[1]) {
            $scope.page = parseInt(window.location.href.split("?page=")[1]);
            $scope.competitions = [];
        }
        else {$scope.page = 1}
        for (var j=($scope.page-1)*6; j<$scope.page*6 && j<response.data.length; j++) {
            $scope.competitions.push(response.data[j]);
        }
    }, function errorCallback(response) {
        console.log(response)
    });
    $scope.detailS = function (id) {
        $location.path('/detail-competition/' + id);
    }
});

//competition detail controller
app.controller("detailCompCtrl", function ($scope, $http) {
    $scope.active = 1;
    $scope.competition = [];

    $http({
        method: 'GET',
        url: "https://projectsurvey20190122034118.azurewebsites.net/api/competions/" + window.location.href.split("detail-competition/")[1],
    }).then(function successCallback(response) {
        $scope.competition = response.data;
        document.getElementById("detail-comp-banner").style.background = "url('" + response.data.bigImage + "') no-repeat center";
        document.getElementById("title-competition").style.background = "#FFFFFF url('" + response.data.smallImage + "') no-repeat center";
    }, function errorCallback(response) {
        console.log(response)
    });
});

//FAQ controller
app.controller("faqCtrl", function ($scope, $http) {
    $scope.faqs = [];
    $http({
        method: 'GET',
        url: "https://projectsurvey20190122034118.azurewebsites.net/api/faqs",
    }).then(function successCallback(response) {
        // console.log(response);
        $scope.faqs = response.data;
    }, function errorCallback(response) {
        console.log(response)
    });

    $scope.search = null;
    $scope.toggleAns = function (e) {
        document.getElementById(e).hidden = !document.getElementById(e).hidden;
    }
});

//effective participation controller
app.controller("epCtrl", function ($scope) {
    $scope.questions = [
        {
            "QuestionText":"What are the seminars conducted by this survey admin?",
            "QuestionId":"1"
        },
        {
            "QuestionText":"Where was the seminar held?",
            "QuestionId":"2"
        },
        {
            "QuestionText":"How many people participating in the seminar?",
            "QuestionId":"3"
        },
        {
            "QuestionText":"When did the seminar begin?",
            "QuestionId":"4"
        },
        {
            "QuestionText":"Who is Emiri Suzuhara?",
            "QuestionId":"5"
        }
    ]
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
                url: 'https://projectsurvey20190122034118.azurewebsites.net/api/register',
                data: $scope.member
            }).then(function successCallback(response) {
                Swal.fire(
                    'Register successfully!',
                    'Please check your email when accepted.',
                    'success'
                );
                lrform.reset();
            }, function errorCallback(response) {
                Swal.fire(
                    'Login fail!',
                    response.data.message,
                    'error'
                );
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
                url: 'https://projectsurvey20190122034118.azurewebsites.net/api/login',
                data: $scope.memberL
            }).then(function successCallback(response) {
                if ($scope.rmbme === true) {
                    Cookies.set('access-token', response.data.data.accessToken);
                    Cookies.set('username', response.data.data.username);
                    Cookies.set('userId', response.data.data.id);
                }
                else {
                    sessionStorage.accessToken = response.data.data.accessToken;
                    sessionStorage.username = response.data.data.username;
                    sessionStorage.userId = response.data.data.id;
                }
            }, function errorCallback(response) {
                Swal.fire(
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
