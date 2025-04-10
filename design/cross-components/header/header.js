function menuOpenHandler(setLayoutName) {
    const nav = document.getElementById('nav')
    const linkPage = document.getElementById('link-page')
    nav.style.display = 'flex'
    linkPage.innerHTML = setLayoutName
}

function menuCloseHandler() {
    const nav = document.getElementById('nav')
    nav.style.display = 'none'
}