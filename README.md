### :card_index_dividers:&nbsp;&nbsp;Overview of Project Architecture

This project loosely follows the container-component model to encourage component reusability. The containers and components live in their respective directories under `src`. Containers typically correspond to a specific page/view, hold the logic for that page/view, and contain several presentational components. Containers will deal with props, changing state, making API calls, etc. and the data is merely passed down to the child components to be rendered on the page/view. Generally, components shouldn't keep state, and instead their states should be lifted up into their parent container.

### :gear:&nbsp;&nbsp;Development Workflow
These are general guidelines for our FE development workflow. Apply where appropriate, but also just message the frontend channel on Slack if you have questions :slightly_smiling_face:

1. Create a new `feature` branch off of the `dev` branch and name it with the number of the Jira ticket you'll be working on (e.g. `SNAK-101`).
2. Make changes and commit your changes to your `feature` branch with [reasonably descriptive commit messages](https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13).
3. Once you're satisfied that your changes address the ticket, open a new pull request for your `feature` branch with the corresponding Jira ticket number and title as the PR title (e.g. SNAK-101: Add a KitKat) and describe your goal and scope for the proposed changes in the PR description.
4. Assign two other FE team members to review your PR and be open and available to address feedback.
5. Comment the PR link in the Jira ticket.
6. After approval from both team members, confirm the PR and merge your `feature` branch into the `dev` branch.
7. Confirm that your changes are reflected in the `dev` branch, and then delete your `feature` branch.

At the end of every sprint (tentatively), we'll do a code freeze and merge the `dev` branch into `main`.

#### Little Things to Note:
* _Make sure you're in the right branch before you make and commit changes._
* If you're working on a larger feature, discuss the general approach you're going to take with at least one FE team member before putting in too much work.
* If you're a reviewer, be thorough, specific, and constructive in your feedback.
* Don't forget to update your ticket's status in Jira along the way! `In Progress` &rarr; `Code Review` &rarr; `Done`
* This is a living document – we'll add to it as we go along :seedling:

### :memo:&nbsp;&nbsp;Available Scripts

`yarn start` to run app in the development mode [http://localhost:3000](http://localhost:3000)

`yarn test` to launch test runner in  interactive watch mode

`yarn run build` to build app for production to `build` folder for deployment
