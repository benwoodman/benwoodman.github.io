startTyping = async (element_name, time, iterations) => {
    const upper_divs = document.getElementById(element_name).children;
    const lower_divs = [];
    for (let i = 0; i < upper_divs.length; i++) {
        for (let j = 0; j < upper_divs[i].children.length; j++) {
            if (iterations === 2) {
                lower_divs.push(upper_divs[i].children[j]);
            } else {
                for (let k = 0; k < upper_divs[i].children[j].children.length; k++) {
                    lower_divs.push(upper_divs[i].children[j].children[k]);
                }
            }
        }
    }
    let current_chars = 0;
    for (let i = 0; i < lower_divs.length; i++) {
        const current_obj = lower_divs[i];
        setTimeout(function() {
            if (current_obj.classList.contains('no-type')) {
                current_obj.classList.add('show');
            } else {
                const body = current_obj.textContent;
                current_obj.style.height = current_obj.offsetHeight;
                current_obj.style.width = current_obj.offsetWidth;
                current_obj.textContent = '';
                current_obj.classList.add('show');
                current_obj.classList.add('typing');
                for (let j = 0; j < body.length; j++) {
                    setTimeout(function() {
                        if (j === body.length - 1 && i !== lower_divs.length - 1) {
                            current_obj.textContent = body.slice(0, j + 1);
                        } else {
                            current_obj.textContent = body.slice(0, j + 1);
                            current_obj.innerHTML += '<span class="cursor">█</span>';
                        }
                    }, j * time + time);
                }
            }
        }, current_chars * time)
        if (current_obj.classList.contains('no-type')) {
            current_chars += 30;
        } else {
            current_chars += current_obj.textContent.length;
        }
        current_obj.classList.remove('typing');
    }
}

loadPortfolio = async () => {
    const r = await axios({
        method: 'get',
        url: 'projects.json',
    }).catch(function(error) {
        alert(error + '\nThere was an error loading the portfolio.')
    });
    return r.data;
}

