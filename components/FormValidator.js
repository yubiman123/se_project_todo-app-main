class FormValidator {
    constructor(settings, formEl) {
   this._formSelector = settings.formSelector;
    this._formEl = formEl;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
}

_checkInputValidity(inputElement) {
  if (!inputElement.validity.valid) {
    this._showInputError(inputElement, inputElement.validationMessage);
  } else {

_setEventListeners() {
     this._inputList = Array.from(
    this._formEl.querySelectorAll(this._inputSelector),
  );
  const buttonElement = formElement.querySelector(
    settings.submitButtonSelector,
  );

  toggleButtonState(inputList, buttonElement, settings);

 this._inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      this._checkInputValidity(inputElement);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
}

enableValidation() {
  this._formEl.addEventListener("submit", (evt) => {
    evt.preventDefault();
  });
  this.setEventListeners();
}


export default FormValidator;