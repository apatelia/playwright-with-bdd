@products
Feature: Products

  @add_to_cart
  Scenario: User should be able to add a product to the cart
    Given the user is logged in and on Products page
    When the user adds "Sauce Labs Backpack" to the cart
    Then the cart item badge must show correct count of 1

  @remove_from_cart
  Scenario: User should be able to remove the product from the cart
    Given the user is logged in and on Products page
    When the user adds "Sauce Labs Bike Light" to the cart
    Then the user should be able to remove "Sauce Labs Bike Light" from the cart, using the `Remove` button
    Then the cart item badge must not be displayed

  @logout
  Scenario: User should be able to log out
    Given the user is logged in and on Products page
    When the user clicks Log out from hamburger menu
    Then the user must be logged out

  @footer @social_media_links
  Scenario Outline: Social Media links in footer should work
    Given the user is logged in and on Products page
    Then "<Social Media>" link in footer should be visible
    When the user clicks "<Social Media>" link from footer, it should open correct "<URL>" in a new tab

    Examples: 
      | Social Media | URL |
      | Twitter      | https://x.com/saucelabs |
      | Facebook     | https://www.facebook.com/saucelabs |
      | LinkedIn     | https://www.linkedin.com/company/sauce-labs |

  @footer @copyright
  Scenario: Copyright text in footer should be visible
    Given the user is logged in and on Products page
    Then copyright text in footer should be visible
    And the copyright text contents should be correct
