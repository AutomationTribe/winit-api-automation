describe("All logout test cases",function(){

    let accessToken,options;
    let url = Cypress.config("baseUrl");
    before("Get access token",function(){

        cy.fixture("user").then((res)=>{

            cy.login(res.email,res.password).then((response)=>{
               // cy.log(response.body.data.access_token);
                accessToken = response.body.data.access_token;
            })
        })
    })

    it("should log authenticated user out",function(){

        options = {
            url : url+`/api/v1/auth/logout`,
            headers : {
                "Content-type" : "application/json",
                "Accept" : "application/json",
                "Authorization" : `Bearer${accessToken}`
            }
        };

        cy.request(options).then((res)=>{
            expect(res.status).to.eq(200);
            expect(res.body.message).to.eq("Successfully Logged Out");
        })

        
    })

    it("should not log unauthenticated user out",function(){

        options = {
            url : url+`/api/v1/auth/logout`,
            headers : {
                "Content-type" : "application/json",
                "Accept" : "application/json",
                
            },
            failOnStatusCode:false
        };

        cy.request(options).then((res)=>{
            expect(res.status).to.eq(401);
            expect(res.body.message).to.eq("Unauthenticated.");
        })

        
    })
})