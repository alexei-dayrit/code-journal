/* global data */
/* exported data */

var $photoUrl = document.querySelector('#photo');
var $img = document.querySelector('img');

$photoUrl.addEventListener('input', function (event) {
  $img.setAttribute('src', event.target.value);
});
