
{/* <script id="myListAction"> */}

function initNone(set) {  
    // oculto el listado que inicialmente va colapsado
    if (set == "compact") {
        [].forEach.call(document.querySelectorAll(".myList ~ li.expand > ul > li"), function (e) {
            e.classList.add("None");
            // e.parentElement.textContent = "( ver mas )"
        });
    } else 
        // muestro  el listado que estaba colapsado
        if (set == "extended") {
            [].forEach.call(document.querySelectorAll(".myList ~ li.expand > ul > li"), function (e) {
                e.classList.remove("None");
            });
        }
};

(function() {

    function upLi(el) {
    // Actualizo el estado del elemento de la lista, colapsado o visible
        if (el.nextElementSibling.className == "") { 
            // Hice click sobre uno visible, lo colapso
            
            el.querySelector("sub").textContent = " (ver mas)"
            let list = el.parentElement.children
            for (var i = 1; i < list.length; i++) {
                // Muestro el elemento a expandir
                list[i].classList.toggle("None");
            }

        } else {  
            // Hice click sobre uno colapsado, lo muestro

            el.querySelector("sub").textContent = " (ver menos)"
            let list = el.parentElement.children
            for (var i = 1; i < list.length; i++) {
                // Muestro el elemento a expandir
                list[i].classList.toggle("None");
            }
        }
    }
    // initNone();
    [].forEach.call(document.querySelectorAll(".myList ~ li.expand ul span"), function(e) {
        e.addEventListener("click", function() {
        upLi(e);
        });
    });
    
} ());
// </script>  <!-- treeListAction -->

{/* <script id="rating"> */}
    (function updateProgress() {
    [].forEach.call(document.querySelectorAll(".rating"), function(el) {
        let valor = el.getAttribute("myvalue");
        el.querySelector(".rtngSide span").innerText = el.getAttribute("mylabel");
        el.querySelector(".rtngSide.rtngEnd span").innerText = valor


        let icos = el.querySelectorAll(".star-container svg");

        let index = 0
        icos.forEach( function(e) {
        if (index < parseInt(valor))  {
            e.classList.toggle('acento')
            e.classList.toggle('disable')
        }
        index ++
        });
    });
    } ());
// </script>  <!-- rating -->

{/* <script id="donuts"> */}
function updateDonut(percent, element){
    /* obtengo valor de los colores desde JS: */
    let donutStyle = getComputedStyle(document.documentElement);

    let noProgressColor = donutStyle.getPropertyValue('--acento-bg');
    let progressColor = donutStyle.getPropertyValue('--acento');

    if (!progressColor) {
        progressColor = 'red';
        console.log("no encontre variable --acento");            
        [].forEach.call(document.querySelectorAll("#section1-chart .item-chart"), function(el) {
        el.style.setProperty('background-color', progressColor)
        });
    };
    
    if (!noProgressColor) {
        console.log("no encontre variable --acento-bg")
        noProgressColor = 'blue';
        [].forEach.call(document.querySelectorAll("#section2-chart .item-chart"), function(el) 
        {
            el.style.setProperty('background-color',noProgressColor)
        });
    };
    
    //var percent = 45;
    if (percent < 50){
    offset = (360 / 100) * percent;
    element.parentNode.querySelector("#section3-chart").style.webkitTransform = "rotate(" + offset + "deg)";
    element.parentNode.querySelector("#section3-chart .item-chart").style.webkitTransform = "rotate(" + (180 - offset) + "deg)";
    element.parentNode.querySelector("#section3-chart").style.msTransform = "rotate(" + offset + "deg)";
    element.parentNode.querySelector("#section3-chart .item-chart").style.msTransform = "rotate(" + (180 - offset) + "deg)";
    element.parentNode.querySelector("#section3-chart").style.MozTransform = "rotate(" + offset + "deg)";
    element.parentNode.querySelector("#section3-chart .item-chart").style.MozTransform = "rotate(" + (180 - offset) + "deg)";
    // element.parentNode.querySelector("#section3-chart .item-chart").style.backgroundColor = noProgressColor;
    // element.parentNode.querySelector("#section2-chart .item-chart").style.backgroundColor = noProgressColor;
    // element.parentNode.querySelector("#section1-chart .item-chart").style.backgroundColor = progressColor;

    element.parentNode.querySelector("#section1-chart .item-chart").style.borderColor = progressColor;
    element.parentNode.querySelector("#section2-chart .item-chart").style.borderColor = noProgressColor;
    element.parentNode.querySelector("#section3-chart .item-chart").style.borderColor = noProgressColor;
    
} else { 
    offset = ((360 / 100) * percent) - 180;
    element.parentNode.querySelector("#section3-chart").style.webkitTransform = "rotate(180deg)";
    element.parentNode.querySelector("#section3-chart .item-chart").style.webkitTransform = "rotate(" +  offset + "deg)";
    element.parentNode.querySelector("#section3-chart").style.msTransform = "rotate(180deg)";
    element.parentNode.querySelector("#section3-chart .item-chart").style.msTransform = "rotate(" +  offset + "deg)";
    element.parentNode.querySelector("#section3-chart").style.MozTransform = "rotate(180deg)";
    element.parentNode.querySelector("#section3-chart .item-chart").style.MozTransform = "rotate(" +  offset + "deg)";   

    
    element.parentNode.querySelector("#section1-chart .item-chart").style.borderColor = progressColor;
    
    element.parentNode.querySelector("#section2-chart .item-chart").style.borderColor = noProgressColor;

    element.parentNode.querySelector("#section3-chart .item-chart").style.borderColor = progressColor;
    
}
element.parentNode.querySelector(".donut-chart .center-chart").style.borderColor = noProgressColor;
element.parentNode.querySelector("span").innerHTML = percent + "%";
document.querySelector(".item-chart").style.backgroundColor = "transparent";
}
    
function updateSlider(element) {

    if (element) {
    var parent = element.parentElement;
    var thumb = parent.querySelector('.range-slider__thumb'),
        bar = parent.querySelector('.range-slider__bar'),
        pct = element.value * ((parent.clientHeight - thumb.clientHeight) / parent.clientHeight);
    thumb.style.bottom = pct + '%';
    bar.style.height = 'calc(' + pct + '% + ' + thumb.clientHeight / 2 + 'px)';
    thumb.textContent = element.value + '%';
    }
    updateDonut(element.value, element.parentNode);
}

function initAndSetupTheSliders() {

    [].forEach.call(document.querySelectorAll(".container-chart"), function(el) {
    let inputs = [].slice.call(el.querySelectorAll('.range-slider input'));
    let leyend = document.querySelector("#" + el.id + " .center-label span");

    leyend.innerHTML  = el.getAttribute("aria-label")
    
        inputs.forEach(function (input) {
            input.setAttribute('value', el.getAttribute("aria-value"));
            updateSlider(input);
            input.addEventListener('input', function (element) {
                updateSlider(input);
            });
            input.addEventListener('change', function (element) {
                updateSlider(input);
            });
        });
    });
};

// </script>  <!-- ts -->