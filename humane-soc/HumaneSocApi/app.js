var md5 = require('md5');
window.onload = function(){
  var hashToken = bcrypt.hashSync();
  var x = document.getElementById('click');
  var key = 'key=6bed824d0eff95a80bc97183e9046459';
  var secret = 'f4c69a1384251502c8778c8b808c4b69';
  var keySecret = secret + key;
  var signature = 'b5fef0a8fc1eaeafd813c4b385cafb47';
  var token = 'e7eec834ba1b3988fe88d7d60c784edf';
  console.log(keySecret);
  x.addEventListener('click', function(){
  $.ajax({
    url: 'http://api.petfinder.com/shelter.find?format=json&key=6bed824d0eff95a80bc97183e9046459&token=e7eec834ba1b3988fe88d7d60c784edf&location=80304&callback=',
    method: "GET",
    success: function(result){
      console.log(result);
    }
  });
})
}
