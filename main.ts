import { program } from "commander";
import denoJson from "./deno.json" assert { type: "json" };
import { fromCSV } from "./src/config.ts";

program
  .name("ssh-config-generator")
  .description("Generate ssh config file from a list servers on a .csv file")
  .version(denoJson.version);

program
  .command("ssh-hosts")
  .description("Generate SSH hosts file")
  .argument(
    "<file>",
    "csv file with list of servers, their alias, ip address and port",
  )
  .action(async (file) => {
    const servers = await fromCSV(file) as ServerConfig[];
    servers.forEach(
      ({ name, user = "root", ip, port = 22 }: ServerConfig) => {
        // TODO: Redirect output to file if option provided
        console.log(
          `Host ${name}\n\tHostName ${ip}\n\tPort ${port}\n\tUser ${user}\n`,
        );
      },
    );
  });

program.parse();

interface ServerConfig {
  name?: string;
  ip: string;
  port?: number;
  user?: string;
  password?: string;
  dns?: string;
}
