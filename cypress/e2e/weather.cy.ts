describe("Weather Store", () => {
  beforeEach(() => {
    cy.visit("/", {
      onBeforeLoad({ navigator }) {
        // Reset geolocation to default behavior before each test
        cy.stub(navigator.geolocation, "getCurrentPosition").callsArgWith(
          0,
          {},
        );
      },
    });
  });
  it("Loads without geoloc", () => {
    cy.visit("/", {
      onBeforeLoad({ navigator }) {
        cy.stub(navigator.geolocation, "getCurrentPosition").resetBehavior();
      },
    });
    cy.window()
      .its("navigator.geolocation.getCurrentPosition")
      .should("be.called");
    cy.findByText("Accès à la géolocalisation refusé").should("exist");
  });
  it("Loads with geoloc", () => {
    cy.visit("/", {
      onBeforeLoad({ navigator }) {
        // Košice city
        const latitude = 50.633333;
        const longitude = 3.066667;
        cy.stub(navigator.geolocation, "getCurrentPosition").callsArgWith(0, {
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
  /* it("Opens weather forecast", () => {
                    cy.visit("/", {
                      onBeforeLoad({ navigator }) {
                        const latitude = 50.633333;
                        const longitude = 3.066667;
                        cy.stub(navigator.geolocation, "getCurrentPosition").callsArgWith(0, {
                          coords: { latitude, longitude },
                        });
                      },
                    });
                    cy.get("[data-cy=forecast-today]").should("not.exist");
                    cy.get("[data-cy=forecast-10-days]").should("not.exist");
                    cy.get("[data-cy=toggle-forecast-button]").click();
                    cy.get("[data-cy=forecast-today]").should("exist").should("be.visible");
                    cy.get("[data-cy=forecast-10-days]").should("exist").should("be.visible");
                  }); */
  it("Open and close weather forecast", () => {
    cy.visit("/", {
      onBeforeLoad({ navigator }) {
        const latitude = 50.633333;
        const longitude = 3.066667;
        cy.stub(navigator.geolocation, "getCurrentPosition").callsArgWith(0, {
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
  });
  it("Chan");
});
