const transactions = [
    { id: 1, type: 'incoming', datum: '2024-11-01', bedrag: 150.00 },
    { id: 2, type: 'outgoing', datum: '2024-11-03', bedrag: -50.00 },
    { id: 3, type: 'incoming', datum: '2024-11-05', bedrag: 200.00 },
    { id: 4, type: 'outgoing', datum: '2024-11-10', bedrag: -30.00 }
  ];
  
  function filterTransacties() {
    const filterType = document.getElementById('filter-type').value;
    const filterDatum = document.getElementById('filter-datum').value;
    const gefilterdeTrans = transactions.filter(transactie => {
      if (filterType === 'all' || transactie.type === filterType) {
        if (!filterDatum || transactie.datum === filterDatum) {
          return true;
        }
      }
      return false;
    });
    weergaveTransacties(gefilterdeTrans);
  }
  
  function weergaveTransacties(transacties) {
    const transactieBody = document.getElementById('transactie-body');
    transactieBody.innerHTML = '';
    transacties.forEach(transactie => {
      const rij = document.createElement('tr');
      rij.innerHTML = `
        <td>${transactie.type}</td>
        <td>${transactie.datum}</td>
        <td>${transactie.bedrag.toFixed(2)}</td>
      `;
      transactieBody.appendChild(rij);
    });
  }
  
  weergaveTransacties(transactions);