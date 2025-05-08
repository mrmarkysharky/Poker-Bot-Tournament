module.exports = function () {
  const prompt = require('prompt-sync')();
  const helper = require('pokerbot-helper');
  var info = { 
    name: "SigmaBot",
    email: "",
    btcWallet: ""
  };

  /*
    Modify the update() function with your code
    The update function *must* return the amount you wish to bet. 
    If you return less than the minimum required to call, your bot will fold
  */
  function update(game) {
    if (game.state !== "complete") {
      console.log(game.state);
      console.log("Community: " + game.community);
      console.log("My cards; " + game.self.cards);
      console.log(game.betting);
      //let bet = prompt("Bet amount: ");
      //return bet;
      let result = helper.checkHand(game);
      console.log(result);
      if (result.hand == "pair"){
        return game.betting.call;
      }
      else if(result.hand == "three kind" || result.hand == "four kind" || result.hand == "full house" || result.hand == "straight" || result.hand == "flush"){
        return game.betting.raise;
      }
      else if(result.hand == "royal flush" || result.hand == "straight flush"){
        return game.self.chips;
      }

    }
  }

  return { update: update, info: info }

}
