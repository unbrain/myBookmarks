//1.初始化
var initHash = init()
var hash = initHash['hash']
var keys = initHash['keys']

//2.遍历生成 kbd div
generateKeyboard(keys, hash)

//3.监听用户行为
userAction(hash)

//function
function getLocalStorage(e) {
    return JSON.parse(localStorage.getItem(e || 'null'))
}

function setLocalStorage(e) {
    return localStorage.setItem(e, JSON.stringify(hash))
}

function tag(targetName) {
    return document.createElement(targetName)
}

function createImage(domain) {
    var oImg = tag('img')
    if (domain) {
        oImg.src = 'http://' + domain + '/favicon.ico'
    } else {
        oImg.src = './favicon.ico'
    }

    oImg.onerror = function (e) {
        e.target.src = './favicon.ico'
    }
    return oImg
}

function creatButton(id) {
    var oBtn = tag('button')
    oBtn.id = id
    oBtn.textContent = 'E'

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
    return oBtn
}

function init() {
    var keys = {
        0: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',],
        1: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',],
        2: ['z', 'x', 'c', 'v', 'b', 'n', 'm',],
        length: 3,
    }

    var hash = {
        q: 'qq.com',
        w: 'w3cplus.com',
        e: 'edx.org.com',
        t: 'cloud.tencent.com',
        a: 'alloyteam.com',
        y: 'youtube.com',
        i: 'iconfont.cn',
        o: 'opera.com',
        z: 'zhangxinxu.com',
        m: 'macshuo.com',
        x: 'xuetangx.com',
        v: 'v2ex.com',
        c: 'coolshell.cn',
        g: 'github.com',
        l: 'leetcode.com',
        s: 'segmentfault.com',
        r: 'ruanyifeng.com',
        b: 'bluereader.org',
        f: 'freecodecamp.cn',
    }

    var lcalHash = getLocalStorage('myWebsite')

    if (lcalHash) {
        hash = lcalHash
    }

    return {
        keys: keys,
        hash: hash,
    }
}

function userAction(hash) {
    document.onkeypress = function (e) {
        //console.log(e)
        website = hash[e.key]
        //location.href = 'https://' + website
        if (website) {
            window.open('http://' + website, '_blank')
        } else {
            alert('亲， 你还没有编辑呢')
        }
    }
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