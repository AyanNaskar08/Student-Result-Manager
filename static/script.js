document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('student-form');
    const nameInput = document.getElementById('name');
    const mathInput = document.getElementById('math');
    const physicsInput = document.getElementById('physics');
    const chemistryInput = document.getElementById('chemistry');
    const submitBtn = document.getElementById('submit-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const formTitle = document.getElementById('form-title');
    const studentsBody = document.getElementById('students-body');
    const msgContainer = document.getElementById('message-container');

    let isEditMode = false;

    // Load initial data
    fetchStudents();

    function showMessage(text, isError = false) {
        msgContainer.textContent = text;
        msgContainer.className = isError ? 'msg-error' : 'msg-success';
        setTimeout(() => msgContainer.textContent = '', 3000);
    }

    async function fetchStudents() {
        try {
            const res = await fetch('/students');
            const data = await res.json();
            renderTable(data);
        } catch (error) {
            showMessage('Error fetching data', true);
        }
    }

    function renderTable(students) {
        studentsBody.innerHTML = '';
        for (const [name, scores] of Object.entries(students)) {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${name}</strong></td>
                <td>${scores.math}</td>
                <td>${scores.physics}</td>
                <td>${scores.chemistry}</td>
                <td>
                    <button class="btn btn-small btn-edit" data-name="${name}" data-math="${scores.math}" data-physics="${scores.physics}" data-chemistry="${scores.chemistry}"><i class="ph-bold ph-pencil-simple" style="pointer-events: none;"></i> Edit</button>
                    <button class="btn btn-small btn-danger" data-name="${name}"><i class="ph-bold ph-trash" style="pointer-events: none;"></i> Delete</button>
                </td>
            `;
            studentsBody.appendChild(tr);
        }

        // Attach event listeners for edit and delete buttons
        document.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const b = e.target;
                nameInput.value = b.dataset.name;
                mathInput.value = b.dataset.math;
                physicsInput.value = b.dataset.physics;
                chemistryInput.value = b.dataset.chemistry;
                
                nameInput.readOnly = true;
                isEditMode = true;
                formTitle.innerHTML = '<i class="ph-fill ph-pencil-simple"></i> Update Student';
                submitBtn.innerHTML = '<i class="ph-bold ph-check"></i> Update Student';
                cancelBtn.style.display = 'block';
            });
        });

        document.querySelectorAll('.btn-danger').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const name = e.target.dataset.name;
                if(confirm(`Are you sure you want to delete ${name}?`)) {
                    await deleteStudent(name);
                }
            });
        });
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const payload = {
            name: nameInput.value,
            math: parseInt(mathInput.value),
            physics: parseInt(physicsInput.value),
            chemistry: parseInt(chemistryInput.value)
        };

        const endpoint = isEditMode ? '/update' : '/add';

        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            
            if (res.ok) {
                showMessage(data.message);
                resetForm();
                fetchStudents();
            } else {
                showMessage(data.error, true);
            }
        } catch (error) {
            showMessage(isEditMode ? 'Error updating student' : 'Error adding student', true);
        }
    });

    cancelBtn.addEventListener('click', resetForm);

    function resetForm() {
        form.reset();
        nameInput.readOnly = false;
        isEditMode = false;
        formTitle.innerHTML = '<i class="ph-fill ph-user-plus"></i> Add Student';
        submitBtn.innerHTML = '<i class="ph-bold ph-check"></i> Save Student';
        cancelBtn.style.display = 'none';
    }

    async function deleteStudent(name) {
        try {
            const res = await fetch(`/delete/${encodeURIComponent(name)}`, {
                method: 'DELETE'
            });
            const data = await res.json();
            
            if (res.ok) {
                showMessage(data.message);
                if (nameInput.value === name) {
                    resetForm();
                }
                fetchStudents();
            } else {
                showMessage(data.error, true);
            }
        } catch (error) {
            showMessage('Error deleting student', true);
        }
    }
});
