// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  "use strict";

  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false,
    );
  });
})();

(() => {
  const cities = [
    "Jaipur",
    "Mumbai",
    "Goa",
    "Udaipur",
    "Shimla",
    "Bengaluru",
    "Jaisalmer",
    "Kochi",
    "Hyderabad",
    "Delhi",
    "Darjeeling",
    "Pune",
    "Chennai",
    "Varanasi",
    "Port Blair",
  ];

  const destinationInput = document.getElementById("where");
  const suggestionBox = document.getElementById("destination-suggestions");

  if (!destinationInput || !suggestionBox) return;

  const renderSuggestions = (query = "") => {
    const searchText = query.trim().toLowerCase();

    const filteredCities = cities.filter((city) =>
      city.toLowerCase().includes(searchText),
    );

    suggestionBox.innerHTML = "";

    if (!filteredCities.length) {
      suggestionBox.innerHTML =
        '<p class="suggestion-empty">No matching destination found</p>';
      suggestionBox.classList.add("show");
      return;
    }

    filteredCities.forEach((city) => {
      const suggestionItem = document.createElement("button");
      suggestionItem.type = "button";
      suggestionItem.className = "suggestion-item";
      suggestionItem.setAttribute("role", "option");
      suggestionItem.textContent = city;

      suggestionItem.addEventListener("click", () => {
        destinationInput.value = city;
        suggestionBox.classList.remove("show");
      });

      suggestionBox.appendChild(suggestionItem);
    });

    suggestionBox.classList.add("show");
  };

  destinationInput.addEventListener("focus", () =>
    renderSuggestions(destinationInput.value),
  );

  destinationInput.addEventListener("input", (event) => {
    renderSuggestions(event.target.value);
  });

  document.addEventListener("click", (event) => {
    if (
      !suggestionBox.contains(event.target) &&
      event.target !== destinationInput
    ) {
      suggestionBox.classList.remove("show");
    }
  });
})();
