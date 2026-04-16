const PICTURES = [
  "./img/tenerife01.jpg",
  "./img/tenerife02.jpg",
  "./img/tenerife03.jpg",
  "./img/tenerife04.jpg",
  "./img/tenerife05.jpg",
  "./img/tenerife06.jpg",
  "./img/tenerife07.jpg",
  "./img/tenerife08.jpg",
  "./img/tenerife09.jpg",
  "./img/tenerife10.jpg",
  "./img/tenerife11.jpg",
  "./img/tenerife12.jpg"
];

const DESCRIPTIONS = [
  "Wohnungen mit Meerblick",
  "Surfbretter von Tenerife",
  "Finger Gottes auf dem Teide",
  "Über den Wolken",
  "Dorf mit Blick auf Teide",
  "Strandbucht am Hotel",
  "Strasse zum Teide",
  "Teide im Winter",
  "Teide ganz Weiß",
  "Strand in Santa Cruz",
  "Sonnenuntergang am Strand",
  "Mystischer Sonnenuntergang"
];

const YEAR_PREFIX = "© Developer Akademie ";

let currentIndex = 0;
let dialogRef = null;

document.addEventListener("DOMContentLoaded", initApp);



/**
 * Initializes the application.
 */
function initApp() {
  setFooterYear();
  renderGallery();
  initDialog();
  initKeyboardControls();
}



/**
 * Sets the current year in the footer.
 */
function setFooterYear() {
  const year = new Date().getFullYear();
  document.getElementById("year").textContent = YEAR_PREFIX + year;
}



/**
 * Renders the complete image gallery.
 */
function renderGallery() {
  const contentRef = document.getElementById("content");
  contentRef.innerHTML = buildGalleryHtml();
}



/**
 * Builds the HTML for the gallery.
 * @returns {string} The generated HTML string
 */
function buildGalleryHtml() {
  let html = "";

  for (let index = 0; index < PICTURES.length; index++) {
    html += createGalleryItem(index);
  }

  return html;
}



/**
 * Creates a single gallery item.
 * @param {number} index - Index of the image
 * @returns {string} HTML string for one item
 */
function createGalleryItem(index) {
  return `
    <div class="pictures_style">
      <button 
        aria-haspopup="dialog"
        aria-label="Bild vergrößern: ${DESCRIPTIONS[index]}"
        onclick="openDialog(${index})"
      >
        <img 
          src="${PICTURES[index]}" 
          class="thumbnail" 
          alt="${DESCRIPTIONS[index]}"
        >
      </button>
      <p>${DESCRIPTIONS[index]}</p>
    </div>
  `;
}



/**
 * Initializes the dialog behavior.
 */
function initDialog() {
  dialogRef = document.getElementById("bildDialog");
  dialogRef.addEventListener("click", handleDialogClick);
}



/**
 * Handles clicks on the dialog (close on outside click).
 * @param {Event} event - Click event
 */
function handleDialogClick(event) {
  if (event.target === dialogRef) {
    closeDialog();
  }
}



/**
 * Opens the dialog with the selected image.
 * @param {number} index - Index of the image
 */
function openDialog(index) {
  currentIndex = index;
  updateDialogContent();
  dialogRef.showModal();
  dialogRef.classList.add("opened");
}


/**
 * Closes the dialog with animation.
 */
function closeDialog() {
  dialogRef.classList.remove("opened");

  setTimeout(() => {
    dialogRef.close();
  }, 400); // muss zur CSS duration passen!
}



/**
 * Updates image and text inside the dialog.
 */
function updateDialogContent() {
  const imageRef = document.getElementById("grossesBild");
  const textRef = document.getElementById("bildText");

  imageRef.src = PICTURES[currentIndex];
  imageRef.alt = DESCRIPTIONS[currentIndex];
  textRef.innerText = DESCRIPTIONS[currentIndex];
}



/**
 * Shows the next image.
 */
function nextImage() {
  currentIndex = getNextIndex();
  updateDialogContent();
}



/**
 * Shows the previous image.
 */
function prevImage() {
  currentIndex = getPrevIndex();
  updateDialogContent();
}



/**
 * Calculates the next index.
 * @returns {number} Next index
 */
function getNextIndex() {
  return (currentIndex + 1) % PICTURES.length;
}



/**
 * Calculates the previous index.
 * @returns {number} Previous index
 */
function getPrevIndex() {
  return (currentIndex - 1 + PICTURES.length) % PICTURES.length;
}



/**
 * Initializes keyboard controls.
 */
function initKeyboardControls() {
  document.addEventListener("keydown", handleKeyInput);
}



/**
 * Handles keyboard input for navigation.
 * @param {KeyboardEvent} event - Key event
 */
function handleKeyInput(event) {
  if (!dialogRef || !dialogRef.open) return;

  if (event.key === "Escape") closeDialog();
  if (event.key === "ArrowRight") nextImage();
  if (event.key === "ArrowLeft") prevImage();
}

/**
 * Scrolls smoothly to the top of the page.
 */
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

/**
 * Prevents dialog from closing when clicking inside.
 */
function stopClose(event) {
  event.stopPropagation();
}