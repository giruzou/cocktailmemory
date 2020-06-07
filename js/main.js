(function () {
    "use strict";

    var pairs = 2;
    var cards = [];
    var flipCount = 0;
    var firstCard = null;
    var secondCard = null;

    var startTime;
    var isRunning = false;
    var correctCount = 0;
    var timeoutId;

    //組み合わせたいもの書いてください
    //dotinstallで教えてもらったコードの分析↓
    //cocktailsで、正解の配列を作っている。
    var cocktails = [
        ["トマトジュース", "ウォッカ"], // ["ウォッカ", "トマトジュース"]の順番でもOKです
        ["ルジェカシス", "オレンジジュース"], // ["オレンジジュース", "ルジェカシス"]の順番でもOKです
        ["ピーチツリー", "ソーダ"],
    ];

    function init() {
        // var i;
        var card;
        // for (i = 1; i <= pairs; i++) {
        cocktails.forEach(function (drinks) {
            drinks.forEach(function (drink) {
                cards.push(createCard(drink));
            });
        });
        //cards.push(createCard("トマトジュース"));
        //cards.push(createCard("ウォッカ"));
        //cards.push(createCard("ルジェカシス"));
        //cards.push(createCard("オレンジジュース"));
        // document.getElementById('stage').appendChild(createCard('トマトジュース'));
        // document.getElementById('stage').appendChild(createCard('ウォッカ'));
        // document.getElementById('stage').appendChild(createCard('ルジェカシス'));
        // document.getElementById('stage').appendChild(createCard('オレンジジュース'));
        // document.getElementById('stage').appendChild(createCard('ピーチツリー'));
        // document.getElementById('stage').appendChild(createCard('ソーダ'));
        // }
        while (cards.length) {
            card = cards.splice(Math.floor(Math.random() * cards.length), 1)[0];
            document.getElementById("stage").appendChild(card);
        }
    }

    function createCard(num) {
        var container;
        var card;
        var inner;
        inner = '<div class="card-front">' + num + '</div><div class="card-back">?</div>';
        card = document.createElement("div");
        card.innerHTML = inner;
        card.className = "card";
        card.addEventListener("click", function () {
            flipCard(this);
            if (isRunning === true) {
                return;
            }

            isRunning = true;
            startTime = Date.now();
            runTimer();
            document.getElementById('restart').className = '';
        });
        container = document.createElement("div");
        container.className = "card-container";
        container.appendChild(card);
        return container;
    }

    function flipCard(card) {
        if (firstCard !== null && secondCard !== null) {
            return;
        }
        if (card.className.indexOf('open') !== -1) {
          return;
        }
        card.className = "card open";
        flipCount++;
        if (flipCount % 2 === 1) {
            firstCard = card;
        } else {
            secondCard = card;
            secondCard.addEventListener("transitionend", check);
        }
    }

    function check() {
        cocktails.some(function (drinks) {
            if (drinks.indexOf(firstCard.children[0].textContent.trim()) >= 0 && drinks.indexOf(secondCard.children[0].textContent.trim()) >= 0) {
                firstCard.className = "card open";
                secondCard.className = "card open";
                alert("カクテル成功");
                correctCount++;
                return true;
            } else {
                firstCard.className = "card";
                secondCard.className = "card";
            }
        });
        secondCard.removeEventListener("transitionend", check);
        firstCard = null;
        secondCard = null;
        // 成功した数とカクテルの数が一緒の時
        // タイマーを削除
        if (correctCount === cocktails.length) {
            clearTimeout(timeoutId);
        }
    }

    function runTimer() {
        document.getElementById("score").textContent = ((Date.now() - startTime) / 1000).toFixed(2);
        // タイマーをセット
        timeoutId = setTimeout(function () {
            runTimer();
        }, 10);
    }

    init();
})();
