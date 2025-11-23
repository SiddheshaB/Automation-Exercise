Feature: Verify subscription and scroll functionality on Home Page

  Scenario: Verify subscription and scroll functionality on Home Page
    Given I navigate to the "/" page
    When I subscribe with email "johndoe@testing.com"
    Then I should see the result "You have been successfully subscribed!"
    When I click on the scroll up arrow
    Then I should verify "Full-Fledged practice website for Automation Engineers" is present on the top
    When I subscribe with email "johndoe@testing.com"
    Then I should verify "Full-Fledged practice website for Automation Engineers" is present on the top
