import authorization from '../pageObjects/authorization';
import { errorText, erroneousTestData } from '../fixtures/authorization.json';

describe('Authorization', () => {

  beforeEach(() => {
    cy.visit('/login');
  });

  context('positive tests', () => {

    it('authorization check and field validation', { tags: '@smoke' }, () => {
      cy.get(authorization.loginField).should('be.visible');
      authorization.fillLoginField(Cypress.env('USER_LOGIN')).should('have.css', 'border-color', authorization.validBorderColor);
      cy.get('#loginform-username').clear()
      cy.get(authorization.passwordField).should('be.visible');
      authorization.fillPasswordField(Cypress.env('USER_PASS')).should('have.css', 'border-color', authorization.validBorderColor);
      cy.get('#loginform-password').clear()
      cy.get(authorization.submitButton).should('be.visible');
      cy.loginByWebForm();
      cy.get('#dropdownUser').should('have.text', Cypress.env('USER_LOGIN'));
      cy.get('.site-error').should('not.exist')
    });

    context('negative tests', () => {

      it('error checking', () => {
        authorization.fillLoginField(' ')
          .as('loginField')
          .clear()
          .should('have.css', 'border-color', authorization.invalidBorderColor);
        authorization.getErrorText('@loginField').should('eq', errorText.login);
        cy.get(authorization.passwordField)
          .as('passwordField')
          .should('have.css', 'border-color', authorization.invalidBorderColor);
        authorization.getErrorText('@passwordField').should('eq', errorText.password);
      });

      for (const data of erroneousTestData) {
        it(`invalid login [${data.login} : ${data.pass}]`, () => {
          cy.loginByWebForm(data.login, data.pass);
          cy.get(authorization.authorizationErrorElement).should('have.text', errorText.authorization);
        });
      }
    });
  });
});