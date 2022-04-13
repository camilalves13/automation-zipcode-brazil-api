/// <reference types="cypress" />

describe('Automation test ZipCode API - Brazil', () => {

    it('Request a zipcode valid',  () => {
        cy.request({
            method: 'GET',
            url: 'https://viacep.com.br/ws/38401234/json/',
        }).then((response) => {
            expect(response.status).to.be.equal(200);
            expect(response.body.cep).to.be.equal("38401-234");
            expect(response.body.bairro).to.be.equal("Presidente Roosevelt");
            expect(response.body.localidade).to.be.equal("Uberlândia");
            expect(response.body.uf).to.be.equal("MG");

        })
    })

    it('Request an invalid zipcode adding characters',  () => {
        cy.request({
            method: 'GET',
            url: 'https://viacep.com.br/ws/3840123A/json/',
            failOnStatusCode: false
        }).then((response) => {
            console.log(response.body);
            expect(response.status).to.be.equal(400);
        })
    })

    it('Request an invalid zipcode less than 8 digits',  () => {
        cy.request({
            method: 'GET',
            url: 'https://viacep.com.br/ws/38401/json/',
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.be.equal(400);
        })
    })

    
    it('Request an invalid zipcode greater than 5 digits',  () => {
        cy.request({
            method: 'GET',
            url: 'https://viacep.com.br/ws/38401111111/json/',
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.be.equal(400);
        })
    })

    it('Request an inexistent zipcode',  () => {
        cy.request({
            method: 'GET',
            url: 'https://viacep.com.br/ws/001222/json/',
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.be.equal(400);
        })
    })
})