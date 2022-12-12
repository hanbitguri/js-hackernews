const ajax = new XMLHttpRequest();
const newsURL = 'https://api.hnpwa.com/v0/news/1.json'
const contentURL = `https://api.hnpwa.com/v0/item/@id.json`
const content = document.createElement('div')

function network(url){
    ajax.open('GET',url,false);
    ajax.send();
    return JSON.parse(ajax.response)
}
const newsFeed = network(newsURL)

const root = document.querySelector('.root')
const ul = document.createElement('ul')

window.addEventListener('hashchange',()=>{
    const id = location.hash.slice(1)
    const newsContent = network(contentURL.replace('@id',id))
    
    root.innerHTML=''
    const title = document.createElement('h1')
    title.innerHTML=newsContent.title
    content.appendChild(title)
    root.appendChild(content)
})

for(let i=0;i<10;i++){
    const a = document.createElement('a')
    const li = document.createElement('li')
    a.href=`#${newsFeed[i].id}`;

    li.appendChild(a)
    a.innerHTML=`${newsFeed[i].title} (${newsFeed[i].comments_count})`
    ul.appendChild(li)

}

root.appendChild(ul)
