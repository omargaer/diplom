const backlogListEl = document.getElementById("to-do-list"); //массив "to-do" задач в разметке (ul)
const progressListEl = document.getElementById("doing-list");//массив задач "в работе" в разметке (ul)
const completeListEl = document.getElementById("done-list"); //массив задач "выполнено" в разметке (ul)
const onHoldListEl = document.getElementById("on-hold-list");//массив задач "на паузе" в разметке (ul)

//массив всех задач из бд
var RowTasksList = [backlogTasks, 
					progressTasks,
					completeTasks,
					onHoldTasks];

// Initialize Arrays
let backlogListArray = []; //массив "to-do" задач
let progressListArray = []; // массив задач "в работе"
let completeListArray = []; // массив задач "выполнено"
let onHoldListArray = []; // массив задач "на паузе"

// массив всех задач
listArrays = [
	backlogListArray,
	progressListArray,
	completeListArray,
	onHoldListArray,
];
//массив статусов 
const statuses = ['backlog', 'progress', 'complete', 'on_hold'];

var current_modal_task_status = "";
var current_task_list_id;
var current_task_id;


//TODO: сделать перенос задачи в другие столбцы при изменении статуса
function updateSavedColumns() {
	const arrayNames = ["backlog", "progress", "complete", "onHold"];
	arrayNames.forEach((arrayName, index) => {
		localStorage.setItem(
			`${arrayName}Items`,
			JSON.stringify(listArrays[index])
		);
	});
}

// убирает из массива задач пустые элементы
function filterArray(array) {
	const filteredArray = array.filter((item) => item !== null);
	return filteredArray;
}

//открытие модального окна и заполнение данными 
document.addEventListener('DOMContentLoaded', function () {
	// Добавляем обработчик на весь документ
	document.body.addEventListener('click', function (event) {
		if (event.target.classList.contains('taskbutton')) {
			current_task_list_id = event.target.getAttribute('task-list-id');
			current_task_id = event.target.getAttribute('task-id');

			let current_task = RowTasksList[current_task_list_id][current_task_id];
			// Извлекаем данные из объекта по названию
			document.getElementById('exampleModalLabel').textContent = current_task.name;
			document.getElementById('taskDescription').textContent = current_task.description;
			if (current_task.date_start != null){
				document.getElementById('startDate').value = current_task.date_start.replace(' ', 'T').slice(0, 16);
			}
			else{
				document.getElementById('startDate').value = "";
			}
			if(current_task.date_end != null)
			{
				document.getElementById('endDate').value = current_task.date_end.replace(' ', 'T').slice(0, 16);
			}
			else{
				document.getElementById('endDate').value = "";
			}
			
			//создание поля статуса
			const modalWindow = document.getElementById('modalbody'); //получаем тело модального окна
			
			//удаление поля статуса из модального окна, если он уже был
			var old_status = document.getElementById('statusdiv');
			if (old_status != null) {
				modalWindow.removeChild(old_status);
			}

			current_modal_task_status = current_task.status;
			// добавление нового statusDiv в тело модального окна
			let h = createStatusField(current_task.status, modalWindow);
			modalWindow.appendChild(h);
		}
	});
});

