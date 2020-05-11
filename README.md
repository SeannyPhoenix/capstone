# Delve Directory - Client

##### Deployment: [Delve Directory](https://delve.amadigan.dev)
##### Client for [Delve Directory - API](https://github.com/SeannyPhoenix/delve-directory-api)
##### Created by [Seanny Drakon Phoenix](https://www.github.com/seannyphoenix)

### Project Planning Deliverables

- Scope

  Many people love playing table-top roleplaying games. Unfortunately, it can be difficult to find people to play with. _Delve Directory_ will allow game runners, players, and hosts to connect with others to fill tables and enjoy what they love.

- User Stories

  Users can view available seats at tables in specified locations or online.
  Users can create accounts.
  Users can create tables with specified seats.
  Users can request to join an existing table.
  Users can send messages to each other or to the feed of a table to which they have a seat.

- Wireframes

- Data Models

  | User       |
  | ---------- |
  | screenName |
  | email      |
  | password   |
  | [games]    |

  | Games     |
  | --------- |
  | name      |
  | publisher |
  | website   |

  | Table                |
  | -------------------- |
  | owner                |
  | location             |
  | game                 |
  | [seats {role, user}] |

  | Message |
  | ------- |
  | table   |
  | sender  |
  | content |

- Milestones

1. Implement Users

  * Register √
  * Log In √
  * Log Out √
2. Implement Tables
  * Create table √
  * List tables √
  * Request seat √
  * Assign seat √
3. Implement Location Search
  * Filter tables by game and role
  * Search tables in a location √
  * Show tables in a zip code √
  * Show tables in a specified radius √
4. Implement Scroll Menu
  * Create sliding menu
  * Add map-style menu
  * Highlight current room
5. Messaging
  * Send message to other user.
  * Send message to table feed.

- Feasibility Study

  - Packages
    - [Leaflet](https://leafletjs.com/)
    - [React Leaflet](https://react-leaflet.js.org/)
    - [React Bootstrap](https://react-bootstrap.github.io/)
    - [FontAwesome](https://fontawesome.com/)
  - APIs
    - [Nominatim](https://nominatim.org/)
  - Data
    - [US Zip Code Latitude and Longitude](https://public.opendatasoft.com/explore/dataset/us-zip-code-latitude-and-longitude/table/)
  - Other Resources
    - [Google Fonts](https://fonts.google.com/)
    - [Amazon Web Services](https://aws.amazon.com)

- Thoughts Upon Completion
  - I *still* spent too much time on littel details.
  - I am proud of myself for my custom Sass.
  - I am super glad I dove into React Hooks... I am looking forward to refactoring. Hooks are so much simpler and cleaner than traditional class components.
  - It took a while to get indexes to work in the Mongo database for my Geospatial Queries, but the payoff was worth the frustration.
  - The choice to host on AWS ended up taking an entire day's worth of setup and debugging, stealing time from actual work on my project. However, I believe it was the right choice.
  - So grateful to my roommate [Andy](https://github.com/amadigan) for his help with the AWS deployment, as well as several other parts of my process.
  - This project ended up being very similar to my original concept, and I hope I can continue to implement new features and improve it for actual use in the future.
  - I would like to add a style picker. Perhaps I will develop styles for each TTRPG system. I also want to let the user choose the map tiles.
