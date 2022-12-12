const ajax = new XMLHttpRequest();
const newsURL = 'https://api.hnpwa.com/v0/news/1.json'
const contentURL = `https://api.hnpwa.com/v0/item/@id.json`

const root = document.querySelector('.root')
const content = document.createElement('div')
const store = {
    currentPage : 1,
    feeds:[],
}
function network(url){
    ajax.open('GET',url,false);
    ajax.send();
    return JSON.parse(ajax.response)
}
function getNewsList(){
    let newsFeed = store.feeds;
    if(newsFeed.length === 0 ){
        newsFeed = store.feeds = makeFeed(network(newsURL))
    }
    const newsList = []
    let template = `
    <div class="container">
        <h1>Hacker News</h1>
        <ul>
            {{__news_feed__}}
        </ul>
        <div>
            <a href="#/page/{{__prev_page__}}">이전페이지</a>
            <a href="#/page/{{__next_page__}}">다음페이지</a>
        </div>
    </div>
    `
    
    for(let i=(store.currentPage - 1)*10;i<store.currentPage * 10;i++){
        newsList.push(
        `
        <li>
        <a href="#/show/${newsFeed[i].id}">
        ${newsFeed[i].title} (${newsFeed[i].comments_count}) ${newsFeed[i].read ? '읽음':'안읽음'}
        </a>
        `)
    }
    template = template.replace('{{__news_feed__}}',newsList.join(''))
    template = template.replace('{{__prev_page__}}',store.currentPage ===1 ? store.currentPage : store.currentPage - 1)
    template = template.replace('{{__next_page__}}',store.currentPage ===3 ? store.currentPage : store.currentPage + 1)

    root.innerHTML = template
}
function makeFeed(feeds){
    for(let i = 0; i<feeds.length ; i++){
        feeds[i].read = false;
    }
    return feeds;
}

function getNewsPage(){
    const id = location.hash.slice(7)
    const newsContent = network(contentURL.replace('@id',id))
    let template = `
    <div>${newsContent.title}</div>
    <div class="news-content">${newsContent.content}</div>
    <div>{{__comments__}}</div>
    <a href="#/page/${store.currentPage}">목록으로</a>
    `
    for( let i = 0; i< store.feeds.length; i++){
        if (store.feeds[i].id === +id){
            store.feeds[i].read = true;
            break;
        }
    }
    function readComment(comments,called = 0){
        const commentString =[];
        for ( let i =0 ; i< comments.length;i++){
            commentString.push(`
                <div class='comment' style="padding-left:${called*20}px">
                ${comments[i].user}
                ${comments[i].content}
                </div>
            `)
            if(comments[i].comments.length > 0 ){
                commentString.push(readComment(comments[i].comments,called + 1))
                
                
            }
        }
        return commentString.join('')
    }
    
    root.innerHTML=template.replace('{{__comments__}}',readComment(newsContent.comments))
}
function router (){
    const routeCode = location.hash
    if(routeCode === ''){
        getNewsList()
    }else if(routeCode.indexOf('#/page/') >= 0){
        store.currentPage = +routeCode.slice(7)
        getNewsList()
    }else{
        getNewsPage()

    }
}
window.addEventListener('hashchange',router)

router()



