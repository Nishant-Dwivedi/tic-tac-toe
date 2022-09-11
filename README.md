# tic-tac-toe
This is a simple Tic-Tac-Toe game made in vanilla Javascript.


### Links

- Live Site URL: [Live Preview](https://chic-bunny-491a7c.netlify.app/)


### why did i make this? Nobody cares about a tic-tac-toe game

- I had just recently learned about ES Modules and how prevalent its usage was. But since it was very recent, not every codebase had adopted it whic is why i also wanted get familiar with other widely used design patterns, namely - *factory function pattern* and the *classical module pattern*. Tic-tac-toe seemed like a great pet project to start with.

### Screenshots and videos


### Built with

- CSS Grid
- Javascript


### My thoughts about the project and what I learned from it

- i had some trouble seeing the addvantages of using these design patterns over  OOP paradigm. Implementing inheritance in objects created using factory functions (I initially used factory function for instantiating player1 and computerAI objects) was especially messy. i had to use a separate "protoype object" for the delegation of common methods, and that diluted the global scope anyway. I did resort to using two separate instances using IIFEs instead of factory functions.

 


