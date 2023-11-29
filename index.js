// To Add a new language:
// 1. Upload the cards to Media Library Folders on WP by naming the cards: card_'nr'_'xx'.png
// 2. Upload the cards thumbnails to Media Library Folders on WP by naming the thumbnails: card_'nr'_'xx'.png
// 3. add the short code in the following array
const languages = [
  "bg",
  "de",
  "en",
  "es",
  "fr",
  "hr",
  "hu",
  "id",
  "it",
  "jp",
  "kr",
  "ph",
  "pl",
  "pt",
  "ro",
  "rs",
  "sk",
  "sl",
  "th",
  "tr",
];

// 4. add the translations of 2 text msgs in the following array:
const txtLang = {
  en: ["Join me to find out more", "28 Jan @ 18:30 CET savesoil.cc/john-cessa"],
};

const url = document.location.origin.includes("localhost" || "127")
  ? "./img/"
  : `${document.location.origin}/wp-content/uploads/ecards-champions/imgs/`;
const urlThumbnails = document.location.origin.includes("localhost" || "127")
  ? "./thumbnails/"
  : `${document.location.origin}/wp-content/uploads/ecards-champions/thumbnails/`;

const ocation = "champion";
const txtWidthSentence = 300;
const txtWidthData = 230;
const export_multiplier = 2; /* needed when exporting the image to download */
const amountImages = 10;
const amountImagesLang = {};

const browserLanguage =
  navigator && navigator.language ? navigator.language.substr(0, 2) : "en";
let selectedLanguage = "en";
let selectorMobile;
let selectorDesktop;
let text;
let text2;

const _fontSize = 20;

const box = document.querySelector(".center_cp");
const _width = box.offsetWidth;

const middle_h_sentence = _width / 2 - txtWidthSentence / 2;
const middle_h = _width / 2 - txtWidthData / 2;
const middle_r = Math.floor(_width / 1.8 - txtWidthData / 2);
const middle_f = _width / 2 - _width / 4;
const right_h = Math.floor(_width * 0.72) - Math.floor(txtWidthData / 2);
const left_h = Math.floor(_width * 0.25) - Math.floor(txtWidthData / 2);
const left_border = Math.floor(_width * 0.18) - Math.floor(txtWidthData / 2);

// let txt1_top = [Math.floor(_width * 0.05), Math.floor(_width * 0.07), Math.floor(_width * 0.03), Math.floor(_width * 0.15)];
const txt2_top = [Math.floor(_width * 0.58), Math.floor(_width * 0.65)];

const txtPositions = {
  txt1: [
    {
      left: middle_h_sentence,
      top: txt2_top[0],
      width: txtWidthSentence,
      fill: "#3d2814",
    },
    {
      left: middle_h_sentence,
      top: txt2_top[0],
      width: txtWidthSentence,
      fill: "#3d2814",
    },
    {
      left: middle_h_sentence,
      top: txt2_top[0],
      width: txtWidthSentence,
      fill: "#3d2814",
    },
  ],
  txt2: [
    { left: middle_h, top: txt2_top[1], width: txtWidthData, fill: "#140d07" },
    { left: middle_h, top: txt2_top[1], width: txtWidthData, fill: "#140d07" },
    { left: middle_h, top: txt2_top[1], width: txtWidthData, fill: "#140d07" },
  ],
};

const txtOpt = {
  txt1: [
    {
      fill: "#ffffff",
      fontSize: _fontSize,
      fontWeight: 500,
      fontFamily: "Montserrat",
      textAlign: "center",
      lineHeight: 1,
    },
  ],
  txt2: [
    {
      fill: "#ffffff",
      fontSize: _fontSize,
      fontWeight: 700,
      fontFamily: "Montserrat",
      textAlign: "center",
      lineHeight: 1,
    },
  ],
};

var canvas = new fabric.Canvas("c");
canvas.setHeight(_width);
canvas.setWidth(_width);

canvas.on("selection:created", function () {
  document.querySelector("#controls").style.display = "block";
});
canvas.on("selection:cleared", function () {
  document.querySelector("#controls").style.display = "none";
});

const getAmountImages = () =>
  amountImagesLang[selectedLanguage] || amountImages;

const getTextTranslated = (number) =>
  txtLang[selectedLanguage]
    ? txtLang[selectedLanguage][number]
    : txtLang.en[number];

const applyLanguage = (lang) => {
  initializeCards();
  for (let i = 1; i <= getAmountImages(); i++) {
    const images = document.getElementsByClassName(`image-thumb-${i}`);
    images[0].src = `${urlThumbnails}card_${ocation}_${i}.png`;
    images[1].src = `${urlThumbnails}card_${ocation}_${i}.png`;
  }
  const inputFieldMobile = document.getElementById(`inputcard_1_mobile`);
  inputFieldMobile.checked = true;
  changeBg(`card_${ocation}_1.png`, 0);
  changeTxt();
};

