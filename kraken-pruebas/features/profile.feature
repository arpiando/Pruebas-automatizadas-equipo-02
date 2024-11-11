Feature: El usuario deberia poder modificar su nombre de perfil

  @user2 @web
  Scenario: Como usuario quiero modificar mi nombre de perfil
    Given I navigate to page "http://localhost:2368/ghost/#/signin"
    When I enter the credentials in the login fields
    And I click on sign in
    Then I should see the dashboard
    When I click on the user profile
    And I click on the profile settings
    And I change the name of the profile
    And I click on the save button
    Then I should see the profile updated

