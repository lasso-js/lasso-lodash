optimizer-lodash
==============

Plugin for the [RaptorJS Optimizer](https://github.com/raptorjs/optimizer) that compiles Lo-Dash templates to CommonJS modules. These templates can easily be rendered using the [view-engine](https://github.com/patrick-steele-idem/view-engine) module (in conjunction with [view-engine-lodash](https://github.com/patrick-steele-idem/view-engine-lodash)).

# Installation

```bash
npm install optimizer-lodash --save
```

Enable the plugin:

```javascript
require('optimizer').configure({
    plugins: [
        'optimizer-lodash'
    ]
});
```

You will also need to install [view-engine](https://github.com/patrick-steele-idem/view-engine) and [view-engine-lodash](https://github.com/patrick-steele-idem/view-engine-lodash):

```bash
npm install view-engine --save
npm install view-engine-lodash --save
```

# Usage

Enable the Lo-Dash view engine:

```javascript
require('view-engine').register(
    'lodash',
    require('view-engine-lodash'));
```

Render templates on the client or server:

```javascript
var template = require('view-engine').load('./template.lodash');
template.render({
        name: 'Frank'
    },
    function(err, output) {
        console.log('Template output: ', output);
    });
```