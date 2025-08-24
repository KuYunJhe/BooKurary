import { myLibrary } from './data_build.js';
import { addBookForm_submitValidity } from './addBookDataValidation.js';
import { upDateCountBar } from './countBarCal.js';
import { addProgressBtmListener, resetFormProgressBtmStatus } from './progressBtmCtrl.js';
import { addStartSetListener, resetFormStarStatus } from './starSetCrlt.js';



// ===================== add book 到資料庫 ========================
// 取得表單元素
const form = document.getElementById('form_add_book_form');

// 監聽表單的送出事件
form.addEventListener('submit', function (event) {


    // 阻止表單的預設送出行為
    event.preventDefault();

    //送出表單時，進行所有輸入項的驗證
    const passValidity = addBookForm_submitValidity();


    // 如果通過驗證，開始在 DOM 和 資料庫 加入新書
    if (passValidity) {


        // ========= formData 是自動蒐集表單資料的暫存容器 ========================
        // 創建一個 FormData 物件，傳入表單元素
        const formData = new FormData(form);
        // 將 FormData 轉成純JS物件
        const formDataObject = Object.fromEntries(formData.entries());
        // =========================================================




        // ======== 把 add Book 表單資料，送進資料庫物件 ===============
        newBookCard_Sand_Data_To_myLibrary(formDataObject.add_bookName, formDataObject.add_author, formDataObject.add_numOfPages, formDataObject.add_descript, formDataObject.add_rating, formDataObject.add_progress);
        // =========================================================



        // ===== 製作 DOM 預製件，並放置到主 DOM 樹 ===========

        // 製作預製件
        const Prefab = newBookCard_DOM_Prefabricated(formDataObject.add_bookName, formDataObject.add_author, formDataObject.add_numOfPages, formDataObject.add_descript, formDataObject.add_rating, formDataObject.add_progress);
        // 放置預製件到主 DOM 樹
        putNewBookCard_Prefab_On_DOM(Prefab);

        // =================================================



        // =================== 清空表單，元件狀態還原 ========
        form.reset();
        resetFormProgressBtmStatus();
        resetFormStarStatus();
        // ===============================================


        // ==== 更新 count_bar 顯示數值 =========
        upDateCountBar();
        // ====================================





        //################################r檢查用###############################
        // console.log(myLibrary.bookShelf);
        // console.log(myLibrary.bookIDList);
        // console.log(myLibrary.bookIDList.length);
        // console.log(myLibrary.getBooksCount());
        //################################r檢查用###############################



    }

});



function newBookCard_Sand_Data_To_myLibrary(
    add_bookName,
    add_author,
    add_numOfPages,
    add_descript,
    add_rating,
    add_progress) {
    myLibrary.addBook(
        add_bookName,
        add_author,
        add_numOfPages,
        add_descript,
        add_rating,
        add_progress);
}

function newBookCard_DOM_Prefabricated(add_bookName, add_author, add_numOfPages, add_descript, add_rating, add_progress) {
    // ---- 製作 新書卡片的 預製件 --------------------------------------------------




    // ---- 獲得預製件模板
    const template = document.getElementById('book_card_template');


    // ---- 以模板的取得預製件(新物件)
    const Prefab_card = template.content.cloneNode(true);


    // ---- 更新預製件內元素內容
    const Prefab_bookCardElement = Prefab_card.querySelector('.book_card');
    const Prefab_bookNameElement = Prefab_card.querySelector('.book_name_title');
    const Prefab_bookAuthorElement = Prefab_card.querySelector('.book_author_context');
    const Prefab_bookRatingStar_set = Prefab_card.querySelector('.star_set');
    const Prefab_bookProgressBtm = Prefab_card.querySelector('.progress_btm');


    // ---- 更新預製件內元素內容，更新文字部分
    Prefab_bookNameElement.textContent = add_bookName;
    Prefab_bookAuthorElement.textContent = add_author;
    Prefab_bookCardElement.id = myLibrary.getBookByIndex(myLibrary.getBooksCount() - 1).bookID;
    // ID 由資料庫端自動產生，因此要從 myLibrary 資料庫來拿，其他資訊從表單端傳遞的
    // 另外 progress 和 RatingStar 兩項，由監聽器運作



    // ---- 互動元素監聽器 --------------------------------------------------------


    // ----> 新增的卡片上，掛上閱讀進度按鈕的監聽器 ---------------------
    addProgressBtmListener(Prefab_bookProgressBtm, add_progress);

    // ----> 新增的卡片上，掛上評分星星按鈕的監聽器 ---------------------
    addStartSetListener(Prefab_bookRatingStar_set, add_rating);

    // ----> 新增的卡片上，掛上刪除按鈕的監聽器 -------------------------
    const bookRemoveBtm = Prefab_card.querySelector('.book_remove_mark');
    bookRemoveBtm.addEventListener("click", removeBookCard);



    return Prefab_card;
}

