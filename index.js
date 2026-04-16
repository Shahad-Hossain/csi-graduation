let locations = {};

fetch("locations.json")
  .then((response) => response.json())
  .then((data) => {
    locations = data;
    initializeMapButtons();
  })
  .catch((error) => {
    console.error("Error loading locations:", error);
  });

function initializeMapButtons() {
  const mapButtons = document.querySelectorAll("[data-category]");

  mapButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const buttonId = e.currentTarget.id;
      const category = e.currentTarget.dataset.category;

      let groupKey = category === "lots" ? "lots" : "walking";
      let destinationKey = buttonId;

      const group = locations[groupKey];
      const destination = group?.points?.[destinationKey];

      if (!destination) {
        console.error("No destination found for:", destinationKey);
        return;
      }

      openDirectionsToDestination(destination, group.travelMode);
    });
  });
}

// --- URL helpers ---
function openDirectionsToDestination(destination, travelMode = "driving") {
  if (!destination) {
    console.error("No destination provided.");
    return;
  }

  const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    destination,
  )}&travelmode=${encodeURIComponent(travelMode)}`;

  window.open(url, "_blank");
}

const hamburgerBtn = document.getElementById("hamburgerBtn");
const closeFilterBtn = document.getElementById("closeFilterBtn");
const filterPanel = document.getElementById("filterPanel");
const filterOverlay = document.getElementById("filterOverlay");
const filterCheckboxes = document.querySelectorAll(".filter-checkbox");

// Toggle mobile menu
function handleHamBurger() {
  filterPanel.classList.toggle("open");
  filterOverlay.classList.toggle("active");
}

function openMobileMenu() {
  filterPanel.classList.add("open");
  filterOverlay.classList.add("active");
}

function closeMobileMenu() {
  filterPanel.classList.remove("open");
  filterOverlay.classList.remove("active");
}

if (hamburgerBtn) hamburgerBtn.addEventListener("click", handleHamBurger);
if (closeFilterBtn) closeFilterBtn.addEventListener("click", closeMobileMenu);
if (filterOverlay) filterOverlay.addEventListener("click", closeMobileMenu);

filterCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", (e) => {
    const categoryToToggle = e.target.value.trim();
    const isChecked = e.target.checked;

    const targets = document.querySelectorAll(
      `[data-category="${categoryToToggle}"]`,
    );

    targets.forEach((el) => {
      if (isChecked) {
        el.classList.add("visible");
      } else {
        el.classList.remove("visible");
      }
    });
  });
});

// Accordion
document.querySelectorAll(".accordion-btn").forEach((button) => {
  button.addEventListener("click", function () {
    const content = this.nextElementSibling;

    document.querySelectorAll(".accordion-content").forEach((item) => {
      if (item !== content) {
        item.style.maxHeight = null;
        item.classList.remove("active");
      }
    });

    if (content.style.maxHeight) {
      content.style.maxHeight = null;
      content.classList.remove("active");
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      content.classList.add("active");
    }
  });
});

function clearAll() {
  document.querySelectorAll(".filter-checkbox").forEach((checkbox) => {
    checkbox.checked = false;
  });

  document.querySelectorAll("[data-category]").forEach((el) => {
    el.classList.remove("visible");
  });
}

function commencementAlert() {
  alert( 
    "The individual computer science commencement is held at the 1P building. Families are encouraged to walk to 1P early to grab the best seat. Tickets are not required!"
  );
}

function lotFourAlert() {
  alert( 
    "Warning: If you are coming in from the Victory BLVD entrance do not take the first right Google Maps says! Go until you see gravel at the lot closest to the 1N building."
  );
}