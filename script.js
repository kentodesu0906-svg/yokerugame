// ========================================
// モンスターアドベンチャー
// ========================================


// ========================================
// プレイヤー
// ========================================

let playerX = 155;

let playerY = 155;

let player =
  document.getElementById("player");

let message =
  document.getElementById("message");


// ========================================
// バトル画面
// ========================================

let battle =
  document.getElementById("battle");

let enemyBattleMonster =
  document.getElementById(
    "enemyBattleMonster"
  );

let enemyName =
  document.getElementById(
    "enemyName"
  );

let enemyBattleHp =
  document.getElementById(
    "enemyBattleHp"
  );

let myBattleMonster =
  document.getElementById(
    "myBattleMonster"
  );

let myBattleName =
  document.getElementById(
    "myBattleName"
  );

let myBattleLevel =
  document.getElementById(
    "myBattleLevel"
  );

let myBattleHp =
  document.getElementById(
    "myBattleHp"
  );

let expText =
  document.getElementById(
    "expText"
  );


// ========================================
// バトルボタン
// ========================================

let fightButton =
  document.getElementById(
    "fightButton"
  );

let specialButton =
  document.getElementById(
    "specialButton"
  );

let healButton =
  document.getElementById(
    "healButton"
  );

let catchButton =
  document.getElementById(
    "catchButton"
  );

let runButton =
  document.getElementById(
    "runButton"
  );


// ========================================
// チーム
// ========================================

let team =
  document.getElementById("team");

let bookText =
  document.getElementById(
    "bookText"
  );

let myMonsterText =
  document.getElementById(
    "myMonster"
  );


// ========================================
// クリア画面
// ========================================

let clearScreen =
  document.getElementById(
    "clearScreen"
  );

let restartButton =
  document.getElementById(
    "restartButton"
  );


// ========================================
// モンスター
// ========================================

let monsters = [

  {
    emoji: "🐲",
    name: "ドラコ",
    attack: 22
  },

  {
    emoji: "🦊",
    name: "コンコン",
    attack: 20
  },

  {
    emoji: "🐸",
    name: "ケロリン",
    attack: 16
  },

  {
    emoji: "🐯",
    name: "トラボー",
    attack: 24
  },

  {
    emoji: "👾",
    name: "バグン",
    attack: 15
  },

  {
    emoji: "👹",
    name: "オニオニ",
    attack: 18
  }

];


// ========================================
// バトルのデータ
// ========================================

let inBattle = false;

let monsterHp = 100;

let enemyMaxHp = 100;

let enemyAttack = 15;

let enemyIsBoss = false;


// ========================================
// 自分のモンスター
// ========================================

let caughtMonsters = [];

let myMonster = null;

let myMonsterMaxHp = 100;

let myMonsterHp = 100;

let myMonsterAttack = 20;

let myLevel = 1;

let myExp = 0;

let nextExp = 100;


// ========================================
// 森を歩く
// ========================================

function move(x, y) {

  // バトル中は動けない

  if (inBattle) {

    return;

  }


  playerX =
    playerX + x;

  playerY =
    playerY + y;


  // 壁

  if (playerX < 0) {

    playerX = 0;

  }


  if (playerX > 310) {

    playerX = 310;

  }


  if (playerY < 0) {

    playerY = 0;

  }


  if (playerY > 310) {

    playerY = 310;

  }


  // プレイヤーを動かす

  player.style.left =
    playerX + "px";

  player.style.top =
    playerY + "px";


  // 20%の確率で敵

  if (Math.random() < 0.20) {

    startBattle();

  }

}


// ========================================
// バトル開始
// ========================================

function startBattle() {

  inBattle = true;


  // 5%でボス

  if (Math.random() < 0.05) {

    startBossBattle();

    return;

  }


  // ふつうのモンスター

  let number =
    Math.floor(
      Math.random() *
      monsters.length
    );


  let enemy =
    monsters[number];


  enemyBattleMonster.textContent =
    enemy.emoji;

  enemyName.textContent =
    enemy.name;


  enemyMaxHp =
    100 +
    myLevel * 10;


  monsterHp =
    enemyMaxHp;


  enemyAttack =
    enemy.attack +
    myLevel;


  enemyIsBoss = false;


  updateEnemyHp();


  // はじめてならドラコ

  if (myMonster === null) {

    myMonster = "🐲";

  }


  myBattleMonster.textContent =
    myMonster;

  myBattleName.textContent =
    myMonster;


  updateMyStatus();


  battle.style.display =
    "block";


  message.textContent =
    "😱 " +
    enemy.name +
    "があらわれた！";

}


// ========================================
// ボス
// ========================================

