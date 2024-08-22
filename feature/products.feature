@products
Feature: Products

    Background:
        Given the User is on login page
        When the User tries to login with "standard_user" as username and "secret_sauce" as password
        Then the User should be on Products page

    @add_to_cart
    Scenario: Test that the user is able to add a product to the cart
        When the user adds "Sauce Labs Backpack" to the cart
        Then the cart item badge must show correct count of 1

    @remove_from_cart
    Scenario: Test that the user is able to remove a product from the cart
        When the user adds "Sauce Labs Bike Light" to the cart
        Then the user should be able to remove "Sauce Labs Bike Light" from the cart, using the `Remove` button
        Then the cart item badge must not be displayed

    @logout
    Scenario: Test that the user is able to log out from the products page
        When the user clicks Log out from hamburger menu
        Then the user must be logged out

    @footer @social_media_links
    Scenario Outline: Test Social Media links in footer
        Then "<Social Media>" link in footer should be visible
        When the user clicks "<Social Media>" link from footer, it should open correct "<URL>" in a new tab

        # title-format: <Social Media> link in footer should work
        Examples:
        | Social Media | URL                                         |
        | Twitter/X    | https://x.com/saucelabs                     |
        | Facebook     | https://www.facebook.com/saucelabs          |
        | LinkedIn     | https://www.linkedin.com/company/sauce-labs |

    @footer @copyright
    Scenario: Test that the copyright text in footer is visible
        Then copyright text in footer should be visible
        And the copyright text contents should be correct
