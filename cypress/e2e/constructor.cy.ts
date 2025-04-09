/// <reference types="cypress" />
import login from '../fixtures/login.json';
const dialog = '[class^=_dialog]';

describe('constuctor page', () => {
    beforeEach(() => {
        cy.visit('/');
        
    });

    it('show ingredient detail', () => {
        cy.contains('Конструктор');
        cy.contains('Соберите бургер');

        cy.get('#bun > div > div>:first-child').click();
        cy.get(dialog).contains('Детали ингредиента');
        cy.get('[class^=_close]').click();
        cy.get(dialog).should('not.exist');
    });

    it('create order', () => {
       
        cy.get('#bun > div > div>:first-child').as('bun');
        cy.get('#main > div > div>:first-child').as('main');
        cy.get('#sauce > div > div>:first-child').as('sauce');
        
        cy.get('[class^=_empty-element-text]').contains('Перетащите булочку').as('bun-dest');
        cy.get('[class^=_empty-element-text]').contains('Перетащите ингредиенты').as('ingredient-dest');
        cy.get('.button').as('order-button');

        cy.get('@bun').trigger('dragstart');
        cy.get('@bun-dest').trigger('drop');
        cy.get('@main').trigger('dragstart');
        cy.get('@ingredient-dest').trigger('drop');
        cy.get('@order-button').click();

        cy.contains('Вход');
        cy.get('[name=email]').type(login.email);
        cy.get('[name=password]').type(login.password);
        cy.contains('button', 'Войти').click();

        cy.get('@order-button').trigger('click');
        cy.get('.text_type_digits-large', { timeout: 20000 }).contains(/\d+/);
        cy.get('[class^=_close]').click();

        cy.get(dialog).should('not.exist');
    });
})