const navLinks = document.querySelectorAll('.nav-item')
const menuToggle = document.getElementById('navbarSupportedContent')
const bsCollapse = new bootstrap.Collapse(menuToggle, { toggle: false })
const modal = document.querySelector('.modal-body')

navLinks.forEach((l) => {
  l.addEventListener('click', () => {
    bsCollapse.toggle()
  })
})

const rosdates = [
  { month: 'Jun', day: '04' },
  { month: 'Jun', day: '11' },
  { month: 'Jun', day: '18' },
  { month: 'Jun', day: '25' },
  { month: 'Jul', day: '09' },
  { month: 'Jul', day: '16' },
  { month: 'Aug', day: '06' },
  { month: 'Aug', day: '13' },
  { month: 'Aug', day: '20' },
  { month: 'Aug', day: '27' },
  { month: 'Sep', day: '03' },
  { month: 'Sep', day: '17' },
  { month: 'Sep', day: '24' },
  { month: 'Oct', day: '01' },
  { month: 'Oct', day: '08' },
  { month: 'Oct', day: '22' },
  { month: 'Oct', day: '29' },
  { month: 'Nov', day: '12' },
]

function updateRosDates() {
  let rosDates = document.querySelector('#rosDates')
  rosdates.forEach((date) => {
    rosDates.innerHTML += `
        <div class="postdate text-center">
          <div class="month pb-1">${date.month}</div>
          <div class="day d-30">${date.day}</div> 
        </div>
        `
  })
}

function showModal(info) {
  if (info == 'ros') {
    modal.innerHTML = `
        <div class="card-body text-center">
        <div class="ros" style="background-image: url('images/roslindale.jpg')">
          <h1 class="card-title ros" style="background-image: url('images/roslindale.jpg')">Roslindale <br>Summer Farmers Market</h1>
        </div>
          <h5 class="card-text">2:00pm - 6:30pm</h5>
          <h5>30 Chestnut Hill Ave, Brighton, MA 02135</h5>

        <div id="rosdates"class="d-flex flex-row flex-wrap justify-content-center">

        </div>
          <a href="https://www.roslindale.net/farmers-market" target="_blank" class="btn btn-warning mt-3">More info</a>
        </div>

        `
  } else if (info == 'bright') {
    modal.innerHTML = `
        <div class="card-body text-center">
          <div class="bright" style="background-image: url('images/location.jpg')">
            <h1 class="card-title">Brighton Summer Farmers Market</h1>
          </div
          <h5>Septemeber 7th<h5>
          <h5 class="card-text">2:00pm - 6:30pm</h5>
          <h5>30 Chestnut Hill Ave, Brighton, MA 02135</h5>
          <a href="https://brightonfarmersmarket.org/" target="_blank" class="btn btn-warning">More info</a>
        </div>
        `
  } else {
    modal.innerHTML = `
        <div class="card-body text-center">
            <div class="pop" style="background-image: url('images/pop.jpg')">
                <h1 class="card-title">POPPORTUNITY STARLIGHT SQUARE</h1>
            </div>
            <h5> Every Sat & Sun  <br> from August 7th - October 16th<h5>
            <h5 class="card-text">12:00pm - 6:00pm</h5>
            <h5>84 Bishop Allen Drive Central Square, Cambridge MA</h5>
            <a href="https://www.starlightsquare.org/popportunity" target="_blank" class="btn btn-warning">More info</a>
        </div>
        `
  }
}