function startBossBattle() {

  enemyIsBoss = true;


  enemyBattleMonster.textContent =
    "👑";

  enemyName.textContent =
    "キングドラゴン";


  enemyMaxHp =
    300 +
    myLevel * 30;


  monsterHp =
    enemyMaxHp;


  enemyAttack =
    30 +
    myLevel * 2;


  updateEnemyHp();


  if (myMonster === null) {

    myMonster = "🐲";

  }


  myBattleMonster.textContent =
    myMonster;

  myBattleName.textContent =
    myMonster;


  updateMyStatus();


  battle.style.display =
    "block";


  message.textContent =
    "👑 キングドラゴンがあらわれた！！";

}


// ========================================
// 自分のステータス
// ========================================

function updateMyStatus() {

  myBattleLevel.textContent =
    "LV：" +
    myLevel;


  myBattleHp.textContent =
    "HP：" +
    myMonsterHp +
    " / " +
    myMonsterMaxHp;


  expText.textContent =
    "⭐ EXP：" +
    myExp +
    " / " +
    nextExp;

}


// ========================================
// 敵HP
// ========================================

function updateEnemyHp() {

  enemyBattleHp.textContent =
    "HP：" +
    monsterHp +
    " / " +
    enemyMaxHp;

}


// ========================================
// こうげき
// ========================================

fightButton.addEventListener(
  "click",
  function() {

    if (!inBattle) {

      return;

    }


    let damage =
      Math.floor(
        Math.random() *
        myMonsterAttack
      ) + 5;


    monsterHp =
      monsterHp - damage;


    if (monsterHp < 0) {

      monsterHp = 0;

    }


    updateEnemyHp();


    message.textContent =
      "⚔️ " +
      damage +
      "ダメージ！";


    if (monsterHp === 0) {

      winBattle();

      return;

    }


    enemyMonsterAttack();

  }
);


// ========================================
// ひっさつ
// ========================================

specialButton.addEventListener(
  "click",
  function() {

    if (!inBattle) {

      return;

    }


    let damage =
      Math.floor(
        Math.random() * 40
      ) + 20;


    monsterHp =
      monsterHp - damage;


    if (monsterHp < 0) {

      monsterHp = 0;

    }


    updateEnemyHp();


    message.textContent =
      "✨ ひっさつ！ " +
      damage +
      "ダメージ！！";


    if (monsterHp === 0) {

      winBattle();

      return;

    }


    enemyMonsterAttack();

  }
);


// ========================================
// かいふく
// ========================================

healButton.addEventListener(
  "click",
  function() {

    if (!inBattle) {

      return;

    }


    let heal =
      Math.floor(
        Math.random() * 25
      ) + 10;


    myMonsterHp =
      myMonsterHp + heal;


    if (
      myMonsterHp >
      myMonsterMaxHp
    ) {

      myMonsterHp =
        myMonsterMaxHp;

    }


    updateMyStatus();


    message.textContent =
      "❤️ " +
      heal +
      "かいふくした！";


    enemyMonsterAttack();

  }
);


// ========================================
// つかまえる
// ========================================

catchButton.addEventListener(
  "click",
  function() {

    if (!inBattle) {

      return;

    }


    // ボスはつかまえられない

    if (enemyIsBoss) {

      message.textContent =
        "👑 ボスはつかまえられない！";

      enemyMonsterAttack();

      return;

    }


    let chance = 0.30;


    // HPがへるほどつかまえやすい

    if (
      monsterHp <=
      enemyMaxHp * 0.5
    ) {

      chance = 0.70;

    }


    if (
      monsterHp <=
      enemyMaxHp * 0.2
    ) {

      chance = 1.00;

    }


    if (Math.random() < chance) {

      let caught =
        enemyBattleMonster.textContent;


      caughtMonsters.push(
        caught
      );


      myMonster =
        caught;


      myMonsterMaxHp =
        100 +
        (myLevel - 1) * 20;


      myMonsterHp =
        myMonsterMaxHp;


      myMonsterAttack =
        20 +
        (myLevel - 1) * 5;


      showMyMonster();


      message.textContent =
        "🎉 " +
        caught +
        "をつかまえた！！";


      endBattle();

    }

    else {

      message.textContent =
        "😱 つかまらなかった！";


      enemyMonsterAttack();

    }

  }
);


// ========================================
// にげる
// ========================================

runButton.addEventListener(
  "click",
  function() {

    if (!inBattle) {

      return;

    }


    if (enemyIsBoss) {

      message.textContent =
        "👑 ボスからはにげられない！";


      enemyMonsterAttack();

      return;

    }


    if (Math.random() < 0.8) {

      message.textContent =
        "🏃 にげた！";


      endBattle();

    }

    else {

      message.textContent =
        "😱 にげられない！";


      enemyMonsterAttack();

    }

  }
);


