const { default: SlippiGame } = require('slp-parser-js');

/**
 * Used to read a slippi file and save contents (except for frames) 
 * to mongodb.
 */

export class GameLoader {
  constructor(slp_file) {
    const game = new SlippiGame(slp_file)

    const settings = game.getSettings()
    const metadata = game.getMetadata()
    const stats = game.getStats() //note: want stats.overall

  }

}

module.exports = gameloader;