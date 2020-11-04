function renderMenu() {
  return `
            <li class="m-menu__item" aria-haspopup="true"><a href="/servers" class="m-menu__link"><i
              class="m-menu__link-icon flaticon-layers"></i><span class="m-menu__link-text">Server List</span></a>
            </li>
  `;
}

module.exports = {
  renderMenu
}