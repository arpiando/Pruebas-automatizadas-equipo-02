Feature: Inicio de sesión positivo en Ghost

  @user2 @web
  Scenario: Como usuario quiero iniciar sesión en el portal administrativo de Ghost
    Given I navigate to page "http://localhost:2368/ghost/#/signin"
    When I enter the credentials in the login fields
    And I click on sign in
    Then I should see the dashboard page
