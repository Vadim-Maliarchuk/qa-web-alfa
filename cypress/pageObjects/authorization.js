class Authorization {

  get loginField() { return '#loginform-username'; }
  get passwordField() { return '#loginform-password'; }
  get submitButton() { return 'button[type="submit"]'; }
  get errorValidationElement() { return '.invalid-feedback'; }
  get authorizationErrorElement() { return '.error-password-feedback'; }

  /**
   * @param {string} login - ввод логина
   */
  fillLoginField(login) {
    return cy.get(this.loginField).type(login);
  }

  /**
   * @param {string} password - ввод пароля
   */
  fillPasswordField(password) {
    return cy.get(this.passwordField).type(password);
  }

  submit() {
    cy.get(this.submitButton).click();
  }

  /**
   * @param {element} element - селектор элемента
   * @returns
   */
  getErrorText(element) {
    return cy.get(element)
      .siblings(this.errorValidationElement)
      .invoke('text')
      .normalizeText();
  }
}

export default new Authorization();