describe("Send otp to phone test suite",()=>{

    let options,data,otp;
    let url = Cypress.config('baseUrl');


    before("Load user data",function(){
        cy.fixture('user').then((res)=>{
            data = res;
        })
    })

      it("should  send an OTP for a valid phone number",()=>{

        options = {
            method: "post",
            url: url + `/api/v1/auth/send-otp-phone`,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body : {
                "phone_number" : data.phoneNumber
            },
            failOnStatusCode:false
        }

        cy.request(options).then((res)=>{

            expect(res.status).to.eq(200);
            expect(res.body.message).to.eq("OTP Sent To Your Phone Successfully. Note: If Your Number Is On DND, You May Not Receive The OTP.");
            expect(res.body).to.have.property("data").and.not.null;
            otp = res.body.data;
            cy.writeFile("cypress/fixtures/otp.json",{otp});


        });
    })


    it("should not send an OTP for an empty phone number",()=>{

        options = {
            method: "post",
            failOnStatusCode: false,
            url: url + `/api/v1/auth/send-otp-phone`,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body : {
                "phone_number" : null,
            },
            failOnStatusCode:false

        }

        cy.request(options).then((res)=>{
            expect(res.status).to.eq(422);
           
        });
    })

    
    it("should not send an OTP for a invalid phone number",()=>{

        options = {
            method: "post",
            url: url + `/api/v1/auth/send-otp-phone`,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body : {
                "phone_number" : "0706818192828282"
            },
            failOnStatusCode:false
    
        }

        cy.request(options).then((res)=>{

            expect(res.status).to.eq(422);
           

        });
    })
})