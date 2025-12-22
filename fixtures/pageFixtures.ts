import { test as base } from "@playwright/test";
import { POManager } from "../pages/POManager";
import { AuthApi } from "../api/AuthApi";
type Fixtures = {
  poManager: POManager;
  authApi: AuthApi;
};
export const test = base.extend<Fixtures>({
  poManager: async ({ page }, use) => {
    await use(new POManager(page));
  },
  authApi: async ({ request }, use) => {
    await use(new AuthApi(request));
  },
});
export { expect } from "@playwright/test";
