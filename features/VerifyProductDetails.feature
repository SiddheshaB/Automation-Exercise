Feature: Verify Product details and add a review

  Scenario: Verify product details page and add review
    Given I navigate to the "/products" page
    And I view the details of the "1" product
    And I add a review with "John Doe", "johndoetester@testing.com" and "Nice Product."
