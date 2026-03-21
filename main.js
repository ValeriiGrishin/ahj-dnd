/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/Card.js"
/*!************************!*\
  !*** ./src/js/Card.js ***!
  \************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Card: () => (/* binding */ Card)\n/* harmony export */ });\nclass Card {\n  constructor(data, onDelete, onDragStart, onDragEnd) {\n    this.id = data.id;\n    this.text = data.text;\n    this.onDelete = onDelete;\n    this.onDragStart = onDragStart;\n    this.onDragEnd = onDragEnd;\n  }\n  render() {\n    const card = document.createElement('div');\n    card.className = 'card';\n    card.setAttribute('draggable', 'true');\n    card.setAttribute('data-id', this.id);\n    const textSpan = document.createElement('span');\n    textSpan.textContent = this.text;\n    const deleteBtn = document.createElement('span');\n    deleteBtn.className = 'delete-card';\n    deleteBtn.textContent = '✕';\n    deleteBtn.addEventListener('click', e => {\n      e.stopPropagation();\n      this.onDelete(this.id);\n    });\n    card.append(textSpan, deleteBtn);\n    card.addEventListener('dragstart', e => {\n      e.dataTransfer.setData('text/plain', this.id);\n      e.dataTransfer.effectAllowed = 'move';\n      this.onDragStart(this.id, e.clientX, e.clientY);\n    });\n    card.addEventListener('dragend', () => {\n      this.onDragEnd();\n    });\n    return card;\n  }\n}\n\n//# sourceURL=webpack://trello/./src/js/Card.js?\n}");

/***/ },

/***/ "./src/js/Column.js"
/*!**************************!*\
  !*** ./src/js/Column.js ***!
  \**************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Column: () => (/* binding */ Column)\n/* harmony export */ });\n/* harmony import */ var _Card__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Card */ \"./src/js/Card.js\");\n\nclass Column {\n  constructor(column, onAddCard, onDeleteCard, onCardDragStart, onCardDragEnd, onCardDrop, onUpdate) {\n    this.id = column.id;\n    this.title = column.title;\n    this.cards = column.cards || [];\n    this.onAddCard = onAddCard;\n    this.onDeleteCard = onDeleteCard;\n    this.onCardDragStart = onCardDragStart;\n    this.onCardDragEnd = onCardDragEnd;\n    this.onCardDrop = onCardDrop;\n    this.onUpdate = onUpdate;\n    this.isAdding = false;\n  }\n  render() {\n    const column = document.createElement('div');\n    column.className = 'column';\n    column.setAttribute('data-column-id', this.id);\n    const header = document.createElement('div');\n    header.className = 'column-header';\n    header.textContent = this.title;\n    const cardsContainer = document.createElement('div');\n    cardsContainer.className = 'cards-container';\n    cardsContainer.setAttribute('data-column-id', this.id);\n    cardsContainer.addEventListener('dragover', e => {\n      e.preventDefault();\n      e.dataTransfer.dropEffect = 'move';\n    });\n    cardsContainer.addEventListener('drop', e => {\n      e.preventDefault();\n      const cardId = e.dataTransfer.getData('text/plain');\n      const targetCard = e.target.closest('.card');\n      const position = targetCard ? targetCard.getAttribute('data-id') : null;\n      this.onCardDrop(cardId, this.id, position, e.clientY);\n    });\n    this.cards.forEach(cardData => {\n      const card = new _Card__WEBPACK_IMPORTED_MODULE_0__.Card(cardData, this.onDeleteCard, this.onCardDragStart, this.onCardDragEnd);\n      cardsContainer.append(card.render());\n    });\n    const addBtn = document.createElement('button');\n    addBtn.className = 'add-card-btn';\n    addBtn.textContent = '+ Add another card';\n    addBtn.addEventListener('click', () => this.showForm(column, cardsContainer));\n    column.append(header, cardsContainer, addBtn);\n    return column;\n  }\n  showForm(column, cardsContainer) {\n    if (this.isAdding) return;\n    this.isAdding = true;\n    const form = document.createElement('div');\n    form.className = 'card-form';\n    const textarea = document.createElement('textarea');\n    textarea.placeholder = 'Enter a title for this card...';\n    textarea.rows = 3;\n    const buttons = document.createElement('div');\n    buttons.className = 'card-form-buttons';\n    const addBtn = document.createElement('button');\n    addBtn.textContent = 'Add Card';\n    addBtn.addEventListener('click', () => {\n      const text = textarea.value.trim();\n      if (text) {\n        this.onAddCard(this.id, text);\n        this.isAdding = false;\n        this.onUpdate();\n      }\n    });\n    const cancelBtn = document.createElement('button');\n    cancelBtn.className = 'cancel-btn';\n    cancelBtn.textContent = '✕';\n    cancelBtn.addEventListener('click', () => {\n      this.isAdding = false;\n      this.onUpdate();\n    });\n    buttons.append(addBtn, cancelBtn);\n    form.append(textarea, buttons);\n    const addBtnElement = column.querySelector('.add-card-btn');\n    column.insertBefore(form, addBtnElement);\n  }\n}\n\n//# sourceURL=webpack://trello/./src/js/Column.js?\n}");

