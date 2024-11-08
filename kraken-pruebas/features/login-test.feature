Feature: Inicio de sesión en Ghost

  @user1 @web
  Scenario: Como usuario quiero iniciar sesión en el portal administrativo de Ghost
    Given I navigate to page "http://localhost:2368/ghost/#/signin"
    When I enter "of.munoz@uniandes.edu.co" in the "email" field and "Lucas3113*" in the "password" field
    When I click on sign in
    Then I should see the dashboard page


