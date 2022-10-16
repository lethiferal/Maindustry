Events.on(ServerLoadEvent, (e) => {
  let serverCommands;
  let clientCommands;
  clientCommands = Vars.netServer.clientCommands;
  serverCommands = Core.app.listeners.find(
      (l) => l instanceof Packages.mindustry.server.ServerControl
    ).handler;  
  const runner = (method) => new Packages.arc.util.CommandHandler.CommandRunner({ accept: method });

  serverCommands.register(
    'customjoinleave',
    '<true/false>',
    'Set whether to use custom connection messages.',
    runner((args) => {
      if (['true', 'false'].includes(args[0])) {
        let showConnectMessageToggle = true;
        showConnectMessageToggle = args[0] === 'true' ? false : true;
        Core.settings.put('customJoinLeave', args[0]);
        Core.settings.put('showConnectMessages', showConnectMessageToggle);
        Core.settings.manualSave();
        Log.info('Set custom connection messages to: ' + args[0]);
        return;
      } else {
        Log.warn('"' + args[0] + '"' + ' is not a valid argument.');
    }})
  );
  serverCommands.register(
    'loadautosave',
    '<true/false>',
    'Auto-saves the map and loads it on server start.',
    runner((args) => {
      if (['true', 'false'].includes(args[0])) {
        let saveFile;
        saveFile = Vars.saveDirectory.child('autosave' + '.' + Vars.saveExtension);
        Core.settings.put('loadAutoSave', args[0]);
        Core.settings.manualSave();
        Log.info('Set loading of auto-saves on server start to: ' + args[0]);
        (args[0] === 'true') && Core.settings.put('autosave', false);
        (args[0] === 'true') && Log.info('Disabled default server auto-save.');
        (args[0] === 'true') && Core.app.post(() => {SaveIO.save(saveFile);Log.info('Created initial save file.');});
        return;
      } else {
        Log.warn('"' + args[0] + '"' + ' is not a valid argument.');
    }})
  );
  clientCommands.register(
    'pause',
    '',
    'Pauses or un-pauses the server.',
    runner((args, player) => {
      if (player.admin) {
        let pauseToggle = Vars.state.serverPaused;
        pauseToggle = !pauseToggle;
        Vars.state.serverPaused = pauseToggle;
      } else {
        player.sendMessage('[crimson]⚠ [white]Great try but, [crimson]you are not an admin[white].');
      }
    })
  );
});
