  $(document).ready(function(){
      $(window).scroll (function () {
        $(".ft-card-img").removeClass("hidden").addClass("animated rubberBand");
      })

      //-----------------------------------//
      //-----------------------------------//
      //------------CodePlayer-------------//
      //-----------------------------------//
      //-----------------------------------//
      // Does the toggling of code containers

      $("#htmlButton").click(function(){
        $("#htmlLangContainer").toggle("clip", 500);
        })
      $("#cssButton").click(function(){
          $("#cssLangContainer").toggle("drop", 500);
        })
      $("#jsButton").click(function(){
          $("#jsLangContainer").toggle("fade", 500);
        })
      //-----------------------------toggling end----


      // styles the selected button in the header----------
      $(".active-toggle").click(function (){
          $(this).toggleClass("active");
      });
      // styles the focus on button in the header----------
      $(".focus-toggle").click(function (){
          $(this).toggleClass("focus");
      });

      // padding-top on body cause of the fixed-top navbar
      var fixedTopNavHeight = $("nav").height();
      $("body").css("padding-top", fixedTopNavHeight,"px");

      // console.log(fixedTopNavHeight);

      // On button CLICK
      $("#runButton").click(function() {

          var htmlCode = $("#htmlArea").val();

          // the css works on the entire doc so to append the id before the css so that it
          // takes form :  id element (or whatever) {...}
          var cssCode =  $("#cssArea").val() ;
          var jsCode = $("#jsArea").val();

          // Sets the content for the div wich will later be displayed in the iframe
           $("#htmlResultDiv").html(htmlCode);

          //  fonts for Iframe
           var iframeFonts =' <link href="https://fonts.googleapis.com/css?family=Titillium+Web:400,400italic" rel="stylesheet" type="text/css">  <link href="https://fonts.googleapis.com/css?family=Open+Sans:600italic,600" rel="stylesheet" type="text/css"> ' ;

           var resultDiv = iframeFonts + ' <style>  '+ cssCode + ' </style> <br> '+ $("#htmlResultDiv").html();

          // gets the value in resultDiv and puts it in  the srcdoc attr for iframe
          $("iframe").attr("srcdoc",resultDiv);


        })
      })
