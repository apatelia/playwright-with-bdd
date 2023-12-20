@cart
Feature: Cart

  Background: 
    Given the user has added "Sauce Labs Backpack" to the cart
    And is on the cart page

  @verify_product_details
  Scenario: Verify product details from the cart
    Then price of the "Sauce Labs Backpack" in cart must match "$29.99"
    And quantity of the "Sauce Labs Backpack" in cart must match 1

  @remove_from_cart
  Scenario: Remove a product from the cart
    Then the user removes "Sauce Labs Backpack" from the cart
    Then the item count badge must not be displayed on cart icon in header

  @continue_shopping
  Scenario: Continue Shopping button takes back to Products page
    When the user clicks on the `Continue Shopping` button
    Then the user must be taken to Products page

  @begin_checkout
  Scenario: Clicking `Checkout` button starts checkout
    When the user clicks on the `Checkout` button
    Then the User should be on Your Information page

  @logout
  Scenario: User should be able to log out
    When the user clicks Log out from menu
    Then the user is logged out

  @cart_footer @social_media_links
  Scenario Outline: Social Media links in footer should work
    Then "<Social Media>" link is visible in footer
    When the user clicks "<Social Media>" link from footer, correct "<URL>" is opened in a new tab

    Examples: 
      | Social Media | URL |
      | Twitter      | https://twitter.com/saucelabs |
      | Facebook     | https://www.facebook.com/saucelabs |
      | LinkedIn     | https://www.linkedin.com/company/sauce-labs |

  @cart_footer @copyright
  Scenario: Copyright text in footer should be visible
    Then copyright text is visible in footer
    And the copyright text contents are correct
