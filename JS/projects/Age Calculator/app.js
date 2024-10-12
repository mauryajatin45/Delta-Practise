let click = document.querySelector('#date')
let ShowDate = document.querySelector('#ShowDate')
let ShowMonth = document.querySelector('#ShowMonth')
let ShowYear = document.querySelector('#ShowYear')

click.addEventListener('change', () => {

    let date = document.querySelector('#date');
    let GivenDate = date.valueAsDate.getDate();
    let GivenMonth = date.valueAsDate.getMonth();
    let GivenYear = date.valueAsDate.getFullYear();
    console.log("Value Changed");

    const CurrentTime = new Date();
    let TodayDate = CurrentTime.getDate();
    let TodayMonth = CurrentTime.getMonth();
    let TodayYear = CurrentTime.getFullYear();

    let AnswerDate = (GivenDate - TodayDate);
    let AnswerMonth = (GivenMonth - TodayMonth);
    let AnswerYear = (GivenYear - TodayYear);

    ShowDate.innerText = `Date  =  ${Math.abs(AnswerDate)}`;
    ShowMonth.innerText = `Month  =  ${Math.abs(AnswerMonth)}`;
    ShowYear.innerText = `Year  =  ${Math.abs(AnswerYear)}`;
})

