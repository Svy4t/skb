document.addEventListener("DOMContentLoaded", (event) => {
  // axios.post('http://localhost:3000/api/clients', {
  //   id: 101,
  //   fio: 'Ануфриев Святослав Дмитриевич',
  //   createAt: new Date(),
  //   updateAt: new Date(),
  //   contacts: {
  //     vk: 'vk.com/1231232131',
  //     tel: '+79999999999',
  //     mail: 'aaa@mail.ru',
  //     Twitter: '@den__77'
  //   }
  // })
  // .then((success) => {
  //   console.log(success);
  // })
  // .catch((error) => {
  //   console.log(error);
  // })

  // axios.post('http://localhost:3000/api/clients', {
  //   id: 102,
  //   fio: 'Ульянова Виктория Александровна',
  //   createAt: new Date(),
  //   updateAt: new Date(),
  //   contacts: {
  //     vk: 'vk.com/1231',
  //     facebook: '@yaya',
  //     tel: '+79999999988',
  //     mail: 'bbb@mail.ru',
  //   }
  // })
  // .then((success) => {
  //   console.log(success);
  // })
  // .catch((error) => {
  //   console.log(error);
  // })

  function addClient(client) {
    axios
      .post("http://localhost:3000/api/clients", {
        id: client.id,
        fio: client.fio,
        createAt: client.createAt,
        updateAt: client.updateAt,
        contacts: client.contacts,
      })
      .then((success) => {
        console.log(success);
        axios
          .get("http://localhost:3000/api/clients")
          .then((perform) => {
            listContacts = perform.data;
            outputContacts(listContacts);
          })
          .catch((error) => {
            console.log(error);
          });
        alignmentOfTheTooltip();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function changeClient(client, id) {
    axios
      .patch(`http://localhost:3000/api/clients/${id}`, {
        fio: client.fio,
        contacts: client.contacts,
        createAt: client.createAt,
        updateAt: client.updateAt,
      })
      .then((success) => {
        console.log(success);
        axios
          .get("http://localhost:3000/api/clients")
          .then((perform) => {
            listContacts = perform.data;
            outputContacts(listContacts);
          })
          .catch((error) => {
            console.log(error);
          });
        alignmentOfTheTooltip();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function deleteClient(client) {
    console.log(client.id);
    axios
      .delete(`http://localhost:3000/api/clients/${client.id}`)
      .then((success) => {
        console.log(success);
        axios
          .get("http://localhost:3000/api/clients")
          .then((perform) => {
            listContacts = perform.data;
            outputContacts(listContacts);
          })
          .catch((error) => {
            console.log(error);
          });
        document.querySelector(".delete-client").classList.remove("open-form");
        alignmentOfTheTooltip();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function outputContacts(contacts) {
    table.innerHTML = "";
    contacts.forEach((contact) => {
      let tableRow = document.createElement("tr");
      tableRow.classList.add("table__row");
      for (let i = 0; i < 6; i++) {
        let dataTable = document.createElement("td");
        let dataTableDay = document.createElement("span");
        let dataTableTime = document.createElement("span");

        dataTable.classList.add("table__data");
        dataTableDay.classList.add("table-data-create__day");
        dataTableTime.classList.add("table-data-create__time");
        switch (i) {
          case 0:
            dataTable.classList.add("table__data-id");
            dataTable.textContent = `${contact.id}`;
            break;
          case 1:
            dataTable.classList.add("table__data-fio");
            dataTable.textContent = `${contact.fio}`;
            break;
          case 2:
            contact.createAt = new Date(contact.createAt);
            dataTable.classList.add("table__data-create");
            let divCreateAt = document.createElement("div");
            divCreateAt.classList.add("table-data-create__wrapper");

            let createAtDay = contact.createAt.getDate();
            let createAtMonth = contact.createAt.getMonth() + 1;
            let createAtHours = contact.createAt.getHours();
            let createAtMinuts = contact.createAt.getMinutes();
            if (createAtDay < 10) {
              createAtDay = `0${createAtDay}`;
            }
            if (createAtMonth < 10) {
              createAtMonth = `0${createAtMonth}`;
            }
            if (createAtHours < 10) {
              createAtHours = `0${createAtHours}`;
            }
            if (createAtMinuts < 10) {
              createAtMinuts = `0${createAtMinuts}`;
            }
            dataTableDay.textContent = `${createAtDay}.${createAtMonth}.${contact.createAt.getFullYear()}`;
            dataTableTime.textContent = `${createAtHours}:${createAtMinuts}`;
            divCreateAt.append(dataTableDay, dataTableTime);
            dataTable.append(divCreateAt);
            break;
          case 3:
            contact.updateAt = new Date(contact.updateAt);
            dataTable.classList.add("table__data-update");
            let divUpdateAt = document.createElement("div");
            divUpdateAt.classList.add("table-data-update__wrapper");

            let updateAtDay = contact.updateAt.getDate();
            let updateAtMonth = contact.updateAt.getMonth() + 1;
            let updateAtHours = contact.updateAt.getHours();
            let updateAtMinuts = contact.updateAt.getMinutes();
            if (updateAtDay < 10) {
              updateAtDay = `0${updateAtDay}`;
            }
            if (updateAtMonth < 10) {
              updateAtMonth = `0${updateAtMonth}`;
            }
            if (updateAtHours < 10) {
              updateAtHours = `0${updateAtHours}`;
            }
            if (updateAtMinuts < 10) {
              updateAtMinuts = `0${updateAtMinuts}`;
            }
            dataTableDay.textContent = `${updateAtDay}.${updateAtMonth}.${contact.updateAt.getFullYear()}`;
            dataTableTime.textContent = `${updateAtHours}:${updateAtMinuts}`;
            divUpdateAt.append(dataTableDay, dataTableTime);
            dataTable.append(divUpdateAt);
            break;
          case 4:
            dataTable.classList.add("table__data-contacts");
            let div = document.createElement("div");
            div.classList.add("table__contacts");
            let detailContacts = contact.contacts;
            let keysDetailContacts = Object.keys(contact.contacts);
            let arrayContacts = Object.entries(detailContacts);
            for (let detail = 0; detail < keysDetailContacts.length; detail++) {
              let socialNetwork = document.createElement("div");
              let contactWrapper = document.createElement("div");
              let tooltip = document.createElement("div");
              let tooltipText = document.createElement("span");
              let tooltipTextValue = document.createElement("span");

              socialNetwork.classList.add("social-network");
              contactWrapper.classList.add("contact__wrapper");
              tooltip.classList.add("tooltip__social-network");
              tooltipText.classList.add("tooltip__text");
              tooltipTextValue.classList.add("tooltip__text-value");

              switch (keysDetailContacts[detail].replace(/[^a-z]/g, "")) {
                case "vk":
                  if (detailContacts.vk !== null) {
                    socialNetwork.classList.add("social-network__vk");
                    contactWrapper.setAttribute("data-contact", "vk");

                    socialNetwork.innerHTML = `<svg class="vk" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 0C3.58187 0 0 3.58171 0 8C0 12.4183 3.58187 16 8 16C12.4181 16 16 12.4183 16 8C16 3.58171 12.4181 0 8 0ZM12.058 8.86523C12.4309 9.22942 12.8254 9.57217 13.1601 9.97402C13.3084 10.1518 13.4482 10.3356 13.5546 10.5423C13.7065 10.8371 13.5693 11.1604 13.3055 11.1779L11.6665 11.1776C11.2432 11.2126 10.9064 11.0419 10.6224 10.7525C10.3957 10.5219 10.1853 10.2755 9.96698 10.037C9.87777 9.93915 9.78382 9.847 9.67186 9.77449C9.44843 9.62914 9.2543 9.67366 9.1263 9.90707C8.99585 10.1446 8.96606 10.4078 8.95362 10.6721C8.93577 11.0586 8.81923 11.1596 8.43147 11.1777C7.60291 11.2165 6.81674 11.0908 6.08606 10.6731C5.44147 10.3047 4.94257 9.78463 4.50783 9.19587C3.66126 8.04812 3.01291 6.78842 2.43036 5.49254C2.29925 5.2007 2.39517 5.04454 2.71714 5.03849C3.25205 5.02817 3.78697 5.02948 4.32188 5.03799C4.53958 5.04143 4.68362 5.166 4.76726 5.37142C5.05633 6.08262 5.4107 6.75928 5.85477 7.38684C5.97311 7.55396 6.09391 7.72059 6.26594 7.83861C6.45582 7.9689 6.60051 7.92585 6.69005 7.71388C6.74734 7.57917 6.77205 7.43513 6.78449 7.29076C6.82705 6.79628 6.83212 6.30195 6.75847 5.80943C6.71263 5.50122 6.53929 5.30218 6.23206 5.24391C6.07558 5.21428 6.0985 5.15634 6.17461 5.06697C6.3067 4.91245 6.43045 4.81686 6.67777 4.81686L8.52951 4.81653C8.82136 4.87382 8.88683 5.00477 8.92645 5.29874L8.92808 7.35656C8.92464 7.47032 8.98521 7.80751 9.18948 7.88198C9.35317 7.936 9.4612 7.80473 9.55908 7.70112C10.0032 7.22987 10.3195 6.67368 10.6029 6.09801C10.7279 5.84413 10.8358 5.58142 10.9406 5.31822C11.0185 5.1236 11.1396 5.02785 11.3593 5.03112L13.1424 5.03325C13.195 5.03325 13.2483 5.03374 13.3004 5.04274C13.6009 5.09414 13.6832 5.22345 13.5903 5.5166C13.4439 5.97721 13.1596 6.36088 12.8817 6.74553C12.5838 7.15736 12.2661 7.55478 11.9711 7.96841C11.7001 8.34652 11.7215 8.53688 12.058 8.86523Z" fill="#9873FF"/></svg>`;
                    tooltipTextValue.textContent = `${arrayContacts[detail][1]}`;
                  }
                  break;
                case "facebook":
                  if (detailContacts.facebook !== null) {
                    socialNetwork.classList.add("social-network__facebook");
                    contactWrapper.setAttribute("data-contact", "facebook");

                    socialNetwork.innerHTML = `<svg class="facebook" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.99999 0C3.6 0 0 3.60643 0 8.04819C0 12.0643 2.928 15.3976 6.75199 16V10.3775H4.71999V8.04819H6.75199V6.27309C6.75199 4.25703 7.94399 3.14859 9.77599 3.14859C10.648 3.14859 11.56 3.30121 11.56 3.30121V5.28514H10.552C9.55999 5.28514 9.24799 5.90362 9.24799 6.53815V8.04819H11.472L11.112 10.3775H9.24799V16C11.1331 15.7011 12.8497 14.7354 14.0879 13.2772C15.3261 11.819 16.0043 9.96437 16 8.04819C16 3.60643 12.4 0 7.99999 0Z" fill="#9873FF"/></svg>`;
                    tooltipTextValue.textContent = `${arrayContacts[detail][1]}`;
                  }
                  break;
                case "tel":
                  if (detailContacts.tel !== null) {
                    socialNetwork.classList.add("social-network__tel");
                    contactWrapper.setAttribute("data-contact", "tel");

                    socialNetwork.innerHTML = `<svg class="tel" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#9873FF"/><path d="M11.56 9.50222C11.0133 9.50222 10.4844 9.41333 9.99111 9.25333C9.83556 9.2 9.66222 9.24 9.54222 9.36L8.84444 10.2356C7.58667 9.63556 6.40889 8.50222 5.78222 7.2L6.64889 6.46222C6.76889 6.33778 6.80444 6.16444 6.75556 6.00889C6.59111 5.51556 6.50667 4.98667 6.50667 4.44C6.50667 4.2 6.30667 4 6.06667 4H4.52889C4.28889 4 4 4.10667 4 4.44C4 8.56889 7.43556 12 11.56 12C11.8756 12 12 11.72 12 11.4756V9.94222C12 9.70222 11.8 9.50222 11.56 9.50222Z" fill="white"/></svg>`;
                    tooltipTextValue.textContent = `${arrayContacts[detail][1]}`;
                  }
                  break;
                case "mail":
                  if (detailContacts.mail !== null) {
                    socialNetwork.classList.add("social-network__mail");
                    contactWrapper.setAttribute("data-contact", "mail");

                    socialNetwork.innerHTML = `<svg class="mail" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#9873FF"/><path d="M11.2 5H4.8C4.36 5 4 5.3375 4 5.75V10.25C4 10.6625 4.36 11 4.8 11H11.2C11.64 11 12 10.6625 12 10.25V5.75C12 5.3375 11.64 5 11.2 5ZM11.04 6.59375L8.424 8.1275C8.164 8.28125 7.836 8.28125 7.576 8.1275L4.96 6.59375C4.86 6.53375 4.8 6.4325 4.8 6.32375C4.8 6.0725 5.092 5.9225 5.32 6.05375L8 7.625L10.68 6.05375C10.908 5.9225 11.2 6.0725 11.2 6.32375C11.2 6.4325 11.14 6.53375 11.04 6.59375Z" fill="white"/></svg>`;
                    tooltipTextValue.textContent = `${arrayContacts[detail][1]}`;
                  }
                  break;
                default:
                  if (detailContacts.getByKeyIndex(detail) !== null) {
                    if (keysDetailContacts[detail] === "Мой мир")
                      keysDetailContacts[detail] = "myWorld";
                    if (keysDetailContacts[detail] === "Одноклассники")
                      keysDetailContacts[detail] = "classmates";
                    socialNetwork.classList.add(
                      `social-network__${keysDetailContacts[detail]}`
                    );
                    contactWrapper.setAttribute("data-contact", `other`);

                    socialNetwork.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#9873FF"/><path d="M8 3C5.24 3 3 5.24 3 8C3 10.76 5.24 13 8 13C10.76 13 13 10.76 13 8C13 5.24 10.76 3 8 3ZM8 4.5C8.83 4.5 9.5 5.17 9.5 6C9.5 6.83 8.83 7.5 8 7.5C7.17 7.5 6.5 6.83 6.5 6C6.5 5.17 7.17 4.5 8 4.5ZM8 11.6C6.75 11.6 5.645 10.96 5 9.99C5.015 8.995 7 8.45 8 8.45C8.995 8.45 10.985 8.995 11 9.99C10.355 10.96 9.25 11.6 8 11.6Z" fill="white"/></svg>`;
                    if (keysDetailContacts[detail] === "myWorld")
                      keysDetailContacts[detail] = "Мой мир";
                    if (keysDetailContacts[detail] === "classmates")
                      keysDetailContacts[detail] = "Одноклассники";
                    // console.log(arrayContacts[detail][1]);
                    arrayContacts[detail] = arrayContacts[detail][1].split(":");
                    tooltipText.textContent = `${arrayContacts[detail][0]}: `;
                    tooltipTextValue.textContent = `${arrayContacts[detail][1]}`;
                  }
                  break;
              }
              if (contactWrapper.hasAttribute("data-contact")) {
                if (tooltipText) tooltip.append(tooltipText, tooltipTextValue);
                else tooltip.append(tooltipTextValue);
                contactWrapper.append(socialNetwork, tooltip);
                div.append(contactWrapper);
                dataTable.append(div);
              }
            }
            // dataTable.textContent = `${contact.id}`;
            break;
          case 5:
            dataTable.classList.add("table__data-btns");
            dataTable.append(actionsButtonsCreation(contact.id));
            break;
        }
        tableRow.append(dataTable);
      }
      table.append(tableRow);
    });
    alignmentOfTheTooltip();
    let tableDataContacts = document.querySelectorAll(".table__data-contacts");
    // console.log(tableDataContacts);
    for (let i = 0; i < tableDataContacts.length; i++) {
      let paramTableDataContacts = tableDataContacts[i].getBoundingClientRect();
      if (paramTableDataContacts.height > 63) {
        tableDataContacts[i].classList.add("update-padding");
      }
    }
  }

  function deleteAndCreateError() {
    let error = document.querySelector(".error");
    if (error) {
      error.remove();
    }

    let warning = document.createElement("p");
    warning.classList.add("error");

    return warning;
  }

  function validateInput(input, field, form) {
    let error = deleteAndCreateError();

    if (input === "") {
      error.textContent = `Ошибка! Поле ${field} пустое`;
      if (form === "add")
        document.querySelector(".form__contacts-btn").before(error);
      if (form === "change")
        document.querySelector(".form-change__btns").before(error);
      return true;
    }
    if (input.length < 3) {
      error.textContent = `Ошибка! В поле ${field} меньше 3 символов`;
      if (form === "add")
        document.querySelector(".form__contacts-btn").before(error);
      if (form === "change")
        document.querySelector(".form-change__btns").before(error);
      return true;
    }
    let regexNumber = /^[A-Za-zА-Яа-яЁё]+$/;
    if (!regexNumber.test(input)) {
      error.textContent = `Ошибка! Поле ${field} некорректно`;
      if (form === "add")
        document.querySelector(".form__contacts-btn").before(error);
      if (form === "change")
        document.querySelector(".form-change__btns").before(error);
      return true;
    }
  }

  function validateInputContacts(contact, nameClass) {
    let error = deleteAndCreateError();

    let nameContact =
      contact.childNodes[0].childNodes[0].childNodes[1].childNodes[0].getAttribute(
        "data-value"
      );
    let valueContant = contact.childNodes[1].value;

    // console.log(nameContact, valueContant);
    let textForError = null;
    let otherContact = [];
    switch (nameContact) {
      case "mail":
        textForError = "с почтой";
        break;
      case "vk":
        textForError = "с соц.сетью Вконтакте";
        break;
      case "facebook":
        textForError = "с соц.сетью Facebook";
        break;
      case "tel":
        textForError = "с телефоном";
        break;
      case "other":
        textForError = "с другой соц. сетью";
        break;
    }

    if (valueContant === "") {
      error.textContent = `Ошибка! Поле ${textForError} пустое`;
      document.querySelector(nameClass).after(error);
      return true;
    }

    // check mail
    if (
      nameContact === "mail" &&
      (!valueContant.includes("@") || !valueContant.includes("."))
    ) {
      error.textContent = `Ошибка! Поле ${textForError} некорректно`;
      document.querySelector(nameClass).after(error);
      return true;
    }

    // check tel
    let regex =
      /^(\+7)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    let regexSecond = /[a-zа-яё]/i;
    if (
      nameContact === "tel" &&
      (valueContant.length !== 12 ||
        !regex.test(valueContant) ||
        regexSecond.test(valueContant))
    ) {
      error.textContent = `Ошибка! Поле ${textForError} некорректно и должно начинатся с +7`;
      document.querySelector(nameClass).after(error);
      return true;
    }

    // check vk
    if (nameContact === "vk" && !valueContant.includes("vk.com/")) {
      error.textContent = `Ошибка! Вставьте полную ссылку в поле ${textForError}`;
      document.querySelector(nameClass).after(error);
      return true;
    }

    //check other social network
    if (nameContact === "other") {
      if (!valueContant.includes(":")) {
        error.textContent = `Ошибка! Поле с другой соц. сетью должно начинаться с Заглавной буквы и быть формата: <Название соц.сети>:<контактные данные>. Например: \"Twitter:twitter.com/nickname`;
        document.querySelector(nameClass).after(error);
        return true;
      }
      otherContact = valueContant.split(":");
      nameContact = otherContact[0];
      valueContant = otherContact[1];
      console.log(nameContact, valueContant);
      if (
        nameContact !== "Twitter" &&
        nameContact !== "Одноклассники" &&
        nameContact !== "Мой мир" &&
        nameContact !== "Instagram" &&
        nameContact !== "Pinterest"
      ) {
        error.textContent = `Ошибка! Соц. сеть ${nameContact} написана не корректно, соц. сеть должна быть написана с Заглавной буквы или выберите другую соц.сеть например: Twitter, Одноклассники, Мой мир, Instagram, Pinterest`;
        document.querySelector(nameClass).after(error);
        return true;
      }
    }
  }

  function searchClients(input) {
    let list = listContacts.filter((contact) => contact.fio.includes(input));
    outputContacts(list);
  }

  function alignmentOfTheTooltip() {
    let tooltips = document.querySelectorAll(".tooltip__social-network");
    let wrapperTooltips = document.querySelectorAll(".social-network");

    for (let i = 0; i < tooltips.length; i++) {
      tooltips[i].style.display = "flex";
      let paramTooltip = tooltips[i].getBoundingClientRect();
      let paramWrapperTooltip = wrapperTooltips[i].getBoundingClientRect();
      tooltips[i].style.left = `-${
        Math.round(paramTooltip.width / 2 - paramWrapperTooltip.width / 2) - 1
      }px`;
      tooltips[i].style.display = "none";
    }
  }

  function actionsButtonsCreation(id) {
    let buttonsWrapper = document.createElement("div");
    let btnEdit = document.createElement("button");
    let btnDelete = document.createElement("button");

    buttonsWrapper.classList.add("table__actions");
    btnEdit.classList.add("btn");
    btnDelete.classList.add("btn");
    btnEdit.classList.add("btn__edit");
    btnDelete.classList.add("btn__delete");
    btnEdit.classList.add("btn-reset");
    btnDelete.classList.add("btn-reset");

    btnEdit.setAttribute("data-client-id", `${id}`);
    btnDelete.setAttribute("data-client-id", `${id}`);

    btnEdit.textContent = "Изменить";
    btnDelete.textContent = "Удалить";

    btnEdit.addEventListener("click", (e) => {
      let idClient = Number(e.target.getAttribute("data-client-id"));
      let client = listContacts.find((item) => Number(item.id) === idClient);
      document.querySelector(".changing-client").classList.add("open-form");
      // if (typeof(client.fio) === )
      // console.log();
      clientFio = client.fio.split(" ");
      let listContactsClient = client.contacts;
      let keysListContactsClient = Object.keys(client.contacts);
      // console.log(keysListContactsClient);

      let inputs = document.querySelectorAll(".form-change__input");
      for (let i = 0; i < inputs.length; i++) {
        switch (i) {
          case 0:
            inputs[i].value = clientFio[i];
            break;
          case 1:
            inputs[i].value = clientFio[i];
            break;
          case 2:
            inputs[i].value = clientFio[i];
            break;
        }
      }

      let formChangeContacts = document.querySelectorAll(
        ".form-change__contacts .form__wrapper-new-contact"
      );
      // console.log(formChangeContacts);
      formChangeContacts.forEach((el) => {
        el.remove();
      });
      for (let i = 0; i < keysListContactsClient.length; i++) {
        if (listContactsClient.getByKeyIndex(i) !== null) {
          addContact(
            formAddChange,
            keysListContactsClient[i],
            listContactsClient.getByKeyIndex(i)
          );
        }
      }

      let span = document.querySelector(".client-id-for-changing");
      span.textContent = `ID: ${client.id}`;
    });

    btnDelete.addEventListener("click", (e) => {
      let idClient = Number(e.target.getAttribute("data-client-id"));
      let client = listContacts.find((item) => Number(item.id) === idClient);
      document.querySelector(".delete__btn").addEventListener("click", (el) => {
        deleteClient(client);
        document.querySelector(".delete-client").classList.remove("open-form");
      });
      document.querySelector(".delete-client").classList.add("open-form");
    });

    buttonsWrapper.append(btnEdit, btnDelete);
    return buttonsWrapper;
  }

  function addContact(tag, social = null, value = null) {
    let lengthWrapperSelect = document.querySelectorAll(
      ".form__wrapper-new-contact"
    ).length;

    let wrapperSelect = document.createElement("div");
    wrapperSelect.classList.add("form__wrapper-new-contact");
    wrapperSelect.classList.add(`new-contact-${lengthWrapperSelect + 1}`);

    let select = document.createElement("select");
    select.classList.add("new-contact__select");
    select.classList.add("new-contact-select");

    let selectInput = document.createElement("input");
    selectInput.setAttribute("type", "text");
    selectInput.classList.add("new-contact__input");

    if (social !== null && value !== null) {
      if (
        social.includes("tel") &&
        social.includes("vk") &&
        social.includes("mail") &&
        social.includes("facebook")
      ) {
        if (social === "myWorld") social = "Мой мир";
        if (social === "classmates") social = "Одноклассники";
        selectInput.value = `${social}:${value}`;
        social = "other";
      } else {
        selectInput.value = `${value}`;
      }
    }
    console.log(social, value);
    for (let i = 0; i < 5; i++) {
      let option = document.createElement("option");
      option.classList.add("new-contact-select__option");
      switch (i) {
        case 0:
          option.setAttribute("value", "tel");
          if ((social === null && value === null) || social.includes("tel"))
            option.setAttribute("selected", true);
          option.textContent = "Телефон";
          break;
        case 1:
          option.setAttribute("value", "mail");
          if (social !== null && social.includes("mail"))
            option.setAttribute("selected", true);
          option.textContent = "Email";
          break;
        case 2:
          option.setAttribute("value", "vk");
          if (social !== null && social.includes("vk"))
            option.setAttribute("selected", true);
          option.textContent = "Vk";
          break;
        case 3:
          option.setAttribute("value", "facebook");
          if (social !== null && social.includes("facebook"))
            option.setAttribute("selected", true);
          option.textContent = "Facebook";
          break;
        case 4:
          option.setAttribute("value", "other");
          if (
            social !== null &&
            !social.includes("tel") &&
            !social.includes("vk") &&
            !social.includes("mail") &&
            !social.includes("facebook")
          )
            option.setAttribute("selected", true);
          option.textContent = "Другое";
          break;
      }
      select.append(option);
    }
    wrapperSelect.append(select, selectInput);

    let newBtn = document.createElement("button");
    newBtn.classList.add("btn-delete-value");
    newBtn.classList.add("btn-reset");
    newBtn.innerHTML = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 0C2.682 0 0 2.682 0 6C0 9.318 2.682 12 6 12C9.318 12 12 9.318 12 6C12 2.682 9.318 0 6 0ZM6 10.8C3.354 10.8 1.2 8.646 1.2 6C1.2 3.354 3.354 1.2 6 1.2C8.646 1.2 10.8 3.354 10.8 6C10.8 8.646 8.646 10.8 6 10.8ZM8.154 3L6 5.154L3.846 3L3 3.846L5.154 6L3 8.154L3.846 9L6 6.846L8.154 9L9 8.154L6.846 6L9 3.846L8.154 3Z" fill="#B0B0B0"/>
    </svg>`;

    let tooltip = document.createElement("div");
    let tooltipSpan = document.createElement("span");
    tooltip.classList.add("btn-delete-value__tooltip");
    tooltipSpan.classList.add("btn-delete-value__tooltip-text");
    tooltipSpan.textContent = "Удалить контакт";
    tooltip.append(tooltipSpan);

    let wrapperBtnDeleteValue = document.createElement("div");
    wrapperBtnDeleteValue.classList.add("btn-delete-value__wrapper");
    wrapperBtnDeleteValue.append(newBtn, tooltip);

    newBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.currentTarget.parentElement.previousSibling.parentElement.remove();
    });

    if (selectInput.value !== "") {
      selectInput.classList.add("has-value");
      selectInput.after(wrapperBtnDeleteValue);
    }
    selectInput.addEventListener("input", (e) => {
      if (selectInput.value !== "") {
        selectInput.classList.add("has-value");
        wrapperBtnDeleteValue.remove();
        selectInput.after(wrapperBtnDeleteValue);
      } else {
        selectInput.classList.remove("has-value");
        wrapperBtnDeleteValue.remove();
      }
    });

    tag.before(wrapperSelect);
  }

  //Get key value by index (key value is adaptive)
  Object.prototype.getByKeyIndex = function (i) {
    var key = Object.keys(this)[i];
    return key && this[key];
  };

  let table = document.querySelector(".table__body");
  let listContacts = [];
  axios
    .get("http://localhost:3000/api/clients")
    .then((perform) => {
      listContacts = perform.data;
      outputContacts(listContacts);
    })
    .catch((error) => {
      console.log(error);
    });

  //open form(create client)
  document.querySelector(".btn-open-form").addEventListener("click", (e) => {
    document.querySelector(".creating-client").classList.add("open-form");
  });

  //trasform label
  document.querySelector(".creating-client").classList.add("open-form");
  document.querySelector(".changing-client").classList.add("open-form");
  let labelInputs = document.querySelectorAll(".form__input");
  let labelChangingInputs = document.querySelectorAll(".form-change__input");
  for (let i = 0; i < labelInputs.length; i++) {
    labelInputs[i].addEventListener("input", (e) => {
      if (labelInputs[i].value !== "")
        labelInputs[i].previousElementSibling.classList.add(
          "form__label-content-active"
        );
      else
        labelInputs[i].previousElementSibling.classList.remove(
          "form__label-content-active"
        );
    });
    labelChangingInputs[i].previousElementSibling.classList.add(
      "form__label-content-active"
    );
    labelChangingInputs[i].addEventListener("input", (e) => {
      if (labelChangingInputs[i].value !== "")
        labelChangingInputs[i].previousElementSibling.classList.add(
          "form__label-content-active"
        );
      else
        labelChangingInputs[i].previousElementSibling.classList.remove(
          "form__label-content-active"
        );
    });
  }
  document.querySelector(".creating-client").classList.remove("open-form");
  document.querySelector(".changing-client").classList.remove("open-form");

  //close form
  document.querySelector(".btn-close-form").addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".creating-client").classList.remove("open-form");
    document.querySelector(".form__input-surname").value = "";
    document.querySelector(".form__input-name").value = "";
    document.querySelector(".form__input-middle-name").value = "";
    deleteAndCreateError();
  });
  document.querySelector(".btn-cancel").addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".creating-client").classList.remove("open-form");
    document.querySelector(".form__input-surname").value = "";
    document.querySelector(".form__input-name").value = "";
    document.querySelector(".form__input-middle-name").value = "";
    deleteAndCreateError();
  });

  //adding a contact to a full name(create client)
  let formAdd = document.querySelector(".form__add-contacts");
  formAdd.addEventListener("click", (e) => {
    e.preventDefault();
    addContact(formAdd);
    let inputContacts = document.querySelectorAll(
      ".form__contacts-wrapper .form__wrapper-new-contact"
    );
    if (inputContacts) {
      console.log(inputContacts);
      document
        .querySelector(".form__contacts-wrapper")
        .classList.add("form-contacts-wrapper__update-padding");
    }
  });

  document.querySelector(".btn-save-contact").addEventListener("click", (e) => {
    e.preventDefault();
    let surname = document.querySelector(".form__input-surname").value.trim();
    if (validateInput(surname, "Фамилия", "add")) return;
    let name = document.querySelector(".form__input-name").value.trim();
    if (validateInput(name, "Имя", "add")) return;
    let middleName = document
      .querySelector(".form__input-middle-name")
      .value.trim();
    // if (validateInput(middleName, "Отчество", "add")) return;

    let newId = 0;
    if (listContacts.length !== 0) {
      newId = listContacts[listContacts.length - 1].id;
    }
    let newClient = {
      id: Number(newId + 1),
      fio: `${surname} ${name} ${middleName}`,
      createAt: new Date(),
      updateAt: new Date(),
    };

    let contacts = document.querySelectorAll(".form__wrapper-new-contact");
    if (contacts.length !== 0) {
      for (let i = 0; i < contacts.length; i++) {
        if (validateInputContacts(contacts[i], ".form-create__contact")) return;
      }
    }

    let newClientContacts = "{";
    contacts.forEach((contact, index) => {
      let nameContact =
        contact.childNodes[0].childNodes[0].childNodes[1].childNodes[0].getAttribute(
          "data-value"
        );
      let valueContant = contact.childNodes[1].value;

      if (nameContact === "other") {
        nameContact = valueContant.split(":");
        console.log(nameContact);
        if (nameContact[0] === "Мой мир") nameContact[0] = "myWorld";
        if (nameContact[0] === "Однаклассники") nameContact[0] = "classmates";
        newClientContacts =
          newClientContacts +
          `\"${nameContact[0]}${index}\":\"${nameContact[1]}\"`;
      } else
        newClientContacts =
          newClientContacts + `\"${nameContact}${index}\":\"${valueContant}\"`;
      if (index !== contacts.length - 1)
        newClientContacts = newClientContacts + ",";
    });
    newClientContacts = newClientContacts + "}";
    newClient.contacts = JSON.parse(newClientContacts);

    addClient(newClient);
    document.querySelector(".form__input-surname").value = "";
    document.querySelector(".form__input-name").value = "";
    document.querySelector(".form__input-middle-name").value = "";
    contacts.forEach((contact) => {
      contact.remove();
    });
    document.querySelector(".form__background").classList.toggle("open-form");
  });

  //close form(change client)
  document
    .querySelector(".btn-close-form-change")
    .addEventListener("click", (e) => {
      document.querySelector(".changing-client").classList.remove("open-form");
      deleteAndCreateError();
    });
  document
    .querySelector(".btn-delete-change")
    .addEventListener("click", (e) => {
      document.querySelector(".changing-client").classList.remove("open-form");
      deleteAndCreateError();
    });

  //adding a contact to a full name(changing client)
  let formAddChange = document.querySelector(".form-change__add-contacts");
  formAddChange.addEventListener("click", (e) => {
    e.preventDefault();
    addContact(formAddChange);
  });

  document
    .querySelector(".btn-save-contact-change")
    .addEventListener("click", (e) => {
      e.preventDefault();
      let surname = document
        .querySelector(".form-change__input-surname")
        .value.trim();
      if (validateInput(surname, "Фамилия", "change")) return;
      let name = document
        .querySelector(".form-change__input-name")
        .value.trim();
      if (validateInput(name, "Имя", "change")) return;
      let middleName = document
        .querySelector(".form-change__input-middle-name")
        .value.trim();
      // if (validateInput(middleName, "Отчество", "change")) return;

      let idSpan = document.querySelector(
        ".client-id-for-changing"
      ).textContent;
      let id = idSpan.replace(/[^\d]/g, "");
      // console.log(id);
      let client = listContacts.find((item) => Number(item.id) === Number(id));
      // console.log(client);
      let newClient = {
        id: id,
        fio: `${surname} ${name} ${middleName}`,
        createAt: client.createAt,
        updateAt: new Date(),
      };

      let contacts = document.querySelectorAll(
        ".form-change__contacts .form__wrapper-new-contact"
      );
      // console.log(contacts);
      if (contacts.length !== 0) {
        for (let i = 0; i < contacts.length; i++) {
          if (validateInputContacts(contacts[i], ".form-change__contacts"))
            return;
        }
      }

      let newClientContacts = "{";
      contacts.forEach((contact, index) => {
        let nameContact =
          contact.childNodes[0].childNodes[0].childNodes[1].childNodes[0].getAttribute(
            "data-value"
          ) + index;
        let valueContant = contact.childNodes[1].value;
        console.log(nameContact, valueContant);
        newClientContacts = newClientContacts + `\"${nameContact}\":\"${valueContant}\"`;
        if (index !== contacts.length - 1)
          newClientContacts = newClientContacts + ",";
      });
      newClientContacts = newClientContacts + "}";
      newClient.contacts = JSON.parse(newClientContacts);

      changeClient(newClient, id);
      document.querySelector(".changing-client").classList.toggle("open-form");
    });
  document
    .querySelector(".btn-delete-change")
    .addEventListener("click", (e) => {
      e.preventDefault();
      let id = parseInt(
        document
          .querySelector(".client-id-for-changing")
          .textContent.match(/\d+/)
      );
      let client = listContacts.find((item) => Number(item.id) === id);
      deleteClient(client);
    });

  //close form delete client
  document
    .querySelector(".btn-close-delete-form")
    .addEventListener("click", (e) => {
      document.querySelector(".delete-client").classList.remove("open-form");
      deleteAndCreateError();
    });
  document.querySelector(".btn-delete-close").addEventListener("click", (e) => {
    document.querySelector(".delete-client").classList.remove("open-form");
    deleteAndCreateError();
  });

  //search client
  document.querySelector(".input__search").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      let search = document.querySelector(".input__search").value;
      searchClients(search);
      search = "";
    }
  });

  //filter search
  document.querySelector(".table__row").addEventListener("click", (e) => {
    let tableHeaders = document.querySelectorAll(".table__header-text");
    let tableHeader = e.target;
    if (tableHeader.classList.contains("table-header__wrapper"))
      tableHeader = tableHeader.parentElement;
    if (
      (e.target.classList.contains("table__header-text") &&
        (e.target.classList.contains("sort-up") ||
          e.target.classList.contains("sort-up-fio"))) ||
      e.target.classList.contains("table-header__wrapper")
    ) {
      console.log(e.target);
      tableHeaders.forEach((header) => {
        header.classList.remove("table__header-text-active");
      });
      tableHeader.classList.add("table__header-text-active");
    }
    tableHeaders.forEach((header) => {
      if (
        header.getAttribute("data-table-header") !==
        tableHeader.getAttribute("data-table-header")
      ) {
        header.classList.remove("sort-down");
        header.classList.remove("sort-down-fio");
      }
    });
    switch (tableHeader.getAttribute("data-table-header")) {
      case "fio":
        if (tableHeader.classList.contains("sort-down-fio")) {
          let list = listContacts.sort((a, b) => {
            let fa = a.fio.toLowerCase(),
              fb = b.fio.toLowerCase();

            if (fa < fb) {
              return -1;
            }
            if (fa > fb) {
              return 1;
            }
            return 0;
          });
          outputContacts(list);
          tableHeader.classList.remove("sort-down-fio");
          break;
        } else {
          let list = listContacts.sort((a, b) => {
            let fa = a.fio.toLowerCase(),
              fb = b.fio.toLowerCase();

            if (fa < fb) {
              return 1;
            }
            if (fa > fb) {
              return -1;
            }
            return 0;
          });
          outputContacts(list);
          tableHeader.classList.add("sort-down-fio");
          break;
        }
      case "id":
        if (tableHeader.classList.contains("sort-down")) {
          let list = listContacts.sort((a, b) => {
            if (a.id < b.id) {
              return -1;
            }
            if (a.id > b.id) {
              return 1;
            }
            return 0;
          });
          outputContacts(list);
          tableHeader.classList.remove("sort-down");
          break;
        } else {
          let list = listContacts.sort((a, b) => {
            if (a.id < b.id) {
              return 1;
            }
            if (a.id > b.id) {
              return -1;
            }
            return 0;
          });
          outputContacts(list);
          tableHeader.classList.add("sort-down");
          break;
        }
      case "createAt":
        if (tableHeader.classList.contains("sort-down")) {
          let list = listContacts.sort((a, b) => {
            if (a.createAt < b.createAt) {
              return 1;
            }
            if (a.createAt > b.createAt) {
              return -1;
            }
            return 0;
          });
          outputContacts(list);
          tableHeader.classList.remove("sort-down");
          break;
        } else {
          let list = listContacts.sort((a, b) => {
            if (a.createAt < b.createAt) {
              return -1;
            }
            if (a.createAt > b.createAt) {
              return 1;
            }
            return 0;
          });
          outputContacts(list);
          tableHeader.classList.add("sort-down");
          break;
        }
      case "updateAt":
        if (tableHeader.classList.contains("sort-down")) {
          let list = listContacts.sort((a, b) => {
            if (a.updateAt < b.updateAt) {
              return 1;
            }
            if (a.updateAt > b.updateAt) {
              return -1;
            }
            return 0;
          });
          outputContacts(list);
          tableHeader.classList.remove("sort-down");
          break;
        } else {
          let list = listContacts.sort((a, b) => {
            if (a.updateAt < b.updateAt) {
              return -1;
            }
            if (a.updateAt > b.updateAt) {
              return 1;
            }
            return 0;
          });
          outputContacts(list);
          tableHeader.classList.add("sort-down");
          break;
        }
    }
  });

  document.addEventListener("click", (e) => {
    //choices
    let allChoices = document.querySelectorAll(".new-contact__select");
    for (let i = 0; i < allChoices.length; i++) {
      if (!allChoices[i].hasAttribute("hidden")) {
        new Choices(allChoices[i], {
          itemSelectText: "",
          searchEnabled: false,
          allowHTML: true,
        });
      }
    }
  });
});
