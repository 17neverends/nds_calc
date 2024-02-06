const status_text = document.getElementById('status');
function showDropdown(inputID) {
  var dropdown = document.getElementById(inputID);
  if (dropdown) {
    dropdown.style.display = "block";
  }
}

function hideDropdown(inputID) {
  var dropdown = document.getElementById(inputID);
  if (dropdown) {
    dropdown.style.display = "none";
  }
}


function selectRole(value, label, ID, inputID) {
  var input = document.getElementById(ID);
  input.value = label;
  hideDropdown(inputID);

}

let storageValue = 3;

let HashMap = {};

for (let i = 1; i <= storageValue;i++){
  HashMap[i] = 1;
}


function showPlacesOnload() {
  var keys = Object.keys(HashMap);
  
  for (let i = 0; i < keys.length; i++) {
    let current = HashMap[keys[i]];
    const newPlace = document.createElement('div');
    newPlace.id = `place${i+1}`;
    newPlace.innerHTML = `
          <div class="places-container" id="places-container${i+1}">
          <p class="place_title"> Место ${i+1}</p>
          <div class="places" id="place${i+1}_${current}">
              <p>Товар 1</p>
              <label>Код артикула</label>
              <input class="code" type="text" id="code${i+1}_${current}" name="code" placeholder="Введите артикул">
              <label>Наименование товара</label>
              <input class="title" type="text" id="title${i+1}_${current}" name="title" value="ТНП" placeholder="Введите товар">
              <label>Стоимость ед. товара в ₽</label>
              <input type="number" id="place_cost${i+1}_${current}" name="place_cost" placeholder="Введите стоимость">


              <div class="weight_input">
                  <div class="left_input" id="left_input${i+1}_${current}">
                      <label>Вес ед. товара (кг)</label>
                      <input class="weight" type="number" id="weight${i+1}_${current}" name="weight" placeholder="Введите кг.">
                  </div>
                  <div>
                      <label>Кол-во ед.</label>
                      <input class="count" type="number" id="count${i+1}_${current}" name="count" placeholder="Введите шт.">
                  </div>  
              </div>

              <label>Оплата получателя за ед. товара в т.ч. НДС ₽</label>
              <input type="number" class="cost" id="cost${i+1}_${current}" name="cost_with_nds" value="0" placeholder="Введите стоимость">
              <div class="nds-flex">
                  <div class="left_input_place" id="left_input_place${i+1}_${current}">
                      <label>Ставка НДС, %</label>
                      <input type="text" class="place_combobox_value" id="place_combobox_value${i+1}_${current}" onclick="showDropdown('place_ndsList${i+1}_${current}')" placeholder="НДС" readonly>
                      <ul id="place_ndsList${i+1}_${current}" class="dropdown-list">
                          <li value="without" data-id="without" class="option" onclick="selectRole('without', 'Нет НДС','place_combobox_value${i+1}_${current}', 'place_ndsList${i+1}_${current}')">Нет НДС</li>
                          <li value="zero" data-id="zero" class="option" onclick="selectRole('zero', '0%','place_combobox_value${i+1}_${current}', 'place_ndsList${i+1}_${current}')">0%</li>
                          <li value="ten" data-id="ten" class="option" onclick="selectRole('ten', '10%','place_combobox_value${i+1}_${current}', 'place_ndsList${i+1}_${current}')">10%</li>
                          <li value="twenty" data-id="twenty" class="option" onclick="selectRole('twenty', '20%','place_combobox_value${i+1}_${current}', 'place_ndsList${i+1}_${current}')">20%</li>
                      </ul>
                  </div>

                  <div>
                      <label>Сумма НДС, ₽</label>
                      <input type="text" class="nds_cost" id="nds_cost${i+1}_${current}" name="nds_cost" placeholder="Подсчет">
                  </div>
              </div>
          </div>
      </div>
      <button class="created" type="button" id="add" onclick="addNumber(${i+1})" >+ Добавить товар</button>`
    document.querySelector('.all_places').appendChild(newPlace);
  }
}

showPlacesOnload();

