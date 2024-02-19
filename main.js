const status_text = document.getElementById('status');


function showDropdown(inputID) {
  var dropdown = document.getElementById(inputID);
  if (dropdown) {
    dropdown.style.display = "block";
  }
}


document.addEventListener("DOMContentLoaded", function() {
  var amountInput = document.getElementById("amount");
  var ndsInput = document.getElementById("combobox_value");

  amountInput.addEventListener("input", function() {
    if (amountInput.value !== '' && ndsInput.value !== '') {
      calculateTotal();
    } else {
      document.getElementById("calculation").value = '';
    }
  });
  
  ndsInput.addEventListener("change", function() {
    if (amountInput.value !== '' && ndsInput.value !== '') {
      calculateTotal();
    } else {
      document.getElementById("calculation").value = '';
    }
  });

  function calculateTotal() {
    var amount = parseFloat(document.getElementById("amount").value);
    var ndsRateText = document.getElementById("combobox_value").value;
    var calculationInput = document.getElementById("calculation");
    var ndsRate;
    if (ndsRateText === '10%' || ndsRateText === '20%') {
      ndsRate = parseInt(ndsRateText);
    } else {
      ndsRate = 0;
    }

    var prod;
    if (ndsRate === 10) {
      prod = 9.090909;
    } else if (ndsRate === 20) {
      prod = 16.666667;
    } else {
      prod = 0;
    }

    var total = amount * prod / 100;
    calculationInput.value = total.toFixed(2);
  }
});




function selectRole(value, text, inputId, listId, getID, whereID) {
  var input = document.getElementById(inputId);
  var list = document.getElementById(listId);
  input.value = text;
  if (value === '') {
    return;
    
  }

  if (value === 'without' || value === 'zero') {
      document.getElementById(whereID).value = '0';
  } else {
      var amount = parseFloat(document.getElementById(`${getID}`).value);
      var ndsRate = parseFloat(text);
      calculateTotal(amount, ndsRate, whereID);
  }
  list.style.display = 'none';
}

function calculateTotal(amount, ndsRate, whereID) {
  var total;
  
  if (!amount || isNaN(amount)) {
    total = ''; 
  } else if (ndsRate === 0 || ndsRate === 'Нет НДС' || ndsRate === 'zero') {
    total = 0;
  } else {
    var prod;
    if (ndsRate == '10') {
      prod = 9.090909;
    } else if (ndsRate == '20') {
      prod = 16.666667;
    }
    
    total = amount * prod / 100;
  }

  document.getElementById(whereID).value = total === '' ? '' : total.toFixed(2);
}




let storageValue = 2;

let HashMap = {};

for (let i = 1; i <= storageValue;i++){
  HashMap[i] = 1;
}

