const tagsEl = document.getElementById('tags')
const textarea = document.getElementById('textarea')

textarea.focus() // 화면 진입시 textarea에 입력준비가 되어짐

textarea.addEventListener('keyup', (e) => { // keyup : 누른 키에서 손 떼면 실행
    createTags(e.target.value)

    if(e.key === 'Enter') {
        setTimeout(() => {
            e.target.value =''
        }, 10)

        randomSelect()
    }
})

function createTags(input){
    const tags = input.split(',').filter(tag => tag.trim()
    !== '').map(tag => tag.trim())

    tagsEl.innerHTML = ''

    tags.forEach(tag => {
        const tagEl = document.createElement('span')
        tagEl.classList.add('tag')
        tagEl.innerText = tag
        tagsEl.appendChild(tagEl)
    })
}

function randomSelect() {
    const times = 30

    const interval = setInterval(() => {
        const randomTag = pickRandomTag()

        highlightTag(randomTag)

        setTimeout(() => {
            unhighlightTag(randomTag)
        }, 100)
    }, 100);

    setTimeout(() => {
        clearInterval(interval)

        setTimeout(() => {
            const randomTag = pickRandomTag()

            highlightTag(randomTag)
        }, 100)
    }, times * 100) // 그냥 times만 놓으면 매우 느림
} 

function pickRandomTag() {
    const tags = document.querySelectorAll('.tag')
    return tags[Math.floor(Math.random() * tags.length)]
} // Math.random() 은 0~1 까지의 무작위 숫자를 반환하고
  // Math.floor()은 주어진 숫자와 같거나 작은 정수를 반환한다.
  // Ex : Math.floor(1.2) = 1
// 따라서 tags.length가 3이라고 할 때, pickRandomTag()의 반환 값은 0 ~ 2다.
// 그리하여 Random한 Tag를 반환하여 나중에 highlight할 때 사용할 수 있는 것이다.


function highlightTag(tag) {
    tag.classList.add('highlight')
}

function unhighlightTag(tag) {
    tag.classList.remove('highlight')
}