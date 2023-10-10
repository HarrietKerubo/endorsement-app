document.addEventListener("DOMContentLoaded", function () {
  const endorsementInputEl = document.querySelector(".endorsement-input");
  const publishBtn = document.querySelector(".btn");
  const listEl = document.querySelector("#endorsements");
  const senderEl = document.querySelector("#sender");
  const recipientEl = document.querySelector("#recipient");

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

    endorsementInputEl.value = "";
    senderEl.value = "";
    recipientEl.value = "";
  });
});
