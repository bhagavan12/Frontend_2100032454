const jsonData = [
    
        { "name": "Rajesh Naidu", "position": "System Architect", "office": "Mumbai", "age": "45", "start_date": "2010-08-15", "salary": "3,20,800/-" },
        { "name": "Sai Bhagavan", "position": "Accountant", "office": "Delhi", "age": "40", "start_date": "2011-05-20", "salary": "1,70,750/-" },
        { "name": "Neha", "position": "Junior Technical Author", "office": "Bangalore", "age": "35", "start_date": "2008-12-10", "salary": "86,000/-" },
        { "name": "Prasad", "position": "Senior Javascript Developer", "office": "Hyderabad", "age": "28", "start_date": "2012-10-05", "salary": "4,33,060/-" },
        { "name": "Pooja Reddy", "position": "UX Designer", "office": "Chennai", "age": "29", "start_date": "2016-11-30", "salary": "1,80,000/-" },
        { "name": "Rajiv Kumar", "position": "Network Engineer", "office": "Kolkata", "age": "34", "start_date": "2014-07-12", "salary": "2,90,000/-" },
        { "name": "Ananya Verma", "position": "Business Analyst", "office": "Ahmedabad", "age": "31", "start_date": "2017-03-25", "salary": "2,40,000/-" },
        { "name": "Vishal Singh", "position": "Project Manager", "office": "Lucknow", "age": "39", "start_date": "2012-01-08", "salary": "3,80,000/-" },
        { "name": "Megha Patel", "position": "Quality Assurance Engineer", "office": "Surat", "age": "27", "start_date": "2018-06-19", "salary": "1,90,000/-" },
        { "name": "Akash Gupta", "position": "Frontend Developer", "office": "Indore", "age": "30", "start_date": "2016-02-14", "salary": "2,20,000/-" },
        { "name": "Sneha Singhania", "position": "UI Designer", "office": "Bhopal", "age": "33", "start_date": "2013-10-10", "salary": "2,60,000/-" }
    
    
];

let currpage = 1;
const rowsPerPage = 5;
let filteredData = [...jsonData];

function renderTable(data) {
    const tableBody = document.querySelector('#dataTable tbody');
    tableBody.innerHTML = '';

    const start = (currpage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedData = data.slice(start, end);

    paginatedData.forEach(row => {
        const tr = document.createElement('tr');
        for (const key in row) {
            const td = document.createElement('td');
            td.textContent = row[key];
            tr.appendChild(td);
        }
        tableBody.appendChild(tr);
    });
}

function renderPagination(data) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    const pageCount = Math.ceil(data.length / rowsPerPage);
    for (let i = 1; i <= pageCount; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.className = i === currpage ? 'active' : '';
        button.addEventListener('click', () => {
            currpage = i;
            renderTable(data);
            renderPagination(data);
        });
        pagination.appendChild(button);
    }
}

function handleSorting(column, order) {
    filteredData.sort((a, b) => {
        if (a[column] < b[column]) return order === 'asc' ? -1 : 1;
        if (a[column] > b[column]) return order === 'asc' ? 1 : -1;
        return 0;
    });
    renderTable(filteredData);
    renderPagination(filteredData);
}
function handleSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    filteredData = jsonData.filter(item => {
        return Object.values(item).some(value =>
            value.toString().toLowerCase().includes(searchTerm)
        );
    });
    currpage = 1;
    renderTable(filteredData);
    renderPagination(filteredData);
}
document.querySelectorAll('#dataTable th').forEach(header => {
    header.addEventListener('click', () => {
        const column = header.getAttribute('data-column');
        const order = header.classList.contains('sorted-asc') ? 'desc' : 'asc';

        document.querySelectorAll('#dataTable th').forEach(th => th.classList.remove('sorted-asc', 'sorted-desc'));
        header.classList.add(order === 'asc' ? 'sorted-asc' : 'sorted-desc');

        handleSorting(column, order);
    });
});

document.getElementById('searchInput').addEventListener('input', handleSearch);

renderTable(filteredData);
renderPagination(filteredData);