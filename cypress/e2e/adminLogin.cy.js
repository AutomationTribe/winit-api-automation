describe("All admin login test caases",function(){

    let options,data;
    before("load test data",function(){
        cy.fixture("user").then((resp)=>{
        
            data = resp;

        })
    })
    it("should login as admin with valid login credentials",()=>{
        cy.log(data.admin);
        
       cy.adminLogin(data.admin.username,data.admin.password).then((res)=>{
            expect(res.status).to.eq(200);
            expect(res.duration).to.lessThan(2000);
            expect(res.body.message).to.eq("Logged In Successfully.")
            expect(res.body.data).have.property("access_token").and.not.null;
       })
    })

    it("should not login as admin with empty username credentials",()=>{
        
       cy.adminLogin("",data.admin.password).then((res)=>{
            expect(res.status).to.eq(422);
            expect(res.duration).to.lessThan(2000);
            expect(res.body.message).to.eq("Email is required");
       })
    })

    it("should not login as admin with empty password credentials",()=>{
        
        cy.adminLogin(data.admin.username,"").then((res)=>{
             expect(res.status).to.eq(422);
             expect(res.duration).to.lessThan(2000);
             expect(res.body.message).to.eq("The password is required");
        })
     })

     it("should not login as admin with non-existing email",()=>{
        
        cy.adminLogin("test@test.com",data.admin.password).then((res)=>{
             expect(res.status).to.eq(400);
             expect(res.duration).to.lessThan(2000);
             expect(res.body.message).to.eq("Invalid email or password");
        })
     })

     it("should not login as admin with non-existing password",()=>{
        
        cy.adminLogin(data.admin.username,"winam").then((res)=>{
             expect(res.status).to.eq(400);
             expect(res.duration).to.lessThan(2000);
             expect(res.body.message).to.eq("Invalid email or password");
        })
     })

     it("should not login as admin with non-existing email or password",()=>{
        
        cy.adminLogin("test@test.com","winam").then((res)=>{
            
             expect(res.status).to.eq(400);
             expect(res.duration).to.lessThan(2000);
             expect(res.body.message).to.eq("Invalid email or password");
        })
     })

})