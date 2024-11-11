Feature: Crear un miembro con datos invalidos

  @user7 @web

Scenario: Intentar crear un miembro con datos inválidos
Given I navigate to page "http://localhost:2368/ghost/#/signin"
When I enter the credentials in the login fields
And I click on sign in
When I click on "Members"
And I click on "New member"
And I enter an invalid email
And I click on "Send invitation"
Then I should see the message "Invalid email"

