const inputValue = document.querySelector('.js-input');
const addBtn = document.querySelector('.js-add-btn');
const blockTodoElement = document.querySelector('.js-list');
let listMessages = [];

// 1. encapsulate into one module
// 2. Click Event manager (use delegation https://javascript.info/event-delegation)
// 3. Create Storage manager api set/get.
// 4. Create DOM manager

// const dom = new DOM(); // ~ jquery plugin
// 1. registerEvents -> subscribe to delegation event
// 2. create item layout method
// 3. add item -> trigger render
// 4. remove item -> trigger render
// 5. render items

(function () {
    if (localStorage.getItem('value')) {
        listMessages = JSON.parse(localStorage.getItem('value'));
        createItem();
    }

    addBtn.addEventListener('click', function () {
        let newMessageValue = {
            value: inputValue.value,
        };

        listMessages.unshift(newMessageValue);
        createItem();

        localStorage.setItem('value', JSON.stringify(listMessages));
    });

    function createItem() {
        let showMessage = '';

        if (listMessages.length === 0) {
            blockTodoElement.innerHTML = '';
        }

        listMessages.forEach(function (item, index) {
            showMessage += `
          <li class="message-section__list" id="${index}">
            <p class="message-section__text">${item.value}</p>
            <i class="message-section__btn fa fa-trash-o" onclick="removeItem(${index})"></i>
          </li>
        `;
            blockTodoElement.innerHTML = showMessage;
        });
    }

    function removeItem(index) {
        let getItemsStorage = JSON.parse(localStorage.getItem('value'));

        getItemsStorage.splice(index, 1);

        listMessages = getItemsStorage;

        localStorage.setItem('value', JSON.stringify(getItemsStorage));

        createItem();
    }
})();
