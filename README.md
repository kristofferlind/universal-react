# Universal react
Overengineered todo with: Server rendering, code splitting, hot reload, optimistic updates, critical path css, offline capabilities and various production optimizations.

This is more of an educational project, the idea here is to take a very simple application and solve interesting problems for it. The end result should be a collaborative application that is fully offline capable and production ready with great DX. And since it's such a simple application it would also serve as a good boilerplate.

# features
 - [x] server rendering  
 - [x] code splitting  
 - [x] hot reload  
 - [x] optimistic updates  
 - [x] critical path css  
 - [x] offline capabilities  
 - [x] production optimizations (gzip, output cache..)  
 - [ ] production ready  

## offline capabilities
 - [x] static assets cached with serviceworker, and seamless automatic updates on routing  
 - [x] persistent state  
 - [x] online/offline state using sockets  
 - [x] queue save actions until back online  
 - [ ] offline transactions with retry logic for saving  

Application should be fully working when offline. Save actions are delayed until reconnect to avoid showing errors. Any failed action can be retried or aborted.

# tech
 - react router 4
 - webpack 2

# progress
[Trello board](https://trello.com/b/VmVhdtS2/universal-react), you're welcome to help out if you find any of the tasks interesting.

# production use
At this time there are some really important parts to fix before being used in production. The worst of them are listed below. Check [Trello board](https://trello.com/b/VmVhdtS2/universal-react) for more information.

## worst known issues
 - no auth for sockets  
 - auth overall needs quite a bit of work  
 - babel transforms are not done in advance for server
 - solutions for critical path css, ssr and async bootstrapping are very inefficient  

# documentation
## folder structure
 - client/app - app specific  
 - client/components - potentially reusable modules

# development
 - install mongodb  
 - configure server/config/authentication.js  

## windows
### client only, hot reload
 - set NODE_ENV=development  
 - cli client:serve  

### server and client
 - setlocal  
 - set NODE_ENV=production  
 - cli server:serve  

## osx
 - install node  
 - npm install  
 as above, replace cli with gulp  

# license
I'd like this to be MIT licensed, but I haven't really kept track of dependency licenses. I'll take a look at this at some point.
