# pos-mamba-websdk-template
> A template that uses the mamba-websdk library

## Dependencies
- [nodejs](https://nodejs.org/)

## Usage
1. [Clone](https://github.com/stone-payments/pos-mamba-websdk-template) or [Download](https://github.com/stone-payments/pos-mamba-websdk-template/archive/master.zip) this repository
2. Clone the [mamba-websdk](https://github.com/stone-payments/pos-mamba-websdk/tree/master/mamba-websdk) into another folder
3. Build the mamba-websdk (this step will be removed eventually). Please refer to the instructions at the [Readme file](https://github.com/stone-payments/pos-mamba-websdk/tree/master/mamba-websdk) then come back here.
4. Install the template's npm dependencies
```bash
npm install
```
5. Use [npm link](https://docs.npmjs.com/cli/link) to link the mamba-websdk (this step will be removed when the project becomes public). Please notice you must execute commands in different folders (on the websdk folder and on the template folder).
```bash
# go to your mamba-websdk folder
cd path/to/pos-mamba-websdk/mamba-websdk
npm link

# go to your template folder
cd path/to/your/project
npm link mamba-websdk
```
6. Open your browser at localhost:8080. To access it on the POS, use your local ip instead of localhost. To discover your local ip on Windows, open Command Prompt, type `ipconfig` and look for the `IPV4 Adress` field. On Linux and Mac, type `ifconfig` and look for the `inet addr` field.

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
