describe("All confirm Forgot Password OTP", ()=>{

    let data,options,userId,otp;
    let url = Cypress.config("baseUrl");

    before("Load test data", function(){
        cy.fixture("user").then((userData)=>{
            data = userData.admin.username;
        })
    })

    it("Verify valid OTP can be confirmed", function(){

        cy.ConfirmForgotPasswordOTP(data).then((res)=>{
            expect(res.status).to.eq(200);
            expect(res.body.message).to.eq("Congratulations! OTP Validation Is Successful.");
            expect(res.body.data).to.have.property("user_id").and.to.not.be.null;

        })
        
    })

    it("Verify invalid OTP cannot be confirmed", function(){

         cy.InitiateForgotPassword(data).then((res)=>{
           
            userId =  res.body.data.user_id;

        });

       options = {
        url : url+`/api/v1/admin/auth/confirm-code/${userId}`,
        method : "Post",
        header : {
            "Accept" : "application/json",
            "Content" : "application/json"
        },
        body : {
            "code" : "20000"
        },
        failOnStatusCode : false
    };

    cy.request(options).then((res)=>{
       expect(res.status).to.eq(400);
       expect(res.body.message).to.eq("Invalid code...");
    })
        
    })


    
    it("Verify invalid user id cannot be confirmed", function(){

         cy.InitiateForgotPassword(data).then((res)=>{
           
            otp =  res.body.data.otp;
            cy.log(otp);

            options = {
        url : url+`/api/v1/admin/auth/confirm-code/9c0320d8-8249-4976-b36c-77714718ee4`,
        method : "Post",
        header : {
            "Accept" : "application/json",
            "Content" : "application/json"
        },
        body : {
            "code" : otp
        },
        failOnStatusCode : false
    };

            cy.request(options).then((res)=>{
          expect(res.status).to.eq(400);
         expect(res.body.message).to.eq("Invalid code...");
        })

        });

       
        
    })
})