// Main JavaScript File

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
    initializeCharts();
    initializeDismissButtons();
});

// Initialize tab functionality
function initializeTabs() {
    const tabs = document.querySelectorAll('.performance-tab');
    const panes = document.querySelectorAll('.tab-pane');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and panes
            tabs.forEach(t => t.classList.remove('active'));
            panes.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding pane
            this.classList.add('active');
            const targetPane = document.getElementById(targetTab + '-tab');
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });
}

// Initialize charts
function initializeCharts() {
    // Chart.js default options
    Chart.defaults.font.family = "'DM Sans', sans-serif";
    Chart.defaults.plugins.legend.display = false;
    
    // Leads Chart
    const leadsCtx = document.getElementById('leadsChart').getContext('2d');
    new Chart(leadsCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Lead Rate',
                data: [5.5, 6.3, 5.6, 7.1, 5.4, 6.2, 6.3, 7.0, 6.7, 6.4, 6.8, 4.8],
                backgroundColor: '#0763D3',
                borderRadius: {
                    topLeft: 8,
                    topRight: 8
                },
                barPercentage: 0.8,
                yAxisID: 'y'
            }, {
                label: 'Inventory Count',
                data: [220, 235, 225, 245, 230, 240, 250, 265, 258, 260, 255, 247],
                backgroundColor: '#10B981',
                borderRadius: {
                    topLeft: 8,
                    topRight: 8
                },
                barPercentage: 0.8,
                yAxisID: 'y1'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    border: {
                        display: false
                    },
                    ticks: {
                        color: '#6B7280',
                        font: {
                            size: 12
                        }
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    beginAtZero: true,
                    max: 8,
                    ticks: {
                        stepSize: 2,
                        callback: function(value) {
                            return value + '%';
                        },
                        color: '#6B7280',
                        font: {
                            size: 12
                        }
                    },
                    grid: {
                        color: '#F3F4F6',
                        drawBorder: false
                    },
                    border: {
                        display: false
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    beginAtZero: true,
                    max: 300,
                    ticks: {
                        stepSize: 50,
                        callback: function(value) {
                            return value;
                        },
                        color: '#6B7280',
                        font: {
                            size: 12
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    border: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    cornerRadius: 6,
                    titleFont: {
                        size: 13,
                        weight: '600'
                    },
                    bodyFont: {
                        size: 12
                    },
                    callbacks: {
                        label: function(context) {
                            if (context.dataset.label === 'Lead Rate') {
                                return 'Lead Rate: ' + context.parsed.y + '%';
                            } else {
                                return 'Inventory Count: ' + context.parsed.y;
                            }
                        }
                    }
                }
            }
        }
    });
    
    // Connections Chart (stacked bar chart)
    const connectionsCtx = document.getElementById('connectionsChart').getContext('2d');
    new Chart(connectionsCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Saved vehicles',
                data: [15, 18, 16, 19, 17, 18, 20, 22, 21, 20, 23, 19],
                backgroundColor: '#0763D3'
            }, {
                label: 'Website Clicks',
                data: [10, 11, 10, 12, 11, 12, 13, 14, 13, 13, 15, 12],
                backgroundColor: '#10B981'
            }, {
                label: 'Map Views',
                data: [5, 6, 6, 7, 6, 7, 8, 8, 8, 7, 9, 7],
                backgroundColor: '#F59E0B'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    stacked: true,
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    border: {
                        display: false
                    },
                    ticks: {
                        color: '#6B7280',
                        font: {
                            size: 12
                        }
                    }
                },
                y: {
                    stacked: true,
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value;
                        },
                        color: '#6B7280',
                        font: {
                            size: 12
                        }
                    },
                    grid: {
                        color: '#F3F4F6',
                        drawBorder: false
                    },
                    border: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        usePointStyle: true,
                        font: {
                            size: 11
                        },
                        boxWidth: 12
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    cornerRadius: 6,
                    titleFont: {
                        size: 13,
                        weight: '600'
                    },
                    bodyFont: {
                        size: 12
                    },
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y;
                        },
                        afterLabel: function(context) {
                            // Calculate percentage of total for this category
                            const datasetIndex = context.datasetIndex;
                            const dataIndex = context.dataIndex;
                            let total = 0;
                            context.chart.data.datasets.forEach(dataset => {
                                total += dataset.data[dataIndex];
                            });
                            const percentage = ((context.parsed.y / total) * 100).toFixed(1);
                            return '(' + percentage + '% of total)';
                        }
                    }
                }
            }
        }
    });
    
    // VDP Views Chart
    const vdpViewsCtx = document.getElementById('vdpViewsChart');
    if (vdpViewsCtx) {
        new Chart(vdpViewsCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    data: [1200, 1350, 1280, 1450, 1380, 1520, 1600, 1750, 1680, 1820, 1920, 2100],
                    backgroundColor: '#0763D3',
                    borderRadius: {
                        topLeft: 8,
                        topRight: 8
                    },
                    barPercentage: 0.6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        grid: {
                            display: false,
                            drawBorder: false
                        },
                        border: {
                            display: false
                        },
                        ticks: {
                            color: '#6B7280',
                            font: {
                                size: 12
                            }
                        }
                    },
                    y: {
                        beginAtZero: true,
                        max: 2400,
                        ticks: {
                            stepSize: 600,
                            callback: function(value) {
                                return value.toLocaleString();
                            },
                            color: '#6B7280',
                            font: {
                                size: 12
                            }
                        },
                        grid: {
                            color: '#F3F4F6',
                            drawBorder: false
                        },
                        border: {
                            display: false
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: 12,
                        cornerRadius: 6,
                        titleFont: {
                            size: 13,
                            weight: '600'
                        },
                        bodyFont: {
                            size: 12
                        },
                        callbacks: {
                            label: function(context) {
                                return 'VDP Views: ' + context.parsed.y.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Inventory Chart
    const inventoryCtx = document.getElementById('inventoryChart');
    if (inventoryCtx) {
        new Chart(inventoryCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Used Vehicles',
                    data: [154, 165, 158, 172, 161, 168, 175, 186, 181, 182, 179, 173],
                    backgroundColor: '#0763D3'
                }, {
                    label: 'New Vehicles',
                    data: [66, 70, 67, 73, 69, 72, 75, 79, 77, 78, 76, 74],
                    backgroundColor: '#10B981'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        stacked: true,
                        grid: {
                            display: false,
                            drawBorder: false
                        },
                        border: {
                            display: false
                        },
                        ticks: {
                            color: '#6B7280',
                            font: {
                                size: 12
                            }
                        }
                    },
                    y: {
                        stacked: true,
                        beginAtZero: true,
                        max: 300,
                        ticks: {
                            stepSize: 50,
                            callback: function(value) {
                                return value;
                            },
                            color: '#6B7280',
                            font: {
                                size: 12
                            }
                        },
                        grid: {
                            color: '#F3F4F6',
                            drawBorder: false
                        },
                        border: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: 12,
                        cornerRadius: 6,
                        titleFont: {
                            size: 13,
                            weight: '600'
                        },
                        bodyFont: {
                            size: 12
                        },
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.parsed.y + ' vehicles';
                            },
                            afterLabel: function(context) {
                                // Calculate percentage of total inventory
                                const dataIndex = context.dataIndex;
                                let total = 0;
                                context.chart.data.datasets.forEach(dataset => {
                                    total += dataset.data[dataIndex];
                                });
                                const percentage = ((context.parsed.y / total) * 100).toFixed(1);
                                return '(' + percentage + '% of inventory)';
                            },
                            footer: function(tooltipItems) {
                                let sum = 0;
                                tooltipItems.forEach(function(tooltipItem) {
                                    sum += tooltipItem.parsed.y;
                                });
                                return 'Total: ' + sum + ' vehicles';
                            }
                        }
                    }
                }
            }
        });
    }
}

