document.addEventListener('DOMContentLoaded', function() {
  const loveButton = document.getElementById('loveButton');
  const calendar = document.getElementById('calendar');
  const daysContainer = document.getElementById('days');
  const monthYearDisplay = document.getElementById('monthYear');
  const prevButton = document.getElementById('prev');
  const nextButton = document.getElementById('next');

  const notes = {
    '2024-4-30': 'Dia que a gente deu match ❤',
    '2024-5-1': 'Primeira conversa de vdd ❤',
    '2024-5-7': 'Historia do Pinto KKK ❤',
    '2024-5-10': 'Primeiro encontro ❤',
    '2024-5-14': 'Primeira vez que escutei suas músicas ❤',
    '2024-5-15': 'Primeira call/Ifood ❤',
    '2024-5-27': 'Dia da tortinha ❤',
    '2024-5-30': 'Um mês que a gente deu match ❤',
    '2024-6-1': 'Segundo encontro ❤'
  };

  let currentDate = new Date();

  const months = [
    { name: 'January', days: 31 },
    { name: 'February', days: 29 },
    { name: 'March', days: 31 },
    { name: 'April', days: 30 },
    { name: 'May', days: 31 },
    { name: 'June', days: 30 },
    { name: 'July', days: 31 },
    { name: 'August', days: 31 },
    { name: 'September', days: 30 },
    { name: 'October', days: 31 },
    { name: 'November', days: 30 },
    { name: 'December', days: 31 }
  ];

  loveButton.addEventListener('click', () => {
    calendar.classList.toggle('hidden');
    renderCalendar();
  });

  prevButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
  });

  nextButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
  });

  function renderCalendar() {
    daysContainer.innerHTML = '';
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const monthInfo = months[month];
    const lastDateOfMonth = monthInfo.days;

    monthYearDisplay.textContent = `${monthInfo.name} ${year}`;

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      const emptyCell = document.createElement('div');
      emptyCell.classList.add('empty');
      daysContainer.appendChild(emptyCell);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= lastDateOfMonth; day++) {
      const dayCell = document.createElement('div');
      const dateKey = `${year}-${month + 1}-${day}`;
      if (notes[dateKey]) {
        dayCell.classList.add('day-with-note');
        const note = document.createElement('div');
        note.className = 'notes';
        note.textContent = notes[dateKey];
        dayCell.appendChild(note);
      } else {
        dayCell.textContent = day;
      }
      dayCell.addEventListener('click', () => selectDay(dayCell, day));

      daysContainer.appendChild(dayCell);
    }

    // Ensure the last row has 7 days
    const totalCells = firstDayOfMonth + lastDateOfMonth;
    const remainingCells = 7 - (totalCells % 7);
    if (remainingCells < 7) {
      for (let i = 0; i < remainingCells; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.classList.add('empty');
        daysContainer.appendChild(emptyCell);
      }
    }
  }

  function selectDay(dayCell, day) {
    const allDays = document.querySelectorAll('.days div');
    allDays.forEach(day => day.classList.remove('selected'));
    dayCell.classList.add('selected');

    const note = prompt('Adicione uma nota para este dia:', notes[`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`] || '');
    if (note !== null) {
      notes[`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`] = note;
      renderCalendar();
    }
  }

  renderCalendar(); // Initial render
});
