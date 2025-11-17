Feature: New user registration and login

  Scenario: User regristration
    Given User signup with personal information
    And I logout from the account

  Scenario Outline: Login with invalid credentials
    When I login with credentials "<emailAddress>" and "<password>"
    Then I should see the "<result>"

    Examples:
      | emailAddress             | password      | result                               |
      | johndoe@testing.com      | password@2025 | Your email or password is incorrect! |
      | johndoetest7@testing.com | password      | Your email or password is incorrect! |

  Scenario Outline: Login with valid credentials
    When I login with credentials "<emailAddress>" and "<password>"
    Then I should see the "<result>"
    And I delete the account

    Examples:
      | emailAddress             | password      | result                |
      | johndoetest7@testing.com | password@2025 | Logged in as John Doe |