/***/ },

/***/ "./src/js/Trello.js"
/*!**************************!*\
  !*** ./src/js/Trello.js ***!
  \**************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Trello: () => (/* binding */ Trello)\n/* harmony export */ });\n/* harmony import */ var _Column__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Column */ \"./src/js/Column.js\");\n/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storage */ \"./src/js/storage.js\");\n\n\nclass Trello {\n  constructor(container) {\n    this.container = container;\n    this.state = (0,_storage__WEBPACK_IMPORTED_MODULE_1__.loadState)();\n    this.draggedCardId = null;\n    this.dragStartX = 0;\n    this.dragStartY = 0;\n    this.init();\n  }\n  init() {\n    this.render();\n    this.bindEvents();\n  }\n  render() {\n    this.container.innerHTML = '';\n    this.state.columns.forEach(columnData => {\n      const column = new _Column__WEBPACK_IMPORTED_MODULE_0__.Column(columnData, this.addCard.bind(this), this.deleteCard.bind(this), this.onDragStart.bind(this), this.onDragEnd.bind(this), this.onDrop.bind(this), this.render.bind(this));\n      this.container.append(column.render());\n    });\n  }\n  addCard(columnId, text) {\n    const column = this.state.columns.find(col => col.id === columnId);\n    if (column) {\n      const newCard = {\n        id: Date.now().toString(),\n        text: text\n      };\n      column.cards.push(newCard);\n      this.saveAndRender();\n    }\n  }\n  deleteCard(cardId) {\n    for (const column of this.state.columns) {\n      const index = column.cards.findIndex(card => card.id === cardId);\n      if (index !== -1) {\n        column.cards.splice(index, 1);\n        break;\n      }\n    }\n    this.saveAndRender();\n  }\n  onDragStart(cardId, clientX, clientY) {\n    this.draggedCardId = cardId;\n    this.dragStartX = clientX;\n    this.dragStartY = clientY;\n  }\n  onDragEnd() {\n    this.draggedCardId = null;\n  }\n  onDrop(cardId, targetColumnId, targetCardId, mouseY) {\n    if (!this.draggedCardId || this.draggedCardId !== cardId) return;\n    let sourceColumn = null;\n    let sourceCardIndex = -1;\n    let draggedCard = null;\n    for (const column of this.state.columns) {\n      const index = column.cards.findIndex(card => card.id === cardId);\n      if (index !== -1) {\n        sourceColumn = column;\n        sourceCardIndex = index;\n        draggedCard = column.cards[index];\n        break;\n      }\n    }\n    if (!draggedCard) return;\n    const targetColumn = this.state.columns.find(col => col.id === targetColumnId);\n    if (!targetColumn) return;\n    sourceColumn.cards.splice(sourceCardIndex, 1);\n    if (targetCardId) {\n      const targetIndex = targetColumn.cards.findIndex(card => card.id === targetCardId);\n      if (targetIndex !== -1) {\n        const targetCardElement = document.querySelector(`.card[data-id=\"${targetCardId}\"]`);\n        if (targetCardElement) {\n          const rect = targetCardElement.getBoundingClientRect();\n          const isAfter = mouseY > rect.top + rect.height / 2;\n          const insertIndex = isAfter ? targetIndex + 1 : targetIndex;\n          targetColumn.cards.splice(insertIndex, 0, draggedCard);\n        } else {\n          targetColumn.cards.push(draggedCard);\n        }\n      } else {\n        targetColumn.cards.push(draggedCard);\n      }\n    } else {\n      targetColumn.cards.push(draggedCard);\n    }\n    this.saveAndRender();\n    this.draggedCardId = null;\n  }\n  bindEvents() {\n    document.addEventListener('dragend', () => {\n      this.draggedCardId = null;\n    });\n  }\n  saveAndRender() {\n    (0,_storage__WEBPACK_IMPORTED_MODULE_1__.saveState)(this.state);\n    this.render();\n  }\n}\n\n//# sourceURL=webpack://trello/./src/js/Trello.js?\n}");

