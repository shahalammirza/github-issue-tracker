
// step 5 spinner id
const spinner = document.getElementById('spinner');

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

loadCards()

