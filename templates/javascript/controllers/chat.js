'use strict';
/**
 * @ngdoc function
 * @name <%= scriptAppName %>.controller:ChatCtrl
 * @description
 * # ChatCtrl
 * A demo of using AngularFire to manage a synchronized list.
 */
angular.module('<%= scriptAppName %>')
  .controller('ChatCtrl', function ($scope, fbutil, $timeout, simpleLogin) {

      init();

      // provide a method for adding a message
      $scope.addMessage = function(newMessage, user) {
        if( newMessage ) {
          // push a message to the end of the array
          $scope.messages.$add({text: newMessage, user: user})
            // display any errors
            .catch(alert);
        }
      };

      function alert(msg) {
        $scope.err = msg;
        $timeout(function() {
          $scope.err = null;
        }, 5000);
      }

      function init() {
        // synchronize a read-only, synchronized array of messages, limit to most recent 10
        $scope.messages = fbutil.syncArray('messages', {limit: 10});

        // display any errors
        $scope.messages.$loaded().catch(alert);

        simpleLogin.getUser().then(function(user) {
          if(user)
            $scope.user = user.username || user.displayName || user.email;
        });
      }
    });
