/* global data */
/* exported data */

var $photoUrl = document.querySelector('#photo');
var $img = document.querySelector('img');
var $placeholderImg = $img.getAttribute('src');
var $form = document.querySelector('form');
var $list = document.querySelector('ul');

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
  $list.prepend(renderEntry(data.entries[0]));
  $img.setAttribute('src', $placeholderImg);
  $form.reset();
});

function renderEntry(entry) {
  var $listItem = document.createElement('li');
  $list.prepend($listItem);

  var $row = document.createElement('div');
  $row.setAttribute('class', 'row');
  $listItem.appendChild($row);

  var $columnHalf1 = document.createElement('div');
  $columnHalf1.setAttribute('class', 'column-half');
  $row.appendChild($columnHalf1);

  var $image = document.createElement('img');
  $image.setAttribute('src', entry.photo);
  $columnHalf1.appendChild($image);

  var $columnHalf2 = document.createElement('div');
  $columnHalf2.setAttribute('class', 'column-half');
  $row.appendChild($columnHalf2);

  var $h2 = document.createElement('h2');
  $h2.setAttribute('class', 'no-margin-top');
  $h2.textContent = entry.title;
  $columnHalf2.appendChild($h2);

  var $par = document.createElement('p');
  $par.textContent = entry.notes;
  $columnHalf2.appendChild($par);

  return $listItem;
}
window.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    $list.appendChild(renderEntry(data.entries[i]));
  }
});

var $navLink = document.querySelector('.nav-link');
function handleNavLink(event) {
  $navLink.setAttribute('href', '#all-entries');
}
$navLink.addEventListener('click', handleNavLink);

var $newEntry = document.querySelector('.new-entry-btn');
$newEntry.addEventListener('click', function (event) {
  $newEntry.setAttribute('href', '#new-entry-form');
});
