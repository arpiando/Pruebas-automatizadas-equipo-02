Feature: Crear etiqueta con datos invalidos

  @user2 @web
  Scenario: Crear etiqueta con datos invalidos
    Given I navigate to page "http://localhost:2368/ghost/#/signin"
    When I enter the credentials in the login fields
    And I click on sign in
    And I navigate to page "http://localhost:2368/ghost/#/tags"
    And I click on new tag
    And I enter the tag name
    And I enter the tag description
    And I click on save tag
    Then I should see the error message
