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
var $deleteBtn = document.querySelector('#delete');
var $h1 = document.querySelector('h1');
var $modal = document.querySelector('.modal');
var $cancelBtn = document.querySelector('#cancel');
var $confirmBtn = document.querySelector('#confirm');

$photoUrl.addEventListener('input', function (event) {
  $img.setAttribute('src', event.target.value);
});

function saveEntry(event) {
  event.preventDefault();
  var $allListItems = document.querySelectorAll('li');
  if (data.editing === null) {
    var newEntry = {};
    newEntry.entryId = data.nextEntryId;
  } else {
    var $listItem = data.editing;
    newEntry = getCurrentEntry($listItem);
  }

  newEntry.title = $form.elements.title.value;
  newEntry.photo = $form.elements.photo.value;
  newEntry.notes = $form.elements.notes.value;
  var newRender = renderEntry(newEntry);

  if (data.editing === null) {
    $list.prepend(newRender);
    data.entries.unshift(newEntry);
    data.nextEntryId++;
  } else {
    var replacedEntry = $listItem;
    for (var i = 0; i < $allListItems.length; i++) {
      if (replacedEntry === parseInt($allListItems[i].getAttribute('data-entry-id'))) {
        replacedEntry = $allListItems[i];
      }
    }
    replacedEntry.replaceWith(newRender);
    data.editing = null;
  }

  $img.setAttribute('src', $placeholderImg);
  $newEntryPage.className = 'home view hidden';
  $entriesHist.className = 'storage container view';
  data.view = 'entries';
  $form.reset();
}

$form.addEventListener('submit', saveEntry);

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

$main.addEventListener('click', function handleViewSwap(event) {
  if (event.target.matches('#nav-btn')) {
    $newEntryPage.className = 'home view hidden';
    $entriesHist.className = 'storage container view';
    data.view = 'entries';
    data.editing = null;
    $form.reset();
  } else if (event.target.matches('#entries-storage')) {
    $newEntryPage.className = 'home container view';
    $entriesHist.className = 'storage container view hidden';
    data.view = 'entry-form';
    data.editing = null;
    $form.reset();
  } else if (event.target.matches('.home-page')) {
    $newEntryPage.className = 'home container view';
    $entriesHist.className = 'storage container view hidden';
    data.view = 'entry-form';
    data.editing = null;
  }
});

if (data.view === 'entry-form') {
  $newEntryPage.className = 'home container view';
  $entriesHist.className = 'storage container view hidden';
  data.view = 'entries';
} else {
  $newEntryPage.className = 'home view hidden';
  $entriesHist.className = 'storage container view';
}

$list.addEventListener('click', function editEntry(event) {
  if (event.target.tagName !== 'I') {
    return;
  }
  $newEntryPage.className = 'home container view';
  $entriesHist.className = 'storage container view hidden';
  $deleteBtn.className = '';
  $h1.textContent = 'Edit Entry';
  data.view = 'entry-form';

  var $closestListItem = event.target.closest('[data-entry-id]');
  var $currentId = $closestListItem.getAttribute('data-entry-id');
  for (var i = 0; i < data.entries.length; i++) {
    if (parseInt($currentId) === data.entries[i].entryId) {
      data.editing = data.entries[i].entryId;
      $form.elements.title.value = data.entries[i].title;
      $form.elements.photo.value = data.entries[i].photo;
      $form.elements.notes.value = data.entries[i].notes;
      $img.setAttribute('src', data.entries[i].photo);
    }
  }
});

function getCurrentEntry(entryId) {
  for (var i = 0; i < data.entries.length; i++) {
    if (parseInt(entryId) === data.entries[i].entryId) {
      var obj = data.entries[i];
      return obj;
    }
  }
}

function deletePopup() {
  $modal.className = 'row modal';
}

function cancelDelete() {
  $modal.className = 'row hidden modal';
}

function confirmDelete(event) {
  event = data.editing;
  var allListItems = document.querySelectorAll('li');
  for (var i = 0; i < allListItems.length; i++) {
    if (event === parseInt(allListItems[i].getAttribute('data-entry-id'))) {
      allListItems[i].remove();
      var currentEntry = parseInt(allListItems[i].getAttribute('data-entry-id'));
    }
  }
  for (var a = 0; a < data.entries.length; a++) {
    if (currentEntry === data.entries[a].entryId) {
      data.entries.splice(a, 1);
    }
  }
  $newEntryPage.className = 'home view hidden';
  $entriesHist.className = 'storage container view';
  $modal.className = 'row hidden modal';
  data.view = 'entries';
  data.editing = null;
}

$deleteBtn.addEventListener('click', deletePopup);
$cancelBtn.addEventListener('click', cancelDelete);
$confirmBtn.addEventListener('click', confirmDelete);
