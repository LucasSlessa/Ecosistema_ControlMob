// SIDEBAR DROPDOWN
const allDropdown = document.querySelectorAll('#sidebar .side-dropdown');

allDropdown.forEach(item => {
  const a = item.parentElement.querySelector('a:first-child');
  a.addEventListener('click', function (e) {
    if (this.getAttribute('href') && !this.getAttribute('href').includes('#')) {
      return;
    }

    e.preventDefault();

    if (!this.classList.contains('active')) {
      allDropdown.forEach(i => {
        const aLink = i.parentElement.querySelector('a:first-child');
        aLink.classList.remove('active');
        i.classList.remove('show');
      });
    }

    this.classList.toggle('active');
    item.classList.toggle('show');
  });
});

// SIDEBAR COLLAPSE
const toggleSidebar = document.querySelector('nav .toggle-sidebar');
const allSideDivider = document.querySelectorAll('#sidebar .divider');

if(sidebar.classList.contains('hide')) {
  allSideDivider.forEach(item => {
    item.textContent = '-'
  });
  allDropdown.forEach(item => {
    const a = item.parentElement.querySelector('a:first-child');
    a.classList.remove('active');
    item.classList.remove('show');
  });
} else {
  allSideDivider.forEach(item => {
    item.textContent = item.dataset.text;
  });
}

toggleSidebar.addEventListener('click', function () {
  sidebar.classList.toggle('hide');

  if(sidebar.classList.contains('hide')) {
    allSideDivider.forEach(item => {
      item.textContent = '-';
    });

    allDropdown.forEach(item => {
      const a = item.parentElement.querySelector('a:first-child');
      a.classList.remove('active');
      item.classList.remove('show');
    });
  } else {
    allSideDivider.forEach(item => {
      item.textContent = item.dataset.text;
    });
  }
});

sidebar.addEventListener('mouseleave', function () {
  if(this.classList.contains('hide')) {
    allDropdown.forEach(item => {
      const a = item.parentElement.querySelector('a:first-child');
      a.classList.remove('active');
      item.classList.remove('show');
    });
    allSideDivider.forEach(item => {
      item.textContent = '-';
    });
  }
});

sidebar.addEventListener('mouseenter', function () {
  if(this.classList.contains('hide')) {
    allDropdown.forEach(item => {
      const a = item.parentElement.querySelector('a:first-child');
      a.classList.remove('active');
      item.classList.remove('show');
    });
    allSideDivider.forEach(item => {
      item.textContent = item.dataset.text;
    });
  }
});

// PROFILE DROPDOWN
const profile = document.querySelector('nav .profile');
const imgProfile = profile.querySelector('img');
const dropdownProfile = profile.querySelector('.profile-link');

imgProfile.addEventListener('click', function () {
  dropdownProfile.classList.toggle('show');
});

const toggleButton = document.getElementById('toggle-dark-mode');
const htmlElement = document.documentElement;

// Função para atualizar as cores do gráfico com base no tema
function updateChartTextColor(isDarkMode) {
  // Defina a cor do texto das categorias com base no tema
  const textColor = isDarkMode ? '#f8f8f8' : '#333';  // Cor do texto das categorias

  // Atualizando o gráfico
  chart.updateOptions({
    xaxis: {
      labels: {
        style: {
          colors: Array(4).fill(textColor),  // Aplique a cor do texto para todas as categorias
        },
      },
    },
  });
}

// Configurações do gráfico
var options = {
  series: [{
    name: 'Clientes',
    data: [102, 88, 66, 79]  // 4 valores para 4 barras
	
  }],
  chart: {
    height: 350,
    type: 'bar'  // Tipo de gráfico: barras
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
  },
  xaxis: {
    categories: ['Colaboradores', 'Entregas', 'Serviços', 'WMS'],  // 4 categorias
    labels: {
      style: {
        colors: ['#333', '#333', '#333', '#333'],  // Cor inicial das categorias (claro)
      },
    },
  },
  tooltip: {
    shared: true,
    intersect: false
  },
};

// Inicializando o gráfico
var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();

// Evento para alternar o modo escuro
toggleButton.addEventListener('click', () => {
  htmlElement.classList.toggle('dark-mode');
  const isDarkMode = htmlElement.classList.contains('dark-mode');
  
  // Atualizando a cor do texto das categorias quando o modo escuro é ativado/desativado
  updateChartTextColor(isDarkMode);

  // Salvar a preferência no localStorage
  localStorage.setItem('darkMode', isDarkMode);
});

// Manter a preferência ao recarregar a página
window.addEventListener('load', () => {
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  if (isDarkMode) {
    htmlElement.classList.add('dark-mode');
  }

  // Atualizar a cor do texto das categorias baseado na preferência de tema
  updateChartTextColor(isDarkMode);
});

// MENU
const allMenu = document.querySelectorAll('main .content-data .head .menu');

allMenu.forEach(item => {
  const icon = item.querySelector('.icon');
  const menuLink = item.querySelector('.menu-link');

  icon.addEventListener('click', function () {
    menuLink.classList.toggle('show');
  });
});

window.addEventListener('click', function (e) {
  if (e.target !== imgProfile) {
    if (e.target !== dropdownProfile) {
      if (dropdownProfile.classList.contains('show')) {
        dropdownProfile.classList.remove('show');
      }
    }
  }

  allMenu.forEach(item => {
    const icon = item.querySelector('.icon');
    const menuLink = item.querySelector('.menu-link');

    if (e.target !== icon) {
      if (e.target !== menuLink) {
        if (menuLink.classList.contains('show')) {
          menuLink.classList.remove('show');
        }
      }
    }
  });
});

// PROGRESSBAR
const allProgress = document.querySelectorAll('main .card .progress');

allProgress.forEach(item => {
  item.style.setProperty('--value', item.dataset.value);
});


   // Gráfico de Vendas
   const salesCtx = document.getElementById('salesChart').getContext('2d');
   new Chart(salesCtx, {
       type: 'line',
       data: {
           labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
           datasets: [{
               label: 'Vendas',
               data: [12, 19, 3, 5, 2, 3],
               borderColor: '#4A90E2',
               backgroundColor: 'rgba(74, 144, 226, 0.2)'
           }]
       }
   });

   // Gráfico de Clientes
   const clientCtx = document.getElementById('clientChart').getContext('2d');
   new Chart(clientCtx, {
       type: 'pie',
       data: {
           labels: ['Novos', 'Recorrentes', 'Inativos'],
           datasets: [{
               data: [45, 35, 20],
               backgroundColor: ['#4A90E2', '#27AE60', '#EB5757']
           }]
       }
   });

