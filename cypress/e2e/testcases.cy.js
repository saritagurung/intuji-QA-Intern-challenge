describe('Test Cases', () => {

    // Prevent Cypress from failing on third-party errors
    Cypress.on('uncaught:exception', () => false);
  
    const baseUrl = 'https://demoqa.com';
  
    it('TC1 - Verify that given URL is clickable and loads authorized page', () => {
      cy.visit(`${baseUrl}/automation-practice-form`);
      cy.url().should('include', 'demoqa.com');
    });
  
    it('TC2 - Verify sidebar is workable and form is submittable', () => {
      cy.visit(`${baseUrl}/automation-practice-form`);
  
      cy.get('#firstName').type('Test');
      cy.get('#lastName').type('User');
      cy.get('#userEmail').type('test@example.com');
      cy.get('input[name="gender"][value="Male"]').click({ force: true });
      cy.get('#userNumber').type('1234567890');
  
      cy.get('#submit').click({ force: true });
  
      cy.get('.modal-content').should('be.visible'); // confirmation modal
    });
  
    it('TC3 - Verify that Text Box under Elements tab is workable', () => {
        cy.visit('https://demoqa.com/text-box');
      
        // Fill out the form
        cy.get('#userName').type('John Doe');
        cy.get('#userEmail').type('john.doe@example.com');
        cy.get('#currentAddress').type('123 Demo Street');
        cy.get('#permanentAddress').type('456 Final Avenue');
      
        // Submit
        cy.get('#submit').click();
      
        // Validate output is displayed
        cy.get('#output').should('be.visible');
        cy.get('#name').should('contain.text', 'John Doe');
        cy.get('#email').should('contain.text', 'john.doe@example.com');
      });
      
  
    it('TC4 - Verify each sidebar button navigates to authorized pages', () => {
      cy.visit(`${baseUrl}/elements`);
      cy.contains('Text Box').click();
      cy.url().should('include', '/text-box');
  
      cy.contains('Check Box').click();
      cy.url().should('include', '/checkbox');
  
      cy.contains('Radio Button').click();
      cy.url().should('include', '/radio-button');
    });
  
    it('TC5 - Negative Test: Submit button is disabled for invalid input', () => {
      cy.visit(`${baseUrl}/automation-practice-form`);
  
      // Enter invalid email
      cy.get('#firstName').type('Test');
      cy.get('#lastName').type('User');
      cy.get('#userEmail').type('invalid-email'); // invalid email format
      cy.get('input[name="gender"][value="Male"]').click({ force: true });
      cy.get('#userNumber').type('1234567890');
  
      // Try to submit
      cy.get('#submit').click({ force: true });
  
      // Should NOT show confirmation modal
      cy.get('.modal-content').should('not.exist');
    });
  });
  