function putNewBookCard_Prefab_On_DOM(Prefab) {

    // ---- 把 新書卡片的 預製件，放到主 DOM 樹上 --------------------------------------------------


    // ---- 獲得新書的 DOM ，要放在的父元素(書架元素)
    const container = document.getElementById('book_shelf');

    // ---- 建立一個暫存容器 DocumentFragment，用於暫時存放所有新增的卡片(可一次放入多個預製件)
    const fragment = document.createDocumentFragment();

    // ---- 將新的卡片添加到暫存容器
    fragment.appendChild(Prefab);

    // ---- 獲取暫存容器的第一個子元素
    const firstChild = container.firstChild;

    // ---- 如父元素容器(書架元素)，裡已經有子元素，將文檔片段插入到它前面
    if (firstChild) { container.insertBefore(fragment, firstChild); }

    // ---- 如父元素容器(書架元素)裡還沒有子元素，直接將暫存容器整個，加到父元素容器
    else { container.appendChild(fragment); }

}


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ===================== remove book DOM & DATA ========================
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function removeBookCard(removeBtm_event) {


    // 取得按鈕的父元素（也就是.book_card)
    const card = removeBtm_event.target.closest('.book_card');


    if (card) {

        // ------------ remove DOM ------------

        // 呼叫父元素的 remove() 方法，將整張卡片從 DOM 中移除，配合移除動畫效果
        // 1. 新增 class 來觸發過渡效果
        card.classList.add('book_card_remove-animation');

        // 2. 監聽過渡結束事件。'transitionend' 事件在任何 CSS 過渡完成後都會觸發
        card.addEventListener('transitionend', () => {

            // 3. 動畫結束後，真正移除元素，包含他的監聽器、子元素、子元素的監聽器
            card.remove();
            // console.log(`### removeBookCard -- ID: ${card.id}`)
        }, { once: true });



        // ------------ remove DATA ------------
        myLibrary.removeBookByID(card.id);



        // ------------更新 count_bar 顯示數值 ------------
        upDateCountBar();
    }
    //################################r檢查用###############################
    // console.log(myLibrary.bookShelf);
    // console.log(myLibrary.bookIDList);
    // console.log(myLibrary.bookIDList.length);
    // console.log(`** 資料庫內剩餘book數量 :${myLibrary.getBooksCount()}`);
    //################################r檢查用###############################


}



// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ===================== remove ALL book DOM & DATA ========================
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const delete_ALL_bookCard_DO = (function delete_ALL_bookCard() {
    const remove_all_Button = document.getElementById("remove_all_btm");
    remove_all_Button.addEventListener("click", () => {

        const book_shelf_Element = document.getElementById('book_shelf');
        const elementsToRemove = book_shelf_Element.querySelectorAll('.book_card');


        // ------------ 逐個移除卡片 DOM ------------
        elementsToRemove.forEach(card => {


            card.classList.add('book_card_remove-animation'); // 1. 新增 class 來觸發過渡效果
            card.addEventListener('transitionend', () => { // 2. 監聽過渡結束事件。'transitionend' 事件在任何 CSS 過渡完成後都會觸發
                card.remove(); // 3. 動畫結束後，真正移除元素，包含他的監聽器、子元素、子元素的監聽器
                // console.log(`### removeBookCard -- ID: ${card.id}`)
            }, { once: true });
        });


        // ------------ remove DATA ------------
        myLibrary.removeALLBook();


        // ------------更新 count_bar 顯示數值 ------------
        upDateCountBar();


        //################################r檢查用###############################
        // console.log(myLibrary.bookShelf);
        // console.log(myLibrary.bookIDList);
        // console.log(myLibrary.bookIDList.length);
        // console.log(`** 資料庫內剩餘book數量 :${myLibrary.getBooksCount()}`);
        //################################r檢查用###############################

    });
})();


export { removeBookCard };
export { newBookCard_DOM_Prefabricated, putNewBookCard_Prefab_On_DOM };

