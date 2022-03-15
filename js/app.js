/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/

let navContainer = document.getElementById('navbar__list');
let navList = navContainer.querySelectorAll('.navSec');
let mainSection = document.getElementsByTagName('main')[0];
let sections = document.querySelectorAll('section');
let currentSecNav=null;
addOnClickEventToNavSection(navList, sections);
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

//Start funaction that check if the section in view port or not
function isSectionInViewPort(section) {

    let section_rect = section.getBoundingClientRect();
    if (section_rect.left >= 0
        && section_rect.height >= 0
        && section_rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        && section_rect.right <= (window.innerWidth || document.documentElement.clientWidth)) {
        return true;

    } else {
        return false
    }
}
//End funaction that check if the section in view port or not


//Start function that return the section num
function sectionNumber(section) {
    return section.id.charAt(section.id.length - 1);
}
//End function that return the section num


//start function that Remove Previous Active cLasses from section list
function removeActiveClasses(SectionList) {
    SectionList.forEach(function (t) {
        if (t.classList.contains("active")) {
            t.classList.remove('active');
        }
    })
}
//End function that Remove Previous Active cLasses from section list




/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
// Build menu
//Start function that add new section to the nav section and main section
function AddNewSection() {
    let newSectionNumber = navList.length + 1;
    //create new nav element
    let newElm = document.createElement('li');
    newElm.id = "navSection" + newSectionNumber;
    newElm.className = 'navSec';

    //create new section element
    let newSec = document.createElement('section');
    newSec.id = "section" + newSectionNumber;
    newSec.setAttribute("data-nav", "Section " + newSectionNumber);

    //create div inside new section
    let sectionDiv = document.createElement('div');
    sectionDiv.className = "landing__container";


    let sectionName = prompt("Please enter section name", "Section " + newSectionNumber);
    if (sectionName != null) {
        let sectionContent = prompt("Please enter section content", "Section content of section no :  " + newSectionNumber);
        if (sectionContent != null) {

            newElm.innerHTML = sectionName;

            let sectionTitle = document.createElement('h2');
            sectionTitle.innerHTML = sectionName;
            let sectionp = document.createElement('p');
            sectionp.innerHTML = sectionContent;

            sectionDiv.appendChild(sectionTitle);
            sectionDiv.appendChild(sectionp);
            newSec.appendChild(sectionDiv);
            mainSection.appendChild(newSec);

            let btnAdd = document.getElementById("addBtn");
            btnAdd.insertAdjacentElement("beforebegin", newElm);

            //navContainer.in.appendChild(newElm);

            navContainer = document.getElementById('navbar__list');
            navList = navContainer.querySelectorAll('.navSec');
            mainSection = document.getElementsByTagName('main')[0];
            sections = document.querySelectorAll('section');

            addOnClickEventToNavSection(navList, sections);
        } else {
            alert("section content can't be empty!");
        }
    } else {
        alert("section name can't be empty!");
    }
}
//End function that add new section to the nav section and main section 


//scroll event 
document.addEventListener('scroll', function (event) {
    sections.forEach(function (s) {
        event.preventDefault();
        if (isSectionInViewPort(s)) {
            let sectionNum = sectionNumber(s);
            removeActiveClasses(navList);
                navList[sectionNum - 1].classList.add('active');
        }

    })
})

//Start to add click event to nave sections

function clicklSectionListener(s,n) {
    setTimeout(() => {
        let activeNavs = navContainer.getElementsByClassName("active");
        activeNavs[0].classList.remove("active");

        // Set sections as active
        n.setAttribute("id","currentSec");
        n.className = n.className + " active";
        // Scroll to anchor ID using scrollTO event
         //s.scrollIntoView(true);
        s.scrollIntoView(true,{behavior: "smooth"});
    }, 0);

}

function addOnClickEventToNavSection(navList, sections) {
    for (let i = 0; i < navList.length; i++) {
        navList[i].addEventListener('click', (event) => 
        {
            clicklSectionListener(sections[i],navList[i]);
            event.preventDefault();
        }
        )
    }
}
//End to add click event to nave sections

/**
 * End Main Functions
 * Begin Events
 *
*/






