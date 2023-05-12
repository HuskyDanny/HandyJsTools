import fetch  from 'node-fetch';

const apiKey = '2a2dc79a107d47c9b1e247074d171aa1';
const url = 'https://allenpantest.openai.azure.com/openai/deployments/Iteration1/completions?api-version=2023-03-15-preview';

const tables = '### Clickhouse tables, with their properties:\n#\n# Employee(id, name, department_id)\n# Department(id, name, address)\n# Salary_Payments(id, employee_id, amount, date)\n#\n###';
const ask = 'A query to list the employee name and department name and highest salary in each department:\n\n'
const hintWord = 'select'

const requestBody = {
  prompt: `${tables}${ask}\n\n\n${hintWord}`,
  temperature: 0,
  stop: ['#', ';'],
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
  best_of: 1,
  max_tokens: 150
};

const requestOptions = {
  method: 'POST',
  headers: {
    'api-key': apiKey,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(requestBody)
};

fetch(url, requestOptions)
  .then(response => response.json())
  .then(data => console.log(hintWord + data["choices"][0]["text"]))
  .catch(error => console.error('Error:', error));