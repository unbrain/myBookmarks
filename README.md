# 一个导航网站

由简单无门槛 js 实现一个触发按键跳转网页的导航网站，效果[预览](https://unbrain.github.io/myBookmarks/)

### 数据结构

我们都知道工欲善其事，必先利其器，所以选择好数据结构再来进行编程是很有必要的。由于是一个键盘按键对应一个网站，我们很快就会想到 `key:value` 所以我用对象来存储。

```javascript
hash = {
    q: 'qq.com', 
    w: 'w3cplus.com', 
    e: 'edx.org.com', 
    t: 'cloud.tencent.com', 
    a: 'alloyteam.com', 
    y: 'youtube.com', 
    i: 'iconfont.cn', 
    o: 'opera.com', 
    z: 'zhangxinxu.com', 
  //...
}
```



### 生成键盘

想到键盘比较多，我就没有写键盘的 `HTML` 而是改用 `JS` 自动生成，把要用的三排键想成三个数组存储，可以用对象也可以是二维数组。

```javascript
var keys = {
    0: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',],
    1: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',],
    2: ['z', 'x', 'c', 'v', 'b', 'n', 'm',],
    length: 3,
}
```

根据获取到的 `keys[][]` 的字母来显示键值，遍历该对象进行键盘生成

- [creatElement(targetname)](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createElement)
- [appendChild](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild)

```javascript
function creatButton(id) {
    var oBtn = tag('button')
    oBtn.id = id
    oBtn.textContent = 'E'

    oBtn.onclick = function (e) {
      //修该键盘的对应网址
    }
    return oBtn
}

function generateKeyboard(keys, hash) {
    for (var i = 0; i < keys.length; i++) {
        var oDiv = tag('div')
        document.getElementById('main').appendChild(oDiv)

        for (var j = 0; j < keys[i].length; j++) {
            var oKbd = tag('kbd')
            var oBtn = creatButton(keys[i][j])
            var oImg = createImage(hash[keys[i][j]])

            oKbd.textContent = keys[i][j]
            oKbd.className = 'key'

            oDiv.appendChild(oKbd)
            oKbd.appendChild(oImg)
            oKbd.appendChild(oBtn)

        }
    }
}
```



### 监听键盘

其实实现该项目最主要的其实就是监听用户按下的键盘，需要做一下监听的范围是 `document` ，然后就打开相应的网站，不太懂可以先 `console.log(e)` 可以看一下控制台。

- [KeyboardEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent)
- [window.open](https://developer.mozilla.org/en-US/docs/Web/API/Window/open)

```JavaScript
document.onkeypress = function (e) {
    website = hash[e.key]
    //location.href = 'https://' + website
    if (website) {
        window.open('http://' + website, '_blank')
    } else {
        alert('亲， 你还没有编辑呢')
    }
}
```



### 存储用户的改变

用户可以对其的键盘进行网站的改变，也就是对 `hash` 进行修改，而我们需要对其修改进行保存以防丢失

- [previousSibling](https://developer.mozilla.org/en-US/docs/Web/API/Node/previousSibling) 为了获取上一节点

```javascript
oBtn.onclick = function (e) {
    value = prompt('你想用 ' + (e.target.id) + ' 代表的网址:')
    hash[e.target.id] = value
    if (value != null) {
        setLocalStorage('myWebsite')
        e.target.previousSibling.src = 'http://' + value + '/favicon.ico'
        e.target.previousSibling.onerror = function (e) {
            e.target.src = './favicon.ico'
        }
    }
}

function getLocalStorage(e) {
    return JSON.parse(localStorage.getItem(e || 'null'))
}

function setLocalStorage(e) {
    return localStorage.setItem(e, JSON.stringify(hash))
}
```



### 