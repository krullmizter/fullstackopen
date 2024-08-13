describe("Blog app", function () {
  let uniqueUsername;
  let otherUser;

  beforeEach(function () {
    cy.wait(2000);

    uniqueUsername = `testUser_${Date.now()}`;
    otherUser = {
      username: `otherUser_${Date.now()}`,
      name: "Other User",
      password: "otherPassword",
    };

    cy.request("POST", "http://localhost:3001/api/blogs/reset");
    cy.wait(2000);

    cy.request("POST", "http://localhost:3001/api/users/", {
      username: uniqueUsername,
      name: "Test User",
      password: "correctPassword",
    });

    cy.request("POST", "http://localhost:3001/api/users/", otherUser);

    cy.visit("http://localhost:5173");
  });

  describe("Login", function () {
    // 5.17
    it("form is shown", function () {
      cy.contains("Login");
      cy.get("input#username").should("be.visible");
      cy.get("input#password").should("be.visible");
      cy.get('button[type="submit"]').should("be.visible");
    });

    describe("When not logged in", function () {
      // 5.18
      it("succeeds login with the correct credentials", function () {
        cy.get("input#username").type(uniqueUsername);
        cy.get("input#password").type("correctPassword");
        cy.get('button[type="submit"]').click();

        cy.contains(`Welcome, Test User`);
      });

      // 5.18
      it("fails with incorrect credentials", function () {
        cy.get("input#username").type(uniqueUsername);
        cy.get("input#password").type("wrongPassword");
        cy.get('button[type="submit"]').click();

        cy.get(".error").should("contain", "Login failed");
        cy.get(".error").should(
          "have.css",
          "background-color",
          "rgb(220, 53, 69)"
        );
      });
    });

    describe("When successfully logged in", function () {
      beforeEach(function () {
        cy.get("input#username").type(uniqueUsername);
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
        cy.contains("Create New Blog").click();
        cy.get("#title").type("Blog to Like");
        cy.get("#author").type("John Doe");
        cy.get("#url").type("http://google.com/");
        cy.get("button[type='submit']").click();

        cy.contains("Blog to Like").parent().get(".like-button").click();
        cy.contains("View").click();
        cy.contains("Likes: 1");
      });

      // 5.21
      it("only the user who created a blog can delete it", function () {
        cy.contains("Create New Blog").click();
        cy.get("#title").type("Blog to Delete");
        cy.get("#author").type("John Doe");
        cy.get("#url").type("http://google.com/");
        cy.get("button[type='submit']").click();

        cy.contains("Blog to Delete").parent().get(".delete-button").click();

        cy.on("window:confirm", () => true);

        cy.contains("Blog to Delete").should("not.exist");
      });

      // 5.22
      it("only the user who created the blog can see and click the delete button", function () {
        cy.get(".logoutBtn").click();

        cy.request("POST", "http://localhost:3001/api/login", {
          username: otherUser.username,
          password: otherUser.password,
        });

        cy.get("input#username").type(otherUser.username);
        cy.get("input#password").type(otherUser.password);
        cy.get('button[type="submit"]').click();

        cy.contains("Create New Blog").click();
        cy.get("#title").type("Another User Blog");
        cy.get("#author").type("Jane Doe");
        cy.get("#url").type("http://google.com/");
        cy.get("button[type='submit']").click();

        cy.contains("Another User Blog").parent().get(".delete-button").click();
        cy.contains("Delete").should("not.exist");
      });

      // 5.23
      it("blogs are ordered by amount of likes, most likes first", function () {
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

        cy.contains("Blog #2").parent().find(".like-button").click();

        cy.contains("Create New Blog").click();
        cy.get("#title").type("Blog #3");
        cy.get("#author").type("Steve");
        cy.get("#url").type("http://google.com/");
        cy.get("button[type='submit']").click();

        cy.wait(2000);

        cy.get(".blog-component").then((blogs) => {
          cy.wrap(blogs[0]).should("contain", "Blog #2");
          cy.wrap(blogs[1]).should("contain", "Blog #1");
          cy.wrap(blogs[2]).should("contain", "Blog #3");
        });
      });
    });
  });
});