/***/ },

/***/ "./src/js/index.js"
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ \"./src/js/style.css\");\n/* harmony import */ var _Trello__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Trello */ \"./src/js/Trello.js\");\n\n\nconst board = document.getElementById('board');\nnew _Trello__WEBPACK_IMPORTED_MODULE_1__.Trello(board);\n\n//# sourceURL=webpack://trello/./src/js/index.js?\n}");

/***/ },

/***/ "./src/js/storage.js"
/*!***************************!*\
  !*** ./src/js/storage.js ***!
  \***************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   loadState: () => (/* binding */ loadState),\n/* harmony export */   saveState: () => (/* binding */ saveState)\n/* harmony export */ });\nconst STORAGE_KEY = 'trello-board';\nconst loadState = () => {\n  const saved = localStorage.getItem(STORAGE_KEY);\n  if (saved) {\n    return JSON.parse(saved);\n  }\n  return {\n    columns: [{\n      id: 'todo',\n      title: 'TODO',\n      cards: [{\n        id: '1',\n        text: 'Welcome to Trello!'\n      }, {\n        id: '2',\n        text: 'This is a card.'\n      }, {\n        id: '3',\n        text: 'Click on a card to see what\\'s behind it.'\n      }, {\n        id: '4',\n        text: 'You can attach pictures and files...'\n      }]\n    }, {\n      id: 'inprogress',\n      title: 'IN PROGRESS',\n      cards: [{\n        id: '5',\n        text: 'Drag people onto a card to indicate that they\\'re responsible for it.'\n      }, {\n        id: '6',\n        text: 'Use color-coded labels for organization'\n      }, {\n        id: '7',\n        text: 'Make as many lists as you need!'\n      }]\n    }, {\n      id: 'done',\n      title: 'DONE',\n      cards: [{\n        id: '8',\n        text: 'Finished with a card? Archive it.'\n      }, {\n        id: '9',\n        text: 'Try dragging cards anywhere.'\n      }, {\n        id: '10',\n        text: 'To learn more tricks, check out the guide.'\n      }]\n    }]\n  };\n};\nconst saveState = state => {\n  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));\n};\n\n//# sourceURL=webpack://trello/./src/js/storage.js?\n}");

/***/ },

/***/ "./node_modules/css-loader/dist/cjs.js!./src/js/style.css"
/*!****************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/js/style.css ***!
  \****************************************************************/
(module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;\n  background: #0079bf;\n  padding: 20px;\n  min-height: 100vh;\n}\n\n.board {\n  display: flex;\n  gap: 20px;\n  align-items: flex-start;\n  overflow-x: auto;\n  padding: 10px;\n}\n\n.column {\n  background: #ebecf0;\n  border-radius: 8px;\n  width: 280px;\n  min-width: 280px;\n  padding: 10px;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n\n.column-header {\n  font-weight: 600;\n  font-size: 14px;\n  padding: 8px;\n  color: #172b4d;\n}\n\n.cards-container {\n  min-height: 100px;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n.card {\n  background: white;\n  border-radius: 4px;\n  padding: 8px;\n  box-shadow: 0 1px 0 rgba(0,0,0,0.1);\n  cursor: grab;\n  position: relative;\n  word-break: break-word;\n}\n\n.card:active {\n  cursor: grabbing;\n}\n\n.card:hover .delete-card {\n  display: block;\n}\n\n.delete-card {\n  display: none;\n  position: absolute;\n  top: 4px;\n  right: 8px;\n  color: #6b778c;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: bold;\n}\n\n.delete-card:hover {\n  color: #172b4d;\n}\n\n.add-card-btn {\n  background: transparent;\n  border: none;\n  padding: 8px;\n  text-align: left;\n  color: #5e6c84;\n  cursor: pointer;\n  border-radius: 4px;\n  font-size: 14px;\n}\n\n.add-card-btn:hover {\n  background: rgba(0,0,0,0.1);\n  color: #172b4d;\n}\n\n.card-form {\n  background: white;\n  border-radius: 4px;\n  padding: 8px;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n.card-form textarea {\n  width: 100%;\n  border: 1px solid #e6e9f0;\n  border-radius: 4px;\n  padding: 8px;\n  resize: vertical;\n  font-family: inherit;\n  font-size: 14px;\n}\n\n.card-form textarea:focus {\n  outline: none;\n  border-color: #0079bf;\n}\n\n.card-form-buttons {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n}\n\n.card-form-buttons button {\n  background: #0079bf;\n  color: white;\n  border: none;\n  padding: 6px 12px;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 14px;\n}\n\n.card-form-buttons button:hover {\n  background: #026aa7;\n}\n\n.card-form-buttons .cancel-btn {\n  background: transparent;\n  color: #6b778c;\n  cursor: pointer;\n  padding: 6px;\n}\n\n.card-form-buttons .cancel-btn:hover {\n  background: rgba(0,0,0,0.1);\n  color: #172b4d;\n}`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://trello/./src/js/style.css?./node_modules/css-loader/dist/cjs.js\n}");

/***/ },

