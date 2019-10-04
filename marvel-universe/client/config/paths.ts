import path from "path";
import fs from "fs";

const appDir: string = fs.realpathSync(process.cwd());
const resolveApp = (relativePath: string) => path.resolve(appDir, relativePath);

interface IModule {
  [name: string]: string;
}

const m: IModule = {
  appPath: resolveApp("."),
  appIndex: resolveApp("src/index"),
  proxySetup: resolveApp("src/setupProxy.js"),
  packageJson: resolveApp("../package.json")
};

export default m;
