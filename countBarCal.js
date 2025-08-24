import { myLibrary } from './data_build.js';




const count_bar = document.querySelector('.count_bar');

function upDateCountBar() {


    // -------- 總數計算 --------
    const totalNum = myLibrary.getBooksCount();
    const total_num_Element = count_bar.querySelector('.total_num');
    total_num_Element.textContent = totalNum;

    // -------- READ 計算 --------
    const readNum = Object.values(myLibrary.bookShelf).filter(book => book.progress === 'READ').length;
    const read_num_Element = count_bar.querySelector('.read_num');
    read_num_Element.textContent = readNum;

    // -------- READING 計算 --------
    const readingNum = Object.values(myLibrary.bookShelf).filter(book => book.progress === 'READING').length;
    const reading_num_Element = count_bar.querySelector('.reading_num');
    reading_num_Element.textContent = readingNum;

    // -------- UNREAD 計算 --------
    const unreadNum = Object.values(myLibrary.bookShelf).filter(book => book.progress === 'UNREAD').length;
    const unread_num_Element = count_bar.querySelector('.unread_num');
    unread_num_Element.textContent = unreadNum;

    // console.log(`Object.values(myLibrary) ${Object.values(myLibrary)}`);

    // console.log(`unreadNum ${unreadNum}`);
}


// -------- 等到 DOM 完全下載完畢，這樣可以確保 myLibrary 已經生成完了，在開始執行計算 -----
document.addEventListener('DOMContentLoaded', () => {

    // setTimeout(upDateCountBar, 1000);

    upDateCountBar();
});




export { upDateCountBar };