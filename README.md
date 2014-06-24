# gaffa-request

request action for [gaffa](https://github.com/gaffa-tape/gaffa)

Allows for arbitrary asynchronous messaging via a common action.

## Install:

    npm i gaffa-request

## Usage

    var

## Properties (instanceof Gaffa.Property)

### source (get, set)

The data to send with the request

### target (get, set)

The location to store data returned from the request

### errors (get and set)

The location to store errors returned from the request

### cleans (get) default: false

Whether to mark the target model location as clean.

### options (get and set)

Abitrarty settings to pass to the request handler

### name (get and set)

which request handler to use.