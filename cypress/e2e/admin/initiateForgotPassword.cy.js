
describe("All initiate forgot password test cases",()=>{

    let data;
    before("Load test data",function(){

        cy.fixture("user").then((userData)=>{

            data = userData;
        })
    })
    it("Verify that a user can initiate forgot password with email of existing user", function(){

        cy.InitiateForgotPassword(data.admin.username).then((res)=>{
            expect(res.status).to.eq(200);
        })
    })

    it("Verify that a user cannot initiate forgot password with an email of a non-existing user",function(){

        cy.InitiateForgotPassword("john@doe.com").then((res)=>{
            expect(res.status).to.eq(404);
            expect(res.body.message).to.eq("User not found.");
        })
    })

     it("Verify that a user cannot initiate forgot password with an invalid email",function(){

        cy.InitiateForgotPassword("john doe").then((res)=>{
            expect(res.status).to.eq(422);
            expect(res.body.message).to.eq("Invalid email");
        })
    })

})