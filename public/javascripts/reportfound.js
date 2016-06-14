window.onload = function(){
  var x = document.getElementById('humaneSoc');
  x.addEventListener('click', function(){
    $.ajax({
      dataType: 'jsonp',
      url: 'http://api.petfinder.com/shelter.find?format=json&key=6bed824d0eff95a80bc97183e9046459',

      // &token=e7eec834ba1b3988fe88d7d60c784edf&location=80304&callback=
      method: "GET",
      success: function(result){
        console.log(result);
      }
    });
  })
  }
