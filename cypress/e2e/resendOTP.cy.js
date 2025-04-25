describe("All resend OTP test cases",function(){

    let url = Cypress.config("baseUrl");
    let options,userId;

    before("Get user id",function(){

        cy.fixture("user").then((data)=>{

            cy.InitiateForgotPassword(data.email).then((res)=>{
                userId = res.body.data.user_id;
            })

        })
        
    })

    it("should resend an OTP",()=>{

        options = {
            url : url+`/api/v1/auth/forgot-password/resend-code/${userId}`,
            method : "GET"
        };

        cy.request(options).then((res)=>{

            expect(res.status).to.eq(200);
        })
    })
})