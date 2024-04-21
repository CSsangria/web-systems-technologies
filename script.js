document.addEventListener('DOMContentLoaded', function () {
  let currentId = 1; 
  const createAccountButton = document.querySelector('button[type="button"]');
  createAccountButton.addEventListener('click', function () {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const role = document.getElementById('role').value;
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td class="p-2 border-b border-gray-200">${currentId}</td>
      <td class="p-2 border-b border-gray-200">${name}</td>
      <td class="p-2 border-b border-gray-200">${email}</td>
      <td class="p-2 border-b border-gray-200">${role}</td>
      <td class="p-2 border-b border-gray-200">
        <button class="delete-btn text-red-500 hover:text-red-700 hover:underline mr-2">
          <i class='bx bx-trash'></i>
        </button>
        <button class="edit-btn text-blue-500 hover:text-blue-700 hover:underline mr-2">
          <i class='bx bx-edit'></i>
        </button>
      </td>
    `;
    const tbody = document.querySelector('tbody');
    tbody.appendChild(newRow);
    currentId++;
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('role').value = 'admin'; 
    const deleteButton = newRow.querySelector('.delete-btn');
    deleteButton.addEventListener('click', function () {
      this.parentElement.parentElement.remove();
    });
    const editButton = newRow.querySelector('.edit-btn');
    editButton.addEventListener('click', function () {
      const cells = newRow.querySelectorAll('td:not(:last-child)');
      const editMode = this.querySelector('i').classList.contains('bx-save');
      if (editMode) {
        cells.forEach((cell, index) => {
          const input = cell.querySelector('input');
          cell.textContent = input.value;
        });
        this.innerHTML = `<button class="edit-btn text-blue-500 hover:text-blue-700 hover:underline mr-2"><i class='bx bx-edit'></i></button>`;
        newRow.querySelector('.save-btn').style.display = 'none'; 
      } else {
        // Enter edit mode
        cells.forEach(cell => {
            const text = cell.textContent;
            cell.innerHTML = `<input type="text" value="${text}" class="edit-input">`;
        });
        this.innerHTML = `<button class="save-btn text-green-500 hover:text-green-700 hover:underline mr-2"><i class='bx bx-save'></i></button>`;
    }
    });
    const saveButton = newRow.querySelector('.save-btn');
    saveButton.addEventListener('click', function () {
      const editButton = newRow.querySelector('.edit-btn');
      editButton.click();
    });
  });
});