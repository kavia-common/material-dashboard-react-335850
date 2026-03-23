import { getRouterBasename } from "./basename";

describe("getRouterBasename", () => {
  test("returns empty string when PUBLIC_URL is empty", () => {
    const old = process.env.PUBLIC_URL;
    delete process.env.PUBLIC_URL;

    expect(getRouterBasename()).toBe("");

    process.env.PUBLIC_URL = old;
  });

  test("normalizes a subpath and strips trailing slash", () => {
    const old = process.env.PUBLIC_URL;
    process.env.PUBLIC_URL = "/myapp/";

    expect(getRouterBasename()).toBe("/myapp");

    process.env.PUBLIC_URL = old;
  });

  test("extracts pathname from full URL", () => {
    const old = process.env.PUBLIC_URL;
    process.env.PUBLIC_URL = "https://example.com/myapp/";

    expect(getRouterBasename()).toBe("/myapp");

    process.env.PUBLIC_URL = old;
  });
});