const changeTxt = () => {
  // text.text  = getTextTranslated(0)
  text2.text = getTextTranslated(1);
};

const onLanguageChange = (isMobile) => {
  selectedLanguage = isMobile ? selectorMobile.value : selectorDesktop.value;
  applyLanguage(selectedLanguage);
};

const initializeSelectors = () => {
  const selectors = [selectorDesktop, selectorMobile];
  languages.sort().forEach((lang) => {
    selectors.forEach((selector) => {
      const newOption = document.createElement("option");
      newOption.value = lang;
      newOption.text = lang.toUpperCase();
      selector.add(newOption);
    });
  });
};

const initializeCards = () => {
  const cardContainers = ["mobile", "desktop"];
  cardContainers.forEach((cardContainer) => {
    const cardContainerObj = document.getElementById(cardContainer);
    cardContainerObj.innerHTML = "";
    for (let i = 1; i <= getAmountImages(); i++) {
      const newDiv = document.createElement("div");
      const newInput = document.createElement("input");
      newInput.setAttribute("class", "ecardinput");
      newInput.setAttribute("type", "radio");
      newInput.setAttribute("id", `inputcard_${i}_${cardContainer}`);
      newInput.setAttribute("name", `ecard_${cardContainer}`);
      newInput.setAttribute("value", i);
      newDiv.appendChild(newInput);
      const newLabel = document.createElement("label");
      newLabel.setAttribute("for", newInput.id);
      const newImage = document.createElement("img");
      newImage.setAttribute("class", `image-thumb image-thumb-${i}`);
      newImage.onclick = () => {
        changeBg(`card_${ocation}_${i}.png`, i - 1);
      };
      newLabel.appendChild(newImage);
      newDiv.appendChild(newLabel);

      cardContainerObj.appendChild(newDiv);
    }
  });
};

const initializeLanguage = () => {
  selectedLanguage = languages.includes(browserLanguage)
    ? browserLanguage
    : "en";
  selectorMobile = document.getElementById("language-selector-mobile");
  selectorDesktop = document.getElementById("language-selector-desktop");
  initializeSelectors();

  selectorMobile.value = selectedLanguage;
  selectorDesktop.value = selectedLanguage;
  initializeTexts();
  applyLanguage(selectedLanguage);
};

const initializeTexts = () => {
  text = new fabric.Textbox(getTextTranslated(0), txtOpt.txt1[0]);
  text2 = new fabric.Textbox(getTextTranslated(1), txtOpt.txt2[0]);
  canvas.add(text);
  canvas.add(text2);

  updateTxtPositions(1);
  canvas.requestRenderAll();
};

function changeBg(str, nr) {
  fabric.Image.fromURL(
    `${url}${str}`,
    function (img, isError) {
      img.scaleToWidth(_width);
      img.set({ originX: "left", originY: "top" });
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));

      updateTxtPositions(nr);
      canvas.requestRenderAll();
    },
    { crossOrigin: "Anonymous" }
  );
}
function updateTxtPositions(nr) {
  text.set(txtPositions["txt1"][nr]);
  text2.set(txtPositions["txt2"][nr]);
}

// Apply selected font on change
document.getElementById("font-family").onchange = function () {
  canvas.getActiveObject().set("fontFamily", this.value);
  canvas.requestRenderAll();
};

document.getElementById("color").oninput = function () {
  canvas.getActiveObject().set("fill", this.value);
  canvas.requestRenderAll();
};

const handleImageUpload = (input) => {
  if (!input.files || !input.files[0]) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    fabric.Image.fromURL(
      e.target.result,
      function (img, isError) {
        img.scale(0.2).set({
          top: 282,
          left: 16,
          clipPath: new fabric.Circle({
            radius: 250,
            originX: "center",
            originY: "center",
          }),
        });
        canvas.add(img);
        canvas.setActiveObject(img);
      },
      { crossOrigin: "Anonymous" }
    );
  };
  reader.readAsDataURL(input.files[0]);
  input.value = "";
};

document.addEventListener("keydown", (event) => {
  if (event.code === "Backspace") {
    if (canvas.getActiveObject() && !canvas.getActiveObject().text) {
      canvas.remove(canvas.getActiveObject());
    }
  }
});
function downloadFabric() {
  console.log("downlaod");
  var dataURL = canvas.toDataURL(
    {
      format: "png",
      left: 0,
      top: 0,
      width: canvas.width,
      height: canvas.height,
      quality: 1,
      multiplier: export_multiplier,
    },
    { crossOrigin: "Anonymous" }
  );
  const link = document.createElement("a");
  link.download = "https://consciousplanet.ishayoga.eu/conscious-holidays.png";
  link.href = dataURL;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

initializeLanguage();
