class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
  }

  open() {
    this._popup.classList.add("popup_visible");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_visible");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClose(evt) {
    if (
      evt.target.classList.contains("popup") ||
      evt.target.classList.contains("popup__close")
    ) {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("mousedown", this._handleOverlayClose);
    const closeButton = this._popup.querySelector(".popup__close");
    if (closeButton) {
      closeButton.addEventListener("click", () => this.close());
    }
  }
}

export default Popup;