// ========================================
// 敵のこうげき
// ========================================

function enemyMonsterAttack() {

  let damage =
    Math.floor(
      Math.random() *
      enemyAttack
    ) + 5;


  myMonsterHp =
    myMonsterHp - damage;


  if (myMonsterHp < 0) {

    myMonsterHp = 0;

  }


  updateMyStatus();


  message.textContent =
    "👹 てきのこうげき！ " +
    damage +
    "ダメージ！";


  if (myMonsterHp === 0) {

    message.textContent =
      "💀 モンスターがたおれた……";


    endBattle();

  }

}


// ========================================
// 勝利
// ========================================

function winBattle() {

  // ボス

  if (enemyIsBoss) {

    message.textContent =
      "🏆 キングドラゴンをたおした！！";


    endBattle();


    setTimeout(
      function() {

        clearScreen.style.display =
          "block";

      },
      1000
    );


    return;

  }


  // EXP

  let getExp = 40;


  myExp =
    myExp + getExp;


  message.textContent =
    "🎉 かった！ EXP +" +
    getExp;


  checkLevelUp();


  updateMyStatus();


  showMyMonster();


  endBattle();

}


// ========================================
// レベルアップ
// ========================================

function checkLevelUp() {

  while (
    myExp >= nextExp
  ) {

    myExp =
      myExp - nextExp;


    myLevel =
      myLevel + 1;


    nextExp =
      nextExp + 50;


    myMonsterMaxHp =
      100 +
      (myLevel - 1) * 20;


    myMonsterHp =
      myMonsterMaxHp;


    myMonsterAttack =
      20 +
      (myLevel - 1) * 5;


    message.textContent =
      "✨ レベルアップ！！ " +
      "LV " +
      myLevel;

  }

}


// ========================================
// バトル終了
// ========================================

function endBattle() {

  inBattle = false;


  setTimeout(
    function() {

      battle.style.display =
        "none";

    },
    900
  );

}


// ========================================
// チームを表示
// ========================================

function showMyMonster() {

  bookText.textContent =
    "つかまえた：" +
    caughtMonsters.length +
    "ひき";


  team.innerHTML = "";


  caughtMonsters.forEach(
    function(monsterName, index) {

      let button =
        document.createElement(
          "button"
        );


      button.className =
        "teamMonster";


      button.textContent =
        monsterName;


      button.addEventListener(
        "click",
        function() {

          selectMonster(index);

        }
      );


      team.appendChild(
        button
      );

    }
  );


  if (myMonster === null) {

    myMonsterText.textContent =
      "まだモンスターがいないよ！";

  }

  else {

    myMonsterText.textContent =
      "⭐ いま使う：" +
      myMonster +
      "　LV：" +
      myLevel;

  }

}


// ========================================
// モンスターをえらぶ
// ========================================

function selectMonster(index) {

  myMonster =
    caughtMonsters[index];


  myMonsterMaxHp =
    100 +
    (myLevel - 1) * 20;


  myMonsterHp =
    myMonsterMaxHp;


  myMonsterAttack =
    20 +
    (myLevel - 1) * 5;


  showMyMonster();


  message.textContent =
    "⭐ " +
    myMonster +
    "をえらんだ！";

}


// ========================================
// 上
// ========================================

document
  .getElementById("up")
  .addEventListener(
    "click",
    function() {

      move(0, -30);

    }
  );


// ========================================
// 下
// ========================================

document
  .getElementById("down")
  .addEventListener(
    "click",
    function() {

      move(0, 30);

    }
  );


// ========================================
// 左
// ========================================

document
  .getElementById("left")
  .addEventListener(
    "click",
    function() {

      move(-30, 0);

    }
  );


// ========================================
// 右
// ========================================

document
  .getElementById("right")
  .addEventListener(
    "click",
    function() {

      move(30, 0);

    }
  );


// ========================================
// パソコンの矢印キー
// ========================================

document.addEventListener(
  "keydown",
  function(event) {

    if (event.key === "ArrowUp") {

      move(0, -30);

    }


    if (event.key === "ArrowDown") {

      move(0, 30);

    }


    if (event.key === "ArrowLeft") {

      move(-30, 0);

    }


    if (event.key === "ArrowRight") {

      move(30, 0);

    }

  }
);


// ========================================
// もういちど
// ========================================

restartButton.addEventListener(
  "click",
  function() {

    location.reload();

  }
);


// ========================================
// 最初
// ========================================

showMyMonster();