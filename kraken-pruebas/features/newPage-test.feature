Feature: Crear página en Ghost

  @user1 @web
  Scenario: Como usuario quiero crear una nueva página en el portal administrativo de Ghost
    Given I navigate to page "http://localhost:2368/ghost/#/signin"
    When I enter "of.munoz@uniandes.edu.co" in the "email" field and "Lucas3113*" in the "password" field
    When I click on sign in
    Then I should see the dashboard page
    When I navigate to the "Pages" section
    And I click on "New page"
    And I enter "Título de prueba" in the title field
    And I enter "Contenido de prueba para la página" in the content field
    When I click on "Publish"
    Then I should see "Continue, final review" confirmation message and "Publish page, right now"


