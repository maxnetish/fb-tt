# Demo web app

This project was bootstraped with [React Static Boilerplate][rsb] by [Kriasoft][kriasoft] ([support][gitter]).

### Tech Stack

* [Create React App][cra] for development and test infrastructure (see [user guide][cradocs])
* [React][react] for UI
* [Styled Components][sc] for component friendly CSS styles ([docs][scdocs])
* [React Google Maps][rgm] React.js Google Maps integration component
* [React Sortable HOC][rsh] Pretty animated, touch-friendly, sortable, draggable list

### Prerequisites

* [Node.js][nodejs] v8.2.1 or higher + [Yarn][yarn] v0.27.5 or higher &nbsp; (*HINT: On Mac install
  them via [Brew][brew]*) or npm


### Getting Started

Just clone the repo and...

```bash
$ npm install                     # Install project dependencies listed in package.json
$ npm start                       # Compiles the app and opens it in a browser with "live reload"
```

The app should become available at [http://localhost:3000/](http://localhost:3000/).

### How to Test

```bash
$ npm run lint                        # Check JavaScript and CSS code for potential issues
$ npm run fix                         # Attempt to automatically fix ESLint warnings
$ npm run test                        # Run unit tests. Or, `yarn test -- --watch`
```


### How to Deploy

```bash
$ npm build                           # Build the app for production and pre-render .html pages
```
### Learn React.js and ES6

:mortar_board: &nbsp; [React for Beginners](https://reactforbeginners.com/friend/konstantin) and [ES6 Training Course](https://es6.io/friend/konstantin) by Wes Bos<br>
:green_book: &nbsp; [React: Up & Running: Building Web Applications](http://amzn.to/2bBgqhl) by Stoyan Stefanov (Aug, 2016)<br>
:green_book: &nbsp; [Getting Started with React](http://amzn.to/2bmwP5V) by Doel Sengupta and Manu Singhal (Apr, 2016)<br>
:green_book: &nbsp; [You Don't Know JS: ES6 & Beyond](http://amzn.to/2bBfVnp) by Kyle Simpson (Dec, 2015)<br>


### Related Projects

* [React Starter Kit](https://github.com/kriasoft/react-starter-kit) — Boilerplate and tooling for
  building isomorphic web apps with React and Relay
* [Node.js API Starter Kit](https://github.com/kriasoft/nodejs-api-starter) — Boilerplate and
  tooling for building data APIs with Docker, Node.js and GraphQL

[rsb]: https://github.com/kriasoft/react-static-boilerplate
[kriasoft]: https://www.kriasoft.com/
[gitter]: https://gitter.im/kriasoft/react-static-boilerplate
[cra]: https://github.com/facebookincubator/create-react-app
[cradocs]: https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md
[react]: https://facebook.github.io/react/
[relay]: https://facebook.github.io/relay/
[router]: https://github.com/kriasoft/universal-router
[history]: https://github.com/ReactTraining/history
[sc]: https://www.styled-components.com/
[scdocs]: https://www.styled-components.com/docs
[nodejs]: https://nodejs.org/
[yarn]: https://yarnpkg.com/
[brew]: https://brew.sh/
[wm]: https://facebook.github.io/watchman/
[relaycompiler]: http://facebook.github.io/relay/docs/relay-compiler.html
[vc]: https://code.visualstudio.com/
[vcsnippets]: https://marketplace.visualstudio.com/items?itemName=rebornix.project-snippets
[vceditconfig]: https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig
[vceslint]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
[vcflow]: https://marketplace.visualstudio.com/items?itemName=flowtype.flow-for-vscode
[vcprettier]: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
[vcjs]: https://marketplace.visualstudio.com/items?itemName=mgmcdermott.vscode-language-babel
[rgm]: https://github.com/tomchentw/react-google-maps
[rsh]: https://github.com/clauderic/react-sortable-hoc