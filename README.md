# Event Handling in Javascript

Exploring listening for and handling events in JavaScript without the help of a library like React.

### Aim

1. Understand how to use exisiting browser events to create custom interactions between the user and the site.
2. Investigate libraries for emitting custom events as a kind of pub / sub or observer pattern to create more complex behaviour and interactions between user and the site.

### Task 1

The balloon exercise from [Eloquent Javascript](https://eloquentjavascript.net/15_event.html#i_ZPJB9UFdQA)

Getting started:

-   Git clone this repo
-   Change directory into the cloned project
-   Use `http-server .` to spin up a local server and visit `http://127.0.0.1:8080`
-   Select `balloon.html`
-   Press the up or down arrow keys, lots of times!

Behaviour:

-   The page is listening for up or down arrow key presses.
-   Default scroll behaviour of the up and down arrow keys is overridden with custom behaviour.

### Task 2

The mouse trail exercies from [Eloquent Javascript](https://eloquentjavascript.net/15_event.html#i_NOgRH0Y9st)

Getting started:

-   Git clone this repo
-   Change directory into the cloned project
-   Use `http-server .` to spin up a local server and visit `http://127.0.0.1:8080`
-   Select `mouseTrail.html`
-   Move the mouse anywhere!

Behaviour:

-   Page is listening for a mouse movement event
-   Multicolored trail via looping through an array of colors
-   Could very easily be a draw function if didn't limit the number of dot elements created.

### Task 3

Build a mock HTML 5 audio element to replace substitute in APIs expecting an audio element.

HTML 5 Audio elements emit a series of events to let listeners know that audio is loaded, playing, progressing, paused etc.

Decided to use lightweight event library [mitt](https://github.com/developit/mitt) to making event handling and emitting easier.

Getting started:

-   Git clone this repo
-   Change directory into the cloned project
-   Use `http-server .` to spin up a local server and visit `http://127.0.0.1:8080`
-   Select `audioElement.html`
-   Open the browser console and see the event handler logs.

Example use case:

1. Tracking logic that expects an HTML 5 object in the client but in an app audio is handled by native layer and messages are sent to the web app over a bridge.

Questions:

1.  Why and how should event listeners be removed?

    -   If you remove a node / element from the screen it can't be garbage collected if it still has an event listener attached to it. Otherwise you're continuting to increase the use of memory.
    -   Similarly it's important not to use anonymous functions as the event listeners if you need to be able to remove a listener. The remove function compares object references in order to understand if two functions (and thus the two listeners are matching). Two anonymous functions with matching logic have different object references.
