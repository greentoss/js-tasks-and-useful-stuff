'use strict';

window.addEventListener('DOMContentLoaded', () => {
    
    const bodyClone = document.querySelector('body');
    let textNodesClone = [];
    
    function recursyParsing (element) {
        element.childNodes.forEach(node => {
            
            // if (node.nodeName === '#text') {    //отфильтрует все теги,  отрежет все текстовые узлы
            if (node.nodeName.match(/^H\d/)) {     //Найти строку, начинающ с 'H' и затем цифра
                const obj = {
                    header: node.nodeName,
                    content: node.textContent
                };

                textNodesClone.push(obj);                //формируем обьект, и его пушим в массив
                //console.log(textNodesClone);
            } else {
                
                recursyParsing(node);
            }
        });
    }


    recursyParsing(bodyClone);

    fetch('https://jsonplaceholder.typicode.com/posts', {    //fake online test API вместо подключения к серверу
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(textNodesClone)
    })
    .then(response => response.json())
    .then(json => console.log(json));
   
});





//для выделенного элемента в режиме разработчика
//console.diк($0)
//выведет как у обьекта все свойства