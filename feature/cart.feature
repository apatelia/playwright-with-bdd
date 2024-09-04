@cart
Feature: Cart

    Background:
        Given the User is on login page
        When the User tries to login with "standard_user" as username and "secret_sauce" as password
        Then the User should be on Products page
        When the user adds "Sauce Labs Backpack" to the cart
        And is on the cart page

    @verify_product_details
    Scenario: Test that the correct product is added to the cart
        Then price of the "Sauce Labs Backpack" in cart must match "$29.99"
        And quantity of the "Sauce Labs Backpack" in cart must match 1

    @remove_from_cart
    Scenario: Test removal of a product from the cart
        When the user removes "Sauce Labs Backpack" from the cart
        Then the item count badge must not be displayed on cart icon in header

    @continue_shopping
    Scenario: Test that clicking on 'Continue Shopping' button takes back to Products page
        When the user clicks on the `Continue Shopping` button
        Then the User should be on Products page

    @begin_checkout
    Scenario: Test that clicking on `Checkout` button starts checkout
        When the user clicks on the `Checkout` button
        Then the User should be on Your Information page

    @logout
    Scenario: Test that the user is able to log out from the cart page
        When the user clicks Log out from hamburger menu
        Then the user must be logged out

    @cart_footer @social_media_links
    Scenario Outline: Test Social Media links in footer
        Given that "<Social Media>" link in footer is visible
        When the user clicks "<Social Media>" link from footer
        Then it should open correct "<URL>" in a new tab

        # title-format: <Social Media> link in footer should work
        Examples:
        | Social Media | URL                                         |
        | Twitter/X    | https://x.com/saucelabs                     |
        | Facebook     | https://www.facebook.com/saucelabs          |
        | LinkedIn     | https://www.linkedin.com/company/sauce-labs |

    @cart_footer @copyright
    Scenario: Test that the copyright text in footer is visible
        Then copyright text in footer should be visible
        And the copyright text contents should be correct
