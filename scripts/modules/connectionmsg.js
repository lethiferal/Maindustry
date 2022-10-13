//Edit the content of Call.sendMessage to change the message sent.

Events.on(PlayerJoin, (event) => {
  if (Core.settings.get('customJoinLeave', '') === 'true'){
  const player = event.player;
  Call.sendMessage('[green][accent] ' + player.name + ' [white]connected.');
  return;
  }});

Events.on(PlayerLeave, (event) => {
  if (Core.settings.get('customJoinLeave', '') === 'true'){
  const player = event.player;
  Call.sendMessage('[crimson][accent] ' + player.name + ' [white]disconnected.');
  return;
}});