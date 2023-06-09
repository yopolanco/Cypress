Feature: Create Order
    As user
    I want to be able to log into the Amazon page.
    So I can create an order and manage it.

Background: The user logs in to the Amazon page.
    Given The user accesses the Amazon page
    And The web page loads correctly
    When The user tries to log in with username and password
    Then The user should see the welcome message

Scenario Outline: Scenario Outline name: Validate that searches can be performed correctly
    When The user searches '<item>' in the search bar
    Then The amazon page shows the list of items available to buy

    Examples:
        | item   |
        | mouse  |

Scenario Outline: Validate that items can be added to the cart
    When The user searches '<item>' in the search bar
    And Add an item to the cart
    Then The item is added to the cart successfully

    Examples:
        | item   |
        | mouse  |

Scenario Outline: Validate that a created order can be deleted
    When The user searches '<item>' in the search bar
    And Add an item to the cart
    And Open the shopping cart
    And The user deletes the article '<delete>' that was added
    Then The amazon page shows the notification that the item was removed

    Examples:
        | item   |
        | mouse  |

Scenario Outline: Validate that an order can be created with two items and then delete one
    When The user searches '<item>' in the search bar
    And The user sorts the search result by '<orderBy1>'
    And Add an item to the cart
    And The user searches '<item>' in the search bar
    And The user sorts the search result by '<orderBy2>'
    And Add an item to the cart
    And Open the shopping cart
    And The user deletes the article '<delete>' that was added
    And The user tries to checkout
    Then The amazon page shows the selected items and the total to pay

    Examples:
    | item   |     orderBy1         |       orderBy2        |   delete  |
    | mouse  | Price: High to Low   |   Price: Low to High  |     2     |


