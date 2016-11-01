'use strict';

angular.module('confusionApp')

    .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function($scope, menuFactory, corporateFactory) {
        

        $scope.showDish = false;
        $scope.dishmessage = "Loading . . . .";
        $scope.dish = menuFactory.getDishes().get({id:0})
            .$promise.then(
               function(response){
                   $scope.dish = response;
                   $scope.showDish = true;
               },
               function(response){
                   $scope.dishmessage = "Error: "+response.status+" "+response.statusText;
               }
            );

        $scope.showLeader = false;
        $scope.leadermessage = "Loading . . . .";
        $scope.leader = corporateFactory.getLeaders().get({id:3})
            .$promise.then(
                function(response){
                    $scope.leader = response;
                    $scope.showLeader = true;
                },
                function(response){
                    $scope.leadermessage = "Error: "+response.status+" "+response.statusText;
                }
            );

        $scope.showPromotion = false;
        $scope.promomessage = "Loading . . . .";
        $scope.promo = menuFactory.getPromotion().get({id:0})
            .$promise.then(
                function(response){
                    $scope.promo = response;
                    $scope.showPromotion = true;
                },
                function(response){
                    $scope.promomessage = "Error: "+response.status+" "+response.statusText;
                }
            );
        
    }])

    .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {

        $scope.tab = 1;
        $scope.filtText = '';
        $scope.showDetails = false;
        $scope.showMenu = false;
        $scope.message = "Loading . . . .";

       $scope.dishes = menuFactory.getDishes().query(
           function(response){
               $scope.dishes = response;
               $scope.showMenu = true;
           },
           function(response){
               $scope.message = "Error: "+response.status+" "+ response.statusText;
           }
       );


        $scope.select = function(setTab) {
            $scope.tab = setTab;

            if (setTab === 2) {
                $scope.filtText = "appetizer";
            }
            else if (setTab === 3) {
                $scope.filtText = "mains";
            }
            else if (setTab === 4) {
                $scope.filtText = "dessert";
            }
            else {
                $scope.filtText = "";
            }
        };

        $scope.isSelected = function (checkTab) {
            return ($scope.tab === checkTab);
        };

        $scope.toggleDetails = function() {
            $scope.showDetails = !$scope.showDetails;
        };
    }])

    .controller('AboutController', ['$scope', 'menuFactory', 'corporateFactory', function($scope, menuFactory, corporateFactory) {

        $scope.showLeader = false;
        $scope.leadermessage = "Loading . . . .";
       $scope.leaders = corporateFactory.getLeaders().query(
           function(response){
               $scope.leaders = response;
               $scope.showLeader = true;
           },
           function(response){
               $scope.leadermessage = "Error: "+response.status+" "+response.statusText;
           }
       );

    }])


    .controller('ContactController', ['$scope', function($scope) {

        $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };

        var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];

        $scope.channels = channels;
        $scope.invalidChannelSelection = false;

    }])

    .controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope, feedbackFactory) {


        $scope.sendFeedback = function() {

            console.log($scope.feedback);

            if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                $scope.invalidChannelSelection = true;
                console.log('incorrect');
            }
            else {
                $scope.invalidChannelSelection = false;

                feedbackFactory.sendFeedback().save($scope.feedback);
                console.log($scope.feedback);

                $scope.feedbackForm.$setPristine();
                $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"", tel:{areaCode:"", number:""}, comments:"" };
                console.log($scope.feedback);
            }
        };
    }])

    .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

        $scope.showDish = false;
        $scope.message = "Loading . . . .";

        $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
            .$promise.then(
                function(response){
                    $scope.dish = response;
                    $scope.showDish = true;
                },
                function(response){
                    $scope.message = "Error: "+response.status+" "+response.statusText;
                }
            );

    }])

    .controller('DishCommentController', ['$scope', 'menuFactory', function($scope, menuFactory) {

        $scope.comm = {rating:"5", comment:"", author:"", date:"" };

        $scope.submitComment = function () {

            $scope.comm.date = new Date().toISOString();
            console.log($scope.comm);

            $scope.dish.comments.push($scope.comm);

            menuFactory.getDishes().update( {id:$scope.dish.id}, $scope.dish );

            $scope.commentForm.$setPristine();

            $scope.comm = {rating:"5", comment:"", author:"", date:""};
        };
    }])

;
