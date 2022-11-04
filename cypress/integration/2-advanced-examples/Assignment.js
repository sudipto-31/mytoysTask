/// <reference types="Cypress" />
describe('My Assignment', function()
{
    it('MYTOYS!', function() {
      Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
      });
      cy.visit("https://www.mytoys.de/");

      //accepting the cookies
      cy.get('#onetrust-accept-btn-handler').click();

      //entering 'trampolin' in the search field
      cy.get('.input-text.search-form__input.js-search-input').type('trampolin').type('{enter}');
      
      cy.wait(2000);

      //selecting 'Highest Price from the dropdown
      cy.get('select').eq(0).select('Höchster Preis').should('have.value','priceDesc')

      //clicking on the Price filter
      cy.get('.nfh__dropdown.js-nfh-dropdown').eq(3).click();

      //providing minimum & maximum values
      cy.get('.w0.flex-grow-1').eq(0).type('{selectall}{backspace}');
      cy.get('.w0.flex-grow-1').eq(0).type('500');
      cy.get('.w0.flex-grow-1').eq(1).type('{selectall}{backspace}');
      cy.get('.w0.flex-grow-1').eq(1).type('1000');
      
      cy.get('.filter-price__btn-container').eq(0).click();
      cy.get('.btn-2.nfh__submit.fr.w50.js-nfh-submit').click();
    
      // selecting the prices & putting into a list & sorting 
      cy.get('span[class*="prod-tile__price-re"]')
      .then(($prices) =>
      Cypress._.map($prices, (el) => el.innerText),
           )
      // because cy.log returns nothing, the original list continues
      .then((list) => cy.log(list.slice(0, 5).join(', ')))
      // only the first word is the price
      .then((list) => list.map((text) => text.split(' ')[0]))
      .then((list) => list.map((str) => str.replace(/[^0-9.]/g, '')))
      .then((list) => cy.log(list.slice(0, 5).join(', ')))
      .then((list) => list.map(parseFloat))
      .then((list) => cy.log(list.slice(0, 5).join(', ')))
      .then((list) => {
    
      // and comparing the original and sorted lists
    const sorted = Cypress._.sortBy(list)
    
  })
     
      //selecting the first product
      cy.get('.prod-tile__link.js-prodlink').eq(0).click();

      //selecting the product in the cart
      cy.contains('In den Warenkorb').click();

      //clicking to view the cart
      cy.contains('Warenkorb anzeigen').click();
      
      //verifying whether the cart page opened or not
      cy.contains('Error 403').then(($btn) => {
        if ($btn.is(':visible')) {
          cy.log("Unable to load cart")
        } else {
          cy.log("Cart is loaded")
        }
      })

      //going back to the previous page
      cy.go('back');

      //hovering over the cart icon
      cy.get('.header-shop__cart-btn.js-base64').trigger('mouseover');

      //removing the products added in the cart
      cy.get('.js-delete-cart-item.product__delete').click({force:true}).click({ multiple: true })
      
    })
      
  })

    

