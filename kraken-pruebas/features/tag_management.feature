Feature: Crear etiquetas (tags) en la aplicación Ghost

  @user9 @web
Scenario:  Crear etiquetas (tags) en la aplicación Ghost
Given I navigate to page "http://localhost:2368/ghost/#/signin"
When I enter the credentials in the login fields
And I click on sign in
Then I should see the dashboard
When I click on the tags option
And I click on the new tag button
And I enter the tag name
And I click on the save button
Then I should see the tag created
When I click on the tag created

  Scenario: Modificar una etiqueta existente
    Given I navigate to page "http://localhost:2368/ghost/#/signin"
    When I enter the credentials in the login fields
    And I click on sign in
    Then I should see the dashboard
    When I click on the tags option
    And I click on the tag created
    And I enter the new tag name
    And I click on the save button
    Then I should see the tag modified