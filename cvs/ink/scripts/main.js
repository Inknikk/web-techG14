      // Theme toggle functionality
      const themeToggle = document.getElementById("themeToggle");
      const icon = themeToggle.querySelector("i");
      const body = document.body;

      // Check for saved theme preference or use preferred color scheme
      const savedTheme =
        localStorage.getItem("theme") ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light");

      // Apply the saved theme
      body.setAttribute("data-theme", savedTheme);
      icon.className = savedTheme === "dark" ? "fas fa-moon" : "fas fa-sun";

      // Toggle theme on button click
      themeToggle.addEventListener("click", () => {
        const currentTheme = body.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";

        body.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);

        icon.className = newTheme === "dark" ? "fas fa-moon" : "fas fa-sun";
      });