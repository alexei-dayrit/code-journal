/* exported data */

let data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

const previousData = localStorage.getItem('entries-local-storage');
if (previousData !== null) {
  data = JSON.parse(previousData);
}

const handleBeforeUnload = event => {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('entries-local-storage', dataJSON);
};

window.addEventListener('beforeunload', handleBeforeUnload);
