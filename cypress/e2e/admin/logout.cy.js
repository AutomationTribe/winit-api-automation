describe("All admin logout test cases",()=>{


    let url = Cypress.config("baseUrl");
    let data,token,options;
    before("Admin login and data",()=>{

        cy.fixture("user").then((resp)=>{
            data = resp;
            cy.adminLogin(data.admin.username,data.admin.password).then((res)=>{
                token = res.body.data.access_token;
            })
        })

    })


    it("should logout admin user out",()=>{

        options = {
            method : "GET",
            url : url+`/api/v1/admin/logout`,
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer${token}`
            }
        };

        cy.request(options).then((res)=>{
            expect(res.status).to.eq(200);
            expect(res.body.message).to.eq("Successfully Logged Out");
        })
    })
})