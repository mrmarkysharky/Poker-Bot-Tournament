var MachinePoker = require('machine-poker')
    , JsSeat = MachinePoker.seats.JsLocal;

const fs = require('fs');
function getFileNames(directoryPath) {
  try {
    const files = fs.readdirSync(directoryPath);
    return files;
  } catch (err) {
    console.error("Error reading directory:", err);
    return [];
  }
}

let botNames = getFileNames('players');
const bots = [];
for (let i = 0; i < botNames.length; i++) {
  bots.push(JsSeat.create(require('../players/' + botNames[i])));
}

exports.createTable = function (opts) {
  var table = MachinePoker.create({
    maxRounds: opts.hands || 100,
    chips: opts.chips || 1000
  });

  table.addPlayers(bots);
  return table;
}
