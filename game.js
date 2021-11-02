function Bear() {
    // Number of steps (in pixels) made by the bear when moved
    this.dBear = 100;
    this.htmlElement = document.getElementById("bear");
    this.id = this.htmlElement.id;
    this.x = this.htmlElement.offsetLeft;
    this.y = this.htmlElement.offsetTop;

    // Allows to move bear in horizontal and vertical directions
    this.move = function(xDir, yDir) {
        // Keeps bear within board
        this.fitBounds();
        this.x += this.dBear * xDir;
        this.y += this.dBear * yDir;
        this.display();
    };

    // Displays bear at new position
    this.display = function() {
        this.htmlElement.style.left = this.x + "px";
        this.htmlElement.style.top = this.y + "px";
        this.htmlElement.style.display = "block";
    };

    this.fitBounds = function() {
        let parent = this.htmlElement.parentElement;
        let iw = this.htmlElement.offsetWidth;
        let ih = this.htmlElement.offsetHeight;
        let l = parent.offsetLeft;
        let t = parent.offsetTop;
        let w = parent.offsetWidth;
        let h = parent.offsetHeight;
        if (this.x <= 0) {
            this.x = 0; 
        }
        if (this.x >= w - iw) {
        this.x = w - iw;
        }
        if (this.y <= 0) { 
            this.y = 0;
        }
        if (this.y >= h - ih) {
            this.y = h - ih;
        }
    };
}

// To start the game
function start(){
    // Create bear
    bear = new Bear();
    // Add event listener for moveBear function to detect keypress event
    document.addEventListener("keydown",moveBear,false);
    // Add event listener to detect change in bear speed
    document.addEventListener("change", setSpeed);
    // Add event listener to detect keydown event (in order to get start time)
    document.addEventListener("keydown",lastSting);
    // Create array of bees
    bees = new Array();
    // Call makeBees() and updateBees() methods to create bees, update positions, etc.
    makeBees();
    updateBees();
}

/* Function to start duration after either:
    > Getting stung by bee
    > Moving the Bear   
*/
function lastSting(){
    // Get start time
    lastStingTime = new Date();
    // Remove event listener to prevent repeated start times
    document.removeEventListener("keydown",lastSting);
}

// Function to restart game
function restart(){
    // Set hits to default value i.e., 0
    hits.innerHTML = 0;
    // Set duration to default value i.e., "?"
    duration.innerHTML="?";
    // Remove bees from board
    removeBees();
}

// Function to reload game
function reload(){
    window.location.reload();
}

// Function to move the bear based on keyboard events
function moveBear(e) {

    //codes of the four keys
    const KEYUP = 38;
    const KEYDOWN = 40;
    const KEYLEFT = 37;
    const KEYRIGHT = 39;

    // right key
    if (e.keyCode == KEYRIGHT) {
        // x positive
        bear.move(1, 0)
    } 

    // left key
    if (e.keyCode == KEYLEFT) {
        // x negative
        bear.move(-1, 0)
    } 

    // up key
    if (e.keyCode == KEYUP) {
        // y negative
        bear.move(0, -1)
    } 
    
    // down key
    if (e.keyCode == KEYDOWN) {
        // y positive
        bear.move(0, 1)
    } 
}

// Function to set movement speed of bear in pixels
function setSpeed(){
    // Set speed of bear from html file
    bear.dBear = document.getElementById("speedBear").value;
    // If speed is not a number, return window alert to user
    if (isNaN(bear.dBear)) {
        window.alert("Invalid speed!");
        return;
    }
}
   
class Bee{
    constructor(beeNumber) {
        //the HTML element corresponding to the IMG of the bee
        this.htmlElement = createBeeImg(beeNumber);
        //HTML ID
        this.id = this.htmlElement.id
        //the left position (x)
        this.x = this.htmlElement.offsetLeft;
        //the top position (y)
        this.y = this.htmlElement.offsetTop;
        this.move = function(dx, dy) {
        //move the bees by dx, dy
        this.x += dx;
        this.y += dy;
        this.display();
        };

        this.display = function() {
        //adjust position of bee and display it
            this.fitBounds();//add this to adjust to bounds
            this.htmlElement.style.left = this.x + "px";
            this.htmlElement.style.top = this.y + "px";
            this.htmlElement.style.display = "block";
        };

        this.fitBounds = function() {
        //check and make sure the bees stays in the board space
        let parent = this.htmlElement.parentElement;
        let iw = this.htmlElement.offsetWidth;
        let ih = this.htmlElement.offsetHeight;
        let l = parent.offsetLeft;
        let t = parent.offsetTop;
        let w = parent.offsetWidth;
        let h = parent.offsetHeight;

        if (this.x < 0)
        this.x = 0;
        if (this.x > w - iw)
        this.x = w - iw;
        if (this.y < 0)
        this.y = 0;
        if (this.y > h - ih)
        this.y = h - ih;
        };
    } 
}

