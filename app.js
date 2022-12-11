const ajax = new XMLHttpRequest();
const newsURL = 'https://api.hnpwa.com/v0/news/1.json'
ajax.open('GET',newsURL,false);
ajax.send();

const newsFeed = JSON.parse(ajax.response)

const root = document.querySelector('.root')
const ul = document.createElement('ul')

for(let i=0;i<10;i++){
    
    const li = document.createElement('li')
    li.innerHTML=`${newsFeed[i].title}`
    ul.appendChild(li)

}

root.appendChild(ul)