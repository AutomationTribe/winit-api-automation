// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

let options,otp;
let url = Cypress.config("baseUrl");

Cypress.Commands.add("sendPhoneOTP",(phoneNumber)=>{

    options = {
        method : "post",
        url : url + `/api/v1/auth/send-otp-phone`,
        headers : {
            'Content-type' : 'application/json',
            'Accept' : 'application/json'
        },
        body : {
            "phone_number" : phoneNumber
        }
    };

    cy.request(options).then((res)=>{
        
        expect(res.status).to.eq(200);
       return cy.wrap(res.body.data);

    })
})

Cypress.Commands.add("sendEmailOTP",(email,statusCode)=>{

    options = {
        method : "post",
        url : url + `/api/v1/auth/send-otp-email`,
        headers : {
            'Content-type' : 'application/json',
            'Accept' : 'application/json'
        },
        body : {
            "email": email
        },
        failOnStatusCode: statusCode
    };

    cy.request(options).then((res)=>{
        
       // expect(res.status).to.eq(200);
       return cy.wrap(res);

    })
})