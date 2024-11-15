export const logUserAction = (ctx: any, action: string) => {
  const tgId = ctx.from?.id.toString();
  const username = ctx.from?.username || "";

  const green = "\x1b[32m";
  const yellow = "\x1b[33m";
  const cyan = "\x1b[36m";
  const reset = "\x1b[0m";
  console.log(
    `💡 ${cyan}@${username}${reset} | ${yellow}${tgId}${reset} | ${action}\t\t` +
      `[${green}${new Date().toUTCString()}${reset}]`
  );
};

/*
Reset: \x1b[0m
Black: \x1b[30m
Red: \x1b[31m
Green: \x1b[32m
Yellow: \x1b[33m
Blue: \x1b[34m
Magenta: \x1b[35m
Cyan: \x1b[36m
White: \x1b[37m
*/
