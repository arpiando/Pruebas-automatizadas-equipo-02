Feature: Inicio de sesión negativo en Ghost

#  @user @web
  @user3 @web
  Scenario: Mostrar mensaje de error cuando se ingresan credenciales incorrectas
    Given I navigate to page "http://localhost:2368/ghost/#/signin"
    When I enter incorrect credentials in the login fields
    And I click on sign in
    Then I should see an error message