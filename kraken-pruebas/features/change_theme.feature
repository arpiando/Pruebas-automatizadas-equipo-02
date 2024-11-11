Feature: Cambiar el tema de la pagina Ghost
#  @user @web
@user5 @web
  Scenario: Como usuario quiero cambiar el tema de la pagina de inicio de la aplicacion de Ghost
  Given I navigate to page "http://localhost:2368/ghost/#/signin"
  When I enter the credentials in the login fields
  And I click on sign in
  Given I navigate to page "http://localhost:2368/ghost/#/settings/design/change-theme"
#    When I click on the theme dropdown
#  And I click on the save button
#  Then I should see the theme "Dawn" in the theme dropdown