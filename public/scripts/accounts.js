let containers = document.querySelector('.account_container').querySelectorAll('.input_container');
containers.forEach( (container) => {
    let input = container.querySelector('input');
    let label = container.querySelector('label');
    input.addEventListener('input', () => {
        if(input.value != '') {
            if(!label.classList.contains('active')){
                label.classList.add('active');
            }
        }
        else {
            if(label.classList.contains('active') && (document.activeElement != input)){
                label.classList.remove('active');
            }
        }
    });
    input.addEventListener('focus', () => {
        if(!label.classList.contains('active')){
            label.classList.add('active');
        }
    });
    input.addEventListener('blur', () => {
        if(input.value == '') {
            if(label.classList.contains('active')){
                label.classList.remove('active');
            }
        }
    });
});

