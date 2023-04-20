const socket = io();

socket.on('products', data => {
    // Get a reference to the table body element
    var tableBody = document.querySelector('table tbody');

    // Clear the content of the table body
    tableBody.innerHTML = '';
  
    // Loop through the array of products and add them to the table
    data.forEach(function(product) {
      // Create a new table row element
      var row = document.createElement('tr');

      // Create a new table cell element for each property
      var titleCell = document.createElement('td');
      var descriptionCell = document.createElement('td');
      var priceCell = document.createElement('td');

      // Set the text content of each table cell to the corresponding property
      titleCell.textContent = product.title;
      descriptionCell.textContent = product.description;
      priceCell.textContent = product.price;

      // Append the table cells to the table row
      row.appendChild(titleCell);
      row.appendChild(descriptionCell);
      row.appendChild(priceCell);

      // Append the table row to the table body
      tableBody.appendChild(row);
    });
  });