import configLocal from "./staging.config";
import configStaging from "./staging.config";
import configProduction from "./prod.config";
import configDev from "./dev.config";

let config = configDev;

let envValue = process.env.REACT_APP_STAGE;
if (envValue === "STAGING") config = configStaging;
else if (envValue === "LOCAL") config = configLocal;
else if (envValue === "PRODUCTION") config = configProduction;

export default {
  ...config
};
