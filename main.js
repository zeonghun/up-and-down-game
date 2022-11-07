// 랜덤번호 지정
// 유저가 번호를 입력하고 go 버튼을 누름
// 유저가 랜덤번호를 맞추면 '맞추셨습니다!!!' 출력
// 랜덤번호 > 유저번호: up 출력
// 랜덤번호 < 유저번호: down 출력
// reset 버튼을 누르면 게임 리셋
// 5번의 기회를 모두 쓰면 게임 종료 (추측 불가, 버튼 disable)
// 유저가 1~100 범위 밖의 숫자를 입력하면 알려줌 (기회 줄지 않음)
// 유저가 이미 입력한 숫자를 다시 입력하면 알려줌 (기회 줄지 않음)

let computerNum = 0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chanceArea = document.getElementById("chance-area");
let chance = 5;
let gameOver = false;
let history = []; // 유저가 입력한 숫자 리스트

playButton.addEventListener("click", play); // 버튼을 클릭했을 때, play 함수 호출
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", function () {
  userInput.value = "";
});

function pickRandomNum() {
  computerNum = Math.floor(Math.random() * 100) + 1;
  console.log("정답", computerNum);
}

function play() {
  let userValue = userInput.value;
  if (userValue < 1 || userValue > 100) {
    resultArea.textContent = "1과 100사이 숫자를 입력해주세요!";
    return;
  }

  if (history.includes(userValue)) {
    resultArea.textContent =
      "이미 입력한 숫자입니다. 다른 숫자를 입력해주세요!";
    return;
  }

  chance--;
  chanceArea.textContent = `남은 기회: ${chance}번`;
  if (userValue < computerNum) {
    resultArea.textContent = "Up!!!";
  } else if (userValue > computerNum) {
    resultArea.textContent = "Down!!!";
  } else {
    resultArea.textContent = "맞추셨습니다!!!";
    gameOver = true;
  }

  history.push(userValue);

  if (chance == 0) {
    gameOver = true;
  }
  if (gameOver == true) {
    playButton.disabled = true;
  }
}

function reset() {
  userInput.value = "";
  pickRandomNum();
  resultArea.textContent = "1~100 숫자를 맞춰보세요!";
  gameOver = false;
  playButton.disabled = false;
  chance = 5;
  chanceArea.innerHTML = `남은 기회: ${chance}번`;
  history = [];
}

pickRandomNum();
