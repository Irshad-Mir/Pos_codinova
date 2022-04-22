# Auto increment id generate


Auto generate increment id, unique guarantee, custom bit length, distributable, serverless, and customizable unique ID generator based on [Snowflake](https://github.com/twitter/snowflake/tree/snowflake-2010/)

the code fork from [maylily](https://github.com/shimataro/maylily), change source to nodejs instead of mjs, and remove no need dependence

## Features

* distributable / scalable
* no external servers required
* customizable
* supports 2-36 radix
* supports multiple precision integer
* supports CommonJS, ES Modules, TypeScript

## How to install

Install by `npm`.

```bash
npm install id-auto-increment
```

## How to use

No external servers needed.
Just import and call `idAutoIncrement()`!

### JavaScript

Traditional syntax.
This code will run on most JavaScript engine.

```javascript
const idAutoIncrement = require("id-auto-increment");

(function() {
    // returns a Promise object
    idAutoIncrement()
        .then(function(id) {
            // do something...
        })
        .catch(function(err) {
            // err is instance of Error
        });
}();
```

### ECMAScript 7

Modern syntax.
Async/await syntax is easy to read

```javascript
const idAutoIncrement = require("id-auto-increment");

(async() => { // async syntax / arrow function
    try {
        const id = await idAutoIncrement(); // await syntax
        // do something...
    }
    catch(err) {
        // err is instance of Error
    }
})();
```


## How to customize

| name | description | default |
|------|-------------|---------|
| `radix` | radix of generated ID (2-36) | 10 |
| `timeBase` | base time in unixtime(millisec) | 946684800000 (2000-01-01T00:00:00Z) |
| `machineId` | identifier of machine; must be unique in service | 0 |
| `machineBits` | required bits to represent machineId | 3 |
| `generatorId` | identifier of generator; must be unique in machine | process ID |
| `generatorBits` | required bits to represent generatorId | 10 |
| `sequenceBits` | required bits to represent sequence | 8 |

Generated value is stringified multiple precision integer (in specified radix).

```
 000001011100000101111010101110101010111101 001 1101101010 00000110
|------------------------------------------|                         current time from timeBase in millisec
                                           |---|                     machineId (uses machineBits bits)
                                               |----------|          generatorId (uses generatorBits bits)
                                                          |--------| sequence number (uses sequenceBits bits)
```

example:

```javascript
// keeps options until next change
idAutoIncrement({
    timeBase: Date.parse("2017-01-01T00:00:00Z"),   // if your service starts in 2017, this is enough.
    machineBits: 1                                  // if required number machines are up to 2, this is enough.
});
```

