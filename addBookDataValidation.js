
/*=================================== 其他輸入格式驗證 =========================================*/

document.addEventListener('DOMContentLoaded', function () {

    const add_book_name_Element = document.getElementById('add_book_name');

    const add_book_nameSpan = document.querySelector('#add_book_name ~ span');

    const add_book_author_Element = document.getElementById('add_book_author');

    const add_book_authorSpan = document.querySelector('#add_book_author ~ span');

    const add_book_pages_Element = document.getElementById('add_book_pages');

    const add_book_pagesSpan = document.querySelector('#add_book_pages ~ span');

    const add_book_descript_Element = document.getElementById('add_book_descript');

    const add_book_descriptSpan = document.querySelector('#add_book_descript ~ span');


    // 監聽輸入事件  輸入就監聽

    add_book_name_Element.addEventListener('input', () => {
        checkValidity(add_book_name_Element, add_book_nameSpan, "書名");
    });


    add_book_author_Element.addEventListener('input', () => {
        checkValidity(add_book_author_Element, add_book_authorSpan, "作者");
    });


    add_book_pages_Element.addEventListener('input', () => {
        checkValidity(add_book_pages_Element, add_book_pagesSpan, "頁數");
    });


    add_book_descript_Element.addEventListener('input', () => {
        checkValidity(add_book_descript_Element, add_book_descriptSpan, "簡介");
    });

    
});



// 提交時統一監聽，統一驗證輸入
function addBookForm_submitValidity() {

    const add_book_name_Element = document.getElementById('add_book_name');
    const add_book_nameSpan = document.querySelector('#add_book_name ~ span');

    const add_book_author_Element = document.getElementById('add_book_author');
    const add_book_authorSpan = document.querySelector('#add_book_author ~ span');

    const add_book_pages_Element = document.getElementById('add_book_pages');
    const add_book_pagesSpan = document.querySelector('#add_book_pages ~ span');

    const add_book_descript_Element = document.getElementById('add_book_descript');
    const add_book_descriptSpan = document.querySelector('#add_book_descript ~ span');

    const book_name_Validity_flag = checkValidity(add_book_name_Element, add_book_nameSpan, "書名");
    const book_author_Validity_flag = checkValidity(add_book_author_Element, add_book_authorSpan, "作者");
    const book_pages_Validity_flag = checkValidity(add_book_pages_Element, add_book_pagesSpan, "頁數");
    const book_descript_Validity_flag = checkValidity(add_book_descript_Element, add_book_descriptSpan, "簡介");


    //若是提交成功，資料送出後，清除驗證提示
    if (book_name_Validity_flag && book_author_Validity_flag && book_pages_Validity_flag && book_descript_Validity_flag) {


        //欄位內容會在外面重置
        // add_book_name_Element.value = '';
        // add_book_author_Element.value = '';
        // add_book_pages_Element.value = '';
        // add_book_descript_Element.value = '';

        add_book_nameSpan.textContent ="";
        add_book_authorSpan.textContent ="";
        add_book_pagesSpan.textContent ="";
        add_book_descriptSpan.textContent ="";


        // console.log("提交驗證成功");

        return true;
    }
    else {
        // console.log("提交驗證失敗");
        return false;
    }
}



function checkValidity(Input, span, str) {
    span.textContent = ""; // 先清空所有訊息，以避免錯誤殘留

    if (Input.validity.valid) {// 如果有效，不需要任何提示
        span.textContent = str + "ok!";
        span.style.color = "rgba(155, 207, 135, 1)";

        return true;
    }

    else {
        span.style.color = "rgba(245, 118, 118, 1)";
        const validityState = Input.validity;

        if (validityState.valueMissing) {
            span.textContent = str + " 為必填！";
        }

        else if (validityState.typeMismatch) {
            span.textContent = str + " 輸入格式不符！";
        }
        // else if (validityState.patternMismatch) {
        //     span.textContent = str + " 須至少2字元";
        // }
        else if (validityState.tooShort) {
            span.textContent = str + " 至少需2字元";
        }
        else if (validityState.tooLong) {
            span.textContent = str + " 不得多於200字";
        }
        else if (validityState.rangeUnderflow) {
            span.textContent = "只有一頁的不算書吧！";
        }
        else {
            span.textContent = str + " 格式不符！";
        }


        return false;
    }
}


export { addBookForm_submitValidity };
