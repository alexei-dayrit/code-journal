/* global data */
/* exported data */

var $photoUrl = document.querySelector('#photo');
var $img = document.querySelector('img');
var $placeholderImg = $img.getAttribute('src');
var $submit = document.querySelector('input[type="submit"]');
var $form = document.querySelector('form');
var nextEntryId = 1;

$photoUrl.addEventListener('input', function (event) {
  $img.setAttribute('src', event.target.value);
});

$submit.addEventListener('submit', function (event) {
  event.preventDefault();
  var title = $form.elements.title.value;
  var photo = $form.elements.photo.value;
  var notes = $form.elements.notes.value;
  var formValues = {
    nextEntryId: nextEntryId,
    title: title,
    photo: photo,
    notes: notes
  };
  data.unshift(formValues);
  nextEntryId++;
  $img.setAttribute('src', $placeholderImg);
  $form.reset();
});
