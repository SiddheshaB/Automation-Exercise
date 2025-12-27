import { test, expect } from "../../fixtures/pageFixtures";
import urls from "../../constants/urls";
import { getPages } from "../helpers/getPages";
import userData from "../../test-data/userData.json";
test.describe("Product search", () => {
  test("shows searched products", async ({ poManager }) => {
    const productsPage = poManager.getProductsPage();
    await productsPage.open(urls.PRODUCTS);
    await expect(productsPage.pageHeading).toBeVisible();
    await productsPage.searchProduct("Blue Top");
    await expect(productsPage.searchedHeading).toBeVisible();
    const results = await productsPage.getAllProductNames();
    for (const name of results) {
      expect(name).toContain("Blue Top");
    }
  });
  test("removes an item from the cart", async ({ poManager, productApi }) => {
    const { productsPage, viewCartPage } = getPages(poManager);
    await productsPage.open(urls.PRODUCTS);
    await productsPage.addProduct(0);
    await productsPage.clickContinueShopping();
    await productsPage.addProduct(2);
    await productsPage.clickViewCart();
    const cartItems = await viewCartPage.getCartItems();
    const productsList = await productApi.getAllProductsListViaApi();
    for (let i = 0; i < cartItems.length; i++) {
      expect(cartItems[i]).toBe(productsList[i].name);
    }
    await viewCartPage.removeAnItem(1);
    expect((await cartItems.length) - 1).toBe(1);
  });

  test("verifies product details", async ({ poManager, productApi }) => {
    const { productsPage, productDetailsPage } = getPages(poManager);
    await productsPage.open(urls.PRODUCTS);
    await productsPage.clickViewProduct(0);
    const product = await productApi.getAllProductsListViaApi();
    const productInfo = await productDetailsPage.getProdutInformation();
    expect(productInfo).toContain(product[0].name);
    expect(productInfo).toContain(product[0].brand);
    expect(productInfo).toContain(product[0].price);
    expect(productInfo).toContain(product[0].category.category);
    expect(productInfo).toContain(product[0].category.usertype.usertype);
    expect(await productDetailsPage.availability).toBeVisible();
    expect(await productDetailsPage.condition).toBeVisible();
  });

  test("adds a review to a product", async ({ poManager }) => {
    const { productsPage, productDetailsPage } = getPages(poManager);
    await productsPage.open(urls.PRODUCTS);
    await productsPage.clickViewProduct(0);
    await productDetailsPage.addReview(
      userData.name,
      userData.email,
      userData.review
    );
    expect(await productDetailsPage.reviewSuccessMessage).toBeVisible();
  });
});