// Initialize dismiss buttons
function initializeDismissButtons() {
    const dismissButtons = document.querySelectorAll('.insight-dismiss');
    
    dismissButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Open insight side panel instead of dismissing
            openInsightPanel();
        });
    });
}

// Function to open insight side panel
function openInsightPanel() {
    const overlay = document.getElementById('overlay');
    const insightPanel = document.getElementById('insightSidePanel');
    
    if (!insightPanel) {
        // Create insight panel if it doesn't exist
        createInsightPanel();
    }
    
    // Open the panel
    const panel = document.getElementById('insightSidePanel');
    panel.classList.add('active');
    overlay.style.display = 'block';
    setTimeout(() => {
        overlay.classList.add('active');
    }, 10);
    document.body.style.overflow = 'hidden';
}

// Function to create insight side panel
function createInsightPanel() {
    const panelHTML = `
        <div class="side-panel insight-side-panel" id="insightSidePanel">
            <div class="side-panel-header">
                <h2 class="side-panel-title">AI Assistant</h2>
                <button class="side-panel-close" id="closeInsightPanel">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="#111827" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
            <div class="side-panel-content chat-panel-content">
                <div class="chat-container">
                    <div class="chat-messages" id="chatMessages">
                        <!-- Initial welcome message -->
                        <div class="chat-message ai-message">
                            <div class="message-content">
                                <strong>Hello! I'm your CarGurus AI Assistant.</strong><br><br>
                                I noticed your lead volume decreased by 14% in December. I can help you understand why this happened and suggest strategies to improve your performance.<br><br>
                                What would you like to know?
                            </div>
                        </div>
                    </div>
                    
                    <div class="chat-input-container">
                        <textarea 
                            id="chatInput" 
                            class="chat-input" 
                            placeholder="Ask about your performance metrics..."
                            autocomplete="off"
                            rows="1"
                        ></textarea>
                        <button id="chatSendButton" class="chat-send-button">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 10L17 2L13 18L11 11L2 10Z" fill="white"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Insert before overlay
    const overlay = document.getElementById('overlay');
    overlay.insertAdjacentHTML('beforebegin', panelHTML);
    
    // Add close button listener
    const closeBtn = document.getElementById('closeInsightPanel');
    closeBtn.addEventListener('click', closeInsightPanel);
    
    // Reinitialize chat event listeners with a small delay to ensure DOM is ready
    setTimeout(() => {
        if (window.InsightChat) {
            console.log('Setting up chat event listeners');
            window.InsightChat.setupEventListeners();
        } else {
            console.error('InsightChat not found');
        }
    }, 100);
}

// Function to close insight panel
function closeInsightPanel() {
    const panel = document.getElementById('insightSidePanel');
    const overlay = document.getElementById('overlay');
    
    panel.classList.remove('active');
    overlay.classList.remove('active');
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 300);
    document.body.style.overflow = '';
}

// Initialize side panel functionality for Health Check
document.addEventListener('DOMContentLoaded', function() {
    const healthCheckCard = document.querySelector('.health-check-card');
    const sidePanel = document.getElementById('healthCheckPanel');
    const overlay = document.getElementById('overlay');
    const closeSidePanelBtn = document.getElementById('closeSidePanel');
    const saveBtn = document.querySelector('.turn-time-save-btn');
    
    // Open side panel when Health Check card is clicked
    if (healthCheckCard) {
        healthCheckCard.addEventListener('click', function(e) {
            e.preventDefault();
            // Only open if it's still in the error state (has health-check-card class)
            if (this.classList.contains('health-check-card')) {
                openSidePanel();
            }
        });
    }
    
    // Close side panel when close button is clicked
    if (closeSidePanelBtn) {
        closeSidePanelBtn.addEventListener('click', function() {
            closeSidePanel();
        });
    }
    
    // Close side panel when overlay is clicked
    if (overlay) {
        overlay.addEventListener('click', function() {
            // Check which panel is open and close it
            const healthPanel = document.getElementById('healthCheckPanel');
            const insightPanel = document.getElementById('insightSidePanel');
            
            if (healthPanel && healthPanel.classList.contains('active')) {
                closeSidePanel();
            } else if (insightPanel && insightPanel.classList.contains('active')) {
                closeInsightPanel();
            }
        });
    }
    
    // Save button functionality
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            handleSave();
        });
    }
    
    // Function to open side panel
    function openSidePanel() {
        sidePanel.classList.add('active');
        overlay.style.display = 'block';
        // Small delay to ensure display is set before opacity transition
        setTimeout(() => {
            overlay.classList.add('active');
        }, 10);
        document.body.style.overflow = 'hidden'; // Prevent body scroll
    }
    
    // Function to close side panel
    function closeSidePanel() {
        sidePanel.classList.remove('active');
        overlay.classList.remove('active');
        // Wait for transition to complete before hiding overlay
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 300);
        document.body.style.overflow = ''; // Restore body scroll
    }
    
    // Function to handle save
    function handleSave() {
        // Update the Health check card
        const healthCard = document.querySelector('.health-check-card');
        const metricValue = healthCard.querySelector('.metric-card-value');
        const changeText = healthCard.querySelector('.metric-card-change span');
        
        // Remove the red background and white text
        healthCard.classList.remove('health-check-card');
        healthCard.classList.add('health-check-fixed');
        
        // Add success animation
        const successAnimation = document.createElement('div');
        successAnimation.className = 'success-animation';
        successAnimation.innerHTML = `
            <svg width="133" height="133" viewBox="0 0 133 133" xmlns="http://www.w3.org/2000/svg">
                <g id="check-group" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <circle id="filled-circle" fill="#10B981" cx="66.5" cy="66.5" r="54.5"/>
                    <circle id="white-circle" fill="#FFFFFF" cx="66.5" cy="66.5" r="55.5"/>
                    <circle id="outline" stroke="#10B981" stroke-width="4" cx="66.5" cy="66.5" r="54.5"/>
                    <polyline id="check" stroke="#FFFFFF" stroke-width="4" points="41 70 56 85 92 49"/>
                </g>
            </svg>
        `;
        healthCard.appendChild(successAnimation);
        
        // Update values
        metricValue.textContent = '5/5';
        changeText.textContent = 'All systems operational';
        changeText.parentElement.classList.remove('neutral');
        changeText.parentElement.classList.add('positive');
        
        // Update the turn time setting in side panel to show as passed
        const turnTimeStatus = document.querySelector('.status-item.failed');
        if (turnTimeStatus) {
            turnTimeStatus.classList.remove('failed');
            turnTimeStatus.classList.add('passed');
            turnTimeStatus.querySelector('svg').innerHTML = `
                <circle cx="8" cy="8" r="8" fill="#10B981"/>
                <path d="M5 8L7 10L11 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            `;
        }
        
        // Update score in side panel
        const scoreValue = document.querySelector('.score-value');
        if (scoreValue) {
            scoreValue.textContent = '5/5';
        }
        
        // Close side panel immediately
        closeSidePanel();
        
        // Show success animation after panel starts closing
        setTimeout(() => {
            successAnimation.classList.add('show');
        }, 300);
        
        // Remove animation after it completes
        setTimeout(() => {
            successAnimation.remove();
        }, 2000);
    }
});