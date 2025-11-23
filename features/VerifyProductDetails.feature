Feature: Verify Product details and add a review
  # Scenario: Verify product details page and add review
  #   Given I navigate to the "/products" page
  #   And I view the details of the first product
  #   And I add a review with "John Doe", "johndoetester@testing.com" and "Nice Product."

  Scenario: Search functionality on product page
    Given I navigate to the "/" page
    And I click on "Products" in the menu
    And I should verify "All Products" is present on the top
