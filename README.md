# Mosaic ![](https://img.shields.io/github/tag/tracingpaper/mosaic.svg?style=flat)

A static sitebuilder framework built from gulp, nunjucks, browserify, sass and UIKit.

<img src="https://svgur.com/i/Aef.svg" width="196px">

*Version Changes: 1.2.0*
- Added css module support for browserify

*Version Changes: 1.1.0*
- Added babel support
- Added minification of js.

## Content

- [Installation](#installation)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Directory Structure](#directory-structure)
- [Using UIKit](#using-uikit)

## Installation

For starting your own mosaic project, first clone this repository to your device.

```
$ git clone https://github.com/tracingpaper/mosaic.git PROJECT_NAME
```

Now install **gulp** globally (If not already installed)

```
$ npm install gulp -g
```

Now install the required node packages to start building.

```
$ npm install
```

You are set to get started.

## Prerequisites

To use this framework you should know the basics of **Nunjucks**, **SCSS** and **UIKit**.
Also you should be a little familiar with **node.js** and **npm**.

- [Read Nunjucks Docs](https://mozilla.github.io/nunjucks/templating.html)
- [Read Sass Docs](https://sass-lang.com/guide)
- [Read UIKit Docs](https://getuikit.com/docs/)

## Getting Started

After [installation](#installation) you will have a lot of files in your downloaded to your project folder (Learn more about the [Directory Structure](#directory-structure)).

We have set up everything for you to start building sites with nunjucks and sass. Run the build command to compile all the nunjucks and sass.

```
$ gulp build
```

Start a local live-server to view the result (The live server will run at port 4000)

```
$ gulp serve
```

Visit [localhost:4000]("http://localhost:4000") to see the result.

## Directory Structure

- app
    - dist
        - assets 
        - css
        - js
    - src
        - js
        - scss
        - views
            - pages
            - templates
                - layouts
                - macros
                - partials
    - config.json
- gulpfile.js
- .babelrc
- mosaic.json

### gulpfile.js
This file contains all the compilation logics of the framework. *It is recommend not to edit this file*

### app
This directory manages all the source and compiled files.

### dist
Contains all the compiled files and assets. This is the only directory needed for hosting the website

**assets**      : It is used to store any external assets like images required for building the website.

**css**         : It contains the compiled css file (app.css).

**js**          : It contains the compiled js file (app.js).

**\*\*/\*.html**: Compiled html files

### src
Contains all the source files. We only use this directory for coding. On running build command all files in src are compiled to dist.

**js**          : Space for your own javascript code. *(Note: only the js files imported to app.js gets compiled)*

**scss**        : Includes scss files needed for styling the website. *(Note: only the scss files imported to app.scss gets compiled)*

**views**       : Includes all the nunjucks (.njk) files. Only the files in *pages* directory gets compiled to final .html files. The files in *templates* directory are used for templating in nunjucks. 

#### views/templates

It includes 3 sub-directories:

- layouts   : Nunjucks layouts
- macros    : Nunjucks macros
- partials  : Nunjucks partials

*Note: To know more about these refer [Nunjucks Documentation](https://mozilla.github.io/nunjucks/templating.html).

### config.json
Contains configuration information for the project. This file can also be used to include context variables into nunjucks templates.

#### Example:
*config.json*
```json
{
    "app": {
        "title": "Mosaic",
    }
}
```
*app.layout.njk*
```html
<!Doctype HTML>
<html>
    <head>
        ...
        <title>{{app.title}}</title> <!-- Compiled to <title>Mosaic</title> -->
        ...
    </head>
    ...
</html> 
```

### .babelrc

Babel configuration file.
This file can be used to include plugins and presets into babel.
*(Read more on [Babel](https://babeljs.io/))*

*Open each of these files for better understanding*.

### mosaic.json

Mosaic configuration file.
*(Limited configuration options available for now)*

## Using UIKit
UIKit is already setup for you to use and customize.
Use *_variables.scss* and *_hooks.scss* for customizing the UIKit styles. Make sure these files are imported in *app.scss*.

Read [UIKit Docs on Sass](https://getuikit.com/docs/sass) for more info.

*(Note: The _variables.scss only shows a few variables in use. These are all it needs for small customizations to the site. A complete list of all variables can be found at [https://github.com/uikit/uikit/blob/develop/src/scss/variables.scss](https://github.com/uikit/uikit/blob/develop/src/scss/variables.scss))*

*UIKit* variable is available globally for access. You can use it for UIKit's js functionality.

#### Example

```js
//show UIKit notification
UIkit.notification('Hello world.');
```