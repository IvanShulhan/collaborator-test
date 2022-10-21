const selects = document.querySelectorAll('.select');
const detailButtons = document.querySelectorAll('.notification__tags-button');
const options = document.querySelectorAll('.select__options');
const mask = document.querySelector('.mask');
const defaultButton = document.querySelector('#defaultButton');
const submitButton = document.querySelector('#submitButton');
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const successMessage = document.querySelector('.success-message');
const tags = document.querySelectorAll('.notification__tags');

const modal = document.querySelector('.modal');
const modalText = modal.querySelector('.modal__text');
const modalCloseButton = modal.querySelector('.modal__close-button');
const modalButtons = modal.querySelector('.modal__buttons');

const modalCancelButton = modalButtons.querySelector('#cancel-button');
const modalSubmitButton = modalButtons.querySelector('#submit-button');

let isVisibleSelectOptions = false;

document.body.addEventListener('click', (e) => {
  if (!isVisibleSelectOptions) {
    return;
  }

  if (!e.target.closest('.select')) {
    isVisibleSelectOptions = false;
    options.forEach((option) => {
      option.classList.remove('is-visible');
    })
  };
})

tags.forEach((tag) => {
  const tagBodies = tag.querySelectorAll('.notification__tag');

  tagBodies.forEach((body, i) => {
    const deleteIcons = body.querySelector('span');

    deleteIcons.addEventListener('click', () => {
      body.remove();
    })
  })
})

selects.forEach((select) => {
  select.addEventListener('click', setVisibilityOptions);
});

detailButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault();

    showModal(true)
  });
});

defaultButton.addEventListener('click', (e) => {
  e.preventDefault();

  checkboxes.forEach((checkbox) => {
    checkbox.checked = true;
  })

  selects.forEach((select) => {
    const title = select.querySelector('.select__title');
    setSelectValue(title, 'Мгновенно');
  })
})

submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  showModal()
})

modalCloseButton.addEventListener('click', hideModal);
modalCancelButton.addEventListener('click', hideModal);
mask.addEventListener('click', hideModal);

modalSubmitButton.addEventListener('click', (e) => {
  e.preventDefault();
  hideModal();
  showSuccessMessage();
})

function setVisibilityOptions({ currentTarget }) {
  const activeOptions = document.querySelector('.select__options.is-visible')
  const title = currentTarget.querySelector('.select__title')
  const options = currentTarget.querySelector('.select__options');
  const optionsList = options.querySelectorAll('.select__option');

  if (activeOptions && activeOptions !== options) {
    activeOptions.classList.remove('is-visible');
    options.classList.add('is-visible');
  } else {
    isVisibleSelectOptions = !isVisibleSelectOptions;
    options.classList.toggle('is-visible');
  }

  optionsList.forEach((option) => {
    option.addEventListener('click', () => {
      setSelectValue(title, option.innerText);
    })
  })
}

function setSelectValue (el, text) {
  el.innerHTML = text + '<span>arrow</span>';
}

function hideModal() {
  modal.classList.remove('is-visible');
  mask.classList.remove('is-visible');
}

function showModal(isInfoModal) {
  if (!isInfoModal) {
    modalButtons.classList.add('is-visible');
    modalText.style.fontSize = '30px';
    modalText.textContent = 'Вы уверены?';
  } else {
    modalText.style.fontSize = '16px';
    modalText.textContent = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores, neque cumque accusamus mollitia officiis odio, quod necessitatibus dicta fugit repudiandae similique voluptatem ea exercitationem ratione molestiae delectus alias incidunt deserunt.';
  
    modalButtons.classList.remove('is-visible');
  }

  modal.classList.add('is-visible');
  mask.classList.add('is-visible');
}

function showSuccessMessage() {
  successMessage.classList.add('is-visible');

  setTimeout(() => {
    successMessage.classList.remove('is-visible');
  }, 3000)
}
