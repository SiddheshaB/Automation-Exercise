import { test, expect } from "../../fixtures/pageFixtures";
import urls from "../../constants/urls";
test.describe("Product search", () => {
  test("shows searched products", async ({ poManager }) => {
    const productsPage = poManager.getProductsPage();
    await productsPage.open(urls.PRODUCTS);
    await expect(productsPage.pageHeading).toBeVisible();
    await productsPage.searchProduct("T-shirt");
    await expect(productsPage.searchedHeading).toBeVisible();
    const results = await productsPage.getAllProductNames();
    for (const name of results) {
      expect(name).toContain("T-shirt");
    }
  });
});
