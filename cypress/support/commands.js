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

let options,otp,data;
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

Cypress.Commands.add("login",function(username,password){
    
    options = {
        url : url+`/api/v1/auth/login`,
        method: "POST",
        headers:{
            "Content-type" : "application/json",
            "Accept" : "application/json"
        },
        body:{
            "username" : username,
            "password" : password,
            "remember_me" : true
        },
        failOnStatusCode:false
    };

    cy.request(options).then((res)=>{
        return cy.wrap(res);
    })

   
})

Cypress.Commands.add("verifyPhoneOTP",function(phoneNumber){

    cy.sendPhoneOTP(phoneNumber).then((res)=>{

        otp = res;

        options = {
            url : url+`/api/v1/auth/confirm-otp-phone`,
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            },
            body : {
                "phone_number" : phoneNumber,
                "otp" : otp
            }
        };

        cy.request(options).then((response)=>{
            
            return cy.wrap(response);
        })
    })
})


Cypress.Commands.add("verifyEmailOTP",function(email){

    cy.sendEmailOTP(email).then((res)=>{

        otp = res.body.data;

        options = {
            url : url+`/api/v1/auth/confirm-otp-email`,
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            },
            body : {
                "email" : email,
                "otp" : otp
            }
        };

        cy.request(options).then((response)=>{
            
            return cy.wrap(response);
        })
    })
})

Cypress.Commands.add("InitiateForgotPassword",(username)=>{

    options = {
        url : url+`/api/v1/auth/forgot-password/send-code`,
        method: "POST",
        headers : {
            "Content-type" : "application/json",
            "Accept" : "application/json"
        },
        body : {
            "username" : username
        },
        failOnStatusCode:false
    };

    cy.request(options).then((res)=>{

        return cy.wrap(res);
    })
})

Cypress.Commands.add("confirmPasswordOTP",function(userId,otp){

    options = { 
        url : url+`/api/v1/auth/forgot-password/confirm-code/${userId}`,
        method : "POST",
        headers : {
            "Content-type" : "application/json",
            "Accept" : "application/json"
        },
        body : { 
            "code" : otp
        },
        failOnStatusCode : false
    };

    cy.request(options).then((res)=>{

        return cy.wrap(res);
    })
   
    
})