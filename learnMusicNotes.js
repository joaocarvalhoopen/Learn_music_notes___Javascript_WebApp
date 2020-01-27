/******************************************************************************
 *                             learnMusicNotes.js
 * 
 *                This webApp will help you to read music scores.
 * 
 ******************************************************************************
 * Author: Joao Nuno Carvalho
 *
 * Date:   2020.01.27
 * 
 * Description: This is a simple webApp made in Javascript to run inside a
 *              browsers web page and it will help you to learn to identify
 *              each musical note in the staff.  With it you will learn almost
 * all notes of the most important 4 octaves. If you train with this app with
 * same regularity, in a short time, you will able to identify and read the
 * notes on the staff at a fast pace.
 * The principal technique used in this App is the fact that you can stack
 * div’s tag’s containing image objects inside them. An outer boundary div is
 * created and then inner div’s with absolute position inside them are stacked.
 * The images are all SVG’s (Scaled Vector Graphics).
 * 
 * Music score SVG images: All the music score SVG images used on this webApp
 *                         have a Creative Commons license and they were
 *                         obtained from the following Wikipedia page.
 *      Wikipedia Category:Musical score components
 *      https://commons.wikimedia.org/wiki/Category:Musical_score_components
 * 
 * License: MIT Open Source except the SVG images that have their own license. 
 *
 * For more details see the project page in GitHub at:
 *   https://github.com/joaocarvalhoopen/Learn_music_notes___Javascript_WebApp
 * 
 ******************************************************************************
 */

let CLEAR   = 0;
let CORRECT = 1;
let WRONG   = 2;

let notesList = [
                [0,   -5, 'B', 'B5'],
                [1,    1, 'A', 'A5'],
                [2,    8, 'G', 'G5'],
                [3,   14, 'F', 'F5'],
                [4,   20, 'E', 'E5'],
                [5,   26, 'D', 'D5'],
                [6,   31, 'C', 'C5'],
                [7,   38, 'B', 'B4'],
                [8,   43, 'A', 'A4'],
                [9,   50, 'G', 'G4'],      // Sol
                [10,  55, 'F', 'F4'],
                [11,  61, 'E', 'E4'],
                [12,  67, 'D', 'D4'],
                [13,  74, 'C', 'C4'],
                [14,  80, 'B', 'B3'],
                [15,  86, 'A', 'A3'],
                [16,  92, 'G', 'G3'],
                [17,  98, 'F', 'F3'],      // Fa   
                [18, 104, 'E', 'E3'],
                [19, 110, 'D', 'D3'],
                [20, 116, 'C', 'C3'],
                [21, 122, 'B', 'B2'],
                [22, 128, 'A', 'A2'],
                [23, 134, 'G', 'G2'],
                [24, 140, 'F', 'F2'],
                [25, 146, 'E', 'E2'],
                [26, 152, 'D', 'D2']
                ];

let mapNotes = { C: 'Do',
                 D: 'Re',
                 E: 'Mi',
                 F: 'Fa',
                 G: 'Sol',
                 A: 'La',
                 B: 'Si'  };

let currNoteEntry = getNoteEntry(9); // G4 - Sol


function getNoteEntry(index) {
    return notesList[index];
}

function getCurrNoteIndex() {
    return currNoteEntry[0];
}

function getCurrNoteDisplayPos() {
    return currNoteEntry[1];
}

function getCurrNoteLetterRelative(){
    return currNoteEntry[2];
}

function getCurrNoteLetterAbsolute(){
    return currNoteEntry[3];
}

function updateDrawNote(){
    // Move the note to the correct position.

    // <div class="note" style="position: absolute; display: block; left: 88px; top: 50px; "></div>
    let topPos = getCurrNoteDisplayPos();
    let element = document.getElementById("divNote");
    element.style["top"] = topPos.toString() + "px";
}

function chooseRandomlyNextNote(){
    let currIndex = getCurrNoteIndex(); 
    let index = currIndex;
    while (index === currIndex){
        index = Math.floor((Math.random() * notesList.length));
    } 
    // Update new state.
    currNoteEntry = getNoteEntry(index);
    updateDrawNote();
}

function writeResultText(result){
    let element = document.getElementById("resultText");
    
    if (result === CORRECT){
        element.style["color"] = "blue";
        element.innerText = "Correct - " + getCurrNoteLetterAbsolute() + " - "+ mapNotes[getCurrNoteLetterRelative()];
    }else if (result === WRONG){
        element.style["color"] = "red";
        element.innerText = "Incorrect!";
    }else if (result === CLEAR){
        element.style["color"] = "black";
        element.innerText = " ";
    }
}

function clickOnButton(note){
    let currNote = getCurrNoteLetterRelative();
    if (note !== currNote){
        writeResultText(WRONG);

        // Set timeout to Clear text.
        // Callback function in timeout.
        setTimeout( () => writeResultText(CLEAR), 2000);
    } else if (note === currNote){
        writeResultText(CORRECT);
        
        // Set timeout to Clear text and random next note.
        // Callback function in timeout.
        setTimeout( () =>{
                writeResultText(CLEAR);
                chooseRandomlyNextNote();
            }, 2500);
    }
}

function init(){
    // Choose initial note entry.
    chooseRandomlyNextNote();
}

