window.onload = function(){
  var x = document.getElementById('humaneSoc');
  x.addEventListener('click', function(){
    $.ajax({
      dataType: 'jsonp',
      url: 'http://api.petfinder.com/shelter.find?format=json&key=6bed824d0eff95a80bc97183e9046459&location=80304',
      // &token=e7eec834ba1b3988fe88d7d60c784edf&location=80304&callback=
      method: "GET",
      success: function(result){
        var result2 = result.petfinder.shelters.shelter;
          $('#address1').append(result2[0].name.$t + "<br>" + result2[0].address1.$t + "<br>" + result2[0].city.$t + "<br>" + result2[0].state.$t + "<br>" + result2[0].zip.$t + "<br>" + result2[0].phone.$t + "<br>" + result2[0].email.$t + "<br>");
          $('#address2').append(result2[1].name.$t + "<br>" + result2[1].address1.$t + "<br>" + result2[1].city.$t + "<br>" + result2[1].state.$t + "<br>" + result2[1].zip.$t + "<br>" + result2[1].phone.$t + "<br>" + result2[1].email.$t + "<br>");
          $('#address3').append(result2[2].name.$t + "<br>" + result2[2].address1.$t + "<br>" + result2[2].city.$t + "<br>" + result2[2].state.$t + "<br>" + result2[2].zip.$t + "<br>" + result2[2].phone.$t + "<br>" + result2[2].email.$t + "<br>");
      }
    });
  })
  }
