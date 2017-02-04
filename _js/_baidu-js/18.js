(function () {
    function $(id) {
        return document.getElementById(id);
    };
    var button = document.getElementsByTagName('button');

    button.addEventListener('click',function () {
        var text = $('txt').value;
        if(!text.match(/\d/)) {
            alert('输入必须是整数哦');
        }else if(!text){
            alert('输入为空')
        } else {
            var newBox = document.createElement('li');
            newBox.innerHTML = text;
            switch (this.innerHTML) {
                case '左侧入':
                    $('box').insertBefore(newBox);
                    break;
                case '右侧入':
                    $('box').insertBefore(newBox);
                    break;
                case '左侧出':
                    if(!$('box').innerHTML) {
                        alert('无可以移除的元素');
                    }else{
                        $('box').insertBefore(newBox);
                    }
                    break;
                case '右侧出':
                    if(!$('box').innerHTML) {
                        alert('无可以移除的元素');
                    }else{
                        $('box').insertBefore(newBox);
                    }
                    break;
            }
        }

    });
})();
