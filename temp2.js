function updateDOM() {
	// TODO: получение данных из бд при обновлении 
	backlogListEl.textContent = "";
	backlogListArray.forEach((backlogItem, index) => {
		createItemEl(backlogListEl, 0, backlogItem, index);
	});
	backlogListArray = filterArray(backlogListArray);
	// Progress Column
	progressListEl.textContent = "";
	progressListArray.forEach((progressItem, index) => {
		createItemEl(progressListEl, 1, progressItem, index);
	});
	progressListArray = filterArray(progressListArray);
	// Complete Column
	completeListEl.textContent = "";
	completeListArray.forEach((completeItem, index) => {
		createItemEl(completeListEl, 2, completeItem, index);
	});
	completeListArray = filterArray(completeListArray);
	// On Hold Column
	onHoldListEl.textContent = "";
	onHoldListArray.forEach((onHoldItem, index) => {
		createItemEl(onHoldListEl, 3, onHoldItem, index);
	});
	onHoldListArray = filterArray(onHoldListArray);
	// Run getSavedColumns only once, Update Local Storage
	updatedOnLoad = true;
	updateSavedColumns();
}