function createBeeImg(wNum) {
    //get dimension and position of board div
    let boardDiv = document.getElementById("board");
    let boardDivW = boardDiv.offsetWidth;
    let boardDivH = boardDiv.offsetHeight;
    let boardDivX = boardDiv.offsetLeft;
    let boardDivY = boardDiv.offsetTop;

    //create the IMG element
    let img = document.createElement("img");
    img.setAttribute("src", "images/bee.gif");
    img.setAttribute("width", "100");
    img.setAttribute("alt", "A bee!");
    img.setAttribute("id", "bee" + wNum);
    img.setAttribute("class", "bee"); //set class of html tag img

    //add the IMG element to the DOM as a child of the board div
    img.style.position = "absolute";
    boardDiv.appendChild(img);

    //set initial position 
    let x = getRandomInt(boardDivW);
    let y = getRandomInt(boardDivH);
    img.style.left = (boardDivX + x) + "px";
    img.style.top = (boardDivY + y) + "px";
    //return the img object
    return img;
}   

// Get random integer between 0 and max parameter
function getRandomInt(max){
    // Math.random gets random integer between 0 to max
    // Math.floor rounds random number downwards
    return Math.floor(Math.random()*max);
}

function makeBees() {
    //get number of bees specified by the user
    let nbBees = document.getElementById("nbBees").value;
    // Convert content of input to number
    nbBees = Number(nbBees); 
    // Check whether input is valid
    if (isNaN(nbBees)) {
        window.alert("Invalid number of bees");
        return;
    }
    // For creating bees
    let i = 1;
    while (i <= nbBees) {
        var num = i;
        var bee = new Bee(num); // Create object with IMG element
        bee.display(); // Display bee
        bees.push(bee); // Add bee to bees array
        i++;
    }
}

// Function to add bee
function addBee() {
    // Get current number of bees from html file
    let nbBees = document.getElementById("nbBees").value;  
    // Increment number of bees
    nbBees++;
    // Update number of bees in input field
    document.getElementById("nbBees").value = nbBees;
    // Create new bee object
    var bee = new Bee(nbBees);
    // Display bee
    bee.display();
    // Push bee to array
    bees.push(bee);
}

// Function to remove bees while restarting game
function removeBees(){
    // Get current value of bees
    let nbBees = document.getElementById("nbBees").value;
    // As long as the number of bees is more than 0
    while (nbBees!=0){
        // Since the board consists of children elements such as the bear and the bees (images)
        // We can obtain the bee ID's
        numBee = ('bee' + nbBees);
        // Remove image through current bee ID 
        document.getElementById(numBee).remove();
        // Pop/remove bee from array
        bees.pop();
        // Decrement number of bees
        nbBees--;
    }
}

// Function to move bees
function moveBees() { 
    // Get speed of bee from html document
    let speed = document.getElementById("speedBees").value;
    for (let i = 0; i < bees.length; i++) { 
        let dx = getRandomInt(2 * speed) - speed; 
        let dy = getRandomInt(2 * speed) - speed; 
        bees[i].move(dx, dy); 
        isHit(bees[i], bear);
    } 
}

function updateBees() { 
    // move the bees randomly
    moveBees(); 
    let score = document.getElementById("hits").innerHTML; 
    // Get periodTimer from input field
    let period = document.getElementById("periodTimer").value;
    // Check whether score meets condition of less than or equal to 1000 stings
    if (score>=1000){
        // Stop timer
        clearTimeout(updateTimer);
        // Return window alert to user stating "Game Over"
        window.alert("Game Over!");
    }
    else{
        // If score below 1000; keep updating timer
        updateTimer = setTimeout('updateBees()', period);
    }
}

function isHit(defender, offender) {
    // Check whether the two images are overlapping
    if (overlap(defender, offender)) { 
        let score = hits.innerHTML;   
        // Increment Score
        score = Number(score) + 1; 
        // Display New Score
        hits.innerHTML = score; 
        
        // Calculate the longest duration
        let newStingTime = new Date();
        let thisDuration = Number(newStingTime - lastStingTime);
        lastStingTime = newStingTime;
        let longestDuration = duration.innerHTML;
        // Since initial value is "?" i.e., NaN, add an OR condition in IF statement to check for not a number.
        if (longestDuration === 0 || isNaN(longestDuration)) {
            // Assign longest duration
            longestDuration = thisDuration;
        } else {
            // Update longest duration
            if (longestDuration < thisDuration) {
                longestDuration = thisDuration;
            }
        }
        // Update duration in HTML page
        document.getElementById("duration").innerHTML = longestDuration;
    }
}

function overlap(element1, element2) {
    //consider the two rectangles wrapping the two elements
    //rectangle of the first element
    left1 = element1.htmlElement.offsetLeft; 
    top1 = element1.htmlElement.offsetTop; 
    right1 = element1.htmlElement.offsetLeft + element1.htmlElement.offsetWidth; 
    bottom1 = element1.htmlElement.offsetTop + element1.htmlElement.offsetHeight; 
    //rectangle of the second element
    left2 = element2.htmlElement.offsetLeft; //e2x
    top2 = element2.htmlElement.offsetTop; //e2y
    right2 = element2.htmlElement.offsetLeft + element2.htmlElement.offsetWidth;
    bottom2 = element2.htmlElement.offsetTop + element2.htmlElement.offsetHeight; 
    //calculate the intersection of the two rectangles
    x_intersect = Math.max(0, Math.min(right1, right2) - Math.max(left1, left2));
    y_intersect = Math.max(0, Math.min(bottom1, bottom2) - Math.max(top1, top2));
    intersectArea = x_intersect * y_intersect;
    //if intersection is nil no hit
    if (intersectArea == 0 || isNaN(intersectArea)) {
        return false;
    }
        return true;
}


