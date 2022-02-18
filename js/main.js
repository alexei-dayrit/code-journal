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
  var title = $form.elements.title.value;
  var photo = $form.elements.photo.value;
  var notes = $form.elements.notes.value;
  var entryId = data.nextEntryId;
  event.preventDefault();

  var newEntry = {
    entryId: entryId,
    title: title,
    photo: photo,
    notes: notes
  };

  // if (data.editing === null) {
  //   data.entries.unshift(newEntry);
  //   data.nextEntryId++;
  //   $list.prepend(renderEntry(data.entries[0]));
  //   $img.setAttribute('src', $placeholderImg);
  // } else {

  // }

  data.entries.unshift(newEntry);
  data.nextEntryId++;
  $list.prepend(renderEntry(data.entries[0]));
  $img.setAttribute('src', $placeholderImg);
  $newEntryPage.className = 'home view hidden';
  $entriesHist.className = 'storage container view';
  data.view = 'entries';
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
  $h2.setAttribute('class', 'h2-entries');
  $h2.textContent = entry.title;
  $columnHalf2.appendChild($h2);

  var $par = document.createElement('p');
  $par.textContent = entry.notes;
  $columnHalf2.appendChild($par);

  var $icon = document.createElement('i');
  $icon.setAttribute('class', 'fa-solid fa-pen');
  $h2.appendChild($icon);

  $listItem.setAttribute('data-entry-id', entry.entryId);

  return $listItem;
}

window.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
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

$list.addEventListener('click', function (event) {
  if (event.target.tagName === 'I') {
    $newEntryPage.className = 'home container view';
    $entriesHist.className = 'storage container view hidden';
    var $h1 = document.querySelector('h1');
    $h1.textContent = 'Edit Entry';
    data.view = 'entry-form';
  }
  var $closestListItem = event.target.closest('[data-entry-id]');
  var $currentId = $closestListItem.getAttribute('data-entry-id');

  // you will need to find the index of the matching entry in the data.entries
  // array the id can’t be used as the index
  for (var i = 0; i < data.entries.length; i++) {
    if (parseInt($currentId) === data.entries[i].entryId) {
      data.editing = data.entries[i].entryId;
      $form.elements.title.value = data.entries[i].title;
      $form.elements.photo.value = data.entries[i].photo;
      $form.elements.notes.value = data.entries[i].notes;
      $img.setAttribute('src', data.entries[i].photo);
    }
  }

  // console.log('hello', $currentId);
  // $form.elements.title.value = data.entries[$currentId].title;
  // $form.elements.photo.value = data.entries[$currentId].photo;
  // $form.elements.notes.value = data.entries[$currentId].notes;

});
// data.entries[index].entryId
