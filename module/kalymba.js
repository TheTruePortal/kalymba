// Import Modules
import { Kalymba } from './config.js';
import { KalymbaActor } from './actor/actor.js';
import { KalymbaActorSheet } from './actor/actor-sheet.js';
import { KalymbaItem } from './item/item.js';
import { KalymbaItemSheet } from './item/item-sheet.js';

Hooks.once('init', async function () {
  console.log(
    `Kalymba | Initializing the Kalymba Game System\n${Kalymba.ASCII}`
  );

  game.kalymba = {
    KalymbaActor,
    KalymbaItem
  };

  /**
   * Set an initiative formula for the system
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: '2d6 + @skills.physical.initiative.value'
  };

  // Define custom Entity classes
  CONFIG.Actor.entityClass = KalymbaActor;
  CONFIG.Item.entityClass = KalymbaItem;

  // Register sheet application classes
  Actors.unregisterSheet('core', ActorSheet);
  Actors.registerSheet('kalymba', KalymbaActorSheet, { makeDefault: true });
  Items.unregisterSheet('core', ItemSheet);
  Items.registerSheet('kalymba', KalymbaItemSheet, { makeDefault: true });

  // If you need to add Handlebars helpers, here are a few useful examples:
  Handlebars.registerHelper('concat', function () {
    let outStr = '';
    for (const arg in arguments) {
      if (typeof arguments[arg] !== 'object') {
        outStr += arguments[arg];
      }
    }
    return outStr;
  });

  Handlebars.registerHelper('toLowerCase', function (str) {
    return str.toLowerCase();
  });
});
