import { AbstractLogger, LogLevel, LogMessage, QueryRunner } from "typeorm"


export type LogLevel2 = "query-hit" | LogLevel

export class MyTypeORMLogger extends AbstractLogger {

  private _level: LogLevel2[];

  public constructor(options?: LogLevel2[]) {
    if (options) {
      if (options.includes('query-hit'))
        options = ['query', ...options];
      else
        options = options;
    }
    super(options as LogLevel[]);
    this._level = options;
  }
  /**
   * Write log to specific output.
   */
  protected writeLog(
    level: LogLevel2,
    logMessage: LogMessage | LogMessage[],
    queryRunner?: QueryRunner,
  ) {
    const messages = this.prepareLogMessages(logMessage, {
      highlightSql: false,
    })

    for (let message of messages) {

      switch (message.type ?? level) {
        case "log":
        case "schema-build":
        case "migration":
          console.log(message.message)
          break

        case "info":
        case "query":
          if (this._level.includes('query-hit')) {
            let tablesHit: string[] = message.message.toString().split(/ FROM | LEFT JOIN +/)
              .map((value) => {
                let tt = value.match(/^"([a-z_]+)"/);

                if (tt && tt[1])
                  return tt[1]
              })
              .filter(e => e != undefined);

            if (tablesHit && tablesHit.length > 0)
              console.debug('query-hit:', `[ ${tablesHit.join(', ')} ]`);
          } else {
            if (message.prefix) {
              console.info(message.prefix, message.message)
            } else {
              console.info(message.message)
            }
          }
          break

        case "warn":
        case "query-slow":
          if (message.prefix) {
            console.warn(message.prefix, message.message)
          } else {
            console.warn(message.message)
          }
          break

        case "error":
        case "query-error":
          if (message.prefix) {
            console.error(message.prefix, message.message)
          } else {
            console.error(message.message)
          }
          break
      }
    }
  }

  // async logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
  //   let tablesHit: string[] = query.split(/ FROM | LEFT JOIN +/)
  //     .map((value) => {
  //       let tt = value.match(/^"([a-z_]+)"/);

  //       if (tt && tt[1])
  //         return tt[1]
  //     })
  //     .filter(e => e != undefined);

  //   console.debug('query-hit:', tablesHit.join(', '));
  // }

}