# tic-tac-toe
This is a simple Tic-Tac-Toe game made in vanilla Javascript.

### Links

- Live Site URL: [Live Preview](https://chic-bunny-491a7c.netlify.app/)


### why did i make this? Nobody cares about a tic-tac-toe game

- I had just recently learned about ES Modules and how prevalent its usage was. But since it was an ES6 addition, not every codebase had adopted it, which is why i also wanted get familiar with other widely used design patterns, namely - *factory function pattern* and the *classical module pattern*. And both these patterns utilised closures, too. I knew how *closures* worked but i wanted to see its application in a real app. Tic-tac-toe seemed like a great pet project to start with.

### Screenshots and videos
[tictactoe.webm](https://user-images.githubusercontent.com/70796112/189516159-53ec790e-784c-4672-8fd0-3a2fd6d271f6.webm)

### Built with

- HTML
- CSS
- Javascript


### Challenges that i faced while building this project

- My biggest challenge with this project was building the Player and the Computer objects. Initially i had decided to use a singleton for the DOM object, a singleton for the Gameboard object, and two instances of player object, one for player1 and another one for the Computer. I only got that half right. It started out fine but as the application grew and i started adding more functionality,  the player instance and the computer instance became so vastly different that using singletons for them would have saved me so many lines of code. I ended up deleting the mess that i had created and re-did the whole thing as a singleton. I also realised that implementing inheritance in class based syntax is so much easier than doing it on instances of a factory function.
 


