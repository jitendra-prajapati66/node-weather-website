"user strict";
console.log("This is client side scritpting");

const Get_Weather = document.querySelector("#search");
const weatherAdderess = document.querySelector(".address_input");
const content = document.querySelector(".main_content");
const message_1 = document.querySelector(".message-1");
const message_2 = document.querySelector(".message-2");
const main_content = document.querySelector(".main_content");
// console.log(Get_Weather);
const renderData = function (data) {
  if (data.error) {
    message_1.textContent = data.error;
  } else {
    message_1.textContent = data.location;
    message_2.textContent = data.forecast;
  }
};

Get_Weather.addEventListener("click", function (e) {
  e.preventDefault();
  message_1.classList.remove("text-danger");

  message_1.textContent = "";
  message_2.textContent = "";
  if (weatherAdderess.value) {
    message_1.textContent = "Loading...";
    message_2.textContent = "";
    fetch(`http://localhost:3000/weather?adderess=${weatherAdderess.value}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("There is problwm with addresstry another search");
        }
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.error) {
          throw new Error(data.error);
        } else {
          renderData(data);
        }
      })
      .catch((error) => {
        message_1.textContent = error;
      });
  } else {
    message_1.textContent = "Please Provide location for forecast!";
    message_1.classList.add("text-danger");
  }
});
