Feature: Eliminar eiqueta existente

  @user2 @web
  Scenario: Eliminar etiqueta existente
    Given I navigate to page "http://localhost:2368/ghost/#/signin"
    When I enter the credentials in the login fields
    And I click on sign in
    And I navigate to page "http://localhost:2368/ghost/#/tags"
    And I click on the tag "tag1"
    And I click on the delete tag button
    Then I should see the tag "tag1" is not in the list of tags