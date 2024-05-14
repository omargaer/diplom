const modalBodyDiv = document.getElementById('modalbody'); //получаем тело модального окна

//общий контейнер для статуса и кнопки
//const status_container = document.createElement('div');
//status_container.style.display = 'flex';
//status_container.style.alignItems = 'center';
//status_container.style.justifyContent = 'space-between';

	
const statusDiv = document.createElement('div'); //создаём контейнер для хранения статуса
statusDiv.className = 'statusboxflex'; //задаём стиль этому контейнеру
statusDiv.id = 'statusdiv'; // задаём ему id 

const dotDiv = document.createElement('div'); // создаём внутри него контейнер для точечки 
dotDiv.className = `status-dot ${current_task.status}`; // задаём точечке стиль точечки

const textSpan = document.createElement('span'); // создаём текст возле точечки
textSpan.textContent = current_task.status; // задаём значение тексту возле точечки

statusDiv.appendChild(dotDiv); //добавляем в общий контейнер для статуса точечку
statusDiv.appendChild(textSpan); // потом добавляем текст возле точечки


// Создаем элемент dropdown
const dropdownDiv = document.createElement('div');
dropdownDiv.className = 'dropdown';

// Создаем кнопку для dropdown
const button = document.createElement('button');
button.className = 'btn btn-secondary dropdown-toggle';
button.type = 'button';
button.id = 'dropdownMenuButton2';
button.dataset.bsToggle = 'dropdown';
button.setAttribute('aria-expanded', 'false');
button.textContent = 'Изменить статус';
dropdownDiv.appendChild(button); // Добавляем кнопку в dropdown

// Создаем список для dropdown
const ul = document.createElement('ul');
ul.className = 'dropdown-menu dropdown-menu-dark';
ul.setAttribute('aria-labelledby', 'dropdownMenuButton2');
dropdownDiv.appendChild(ul); // Добавляем список в dropdown

// Разные варианты выпадающих кнопок
const statuses = ['backlog', 'progress', 'complete', 'on_hold'];
statuses.forEach(status => {
	const li = document.createElement('li');
	const optionDiv = document.createElement('div');
	optionDiv.className = 'dropdown-item';

	const dotDiv = document.createElement('div');
	dotDiv.className = `status-dot ${status}`;
	optionDiv.appendChild(dotDiv);

	const textNode = document.createTextNode(status);
	optionDiv.appendChild(textNode);

	li.appendChild(optionDiv);
	ul.appendChild(li); // Важно: добавляем li в ul
});

statusDiv.appendChild(dropdownDiv);


modalBodyDiv.appendChild(statusDiv);
