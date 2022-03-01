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
    const first20Phones = phones.slice(0, 20)
    console.log(first20Phones)
    const error = document.getElementById('error')
    if (first20Phones.length == 0) {
        error.innerText = 'Result not found,Please try again'
    }
    first20Phones.forEach(phone => {
        console.log(phone)
        const div = document.createElement('div')
        div.className = "col-lg-4"
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
}