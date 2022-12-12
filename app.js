const ajax = new XMLHttpRequest();
const newsURL = 'https://api.hnpwa.com/v0/news/1.json'
const contentURL = `https://api.hnpwa.com/v0/item/@id.json`

function network(url){
    ajax.open('GET',url,false);
    ajax.send();
    return JSON.parse(ajax.response)
}

const newsFeed = network(newsURL)
const root = document.querySelector('.root')
const content = document.createElement('div')

window.addEventListener('hashchange',()=>{
    const id = location.hash.slice(1)
    const newsContent = network(contentURL.replace('@id',id))
    

    root.innerHTML=`
    <h1>${newsContent.title}</h1>
    <div>
    <a href="/">목록으로</a>
    </div>
    `;


    
    
})

const newsList = []
newsList.push('<ul>')
for(let i=0;i<10;i++){
    newsList.push(
    `
    <li>
    <a href="#${newsFeed[i].id}">
    ${newsFeed[i].title} (${newsFeed[i].comments_count})
    </a>
    `)
}
newsList.push('</ul>')


root.innerHTML = newsList.join('')
