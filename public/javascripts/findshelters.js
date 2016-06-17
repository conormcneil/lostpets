$(document).ready(function(){
  window.localStorage.setItem('zipcode', ' ');
  var y = document.getElementById('humaneSoc');
  var x = document.getElementById('zip');
  y.addEventListener('click', function(){
    $('#address1').html('');
    $('#address2').html('');
    $('#address3').html('');
    window.localStorage.setItem('zipcode', x.value);
    $.ajax({
      dataType: 'jsonp',
      url: 'https://api.petfinder.com/shelter.find?format=json&key=6bed824d0eff95a80bc97183e9046459&location=' + localStorage.zipcode,
      method: "GET",
      success: function(result){
        var result2 = result.petfinder.shelters.shelter;

        if (result2[0].name.$t === undefined){
          result2[0].name.$t =
          "Not Found"
        };

        if (result2[0].address1.$t === undefined){
          result2[0].address1.$t =
          "Address not found."
        };

        if (result2[0].city.$t === undefined){
          result2[0].city.$t =
          "City Unknown"
        };

        if (result2[0].state.$t === undefined){
          result2[0].state.$t =
          "Not available in petfinder directory."
        };

        if (result2[0].zip.$t === undefined){
          result2[0].zip.$t =
          "Zip code not available."
        };

        if (result2[0].phone.$t === undefined){
          result2[0].phone.$t =
          "Phone or website unavailble"
        };

        if (result2[0].email.$t === undefined){
          result2[0].email.$t =
          "Email not known."
        };

        if (result2[1].name.$t === undefined){
          result2[1].name.$t =
          "Not Found"
        };

        if (result2[1].address1.$t === undefined){
          result2[1].address1.$t =
          "Address not found."
        };

        if (result2[1].city.$t === undefined){
          result2[1].city.$t =
          "City Unknown"
        };

        if (result2[1].state.$t === undefined){
          result2[1].state.$t =
          "Not available in petfinder directory."
        };

        if (result2[1].zip.$t === undefined){
          result2[1].zip.$t =
          "Zip code not available."
        };

        if (result2[1].phone.$t === undefined){
          result2[1].phone.$t =
          "Phone or website unavailble"
        };

        if (result2[1].email.$t === undefined){
          result2[1].email.$t =
          "Email not known."
        };

        if (result2[2].name.$t === undefined){
        result2[2].name.$t =
          "Not Found"
        };

        if (result2[2].address1.$t === undefined){
          result2[2].address1.$t =
          "Address not found."
        };

        if (result2[2].city.$t === undefined){
          result2[2].city.$t =
          "City Unknown"
        };

        if (result2[2].state.$t === undefined){
          result2[2].state.$t =
          "Not available in petfinder directory."
        };

        if (result2[2].zip.$t === undefined){
          result2[2].zip.$t =
          "Zip code not available."
        };

        if (result2[2].phone.$t === undefined){
          result2[2].phone.$t =
          "Phone or website unavailble"
        };

        if (result2[2].email.$t === undefined){
          result2[2].email.$t =
          "Email not known."
        };

        var latitude1 = result.petfinder.shelters.shelter['0'].latitude.$t;
        window.localStorage.setItem('latitude1', latitude1);
        var longitude1 =
        result.petfinder.shelters.shelter['0'].longitude.$t;
        window.localStorage.setItem('longitude1', longitude1);
        var latitude2 = result.petfinder.shelters.shelter['1'].latitude.$t;
        window.localStorage.setItem('latitude2', latitude2);
        var longitude2 =
        result.petfinder.shelters.shelter['1'].longitude.$t;
        window.localStorage.setItem('longitude2', longitude2);
        var latitude3 = result.petfinder.shelters.shelter['2'].latitude.$t;
        window.localStorage.setItem('latitude3', latitude3);
        var longitude3 =
        result.petfinder.shelters.shelter['2'].longitude.$t;
        window.localStorage.setItem('longitude3', longitude3);

          $('#address1').append(result2[0].name.$t + "<br>" + result2[0].address1.$t + "<br>" + result2[0].city.$t + "<br>" + result2[0].state.$t + "<br>" + result2[0].zip.$t + "<br>" + result2[0].phone.$t + "<br>" + result2[0].email.$t + "<br>");
          $('#address2').append(
            result2[1].name.$t + "<br>" + result2[1].address1.$t + "<br>" + result2[1].city.$t + "<br>" + result2[1].state.$t + "<br>" + result2[1].zip.$t + "<br>" + result2[1].phone.$t + "<br>" + result2[1].email.$t + "<br>");
          $('#address3').append(result2[2].name.$t + "<br>" + result2[2].address1.$t + "<br>" + result2[2].city.$t + "<br>" + result2[2].state.$t + "<br>" + result2[2].zip.$t + "<br>" + result2[2].phone.$t + "<br>" + result2[2].email.$t + "<br>");
          window.localStorage.setItem('locationArray',[
             [(localStorage.latitude1),
             (localStorage.longitude1)],
             [(localStorage.latitude2),
             (localStorage.longitude2 )],
             [(localStorage.latitude3),
             (localStorage.longitude3)]
          ]);
      }
    }).done(function(){
      var markerArray = window.localStorage.locationArray.split(",");
      for (var i = 0; i < markerArray.length; i++) {
          if(markerArray[i] > 0 && markerArray[i+1] <0)
          marker = new google.maps.Marker({
          position: new google.maps.LatLng(markerArray[i], markerArray[i+1]),
          map: map
        });
      }
    })

  });
});
