//import { Hero } from 'hero/Hero';
const gameField = document.querySelector('#GameField');
const ctx = gameField.getContext("2d");
const nameOfHero = document.querySelector('#nameOfHero');
const MenueContainer = document.querySelector('#MenueContainer');
let hero = null;

//функция для переключения классов
const switchClasses = (element) => {
  if(element.classList.contains("active")){
    element.classList.remove("active");
    element.classList.add("unactive");
  }else{
    element.classList.remove("unactive");
    element.classList.add("active");
  }
};

//функция определения выбранныз радиобаттанов внешнего вида персонажа
const checkRaceGender = () =>{
  const raceAndGender = [];
  const radioButtons = [...document.getElementsByName('heroRace'),...document.getElementsByName('heroGender')].forEach((elem) => {
    if(elem.checked === true){
       raceAndGender.push(elem.value)
    }
  });
  //console.log(raceAndGender.join(""));
  return raceAndGender
};

//функция задает src для переданного аргумента
const createHeroImg = (element) =>{
  switch (checkRaceGender().join("")) {
    case "HumanFemale":
      element.src="images/heroes-icons/HumanFemale.png";
      break;
    case "HumanMale":
      element.src="images/heroes-icons/HumanMale.jpg";
      break;
    case "ElfFemale":
      element.src="images/heroes-icons/ElfFemale.png";
      break;
    case "ElfMale":
      element.src="images/heroes-icons/ElfMale.jpg";
      break;
    default:
      return null;
  };
};

//функция проверки на пустоту поля input id="nameOfHero"
const checkNameHero = () =>{
  if(nameOfHero.value === ""){
    alert("имя персонажа не может быть пустым");
    return false;
  }else if (nameOfHero.value.length < 5) {
    alert("имя персонажа должно содержать не менее 5 символов");
    return false;
  }else{
    return true;
  }
};

//функция запрета ввода цифр и символов
const checkPressedKey = (ev) =>{
  if(ev.charCode >= 32 && ev.charCode <= 64){
    ev.preventDefault();
  }else if(ev.charCode >= 91 && ev.charCode <= 96){
    ev.preventDefault();
  }else if(ev.charCode >= 123 && ev.charCode <= 126){
    ev.preventDefault();
  }
}

//функция скрывает блоки main и header
const hideMainHeaderBlocks = () =>{
  const header = document.querySelector('#header');
  const menueContainer = document.querySelector('#MenueContainer');
  switchClasses(header);
  switchClasses(menueContainer);
}

// функция добавляет информацию о персонаже в блок heroStatusBar-container
const createHeroStatusBar = () =>{
  document.querySelector('#characterName').innerText = hero.name;
  document.querySelector('#hpLineHero').textContent = hero.hp;
  document.querySelector('#characterScore').innerText = `Score:${hero.score}`;
};

//функция изменения жизней игрока в статусбаре при получении урона или исцелении
const renderHpHero = () =>{
  const oneHp = 2;//px
  document.querySelector('#hpLineHero').textContent = hero.hp;
  document.querySelector('#characterHp').style.width = `${oneHp*hero.hp}px`;
}

//функция изменения жизней монстра в статусбаре при получении урона
const renderHpMonster = () =>{
  const oneHp = 2;//px
  document.querySelector('#hpLineMonster').textContent = monster.hp;
  document.querySelector('#monsterHp').style.width = `${oneHp*monster.hp}px`;
}

//
const drawEssence = () =>{
  ctx.beginPath();
  ctx.rect(20, 40, 5, 5);
  ctx.fillStyle = "#FF0000";
  ctx.fill();
  ctx.closePath();
}

nameOfHero.addEventListener('keypress',checkPressedKey);

MenueContainer.addEventListener('click',(ev)=>{
  switch (ev.target.id) {
    case "goToMainMenue":
      switchClasses(MenueContainer.children[0]);
      switchClasses(MenueContainer.children[1]);
      createHeroImg(document.querySelector('#heroImg'));
      break;
    case "radioHumanRace":
      createHeroImg(document.querySelector('#heroImg'));
      break;
    case "radioElfRace":
      createHeroImg(document.querySelector('#heroImg'));
      break;
    case "radioGenderMale":
      createHeroImg(document.querySelector('#heroImg'));
      break;
    case "radioGenderFemale":
      createHeroImg(document.querySelector('#heroImg'));
      break;
    case "starGame":
      if(checkNameHero()){
        hideMainHeaderBlocks();
        hero = new Hero(nameOfHero.value,checkRaceGender()[1],checkRaceGender()[0]);
        switchClasses(document.querySelector('#GameFieldContainer'));
        createHeroImg(document.querySelector('#characterIcon'))
        createHeroStatusBar();
      }
      break;
    default:
      return null;
  };
});
