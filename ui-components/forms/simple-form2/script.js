document.addEventListener("DOMContentLoaded", function () {
  const yearSelect = document.getElementById("year")
  const currentYear = new Date().getFullYear()

  for (let year = 1900; year <= currentYear; year++) {
    let option = document.createElement("option")
    option.value = year
    option.textContent = year
    yearSelect.appendChild(option)
  }

  yearSelect.value = currentYear
})
