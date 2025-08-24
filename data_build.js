const myLibrary = (function () {
    // 這些變數現在是 IIFE 的私有變數，無法從外部直接存取
    let bookIDList = []; //書的 ID 清單列表
    let bookShelf = {}; // 書庫：實際存放每本書物件的物件


    /*------------------ constructor & prototype --------------*/
    function Book(bookName, author, numOfPages, descript, rating, progress) {
        // the constructor...// 書本的建構函數
        if (!new.target) {
            throw Error("You must use the 'new' operator to add Book; 必須使用 new 來新增書");
        }

        this.bookID = crypto.randomUUID(); //書本的唯一ID
        // this.IDListIndex = 0;// 書本在 bookIDList 的index，便於後續使用IDList

        this.bookName = bookName;//書名
        this.author = author;//作者
        this.progress = progress;//閱讀進度
        this.rating = rating;//評分
        this.numOfPages = numOfPages;//頁數
        this.descript = descript;//描述
    }

    // 書本的原型設定：新增 getBookName
    // Book.prototype.getBookName = function () {
    //     return this.bookName;
    // }

    /*------------------ ADD Book --------------*/
    function addBook(bookName, author, numOfPages, descript, rating, progress) {

        //------------創建新書
        const newBook = new Book(bookName, author, numOfPages, descript, rating, progress);

        //------------新書存入書架物件
        // 以 ID 為key，在書架物件中存入新屬性：也就是書物件
        // 使用方括號，將 UUID 作為鍵，並將書存入書庫
        // 取key值是變數的內容的話，要記得用[key]來取得屬性的value，直接用obj.key，會變成新增key是變數名稱的屬性
        bookShelf[newBook.bookID] = newBook;


        // 指定 IDListIndex 到書物件中
        newBook.IDListIndex = bookIDList.length;

        // 新書ID存入ID清單的最後一個
        bookIDList.push(newBook.bookID);
    }

    /*------------------ REMOVE Book --------------*/
    function removeBookByID(BookID) {

        const bookIindex = bookIDList.indexOf(BookID)

        if (bookIindex == -1) { //如果要移除的 ID 大不在清單內
            console.log(`No BookID "${BookID}" in List`);
            return;
        }

        else {
            delete bookShelf[BookID];
            bookIDList.splice(bookIindex, 1);
        }
    }
    function removeALLBook() {
        if (bookIDList.length != 0 && bookShelf != {}) {

            for (const key in bookShelf) {
                if (Object.prototype.hasOwnProperty.call(bookShelf, key)) {
                    delete bookShelf[key];
                }
            }

            bookIDList.length = 0;

        }
        else {
            return;
        }

    }


    /*------------------ 資料介面 --------------*/

    function getIndexByID(BookID) {
        const bookIindex = bookIDList.indexOf(BookID)

        if (bookIindex == -1) { //如果要移除的 ID 大不在清單內
            console.log(`No BookID "${BookID}" in List`);
            return;
        }
        else {
            return bookIindex;
        }

    }
    function getBookByID(id) {
        return bookShelf[id];
    }
    function getBookByIndex(Index) {
        return getBookByID(bookIDList[Index]);
    }

    // 只公開你希望外部使用的介面
    return {
        bookShelf: bookShelf,//################################r檢查用###############################
        bookIDList: bookIDList,
        addBook: addBook,
        removeBookByID: removeBookByID,
        removeALLBook: removeALLBook,
        getBookByID: getBookByID,
        getBookByIndex: getBookByIndex,
        getIndexByID: getIndexByID,
        getBooksCount: () => bookIDList.length
    };
})();


export {
    myLibrary
};





/*

import { newBookCard_DOM_Prefabricated, putNewBookCard_Prefab_On_DOM } from './addBook_&_removeBook.js'
for (let index = 0; index < 1; index++) {
    defule_book(index, "author", 100, "descript", 5, "READING");
}

function defule_book(bookName, author, numOfPages, descript, rating, progress) {

    // add Book 到資料庫物件
    myLibrary.addBook(bookName, author, numOfPages, descript, rating, progress);
    // console.log(myLibrary.getBooksCount());


    //===================  物件渲染到畫面 add TO DOM ===================
    // renderNewBookCards_insertFirst(myLibrary);

    const Prefab = newBookCard_DOM_Prefabricated(bookName, author, numOfPages, descript, rating, progress);
    putNewBookCard_Prefab_On_DOM(Prefab);


    
};
*/



//################################r檢查用###############################
// console.log(myLibrary.bookShelf);
// console.log(myLibrary.bookIDList);
// console.log(myLibrary.bookIDList.length);
// console.log(myLibrary.getBooksCount());
//################################r檢查用###############################
