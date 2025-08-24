import { myLibrary } from './data_build.js';
import { upDateCountBar } from './countBarCal.js';



// ========================= 「添加新書表單」 的 星星 加監聽===========================

resetFormStarStatus();

function resetFormStarStatus() {
    // 獲得「添加新書表單」、表單的評分星星ser、和每一個星星
    const form = document.getElementById('form_add_book_form');
    const form_star_set = form.querySelector('.star_set');
    addStartSetListener(form_star_set, 1);
}


// ========================= star_set 監聽器，及監聽器上附掛的 star_set 主控===========================

// 表單或書架上的書本卡片，都有可能會送 star_set 進來
function addStartSetListener(star_set, rating_score) {

    const star_1 = star_set.querySelector('.star_1');
    const star_2 = star_set.querySelector('.star_2');
    const star_3 = star_set.querySelector('.star_3');
    const star_4 = star_set.querySelector('.star_4');
    const star_5 = star_set.querySelector('.star_5');

    star_1.removeEventListener('click', setStarStatus);
    star_2.removeEventListener('click', setStarStatus);
    star_3.removeEventListener('click', setStarStatus);
    star_4.removeEventListener('click', setStarStatus);
    star_5.removeEventListener('click', setStarStatus);

    star_1.addEventListener('click', setStarStatus);
    star_2.addEventListener('click', setStarStatus);
    star_3.addEventListener('click', setStarStatus);
    star_4.addEventListener('click', setStarStatus);
    star_5.addEventListener('click', setStarStatus);


    function setStarStatus(starEvent) {

        const star = starEvent.target;


        if (star.classList.contains('star_1')) {

            rating_score = 1;
        }

        else if (star.classList.contains('star_2')) {

            rating_score = 2;
        }

        else if (star.classList.contains('star_3')) {

            rating_score = 3;
        }

        else if (star.classList.contains('star_4')) {

            rating_score = 4;
        }

        else if (star.classList.contains('star_5')) {

            rating_score = 5;
        }


        // 依照新值，更新外觀
        RatingDisplayChange(star_set, rating_score);

        // 改值(資料庫 或 表單填寫值)
        snadRatingValue(star_set, rating_score);
    }

    // 依照目前值，先更新一次外觀，單純改外觀
    RatingDisplayChange(star_set, rating_score);
}

function RatingDisplayChange(star_set, rating_score) {

    const star_1 = star_set.querySelector('.star_1');
    const star_2 = star_set.querySelector('.star_2');
    const star_3 = star_set.querySelector('.star_3');
    const star_4 = star_set.querySelector('.star_4');
    const star_5 = star_set.querySelector('.star_5');

    if (rating_score == 1) {
        star_1.classList.add('starOn');
        star_2.classList.remove('starOn');
        star_3.classList.remove('starOn');
        star_4.classList.remove('starOn');
        star_5.classList.remove('starOn');
    }

    else if (rating_score == 2) {
        star_1.classList.add('starOn');
        star_2.classList.add('starOn');
        star_3.classList.remove('starOn');
        star_4.classList.remove('starOn');
        star_5.classList.remove('starOn');
    }

    else if (rating_score == 3) {
        star_1.classList.add('starOn');
        star_2.classList.add('starOn');
        star_3.classList.add('starOn');
        star_4.classList.remove('starOn');
        star_5.classList.remove('starOn');
    }

    else if (rating_score == 4) {
        star_1.classList.add('starOn');
        star_2.classList.add('starOn');
        star_3.classList.add('starOn');
        star_4.classList.add('starOn');
        star_5.classList.remove('starOn');
    }

    else if (rating_score == 5) {
        star_1.classList.add('starOn');
        star_2.classList.add('starOn');
        star_3.classList.add('starOn');
        star_4.classList.add('starOn');
        star_5.classList.add('starOn');
    }



}

// 把評分星星評分數，送到資料庫對應的書物件上，或表單的輸入項的輸入值
function snadRatingValue(star_set, rating_score) {


    // ----  如果星星所在，是書架上的書本卡片 
    // ----> 改資料庫的書物件的對應資料
    const book_card = star_set.closest('.book_card');

    if (book_card) {
        myLibrary.getBookByID(book_card.id).rating = rating_score;
    }

    // ----  如果星星所在，是新增書的表單
    // ----> 改資料庫輸入框的輸入內容
    const form_rating_item = star_set.closest('.book_rating_form_item');

    if (form_rating_item) {
        const add_book_rating_Input_Element = form_rating_item.querySelector('#add_book_rating');
        add_book_rating_Input_Element.value = rating_score;
    }


    //################################r檢查用###############################
    // console.log(`${rating_score}`);
    // console.log(myLibrary.bookShelf);
    // console.log(myLibrary.bookIDList);
    // console.log(myLibrary.bookIDList.length);
    // console.log(myLibrary.getBooksCount());
    //################################r檢查用###############################

    // -------------- 更新 count_bar 顯示數值 --------------
    upDateCountBar();
}



export { addStartSetListener, resetFormStarStatus };