function addInputListener(amountInput, ndsInput, i, current) {
  amountInput.addEventListener('input', function() {
      var amount = parseFloat(amountInput.value);
      var ndsRateText = ndsInput.value;
      var ndsRate;
      if (ndsRateText.trim() !== '') {
          switch (ndsRateText) {
              case 'Нет НДС':
              case 'zero':
                  ndsRate = 0;
                  break;
              case '10%':
                  ndsRate = 10;
                  break;
              case '20%':
                  ndsRate = 20;
                  break;
              default:
                  ndsRate = 0;
          }

          calculateTotal(amount, ndsRate, `nds_cost${i+1}_${current}`);
      } 
  });
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
              <p class="items">Товар 1</p>
              <label>Код артикула</label>
              <input class="code" type="text" id="code${i+1}_${current}" name="code" placeholder="Введите артикул">
              <label>Наименование товара</label>
              <input class="title" type="text" id="title${i+1}_${current}" name="title" value="ТНП" placeholder="Введите товар">
              <label>Стоимость ед. товара в ₽</label>
              <input type="number" id="place_cost${i+1}_${current}" name="place_cost" placeholder="Введите стоимость">


              <div class="weight_input">
                  <div class="left_input" id="left_input${i+1}_${current}">
                      <label>Вес ед. товара (кг)</label>
                      <input class="weight" type="number" id="weight${i+1}_${current}"  name="weight" placeholder="Введите кг.">
                  </div>
                  <div>
                      <label>Кол-во ед.</label>
                      <input class="count" type="number" id="count${i+1}_${current}" onkeypress="return event.charCode >= 48 && event.charCode <= 57" name="count" placeholder="Введите шт.">
                  </div>  
              </div>

              <label>Оплата получателя за ед. товара в т.ч. НДС ₽</label>
              <input type="number" class="cost" id="cost${i+1}_${current}" name="cost_with_nds" value="0" placeholder="Введите стоимость">
              <div class="nds-flex">
                  <div class="left_input_place" id="left_input_place${i+1}_${current}">
                      <label>Ставка НДС, %</label>
                      <input type="text" class="place_combobox_value" id="place_combobox_value${i+1}_${current}" onclick="showDropdown('place_ndsList${i+1}_${current}')" placeholder="НДС" readonly>
                      <ul id="place_ndsList${i+1}_${current}" class="dropdown-list">
                          <li value="without" data-id="without" class="option" onclick="selectRole('without', 'Нет НДС','place_combobox_value${i+1}_${current}', 'place_ndsList${i+1}_${current}','cost${i+1}_${current}','nds_cost${i+1}_${current}')">Нет НДС</li>
                          <li value="zero" data-id="zero" class="option" onclick="selectRole('zero', '0%','place_combobox_value${i+1}_${current}', 'place_ndsList${i+1}_${current}','cost${i+1}_${current}','nds_cost${i+1}_${current}')">0%</li>
                          <li value="ten" data-id="ten" class="option" onclick="selectRole('ten', '10%','place_combobox_value${i+1}_${current}', 'place_ndsList${i+1}_${current}','cost${i+1}_${current}','nds_cost${i+1}_${current}')">10%</li>
                          <li value="twenty" data-id="twenty" class="option" onclick="selectRole('twenty', '20%','place_combobox_value${i+1}_${current}', 'place_ndsList${i+1}_${current}','cost${i+1}_${current}','nds_cost${i+1}_${current}')">20%</li>
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
    var amountInput = document.getElementById(`cost${i+1}_${current}`);
    var ndsInput = document.getElementById(`place_combobox_value${i+1}_${current}`);

    addInputListener(amountInput, ndsInput, i, current);

      }
}

showPlacesOnload();

function addNumber(id) {
  let counter = HashMap[id]+1;
  const newPlace = document.createElement('div');
  newPlace.classList.add('places');
  newPlace.id = `place${id}_${counter}`;

  newPlace.innerHTML = `
      <p class="items">Товар ${counter}</p>
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
              <input class="count" type="number" id="count${id}_${counter}" onkeypress="return event.charCode >= 48 && event.charCode <= 57" name="count" placeholder="Введите шт.">
          </div>  
      </div>

      <label>Оплата получателя за ед. товара в т.ч. НДС ₽</label>
      <input type="number" class="cost" id="cost${id}_${counter}" name="cost_with_nds" value="0" placeholder="Введите стоимость">
      <div class="nds-flex">
          <div class="left_input_place" id="left_input_place${id}_${counter}">
              <label>Ставка НДС, %</label>
              <input type="text" class="place_combobox_value" id="place_combobox_value${id}_${counter}" onclick="showDropdown('place_ndsList${id}_${counter}')" placeholder="НДС" readonly>
              <ul id="place_ndsList${id}_${counter}" class="dropdown-list">
                  <li value="without" data-id="without" class="option" onclick="selectRole('without', 'Нет НДС','place_combobox_value${id}_${counter}', 'place_ndsList${id}_${counter}', 'cost${id}_${counter}', 'nds_cost${id}_${counter}')">Нет НДС</li>
                  <li value="zero" data-id="zero" class="option" onclick="selectRole('zero', '0%','place_combobox_value${id}_${counter}', 'place_ndsList${id}_${counter}', 'cost${id}_${counter}', 'nds_cost${id}_${counter}')">0%</li>
                  <li value="ten" data-id="ten" class="option" onclick="selectRole('ten', '10%','place_combobox_value${id}_${counter}', 'place_ndsList${id}_${counter}', 'cost${id}_${counter}', 'nds_cost${id}_${counter}')">10%</li>
                  <li value="twenty" data-id="twenty" class="option" onclick="selectRole('twenty', '20%','place_combobox_value${id}_${counter}', 'place_ndsList${id}_${counter}', 'cost${id}_${counter}', 'nds_cost${id}_${counter}')">20%</li>
              </ul>
          </div>

          <div>
              <label>Сумма НДС, ₽</label>
              <input type="text" class="nds_cost" id="nds_cost${id}_${counter}" name="nds_cost" placeholder="Подсчет">
          </div>
      </div>
      <button class="created" id="for_delete" type="button" onclick="removePlace('${newPlace.id}')">Удалить</button>
  `;
  document.getElementById(`places-container${id}`).appendChild(newPlace);
  var amountInput = document.getElementById(`cost${id}_${counter}`);
  var ndsInput = document.getElementById(`place_combobox_value${id}_${counter}`);
  
  amountInput.addEventListener('input', function() {
    var amount = parseFloat(amountInput.value);
    var ndsRateText = ndsInput.value.trim();
    
    if (amount && ndsRateText !== '') {
        var ndsRate;
        
        switch (ndsRateText) {
            case 'zero':
                ndsRate = 0;
                break;
            case '10%':
                ndsRate = 10;
                break;
            case '20%':
                ndsRate = 20;
                break;
            default:
                ndsRate = 0;
        }

        calculateTotal(amount, ndsRate, `nds_cost${id}_${counter}`);
    } else {
        document.getElementById(`nds_cost${id}_${counter}`).value = '';
    }
});



  HashMap[id]++;
  
}


