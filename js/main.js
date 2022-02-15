/* global data */
/* exported data */

var $photoUrl = document.querySelector('#photo');
var $img = document.querySelector('img');
var $placeholderImg = $img.getAttribute('src');
var $form = document.querySelector('form');

$photoUrl.addEventListener('input', function (event) {
  $img.setAttribute('src', event.target.value);
});

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  var title = $form.elements.title.value;
  var photo = $form.elements.photo.value;
  var notes = $form.elements.notes.value;
  var entryId = data.nextEntryId;

  var newEntry = {
    entryId: entryId,
    title: title,
    photo: photo,
    notes: notes
  };
  data.entries.unshift(newEntry);
  data.nextEntryId++;
  $img.setAttribute('src', $placeholderImg);
  $form.reset();
});
