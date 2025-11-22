//const fetch = require("node-fetch");
export class CommonApi {
  response: any;
  async createUserViaApi(email: string, password: string) {
    this.response = await fetch(
      "https://automationexercise.com/api/createAccount",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          name: "John Doe",
          email: email,
          password: password,
          title: "Mr",
          birth_date: "27",
          birth_month: "05",
          birth_year: "2002",
          firstname: "John",
          lastname: "Doe",
          company: "ABC Testing",
          address1: "24 Tib Street",
          address2: "Near Printworks",
          country: "United Kingdom",
          zipcode: "M44AB",
          state: "England",
          city: "Manchester",
          mobile_number: "7903030204",
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
    return body.products[0];
  }
}
module.exports = { CommonApi };
