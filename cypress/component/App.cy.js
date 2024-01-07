import App from "../../src/App";
describe("App.cy.js", () => {
  it("should mount the App without issues", () => {
    cy.mount(<App />);
  });
});
