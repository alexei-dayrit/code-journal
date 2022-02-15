/* global data */
/* exported data */

var $photoUrl = document.querySelector('#photo');
var $img = document.querySelector('img');

var $submit = document.querySelector('input[type="submit"]');

$photoUrl.addEventListener('input', function (event) {
  $img.setAttribute('src', event.target.value);
});

$submit.addEventListener('submit', function (event) {
});
