import Chalk from "chalk";

// logger
export default class L {
  public static log(msg: string) {
    console.log(Chalk.bgCyanBright("log"), Chalk.blueBright(msg));
  }

  public static success(msg: string) {
    console.log(Chalk.bgGreenBright("success"), Chalk.greenBright(msg));
  }

  public static error(msg: string) {
    console.log(Chalk.bgRedBright("error"), Chalk.redBright(msg));
  }
}
