const appSettings = {
  databaseURL:
    "https://endorsement-app-f571f-default-rtdb.europe-west1.firebasedatabase.app/",
};

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

const app = initializeApp(appSettings);
const database = getDatabase(app);

import {
  getDatabase,
  ref,
  push,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

document.addEventListener("DOMContentLoaded", function () {
  const endorsementInputEl = document.querySelector(".endorsement-input");
  const publishBtn = document.querySelector(".btn");
  const listEl = document.querySelector("#endorsements");
  const senderEl = document.querySelector("#sender");
  const recipientEl = document.querySelector("#recipient");
  const endorsementsInDB = ref(database, "endorsements");

  endorsementInputEl.value = "";
  endorsementInputEl.addEventListener("input", function () {
    if (endorsementInputEl.value.trim() === "") {
      publishBtn.disabled = true;
    } else {
      publishBtn.disabled = false;
    }
  });

  publishBtn.addEventListener("click", function () {
    listEl.innerHTML += `<li> 
    <b> To: ${recipientEl.value} </b><br />
    </br>
    ${endorsementInputEl.value} <br />
    </br>
    <b> From: ${senderEl.value} </b> 

    </li>`;

    const endorsementMessage = {
      From: senderEl.value,
      To: recipientEl.value,
      Message: endorsementInputEl.value,
    };

    push(endorsementsInDB, endorsementMessage);
    endorsementInputEl.value = "";
    senderEl.value = "";
    recipientEl.value = "";
  });
});
