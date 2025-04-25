describe('Send Email OTP Test Cases', () => {
    
let data;


    it("should send OTP to a valid email address",function(){

        cy.sendEmailOTP("austin500@yopmail.com",true).then(res=>{
            data = res;
            expect(data.body.message).to.eq("OTP Sent To Your Email Successfully. Check Your SPAM Box If You Do Not See It In Your Inbox.");
        expect(data.status).to.eq(200);
        expect(data.body).to.have.property('data').and.not.null;
         })
        
    })

    it("should not send OTP to an invalid email address",function(){
      
        cy.sendEmailOTP("austin",false).then((res)=>{
            expect(res.status).to.eq(422);
            expect(res.body.message).to.eq("Please enter a valid email address.");
        })
        
        
    })
})