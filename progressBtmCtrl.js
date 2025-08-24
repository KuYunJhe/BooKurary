import { myLibrary } from './data_build.js';
import { upDateCountBar } from './countBarCal.js';



// ========================= 「添加新書表單」 的 progressBtm 加監聽===========================

resetFormProgressBtmStatus();

function resetFormProgressBtmStatus() {
    // 獲得「添加新書表單」、表單的閱讀進度按鈕、進度按鈕的文字
    const form = document.getElementById('form_add_book_form');
    const progressBtm = form.querySelector('.progress_btm');
    addProgressBtmListener(progressBtm, "UNREAD");
}



// ========================= Progress Btm 監聽器，及監聽器上附掛的按鈕主控===========================

// 表單或書架上的書本卡片，都有可能會送 progressBtm 進來
function addProgressBtmListener(progressBtm, value) {


    progressBtm.removeEventListener('click', setProgressStatus);
    progressBtm.addEventListener('click', setProgressStatus);

    function setProgressStatus(progressBtm_event) {

        // 不直接用 progressBtm_event.target ，而是加上 closest，避免按到的是 span
        const progressBtm = progressBtm_event.target.closest('.progress_btm');


        // 循環輪換按鈕的值

        if (value === "UNREAD") {
            value = "READING";
        }

        else if (value === "READING") {
            value = "READ";
        }

        else if (value === "READ") {
            value = "UNREAD";
        }

        // 依照新值，更新外觀
        progressBtmDisplayChange(progressBtm, value);

        // 改值(資料庫 或 表單填寫值)
        snadProgressValue(progressBtm, value);
    }
    // 依照目前值，先更新一次外觀，單純改外觀
    progressBtmDisplayChange(progressBtm, value);

}

function progressBtmDisplayChange(progressBtm, value) {

    const progress_btm_span = progressBtm.querySelector('.progress_btm_span');

    // 循環輪換按鈕顯示文字及顏色，以及變換 input 表格資料

    if (value === "UNREAD") {
        progress_btm_span.textContent = "UNREAD";
        progressBtm.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
    }

    else if (value === "READING") {
        progress_btm_span.textContent = "READING";
        progressBtm.style.backgroundColor = "rgba(161, 134, 42, 0.5)";
    }

    else if (value === "READ") {
        progress_btm_span.textContent = "READ";
        progressBtm.style.backgroundColor = "rgba(115, 165, 61, 0.5)";
    }
}

function snadProgressValue(progressBtm, value) {


    // 如果進 度按鈕 所在，是書架上的書本卡片 --> 改資料庫的書物件的對應資料
    const card = progressBtm.closest('.book_card');
    if (card) {
        myLibrary.getBookByID(card.id).progress = value;
    }


    // 如果 進度按鈕 所在，是新增書的表單 --> 改資料庫輸入框的輸入內容
    const Reading_Progress_form_item = progressBtm.closest('.Reading_Progress_btm_form_item');
    if (Reading_Progress_form_item) {
        const Reading_Progress_Input_Element = Reading_Progress_form_item.querySelector('#add_reading_progress');
        Reading_Progress_Input_Element.value = value;
    }

    //################################r檢查用###############################
    // console.log(`${value}`);
    // console.log(myLibrary.bookShelf);
    // console.log(myLibrary.bookIDList);
    // console.log(myLibrary.bookIDList.length);
    // console.log(myLibrary.getBooksCount());
    //################################r檢查用###############################

    // -------------- 更新 count_bar 顯示數值 --------------
    upDateCountBar();
}

export { addProgressBtmListener, resetFormProgressBtmStatus };