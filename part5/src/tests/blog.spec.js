describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/users/reset");

    const user = {
      username: "testUser",
      name: "Test User",
      password: "correctPassword",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);

    cy.visit("http://localhost:5173");
  });

  describe("Login", function () {
    // 5.17
    it("form correctly shown", function () {
      cy.contains("Login");
      cy.get("input#username");
      cy.get("input#password");
      cy.get('button[type="submit"]');
    });

    // 5.18 succeeds
    it("with correct details succeeds", function () {
      cy.get("input#username").type("testUser");
      cy.get("input#password").type("correctPassword");
      cy.get('button[type="submit"]').click();

      cy.contains("Welcome, Test User");
    });

    // 5.18 fails
    it("with incorrect details fails", function () {
      cy.get("input#username").type("testUser");
      cy.get("input#password").type("wrongPassword");
      cy.get('button[type="submit"]').click();

      cy.get(".error").should("contain", "Login failed");
      cy.get(".error").should("have.css", "color", "#dc3545");
    });

    describe("When successfully logged in", function () {
      beforeEach(function () {
        cy.get("input#username").type("testUser");
        cy.get("input#password").type("correctPassword");
        cy.get('button[type="submit"]').click();
      });

      // 5.19
      it("a new blog can be created", function () {
        cy.contains("Create New Blog").click();

        cy.get("#title").type("Cypress Testing with React");
        cy.get("#author").type("John Doe");
        cy.get("#url").type("http://google.com/");
        cy.get("button[type='submit']").click();

        cy.contains("Cypress Testing with React by John Doe");
      });

      // 5.20
      it("a logged in user can like a blog", function () {
        cy.contains("View").click();
        cy.contains("Likes: 0");

        cy.contains("Like").click();
        cy.contains("Likes: 1");
      });

      // 5.21
      it("Only the user who created a blog can delete it", function () {
        cy.contains("View").click();
        cy.contains("Delete").click();

        cy.on("window:confirm", () => true);

        cy.contains("Cypress Testing with React by John Doe").should(
          "not.exist"
        );
      });

      // 5.22
      it("only the user who crated the blog can see and click the delete button", function () {
        const otherUser = {
          username: "otherUser",
          name: "Other User",
          password: "otherPassword",
        };
        cy.request("POST", "http://localhost:3001/api/users/", otherUser);

        cy.get("input#username").type("otherUser");
        cy.get("input#password").type("otherPassword");
        cy.get('button[type="submit"]').click();

        cy.contains("View").click();

        cy.contains("Delete").should("not.exist");
      });

      // 5.23
      it("blogs ordered by amount of likes, most likes first", function () {
        cy.contains("Create New Blog").click();
        cy.get("#title").type("Blog #1");
        cy.get("#author").type("John");
        cy.get("#url").type("http://google.com/");
        cy.get("button[type='submit']").click();

        cy.contains("Create New Blog").click();
        cy.get("#title").type("Blog #2");
        cy.get("#author").type("Jane");
        cy.get("#url").type("http://google.com/");
        cy.get("button[type='submit']").click();

        cy.contains("Blog #2").parent().contains("View").click();
        cy.contains("Like").click();
        cy.contains("Likes: 1");

        cy.contains("Create New Blog").click();
        cy.get("#title").type("Blog #3");
        cy.get("#author").type("Steve");
        cy.get("#url").type("http://google.com/");
        cy.get("button[type='submit']").click();

        cy.get(".blog-component").then((blogs) => {
          cy.wrap(blogs[0]).should("contain", "Blog #2");
          cy.wrap(blogs[1]).should("contain", "Blog #3");
          cy.wrap(blogs[2]).should("contain", "Blog #1");
        });
      });
    });
  });
});
