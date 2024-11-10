Feature: Cambio de tema

#  @user @web
  @user1 @web

Scenario: El usuario debería poder activar el modo oscuro y luego volver al modo claro
    Given I navigate to page "http://localhost:2368/ghost/#/signin"
    When I enter the credentials in the login fields
    And I click on sign in
    Then I should see the dashboard page
    When I click on the dark mode button
    Then I should see the dark mode theme
    When I click on the light mode button
    Then I should see the light mode theme
