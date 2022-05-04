/* global data */
/* exported data */

const $photoUrl = document.querySelector('#photo');
const $img = document.querySelector('img');
const $placeholderImg = $img.getAttribute('src');
const $form = document.querySelector('form');
const $list = document.querySelector('ul');
const $main = document.querySelector('main');
const $newEntryPage = document.querySelector('.home');
const $entriesHist = document.querySelector('.storage');
const $deleteBtn = document.querySelector('#delete');
const $h1 = document.querySelector('h1');
const $modal = document.querySelector('.modal');
const $cancelBtn = document.querySelector('#cancel');
const $confirmBtn = document.querySelector('#confirm');

$photoUrl.addEventListener('input', function (event) {
  $img.setAttribute('src', event.target.value);
});

function saveEntry(event) {
  event.preventDefault();
  const $allListItems = document.querySelectorAll('li');
  let newEntry;
  let $listItem;
  if (data.editing === null) {
    newEntry = {};
    newEntry.entryId = data.nextEntryId;
  } else {
    $listItem = data.editing;
    newEntry = getCurrentEntry($listItem);
  }

  newEntry.title = $form.elements.title.value;
  newEntry.photo = $form.elements.photo.value;
  newEntry.notes = $form.elements.notes.value;
  const newRender = renderEntry(newEntry);

  if (data.editing === null) {
    $list.prepend(newRender);
    data.entries.unshift(newEntry);
    data.nextEntryId++;
  } else {
    let replacedEntry = $listItem;
    for (let i = 0; i < $allListItems.length; i++) {
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
  const $listItem = document.createElement('li');
  $list.prepend($listItem);

  const $row = document.createElement('div');
  $row.setAttribute('class', 'row');
  $listItem.appendChild($row);

  const $columnHalf1 = document.createElement('div');
  $columnHalf1.setAttribute('class', 'column-half');
  $row.appendChild($columnHalf1);

  const $image = document.createElement('img');
  $image.setAttribute('src', entry.photo);
  $columnHalf1.appendChild($image);

  const $columnHalf2 = document.createElement('div');
  $columnHalf2.setAttribute('class', 'column-half');
  $row.appendChild($columnHalf2);

  const $h2 = document.createElement('h2');
  $h2.setAttribute('class', 'h2-entries');
  $h2.textContent = entry.title;
  $columnHalf2.appendChild($h2);

  const $par = document.createElement('p');
  $par.textContent = entry.notes;
  $columnHalf2.appendChild($par);

  const $icon = document.createElement('i');
  $icon.setAttribute('class', 'fa-solid fa-pen');
  $h2.appendChild($icon);

  $listItem.setAttribute('data-entry-id', entry.entryId);
  return $listItem;
}

window.addEventListener('DOMContentLoaded', function (event) {
  for (let i = 0; i < data.entries.length; i++) {
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

  const $closestListItem = event.target.closest('[data-entry-id]');
  const $currentId = $closestListItem.getAttribute('data-entry-id');
  for (let i = 0; i < data.entries.length; i++) {
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
  for (let i = 0; i < data.entries.length; i++) {
    if (parseInt(entryId) === data.entries[i].entryId) {
      const obj = data.entries[i];
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
  const allListItems = document.querySelectorAll('li');
  let currentEntry;
  for (let i = 0; i < allListItems.length; i++) {
    if (event === parseInt(allListItems[i].getAttribute('data-entry-id'))) {
      allListItems[i].remove();
      currentEntry = parseInt(allListItems[i].getAttribute('data-entry-id'));
    }
  }
  for (let a = 0; a < data.entries.length; a++) {
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
