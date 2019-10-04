import paths from "../config/paths";
import {
  prepareProxy,
  prepareUrls,
  choosePort
} from "react-dev-utils/WebpackDevServerUtils";
import checkBrowsers from "react-dev-utils";

const proxyCfg = prepareProxy(undefined, paths.packageJson);
const devServer = createDevServerConfig(proxyCfg);

checkBrowsers(paths);

// checkBrowsers(paths.appPath, true)
//   .then(() => {
//     return choosePort("0.0.0.0", "3000");
//   })
//   .then((port: string) => {});
