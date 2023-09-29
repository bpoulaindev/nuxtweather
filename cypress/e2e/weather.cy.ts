describe("Weather Store", () => {
  beforeEach(() => {
    cy.visit("/", {
      onBeforeLoad({ navigator }) {
        cy.stub(navigator.geolocation, "watchPosition").callsArgWith(0, {});
      },
    });
  });
  it("Loads without geoloc", () => {
    cy.visit("/", {
      onBeforeLoad({ navigator }) {
        cy.stub(navigator.geolocation, "watchPosition").resetBehavior();
        cy.stub(navigator.permissions, "query").callsArgWith(0, {
          state: "denied",
        });
      },
    });
    cy.window().its("navigator.geolocation.watchPosition").should("be.called");
    cy.findByText("Accès à la géolocalisation refusé").should("exist");
  });
  it("Loads with geoloc", () => {
    cy.visit("/", {
      onBeforeLoad({ navigator }) {
        const latitude = 50.633333;
        const longitude = 3.066667;
        cy.stub(navigator.geolocation, "watchPosition").callsArgWith(0, {
          coords: { latitude, longitude },
        });
      },
    });
    cy.get("[data-cy=weather-component]").should("exist");
    cy.get("[data-cy=location-name]")
      .should("be.visible")
      .should("have.text", "Lille");
    cy.get("[data-cy=current-temp]").should("exist");
  });
  it("Open and close weather forecast", () => {
    cy.visit("/", {
      onBeforeLoad({ navigator }) {
        const latitude = 50.633333;
        const longitude = 3.066667;
        cy.stub(navigator.geolocation, "watchPosition").callsArgWith(0, {
          coords: { latitude, longitude },
        });
      },
    });
    cy.findByText("Lille").should("exist");
    cy.findByText("Voir les prévisions").click();
    cy.findByText("Maint.").should("exist");
    cy.findByText("Auj.").should("exist");
    cy.get("[data-cy=small-forecast]")
      .should("exist")
      .should("satisfy", ($el) => ($el.length = 24));
    cy.get("[data-cy=days-forecast]")
      .should("exist")
      .should("be.visible")
      .should("have.length", 10);
    cy.findByText("Masquer les prévisions").should("exist").click();
    cy.findByText("Voir les prévisions").should("exist");
    cy.get("[data-cy=small-forecast]").should("not.exist");
    cy.get("[data-cy=days-forecast]").should("not.exist");
    cy.findByText("Océan").should("not.exist");
    cy.get("[data-cy=settings-trigger]").should("exist").click();
    cy.findByText("Océan").should("exist").should("be.visible").click();
    cy.get("[data-cy=settings-close]").should("exist").click();
    cy.findByText("Océan").should("not.exist");
    cy.findByText("Lille").should("have.class", "text-blue-800");
  });
});
