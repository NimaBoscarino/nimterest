# Advanced Components and Storybook

- Storybook
- MAYBE: Styling w/ classnames module
- useEffect for having effects happen after actions (e.g. a little effect after liking a post)
- useEffect for loading spinner

This week we're kicking off a new project!

We'll be building a Pinterest-inspired React app, which we'll eventually connect to an Express backend. The task that we'll take on this week is to create some independent components that will eventually be used in the full application.

## What is the project?

## Storybook

In a fresh `create-react-app` project:

```
npx -p @storybook/cli sb init
npm run storybook
```

Then visit `http://localhost:9009`.

You have a choice for where you store your stories. You can store them in the auto-generated `stories` folder, or you can make stories alongside your components. [Storybook recommends storing them alongside your components.](https://storybook.js.org/docs/basics/writing-stories/)

## List of Components for Today

- Card w/ diff states
    - start off with default card
    - liked/unliked
    - w/ long description ('read more')
    - diff size images
- Search component
- Navbar

## Third Party Component Libraries

We've already worked with creating our own components in the past few lessons. If we wanted to, we could create the "Card" component by working off of the design, but this would likely be a lot of work! Often, web developers will leverage open-source component libraries to build their UIs quickly. These component libraries may have components that make dealing with forms, menus, layouts, etc. a lot simpler. Many of these libraries may come 

We'll be using [Gestalt](https://github.com/pinterest/gestalt), a component library by Pinterest. There are many other component libraries (Ant Design Pro, Reactstrap, Material-UI, Semantic React etc.), and they're all great! They generally have very similar components with slightly different styles and available props, but ultimately they serve very similar purposes. You may find it helpful to explore multiple component libraries to familiarize yourself with the various options out there.

### Installation

```sh
npm i gestalt
```

Include the CSS in `src/index.js`. For our stories, we'll have to include the CSS in each story file.

```js
import 'gestalt/dist/gestalt.css';
```

### Pin Component

Gestalt has a "Card" component which will be useful for us as we create the component for our Pins. [Take a look at the documentation for the Card component.](https://pinterest.github.io/gestalt/#/Card) The props are outlined at the top. We'll likely find the `onMouseEnter` and `onMouseLeave` props useful!

- make the revealable info
- add state for "favourite", toggle on heart click

- Make stories for what the component looks like w/o Title and Author, w/ Title but no Author, w/ both Title and Author

STRETCH:

- What does the pin look like when it's NOT part of a collection?
- What about when it IS part of a collection?

### Masonry

- make story for what it looks like with a list of pins and with an empty list

### Search Bar

- Sometimes

### Nav Bar

### Collection Thumbnail

When we view the list of collections, each collection has a little mosaic, a title, and a description