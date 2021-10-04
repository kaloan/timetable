/*const subjects = [
  ["Аналитична механика(л)", 1, 10, 13],
  ["Аналитична механика(с)", 2, 14, 18],
  ["Анализ2(с)", 1, 11, 13],
  ["Анализ3(л)", 1, 12, 16]
];*/

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

//NEVER USE FILL!!!!! COPIES REFERENCE, NOT VALUE!!! JS IS RETARDED
//const chosen = Array(subjects.length);
//chosen.fill([]);
const chosen = [];
subjects.forEach((item, i) => {
  chosen.push([]);
});

const chosenList = document.getElementById("chosenList");

let saveChoises = new Set();


const shownDaysOfTheWeek = [1,2,3,4,5,6];
//Start of first block
const startingHour=8;
//Start of last block
const endingHour=21;
//Block time length
const blockLength=1;



function createTable() {
  const timetable = document.getElementById("timetable");

  //Trix2g
  const upperHole = document.createElement("div");
  upperHole.style.color = "#1c1c1c";
  upperHole.appendChild(document.createTextNode("7:00-8:00"));
  timetable.appendChild(upperHole);

  //Fill hours on top
  for(let j=8; j<=21; j++) {
    const hour = document.createElement("div");
    hour.classList.add("time");
    hour.appendChild(document.createTextNode(`${j}:00-${j+1}:00`));
    timetable.appendChild(hour);
  }

  shownDaysOfTheWeek.forEach(i => {
    let arr = [];

    //Fill days on left side
    const day = document.createElement("div");
    day.classList.add("time");
    day.appendChild(document.createTextNode(`${days[i-1]}`));
    timetable.appendChild(day);

    //Create timeblocks
    for(let j=startingHour; j<=endingHour; j+=blockLength) {
      const block = document.createElement("div");
      block.classList.add("block");
      block.setAttribute("day", i);
      block.setAttribute("hour", j);
      timetable.appendChild(block);
      arr.push(block);
    }
    blocks.push(arr);
  });

  //Trix2g returns
  const lowerHole = document.createElement("div");
  lowerHole.style.color = "#1c1c1c";
  lowerHole.appendChild(document.createTextNode("7:00-8:00"));
  timetable.appendChild(lowerHole);

  //Fill hours on bottom
  for(let j=startingHour; j<=endingHour; j+=blockLength) {
    const hour = document.createElement("div");
    hour.classList.add("time");
    hour.appendChild(document.createTextNode(`${j}:00-${j+1}:00`));
    timetable.appendChild(hour);
  }
}

function main() {
  createTable();

  const search = document.getElementById("search");
  search.addEventListener('change', (event) => {
    listLike(search.value);
  });
  const go = document.getElementById("go");
  go.addEventListener('click', (event) => {
    listLike(search.value);
  });

  const locallySavedChoices = localStorage.getItem('saveChoises');
  if(locallySavedChoices) saveChoises = new Set(JSON.parse(locallySavedChoices));

  saveChoises.forEach((subjectId) => {
    choose(subjectId);
  });
}

function listLike(str) {
  //Clear current search list
  const searchList = document.getElementById("searchList");
  searchList.replaceChildren();

  subjects.forEach((subject, index) => {
    //Only show the subjects not already chosen
    if(subject[0].toLowerCase().includes(str.toLowerCase()) && !document.getElementById(`chosenListSubjectId-${index}`)){
      const subjNode = document.createElement("div");
      subjNode.classList.add("choice");
      subjNode.id = `possibleListSubjectId-${index}`;
      subjNode.appendChild(document.createTextNode(`${subject[0]}, ${days[subject[1]-1]} ${subject[2]}-${subject[3]}`));

      subjNode.setAttribute("subjectId", index);
      subjNode.addEventListener("click", (event) => {
        const actualIndex = event.target.getAttribute("subjectId");
        choose(actualIndex);
        //Get rid of the item on the search list
        searchList.removeChild(event.target);
      });

      searchList.appendChild(subjNode);
    }
  });

}

function choose(index) {
  const chosenSubject = subjects[index];

  //Add the info to the timetable
  for(let j=chosenSubject[2]; j<chosenSubject[3];j++) {
    //-1 for day and -8 for hour
    const block = blocks[chosenSubject[1]-1][j-startingHour];
    const subjNode = document.createElement("div");
    subjNode.classList.add("subj");
    subjNode.appendChild(document.createTextNode(chosenSubject[0]));
    block.appendChild(subjNode);

    //Save the HTML nodes that should be cleared
    chosen[index].push(subjNode);

    //Show the conflict in time
    if(block.childNodes.length != 1){
      block.classList.add("conflict");
      conflicts.push({day: days[chosenSubject[1]-1], hour: chosenSubject[2]});
    }
    else block.classList.add("chosen");
  }

  //Insert the subejct in the list of chosen subjects
  const selNode = document.createElement("div");
  selNode.classList.add("choice");
  selNode.appendChild(document.createTextNode(`${chosenSubject[0]}, ${days[chosenSubject[1]-1]} ${chosenSubject[2]}-${chosenSubject[3]}`));
  selNode.setAttribute("subjectId", index);
  selNode.id = `chosenListSubjectId-${index}`;

  selNode.addEventListener("click", (event) => {
    const actualIndex = event.target.getAttribute("subjectId");
    unchoose(actualIndex);
  });
  chosenList.appendChild(selNode);

  //Save new choises to local storage
  localStorage.setItem('saveChoises', JSON.stringify(Array.from(saveChoises.add(index))));
}

function unchoose(index){
  //Delete the HTML nodes
  chosen[index].forEach((item, i) => {
      const parent = item.parentNode;
      if(parent){
        //Change the css class of the block
        if(parent.childNodes.length == 2) parent.classList.remove("conflict");
        else if (parent.childNodes.length == 1) parent.classList.remove("chosen");
        //Remove the subject from the timetable
        item.parentNode.removeChild(item);
      }
  });
  chosen[index] = [];

  const nodeToDelInChosenList = document.getElementById(`chosenListSubjectId-${index}`);
  chosenList.removeChild(nodeToDelInChosenList);

  //Refresh the choise list
  document.getElementById("go").click();

  //Save new choises to local storage
  localStorage.setItem('saveChoises', JSON.stringify(Array.from(saveChoises.delete(index))));
}

main();