function removePlace(placeId) {
  const placeToRemove = document.getElementById(placeId);
  if (!placeToRemove) return;

  const parentId = placeToRemove.parentElement.id;
  const parentIdNum = parentId.match(/\d+/)[0];

  placeToRemove.remove();

  const counter = placeId.match(/\d+$/)[0];
  delete HashMap[parentIdNum + '_' + counter];

  const places = document.querySelectorAll(`#${parentId} .places`);
  places.forEach((place, index) => {
    const newCounter = index + 1;
    const newPlaceId = `place${parentIdNum}_${newCounter}`;
    place.id = newPlaceId;
    place.querySelector('p').textContent = `Товар ${newCounter}`;
    place.querySelectorAll('input').forEach(input => {
      const inputIdArray = input.id.split('_');
      inputIdArray[inputIdArray.length - 1] = newCounter;
      input.id = inputIdArray.join('_');
    });

    const leftInputPlace = place.querySelector('.left_input_place');
    if (leftInputPlace) {
      leftInputPlace.id = `left_input_place${parentIdNum}_${newCounter}`;
      const inputInsideLeftInputPlace = leftInputPlace.querySelector('input');
      if (inputInsideLeftInputPlace) {
        inputInsideLeftInputPlace.id = `place_combobox_value${parentIdNum}_${newCounter}`;
        inputInsideLeftInputPlace.setAttribute('onclick', `showDropdown('place_ndsList${parentIdNum}_${newCounter}')`);
      }
      const dropdownList = leftInputPlace.querySelector('.dropdown-list');
      if (dropdownList) {
        dropdownList.id = `place_ndsList${parentIdNum}_${newCounter}`;
        dropdownList.querySelectorAll('li').forEach((li, idx) => {
          const idNum = parentIdNum + '_' + newCounter;
          li.setAttribute('onclick', `selectRole('${li.dataset.id}', '${li.textContent}', 'place_combobox_value${idNum}', 'place_ndsList${idNum}', 'cost${idNum}', 'nds_cost${idNum}')`);
        });
      }
    }
    const button = place.querySelector('button');
    if (button) {
      button.setAttribute('onclick', `removePlace('${newPlaceId}')`);
    }

    HashMap[parentIdNum] = newCounter;
  });
}











document.getElementById('amount').addEventListener('input', function() {
  var amount = parseFloat(this.value);
  var hiddenDiv = document.querySelector('.hidden_div');
  if (!isNaN(amount) && amount > 0) {
      hiddenDiv.style.display = 'block';
  } else {
      hiddenDiv.style.display = 'none';
      document.getElementById('combobox_value').value = '';
      document.getElementById('calculation').value = '';
  }
});


function scrollToTop() {
  window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });
}





















// window.TelegramWebviewProxy.postEvent('web_app_setup_closing_behavior', JSON.stringify({ need_confirmation: true }));