function createStatusField(status, modalBodyDiv){

	const statusDiv = document.createElement('div'); //создаём контейнер для хранения статуса
	statusDiv.className = 'statusboxflex'; //задаём стиль этому контейнеру
	statusDiv.id = 'statusdiv'; // задаём ему id 
	
	const statusContentDiv = document.createElement('div');
	statusContentDiv.className = 'status-content';

	const dotDiv = document.createElement('div'); // создаём внутри него контейнер для точечки 
	dotDiv.className = `status-dot ${status}`; // задаём точечке стиль точечки
	dotDiv.id = 'status-dot';

	const textSpan = document.createElement('span'); // создаём текст возле точечки
	textSpan.id = 'status-field-text';
	textSpan.textContent = statusDecode(status); // задаём значение тексту возле точечки
	
	statusContentDiv.appendChild(dotDiv);
	statusContentDiv.appendChild(textSpan);

	// Создаем и настраиваем dropdownDiv
	const dropdownDiv = document.createElement('div');
	dropdownDiv.className = 'dropdown';

	// Кнопка для dropdown
	const button = document.createElement('button');
	button.className = 'btn btn-secondary dropdown-toggle';
	button.type = 'button';
	button.id = 'dropdownMenuButton2';
	button.dataset.bsToggle = 'dropdown';
	button.setAttribute('aria-expanded', 'false');
	button.textContent = 'Изменить статус';
	dropdownDiv.appendChild(button);

	// Список для dropdown
	const ul = document.createElement('ul');
	ul.className = 'dropdown-menu dropdown-menu-dark';
	ul.setAttribute('aria-labelledby', 'dropdownMenuButton2');
	
	// Варианты статусов для dropdown

	statuses.forEach(status_from_massiv => {
		if (status != status_from_massiv){
			const li = document.createElement('li');
			const optionDiv = document.createElement('div');
			optionDiv.className = 'dropdown-item';

			const dotDiv = document.createElement('div');
			dotDiv.className = `status-dot ${status_from_massiv}`;
			optionDiv.appendChild(dotDiv);

			const liStatusText = document.createElement('span');
			liStatusText.id = "status-change-element";
			liStatusText.textContent = statusDecode(status_from_massiv);
			optionDiv.appendChild(liStatusText);

			dotDiv.style.display = 'inline-block'; // Принудительное применение стиля
			liStatusText.style.display = 'inline-block';
			
			li.appendChild(optionDiv);
			ul.appendChild(li);
		}
	});

	ul.addEventListener('click', function(event) {
		// Находим ближайший элемент li вверх по дереву DOM от элемента, по которому кликнули
		let targetLi = event.target.closest('li');
		// Если клик был не по li и не по дочерним элементам, выходим
		if (!targetLi) return; 
		// Если li не принадлежит текущему ul, выходим
		if (!this.contains(targetLi)) return; 
		// Находим текст в поле статуса
		const prev_text_status_field = document.getElementById('status-field-text');
		const old_status_text = prev_text_status_field.textContent;
		// Находим точку возле текста в поле статуса
		const prev_dot_status_div = document.getElementById('status-dot');
		// Получаем новый текст статуса на русском языке
		const new_task_status = targetLi.querySelector('span').textContent; 
		// Меняем текст 
		prev_text_status_field.textContent = new_task_status;
		// Обнуляем классы у точки
		prev_dot_status_div.classList.value = '';
		// Удаляем все старые классы у точки
		prev_dot_status_div.classList.remove(statusEncode(old_status_text))
		// По очереди добавляем новые
		prev_dot_status_div.classList.add('status-dot');
		prev_dot_status_div.classList.add(statusEncode(new_task_status)); 

		let need_to_send_into_db = RowTasksList[current_task_list_id][current_task_id];
		console.log("до изменения статуса:", need_to_send_into_db.status);
		console.log("нужно поменять на:", statusEncode(new_task_status));
		need_to_send_into_db.status = statusEncode(new_task_status);
		console.log("после изменения статуса:", need_to_send_into_db);
		
	});
	dropdownDiv.appendChild(ul);
	
	// Добавляем точку и текст в statusDiv
	statusDiv.appendChild(statusContentDiv);
	
	// Вставляем dropdownDiv в statusDiv
	statusDiv.appendChild(dropdownDiv);
	return statusDiv;
}

function statusDecode(Row_status){
	const translations = {
		backlog: 'Сделать',
		progress: 'В процессе',
		complete: 'Выполнено',
		on_hold: 'На паузе'
	};
	
	if (!translations[Row_status]) {
		throw new Error('Неподдерживаемый статус');
	}
	return translations[Row_status];
}

function statusEncode(Rus_status) {
	const reverseTranslations = {
	  'Сделать': 'backlog',
	  'В процессе': 'progress',
	  'Выполнено': 'complete',
	  'На паузе': 'on_hold'
	};
  
	if (!reverseTranslations[Rus_status]) {
	  throw new Error('Неподдерживаемый статус');
	}
	return reverseTranslations[Rus_status];
}
  
function updateDOM() {
	//массив массивов всех задач в разметке 
	// каждый элемент - колонка с задачами
	var task_column_list = [backlogListEl,progressListEl, completeListEl, onHoldListEl];
	//проход по всем колонкам для добавления в них кнопок задач
	task_column_list.forEach(function(task_column, row_task_list_index){
		//проходит по всем задачам со статусом соответствующим колонке в разметке 
		RowTasksList[row_task_list_index].forEach((task, task_index)=>{
			//нужно создать кнопку и закинуть её в список кнопок соответствующей колонки
			//кнопка содержит:
				//имя задачи в тексте кнопки
				//id или имя списка кнопок, куда ей нужно попасть
				//было бы хорошо задать её id из списка RowTasksList, так как нужно в модалке будет 
				//обращраться к ней 
			const new_task_column_el = document.createElement("li"); // Создаётся новый элемент li
			new_task_column_el.classList.add("task-li");
			const new_task_button = document.createElement("button"); // новая кнопка
			//основные свойства кнопки
			new_task_button.type = "button";
			new_task_button.textContent = task.name; // текст кнопки - имя задачи
			// нужно для вызова модальных окон
			new_task_button.className = "taskbutton"//используется в проверке при вызове модалки 
			new_task_button.setAttribute("data-bs-toggle", "modal");
			new_task_button.setAttribute("data-bs-target", "#taskModal"); 
			// id самой задачи для того, чтобы доставать его в модалке
			new_task_button.setAttribute("task-list-id", String(row_task_list_index));
			new_task_button.setAttribute("task-id", String(task_index));
			//добавление кнопки в виде li в ul
			new_task_column_el.appendChild(new_task_button); // в li добавляется кнопка
			task_column.appendChild(new_task_column_el); // li добавляется в ul
			//listEl.id = index;
		})
	});
}

// On Load
updateDOM();
