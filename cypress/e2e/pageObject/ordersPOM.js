class ordersPOM {

loadPage(){
    cy.viewport('macbook-16')
    cy.wait(2000)
    cy.visit('https://www.amazon.com/',{ timeout: 10000 })
    this.logo.should('be.visible')
    this.ignoreException();
    
}

ignoreException(){
    cy.on('uncaught:exception', (err, runnable) => {

        return false
        
       })
}


get logo(){
    cy.wait(2000)
    return cy.get('#nav-logo-sprites')
}

get signIn(){
    cy.wait(2000)
    return cy.get('#nav-link-accountList-nav-line-1')
}

get userName(){
    cy.wait(2000)
    return cy.get('#ap_email')
}

get signContinue(){
    return cy.get('#continue')
}

get password(){
    return cy.get('#ap_password')
}

get signInButton(){
    return cy.get('#signInSubmit')
}

get userLoggedIn(){
    return cy.get('#nav-link-accountList-nav-line-1')
}

get searchBarch(){
    cy.wait(2000)
    return cy.get('#twotabsearchtextbox')
}

get searchButton(){
    cy.wait(2000)
    return cy.get('#nav-search-submit-button')
}

get sortByButton(){
    cy.wait(2000)
    return cy.xpath('//*[@id="search"]/span/div/h1/div/div[2]/div/div/form')
}

get sortByList(){
    cy.wait(2000)
    return cy.get('[class="a-dropdown-item"]')
}

get products(){
    cy.wait(2000)
    return cy.get('#search > div > div > div > span > div > div > div > div > div > div > div > div > div > div > div.sg-row > div > div > div > div > a > span > span:nth-child(2)')
}

get addCartButton(){
    return cy.get('#add-to-cart-button')
}

get notCoverage(){
    return cy.get('#attachSiNoCoverage > span > input')
}

get openCartButton(){
    cy.wait(2000)
    return cy.get('#nav-cart')
}

get deleteButton(){
    cy.wait(2000)
    return cy.get('#activeCartViewForm > div > div > div > div > div > div > span:nth-child(3) > span > input')
}

get emptyCar(){
    cy.wait(2000)
    return cy.get('[class="sc-list-item-removed-msg"] > div:nth-child(1) > span ')
}


get checkOutButton(){
    return cy.get('#sc-buy-box-ptc-button > span > input')
}

get changeAdressBtn(){
    cy.wait(2000)
    return cy.get('#addressChangeLinkId')
}

get selectAddressButton(){
    cy.wait(2000)
    return cy.get('#shipToThisAddressButton > span > input')
}

get orderSumary(){
    cy.wait(2000)
    return cy.get('#subtotals-marketplace-table > table > tbody > tr.order-summary-unidenfitied-style > td:nth-child(2)')
}

get beforeTax(){
    cy.wait(2000)
    return cy.get('#subtotals-marketplace-table > table > tbody > tr:nth-child(4) > td:nth-child(2)')
}

get tax(){
    cy.wait(2000)
    return cy.get('#subtotals-marketplace-table > table > tbody > tr:nth-child(5) > td:nth-child(2)')
}

get totalOrder(){
    cy.wait(2000)
    return cy.get('#subtotals-marketplace-table > table > tbody > tr.order-summary-grand-total').next().find('td:nth-child(2)')
}

get subTotal(){
    cy.wait(2000)
    return cy.get('#subtotals-marketplace-table > table > tbody > tr.order-summary-separator')
}

checkSum(a){
    a.then(($a)=>{
        let beforeTax=$a.next()
        let tax=beforeTax.next()
        let total=tax.next().next()
        
        beforeTax=parseFloat(beforeTax.find('td:nth-child(2)').text().replace('$','').replace(' ',''))
        tax=parseFloat(tax.find('td:nth-child(2)').text().replace('$','').replace(' ',''))
        total=parseFloat(total.find('td:nth-child(2)').text().replace('$','').replace(' ',''))
         
        cy.wrap((beforeTax+tax).toString()).should('contain', total)
    })

}

logIN(username,password){
        this.logo.should('be.visible')
        this.signIn.click()
        this.userName.should('be.visible')
        this.userName.click().type(username)
        this.signContinue.should('be.visible')
        this.signContinue.click()
        this.password.should('be.visible')
        this.password.click().type(password)
        this.signInButton.should('be.visible')
        this.signInButton.click()

}

searchProducts(product){
    this.searchBarch.should('be.visible')
    this.searchBarch.click().type(product)
    this.searchButton.should('be.visible')
    cy.wait(2000)
    this.searchButton.click()
    this.products.should('be.visible')
}


validateListData(list,search){
    list.each(($list)=>{
        cy.wrap($list).should('be.visible').invoke('text').should('not.be.empty').should('contain', search)
    })

}


selectListItemBytext(list,element){

    list.each(($list)=>{
        cy.log("Data to select "+$list.text())
        
        if($list.text().toUpperCase().includes(element.toUpperCase())){
            cy.log($list+" "+$list.text())
            cy.wrap($list).click()
            cy.wait(2000)
            return false;
       }
    })
}

selectListItemByIndex(list,selectIndex){
    
    list.each(($list,index)=>{
        cy.log("selected index "+$list.text()+" "+index+" "+selectIndex)
        
        if(index===selectIndex){
            cy.log($list+" "+$list.text())
            cy.wrap($list).click()
            cy.wait(2000)
            return false;
       }
    })
}

closeHintScreen(webElement){
    cy.get('body').then($body =>{
         if($body.find(webElement).length){
            cy.get(webElement).click();
         }
 
     })
 }


addCart(){
    this.addCartButton.should('be.visible')
    this.addCartButton.click()
    cy.wait(2000)
    this.closeHintScreen('#attachSiNoCoverage > span > input');
    this.closeHintScreen('#attach-close_sideSheet-link'); 
}

} export default new ordersPOM