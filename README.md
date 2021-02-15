### :card_index_dividers:&nbsp;&nbsp;Project Architecture

#### Overview

This project loosely follows MVC and the container-component model to encourage component reusability. The containers and components live in their respective directories under `src`. Containers typically correspond to a specialized view, hold the logic for that view, and contain several presentational components. Containers will deal with retrieving props, handling the changes to global state, making API calls, etc. and passing down the data to the child components to be rendered in the view. Generally, presentational components shouldn't keep state, and instead their states should be lifted up into their parent container.

#### Global State Management

Global application state is managed by [Redux Toolkit](https://redux-toolkit.js.org/usage/usage-guide) under the directory `redux`. Redux `actions` and `reducers` are replaced by `slices` stored under the `features` directory. Slices effectively separate the Redux store by function, with each slice responsible for only that specific part of the global state. In the components, specialized React-Redux `hooks` replace `mapDispatch` and `mapStateToProps`.

### :gear:&nbsp;&nbsp;Development Workflow

#### Getting Started
* Make sure you have [Node.js](https://nodejs.org/en/) and [yarn](https://classic.yarnpkg.com/en/docs/install/) installed
* Clone the SnackTrack-Client repo to your local machine
* `yarn install` to get all of the dependency packages
* Spawn a local node server with `yarn start`
* Go to http://localhost:3000/ to view the application

#### Making Changes

These are general guidelines for our FE development workflow. Apply where appropriate, but also just message the frontend channel on Slack if you have questions :slightly_smiling_face:

1. Create a new feature branch off of the `dev` branch and name it with the number of the Jira ticket you'll be working on (e.g. `SNAK-101`).
2. Make changes and commit your changes to your feature branch with [reasonably descriptive commit messages](https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13).
3. Once you're satisfied that your changes address the ticket, open a new pull request for your feature branch with the corresponding Jira ticket number and title as the PR title (e.g. SNAK-101: Add a KitKat) and describe your goal and scope for the proposed changes in the PR description.
4. Resolve all merge conflicts as needed.
5. Assign two other FE team members to review your PR and be open and available to address feedback.
6. Comment the PR link in the Jira ticket.
7. After approval from both team members, confirm the PR and merge your feature branch into the `dev` branch.
8. Confirm that your changes are reflected in the `dev` branch, and then delete your feature branch.

At the end of every sprint (tentatively), we'll do a code freeze and merge the `dev` branch into `main`.

#### Little Things to Note
* _Make sure you're in the right branch before you make and commit changes._
* If you're working on a larger feature, discuss the general approach you're going to take with at least one FE team member before putting in too much work.
* If you're a reviewer, be thorough, specific, and constructive in your feedback.
* Don't forget to update your ticket's status in Jira along the way! `In Progress` &rarr; `Code Review` &rarr; `Done`
* Be diligent about resolving marge conflicts before merging into `dev` to avoid breaking changes.
* This is a living document – we'll add to it as we go along :seedling:

#### Branches
| Branch | Description |
|--------|-------------|
| `master` | anything & everything |
| `dev` | experimental development branch |
| `TICKET-NUMBER` | feature, user story, bugs, fixes (e.g. `SNAK-101`) |

### :memo:&nbsp;&nbsp;Available Scripts

`yarn start` to run app in the development mode [http://localhost:3000](http://localhost:3000)

`yarn test` to launch test runner in  interactive watch mode

`yarn run build` to build app for production to `build` folder for deployment
