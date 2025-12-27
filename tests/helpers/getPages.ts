function getPages(poManager: any) {
  return {
    dashboardPage: poManager.getDashboardPage(),
    productsPage: poManager.getProductsPage(),
    loginPage: poManager.getLoginPage(),
    viewCartPage: poManager.getViewCartPage(),
    checkoutPage: poManager.getCheckoutPage(),
    paymentPage: poManager.getPaymentPage(),
    paymentDonePage: poManager.getPaymentDonePage(),
    signUpPage: poManager.getSignUpPage(),
    contactUsPage: poManager.getContactUsFormPage(),
    productDetailsPage: poManager.getProductDetailsPage(),
  };
}
export { getPages };
