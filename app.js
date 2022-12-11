const ajax = new XMLHttpRequest();
const newsURL = 'https://api.hnpwa.com/v0/news/1.json'
const contentURL = `https://api.hnpwa.com/v0/item/@id.json`
ajax.open('GET',newsURL,false);
ajax.send();

const newsFeed = JSON.parse(ajax.response)

const root = document.querySelector('.root')
const ul = document.createElement('ul')

for(let i=0;i<10;i++){
    const a = document.createElement('a')
    const li = document.createElement('li')
    a.setAttribute('href',`${newsFeed.id}`)
    li.appendChild(a)
    a.innerHTML=`${newsFeed[i].title} (${newsFeed[i].comments_count})`
    ul.appendChild(li)

}

root.appendChild(ul)