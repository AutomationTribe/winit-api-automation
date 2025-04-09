describe("All confirm Password OTP test cases",function(){

    let username,otp,userId,options;
    let url = Cypress.config("baseUrl");

    before("Get OTP and User id",()=>{

        cy.fixture("user").then((res)=>{

            username = res.email;

            cy.InitiateForgotPassword(username).then((response)=>{
                otp = response.body.data.otp;
                userId = response.body.data.user_id;
            })
        })
    })

    it("should validate forgot password OTP",function(){

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

            expect(res.status).to.eq(200);
            expect(res.body.message).to.eq("Congratulations! OTP Validation Is Successful.");
            expect(res.body.data).to.have.property("user_id").and.not.null;
        })
    })
})