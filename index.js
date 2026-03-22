const lots = {
  lot1: "Parking 1, 70 Lovell Ave, Staten Island, NY 10314",
  lot2: "Parking 2, Staten Island, NY 10314",
  lot3: "Parking 3, Loop Rd, Staten Island, NY 10314",
  lot4: "40.60075, -74.14684",
  lot5: "40.59901, -74.14682",
  lot6: "40.60037040321241, -74.14649686354696",
};

const buildings = { 
  onePCoords: "40.59969,-74.1496471",
}

const mapWrapper = document.getElementById("mapWrapper");
const lotButtons = document.querySelectorAll(
  `[data-category="lots"]`,
);

console.log(lotButtons);

lotButtons.forEach((lot) => {
  lot.addEventListener("click", (e) => {
    const lotId = e.target.id;
    
    openDirectionsToDestination(lot=lotId);
  })
})

// --- URL helpers ---
function openDirectionsToDestination(lot, travelmode = "driving") {
  const destination = lots[lot];
  const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    destination,
  )}&travelmode=${travelmode}`;
  window.open(url, "_blank");
}

const hamburgerBtn = document.getElementById("hamburgerBtn");
const closeFilterBtn = document.getElementById("closeFilterBtn");
const filterPanel = document.getElementById("filterPanel");
const filterOverlay = document.getElementById("filterOverlay");
const filterCheckboxes = document.querySelectorAll(".filter-checkbox");

// Toggle mobile menu
function openMobileMenu() {
  filterPanel.classList.add("open");
  filterOverlay.classList.add("active");
}

function closeMobileMenu() {
  filterPanel.classList.remove("open");
  filterOverlay.classList.remove("active");
}

if (hamburgerBtn) hamburgerBtn.addEventListener("click", openMobileMenu);
if (closeFilterBtn) closeFilterBtn.addEventListener("click", closeMobileMenu);
if (filterOverlay) filterOverlay.addEventListener("click", closeMobileMenu);

filterCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", (e) => {
    // .trim() ensures "lots " becomes "lots"
    const categoryToToggle = e.target.value.trim();
    const isChecked = e.target.checked;

    // This selects any element with the matching category,
    // regardless of whether its class is lot-button or map-feature
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
