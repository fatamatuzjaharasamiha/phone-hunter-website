const searchPhone = () => {
    const searchBox = document.getElementById('search-box');
    const searchText = searchBox.value
    console.log(searchText)

    searchBox.value = '';

    // const error = document.getElementById('error')
    // if (searchText == '') {
    //     error.innerText = 'please enter phone Name'
    // }

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data.data))

}

const displayPhone = (phones) => {
    // console.log(phones)
    const searchResult = document.getElementById('search-result')
    searchResult.innerHTML = '';
    const detail = document.getElementById('show-detail')
    detail.innerHTML = '';
    const first20Phones = phones.slice(0, 20)
    console.log(first20Phones)
    // handle error
    const error = document.getElementById('error')
    if (first20Phones.length == 0) {
        error.innerText = 'Result not found,Please try again'
    }
    else {
        error.innerText = '';
    }
    first20Phones.forEach(phone => {
        console.log(phone)
        const div = document.createElement('div')
        div.classList.add('col-lg-4', 'mx-auto')
        div.innerHTML = `
        <div class="card shadow p-3 mb-5 bg-body rounded" style="width: 18rem;">
  <img src="${phone.image}" class="card-img-top w-75 mx-auto p-2" alt="...">
  <div class="card-body">
    <h5 class="card-title">${phone.phone_name}</h5>
    <h5 class="card-title">Brand:${phone.brand}</h5>
    <button onclick="details('${phone.slug}')" class="btn btn-dark" type="button">Explore</button>
  </div>
</div>`


        searchResult.appendChild(div)
    });


}
const details = (phoneId) => {

    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    fetch(url)
        .then(res => res.json())
        .then(data => showDetails(data.data))
}
const showDetails = (phone) => {
    console.log(phone)

    const showDetail = document.getElementById('show-detail')
    showDetail.innerHTML = '';
    const div = document.createElement('div')
    div.classList.add('col-lg-6', 'col-sm-12', 'mx-auto')
    div.innerHTML = `
        <div class="card shadow p-3 mb-5 bg-body rounded">
  <img src="${phone.image}" class="card-img-top w-50 mx-auto p-2" alt="...">
  <div class="card-body">
    <h5 class="card-title fw-bold text-center">${phone.name}</h5>
    <p><span class="fw-bold">Release Date : </span>${phone.releaseDate}</p>
    
    <p class="fw-bold text-primary">Features :</p>
    <p><span class="fw-bold">Chipset : </span>${phone.mainFeatures.chipSet}</p>
    <p><span class="fw-bold">Display Size : </span>${phone.mainFeatures.displaySize}</p>
    <p><span class="fw-bold">Memory : </span>${phone.mainFeatures.memory}</p>
    <p><span class="fw-bold">Sensors : </span>${phone.mainFeatures.sensors}</p>
    <p><span class="fw-bold">Storage : </span>${phone.mainFeatures.storage}</p>
    <p class="fw-bold text-primary">Others :</p>
    <p><span class="fw-bold">Bluetooth : </span>${phone.others.Bluetooth}</p>
    <p><span class="fw-bold">GPS : </span>${phone.others.GPS}</p>
    <p><span class="fw-bold">NFC : </span>${phone.others.NFC}</p>
    <p><span class="fw-bold">Radio : </span>${phone.others.Radio}</p>
    <p><span class="fw-bold">USB : </span>${phone.others.USB}</p>
    <p><span class="fw-bold">WLAN : </span>${phone.others.WLAN}</p>
    
  </div>
</div>`
    showDetail.appendChild(div)


}