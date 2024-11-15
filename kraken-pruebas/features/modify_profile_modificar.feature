Feature: Modificar la informacion de un usuario existente

  @user8 @web

Scenario: Modificar la informacion de un usuario existente
Given I navigate to page "http://localhost:2368/ghost/#/signin"
When I enter the credentials in the login fields
And I click on sign in
When I click on "Members"
And I click on "Edit member"
And I change the member's email
And I click on "Save"
Then I should see the message "Member updated!"