// step 1 active button functionality
const allBtn = document.getElementById('all_btn')
const openBtn = document.getElementById('open_btn')
const closeBtn = document.getElementById('close_btn')


// step 2 catch the card container id
const cardContainer = document.getElementById('cardContainer');

const activeBtnFunc = (id)=>{
    allBtn.classList.remove('text-white', 'bg-[#4A00FF]');
    openBtn.classList.remove('text-white', 'bg-[#4A00FF]');
    closeBtn.classList.remove('text-white', 'bg-[#4A00FF]');

    allBtn.classList.add('border', 'border-[#E4E4E7]');
    openBtn.classList.add('border', 'border-[#E4E4E7]');
    closeBtn.classList.add('border', 'border-[#E4E4E7]');

    const selectBtn = document.getElementById(id);
    selectBtn.classList.add('text-white', 'bg-[#4A00FF]');
}
activeBtnFunc('all_btn')


// step2 all cards catching fetch
const loadCards = async()=>{
    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const data = await res.json();
    const allCardsItem = data.data;
    displayAllCards(allCardsItem);
}

// step2 display all card functionality
const displayAllCards = (items)=>{
    cardContainer.innerHTML = ""

    items.forEach((item)=>{
        const cardWrap = document.createElement('div')
        cardWrap.className = 'card_wrap bg-white shadow-sm rounded-[4px] border-t-4 border-[#00A96E] overflow-hidden';
        cardWrap.innerHTML = `
            <div class="card_wrap_top p-[16px]">
                <div class="card_top flex justify-between items-center">
                    <div class="h-[24px] w-[24px] rounded-full bg-[#CBFADB] flex justify-center items-center">
                        <img src="assets/Open-Status.png" alt="">
                    </div>
                    <p id="status" class="w-[80px] h-[24px] rounded-3xl bg-[#FEECEC] uppercase flex justify-center items-center text-[#EF4444]">${item.priority}</p>
                </div>
                <div class="card_content">
                    <h2 class="text-[14px] text-[#1F2937] font-semibold pt-[12px]">${item.title}</h2>
                    <p class="text-[12px] text-[#64748B] pt-[8px]">${item.description}</p>
                </div>
                <div class="label_box flex items-center gap-[4px] pt-[12px]">
                    <p class="uppercase text-[12px] font-medium text-[#EF4444] py-[6px] px-[8px] rounded-3xl border border-[#FECACA] bg-[#FEECEC] inline-block"><i class="fa-solid fa-bug"></i> Bug</p>
                    <p class="uppercase text-[12px] font-medium text-[#D97706] py-[6px] px-[8px] rounded-3xl border border-[#FDE68A] bg-[#FFF8DB] inline-block"><i class="fa-solid fa-life-ring"></i> help wanted</p>
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
}
// displayAllCards()
loadCards()
