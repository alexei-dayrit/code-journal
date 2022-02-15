/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousData = localStorage.getItem('entries-local-storage');
if (previousData !== null) {
  data = JSON.parse(previousData);
}

function handleBeforeUnload(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('entries-local-storage', dataJSON);
}

window.addEventListener('beforeunload', handleBeforeUnload);
