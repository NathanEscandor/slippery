const { default: SlippiGame } = require('slp-parser-js');

/**
 * Used to read a slippi file and save contents (except for frames) 
 * to mongodb.
 */

const gameloader = class GameLoader {
  constructor(slp_file) {
    const game = new SlippiGame('test.slp')

    const settings = game.getSettings()
    const metadata = game.getMetadata()
    const stats = game.getStats().overall //note: want stats.overall

  }

}

module.exports = gameloader;