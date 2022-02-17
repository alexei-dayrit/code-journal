/* global data */
/* exported data */

var $photoUrl = document.querySelector('#photo');
var $img = document.querySelector('img');
var $placeholderImg = $img.getAttribute('src');
var $form = document.querySelector('form');
var $list = document.querySelector('ul');
var $main = document.querySelector('main');
var $newEntryPage = document.querySelector('.home');
var $entriesHist = document.querySelector('.storage');

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
  $newEntryPage.className = 'home view hidden';
  $entriesHist.className = 'storage container view';
  data.view = 'entries';
  $form.reset();
});

var idCounter = 1;
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

  $listItem.setAttribute('data-entry-id', idCounter);
  idCounter++;
  return $listItem;
}

window.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 1; i < data.entries.length; i++) {
    $list.appendChild(renderEntry(data.entries[i]));
  }
});

$main.addEventListener('click', function (event) {
  if (event.target.matches('#nav-btn')) {
    $newEntryPage.className = 'home view hidden';
    $entriesHist.className = 'storage container view';
    data.view = 'entries';
  } else if (event.target.matches('#entries-storage')) {
    $newEntryPage.className = 'home container view';
    $entriesHist.className = 'storage container view hidden';
    data.view = 'entry-form';
  } else if (event.target.matches('.home-page')) {
    $newEntryPage.className = 'home container view';
    $entriesHist.className = 'storage container view hidden';
    data.view = 'entry-form';
  }
});

if (data.view === 'entry-form') {
  $newEntryPage.className = 'home container view';
  $entriesHist.className = 'storage container view hidden';
} else {
  $newEntryPage.className = 'home view hidden';
  $entriesHist.className = 'storage container view';
}

// $list.addEventListener('click', function (event) {

// });

// var $id = document.querySelector('li[data-entry-id="1"]');
// console.log($id.textContent);
