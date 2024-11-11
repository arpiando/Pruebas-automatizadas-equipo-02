Feature: Modificar un post existente

  @user2 @web
  Scenario: Modificar un post existente
    Given I navigate to page "http://localhost:2368/ghost/#/signin"
    When I enter the credentials in the login fields
    And I click on sign in
    And I navigate to page "http://localhost:2368/ghost/#/posts"
    And I click on the post with title "Post de prueba"
    And I click on the edit button
    And I modify the title to "Post de prueba modificado"
    And I click on the save button
    Then I should see the post with title "Post de prueba modificado"