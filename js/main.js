'use strict'

{

  //必要な要素を取得
  const question = document.getElementById('question')
  const choices = document.getElementById('choices')
  const btn = document.getElementById('btn')
  //結果を表示
  const result = document.getElementById('result')
  //scoreを表示する領域
  const scoreLabel = document.querySelector('#result > p')

  // クイズのデータはオブジェクトの配列で持っておく
  //この中で正解が必ず最初の要素、つまりインデックスが 0 番目の要素になるようなルールにしておきましょう。
  const quizSet = shuffle([ //shuffleを適用した
    { q: 'What is A?', c: ['A0', 'A1', 'A2'] },
    { q: 'What is B?', c: ['B0', 'B1', 'B2'] },
    { q: 'What is C?', c: ['C0', 'C1', 'C2'] },
  ])

  //今何問目のクイズを解いているかを変数で持っておきましょう。
  //currentNum という変数名で、最初はインデックスが 0 のクイズから始めたいので 0 としてあげれば OK です。
  let currentNum = 0

  //解答状況を管理する
  let isAnswered

  //正答数を管理したいので score という変数を定義
  let score = 0
  //正解したときに＋＋とする


  //選択肢のシャッフルを処理
  //shuffle() という関数を作って、引数に配列を渡したら、その配列をシャッフルして返してあげる、と書いていく
  function shuffle(arr) {
    //シャッフルの最初のセットで、配列全体の中からランダムに要素を選んで、それを最後の要素と入れ替えてあげれる　

    //最後の要素のindex（順番）を取得した
    //let i = arr.length - 1; //lengthは1から始まる

    //範囲の中からランダムに選ぶ要素のインデックスを取得した
    //const j = Math.floor(Math.random() * (i + 1))
    //[arr[j], arr[i]] = [arr[i], arr[j]]

    //i を 1 ずつ前にずらしながらループ処理をしたいので、こちらをカットしてあげて for 文で囲っていきましょう。

    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr; //シャッフルされた配列を返す
  }

  //判定の処理をしていく　
  function checkaAnsewer(li) {
    if (isAnswered === true) {
      return
      //returnでこれ以降の処理は停止する
      //もし、isAnswered === true（回答したことあるなら）それ以降の処理をしないよということ
      //一つの選択肢をクリックした時点で、sAnswered === trueになり、そこから他の選択肢をクリックしてもこのif文により処理が中断される
    }
    isAnswered = true
    if (li.textContent === quizSet[currentNum].c[0]) {
      //選択肢の０番目は正解にしといた
      li.classList.add('correct')
      score++
    } else {
      li.classList.add('wrong')
    }
    //選択肢を選んだら、次に行くために、ボタンから disabled クラスを外して青いボタンになるようにしていきましょう。
    btn.classList.remove('disabled')
  }

  //画面描画の処理は関数にまとめておきましょう。
  function setQuiz() {
    isAnswered = false

    //回答の選択肢を表示する前に、一度全部の選択肢を消してあげましょう。
    while (choices.firstChild) {
      choices.removeChild(choices.firstChild)
    }
    //選択肢を表示する前に実行しているので、初期状態は問題ない

    //問題文をセット
    question.textContent = quizSet[currentNum].q

    //選択肢のシャッフルを実行し、帰ってきた配列をshuffledChoicesに経代入
    const shuffledChoices = shuffle([...quizSet[currentNum].c])

    //選択肢をセット（配列からループで値を取得する）
    shuffledChoices.forEach(choice => {
      //choiceにはシャッフルされた選択肢の配列が帰ってくる
      const li = document.createElement('li')
      li.textContent = choice
      //選択肢をクリックしたときの処理
      li.addEventListener('click', () => {
        checkaAnsewer(li)
      })
      choices.appendChild(li)
    })

    //最後の問題になったとき、nextボタンの文字を変える
    if (currentNum === quizSet.length - 1) {
      btn.textContent = 'スコアを見る'
    }

    console.log(quizSet[currentNum].c)
    //配列やオブジェクトを引数にすると、値のコピーが関数に渡されるのではなくて参照が渡されるので、渡した引数を関数の中で書き換えてしまうと、引数にした大元の配列も書き換えられてしまう
    //よって大本の配列も変更されてしまう
    //そのため、スプレッド演算子を利用
  }
  setQuiz()


  //next ボタンを押したときの処理
  btn.addEventListener('click', () => {
    if (btn.classList.contains('disabled')) {
      return;　//これでnext ボタン連打を阻止している
      //returnでこれ以降の処理は停止する
    }
    //選択肢をクリックした時点でdisabledクラスは外される
    //nextボタンでdisabledクラスはつけられる
    btn.classList.add('disabled')//灰色のボタン

    //最後の問題を答えたとき
    if (currentNum === quizSet.length - 1) {
      scoreLabel.textContent = `${score}/${quizSet.length}`
      result.classList.remove('hidden')
    } else {
      currentNum++
      setQuiz()
    }
    //Next ボタンを押すと…、次の問題が出たのですが、前の問題の選択肢が残ってしまっているので
    //setQuiz() で回答の選択肢を表示する前に、一度全部の選択肢を消してあげましょう。
    //どうするかというと、 choices の最初の子要素がある限り choices の最初の子要素を消す、というテクニックがよく使われます。
  })
}
