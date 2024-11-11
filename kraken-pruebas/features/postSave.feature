Feature: Guardar un post como borrador

  @user2 @web
  Scenario: Guardar un post como borrador
    Given I navigate to page "http://localhost:2368/ghost/#/signin"
    When I enter the credentials in the login fields
    And I click on sign in
    And I navigate to page "http://localhost:2368/ghost/#/posts"
    And I click on "New post"
    And I enter "Post de prueba" in the title field
    And I enter "Este es un post de prueba" in the content field
    And I click on "Save draft"
    Then I should see the message "All changes saved as draft"