/// <reference types="cypress" />

import shopbooks from '../pageObjects/shopbooks';

describe('Shopbooks', () => {

  beforeEach(() => {
    cy.loginByAPI();
    shopbooks.clearBasket();
    cy.visit('/');
    shopbooks.isReady();
  });

  it('go to empty cart', { tags: ['@testCase', '@smoke'] }, () => {
    cy.get(shopbooks.itemsPage).should('be.visible');
    shopbooks.openPopupCart();
    shopbooks.goToCartPage();
    cy.get('.site-error').should('not.exist');
  });

  it('go to cart with 1 non-promotional item', { tags: '@testCase' }, () => {
    shopbooks.addToCart(shopbooks.itemsPageWithoutDiscount);
    shopbooks.checkingTotalNumberOfItemsInCart(1);
    shopbooks.openPopupCart();
    shopbooks.checkItemsInCart();
    shopbooks.checkTotalPriceInCart();
    shopbooks.goToCartPage();
    cy.get('.site-error').should('not.exist');
  });

  it('go to cart with 1 promotional item', { tags: '@testCase' }, () => {
    shopbooks.addToCart(shopbooks.itemsPageWithDiscount);
    shopbooks.checkingTotalNumberOfItemsInCart(1);
    shopbooks.openPopupCart();
    shopbooks.checkItemsInCart();
    shopbooks.checkTotalPriceInCart();
    shopbooks.goToCartPage();
    cy.get('.site-error').should('not.exist');
  });

  it('go to cart with 9 different products', { tags: '@testCase' }, () => {
    shopbooks.addOneItemInCartByAPI(10);
    for (let i = 0; i <= 7; i++) {
      shopbooks.getTheItemNumberAndAddItToCart(i);
    }
    shopbooks.checkingTotalNumberOfItemsInCart(9);
    shopbooks.openPopupCart();
    for (let i = 0; i < 9; i++) {
      shopbooks.checkItemsInCart();
    }
    shopbooks.goToCartPage();
    cy.get('.site-error').should('not.exist');
  });

  it('go to cart with 9 promotional items of the same name', { tags: '@testCase' }, () => {
    shopbooks.addItemToCartWithCount(shopbooks.itemsPageWithoutDiscount, 9);
    shopbooks.checkingTotalNumberOfItemsInCart(9);
    shopbooks.openPopupCart();
    shopbooks.checkTotalPriceInCart();
    shopbooks.goToCartPage();
    cy.get('.site-error').should('not.exist');
  });
});