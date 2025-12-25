import userData from "../../test-data/userData.json";
function expectedAddress() {
  return `${userData.address1} ${userData.address2} ${userData.city} ${userData.state} ${userData.zipcode} ${userData.country}`;
}
export { expectedAddress };
