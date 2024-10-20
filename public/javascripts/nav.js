const burger = document.getElementsByClassName('burger')[0];
burger.addEventListener('click', (event) => {
    const navlinks = document.getElementById('navlinks');
    navlinks.classList.toggle('navlinks-show');
    console.log('lol');
});