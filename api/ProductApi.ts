import { APIRequestContext } from "@playwright/test";
export class ProductApi {
    response: any;
  constructor(private request: APIRequestContext) {}
  async getAllProductsListViaApi() {
    this.response = await fetch(
      "https://automationexercise.com/api/productsList",
      {
        method: "GET",
      }
    );

    const body = await this.response.json();
    return body.products;
  }
}