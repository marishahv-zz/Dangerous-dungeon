class Hero {
  constructor(name,gender,race) {
    this.name = name;
    this.gender = gender;
    this.race = race;
    this.hp = 100;
    this.score = 0;
  }
  getdamaged(value){
    this.hp -= value;
  }
  gethealed(value){
    this.hp += value;
  }
  addToScore(points){
    this.score += points;
  }
  get heroState(){
    return (`имя ${this.name} пол ${this.gender} раса ${this.race} жизни ${this.hp} очки ${this.score}`);
  }
}
//export {Hero};
