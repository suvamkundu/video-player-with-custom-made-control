var currentPage=1;
function PageRender(idx){
      var num=parseInt(idx);
      num-=1;
      if(num>=tocData.length)
      {
        alert("wrong input");
      }
      else {
        currentPage=num+1;
        $("video").attr("src",tocData[num].video);
        $("video").attr("poster",tocData[num].poster);
		    console.log($("video").attr("poster"));
        $("#videoDesc").html(tocData[num].videoName);
      }
      disableButton();
};

//getting the next page index
function next(){
    $("#next").on('click',function(){
        currentPage++;
        PageRender(currentPage);
        disableButton();
        //console.log(currentPage);
        initialise();
        buttonPlay.classList.remove('glyphicon-pause');
  			buttonPlay.classList.add('glyphicon-play');
     });

};
//getting the previous page index
function prev(){
    $("#prev").on('click',function(){
        currentPage--;
        PageRender(currentPage);
         disableButton();
        // console.log(currentPage);
        initialise();
        buttonPlay.classList.remove('glyphicon-pause');
  			buttonPlay.classList.add('glyphicon-play');
     });

};
//making next and prev button disabled
function disableButton(){
    if(currentPage == 1){
        $('#prev').attr('disabled','true');
        $('#next').removeAttr('disabled');
    }
    else if(currentPage == tocData.length){
      $('#next').attr("disabled","disabled");
      $('#prev').removeAttr("disabled");
    }else{
        $('#next').removeAttr('disabled');
          $('#prev').removeAttr("disabled");
    }
};


var tocData = [];
var getData = function(dataUrl) {
  return $.ajax({
    url: dataUrl,
    type:"GET",
    success:function(data,satus,xhr){
      return data;
     }
  });
};

$(document).ready(function() {
   var x = getData("iframes/videoInfo.json");
   x.then(function(resp) {  //try
    tocData = resp;
    bindEventsAndLoadBookMarks();
   })
   .catch(function(err){  //catch
    console.log(err);
   })

   function bindEventsAndLoadBookMarks() {
     next();
     prev();
     disableButton();
   }

   $(document).ready(function(){
     $('[data-toggle="tooltip"]').tooltip();
   });

});
