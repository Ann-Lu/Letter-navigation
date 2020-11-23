const lastLi = $('.siteList').find('li.last');
const x = localStorage.getItem('x');
const xObject = JSON.parse(x);
const hashMap = xObject || [{
        logo: 'A',
        // logotype: 'text',
        url: 'https://www.acfun.cn'
    },
    {
        logo: 'B',
        // logotype: 'image',
        url: 'https://www.bilibili.com'
    }
]
const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '')
}
const render = () => {
    $('.siteList').find('li:not(.last)').remove();
    hashMap.forEach((node, index) => {
        // console.log(index)
        const site = $(`
        <li class="site">
        <div class="logo">${(node.logo)}</div>
        <div class="link">${simplifyUrl(node.url)}</div>
        <div class=close>
            <svg class="icon" >
                <use xlink:href="#icon-close"></use>
            </svg>
        </div>
        </li>`).insertBefore(lastLi);
        site.on('click', () => {
            window.open(node.url)
        });
        site.on('click', '.close', (e) => {
            e.stopPropagation();
            hashMap.splice(index, 1);
            render();
        });
    })

}

render();
// console.log(jQuery)
$('.addButton').on('click', () => {
    let url = window.prompt('请输入你要添加的网址')
    if (url.indexOf('http') != 0)
        url = 'https://' + url;
    console.log(url);
    hashMap.push({
        logo: simplifyUrl(url)[0],
        // logotype: 'test',
        url: url
    })
    render();
});



window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap);
    localStorage.setItem('x', string);
}

$(document).on('keypress', (e) => {

    const {
        key
    } = e;
    //const key=e.key;
    // console.log(key);
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url);
        }
    }
})

$('#searchForm').keypress((e) => {
    e.stopPropagation();
}); //阻止事件冒泡
// $('.searchForm').keypress((e) => {
//     return false;
// });
// // return false;不止阻止冒泡而且阻止事件本身