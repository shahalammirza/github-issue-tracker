const allBtn = document.getElementById('all_btn')
const openBtn = document.getElementById('open_btn')
const closeBtn = document.getElementById('close_btn')

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