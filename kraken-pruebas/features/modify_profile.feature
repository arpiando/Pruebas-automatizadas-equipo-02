Feature: Gestión de miembros en la aplicación

#  @user @web
  @user6 @web

  Scenario: Crear un nuevo miembro exitosamente
    Given I navigate to page "http://localhost:2368/ghost/#/signin"
    When I enter the credentials in the login fields
    And I click on sign in
#    When I click on "Members"
#    And I click on "New member"
#    And I enter the member's email
#    And I click on "Send invitation"
#    Then I should see the message "Invitation sent!"


