describe("All resend OTP test cases",function(){

    let url = Cypress.config("baseUrl");
    let options;

    it("should resend an OTP",()=>{

        options = {
            url : url+`/api/v1/auth/forgot-password/resend-code/bfeb14ad-dedc-4e33-8d5a-b73185e171ea`,
            method : "GET"
        };

        cy.request(options).then((res)=>{

            expect(res.status).to.eq(200);
        })
    })
})