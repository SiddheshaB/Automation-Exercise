Feature: User can submit contact us from

  Scenario Outline: Submit Contact Us form successfully
    Given I navigate to the "/contact_us" page
    When I submit the Contact Us form with "<name>", "<email>", "<subject>", "<filePath>" and "<message>"
    Then I should see the result "Success! Your details have been submitted successfully."

    Examples:
      | name     | email                     | subject        | message                                        | filePath     |
      | John Doe | johndoetester@example.com | Refund Enquiry | I have not received my refund yet. PFA invoice | /invoice.txt |
