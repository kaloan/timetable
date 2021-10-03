//import subjs from './subjects.json'

const subjects = [
  ["Аналитична механика(л)", 1, 10, 13],
  ["Аналитична механика(с)", 2, 14, 18],
  ["ASDASD", 1, 12, 16]
]

const days = [
  "Понеделник",
  "Вторник",
  "Сряда",
  "Четвъртък",
  "Петък",
  "Събота",
  "Неделя"
]

let conflicts = [];

let blocks = [];



function createTable(){
  const timetable = document.getElementById("timetable");

  //Trix2g
  const upperHole = document.createElement("div");
  upperHole.style.color = "#1c1c1c";
  upperHole.appendChild(document.createTextNode("7:00-8:00"));
  timetable.appendChild(upperHole);

  //Fill hours on top
  for(let j=8; j<=21; j++)
  {
    const hour = document.createElement("div");
    hour.classList.add("time");
    hour.appendChild(document.createTextNode(`${j}:00-${j+1}:00`));
    timetable.appendChild(hour);
  }

  for(let i=1; i<=7; i++) {
    let arr = [];

    //Fill days on left side
    const day = document.createElement("div");
    day.classList.add("time");
    day.appendChild(document.createTextNode(`${days[i-1]}`));
    timetable.appendChild(day);

    //Create timeblocks
    for(let j=8; j<=21; j++) {
      const block = document.createElement("div");
      block.classList.add("block");
      block.setAttribute("day", i);
      block.setAttribute("hour", j);
      //block.appendChild(document.createTextNode(`(Day: ${i}, hour start: ${j})`));
      timetable.appendChild(block);
      arr.push(block);
    }
    blocks.push(arr);
  }

  //Trix2g returns
  const lowerHole = document.createElement("div");
  lowerHole.style.color = "#1c1c1c";
  lowerHole.appendChild(document.createTextNode("7:00-8:00"));
  timetable.appendChild(lowerHole);

  //Fill hours on bottom
  for(let j=8; j<=21; j++)
  {
    const hour = document.createElement("div");
    hour.classList.add("time");
    hour.appendChild(document.createTextNode(`${j}:00-${j+1}:00`));
    timetable.appendChild(hour);
  }
}

function main() {
  //const subjects = JSON.parse(subjs);
  //console.log(subjects);

  createTable();

  const search = document.getElementById("search");
  search.addEventListener('change', (event) => {
    listLike(event.target.value);
  });
  //let chosen = new Array(subjects.length).fill(false);
  let chosen = [true, false, true];
  colorify(blocks, chosen);
}

function listLike(str) {
  const searchList = document.getElementById("searchList");
  searchList.replaceChildren();

  const filtered = subjects.filter(subject => subject[0].toLowerCase().includes(str.toLowerCase()));
  filtered.forEach((item, i) => {
    const subjNode = document.createElement("div");

    searchList.appendChild();
  });

  console.log(filtered);

}

function colorify(blocks, chosen) {
  conflicts = [];
  let chosenSubs = subjects.filter((item, index) => chosen[index]);
  chosenSubs.forEach((item, i) => {
    for(let j=item[2]; j<item[3];j++){
      //-1 for day and -8 for hour
      const block = blocks[item[1]-1][j-8];
      const subjNode = document.createElement("div");
      subjNode.classList.add("subj");
      const p = document.createElement("p");

      subjNode.appendChild(document.createTextNode(item[0]));
      block.appendChild(subjNode);
      if(block.classList.contains("chosen")){
        block.classList.add("conflict");
        conflicts.push({day: days[item[1]-1], hour: item[2]});
      }
      else block.classList.add("chosen");
    }
  });
  console.log(conflicts);
}

main();
