(function ($) {
  'use strick';

  var app = (function () {
    return {
      init: function () {
        this.companyInfo();
        this.initEvents();
        this.getCarInfoInSever();
      },

      getCarInfoInSever: function getCarInfoInSever() {
        var get = new XMLHttpRequest();
        get.open('GET', 'http://localhost:3000/car');
        get.send();

        get.onreadystatechange = function () {
          if (get.readyState === 4) {
            var getValue =  JSON.parse(get.responseText);
            console.log('GET', getValue);

            var $tableCar = $('[data-js="table-car"]').get();
            $tableCar.appendChild(app.createNewCar(getValue));
          }
        }

      },

      openAjaxConnection: function openAjaxConnection() {
        var car = app.getCarValue();
        var ajax = new XMLHttpRequest();
        ajax.open('POST', 'http://localhost:3000/car');
        ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        ajax.send('image=' + car.image + '&brandModel=' + car.brandModel + '&year=' + car.year + '&plate=' + car.plate + '&color=' + car.color);

        console.log('Cadastrando Carro...');
        ajax.addEventListener('readystatechange', function () {
          if (ajax.readyState === 4) {
            console.log('Carro cadastrado com sucesso!');
          }
        });
      },

      initEvents: function initEvents() {
        $('[data-js="form-register"]').on('submit', this.handleSubmit);
        $('[data-js="form-register"]').on('submit', this.openAjaxConnection);
      },

      getCarValue: function getCarValue() {
        var car = {
          image: $('[data-js="image"]').get().value,
          brandModel: $('[data-js="brand-model"]').get().value,
          year: $('[data-js="year"]').get().value,
          plate: $('[data-js="plate"]').get().value,
          color: $('[data-js="color"').get().value,
        }
        return car;
      },

      handleSubmit: function handleSubmit(e) {
        e.preventDefault();
        console.log('submit');
        var $tableCar = $('[data-js="table-car"]').get();
        $tableCar.appendChild(app.createNewCar());
      },

      createNewCar: function createNewCar(getValue) {
        var $fragment = document.createDocumentFragment();
        var $tr = document.createElement('tr');
        var $tdImage = document.createElement('td');
        var $image = document.createElement('img');
        var $tdBrand = document.createElement('td');
        var $tdYear = document.createElement('td');
        var $tdPlate = document.createElement('td');
        var $tdColor = document.createElement('td');

        if (getValue) {
          getValue.forEach(function (item) {

            $tr = document.createElement('tr');
            $tdImage = document.createElement('td');
            $image = document.createElement('img');
            $tdBrand = document.createElement('td');
            $tdYear = document.createElement('td');
            $tdPlate = document.createElement('td');
            $tdColor = document.createElement('td');

            $image.setAttribute('src', item.image);
            $tdImage.appendChild($image);
            $tdBrand.textContent = item.brandModel;
            $tdYear.textContent = item.year;
            $tdPlate.textContent = item.plate;
            $tdColor.textContent = item.color;

            $tr.appendChild($tdImage);
            $tr.appendChild($tdBrand);
            $tr.appendChild($tdYear);
            $tr.appendChild($tdPlate);
            $tr.appendChild($tdColor);

            $tr.appendChild(app.createRemoveBtnTd());
            $fragment.appendChild($tr);
          });

        } else {
          $image.setAttribute('src', $('[data-js="image"]').get().value);
          $tdImage.appendChild($image);
          $tdBrand.textContent = $('[data-js="brand-model"]').get().value;
          $tdPlate.textContent = $('[data-js="plate"]').get().value;
          $tdColor.textContent = $('[data-js="color"').get().value;

          $tr.appendChild($tdImage);
          $tr.appendChild($tdBrand);
          $tr.appendChild($tdYear);
          $tr.appendChild($tdPlate);
          $tr.appendChild($tdColor);

          $tr.appendChild(app.createRemoveBtnTd());
          $fragment.appendChild($tr);
        }

        return $fragment;
      },

      createRemoveBtnTd: function createRemoveBtnTd() {
        var $fragment = document.createDocumentFragment();
        var $td = document.createElement('td');
        var $button = document.createElement('button');

        $button.setAttribute('data-js', 'btnRemove');
        $button.appendChild(document.createTextNode('remove'));
        $button.addEventListener('click', app.removeCar, false);

        $td.appendChild($button);
        $fragment.appendChild($td);

        return $fragment;
      },

      removeCar: function removeCar(event) {
        event.target.parentNode.parentNode.remove();
      },

      companyInfo: function companyInfo() {
        var ajax = new XMLHttpRequest();
        ajax.open('GET', '/company.json', true);
        ajax.send();
        ajax.addEventListener('readystatechange', this.getCompanyInfo, false);
      },

      getCompanyInfo: function getCompanyInfo() {
        if (!app.isReady.call(this))
          return;

        var data = JSON.parse(this.responseText);
        var $companyName = $('[data-js="company-name"]').get();
        var $companyPhone = $('[data-js="company-phone"]').get();
        $companyName.textContent = data.name;
        $companyPhone.textContent = data.phone;
      },

      isReady: function isReady() {
        return this.readyState === 4 && this.status === 200;
      },

      removeitem: function removeitem() {
        var $remove = document.querySelector('[data-js="btnRemove"]');
        $remove.addEventListener('click', function () {
          alert('clicou');
        });
      }
    };

  })();

  app.init();

})(window.DOM);