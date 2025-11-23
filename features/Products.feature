Feature: Scenarios related to Products Page

  Background:
    Given I navigate to the "/" page
    When I click on "Products" in the menu
    Then I should verify "All Products" is present on the top
  #
  #
  #  

  Scenario: Search functionality on product page
    When I search for item "Green"
    Then I should verify "Searched Products" is present on the top
    And I should see all the products related to "Green" are visible
  #
  #
  # Scenario: Verify multiple items in the cart
  #   When I add item "1" to the cart
  #   And I click on "Continue Shopping" button
  #   And I add item "2" to the cart
  #   And I click on "View Cart" button
  #   Then I should see "2" items in the cart
    # 
    # 
    # 
    # 
  # Scenario: Remove product from the cart
  #   Given I navigate to the "/products" page
  #   When I add an item to the cart
  #   Then I verify same item is present in the cart
  #   When I remove "1" from the cart
  #   Then I should not see item in the cart
