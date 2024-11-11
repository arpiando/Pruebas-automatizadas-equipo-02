Feature: Reveritir un post a borrador

  @user2 @web
  Scenario: Revertir un post a borrador
    Given I navigate to page "http://localhost:2368/ghost/#/signin"
    When I enter the credentials in the login fields
    And I click on sign in
    And I click on the post
    And I click on the post settings
    And I click on the revert to draft button
    Then I should see the post in the draft section
