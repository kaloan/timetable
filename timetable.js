//import subjs from './subjects.json'

const subjects = [
  ["Аналитична механика(лекции)", 1, 10, 13],
  ["Аналитична механика(упражнения)", 2, 14, 18],
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

function main() {
  //const subjects = JSON.parse(subjs);
  //console.log(subjects);
  const timetable = document.getElementsByClassName("timetable")[0];

  //Trix2g
  const upperHole = document.createElement("div");
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

  let blocks = [];

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

  //let chosen = new Array(subjects.length).fill(false);
  let chosen = [true, false, true];
  colorify(blocks, chosen);
  console.log(chosen);
}

function colorify(blocks, chosen) {
  let chosenSubs = subjects.filter((item, index) => chosen[index]);
  chosenSubs.forEach((item, i) => {
    for(let j=item[2]; j<item[3];j++){
      //-1 for day and -8 for hour
      const block = blocks[item[1]-1][j-8];
      console.log(block.classList);
      const subjNode = document.createElement("div");
      subjNode.appendChild(document.createTextNode(item[0]));
      block.appendChild(subjNode);
      if(block.classList.contains("chosen")) block.classList.add("conflict");
      else block.classList.add("chosen");
    }
  });

}

main();
