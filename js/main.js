'use strict'

{

  //必要な要素を取得
  const question = document.getElementById('question')
  const choices = document.getElementById('choices')
  const btn = document.getElementById('btn')

  // クイズのデータはオブジェクトの配列で持っておく
  //この中で正解が必ず最初の要素、つまりインデックスが 0 番目の要素になるようなルールにしておきましょう。
  const quizSet = [
    { q: 'What is A?', c: ['A0', 'A1', 'A2'] },
    { q: 'What is B?', c: ['B0', 'B1', 'B2'] },
    { q: 'What is C?', c: ['C0', 'C1', 'C2'] },
  ]


  //今何問目のクイズを解いているかを変数で持っておきましょう。
  //currentNum という変数名で、最初はインデックスが 0 のクイズから始めたいので 0 としてあげれば OK です。
  let currentNum = 0

  //問題文をセット
  question.textContent = quizSet[currentNum].q

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

  //選択肢のシャッフルを実行し、帰ってきた配列をshuffledChoicesに経代入
  const shuffledChoices = shuffle([...quizSet[currentNum].c])

  //選択肢をセット（配列からループで値を取得する）
  shuffledChoices.forEach(choice => {
    //choiceにはシャッフルされた選択肢の配列が帰ってくる
    const li = document.createElement('li')
    li.textContent = choice
    choices.appendChild(li)
  })

  console.log(quizSet[currentNum].c)
  //配列やオブジェクトを引数にすると、値のコピーが関数に渡されるのではなくて参照が渡されるので、渡した引数を関数の中で書き換えてしまうと、引数にした大元の配列も書き換えられてしまう
  //よって大本の配列も変更されてしまう
  //そのため、スプレッド演算子を利用

}
