# envpreprocess

> preprocess environment variables

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-envpreprocess --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTask('grunt-envpreprocess');
```

## The grunt-envpreprocess task
Text search and replacement in files is powered by the core of [grunt-text-replace](https://github.com/yoniholmes/grunt-text-replace).
### Overview
In your project's Gruntfile, add a section named `envpreprocess` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
   envpreprocess:{
        dev:{
            files:{
                src:  'config/env.json'
            },
            options:{
                replacePath: ['dev_build/**/*.*'],
                environment: 'dev'
            }
        },
        prod:{
            files:{
                src:  'config/env.json'
            },
            options:{
                replacePath: ['dist_build/**/*.*'],
                environment: 'prod'
            }
        }
    }
});
```
(note that if you don't specify `dev.options.environment`, it will use the target, which in that case is `dev`)


When the task is run, you'll see a log output like this
```
Running "envpreprocess:prod" (envpreprocess) task
Reading ENV variables from config/env.json
Replaced all ENV variables in prod_build/**/*.*
```

### Options

#### options.replacePath
Type: `String`

The path of files to have ENV variables replaced with the preprocessor.

#### options.environment
Type: `String`
Default value: `dev`

Which environment to use when retrieving ENV variables from the .json file. If given "*", any environment that isn't specified will use that value.



### Example Usage
Environment variables are defined in the config file located at the specified 'files.src' file. For each variable you must define a value for each environment, or use "*" to apply it to any environments that don't have a value specified. This is an example of such file

```json
{
	"APP_NAME": {
		"dev": "AppDev",
		"prod": "AppProd"
	},
	"APP_VERSION": {
		"*": "0.1.0"
	},
	"API_BASE": {
		"dev": "http://localhost:8000",
		"prod": "https://www.mysite.com/api"
	}
}
```

Then in a file you want an ENV variable to be replaced, use something like this

```html
    <head>
        <title>ENV.APP_NAME</title>
    </head>
    <script src="ENV.API_BASE/user/create">
```

```js
    var version = "ENV.APP_VERSION";
    alert(version);
```

If you  run 'grunt envpreprocess' with options.environment="dev", it will produce

```html
    <head>
        <title>AppDev</title>
    </head>
    <script src="http://localhost:8000/user/create">
```

```js
    var version = "0.1.0";
    alert(version);
```

Similarly, if you  run 'grunt envpreprocess' with options.environment="prod", it will produce

```html
    <head>
        <title>AppProd</title>
    </head>
    <script src="https://www.mysite.com/api/user/create">
```

```js
    var version = "0.1.0";
    alert(version);
```

### Demo


You can run a simple demo by cloning this repo and running `grunt`. In the `demo/` directory there is `test.html` and `demo/config/env.json` to demonstrate how to define environment variables and use them in HTML/JS. To run the demo, run `npm install && npm run demo`. This will copy `test.html` to `demo/build_output/` and then `envpreprocess` will be run to replace the environment variables inside the build output file.


---

Note that this is going to modify the files that you point it to. This means that you shouldn't point this task at your actual source files, but at a separate build folder containing a copy of the source.

## Release History
0.1.0 - Initial release. Functionality is working. Not tested.

0.1.1 - added demo

0.1.2 - accepted PR from nicolasbd to use target as environment if not specified in options

0.1.3 - fix README format
