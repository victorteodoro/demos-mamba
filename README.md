# pos-mamba-websdk-template
> A template that uses the mamba-websdk library

## Dependencies
- [nodejs](https://nodejs.org/)

## Usage
1. [Clone](https://github.com/stone-payments/pos-mamba-websdk-template) or [Download](https://github.com/stone-payments/pos-mamba-websdk-template/archive/master.zip) this repository
2. Clone the [mamba-websdk](https://github.com/stone-payments/pos-mamba-websdk) into another folder
3. Build the mamba-websdk (this step will be removed eventually)
4. Install the npm dependencies
```bash
npm install
```
5. Use [npm link](https://docs.npmjs.com/cli/link) to link the mamba-websdk (this step will be removed when the project becomes public)
```bash
cd path/to/pos-mamba-websdk/mamba-websdk
git checkout name-of-the-branch-to-use-on-the-mamba-websdk
... build the library ...

npm link
cd path/to/your/project
npm link mamba-websdk
```
6. Edit (or remove) your host ip on the package.json file. It's used mainly to test the project on the POS
```javascript
"dev": "webpack-dev-server ... --host your-ip-here ...",
```

## What's included
- `npm run dev` - Development task
  - Opens a server using Webpack
  - Uses sass-lint to catch errors on the sass files
  - Uses standard.js to lint javascript files

- `npm run build` - Production ready build
  - Minifies javascript
  - Minifies styles
  - Minifies HTML
  - Copies assets

- `npm run lint` - Lint task
  - Fixes js files formatting
  - Checks sass files formatting

- `npm run clean` - Clean dist folder