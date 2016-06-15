window.onload = function(){
  var x = document.getElementById('submit');
  x.addEventListener('click', function(e){
    var z = document.getElementById('location');
    var address2 = z.value.split(" ");
    for (var i =0; i< address2.length; i++){
       if (address2[i].length === 5){
       var zipcode = address2[i];
     }
   }
   window.localStorage.setItem('zipcode', zipcode)
  });
  }
