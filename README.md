# Universal react
Overengineered todo with: Server rendering, code splitting, hot reload, optimistic updates, critical path css, offline capabilities and various production optimizations.

# features
 - [x] server rendering  
 - [x] code splitting  
 - [x] hot reload  
 - [x] optimistic updates  
 - [x] critical path css  
 - [ ] offline capabilities  
 - [x] production optimizations (gzip, output cache..)  
 - [ ] production ready

# tech
 - react router 4
 - webpack 2

# progress
(https://trello.com/b/VmVhdtS2/universal-react), you're welcome to help out if you find any of the tasks interesting.

# production use
At this time there are some really important parts to fix before being used in production. The worst of them are listed below. I've got somewhere around 30-40 tasks left before I start using it myself.

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
 - set NODE_ENV=development  
 - cli client:serve  

 - setlocal  
 - set NODE_ENV=production  
 - cli server:serve  

## osx
 - install node  
 - npm install  
 as above, replace cli with gulp  
