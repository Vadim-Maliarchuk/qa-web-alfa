import authorization from '../pageObjects/authorization';

Cypress.Commands.add('getCsrfToken', () => {
  return cy.request('GET', '/')
    .its('body')
    .then((body) => {
      const csrfMetaTag = body.match(/<meta name="csrf-token" content="(.+?)"/);
      if (csrfMetaTag) {
        return csrfMetaTag[1];
      } else {
        throw new Error('CSRF token not found');
      }
    });
});

Cypress.Commands.add('loginByAPI', (username = Cypress.env('USER_LOGIN'), password = Cypress.env('USER_PASS')) => {
  cy.session({ auth: { username, password } }, () => {
    cy.getCsrfToken()
      .then(token => {
        cy.request({
          method: 'POST',
          url: Cypress.env('LOGIN_URL'),
          form: true,
          body: {
            _csrf: token,
            'LoginForm[username]': username,
            'LoginForm[password]': password,
            'LoginForm[rememberMe]': 1,
            'login-button': ''
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((response) => {
          expect(response.status, 'Login successful').to.equal(200);
        });
      });
  });
});

Cypress.Commands.add('loginByWebForm', (username = Cypress.env('USER_LOGIN'), password = Cypress.env('USER_PASS')) => {
  authorization.fillLoginField(username);
  authorization.fillPasswordField(password);
  authorization.submit();
});

Cypress.Commands.add('normalizeText', { prevSubject: 'text' }, (text) => {
  return text
    .replace(/\n/g, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/\u00a0/g, ' ')
    .trim();
});