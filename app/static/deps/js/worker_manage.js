//вызов модалки добавления юзера
function submitWorkerForm() {
    // document.getElementById('workerName').value;
    // document.getElementById('workerSurname').value;
    // document.getElementById('workerLogin').value;
    // document.getElementById('workerPassword').value;
    
    // console.log('Добавление работника:', name, surname, login, password);

    // Закрыть модальное окно после отправки данных
    $('#addWorkerModal').modal('hide');
}

//вызов модалки изменения юзера
document.addEventListener('DOMContentLoaded', function() {
    var changeModal = document.getElementById('changeWorkerModal');
    // Вызов модального окна
    document.getElementsByClassName('chng-worker-btn').addEventListener('click', function() {
        myModal.show();
    });

    // Опционально: закрытие модального окна при нажатии на кнопку закрытия
    // document.querySelector('.close').addEventListener('click', function() {
    //     myModal.hide();
    // });
});


