describe("All forgot password test cases",function(){

    let url = Cypress.config("baseUrl");
    let username;

    before("Load test data",function(){

        cy.fixture("user").then((res)=>{
            username = res.email;
        })
    })


    it("should initiate forgot password",()=>{

        cy.InitiateForgotPassword(username).then((res)=>{
            
            expect(res.status).to.eq(200);
            expect(res.body.message).to.eq("New OTP Code Sent To Your Registered Email. Kindly Check.");
            expect(res.body.data).to.have.property("user_id").and.not.null;
            expect(res.body.data).to.have.property("otp").and.not.null;
            
        })
    })
})