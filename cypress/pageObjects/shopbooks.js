import { convertStringToNumber } from '../support/helpers/convertStringToNumber';

class Shopbooks {

  get basketContainer() { return '#basketContainer'; }
  get dropdownMenu() { return '.dropdown-menu.show'; }
  get basketItemPrice() { return '.basket-item-price'; }
  get itemsPage() { return '.note-item'; }
  get itemsPageWithDiscount() { return `${this.itemsPage}.hasDiscount`; }
  get itemsPageWithoutDiscount() { return `${this.itemsPage}:not(.hasDiscount)`; }
  get itemBuyButton() { return '.actionBuyProduct'; }

  isReady() {
    cy.get(this.itemsPage).should('be.visible');
  }

  // Открыть pop-up корзины
  openPopupCart() {
    cy.get(this.basketContainer).click();
    cy.get(this.dropdownMenu).should('be.visible');
  }

  /**
   * Поиск  и добавление в корзину
   * @param {selector} items
   * @param {string} name
   */
  addToCart(items, name) {
    cy.get(items).then(items => {
      if (name) {
        cy.wrap(items)
          .contains(name)
          .siblings(this.itemBuyButton)
          .click();
      } else {
        cy.wrap(items)
          .first()
          .find(this.itemBuyButton)
          .click();
      }
    });
  }

  /** Выбрать товат по номеру и добавить в корзину
   * @param {number} num
   */
  getTheItemNumberAndAddItToCart(num) {
    cy.get(this.itemsPage)
      .eq(num)
      .find(this.itemBuyButton)
      .click();
  }

  /** Получаем `_csrf` токен, добавляем продукт в корзину через API с добавление токена
   * @param {number} productId
   */
  addOneItemInCartByAPI(productId, count = 1) {
    cy.getCsrfToken().then(token => {
      cy.request({
        method: 'POST',
        url: Cypress.env('CREATE_BASKET_URL'),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-CSRF-Token': token
        },
        body: {
          product: productId,
          count: count
        }
      }).then((res) => {
        expect(res.status).equal(200);
      });
    });
  }

  /** Добавить товар в корзину с указанием количества
   * @param {selector} items
   * @param {number} count
   */
  addItemToCartWithCount(items, count) {
    let found = false;

    cy.get(items)
      .then(items => {
        items.each((index, item) => {
          if (found) {
            return false;
          }
          const $cardProductElement = Cypress.$(item);
          const totalCount = $cardProductElement.children().find('.product_count');
          if (convertStringToNumber(totalCount.text()) >= count) {
            found = true;
            return cy.wrap($cardProductElement);
          } else {
            throw new Error(`Cannot find item with a quantity of ${count}`);
          }
        });
      })
      .within(() => {
        cy.get('input[name="product-enter-count"]')
          .clear()
          .type(count);
        cy.get(this.itemBuyButton)
          .click();
      });
  }

  // Проверка общего количества товаров в корзине 
  checkingTotalNumberOfItemsInCart(number) {
    cy.get(`${this.basketContainer} .basket-count-items`).should('have.text', number);
  }

  // Проверка наличия товара в корзине
  checkItemsInCart() {
    cy.get('.basket-item-title')
      .as('items')
      .each(item => expect(item.text()).to.be.a('string'));
    cy.get('@items')
      .each(item => {
        cy.wrap(item)
          .siblings(this.basketItemPrice)
          .invoke('text')
          .then(text => expect(convertStringToNumber(text)).to.be.a('number'));
      });
  }

  // Проверка общей стоимости товаров в корзине
  checkTotalPriceInCart() {
    cy.wait(500);
    let total = 0;
    cy.get(this.basketItemPrice)
      .should('be.visible')
      .each(itemPrice => {
        total += convertStringToNumber(itemPrice.text());
      });
    cy.get(`${this.basketContainer} .basket_price`).should(totalPrice => expect(convertStringToNumber(totalPrice.text()), 'Total price').to.equal(total));
  }

  // Переход на страницу корзины
  goToCartPage() {
    cy.get('a[href="/basket"]')
      .should('be.visible')
      .click();
  }

  // Очиста корзины
  clearBasket() {
    cy.request('POST', Cypress.env('CLEAR_BASKET_URL'));
    cy.request('POST', Cypress.env('GET_BASKET_URL'))
      .its('body.basketCount')
      .should('eq', 0);
  }
}

export default new Shopbooks();