function addNumber(id) {
  let counter = HashMap[id]+1;
  const newPlace = document.createElement('div');
  newPlace.classList.add('places');
  newPlace.id = `place${id}_${counter}`; 
  newPlace.innerHTML = `
      <p>Товар ${counter}</p>
      <label>Код артикула</label>
      <input class="code" type="text" id="code${id}_${counter}" name="code" placeholder="Введите артикул">
      <label>Наименование товара</label>
      <input class="title" type="text" id="title${id}_${counter}" name="title" value="ТНП" placeholder="Введите товар">
      <label>Стоимость ед. товара в ₽</label>
      <input type="number" id="place_cost${id}_${counter}" name="place_cost" placeholder="Введите стоимость">

      <div class="weight_input">
          <div class="left_input" id="left_input${id}_${counter}">
              <label>Вес ед. товара (кг)</label>
              <input class="weight" type="number" id="weight${id}_${counter}" name="weight" placeholder="Введите кг.">
          </div>
          <div>
              <label>Кол-во ед.</label>
              <input class="count" type="number" id="count${id}_${counter}" name="count" placeholder="Введите шт.">
          </div>  
      </div>

      <label>Оплата получателя за ед. товара в т.ч. НДС ₽</label>
      <input type="number" class="cost" id="cost${id}_${counter}" name="cost_with_nds" value="0" placeholder="Введите стоимость">
      <div class="nds-flex">
          <div class="left_input_place" id="left_input_place${id}_${counter}">
              <label>Ставка НДС, %</label>
              <input type="text" class="place_combobox_value" id="place_combobox_value${id}_${counter}" onclick="showDropdown('place_ndsList${id}_${counter}')" placeholder="НДС" readonly>
              <ul id="place_ndsList${id}_${counter}" class="dropdown-list">
                  <li value="without" data-id="without" class="option" onclick="selectRole('without', 'Нет НДС','place_combobox_value${id}_${counter}', 'place_ndsList${id}_${counter}')">Нет НДС</li>
                  <li value="zero" data-id="zero" class="option" onclick="selectRole('zero', '0%','place_combobox_value${id}_${counter}', 'place_ndsList${id}_${counter}')">0%</li>
                  <li value="ten" data-id="ten" class="option" onclick="selectRole('ten', '10%','place_combobox_value${id}_${counter}', 'place_ndsList${id}_${counter}')">10%</li>
                  <li value="twenty" data-id="twenty" class="option" onclick="selectRole('twenty', '20%','place_combobox_value${id}_${counter}', 'place_ndsList${id}_${counter}')">20%</li>
              </ul>
          </div>

          <div>
              <label>Сумма НДС, ₽</label>
              <input type="text" class="nds_cost" id="nds_cost${id}_${counter}" name="nds_cost" placeholder="Подсчет">
          </div>
      </div>
      <button class="created" id="for_delete" type="button" onclick="removePlace('${newPlace.id}', '${counter}')">Удалить</button>
  `;
  console.log(newPlace.id);
  document.getElementById(`places-container${id}`).appendChild(newPlace);
  console.log(counter);
  HashMap[id]++;
}


function removePlace(placeId, id) {
  const placeToRemove = document.getElementById(placeId);
  placeToRemove.remove();

}




// function removePlace(placeId, id) {
//   let counter = HashMap[id]+1;
//   const placeToRemove = document.getElementById(placeId);
//   placeToRemove.remove();

//   const places = document.getElementsByClassName('places');
//   for (let i = 0; i < places.length; i++) {
//     const currentPlace = places[i];
//     const newPlaceCounter = i + 1;

//     currentPlace.id = `place_${newPlaceCounter}`;
//     currentPlace.querySelector('p').innerText = `Товар ${newPlaceCounter}`;

//     currentPlace.querySelectorAll('[id^="code"], [id^="title"], [id^="place_cost"], [id^="left_input"], [id^="weight"], [id^="count"], [id^="cost"], [id^="left_input_place"], [id^="place_combobox_value"], [id^="place_ndsList"], [id^="place_combobox_value"], [id^="nds_cost"]').forEach(element => {
//       const currentElementId = element.id;
//       element.id = currentElementId.replace(/\d+$/, newPlaceCounter);
//     });

//     const deleteButton = currentPlace.querySelector('button');
//     if (deleteButton) {
//       deleteButton.setAttribute('onclick', `removePlace('place_${newPlaceCounter}')`);
//     }
//   }

//   counter--;
// }









// window.TelegramWebviewProxy.postEvent('web_app_setup_closing_behavior', JSON.stringify({ need_confirmation: true }));
