
import { faker } from "@faker-js/faker";

describe("Confirm Phone number test suite ",function(){

    let options,data,otp,phoneNumber;
    let url = Cypress.config("baseUrl");

    before("Load test data here",()=>{

        const prefixes = ['080', '081', '070', '090', '091'];
        const prefix = faker.helpers.arrayElement(prefixes);
        const number = faker.string.numeric(8); // Generate remaining 8 digits
        phoneNumber = `${prefix}${number}`;

        cy.sendPhoneOTP(phoneNumber).then((res)=>{
            otp = res;
        }) 

        cy.fixture("user").then((res)=>{
            data = res.phoneNumber;
        })
    })

   
    it("should confirm a valid phone number",function(){

        options = {
            method : "post",
            url : url + `/api/v1/auth/confirm-otp-phone`,
            headers : {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: {
                "phone_number": phoneNumber,
                "otp": otp
            }
        };

        cy.request(options).then((res)=>{
            expect(res.status).to.eq(200);
            expect(res.body.message).to.eq("Phone Number Verified Successfully.");
        })

    })

    it("should not confirm a null OTP ",function(){

        let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3dpbml0LnNic2N1ay5jby51ay9wdWJsaWMvYXBpL3YxL2F1dGgvbG9naW4iLCJpYXQiOjE3NDA5NDYyNTgsImV4cCI6MTc0MDk0OTg1OCwibmJmIjoxNzQwOTQ2MjU4LCJqdGkiOiI0eURhcmZYMUs4NW9WU2FWIiwic3ViIjoiMTUiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.oskqUZLM6rCK79kiDhsh0UCOCyzR506voVJAwVvWl44';

        options = {
            method : "POST",
            url : url+`/api/v1/auth/confirm-otp-phone`,
            headers : {
                "Content-Type": "application/json",
                "Accept": "application/json",
                
            },
            body: {
                "phone_number": data
                
            },
            failOnStatusCode: false,

        };

        cy.request(options).then((res)=>{
           console.log(res.body);
           expect(res.status).to.eq(422);
           expect(res.body.message).to.eq("The otp field is required.")

        })

    })

    it("should not confirm an invalid phone number",function(){

        options = {
            method : "post",
            url : url + `/api/v1/auth/confirm-otp-phone`,
            headers : {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: {
                "phone_number": data,
                "otp": "029201e"
            },
            failOnStatusCode:false
        };

        cy.request(options).then((res)=>{
            expect(res.status).to.eq(400);
            expect(res.body.message).to.eq("Invalid OTP or OTP expired.");
        })

    })
})