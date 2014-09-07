"use strict"

###
@ngdoc function
@name <%= scriptAppName %>.controller:ChatCtrl
@description
# ChatCtrl
A demo of using AngularFire to manage a synchronized list.
###
angular.module("<%= scriptAppName %>").controller "ChatCtrl", ($scope, fbutil, $timeout, simpleLogin) ->

  init()

  alert = (msg) ->
    $scope.err = msg
    $timeout (->
      $scope.err = null
    ), 5000

  init = () ->
    # synchronize a read-only, synchronized array of messages, limit to most recent 10
    $scope.messages = fbutil.syncArray("messages", limit: 10)

    # display any errors
    $scope.messages.$loaded().then null, alert

    simpleLogin.getUser().then (user) =>
      if user
        $scope.user = user.username || user.displayName || user.email


  # provide a method for adding a message
  $scope.addMessage = (newMessage, user) ->
    if newMessage

      # push a message to the end of the array
      $scope.messages.$add(text: newMessage, user: user).then null, alert
