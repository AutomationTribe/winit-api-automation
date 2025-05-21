describe("All create password test cases",function(){

    let email,userId,options;
    let url = Cypress.config("baseUrl");
    before("Load data for user",()=>{

        cy.fixture("user").then((data)=>{

            email =  data.admin.username;

            cy.ConfirmForgotPasswordOTP(email).then((res)=>{
                userId =  res.body.data.user_id;
            })

        })
    })

    it("should create a valid password",function(){

        options = {
            url : url+`/api/v1/admin/auth/create-password/${userId}`,
            method :'Post',
            header : {
                "Accept" : "applicaton/json",
                "Content-Type" : "application/json"
            },
            body : {
                "password": "P@ssw0rd",
                "password_confirmation": "P@ssw0rd"
            },
            failOnStatusCode: false

        };

        cy.request(options).then((res)=>{

            expect(res.status).to.eq(200);
            expect(res.body.message).to.eq("Congratulations! Password Updated. Please Login.")
        })
    })
})