(function($){
    'use strick';

var app = (function() {
    return {
      init: function() {
        console.log('app Init');
        this.companyInfo();
        this.initEvents();
      },

      initEvents: function initEvents() {
        $('[data-js="form-register"]').on('submit', this.handleSubmit);
      },

      handleSubmit: function handleSubmit(e) {
        e.preventDefault();
        console.log('submit');
        var $tableCar = $('[data-js="table-car"]').get();
        $tableCar.appendChild(app.createNewCar());
      },

      createNewCar: function createNewCar() {
        var $fragment = document.createDocumentFragment();
        var $tr = document.createElement('tr');
        var $tdImage = document.createElement('td');
        var $image = document.createElement('img');
        var $tdBrand = document.createElement('td');
        var $tdYear = document.createElement('td');
        var $tdPlate = document.createElement('td');
        var $tdColor = document.createElement('td');
      
        $image.setAttribute('src', $('[data-js="image"]').get().value);
        $tdImage.appendChild($image);

        $tdBrand.textContent = $('[data-js="brand-model"]').get().value;
        $tdYear.textContent = $('[data-js="year"]').get().value;
        $tdPlate.textContent = $('[data-js="plate"]').get().value;
        $tdColor.textContent = $('[data-js="color"').get().value;

        $tr.appendChild($tdImage);
        $tr.appendChild($tdBrand);
        $tr.appendChild($tdYear);
        $tr.appendChild($tdPlate);
        $tr.appendChild($tdColor);
        $tr.appendChild(app.createRemoveBtnTd());


        return $fragment.appendChild($tr);

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
        var ajax = new  XMLHttpRequest();
        ajax.open('GET', '/company.json', true);
        ajax.send();
        ajax.addEventListener('readystatechange', this.getCompanyInfo, false);
      },
      
      getCompanyInfo: function getCompanyInfo() {
        if(!app.isReady.call(this))
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
        $remove.addEventListener('click',function(){
          alert('clicou');
        });
      }
    };
    
  })();
  
  app.init();
  
})(window.DOM);

//https://github.com/gm50x/catalogo-carros-ninja/pull/2/commits/3169c03e6a0dc7a5673cb0e7be43d33dcb553c84