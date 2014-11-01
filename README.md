gift-o-matic
============

An appengine app for creating gift lists

Getting Started
---------------
1. Install the appengine python SDK
2. cd to the root of this repo
3. dev_appserver.py .

Step three will start a server at localhost:8080 that serves up gift-o-matic.html.

Deploying
---------
appcfg.py update .

Using react
-----------
Read the tutorial: http://facebook.github.io/react/docs/tutorial.html

Next steps (should probably move this to asana)
----------
1. Create a simple UI that just writes to localStorage.
  1. Name of thing
  2. Other notes
  3. Link to amazon or whatever (setup amazon affilliate!)
2. Change the storage to be server-side
3. Add authentication
  1. Let people pick gifts to buy
  2. Don't show people which of their gifts have been picked
4. Add ability to have discussions about a gift and have it email people
