
import {faker} from '@faker-js/faker'

describe("All register test cases",()=>{

    let options,email,phone,prefixes;
    let url = Cypress.config('baseUrl');

    before("Create test data",function(){

    email = faker.internet.username().toLowerCase() + '@yopmail.com';
    prefixes = ['080', '081', '090', '070', '091'];
    phone = faker.helpers.arrayElement(prefixes) + faker.string.numeric(8);
    cy.log('Email: ' + email);
    cy.log('Phone: ' + phone);

    cy.verifyPhoneOTP(phone);
    cy.verifyEmailOTP(email);

    })

    it("should register with valid user data",()=>{

        options = { 
            url : url +`/api/v1/auth/signup`,
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            },
            body : {
                "email": email,
                 "phone_number": phone,
                 "password": "Password@12345",
                 "password_confirmation": "Password@12345",
                 "confirm_resident": true,
                 "lga": "eti-osa",
                 "optIn_exclusive_offer": true,
                 "above18": true,
                 "heard_from": "Social Media",
                 "fcm_token": ""
            }
        };

        cy.request(options).then((res)=>{
            expect(res.status).to.eq(200);
        })

    })


})