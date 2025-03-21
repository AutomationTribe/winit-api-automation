
describe("Confirm Phone number test suite ",function(){

    let options,data,otp;
    let url = Cypress.config("baseUrl");

    before("Load test data here",()=>{

        cy.readFile("cypress/fixtures/otp.json").then((res)=>{

            otp = res.otp;
        });

        cy.fixture("user").then((res)=>{
            data = res.phoneNumber;
        })
    })

    it("should confirm a valid phone number",function(){

        options = {
            method : "post",
            url : url + `/api/v1/auth/confirm-otp-phone`,
            header : {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: {
                "phone_number": data,
                "otp": otp
            }
        };

        cy.request(options).then((res)=>{
            expect(res.status).to.eq(200);
        })

    })
})