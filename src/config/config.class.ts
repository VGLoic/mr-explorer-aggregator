interface Config {
  pageLimit: string;
}

class ConfigService {
  config: Config = {
    pageLimit: "11",
  };

  get(key: string): string {
    if (!(key in this.config)) {
      throw new Error(`Key ${key} does not exist`);
    }
    return this.config[key];
  }
}

export { Config, ConfigService };