/***/ "./node_modules/css-loader/dist/runtime/api.js"
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
(module) {

eval("{\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = [];\n\n  // return the list of modules as css string\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n      content += cssWithMappingToString(item);\n      if (needLayer) {\n        content += \"}\";\n      }\n      if (item[2]) {\n        content += \"}\";\n      }\n      if (item[4]) {\n        content += \"}\";\n      }\n      return content;\n    }).join(\"\");\n  };\n\n  // import a list of modules into the list\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n    var alreadyImportedModules = {};\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n      list.push(item);\n    }\n  };\n  return list;\n};\n\n//# sourceURL=webpack://trello/./node_modules/css-loader/dist/runtime/api.js?\n}");

/***/ },

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js"
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
(module) {

eval("{\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://trello/./node_modules/css-loader/dist/runtime/noSourceMaps.js?\n}");

/***/ },

/***/ "./src/js/style.css"
/*!**************************!*\
  !*** ./src/js/style.css ***!
  \**************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./style.css */ \"./node_modules/css-loader/dist/cjs.js!./src/js/style.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://trello/./src/js/style.css?\n}");

/***/ },

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
(module) {

eval("{\n\nvar stylesInDOM = [];\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n  return result;\n}\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n    identifiers.push(identifier);\n  }\n  return identifiers;\n}\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n  return updater;\n}\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n    var newLastIdentifiers = modulesToDom(newList, options);\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n      var _index = getIndexByIdentifier(_identifier);\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://trello/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?\n}");

/***/ },

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js"
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
(module) {

eval("{\n\nvar memo = {};\n\n/* istanbul ignore next  */\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target);\n\n    // Special case to return head of iframe instead of iframe itself\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n    memo[target] = styleTarget;\n  }\n  return memo[target];\n}\n\n/* istanbul ignore next  */\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n  target.appendChild(style);\n}\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://trello/./node_modules/style-loader/dist/runtime/insertBySelector.js?\n}");

/***/ },

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js"
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
(module) {

eval("{\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://trello/./node_modules/style-loader/dist/runtime/insertStyleElement.js?\n}");

/***/ },

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

eval("{\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://trello/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?\n}");

/***/ },

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js"
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
(module) {

eval("{\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n  var needLayer = typeof obj.layer !== \"undefined\";\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n  css += obj.css;\n  if (needLayer) {\n    css += \"}\";\n  }\n  if (obj.media) {\n    css += \"}\";\n  }\n  if (obj.supports) {\n    css += \"}\";\n  }\n  var sourceMap = obj.sourceMap;\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  }\n\n  // For old IE\n  /* istanbul ignore if  */\n  options.styleTagTransform(css, styleElement, options.options);\n}\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n  styleElement.parentNode.removeChild(styleElement);\n}\n\n/* istanbul ignore next  */\nfunction domAPI(options) {\n  if (typeof document === \"undefined\") {\n    return {\n      update: function update() {},\n      remove: function remove() {}\n    };\n  }\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://trello/./node_modules/style-loader/dist/runtime/styleDomAPI.js?\n}");

/***/ },

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js"
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
(module) {

eval("{\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://trello/./node_modules/style-loader/dist/runtime/styleTagTransform.js?\n}");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/index.js");
/******/ 	
/******/ })()
;