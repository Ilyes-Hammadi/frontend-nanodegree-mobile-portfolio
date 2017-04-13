## Website Performance Optimization portfolio project

### Start the project
Before runnig the project you need to install all the dependencies required.
```shell
$ cd /path/to/your-project-folder
$ npm install
```

Build the dist folder
```shell
$ npm run build
```

Now to start the local server tap this in your terminal.

```shell
$ cd dist
$ python -m SimpleHTTPServer
```
This will fire a local server at `localhost:8000`.

### Run the PageSpeed test
To run the PageSpeed test run the following command
```shell
$ npm run speedTest
```
#### Expected output example

Desktop speed test:
```shell
URL:       729e4c58.ngrok.io
Strategy:  desktop
Speed:     99

Hosts                                      | 1
Resources                                  | 1
Other size                                 | 1.66 kB
Total size of request bytes sent           | 39 B

Main resource server response time         | 0.03
```


Mobile speed test:
```shell
URL:       729e4c58.ngrok.io
Strategy:  mobile
Speed:     99
Usability: 68

Hosts                                      | 1
Resources                                  | 1
Other size                                 | 1.66 kB
Total size of request bytes sent           | 39 B

Configure viewport                         | 10
Main resource server response time         | 0.16
Size tap targets appropriately             | 13.34
Use legible font sizes                     | 24.56
```

### Tasks done to improve page speed
1. Appropriate media queries for link tags
```html
<link href="css/print.css" rel="stylesheet" media="print">
```
2. Moved CSS and Javascript to the bottom of the page
```html
<body>
        <!-- Rest of the page-->
	<link href="//fonts.googleapis.com/css?family=Open+Sans:400,700" rel="stylesheet">

	<link href="css/style.css" rel="stylesheet">
	<link href="css/print.css" rel="stylesheet" media="print">

	<script>
		// Google Analytics
	</script>
	<script src="http://www.google-analytics.com/analytics.js"></script>
	<script async src="js/perfmatters.js"></script>

</body>
```

3. Minifiy HTML, CSS <br>
```javascript
// Gruntfile.js
// ...
cssmin: {
    minify: {
        options: {
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        cwd: 'src/',
        expand: true,
        src: ['css/*.css', 'css/!*.min.css', 'views/css/*.css'],
        dest: 'dist/',
        ext: '.css'
    }
},
// ...
htmlmin: {
    dist: {
        options: {
            removeComments: true,
            collapseWhitespace: true
        },
        files: [{
            cwd: 'src',
            expand: true,
            src: ['*.html', 'views/**/*.html'],
            dest: 'dist'
        }]
    }
},
// ...
```
4. Uglify Javascript
```javascript
// Gruntfile.js
// ...
uglify: {
    options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
    },
    build: {
        files: [{
            expand: true,
            cwd: 'src/',
            src: ['js/*.js', 'views/js/*.js'],
            dest: 'dist/'
        }]
    }
},
// ...
```
5. Images size optimization
```javascript
// Gruntfile.js
// ...
imagemin: {
    static: {
        options: {
            optimizationLevel: 7,
            svgoPlugins: [{
                removeViewBox: false
            }]
        },
        files: [{
            expand: true,
            cwd: 'src/',
            src: ['img/*.{png,jpg,gif}', 'views/images/*.{png,jpg,gif}'],
            dest: 'dist/'
        }]
    }
},
// ...
```
