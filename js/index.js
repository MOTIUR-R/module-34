const loadPhone = async (searchText=13, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  // console.log(phones);
  displyPhones(phones, isShowAll);
};

const displyPhones = (phones, isShowAll) => {
  // console.log(phones);

  const phoneContainer = document.getElementById('phone-container');
  // clear card before new search
  phoneContainer.textContent = '';

  // show all button on disply if there are more phone than 12
  const showAllContainer = document.getElementById('show-all-container');
  if(phones.length > 12 && !isShowAll ){
    showAllContainer.classList.remove('hidden');
  }
  else{
    showAllContainer.classList.add('hidden');
  }

  // display no phones found
  const noPhone = document.getElementById('no-found-message');
  if(phones.length === 0){
      noPhone.classList.remove('hidden');
  }
  else{
      noPhone.classList.add('hidden');
  }

  // console.log('is show all', isShowAll);
  // disply shows only first 12 phones if not show all
  if(!isShowAll){
    phones = phones.slice(0,12);
  }

  phones.forEach((phones) => {
    // console.log(phones);
    //2- create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card p-4 bg-gray-100 border border-green-500`;
    // 3- set innerHtml
    phoneCard.innerHTML = `
    <figure>
    <img class="card-img-top w-8/12" src="${phones.image}"
        alt="Shoes" />
    </figure>
    <div class="card-body ">
        <h2 class="card-title">${phones.phone_name}</h2>
        <p>There are many variations of passages of available, but the majority have suffered</p>
        <div class="card-actions justify-center">
            <button onclick="handelShowAllDetails('${phones.slug}');" 
            class="btn text-white bg-green-500">Show Details</button>
        </div>
    </div>
    `;
    //4- append child
    phoneContainer.appendChild(phoneCard);
  });

  // hide lodding spener
  toggleLoddingDot(false);
};

// hadel show all details
const handelShowAllDetails = async(id) =>{
  // console.log('details', id);
  // load singel phone data
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const data = await res.json();
  const phone = data.data;
  showPhoneDetails(phone);

}

const showPhoneDetails = (phone) =>{
  console.log(phone);
  const phoneName = document.getElementById('phone-name');
  phoneName.innerText = phone.name;

  const showDetailsContainer = document.getElementById('show-details-container');

  showDetailsContainer.innerHTML = `
  <img src="${phone.image}" alt="">
  <p class="mt-2">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
  <p><span class="font-bold text-md">Storage :</span>${phone?.mainFeatures?.storage}</p>
  <p><span class="font-bold text-md">Display Size :</span>${phone?.mainFeatures?.displaySize}</p>
  <p><span class="font-bold text-md">Chipset :</span>${phone?.mainFeatures?.chipSet}</p>
  <p><span class="font-bold text-md">Memory :</span>${phone?.mainFeatures?.memory}</p>
  <p><span class="font-bold text-md">Slug :</span>${phone?.slug}</p>
  <p><span class="font-bold text-md">Release data :</span>${phone?.releaseDate}</p>
  <p><span class="font-bold text-md">Brand :</span>${phone?.brand}</p>
  <p><span class="font-bold text-md">GPS :</span>${phone?.others?.GPS ? phone.others.GPS: 'No GPS Availabel In This Divice'}</p>
  `;
  // <p><span class="font-bold text-md">GPS :</span>${phone?.others?.GPS || 'No GPS Availabel'}</p>

  // show the modal
  show_details_modal.showModal()
}

// handel search button
const handelSearch = (isShowAll) => {
  toggleLoddingDot(true);
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  loadPhone(searchText, isShowAll);
}

const toggleLoddingDot = (isLoding) =>{
  const loddingDot = document.getElementById('lodding-dot');
  if(isLoding){
    loddingDot.classList.remove('hidden');
  }
  else{
    loddingDot.classList.add('hidden');
  }
}

// handel show all
const handelShowAll = () => {
  handelSearch(true);
}

loadPhone();
