document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector("#backToTop");

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    function toggleButton() {
        document.documentElement.scrollTop > window.innerHeight * 0.7 
        ? btn.classList.remove('d-none') 
        : btn.classList.add('d-none');
    }

    btn.addEventListener('click', scrollToTop);
    window.addEventListener('scroll', toggleButton);
});