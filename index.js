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
  onValue,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

document.addEventListener("DOMContentLoaded", function () {
  const endorsementInputEl = document.querySelector(".endorsement-input");
  const publishBtn = document.querySelector(".btn");
  const listEl = document.querySelector("#endorsements");
  const senderEl = document.querySelector("#sender");
  const recipientEl = document.querySelector("#recipient");
  const endorsementsInDB = ref(database, "endorsements");

  // Fetch items from DB

  onValue(endorsementsInDB, function (snapshot) {
    let endorsementsArray = Object.values(snapshot.val());
    let listItem = "";
    for (let i = 0; i < endorsementsArray.length; i++) {
      let singleMsgArray = Object.values(endorsementsArray[i]);
      let sender = singleMsgArray[0];
      let theMessage = singleMsgArray[1];
      let recipient = singleMsgArray[2];
      listItem += `<li> 
      <b> To: ${recipient} </b><br />
      </br>
      ${theMessage} <br />
      </br>
      <b> From: ${sender} </b> 
  
      </li>`;
    }
    listEl.innerHTML = listItem;
  });

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
