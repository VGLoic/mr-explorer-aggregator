interface Config {}

class ConfigService {
    config: Config = {}

    get(key: string): string {
        if (!(key in this.config)) {
            throw new Error(`Key ${key} does not exist`);
        }
        return this.config[key];
    }
}

export { Config, ConfigService };