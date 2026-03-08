
// step 5 spinner id
const spinner = document.getElementById('spinner');

// step 7 catch the modal id
const cardModal = document.getElementById('card_modal')

// step 1 active button functionality
const allBtn = document.getElementById('all_btn')
const openBtn = document.getElementById('open_btn')
const closeBtn = document.getElementById('close_btn')

// step 2 catch the card container id
const cardContainer = document.getElementById('cardContainer');

// step 3 all cards array
let allIssues = []
let openIssues = []
let closedIssues = []
let cardCount = document.getElementById('card_Count')

// step 1
const activeBtnFunc = (id)=>{
    showLoading();
    setTimeout(()=>{
        allBtn.classList.remove('text-white', 'bg-[#4A00FF]');
        openBtn.classList.remove('text-white', 'bg-[#4A00FF]');
        closeBtn.classList.remove('text-white', 'bg-[#4A00FF]');

        allBtn.classList.add('border', 'border-[#E4E4E7]');
        openBtn.classList.add('border', 'border-[#E4E4E7]');
        closeBtn.classList.add('border', 'border-[#E4E4E7]');

        const selectBtn = document.getElementById(id);
        selectBtn.classList.add('text-white', 'bg-[#4A00FF]');

        if(id === "all_btn"){
            displayAllCards(allIssues)
        }else if(id === "open_btn"){
            displayAllCards(openIssues)
        }
        else if(id === "close_btn"){
            displayAllCards(closedIssues)
        }
        hideLoading()
    }, 300)

}

// spinner function
const showLoading = ()=>{
    spinner.classList.remove('hidden')
}

const hideLoading = ()=>{
    spinner.classList.add('hidden')
}

// step2 all cards catching fetch
const loadCards = async()=>{
    showLoading();
    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const data = await res.json();
    const allCardsItem = data.data;
    displayAllCards(allCardsItem);

    allIssues = allCardsItem;

    hideLoading();

    openIssuesFunc()
    closedIssuesFunc()

    activeBtnFunc('all_btn');
}

// step2 display all card functionality
const displayAllCards = (items)=>{
    let borderColor;
    cardContainer.innerHTML = ""

    items.forEach((item)=>{

        // adding border color with depending there status
        if(item.status === 'open'){
            borderColor = 'border-[#00A96E]'
        }else if(item.status === 'closed'){
            borderColor = 'border-[#A855F7]'
        }

        // creating all cards
        const cardWrap = document.createElement('div')
        cardWrap.setAttribute("onclick", `openCardModal(${item.id})`)
        cardWrap.className = `card_wrap bg-white shadow-sm rounded-[4px] border-t-4 ${borderColor} overflow-hidden`;
        cardWrap.innerHTML = `
            <div class="card_wrap_top p-[16px]">
                <div class="card_top flex justify-between items-center">
                    <div class="h-[24px] w-[24px] rounded-full bg-[#CBFADB] flex justify-center items-center">
                        ${item.status === 'open' ? '<img src="assets/Open-Status.png" alt="">': '<img src="assets/close.png" alt="">'}
                        
                    </div>
                    <p class="w-[80px] h-[24px] text-[12px] font-medium rounded-3xl bg-[#FEECEC] uppercase flex justify-center items-center text-[#EF4444]">${item.priority}</p>
                </div>
                <div class="card_content">
                    <h2 class="text-[14px] text-[#1F2937] font-semibold pt-[12px]">${item.title}</h2>
                    <p class="text-[12px] text-[#64748B] pt-[8px]">${item.description}</p>
                </div>
                <div class="label_box flex flex-wrap items-center gap-[4px] pt-[12px]">
                    ${createElementsLabel(item.labels)}
                </div>
            </div>
            <div class="card_wrap_bottom p-[16px] border-t border-[#E4E4E7] space-y-[8px]">
                <p class="text-[12px] text-[#64748B]">${item.author}</p>
                <p class="text-[12px] text-[#64748B]">${item.createdAt}</p>
            </div>
        
        `
        // console.log(item)
        cardContainer.append(cardWrap)
    })

    // step3 counting cards number in different tab
   let cardNumber = cardContainer.children.length;
   cardCount.innerText = cardNumber;
}

// step 4 create function for level
const createElementsLabel = (arr)=>{
    const createElementLabel = arr.map((el,index) =>{
        return `<p class="${index % 2 === 0 
            ? 'uppercase text-[12px] font-medium text-[#D97706] py-[6px] px-[8px] rounded-3xl border border-[#FDE68A] bg-[#FFF8DB] inline-block' 
            : 'uppercase text-[12px] font-medium text-[#EF4444] py-[6px] px-[8px] rounded-3xl border border-[#FECACA] bg-[#FEECEC] inline-block'}">

            ${index % 2 === 0 
                ? '<i class="fa-solid fa-bug"></i>' 
                : '<i class="fa-solid fa-life-ring"></i>' }
            ${el}
        </p>`
    })
    return(createElementLabel.join(" "))
}

// step3 filtering cards with there status and assign in the array
const openIssuesFunc = ()=>{
    const openIssueItems = allIssues.filter((item) => item.status === "open")
    openIssues = openIssueItems; 
}

const closedIssuesFunc = ()=>{

    const closedIssueItems = allIssues.filter((item) => item.status === "closed")
    closedIssues = closedIssueItems;
}

// step 6 search function
document.getElementById('search_btn').addEventListener('click', ()=>{
    const searchInput = document.getElementById('search_input');
    const searchValue = searchInput.value.trim().toLocaleLowerCase();
    
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
    .then((res) => res.json())
    .then((data) => {
        const allData = data.data;
        const filterData = allData.filter((word) => word.title.toLocaleLowerCase().includes(searchValue))
        displayAllCards(filterData)
    })
})

// step 7 modal display
const openCardModal = async(cardId)=>{
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${cardId}`);
    const data = await res.json()
    const modalData = data.data;
    cardModal.innerHTML = `
        <div class="modal-box max-w-[700px] p-[32px] ">
            <h2 class="text-[24px] font-bold text-[#1F2937] pb-[8px]">${modalData.title}</h2>
            <div class="personbox flex items-center mb-[24px]">
                <div class="badge mr-[6px] rounded-3xl bg-[#00A96E] text-[12px] font-medium text-[#fff]">${modalData.status}</div>
                <p class="flex items-center text-[12px] text-[#64748B] gap-[6px]">
                    <span class="text-[5px]"><i class="fa-solid fa-circle"></i></span> 
                    <span>Opened by ${modalData.author}</span> 
                    <span class="text-[5px]"><i class="fa-solid fa-circle"></i></span> 
                    <span>22/02/2026</span>
                </p>
            </div>
            <div>
                ${createElementsLabel(modalData.labels)}
            </div>
            <p class="text-[16px] text-[#64748B] mt-[24px]">${modalData.description}</p>
            <div class="flex bg-[#F8FAFC] p-[16px] rounded-[8px] mt-[24px]">
                <div class="author_left w-full max-w-[297px]">
                    <p class="text-[16px] text-[#64748B]">Assignee:</p>
                    <p class="text-[#1F2937] text-[16px] font-semibold">${modalData.author}</p>
                </div>
                <div class="author_right">
                    <p class="text-[16px] text-[#64748B]">Priority:</p>
                    <div class="badge bg-[#EF4444] rounded-3xl text-white">${modalData.priority}</div>
                </div>
            </div>
            <div class="modal-action">
                <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn bg-[#4A00FF] rounded-md text-white text-[16px] font-semibold outline-none">Close</button>
                </form>
            </div>
        </div>
    `
    cardModal.showModal()
}

loadCards()

