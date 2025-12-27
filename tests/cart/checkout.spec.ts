import { test, expect } from "../../fixtures/pageFixtures";
import userData from "../../test-data/userData.json";
import urls from "../../constants/urls";
import { getPages } from "../../tests/helpers/getPages";
import { expectedAddress } from "../helpers/userAddress";
test.describe("Checkout", () => {
  test("checkout as registered user", async ({ poManager, authApi }) => {
    const {
      dashboardPage,
      productsPage,
      loginPage,
      viewCartPage,
      checkoutPage,
      paymentPage,
      paymentDonePage,
    } = getPages(poManager);
    await authApi.createUserViaApi();
    await loginPage.open(urls.LOGIN);
    await loginPage.login(userData.email, userData.password);
    await expect(dashboardPage.loggedInUser).toBeVisible();
    await dashboardPage.gotoMenuItem("Products");
    const addedProduct = await productsPage.addProduct(0);
    await productsPage.clickViewCart();
    expect(addedProduct[0]).toEqual(await viewCartPage.getProductName(0));
    await viewCartPage.proceedToCheckout();
    const rawBillingAddress = await checkoutPage.getBillingAddress();
    const billingAddress = await checkoutPage.normalizeText(rawBillingAddress);
    expect(billingAddress).toContain(expectedAddress());
    const rawDeliveryAddress = await checkoutPage.getDeliveryAddress();
    const deliveryAddress = await checkoutPage.normalizeText(
      rawDeliveryAddress
    );
    expect(deliveryAddress).toContain(expectedAddress());
    await checkoutPage.enterComment("Please deliver between 9 AM to 5 PM");
    await checkoutPage.proceedToCheckout();
    await paymentPage.enterCardDetails();
    await expect(paymentDonePage.orderPlacedMessage).toBeVisible();
    await paymentDonePage.downloadInvoice();
    // await poManager.getLoginPage().deleteAccount();
  });
  test("register while checkout", async ({ poManager, authApi }) => {
    const {
      dashboardPage,
      productsPage,
      loginPage,
      viewCartPage,
      checkoutPage,
      paymentPage,
      paymentDonePage,
    } = getPages(poManager);
    await productsPage.open(urls.PRODUCTS);
    const addedProduct = await productsPage.addProduct(0);
    await productsPage.clickViewCart();
    await viewCartPage.proceedToCheckout();
    await expect(viewCartPage.registerLink).toBeVisible();
    await viewCartPage.clickRegisterLink();
    await authApi.createUserViaApi();
    await loginPage.login(userData.email, userData.password);
    await expect(dashboardPage.loggedInUser).toBeVisible();
    await dashboardPage.gotoMenuItem("Cart");
    expect(addedProduct[0]).toEqual(await viewCartPage.getProductName(0));
    await viewCartPage.proceedToCheckout();
    const rawBillingAddress = await checkoutPage.getBillingAddress();
    const billingAddress = await checkoutPage.normalizeText(rawBillingAddress);
    expect(billingAddress).toContain(expectedAddress());
    const rawDeliveryAddress = await checkoutPage.getDeliveryAddress();
    const deliveryAddress = await checkoutPage.normalizeText(
      rawDeliveryAddress
    );
    expect(deliveryAddress).toContain(expectedAddress());
    await checkoutPage.enterComment("Please deliver between 9 AM to 5 PM");
    await checkoutPage.proceedToCheckout();
    await paymentPage.enterCardDetails();
    await expect(paymentDonePage.orderPlacedMessage).toBeVisible();
    await paymentDonePage.downloadInvoice();
    // await poManager.getLoginPage().deleteAccount();
  });
});
