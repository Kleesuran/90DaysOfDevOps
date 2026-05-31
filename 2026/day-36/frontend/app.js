document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const taskForm = document.getElementById('task-form');
    const taskTitleInput = document.getElementById('task-title');
    const taskDescInput = document.getElementById('task-desc');
    const tasksList = document.getElementById('tasks-list');
    const loadingTasks = document.getElementById('loading-tasks');
    const emptyTasks = document.getElementById('empty-tasks');
    const overallStatus = document.getElementById('overall-status');
    
    // Telemetry Elements
    const cpuVal = document.getElementById('cpu-val');
    const cpuBar = document.getElementById('cpu-bar');
    const memVal = document.getElementById('mem-val');
    const memBar = document.getElementById('mem-bar');
    const diskVal = document.getElementById('disk-val');
    const diskBar = document.getElementById('disk-bar');
    const uptimeVal = document.getElementById('uptime-val');
    const platformVal = document.getElementById('platform-val');
    const nodeVal = document.getElementById('node-val');

    // Fetch and render all tasks
    async function fetchTasks() {
        try {
            const response = await fetch('/api/tasks');
            if (!response.ok) throw new Error('Failed to fetch tasks');
            const tasks = await response.json();
            
            loadingTasks.classList.add('hidden');
            
            if (tasks.length === 0) {
                emptyTasks.classList.remove('hidden');
                tasksList.innerHTML = '';
            } else {
                emptyTasks.classList.add('hidden');
                renderTasks(tasks);
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
            loadingTasks.innerHTML = `<i class="fa-solid fa-triangle-exclamation" style="color:#ef4444"></i> Connection to backend lost.`;
        }
    }

    // Render tasks into the list
    function renderTasks(tasks) {
        tasksList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = 'task-item';
            li.dataset.id = task._id;
            
            li.innerHTML = `
                <div class="task-content">
                    <span class="task-item-title">${escapeHtml(task.title)}</span>
                    ${task.description ? `<span class="task-item-desc">${escapeHtml(task.description)}</span>` : ''}
                </div>
                <button class="btn-delete" title="Delete Task">
                    <i class="fa-regular fa-trash-can"></i>
                </button>
            `;
            
            // Delete event handler
            li.querySelector('.btn-delete').addEventListener('click', () => deleteTask(task._id));
            
            tasksList.appendChild(li);
        });
    }

    // Add a new task
    taskForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = taskTitleInput.value.trim();
        const description = taskDescInput.value.trim();
        
        if (!title) return;
        
        try {
            const response = await fetch('/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, description })
            });
            
            if (!response.ok) throw new Error('Failed to add task');
            
            taskTitleInput.value = '';
            taskDescInput.value = '';
            
            // Refresh list
            fetchTasks();
        } catch (error) {
            console.error('Error adding task:', error);
            alert('Could not add task. Check backend status.');
        }
    });

    // Delete a task
    async function deleteTask(id) {
        try {
            const response = await fetch(`/api/tasks/${id}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) throw new Error('Failed to delete task');
            
            // Refresh list
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
            alert('Could not delete task.');
        }
    }

    // Fetch and update system telemetry metrics
    async function fetchTelemetry() {
        try {
            const response = await fetch('/api/system-status');
            if (!response.ok) throw new Error('Telemetry server unavailable');
            const data = await response.json();
            
            // Update UI status badge
            overallStatus.className = 'status-badge';
            overallStatus.innerHTML = `
                <span class="pulse-dot green"></span>
                <span class="status-text">All Systems Operational</span>
            `;
            
            // Update values and progress bars
            const cpu = data.metrics.cpu;
            const mem = data.metrics.memory;
            const disk = data.metrics.disk;
            
            cpuVal.textContent = cpu;
            cpuBar.style.width = cpu;
            setBarColor(cpuBar, parseFloat(cpu));

            memVal.textContent = mem;
            memBar.style.width = mem;
            setBarColor(memBar, parseFloat(mem));

            diskVal.textContent = disk;
            diskBar.style.width = disk;
            setBarColor(diskBar, parseFloat(disk));
            
            uptimeVal.textContent = data.uptime;
            platformVal.textContent = data.platform;
            nodeVal.textContent = data.nodeVersion;
            
        } catch (error) {
            console.error('Telemetry fetch error:', error);
            
            // Update overall status badge
            overallStatus.className = 'status-badge disconnected';
            overallStatus.innerHTML = `
                <span class="pulse-dot red"></span>
                <span class="status-text">Host Disconnected</span>
            `;
            
            // Clear values
            cpuVal.textContent = '--';
            cpuBar.style.width = '0%';
            memVal.textContent = '--';
            memBar.style.width = '0%';
            diskVal.textContent = '--';
            diskBar.style.width = '0%';
            uptimeVal.textContent = 'Offline';
            platformVal.textContent = 'Offline';
            nodeVal.textContent = 'Offline';
        }
    }

    // Helper: color code gauges based on load
    function setBarColor(barElement, value) {
        barElement.classList.remove('warning', 'danger');
        if (value >= 85) {
            barElement.classList.add('danger');
        } else if (value >= 65) {
            barElement.classList.add('warning');
        }
    }

    // Helper: prevent XSS
    function escapeHtml(str) {
        return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // Initial Load
    fetchTasks();
    fetchTelemetry();
    
    // Auto refresh telemetry every 3 seconds
    setInterval(fetchTelemetry, 3000);
});
