

// ===================== 開關 add book 表單 ========================

const dialog = document.querySelector("dialog");
const showButton = document.querySelector(".add_btm_block");
const closeButton = document.querySelector(".close_btm");

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
    dialog.showModal();
});

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
    dialog.close();
});


