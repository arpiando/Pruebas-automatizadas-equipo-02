Feature: Crear página en Ghost

  @user4 @web
  Scenario:  Como usuario quiero crear una nueva página en el portal administrativo de Ghost
    Given I navigate to page "http://localhost:2368/ghost/#/signin"
    When I enter the credentials in the login fields
    And I click on sign in
    Then I should see the dashboard page
    When I navigate to the "Pages" section
    And I click on "New page"
    And I enter "Título de prueba" in the title field
    And I enter "Contenido de prueba para la página" in the content field
    When I click on "Publish", and is finished
#    Then I should see "Continue, final review" confirmation message and "Publish page, right now"


