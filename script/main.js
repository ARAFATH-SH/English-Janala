const levels = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res => res.json())
    .then(data => displayLevels(data.data))
}

// const lessonsApi = () => {
//     fetch("https://openapi.programming-hero.com/api/words/all")
//     .then(res => res.json())
//     .then(data => displayLessons(data.data))
// }

const displayLessons = (lessons) => {
    const lessonContainer = document.getElementById("lesson-container");
    lessonContainer.innerHTML = "";

    if (lessons.length === 0) {
        lessonContainer.innerHTML = `
        <div class="flex flex-col items-center justify-center text-center">
                    <div class="">
                        <img class="text-center" src="assets/alert-error.png" alt="">
                    </div>
                    <div >
                        <p class="text-xl text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                        <h1 class="text-3xl mt-5 font-bold">নেক্সট Lesson এ যান</h1>
                </div>
        </div>
        `  
        return;
    }

    lessons.forEach((element) => {
        const lessondiv = document.createElement("div");
        lessondiv.innerHTML = `
        <div class="card bg-base-100 h-[400px] card-lg shadow-sm object-cover">
                    <div class="card-body">
                        <h2 class="text-3xl font-bold" >${element.word}</h2>
                        <p class="text-xl font-semibold mt-3">Meaning/Pronounciation</p>
                        <p class="text-3xl font-semibold mt-5">"${element.meaning}/${element.pronunciation}"</p>
                        <div class="flex justify-between mt-10">
                            
                            <button id="modalBtn" onclick="loadModal(${element.id})" class="btn bg-sky-100 rounded-sm"> <img class="w-7 h-7" src="https://img.icons8.com/?size=60&id=59817&format=png" alt=""></button>   
                            <button onclick="pronounceWord('${element.word}')" class="btn bg-sky-100 rounded-sm"><img class="w-7 h-7" src="https://img.icons8.com/?size=96&id=XXKS9oY4uqiZ&format=png" alt=""></button>
                            
                        </div>
                    </div>
                    </div>
        `
        lessonContainer.appendChild(lessondiv);
    });
}

const displayLevels = (levels) => {
    const levelContainer = document.getElementById("level-container");
    for(let level of levels){
        const leveldiv = document.createElement("div");
        leveldiv.innerHTML = `
        <button onclick="loadLevel(${level.level_no} )" class="flex items-center btn bg-white border border-blue-600 m-2 hover:bg-blue-700 hover:text-white font-bold"><img class="w-6 h-6" src="https://img.icons8.com/?size=96&id=PaMqeFJp6WDW&format=png" alt=""> Lesson-${level.level_no}</button>
        `
        levelContainer.appendChild(leveldiv);
    }
}   

const loadLevel = (level_no) => {
    if(level_no > 0){
        const clickedLevel = document.getElementById("clickBtn");
        clickedLevel.classList.add("hidden");
    }
    const url = `https://openapi.programming-hero.com/api/level/${level_no}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayLessons(data.data))
}

const loadModal = (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayModal(data.data))
}

const displayModal = (data) => {
    document.getElementById("word_details").showModal();
    const modalTitle = document.getElementById("details_container");
    modalTitle.innerHTML = `
    <h2 class="text-3xl font-bold" >${data.word} (${data.pronunciation})</h2>
    <h4 class="text-xl font-semibold mt-5">Meaning</h4>
    <p class="text-3xl mt-5">${data.meaning}</p>
    <h4 class="text-xl font-semibold mt-5">Example</h4>
    <p class="text-3xl mt-5">${data.sentence}</p>
    <h4 class="text-xl font-semibold mt-5">সমার্থক শব্দ গুলো</h4>
    `
    for(let synonym of data.synonyms){
        modalTitle.innerHTML += `
        <button class="btn bg-sky-100 rounded-sm text-xl mt-5">${synonym}</button>
        `
    }
}

function pronounceWord(word) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-EN'; // English
      window.speechSynthesis.speak(utterance);
    }

document.getElementById("lgout").addEventListener("click", function() {
    window.location.href = "index.html";
})

levels();