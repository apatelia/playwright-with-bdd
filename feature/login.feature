@login
Feature: User Login

  @valid_creds
  Scenario Outline: Login should work with valid login credentials
    Given the User is on login page
    When the User tries to login with "<username>" as username and "<password>" as password
    Then the User should be on Products page

    Examples: 
      | username                | password     |
      | standard_user           | secret_sauce |
      | problem_user            | secret_sauce |
      | performance_glitch_user | secret_sauce |

  @invalid_creds
  Scenario Outline: Login should fail with invalid login credentials
    Given the User is on login page
    When the User tries to login with "<username>" as username and "<password>" as password
    Then the User should see invalid credentials error message

    Examples: 
      | username         | password         |
      | invalid_username | secret_sauce     |
      | standard_user    | invalid_password |
      | invalid_username | invalid_password |

  @locked_out_user
  Scenario: Locked out user must not be able to login with valid login credentials
    Given the User is on login page
    When the User tries to login with "locked_out_user" as username and "secret_sauce" as password
    Then the User should see a locked out error message
