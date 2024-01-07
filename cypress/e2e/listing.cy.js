describe("empty spec", () => {
  it("it should show a listing of cards", () => {
    cy.visit("http://localhost:3000");
    cy.get(".cardList").its("length").should("be.gte", 1);
  });
  it("every card should link to detail page", () => {
    cy.visit("http://localhost:3000");
    cy.get(".cardList")
      .find("a")
      .invoke("attr", "href")
      .should("match", /^\/film\//);
  });
});
