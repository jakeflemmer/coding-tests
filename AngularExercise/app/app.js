(function() {
  var app = angular.module('inMarkitDemo', []);

  app.controller('tileController', ['$scope','$window','$http',function($scope,$window,$http){

     var tileController = this;

     this.setInstructionsMode = function (){

        tileController.mode = 'instructionsMode';

     };

     this.setDemoMode = function (){

        tileController.mode = 'demoMode';
        $http.get('json/mockData.json').success(function(data, status, headers, config) {
          console.log("mockData received success");

          tileController.jsonData = parseJsonFeed(data);

        });

     };

      this.setDemoMode();

  }]);




  app.directive("tile", function() {
    return {
      restrict: 'E',
      templateUrl: "app/directives/tile.html",

      link: function (scope, element, attrs) {

        $(element).click(function() {
            console.log("perform some action on click");
            if ( attrs.linkUrl && attrs.linkUrl.length > 0 )
            {
              var win = window.open(attrs.linkUrl, '_blank');
              win.focus();
            }
        });

        // on hover we unwrap the text and slide it up to its full height
        var footEl = $(element).find(".tile-footer");
        footEl.mouseover(function() {
            footEl.css({'white-space' : 'normal' });
            var fullHeight = footEl.outerHeight() * (-1);
            footEl.css({ 'margin-top' : fullHeight  + 50 + 'px' });

        });

        // on mouse out we reset back to one line of text
         footEl.mouseout(function() {
             var fullHeight = footEl.outerHeight() ;
             footEl.css({ 'margin-top' : 0 , 'white-space' : 'nowrap' , 'height' : fullHeight + 'px' });
         });

     }

    };
  });





  //---------------------------------------------------------------------------------------------------------------
  function parseJsonFeed(data){

    var parsedJson = [];
    data.marks.forEach(function(e) {
        parsedJson.push(e.IMI);
    });
    return parsedJson;
  }

  function validateJson(data){
    var parsedJson = [];
    data.forEach( function (e){
       if (e.Name && e.Name.length > 1)
       {
        parsedJson.push(e);
       }
    });
    return parsedJson;
  }


})();
