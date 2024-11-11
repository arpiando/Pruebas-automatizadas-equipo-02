Feature: Crear un post exitosamente

  @user2 @web
  Scenario: Como usuario quiero crear un post exitosamente
    Given I navigate to page "http://localhost:2368/ghost/#/signin"
    When I enter the credentials in the login fields
    And I click on sign in
    And I click on new post