//משתנים גלובלים- משתנים אלה גלובלים מכיוון שאנו משתמשות בהן בקוד במספר פונקציות שונות
var drinkType = ""; // משתנה ריק לשמירת ה id של האלוכוהול 
var decorateType = ""; // משתנה ריק לשמירת ה id של הקישוט הנבחר
var allTopings = []; //מערך ריק שישמור את כל הערכים שהמשתמש בחר בתוספות
var allSnaks = []; // מערך ריק שישמור את כל הערכים שהמשתמש בחר בנשנושים
var userName = ""; // משתנה ריק לשמירת השמות שיוזנו בתיבת הטקסט

//פונקציה ש"מאזינה" לתיבת טקסט - וכל פעם שמתבע בה שינוי על ידי המשתמש היא מפעילה את פונקציה checkFileds
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('userNames').addEventListener('input', checkFileds);
});

// פונקציה המקבלת את שורת האלמנט שהמשתמש לחץ עליה מבחירת המשקה אלכוהול והקישוט הרצוי - radio
function handleRadio(element) {
    if (element.id == 'aprol' || element.id == 'margrita' || element.id == 'mohito' || element.id == 'gin' ) {
        //שמירת ה id של האלמנט שנבחר בקוקטיל
        drinkType = element.id;
    } else {
        //שמירת ה id של האלמנט שנבחר בקישוט
        decorateType = element.id;
    }
    // שמירת משתנה לאלמנט שיש לו class imgShow
    var imgToHide = document.getElementsByClassName('imgShow');
    // בדיקה האם אורך המערך גדול מ-0. הכוונה שיש ערך כזה עם class של imgShow. כדי למחוק את התמונה הקודמת שהמשתמש בחר. 
    if (imgToHide.length > 0) {
        //מחיקת ה class מהאלמנט כדי שהעיצוב לא יחול עליו יותר
        imgToHide[0].classList.remove('imgShow');
    }
    //יצירת משתנה חדש לשמירת התמונה שנרצה להציג
    var imgToShow = "";
    // בדיקה האם המשתמש סימן סוג אלכוהול וקישוט או רק סוג אלכוהול. בבחירת קישוט בלבד לא יוצג למשתמש תמונה
    if (decorateType == "") {
        // התמונה שתופיע תהיה תמונה שה id שלה שווה לשם ה id של התגית שנבחרה + img 
        imgToShow = document.getElementById(drinkType + 'Img');
    } else {
        // התמונה שתופיע ה id שלה שווה ל id של האלכוהול שבחר פלוס ה id של הקישוט שבחר
        imgToShow = document.getElementById(drinkType + decorateType);
        // בודק האם המשתמש לא בחר אלכוהול - במידה וכן יוצא מהפונקציה
        if (imgToShow == null) {
            return;
        }
    }
    // הוספה של class לתמונה עם ה id המתאים כדי שתוצג למשתמש
    imgToShow.classList.add('imgShow');
    //מעבר לפונקציה שבודקת האם כל השדות הוזנו 
    checkFileds();
}

function changeColor(element) {
    var selectedImg = document.getElementById(element.id + 'Img');
    // בודק האם המשתמש לחץ על האלמנט לבחירה או ביטול בחירה 
    if (element.checked) {// המשתמש בחר באלמנט
        // הוספת class לתגית שנבחרה כדי שהגדרות העיצוב יחולו עליה
        selectedImg.classList.add('FullColor');
        if (element.id == 'ice' || element.id == 'lemon' || element.id == 'orange' || element.id == 'mint') {
            // הוספת הערך למערך ששומר את בחירות המשתמש בתוספות
            allTopings[allTopings.length] = " " + document.getElementById(element.id).value;
        } else {
            // הוספת הערך למערך ששומר את בחירות המשתמש בנשנושים
            allSnaks[allSnaks.length] = " " + document.getElementById(element.id).value;
        }      
    } else { // המשתמש ביטל בחירה של האלמנט
        if (element.id == 'ice' || element.id == 'lemon' || element.id == 'orange' || element.id == 'mint') {
            // לולאה שבודקת איזה מהבחירות של המשתמש בוטלו כדי להסירו מהמערך של התוספות
            for (var i = 0; i < allTopings.length; i++) {
                if (allTopings[i] == " " + document.getElementById(element.id).value) {
                    // עדכון המערך על ידי עריכתו ללא התא במערך שרוצים להוריד
                    allTopings = allTopings.slice(0, i).concat(allTopings.slice(i + 1));
                }
            }
        } else {
            // לולאה שבודקת איזה מהבחירות של המשתמש בוטלו כדי להסירו מהמערך של הנשנושים
            for (var i = 0; i < allSnaks.length; i++) {
                if (allSnaks[i] == " " + document.getElementById(element.id).value) {
                    // עדכון המערך על ידי עריכתו ללא התא במערך שרוצים להוריד
                    allSnaks = allSnaks.slice(0, i).concat(allSnaks.slice(i + 1));
                }
            }
        }  
        //הסרה של ה class מהתגית שהבחירה שלה בוטלה
        selectedImg.classList.remove('FullColor');
    }
    //מעבר לפונקציה שבודקת האם כל השדות הוזנו
    checkFileds();
}

// פונקציה ששומרת את מה שהוזן בתיבת הטקסט (שם המשתמש) ובודקת האם כל הערכים הוזנו
function checkFileds() {
    // שמירה של הזנת השמות של המשתמש
    userName = document.getElementById('userNames').value;
    // שמירה האלמנט של הכפתור סיכום
    var btn = document.getElementById('sumBtn');
    //בדיקה האם כל השדות הוזנו
    if (decorateType != "" && drinkType != "" && allSnaks.length > 0 && allTopings.length > 0 && userName != "") {
        // הוספה של class לכפתור כדי שהגדרות העיצוב שלו ישתנו לפעיל
        btn.classList.add('openBtn');
        // הפעלת האפשרות ללחוץ על הכפתו ולהפעיל את הפונקציה שמסכמת את ההזמנה
        btn.disabled = false;
    } else {
        // הורדת ה class כדי שהכפתור יראה לא פעיל מבחינה עיצובית
        btn.classList.add('openBtn');
        // סגירת האפשרות ללחוץ על הכפתור ולהפעיל את הפונקציה שמסכמה את ההזמנה
        btn.disabled = true;
    }
}

// פונקציה שמופעלת על ידי לחיצה על הכפתור - מבצעת הדפסה של סיכום ההזמנה
function sumOrder() {
    // שמירת האלמנט של סיכום ההזמנה
    var sumDiv = document.getElementById('printSum');
    // הוספת class לאלמנט כדי שההגדרות עיצוב יופעלו ויופיעו
    sumDiv.classList.add('openDiv');
    // הדפסה של הסיכום למשתמש
    document.getElementById('printSum').innerHTML = userName + " מזל טוב! </br>" + "איזה כיף שבחרתם את הקוקטיל לחתונה שלכם! </br> " + "<b>סיכום הזמנה:</b></br>" + " אלכוהול: " + document.getElementById(drinkType).value + "</br>" + " קישוט: " + document.getElementById(decorateType).value + "</br>" + "תוספות:" + allTopings + "</br>" + "נשנושים:" + allSnaks;
}