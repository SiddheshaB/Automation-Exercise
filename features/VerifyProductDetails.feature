Feature: Verify Product details and add a review

  Scenario: Verify product details page and add review
    Given I navigate to the "/products" page
    When I view the details of the first product
    Then I should see the product details
    # When I add a review with "John Doe"
