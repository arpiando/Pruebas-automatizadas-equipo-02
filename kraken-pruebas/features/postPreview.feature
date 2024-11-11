Feature:  Previsualizar un post

  @user2 @web
  Scenario: Previsualizar un post
    Given I navigate to page "http://localhost:2368/ghost/#/signin"
    When I enter the credentials in the login fields
    And I click on sign in
    And I click on new post
    And I enter the title in the title field
    And I enter the content in the content field
    And I click on the eye icon
    Then I should see the preview of the post
