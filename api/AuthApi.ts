//const fetch = require("node-fetch");
import { APIRequestContext } from "@playwright/test";
import userData from "../test-data/userData.json";
export class AuthApi {
  response: any;
  constructor(private request: APIRequestContext) {}
  async createUserViaApi() {
    this.response = await fetch(
      "https://automationexercise.com/api/createAccount",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          name: userData.name,
          email: userData.email,
          password: userData.password,
          title: userData.title,
          birth_date: userData.birth_date,
          birth_month: userData.birth_month,
          birth_year: userData.birth_year,
          firstname: userData.firstname,
          lastname: userData.lastname,
          company: userData.company,
          address1: userData.address1,
          address2: userData.address2,
          country: userData.country,
          zipcode: userData.zipcode,
          state: userData.state,
          city: userData.city,
          mobile_number: userData.mobile_number,
        }),
      }
    );
    const status = await this.response.status;
    console.log(`Response status: ${status}`);
    if (status !== 200) {
      throw new Error(`Expected status code 201 but got ${status}`);
    }
    const body = await this.response.json();
    console.log(
      "Response body:" + JSON.stringify(body).includes("User created!")
    );
  }

  async deleteUserViaApi(email: string, password: string) {
    this.response = await fetch(
      "https://automationexercise.com/api/deleteAccount",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          email: email,
          password: password,
        }),
      }
    );
  }

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

  // async getAllProductsListViaApiForCart() {
  //   this.response = await fetch(
  //     "https://automationexercise.com/api/productsList",
  //     {
  //       method: "GET",
  //     }
  //   );

  //   const body = await this.response.json();
  //   return body.products;
  // }
}
module.exports = { AuthApi };
