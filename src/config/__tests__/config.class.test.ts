import { ConfigService } from "../config.class";
describe("ConfigClass", () => {
  const configService = new ConfigService();

  test("it should retrieve an existing key", () => {
    expect(configService.get("pageLimit")).toEqual("11");
  });

  test("it should throw if get a non existing key", () => {
    let testError;
    try {
      configService.get("myPrivateKey");
    } catch (err) {
      testError = err;
    }
    expect(testError.message).toEqual("Key myPrivateKey does not exist");
  });
});
