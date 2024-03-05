import { masterLogo } from "./logo/masterCardLogoParameters.js";
import { mirLogo } from "./logo/mirCardLogoParameters.js";
import { visaLogo } from "./logo/visaCardLogoParameters.js";

$(document).ready(function () {
  $(".numeric-input").on("keypress", function (event) {
    let inputValue = event.key;
    if (!/^[0-9]+$/.test(inputValue)) {
      event.preventDefault();
    }
  });
  $("#cardNumber").on("input", function (event) {
    let inputValue = $(this).val().replace(/\s/g, "");
    let formattedValue = "";
    if (inputValue.length > 16) {
      inputValue = inputValue.substring(0, 16);
    }
    for (let i = 0; i < inputValue.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedValue += " ";
      }
      formattedValue += inputValue[i];
    }

    if (inputValue[0] == 2) {
      $("#cardName").append(mirLogo);
    } else if (inputValue[0] == 4) {
      $("#cardName").append(visaLogo);
    } else if (inputValue[0] == 5) {
      $("#cardName").append(masterLogo);
    } else {
      $("#cardName").empty();
    }
    $(this).val(formattedValue);
  });
  $("#card-CVV-CVC").on("input", function () {
    let inputValue = $(this).val();
    let lastTwoDigits = inputValue.slice(-2);
    if (inputValue[0] > 1) {
      let newSecDig = "0" + inputValue[0] + "/";
      $(this).val(newSecDig);
    } else {
      if (inputValue.length == 3 && inputValue[2] !== "/") {
        inputValue = inputValue.slice(0, 2) + "/";
      } else if (Number(lastTwoDigits) > 31) {
        inputValue = inputValue.slice(0, -1);
      }
      inputValue = inputValue.slice(0, 5);
      $(this).val(inputValue);
    }
  });
  $("#card-expiration-date  ").on("input", function () {
    let inputValue = $(this).val();
    inputValue = inputValue.slice(0, 3);
    $(this).val(inputValue);
  });
});
