const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhone(phones, isShowAll);
};

const displayPhone = (phones, isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");
  //   clear phone container before adding new card
  phoneContainer.textContent = "";
  //   show all button if there are more than 12 phone
  const showAllContainer = document.getElementById("show-all-container");
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }
  // display only first 12 phone
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }
  phones.forEach((phone) => {
    const phoneCard = document.createElement("div");
    phoneCard.className = `card bg-base-100 p-4 shadow-xl`;
    phoneCard.innerHTML = `
    <figure>
            <img
            src="${phone.image}"
            alt="Shoes"
            />
        </figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
            <button class="btn btn-primary" onclick="handleShowDetails('${phone.slug}');">Show Details</button>
            </div>
        </div>
    `;
    phoneContainer.appendChild(phoneCard);
  });
  //   hide loading spinner
  toggleLoadingSpinner(false);
};
// show Details

const handleShowDetails = async (id) => {
  console.log(id);
  const res = await fetch(
    ` https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  console.log(phone.name);
  showPhoneDetails(phone);
};
const showPhoneDetails = (phone) => {
  const phoneName = document.getElementById("show-details-phone-name");
  phoneName.innerText = phone.name;

  const showDetailsContainer = document.getElementById("show-detail-container");
  showDetailsContainer.innerHTML = `
  <img class="mx-auto" src="${phone.image}" alt="" />
  <p><b>Storage: </b><span>${phone?.mainFeatures?.storage}</span></p>
  <p><b>Display Size: </b><span>${phone?.mainFeatures?.displaySize}</span></p>
  <p><b>Chip Set: </b><span>${phone?.mainFeatures?.chipSet}</span></p>
  <p><b>Memory: </b><span>${phone?.mainFeatures?.memory}</span></p>
  <p><b>Slug: </b><span>${phone?.slug}</span></p>
  <p><b>Release Date: </b><span>${phone?.releaseDate}</span></p>
  <p><b>Brand: </b><span>${phone?.brand}</span></p>
  <p><b>GPS: </b><span>${phone?.others?.GPS}</span></p>
  `;
  show_details_modal.showModal();
  console.log(phone);
};
// Search handle
const handleSearch = (isShowAll) => {
  const searchField = document.getElementById("search-field");
  searchText = searchField.value;
  loadPhone(searchText, isShowAll);
};
// Search handle recap
const handleSearch2 = () => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("search-field2");
  searchText = searchField.value;
  loadPhone(searchText);
};
const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

// handle Show ALl
const handleShowAll = () => {
  handleSearch(true);
};
// loadPhone();
