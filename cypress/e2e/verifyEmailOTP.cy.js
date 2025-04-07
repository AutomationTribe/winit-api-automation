describe("All Verify email OTP Test cases",function(){

    let data,options;
    let url = Cypress.config('baseUrl');
    before("Get OTP for a valid email",()=>{

        cy.sendEmailOTP("austin500@yopmail.com",true).then(res=>{
            data = res;
        })

    })

    it("should validate a valid OTP",()=>{
        cy.log(data.body.data);
        console.log(data.body.data);
        options  = {
            url : url +`/api/v1/auth/confirm-otp-email`,
            method : "POST",
            body : {
                "email" : "austin500@yopmail.com",
                "otp" : data.body.data
            },
            failOnStatusCode : false
        };
        
        cy.request(options).then((res)=>{
            expect(res.status).to.eq(200);
            expect(res.body.message).to.eq("Email Verified Successfully.");
        })

    })

    it("should not validate a valid OTP if email is different",()=>{
        cy.log(data.body.data);
        console.log(data.body.data);
        options  = {
            url : url +`/api/v1/auth/confirm-otp-email`,
            method : "POST",
            body : {
                "email" : "austin500@yopmail.com",
                "otp" : data.body.data
            },
            failOnStatusCode : false
        };
        
        cy.request(options).then((res)=>{
            cy.log(res.body);
            console.log(res.body);
            expect(res.status).to.eq(400);
            expect(res.body.message).to.eq("Invalid OTP or OTP expired.");
        })

    })

    it("should not validate a valid OTP if email is different",()=>{
        cy.log(data.body.data);
        console.log(data.body.data);
        options  = {
            url : url +`/api/v1/auth/confirm-otp-email`,
            method : "POST",
            headers:{
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            },
            body : {
                "email" : "austin500@yopmail.com",
                "otp" : null
            },
            failOnStatusCode : false
        };
        
        cy.request(options).then((res)=>{
            cy.log(res.body);
            console.log(res.body);
            expect(res.status).to.eq(422);
            expect(res.body.message).to.eq("The otp field is required.");
        })

    })

    it("should not validate a valid OTP if email is different",()=>{
        cy.log(data.body.data);
        console.log(data.body.data);
        options  = {
            url : url +`/api/v1/auth/confirm-otp-email`,
            method : "POST",
            headers:{
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            },
            body : {
                "email" : "austin500@yopmail.com"
            },
            failOnStatusCode : false
        };
        
        cy.request(options).then((res)=>{
            cy.log(res.body);
            console.log(res.body);
            expect(res.status).to.eq(422);
            expect(res.body.message).to.eq("The otp field is required.");
        })

    })

    it("should not validate a valid OTP if email is different",()=>{
        cy.log(data.body.data);
        console.log(data.body.data);
        options  = {
            url : url +`/api/v1/auth/confirm-otp-email`,
            method : "POST",
            headers:{
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            },
            body : {
                "otp" : data.body.data
            },
            failOnStatusCode : false
        };
        
        cy.request(options).then((res)=>{
            cy.log(res.body);
            console.log(res.body);
            expect(res.status).to.eq(422);
            expect(res.body.message).to.eq("The email field is required.");
        })

    })
    
    
})