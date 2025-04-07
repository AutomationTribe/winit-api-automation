describe("All login test cases",()=>{

    let data;

    before("Load user data",function(){
        cy.fixture('user').then((res)=>{

            data = res;
        })
    })

    it("should login with valid login credentials",function(){

        cy.login(data.email,data.password).then((res)=>{

            expect(res.status).to.eq(200);
            expect(res.body.message).to.eq("Logged In Successfully.");

        })
    })

    it("should not login with non-existing username or email",function(){

        cy.login("austin101@yopmail.com","password").then((res)=>{

            expect(res.status).to.eq(400);
            expect(res.body.message).to.eq("Invalid email or password");

        })
    })

    it("should not login with non-existing password",function(){

        cy.login("austin20@yopmail.com","password101").then((res)=>{

            expect(res.status).to.eq(400);
            expect(res.body.message).to.eq("Invalid email or password");

        })
    })
})