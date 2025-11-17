@e2e
Feature: End to End Checkout Process

  Scenario: Complete a purchase as a registered user
    Given I create a User "johndoetester@example.com" with password "password@2025"
    When I login with credentials "johndoetester@example.com" and "password@2025"
    Then I should see the "Logged in as John Doe"
    When I add first item to the cart
    And I proceed to checkout
    Then I should see the order confirmation page
    And I download the invoice
    And I delete the account

  Scenario: Complete a purchase as a guest
    # When I add first item to the cart
    # And I proceed to checkout as guest user with name "Guest User", email "
