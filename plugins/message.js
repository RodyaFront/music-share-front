/* eslint-disable */
class MessageItemConstructor {
  _instance = null
  $inTransitionDuration = 750
  $outTransitionDuration = 250
  $removeTimeout = null
  $types = null
  $dateWhenItemRemoved = null
  $freezedHideTimer = null
  $endless = false

  get instance() {
    return this._instance
  }

  constructor(options) {
    const _messageItem = this.createItem()
    this.$types = options && options.types
    _messageItem.append(this.createCloseIcon())
    this.setShowMessageAnimation(_messageItem)
    _messageItem.addEventListener('mouseenter', this.freezeHide.bind(this))
    _messageItem.addEventListener('mouseleave', this.resumeHide.bind(this))
    this._instance = _messageItem
  }

  createItem() {
    const item = document.createElement('div')
    item.classList.add('m-message__item')
    return item
  }
  createIcon(name) {
    const _icon = document.createElement('div')
    _icon.classList.add('m-message__icon')
    _icon.innerHTML = `<i class="mdi ${name}"></i>`
    return _icon
  }
  createCloseIcon() {
    const closeIcon = document.createElement('div')
    closeIcon.classList.add('m-message__close-icon')
    closeIcon.innerHTML = `
                <i class="mdi mdi-window-close"></i>
            `
    closeIcon.onclick = () => this.removeMessage(this._instance)
    return closeIcon
  }
  text(value) {
    const text = document.createElement('div')
    text.classList.add('m-message__text')
    text.innerHTML = value
    this._instance.append(text)
    return this
  }
  title(value) {
    const title = document.createElement('div')
    title.classList.add('m-message__title')
    title.innerText = value
    this._instance.append(title)
    return this
  }
  type(type) {
    const { T_SUCCESS, T_WARNING, T_DEFAULT, T_ERROR } = this.$types
    if (type === T_ERROR) this.setErrorType()
    if (type === T_SUCCESS) this.setSuccessType()
    if (type === T_WARNING) this.setWarningType()
    if (type === T_DEFAULT) this.setDefaultType()
    return this
  }
  duration(timeout) {
    this.$endless = timeout === 0
    this.setRemoveMessageTimeout(this._instance, timeout)
  }
  setSuccessType() {
    this._instance.classList.add('success-type')
    const iconName = 'mdi-checkbox-multiple-marked'
    const icon = this.createIcon(iconName)
    this._instance.append(icon)
    return this
  }
  setErrorType() {
    this._instance.classList.add('error-type')
    const icon = this.createIcon('mdi-alert-circle')
    this._instance.append(icon)
    return this
  }
  setWarningType() {
    this._instance.classList.add('warning-type')
    const icon = this.createIcon('mdi-alert')
    this._instance.append(icon)
    return this
  }
  setDefaultType() {
    this._instance.classList.add('default-type')
    return this
  }
  removeMessage(element) {
    element.classList.add('from-remove')
    setTimeout(() => element.classList.add('to-remove'), 10)
    setTimeout(() => {
      element.remove()
    }, this.$outTransitionDuration)
  }
  setShowMessageAnimation(element) {
    element.classList.add('from-show')
    setTimeout(() => element.classList.add('to-show'), 10)
    setTimeout(() => {
      element.classList.remove('from-show')
      element.classList.remove('to-show')
    }, this.$inTransitionDuration)
  }
  removeMessage(element) {
    element.classList.add('from-remove')
    setTimeout(() => element.classList.add('to-remove'), 10)
    setTimeout(() => {
      element.remove()
    }, this.$outTransitionDuration)
  }
  setRemoveMessageTimeout(element, timeout) {
    if (timeout === 0) {
      return
    }

    this.$dateWhenItemRemoved = new Date().getTime() + timeout

    this.$removeTimeout = setTimeout(() => {
      this.removeMessage(element)
    }, timeout)
  }
  freezeHide() {
    const currentDate = new Date().getTime()
    const freezedHideTimer = this.$dateWhenItemRemoved - currentDate
    this.$freezedHideTimer = freezedHideTimer
    clearTimeout(this.$removeTimeout)
  }
  resumeHide() {
    if (this.$endless) {
      return
    }
    this.setRemoveMessageTimeout(this._instance, this.$freezedHideTimer)
  }
}

class MessageWrapperConstructor {
  _instanse = null
  $checkItemsExistingInterval = null

  get instance() {
    return this._instanse
  }

  constructor() {
    const _wrapper = document.createElement('div')
    _wrapper.classList.add('m-message__group')
    this._instanse = _wrapper
  }

  show() {
    this._instanse.style.display = 'flex'
    this.$checkItemsExistingInterval = setInterval(() => {
      if (this._instanse.children.length === 0) {
        this._instanse.style.display = 'none'
        clearInterval(this.$checkItemsExistingInterval)
      }
    }, 100)
  }
  append(element) {
    this._instanse.append(element)
  }
}

export default class Message {
  _wrapper = null
  $displayNoneTimer = null
  $checkItemsExistingInterval = null
  $types = {
    T_ERROR: 'error',
    T_SUCCESS: 'success',
    T_WARNING: 'warning',
    T_DEFAULT: 'default',
  }
  DEFAULT_MESSAGE_DURATION = 2000

  constructor() {
    this._wrapper = new MessageWrapperConstructor()
    document.body.append(this._wrapper.instance)
  }

  notification(options) {
    const fixedOptions = this.generateMessageOptions(options)
    this._wrapper.append(this.createMessage(fixedOptions))
    this._wrapper.show()
  }

  createMessage({ positions, title, text, type, duration }) {
    const message = new MessageItemConstructor({
      types: this.$types,
    })

    message.title(title).text(text).type(type).duration(duration)

    return message.instance
  }

  generateMessageOptions(options) {
    const position = (options && options.position) || 'top-right'
    const title = (options && options.title) || ''
    const text = (options && options.text) || ''
    const duration =
      (options && options.duration) || (options && options.duration === 0)
        ? options.duration
        : this.DEFAULT_MESSAGE_DURATION
    const type = (options && options.type) || this.$types.T_DEFAULT

    return {
      position,
      title,
      text,
      type,
      duration,
    }
  }
}
