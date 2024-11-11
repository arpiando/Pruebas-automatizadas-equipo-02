Feature: Cambiar el color a una etiqueta

  @user2 @web
  Scenario: Como usuario quiero cambiar el color a una etiqueta
    Given I navigate to page "http://localhost:2368/ghost/#/signin"
    When I enter the credentials in the login fields
    And I click on sign in
    And I click on the post button
    And I click on the new post button
    And I click on the label button
    And I click on the color button
    And I click on the red color
    Then the label should be red
