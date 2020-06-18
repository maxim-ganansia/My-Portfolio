const Portfolio = {

  init: function () {
    Portfolio.getGithubData();
    Portfolio.switchMapCity();
    Portfolio.validateForm();
    Portfolio.buildFooterText();
    Portfolio.getClickAnimation();
  },

  getGithubData: function () {
    let bodyIndexHtml = document.querySelector("body.index");
    if (bodyIndexHtml != null) {
      let GITHUB_URL = "https://api.github.com/users/maxim-ganansia";

      fetch(GITHUB_URL)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          let profileImage = document.getElementById("profile-image");
          profileImage.src = data.avatar_url;
          let profileName = document.getElementById("my-name");
          profileName.innerText = data.name;
        });
    }
  },

  switchMapCity: function () {
    let indexMap = 0;
    let map = document.getElementById("firstMap");
    let cities = ["https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d43417.92834613945!2d5.696746876334693!3d45.181122740836855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478af48b07126f55%3A0xa67542b48e4090a7!2sGrenoble!5e0!3m2!1sfr!2sil!4v1589117632762!5m2!1sfr!2sil", "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15366.246303589025!2d34.73901560280396!3d32.01926044372355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1502b317a18a6b5d%3A0xf89db2ee9c7f3611!2sJabotinsky%2C%20Bat%20Yam!5e0!3m2!1sfr!2sil!4v1589186592305!5m2!1sfr!2sil", "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d18955.08185795958!2d34.758025113604866!3d32.05126361396201!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d4ca1b1724d47%3A0xf0a223ef25bbab6a!2sHaSadna%2C%20Tel%20Aviv-Yafo!5e0!3m2!1sfr!2sil!4v1589186661594!5m2!1sfr!2sil"]
    let previousButton = document.querySelector(".prev");
    let nextButton = document.querySelector(".next");

    if (previousButton != null) {
      map.setAttribute("src", cities[indexMap]);
      previousButton.addEventListener("click", function () {
        indexMap--;
        map.setAttribute("src", cities[indexMap])
        nextButton.disabled = false;

        if (indexMap === 0) {
          previousButton.disabled = true;
        }
      })

      nextButton.addEventListener("click", function () {
        indexMap++;
        map.setAttribute("src", cities[indexMap])
        previousButton.disabled = false;

        if (cities.length === indexMap + 1) {
          nextButton.disabled = true;
        }
      })
    }
  },

  validateForm: function () {
    let submitButton = document.getElementById("submit-btn");
    let fieldsForm = document.querySelectorAll(".user-review input.form-control");

    if (fieldsForm.length > 0) {
      for (let i = 0; i < fieldsForm.length; i++) {
        fieldsForm[i].addEventListener("keyup", function () {
          let isChecked = true;
          let required_fields = ["fname", "email", "comment"];

          for (let x = 0; x < required_fields.length; x++) {
            let inputValue = document.getElementById(required_fields[x]).value;
            if ((inputValue.length == 0) || (inputValue == "") || (inputValue == "NULL")) {
              isChecked = false
            }
          }
          if (isChecked) {
            submitButton.disabled = false
            return true;
          }
          else {
            submitButton.disabled = true;
            return false;
          }
        })
      }
      Portfolio.printFormInputs(submitButton);
    }
  },

  printFormInputs: function (submitButton) {
    submitButton.addEventListener("click", function () {
      alert("Thanks I received your information");
      event.preventDefault();
      let inputRadioSelected = document.querySelector("input[type=radio]:checked")
      console.log(`Your first name is : ${document.getElementById("fname").value}, your last name is : ${document.getElementById("lname").value}, your email is: ${document.getElementById("email").value}, you said: ${document.getElementById("comment").value} and you find my portfollio: ${inputRadioSelected.value}`);
    })
  },

  buildFooterText: function () {
    let footerArray = ["HTML", "CSS", "JAVASCRIPT"];
    let footerText = document.getElementById("footerText");
    let lastLanguage = footerArray[footerArray.length - 1];

    for (let index in footerArray)
      if (footerArray[index] == lastLanguage) {
        footerText.innerHTML += "and " + lastLanguage + "."
      } else {
        footerText.innerHTML += footerArray[index] + ", "
      }
  },


  getClickAnimation: function () {
    let myCard = document.getElementById("card-index");
    let bodyIndexHtml = document.querySelector("body.index");
    if (bodyIndexHtml != null) {
      myCard.addEventListener("click", function () {
        if (myCard.classList.contains('animate_class_name')) {
          myCard.classList.remove('animate_class_name')
        }
        else {
          myCard.classList.add('animate_class_name');
        }
      })
    }
  },
}

document.addEventListener("DOMContentLoaded", function () {
  Portfolio.init();
});


