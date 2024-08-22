@login
Feature: User Login

    Background:
        Given the User is on login page

    @valid_creds
    Scenario Outline: Test login with valid credentials
        When the User tries to login with "<username>" as username and "<password>" as password
        Then the User should be on Products page

        # title-format: User should be able to log in with valid login credentials => <username> / <password>
        Examples:
        | username                | password     |
        | standard_user           | secret_sauce |
        | problem_user            | secret_sauce |
        | performance_glitch_user | secret_sauce |

    @invalid_creds
    Scenario Outline: Test login with invalid credentials
        When the User tries to login with "<username>" as username and "<password>" as password
        Then the User should see invalid credentials error message

        # title-format: User should not be able to log in with invalid login credentials => <username> / <password>
        Examples:
        | username         | password         |
        | invalid_username | secret_sauce     |
        | standard_user    | invalid_password |
        | invalid_username | invalid_password |

    @locked_out_user
    Scenario: Test that a Locked out user is not able to login despite using valid login credentials
        When the User tries to login with "locked_out_user" as username and "secret_sauce" as password
        Then the User should see a locked out error message
