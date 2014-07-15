# gaffa-request

request action for [gaffa](https://github.com/gaffa-tape/gaffa)

Allows for arbitrary asynchronous messaging via a common action.

## Install:

    npm i gaffa-request

## Usage

    var Request = require('gaffa-request');

    Request.providers.push(function(action, name, options, callback){

        // if this provider can handle the given name, handle it.
        if(name === 'someHandlerName'){

            // This could be an ajax request, or local storage, or sockets..
            handleRequest(action, options, callback)l

            // you MUST return true so that no other handlers will be triggered.
            return true;
        }

    });

    gaffa.registerConstructor(Request);

    var request = new Request();
    request.name.value = 'someHandlerName';

## Properties (instanceof Gaffa.Property)

### source (get) - Object

The data to send with the request

### target (set)

The location to store data returned from the request

### errors (set)

The location to store errors returned from the request

### cleans (set) default: false - Boolean

Whether to mark the target model location as clean.

### options (get and set) - Object

Abitrarty settings to pass to the request handler

### name (get and set) - String

which request handler to use.

### name (get) - Boolean

The loading state of the request.