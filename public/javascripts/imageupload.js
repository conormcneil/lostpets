$(document).ready(function(){
  $('#button').click(function(){
    var image_url = window.localStorage.getItem('image_url');
    console.log(image_url);
    $('#imageInput').val(image_url);
  })
})
