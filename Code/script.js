let lobby = document.getElementById("Lobby")
let settingWindow = document.getElementById("settingWindow")
let talkWindow = document.getElementById("talkWindow")
let talkBox = document.getElementById("talkBox")
let Selector = document.getElementById("Selector")
let itemWindow = document.getElementById("items")
let roulette = document.getElementById("roulette")
let background = document.getElementById("Background")
let itemsUI = {
    gold: document.getElementById("gold"),
    diamond: document.getElementById("diamond"),
    wood: document.getElementById("wood"),
    rock: document.getElementById("rock"),
    iron: document.getElementById("iron")
}
let entityDataUI = {
    main: document.getElementById("dataWindow"),
    name: document.getElementById("nameData"),
    hp: document.getElementById("hpData"),
    level: document.getElementById("levelData"),
    exp: document.getElementById("expData"),
    power: document.getElementById("powerData"),
    state: document.getElementById("stateData"),
}
let language = "en"
let isDrag = false
let clicked;
let stateObject;
entityDataUI.main.style.display = _dis(false)
itemWindow.style.display = _dis(false)
roulette.style.display = _dis(false)
Selector.style.display = _dis(false)
talkWindow.style.display = _dis(false)
settingWindow.style.display = _dis(false);
roulette.onclick = () => {
    if (items.gold >= 10){
        items.gold -= 10
        new Entity(0, 0, 100, 1, entityState.Idle, 50, 50)
    }
}
document.getElementById("newGame").onclick = () => {
    startGame(true)
}
document.getElementById("loadGame").onclick = () => {
    startGame()
}
document.getElementById("settingGame").onclick = () => {
    settingWindow.style.display = _dis(true);
}
document.getElementById("settingEnd").onclick = () => {
    settingWindow.style.display = _dis(false);
}
document.getElementById("languageSelect").onchange = () => {
    languageChange(document.getElementById("languageSelect").value)
}
let bodyW = window.innerWidth;
let bodyH = window.innerHeight;
let clickedX = 0
let clickedY = 0
/**아이템용 */
let itemsKind = {
    gold: "Dslmnge5416d2HGdss264241d62dSg",
    diamond: "H523SD54263d4s394fa2sd23e6f84g",
    wood: "G6sd26s6d57h13s6d6a9fAS6ds2d66",
    rock: "5642Hasdfsdahg2354261dHsdsfa6d",
    iron: "Hd12sa64263SD6Hd26s64SD12g6d2s"
}
/**엔티티용 */
let entityState = {
    Idle: "13245dDHhfasdfvc445d1F3",
    Move: "F445236642D61325145662Dggaddeds",
    Die: "gad5g2s48723Fh5adsaf21gG3d6sS4",
    Attack: "hdsgfdF44269753Dhg54d5s23",
    Work: "dhklD45h1D15sdfgh678d4HG5d",
}
/**인게임 전범위용 */
let inGameState = {
    Lobby: "th6645eN34orth123In5Ga30m66e12123St1432ate7Lo1b7by",
    InGame: "t44h4e62121312No23r1thIn21G2a41meSt315a14teInG537am6e",
    Die: "t64heN654ort13hI1nG4a64m12eS1213144t3a13t4eD46i51e",
    LoadType_New: "tmaslfsdaf54aygD16g4d5S5F1gG5135DFD",
    LoadType_Load: "2562136412D16gF2166SVCB2364E6A6231153",
    TouchScreen: "651564DgGHdsf61984Hd2674S6A64YT6526ahsd45191351366",
    Mouse: "KSDoLd56246212677542SLKB46513dis5613Gjkdksne8436GDds"
}
let nowStateInGame = inGameState.Lobby;
let ScreenType = inGameState.Mouse;
let loadType = "";
document.body.style.width = `${bodyW}px`;
document.body.style.height = `${bodyH}px`;
let EntityList = []
let ItemList = []
let mouseX = 0;
let mouseY = 0;
let count = 0;
let countItem = 0;
let items = {
    gold: 0,
    diamond: 0,
    wood: 0,
    rock: 0,
    iron: 0
}
class Item{
    data = {
        itemKind: "",
        isTaked: false,
    }
    object = null;
    constructor(kind){
        this.object = document.createElement("div")
        this.object.className = "Item Layer-Object"
        this.object.style.left = `${Math.random() * 100}vw`
        this.object.style.top = `${Math.random() *  100}vh`
        switch(kind){
            case itemsKind.gold:
                this.object.title = "Gold"
                this.data.itemKind = itemsKind.gold;
                this.object.style.backgroundColor = "gold"
                break;
            case itemsKind.diamond:
                this.object.title = "Diamond"
                this.data.itemKind = itemsKind.diamond;
                this.object.style.backgroundColor = "cyan"
                break;
            case itemsKind.wood:
                this.object.title = "Wood"
                this.data.itemKind = itemsKind.wood;
                this.object.style.backgroundColor = "brown"
                break;
            case itemsKind.rock:
                this.object.title = "Rock"
                this.data.itemKind = itemsKind.rock;
                this.object.style.backgroundColor = "gray"
                break;
            case itemsKind.iron:
                this.object.title = "Iron"
                this.data.itemKind = itemsKind.iron;
                this.object.style.backgroundColor = "silver"
                break;
        }
        this.object.id = `Item v${countItem}`
        this.object.addEventListener("click", () => {
            EntityList.forEach(element => {
                if (_distance(this.object, element.object) <= 4.5 && !this.data.isTaked){
                    this.data.isTaked = true
                    element.data.nowState = entityState.Work;
                    setTimeout(() => {
                        element.data.nowState = entityState.Idle
                        element.data.exp += 7
                        console.log(element.data.exp)
                        switch(this.data.itemKind){
                            case itemsKind.gold:
                                items.gold++
                                this.object.remove();
                                ItemList.splice(ItemList.indexOf(this))
                                delete this;
                                break;
                            case itemsKind.diamond:
                                items.diamond++
                                this.object.remove();
                                ItemList.splice(ItemList.indexOf(this))
                                delete this;
                                break;
                            case itemsKind.wood:
                                items.wood++
                                this.object.remove();
                                ItemList.splice(ItemList.indexOf(this))
                                delete this;
                                break;
                            case itemsKind.rock:
                                items.rock++
                                this.object.remove();
                                ItemList.splice(ItemList.indexOf(this))
                                delete this;
                                break;
                            case itemsKind.iron:
                                items.iron++
                                this.object.remove();
                                ItemList.splice(ItemList.indexOf(this))
                                delete this;
                                break;
                        }
                    }, 3000)
                }
            });
        })
        ItemList.push(this)
        document.body.appendChild(this.object)
        countItem++;
    }
}
class Entity{
    data = {
        hp: 100,
        level: 0,
        exp: 0,
        nowState: entityState.Idle,
        selected: false,
        power: 1
    }
    object = null;
    /**
     * @param {number} level 
     * @param {number} exp 
     * @param {number} hp 
     * @param {number} power 
     * @param {entityState} nowS 
     * @param {number} x 
     * @param {number} y 
     */
    constructor(level, exp, hp, power, nowS, x, y){
        this.data.selected = false;
        this.data.nowState = nowS;
        this.object = document.createElement("div");
        this.object.className = "Entity Layer-Object";
        this.object.style.top = `${y}vh`
        this.object.style.left = `${x}vw`
        this.object.id = `Entity v${count}`
        this.data.hp = hp;
        this.data.power = power
        if (hp < 0){
            this.data.nowState = entityState.Die;
        }
        this.data.level = level;
        this.data.exp = exp;
        this.object.addEventListener("mouseenter", () => {
            stateObject = this;
        })
        this.object.addEventListener("mouseleave", () => {
            if (stateObject == this){
                stateObject = null;
            }
        })
        EntityList.push(this)
        document.body.appendChild(this.object)
        count++;
    }
    /**매 프레임 실행하시오 */
    Update() {
        if (this.data.exp > 100){
            this.data.exp -= 100
            this.data.level++
            this.data.power +=0.2
        }
        let nowStateTXT = "";
        switch (this.data.nowState){
            case entityState.Attack:
                nowStateTXT = "Attack";
                break;
            case entityState.Die:
                nowStateTXT = "Died";
                break;
            case entityState.Idle:
                nowStateTXT = "Idle";
                break;
            case entityState.Move:
                nowStateTXT = "Move";
                break;
            case entityState.Work:
                nowStateTXT = "Work";
                break;
        }
        if (this.data.nowState == entityState.Die){
            this.object.style.backgroundColor = 'darkred';
            return;
        }
        if (this.data.hp < 0){
            this.data.nowState = entityState.Die;
            return;
        }else if(this.data.hp > 100){
            this.data.hp = 100;
        }
        if (this.data.selected){
            if (this.data.nowState != entityState.Work){
                let y = Number(this.object.style.top.replace("vh",""))
                let x = Number(this.object.style.left.replace("vw",""))
                this.object.style.top = `${y + ((_vh(mouseY) <= y)? ((_vh(mouseY) == y)? 0:-0.1):0.1)}vh`
                this.object.style.left = `${x + ((_vw(mouseX) <= x)? ((_vw(mouseX) == x)? 0:-0.1):0.1)}vw`
            }
        }
        if (this.data.selected && this.data.nowState != entityState.Work){
            this.data.nowState = entityState.Move
        }else if (this.data.nowState != entityState.Work){
            this.data.nowState = entityState.Idle
        }
        switch (this.data.nowState){
            case entityState.Attack:
                this.object.style.border = "0.25vw solid red"
                break;
            case entityState.Die:
                this.object.style.border = "0.25vw solid purple"
                break;
            case entityState.Idle:
                this.object.style.border = "0vw solid white"
                break;
            case entityState.Move:
                this.object.style.border = "0.25vw solid green"
                break;
            case entityState.Work:
                this.object.style.border = "0.25vw solid orange"
                break;
        }
    }
    Select(){
        let y = Number(this.object.style.top.replace("vh","")) + _vh(_vwPx(Number(this.object.style.height.replace("vw","")) / 2))
        let x = Number(this.object.style.left.replace("vw","")) + (Number(this.object.style.width.replace("vw","")) / 2)
        let isSelectX = false;
        let isSelectY = false;
        if (_vw(clickedX) < x && x < _vw(mouseX)){
            isSelectX = true;
        }else{
            isSelectX = false
        }
        if (_vh(clickedY) < y && y < _vh(mouseY )){
            isSelectY = true;
        }else{
            isSelectY = false
        }
        if (isSelectX && isSelectY){
            this.data.selected = true
        }else{
            this.data.selected = false
        }
    }
    Destroy(){
        EntityList.splice(EntityList.indexOf(this))
        this.object.remove()
        delete this;
    }
    Save(){
        _save(`${this.object.id}-x`, this.object.style.left.replace("vw",""))
        _save(`${this.object.id}-y`, this.object.style.top.replace("vh",""))
        _save(`${this.object.id}-state`, this.data.nowState)
        _save(`${this.object.id}-level`, this.data.level)
        _save(`${this.object.id}-exp`, this.data.exp)
        _save(`${this.object.id}-hp`, this.data.hp)
        _save(`${this.object.id}-power`, this.data.power)
    }
}
document.addEventListener("mousedown", (event) => {
    switch (event.button){
        case 0:
            break;
        case 2:
            EntityList.forEach(element => {
                element.Select()
            });
            isDrag = true;
            clickedX = mouseX;
            clickedY = mouseY;
            Selector.style.display = _dis(true)
            Selector.style.top = `${clickedY}px`;
            Selector.style.left = `${clickedX}px`;
            Selector.style.width = `${Math.abs(event.clientX - clickedX)}px`
            Selector.style.height = `${Math.abs(event.clientY - clickedY)}px`
            break;
    }
})
document.addEventListener("click", () => {
    document.documentElement.requestFullscreen();
})
document.addEventListener("mousemove", (event) => {
    if (ScreenType == inGameState.Mouse){
        mouseX = event.clientX;
        mouseY = event.clientY;
    }
    if (isDrag){
        Selector.style.display = _dis(true)
        Selector.style.top = `${clickedY}px`;
        Selector.style.left = `${clickedX}px`;
        Selector.style.width = `${Math.abs(event.clientX - clickedX)}px`
        Selector.style.height = `${Math.abs(event.clientY - clickedY)}px`
        if (event.clientX < clickedX || event.clientY < clickedY){
            Selector.style.width = "0px"
            Selector.style.height = "0px"
        }
    }
})
document.addEventListener("mouseup", (event) => {
    if (event.button == 2 && isDrag){
        isDrag = false
        EntityList.forEach(element => {
            element.Select()
        });
        Selector.style.display = _dis(false)
    }
})
document.addEventListener("touchstart", (event) => {
    if (event.touches.length > 1){
        EntityList.forEach(element => {
            element.Select()
        });
        isDrag = true;
        clickedX = event.touches[0].clientX;
        clickedY = event.touches[0].clientY;
        Selector.style.display = _dis(true)
        Selector.style.top = `${clickedY}px`;
        Selector.style.left = `${clickedX}px`;
        Selector.style.width = `${event.touches[0].clientX - clickedX}px`
        Selector.style.height = `${event.touches[0].clientY - clickedY}px`
    }
})
document.addEventListener("touchmove", (event) => {
    if (ScreenType == inGameState.TouchScreen){
        mouseX = event.touches[0].clientX;
        mouseY = event.touches[0].clientY;
    }
    if (isDrag){
        Selector.style.display = _dis(true)
        Selector.style.top = `${clickedY}px`;
        Selector.style.left = `${clickedX}px`;
        Selector.style.width = `${event.touches[0].clientX - clickedX}px`
        Selector.style.height = `${event.touches[0].clientY - clickedY}px`
        if (event.clientX <clickedX || event.clientY < clickedY){
            Selector.style.width = "0px"
            Selector.style.height = "0px"
        }
    }
})
document.addEventListener("touchend", (event) => {
    if (isDrag){
        isDrag = false
        mouseX = event.touches[0].clientX;
        mouseY = event.touches[0].clientY;
        EntityList.forEach(element => {
            element.Select()
        });
        Selector.style.display = _dis(false)
    }
})
background.addEventListener("mousemove", () => {
    stateObject = null;
})
background.addEventListener("click", () => {
    stateObject = null;
})
/**화면 resize 감지 시 실행. addEventListener 외의 다른 방식 */
function resize(){
    bodyW = window.innerWidth;
    bodyH = window.innerHeight;
    document.body.style.width = `${bodyW}px`;
    document.body.style.height = `${bodyH}px`;
}
/**style.display 형식 bool 값 변환기 */
function _dis(bool){
    if (bool){
        return "inline-block"
    }else{
        return "none"
    }
}
/**픽셀 => 뷰포트 */
function _vw(px){
    return (px / bodyW) * 100
}
/**픽셀 => 뷰포트 */
function _vh(px){
    return (px / bodyH) * 100
}
/**뷰포트  => 픽셀*/
function _vwPx(vw){
    return (vw / 100) * bodyW
}
/**뷰포트  => 픽셀*/
function _vhPx(vh){
    return (vh / 100) * bodyH
}
/**현재 언어에 따라 값 반환 */
function _lang(en, kr){
    if (language == "en"){
        return en
    }else if (language == "kr"){
        return kr
    }
}
function _save(name, value){
    return localStorage.setItem(name, value)
}
function _load(name){
    return localStorage.getItem(name)
}
/**vw로 리턴 */
function _distance(obj1, obj2){
    let obj1X = Number(obj1.style.left.replace("vw",""))
    let obj2X = Number(obj2.style.left.replace("vw",""))
    let obj1Y = _vw(_vhPx(Number(obj1.style.top.replace("vh",""))))
    let obj2Y = _vw(_vhPx(Number(obj2.style.top.replace("vh",""))))
    return Math.sqrt((obj1X-obj2X)**2 + (obj1Y-obj2Y)**2)
}
function Say(value, func = () => {return;}){
    talkWindow.style.display = _dis(true)
    talkBox.innerHTML = `<strong>${value}</strong>` 
    talkBox.addEventListener("click", () => {
        talkWindow.style.display = _dis(false)
        func()
    })
}
function startGame(isFirst = false){
    itemWindow.style.display = _dis(true);
    roulette.style.display = _dis(true);
    lobby.style.display = _dis(false);
    loadType = inGameState.LoadType_Load
    if (isFirst){
        loadType = inGameState.LoadType_New
        new Entity(0, 0, 100, 1, entityState.Idle, 50, 50)
        if (document.getElementById("tutorialCheckBox").checked){
            Tutorial();
        }
    }else{
        let EntityCount = _load("EntityCount")
        count = 0
        for (let i = 0; i < EntityCount; i++){
            new Entity(Number(_load(`Entity v${count}-level`)), Number(_load(`Entity v${count}-exp`)), Number( _load(`Entity v${count}-hp`)), Number( _load(`Entity v${count}-power`)), 
                _load(`Entity v${count}-state`), _load(`Entity v${count}-x`), _load(`Entity v${count}-y`))
        }
        nowStateInGame = _load("GameState")
        items.gold = _load("gold")
        items.diamond = _load("diamond")
        items.wood = _load("wood")
        items.rock = _load("rock")
        items.iron = _load("iron")
    }
    createItem()
    setInterval(() => {
        Save()
    }, 100);
    setInterval(() => {
        createItem()
    }, 10000)
}
function createItem(){
    if (ItemList.length > 10) return;
    let whatIsThis = Math.floor(Math.random() * 5)
    switch(whatIsThis){
        case 0:
            new Item(itemsKind.gold);
            break;
        case 1:
            new Item(itemsKind.diamond);
            break;
        case 2:
            new Item(itemsKind.wood);
            break;
        case 3:
            new Item(itemsKind.rock);
            break;
        case 4:
            new Item(itemsKind.iron);
            break;
    }
}
function Tutorial(){
    Say(_lang("Welcome!", "환영합니다!"), () => {
    Say(_lang("Let me tell you about this world.", "이 세계에 대해 알려드리겠습니다."), () => {
    Say(_lang("First, let me explain how to move the object in front of you. (I mean the white circle.)", "첫 번째로, 당신의 앞에 있는 개체를 움직이는 방법에 대해 설명해드리죠. (하얀 원 말입니다.)"), () => {
    Say(_lang("Select the desired object by dragging right it and click where you want to move it.","오른쪽 드래그를 통해 원하는 개체를 선택하고, 이동을 원하는 위치를 클릭하세요."), () => {
    Say(_lang("On mobile, you need to drag with two fingers.", "모바일의 경우에는 두 손가락으로 드래그해야 합니다."), () => {
    Say(_lang("I'll give you a moment. Try it yourself.", "잠깐의 시간을 드리겠습니다. 직접 해보시죠"), () => {
    setTimeout(() =>{
    Say(_lang("Please note that left dragging is not possible.", "참고로 왼쪽 드래그는 불가능합니다."), () => {
    Say(_lang("Haha, are you curious about the square on the black ground?", "하하, 검은 땅 위에 있는 사각형이 궁금하신가요?"), () => {
    Say(_lang("It's probably a natural resource.", "그건 아마도 천연자원일 겁니다."), () => {
    Say(_lang("Could you please bring it to me?", "혹시 그것을 가져와 주실 수 있나요?"), () => {
    
    })
    })
    })
    })
    },10000)
    })
    })
    })
    })
    })
    })
}
function Save(){
    let c = 0;
    EntityList.forEach(element => {
        element.object.id = `Entity v${c}`
        element.Save()
        c++
    });
    _save("EntityCount", EntityList.length)
    _save("GameState", nowStateInGame)
    _save("gold", items.gold)
    _save("diamond", items.diamond)
    _save("wood", items.wood)
    _save("rock", items.rock)
    _save("iron", items.iron)
}
function languageChange(value){
    language = value;
    document.getElementById("tx-title").innerHTML = _lang("<strong>the South</strong>", "<strong>남쪽</strong>")
    document.getElementById("newGame").innerHTML = _lang("<strong>New Game</strong>", "<strong>새 게임</strong>")
    document.getElementById("loadGame").innerHTML = _lang("<strong>Load Game</strong>", "<strong>게임 불러오기</strong>")
    document.getElementById("settingGame").innerHTML = _lang("<strong>Setting</strong>", "<strong>환경 설정</strong>")
    document.getElementById("tx-language").innerHTML = _lang("Language", "설정")
    document.getElementById("settingEnd").innerHTML = _lang("<strong>END</strong>", "<strong>확인</strong>")
    document.getElementById("tx-tutorial").innerHTML = _lang('<strong>Tutorial</strong> <input type="checkbox" class="publicButton" style="height: 1.25vw; width: 1.25vw;" id="tutorialCheckBox">', 
        '<strong>튜토리얼</strong> <input type="checkbox" class="publicButton" style="height: 1.25vw; width: 1.25vw;" id="tutorialCheckBox">')
    roulette.innerHTML = _lang("<strong>new Object<br><small><small>(10 gold)</small></small></strong>", "<strong>새 개체<br><small><small>(10 황금)</small></small></strong>")
}
/**매 프레임마다 실행 */
function update(){
    if (stateObject){
        entityDataUI.main.style.display = _dis(true);
        entityDataUI.main.style.top = `${(mouseY + _vwPx(1 + Number(entityDataUI.main.style.height.replace("vw",""))) > window.innerHeight)?
            mouseY - 10 - _vwPx(Number(entityDataUI.main.style.height.replace("vw",""))) : 
            mouseY + 10}px`
        entityDataUI.main.style.left = `${(mouseX + _vwPx(1 + Number(entityDataUI.main.style.width.replace("vw",""))) > window.innerWidth)?
            mouseX - 10 - _vwPx(Number(entityDataUI.main.style.width.replace("vw",""))) : 
            mouseX + 10}px`
        entityDataUI.name.innerHTML = _lang(`<strong>Name:${stateObject.object.id}</strong>`, `<strong>이름:${stateObject.object.id}</strong>`)
        entityDataUI.hp.innerHTML = _lang(`<strong>HP:${stateObject.data.hp}</strong>`, `<strong>생명력:${stateObject.data.hp}</strong>`)
        entityDataUI.level.innerHTML = _lang(`<strong>Level:${stateObject.data.level}</strong>`, `<strong>등급:${stateObject.data.level}</strong>`)
        entityDataUI.exp.innerHTML = _lang(`<strong>EXP:${stateObject.data.exp}</strong>`, `<strong>경험:${stateObject.data.exp}</strong>`)
        entityDataUI.power.innerHTML = _lang(`<strong>Power:${stateObject.data.power}</strong>`, `<strong>힘:${stateObject.data.power}</strong>`)
        let nowStateTXT = "";
        switch (stateObject.data.nowState){
            case entityState.Attack:
                nowStateTXT = "Attack";
                break;
            case entityState.Die:
                nowStateTXT = "Died";
                break;
            case entityState.Idle:
                nowStateTXT = "Idle";
                break;
            case entityState.Move:
                nowStateTXT = "Move";
                break;
            case entityState.Work:
                nowStateTXT = "Work";
                break;
        }
        entityDataUI.state.innerHTML = _lang(`<strong>State:${nowStateTXT}</strong>`, `<strong>상태:${nowStateTXT}</strong>`)
    }else{
        entityDataUI.main.style.display = _dis(false);
    }
    itemsUI.gold.innerHTML = `<strong>${_lang("gold", "황금")}:${items.gold}</strong>`
    itemsUI.diamond.innerHTML = `<strong>${_lang("diamond", "다이아몬드")}:${items.diamond}</strong>`
    itemsUI.wood.innerHTML = `<strong>${_lang("wood", "목재")}:${items.wood}</strong>`
    itemsUI.rock.innerHTML = `<strong>${_lang("rock", "석재")}:${items.rock}</strong>`
    itemsUI.iron.innerHTML = `<strong>${_lang("iron", "금속")}:${items.iron}</strong>`
    EntityList.forEach(element1 => {
        element1.object.innerHTML = `<strong>${element1.data.level}</strong>`
        EntityList.forEach(element2 => {
            if (_distance(element1.object, element2.object) < 2 && element1 != element2){
                if (Number(element1.object.style.left.replace("vw","")) - Number(element2.object.style.left.replace("vw","")) < 0){
                    element1.object.style.left = `${Number(element1.object.style.left.replace("vw","")) - 0.1}vw`;
                }else{
                    element1.object.style.left = `${Number(element1.object.style.left.replace("vw","")) + 0.1}vw`;
                }
                if (Number(element1.object.style.top.replace("vh","")) - Number(element2.object.style.top.replace("vh","")) < 0){
                    element1.object.style.top = `${Number(element1.object.style.top.replace("vh","")) - 0.1}vh`;
                }else{
                    element1.object.style.top = `${Number(element1.object.style.top.replace("vh","")) + 0.1}vh`;
                }
            }
        });
    });
    if ((window.ontouchstart || window.ontouchmove || window.ontouchcancel || window.ontouchend) && ScreenType == inGameState.Mouse){
        ScreenType = inGameState.TouchScreen
    }else{
        if (ScreenType == inGameState.TouchScreen)
        ScreenType = inGameState.Mouse
    }
    EntityList.forEach(entity => {
        entity.Update();
    });
    if (window.innerWidth != bodyW || window.innerHeight != bodyH)
        resize();
    requestAnimationFrame(update);
}
update();