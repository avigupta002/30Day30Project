const searchIcon = document.getElementById('search-icon');
const filterInput = document.getElementById('filter');

searchIcon.addEventListener('click', () => {
  filterInput.classList.toggle('active');

  if (filterInput.classList.contains('active')) {
    filterInput.focus();
  } else {
    filterInput.blur();
  }
});

const result = document.getElementById('result')
const filter = document.getElementById("filter")
const itmesList = [];

getData()

filter.addEventListener('input' , (e) => filterData(e.target.value))

async function getData () {
    const res = await fetch('https://randomuser.me/api/?results=5000')
    const {results} = await res.json()

    results.innerHTML = ''

    results.forEach(user => {
        const li = document.createElement('li')

        itmesList = `
            <img src = "${user.picture.large}" alt = "${user.name.first}"
<div class="user-info">
                <h4>${user.name.first} ${user.name.last}</h4>
                <p>${user.location.city}, ${user.location.country}</p>
            </div>
        `
        result.appendChild(li)

    })
}

function filterData(searchTerm) {
    listItems.forEach(item => {
        if(item.innerText.toLowerCase().includes(searchTerm.toLowerCase())) {
            item.classList.remove('hide')
        } else {
            item.classList.add('hide')
        }
    })
}
