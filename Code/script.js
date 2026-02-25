let lobby = document.getElementById("Lobby")
let settingWindow = document.getElementById("settingWindow")
let talkWindow = document.getElementById("talkWindow")
let talkBox = document.getElementById("talkBox")
let Selector = document.getElementById("Selector")
let language = "en"
let clicked;
Selector.style.display = _dis(false)
talkWindow.style.display = _dis(false)
settingWindow.style.display = _dis(false);
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
    LoadType_Load: "2562136412D16gF2166SVCB2364E6A6231153"
}
let nowStateInGame = inGameState.Lobby;
let loadType = "";
document.body.style.width = `${bodyW}px`;
document.body.style.height = `${bodyH}px`;
let EntityList = []
let mouseX = 0;
let mouseY = 0;
let count = 0;
let items = {
    gold: 0,
    diamond: 0,
    wood: 0,
    rock: 0,
    iron: 0
}
class Entity{
    data = {
        /**int */
        hp: 100,
        /**int */
        level: 0,
        /**int */
        exp: 0,
        /**entityState */
        nowState: entityState.Idle,
        /**bool */
        selected: false
    }
    object = null;
    /**첫 시작 및 이어하기 */
    constructor(level, exp, hp, nowS, x, y){
        this.data.selected = false;
        this.data.nowState = nowS;
        this.object = document.createElement("div");
        this.object.className = "Entity Layer-Object";
        this.object.style.top = `${y}vw`
        this.object.style.left = `${x}vw`
        this.object.id = `Entity v${count}`
        this.data.hp = hp;
        if (hp < 0){
            this.data.nowState = entityState.Die;
        }
        this.data.level = level;
        this.data.exp = exp;
        EntityList.push(this)
        document.body.appendChild(this.object)
        count++;
    }
    /**매 프레임 실행하시오 */
    Update() {
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
            let y = Number(this.object.style.top.replace("vw",""))
            let x = Number(this.object.style.left.replace("vw",""))
            this.object.style.top = `${y + ((_vw(mouseY) <= y)? ((_vw(mouseY) == y)? 0:-0.1):0.1)}vw`
            this.object.style.left = `${x + ((_vw(mouseX) <= x)? ((_vw(mouseX) == x)? 0:-0.1):0.1)}vw`
        }
        if (this.data.selected){
            this.data.nowState = entityState.Move
        }else{
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
                this.object.style.border = "0.25vw solid gold"
                break;
        }
    }
    Select(){
        let y = Number(this.object.style.top.replace("vw","")) + (Number(this.object.style.height.replace("vw","")) / 2)
        let x = Number(this.object.style.left.replace("vw","")) + (Number(this.object.style.width.replace("vw","")) / 2)
        let isSelectX = false;
        let isSelectY = false;
        if (_vw(clickedX) < x && x < _vw(mouseX)){
            isSelectX = true;
        }else{
            isSelectX = false
        }
        if (_vw(clickedY) < y && y < _vw(mouseY )){
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
        _save(`${this.object.id}-y`, this.object.style.top.replace("vw",""))
        _save(`${this.object.id}-state`, this.data.nowState)
        _save(`${this.object.id}-level`, this.data.level)
        _save(`${this.object.id}-exp`, this.data.exp)
        _save(`${this.object.id}-hp`, this.data.hp)
    }
}
document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
})
let isDrag = false
document.addEventListener("mousedown", (event) => {
    switch (event.button){
        case 0:
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
        case 2:
            break;
    }
})
document.addEventListener("click", () => {
    document.documentElement.requestFullscreen();
})
document.addEventListener("mousemove", (event) => {
    if (isDrag){
        Selector.style.display = _dis(true)
        Selector.style.top = `${clickedY}px`;
        Selector.style.left = `${clickedX}px`;
        Selector.style.width = `${Math.abs(event.clientX - clickedX)}px`
        Selector.style.height = `${Math.abs(event.clientY - clickedY)}px`
        if (event.clientX <clickedX || event.clientY < clickedY){
            isDrag = false
            Selector.style.display = _dis(false)
        }
    }
})
document.addEventListener("mouseup", (event) => {
    if (event.button == 0 && isDrag){
        isDrag = false
        EntityList.forEach(element => {
            element.Select()
        });
        Selector.style.display = _dis(false)
    }
})
document.addEventListener("touchstart", (event) => {
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
})
document.addEventListener("touchmove", (event) => {
    if (isDrag){
        Selector.style.display = _dis(true)
        Selector.style.top = `${clickedY}px`;
        Selector.style.left = `${clickedX}px`;
        Selector.style.width = `${Math.abs(event.clientX - clickedX)}px`
        Selector.style.height = `${Math.abs(event.clientY - clickedY)}px`
        if (event.clientX <clickedX || event.clientY < clickedY){
            isDrag = false
            Selector.style.display = _dis(false)
        }
    }
})
document.addEventListener("touchend", (event) => {
    if (event.button == 0 && isDrag){
        isDrag = false
        EntityList.forEach(element => {
            element.Select()
        });
        Selector.style.display = _dis(false)
    }
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
function Say(value, func = () => {return;}){
    talkWindow.style.display = _dis(true)
    talkBox.innerHTML = `<strong>${value}</strong>` 
    talkBox.addEventListener("click", () => {
        talkWindow.style.display = _dis(false)
        func()
    })
}
function startGame(isFirst = false){
    lobby.style.display = _dis(false);
    loadType = inGameState.LoadType_Load
    if (isFirst){
        loadType = inGameState.LoadType_New
        new Entity(0, 0, 100, entityState.Idle, 50, 25)
        if (document.getElementById("tutorialCheckBox").checked){
            Tutorial();
        }
    }else{
        let EntityCount = _load("EntityCount")
        count = 0
        for (let i = 0; i < EntityCount; i++){
            console.log(i)
            new Entity(_load(`Entity v${count}-level`), _load(`Entity v${count}-exp`), _load(`Entity v${count}-hp`), _load(`Entity v${count}-state`),
                _load(`Entity v${count}-x`), _load(`Entity v${count}-y`))
        }
        nowStateInGame = _load("GameState")
        items.gold = _load("gold")
        items.diamond = _load("diamond")
        items.wood = _load("wood")
        items.rock = _load("rock")
        items.iron = _load("iron")
    }
    setInterval(() => {
        Save()
    }, 100);
}
function Tutorial(){
    Say(_lang("Welcome!", "환영합니다!"), () => {
        Say(_lang("Let me tell you about this world.", "이 세계에 대해 알려드리겠습니다."), () => {
            Say(_lang("First, let me explain how to move the object in front of you.", "첫 번째로, 당신의 앞에 있는 개체를 움직이는 방법에 대해 설명해드리죠."), () => {
                Say(_lang("Select the desired object by dragging left it and click where you want to move it.","왼쪽 드래그를 통해 원하는 개체를 선택하고, 이동을 원하는 위치를 클릭하세요."), () => {
                    Say(_lang("I'll give you a moment. Try it yourself.", "잠깐의 시간을 드리겠습니다. 직접 해보시죠"), () => {
                        setTimeout(() =>{
                            Say(_lang("Please note that right dragging is not possible.", "참고로 오른쪽 드래그는 불가능합니다."), () => {
                                Say(_lang("", ""), () => {
                                    
                                })
                            })
                        },10000)
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
}
/**매 프레임마다 실행 */
function update(){
    EntityList.forEach(entity => {
        entity.Update();
    });
    if (window.innerWidth != bodyW || window.innerHeight != bodyH)
        resize();
    requestAnimationFrame(update);
}
update();