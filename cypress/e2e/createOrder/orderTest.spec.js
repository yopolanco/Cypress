import {Given,When,Then, And} from 'cypress-cucumber-preprocessor/steps';
import ordersPOM from '../pageObject/ordersPOM'

Given("The user accesses the Amazon page",()=>{
    ordersPOM.loadPage();
})

And("The web page loads correctly",()=>{
    ordersPOM.logo.should('be.visible')
})

When("The user tries to log in with username and password",()=>{
    const user=Cypress.env('user')
    const password=Cypress.env('password')
    ordersPOM.logIN(user,password)
})

Then("The user should see the welcome message",()=>{
    ordersPOM.logo.should('be.visible')
    ordersPOM.userLoggedIn.should('contain','Hello')
})

When("The user searches {string} in the search bar",(item)=>{
    ordersPOM.searchProducts(item)
})

Then("The amazon page shows the list of items available to buy",()=>{
    ordersPOM.products.should('be.visible')
})

And("Add an item to the cart",()=>{
    ordersPOM.selectListItemByIndex(ordersPOM.products,0)
    ordersPOM.addCart()
})

Then("The item is added to the cart successfully",()=>{
    ordersPOM.openCartButton.click()
    ordersPOM.deleteButton.should('be.visible')
})

And("Open the shopping cart",()=>{
    ordersPOM.openCartButton.click()
})

And("The user deletes the article {string} that was added",(deleteValue)=>{
    deleteValue=deleteValue.length==0?0:isNaN(deleteValue)?0:parseInt(deleteValue);
    const deleteVal=deleteValue>0?(deleteValue-1):deleteValue;
    ordersPOM.selectListItemByIndex(ordersPOM.deleteButton,deleteVal)
})

Then("The amazon page shows the notification that the item was removed",()=>{
    cy.log("Este es el texto "+ ordersPOM.emptyCar.invoke('text'))
    ordersPOM.emptyCar.invoke('text').should('contain','was removed from Shopping Cart')
})

And("The user sorts the search result by {string}",(orderBy)=>{
    ordersPOM.sortByButton.click()
    ordersPOM.selectListItemBytext(ordersPOM.sortByList,orderBy)
})

And("The user tries to checkout",()=>{
    ordersPOM.checkOutButton.click()
    ordersPOM.changeAdressBtn.should('be.visible')
    ordersPOM.changeAdressBtn.click()
    ordersPOM.selectAddressButton.click()
    ordersPOM.changeAdressBtn.should('be.visible')
})

Then("The amazon page shows the selected items and the total to pay",()=>{
    ordersPOM.validateListData(ordersPOM.orderSumary,'$')
    ordersPOM.totalOrder.should('be.visible').invoke('text').should('not.be.empty').should('contain', '$')
    ordersPOM.checkSum(ordersPOM.subTotal)
}) 
