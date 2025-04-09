

describe("All create password test cases",function(){

    let username,otp,userId,options,data;
    let url = Cypress.config("baseUrl");
    before("Load data",function(){

        cy.fixture("user").then((response)=>{

            data = response;
            username = data.email;
            cy.log(username);

           cy.InitiateForgotPassword(username).then((res)=>{

               userId = res.body.data.user_id;
               otp = res.body.data.otp;

               cy.confirmPasswordOTP(userId,otp).then((res1)=>{

                cy.log(res1.status);

               })

            });

        });
    })
    it("should create a new password",function(){

       options = {
        url : url+`/api/v1/auth/forgot-password/create-password/${userId}`,
        method : "POST",
        headers: { 
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        },
        body : {

            "password": data.password,
            "password_confirmation": data.password
        }

       };

       cy.request(options).then((res)=>{

        expect(res.status).to.eq(200);

       });

    })
})