@e2e
Feature: End to End Checkout Process

  Scenario: Complete a purchase as a registered user
    Given I create a User "johndoetester@example.com" with password "password@2025" via API
    When I login with credentials "johndoetester@example.com" and "password@2025"
    Then I should see the result "Logged in as John Doe"
    When I add an item to the cart
    Then I verify same item is present in the cart
    And I proceed to checkout
    And I enter card details
    Then I should see the order confirmation page
    And I download the invoice
    And I delete the account
# 
#
#
  # Scenario: Place Order: Register/Login while Checkout
  #   Given I navigate to the "/products" page
  #   When I add an item to the cart
  #   And I proceed to checkout
  #   Then I should see be asked to login or register before checkout
  #   When I create a User "johndoetester@example.com" with password "password@2025" via API
  #   And I login with credentials "johndoetester@example.com" and "password@2025"
  #   Then I should see the result "Logged in as John Doe"
  #   When I navigate to the "/view_cart" page
  #   Then I verify same item is present in the cart
  #   And I proceed to checkout
  #   And I enter card details
  #   Then I should see the order confirmation page
  #   And I download the invoice
  #   And I delete the account
