// Script para funcionalidades interativas da página de eleição CMULTI

document.addEventListener('DOMContentLoaded', function() {
    
    // Configurações da Chapa Integrar
    const chapaConfig = {
        nome: 'Chapa Integrar',
        slogan: 'Gestão Participativa e Transparente',
        cores: {
            primaria: '#27ae60',
            secundaria: '#2ecc71',
            escura: '#229954'
        }
    };

    // Função para mostrar notificações
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <strong>Chapa Integrar:</strong> ${message}
        `;
        notification.style.background = type === 'success' ? chapaConfig.cores.primaria : '#e74c3c';
        
        document.body.appendChild(notification);
        
        // Mostrar notificação
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Remover notificação após 4 segundos
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
    
    // Função para contar caracteres em campos de texto
    function setupCharacterCount() {
        const textareas = document.querySelectorAll('textarea');
        textareas.forEach(textarea => {
            const counter = document.createElement('div');
            counter.className = 'char-counter';
            counter.style.cssText = 'text-align: right; color: #7f8c8d; font-size: 0.9em; margin-top: 5px;';
            textarea.parentNode.appendChild(counter);
            
            function updateCount() {
                const remaining = textarea.maxLength - textarea.value.length;
                counter.textContent = `${remaining} caracteres restantes`;
                counter.style.color = remaining < 50 ? '#e74c3c' : '#7f8c8d';
            }
            
            textarea.addEventListener('input', updateCount);
            updateCount();
        });
    }
    
    // Função para scroll suave
    function smoothScroll(target) {
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    // Função para adicionar efeito de loading nos botões
    function setupLoadingButtons() {
        const buttons = document.querySelectorAll('.vote-button');
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                if (this.href.includes('eleicoes.ufac.br')) {
                    // Adicionar efeito de loading
                    const originalText = this.textContent;
                    this.innerHTML = '<span class="loading"></span> Redirecionando...';
                    this.style.pointerEvents = 'none';
                    
                    // Simular delay para mostrar loading
                    setTimeout(() => {
                        this.textContent = originalText;
                        this.style.pointerEvents = 'auto';
                    }, 2000);
                }
            });
        });
    }
    
    // Função para animar elementos quando entram na viewport
    function setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observar elementos para animação
        const animatedElements = document.querySelectorAll('.card, .timeline-item');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
    
    // Função para adicionar contador de visitantes (simulado)
    function setupVisitorCounter() {
        const counterElement = document.createElement('div');
        counterElement.className = 'visitor-counter';
        counterElement.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: rgba(52, 152, 219, 0.9);
            color: white;
            padding: 10px 15px;
            border-radius: 25px;
            font-size: 0.9em;
            z-index: 1000;
            backdrop-filter: blur(10px);
        `;
        
        // Simular contador de visitantes
        let visitors = Math.floor(Math.random() * 1000) + 500;
        counterElement.innerHTML = `👥 ${visitors} visualizações`;
        
        document.body.appendChild(counterElement);
        
        // Atualizar contador periodicamente
        setInterval(() => {
            visitors += Math.floor(Math.random() * 5) + 1;
            counterElement.innerHTML = `👥 ${visitors} visualizações`;
        }, 30000); // Atualizar a cada 30 segundos
    }
    
    // Função para adicionar menu de navegação rápida
    function setupQuickNav() {
        const quickNav = document.createElement('nav');
        quickNav.className = 'quick-nav';
        quickNav.style.cssText = `
            position: fixed;
            top: 50%;
            right: 20px;
            transform: translateY(-50%);
            background: rgba(255, 255, 255, 0.95);
            border-radius: 25px;
            padding: 15px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            backdrop-filter: blur(10px);
        `;
        
        const sections = [
            { id: 'header', label: '🏠 Início' },
            { id: 'main-content', label: '📋 Informações' },
            { id: 'timeline', label: '📅 Cronograma' },
            { id: 'footer', label: '📞 Contato' }
        ];
        
        sections.forEach(section => {
            const link = document.createElement('a');
            link.href = `#${section.id}`;
            link.textContent = section.label;
            link.style.cssText = `
                display: block;
                padding: 8px 12px;
                color: #2c3e50;
                text-decoration: none;
                border-radius: 15px;
                margin: 5px 0;
                font-size: 0.9em;
                transition: all 0.3s ease;
            `;
            
            link.addEventListener('mouseenter', () => {
                link.style.background = '#3498db';
                link.style.color = 'white';
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.background = 'transparent';
                link.style.color = '#2c3e50';
            });
            
            link.addEventListener('click', (e) => {
                e.preventDefault();
                smoothScroll(`#${section.id}`);
            });
            
            quickNav.appendChild(link);
        });
        
        document.body.appendChild(quickNav);
    }
    
    // Sistema de alternância de temas
    let isDarkTheme = true; // Começamos com tema escuro (atual)

    function toggleTheme() {
        const themeIcon = document.getElementById('themeIcon');
        
        if (isDarkTheme) {
            // Mudar para tema claro
            applyLightTheme();
            themeIcon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'light');
            isDarkTheme = false;
            showNotification('Tema claro ativado', 'success');
        } else {
            // Mudar para tema escuro
            applyDarkTheme();
            themeIcon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'dark');
            isDarkTheme = true;
            showNotification('Tema escuro ativado', 'success');
        }
    }

    function applyLightTheme() {
        // Aplicar mudanças no body
        document.body.style.background = 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #e9ecef 100%)';
        document.body.style.color = '#2c3e50';
        
        // Aplicar mudanças nos cards principais
        document.querySelectorAll('.header, .candidates-section, .principles-section, .proposal-card, .timeline, .footer').forEach(element => {
            element.style.background = 'rgba(255, 255, 255, 0.95)';
            element.style.color = '#2c3e50';
            element.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.1)';
        });
        
        // Aplicar mudanças nos cards de candidatos e princípios
        document.querySelectorAll('.candidate-card, .principle-card').forEach(element => {
            element.style.background = 'linear-gradient(135deg, #f8f9fa, #ffffff)';
            element.style.color = '#2c3e50';
        });
        
        // Textos específicos - tema claro
        document.querySelectorAll('.candidate-role').forEach(element => {
            element.style.color = '#7f8c8d';
        });
        
        document.querySelectorAll('.candidate-info').forEach(element => {
            element.style.color = '#95a5a6';
        });
        
        document.querySelectorAll('.subtitle, .candidates-subtitle, .footer-subtitle').forEach(element => {
            element.style.color = '#7f8c8d';
        });
        
        document.querySelectorAll('.proposal-card h3, .timeline-content h4').forEach(element => {
            element.style.color = '#2c3e50';
        });
        
        document.querySelectorAll('.proposal-card p, .proposal-card li').forEach(element => {
            element.style.color = '#34495e';
        });
        
        // Seção de download
        document.querySelectorAll('.download-section').forEach(element => {
            element.style.background = 'linear-gradient(135deg, #ecf0f1, #bdc3c7)';
            element.style.color = '#2c3e50';
        });
        
        // Timeline items
        document.querySelectorAll('.timeline-item').forEach(element => {
            element.style.background = 'rgba(52, 152, 219, 0.1)';
        });
    }

    function applyDarkTheme() {
        // Restaurar tema escuro original
        document.body.style.background = 'linear-gradient(135deg, #2c3e50 0%, #34495e 50%, #3d4f60 100%)';
        document.body.style.color = '#ecf0f1';
        
        // Restaurar cards escuros
        document.querySelectorAll('.header, .candidates-section, .principles-section, .proposal-card, .timeline, .footer').forEach(element => {
            element.style.background = 'rgba(15, 23, 42, 0.95)';
            element.style.color = '#e2e8f0';
            element.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.2)';
        });
        
        document.querySelectorAll('.candidate-card, .principle-card').forEach(element => {
            element.style.background = 'linear-gradient(135deg, #0f172a, #1e293b)';
            element.style.color = '#e2e8f0';
        });
        
        // Restaurar textos específicos - tema escuro
        document.querySelectorAll('.candidate-role').forEach(element => {
            element.style.color = '#cbd5e1';
        });
        
        document.querySelectorAll('.candidate-info').forEach(element => {
            element.style.color = '#94a3b8';
        });
        
        document.querySelectorAll('.subtitle, .candidates-subtitle, .footer-subtitle').forEach(element => {
            element.style.color = '#cbd5e1';
        });
        
        document.querySelectorAll('.proposal-card h3, .timeline-content h4').forEach(element => {
            element.style.color = '#f1f5f9';
        });
        
        document.querySelectorAll('.proposal-card p, .proposal-card li').forEach(element => {
            element.style.color = '#e2e8f0';
        });
        
        // Restaurar seção de download
        document.querySelectorAll('.download-section').forEach(element => {
            element.style.background = 'linear-gradient(135deg, #0f172a, #1e293b)';
            element.style.color = '#e2e8f0';
        });
        
        // Restaurar timeline items
        document.querySelectorAll('.timeline-item').forEach(element => {
            element.style.background = 'rgba(34, 197, 94, 0.1)';
        });
    }

    // Carregar tema salvo ao inicializar a página
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        isDarkTheme = true; // Para que o toggle funcione corretamente
        setTimeout(() => toggleTheme(), 100);
    }

    // Disponibilizar função globalmente
    window.toggleTheme = toggleTheme;
    
    // Função para adicionar compartilhamento social
    function setupSocialSharing() {
        const shareButton = document.createElement('button');
        shareButton.innerHTML = '📤 Compartilhar';
        shareButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, #27ae60, #229954);
            color: white;
            border: none;
            border-radius: 25px;
            padding: 12px 20px;
            font-size: 1em;
            cursor: pointer;
            z-index: 1000;
            box-shadow: 0 4px 15px rgba(39, 174, 96, 0.3);
            transition: all 0.3s ease;
        `;
        
        shareButton.addEventListener('click', () => {
            if (navigator.share) {
                navigator.share({
                    title: 'Eleição CMULTI UFAC - Diretor(a) e Vice-Diretor(a) 2025-2029',
                    text: 'Participe da eleição para Diretor(a) e Vice-Diretor(a) do CMULTI UFAC',
                    url: window.location.href
                });
            } else {
                // Fallback para navegadores que não suportam Web Share API
                const url = encodeURIComponent(window.location.href);
                const text = encodeURIComponent('Participe da eleição para Diretor(a) e Vice-Diretor(a) do CMULTI UFAC');
                window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
            }
        });
        
        document.body.appendChild(shareButton);
    }
    
    // Tab functionality for public proposals
    function initTabs() {
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');
                
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                button.classList.add('active');
                const targetContent = document.getElementById(targetTab);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }

    // Inicializar todas as funcionalidades
    function init() {
        setupCharacterCount();
        setupLoadingButtons();
        setupScrollAnimations();
        setupVisitorCounter();
        setupQuickNav();
        setupSocialSharing();
        initTabs(); // Inicializar tabs
        
        // Adicionar IDs aos elementos para navegação
        document.querySelector('.header').id = 'header';
        document.querySelector('.main-content').id = 'main-content';
        document.querySelector('.timeline').id = 'timeline';
        document.querySelector('.footer').id = 'footer';
        
        // Mostrar notificação de boas-vindas
        setTimeout(() => {
            showNotification('Bem-vindo à página de eleição do CMULTI UFAC!', 'success');
        }, 1000);
    }
    
    // Executar inicialização
    init();
    
    // Adicionar listener para teclas de atalho
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'h':
                    e.preventDefault();
                    smoothScroll('#header');
                    break;
                case 'i':
                    e.preventDefault();
                    smoothScroll('#main-content');
                    break;
                case 'c':
                    e.preventDefault();
                    smoothScroll('#timeline');
                    break;
                case 't':
                    e.preventDefault();
                    smoothScroll('#footer');
                    break;
            }
        }
    });
    
    // Adicionar listener para impressão
    window.addEventListener('beforeprint', () => {
        showNotification('Preparando para impressão...', 'success');
    });
    
    // Adicionar listener para mudança de orientação
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            showNotification('Orientação alterada', 'success');
        }, 500);
    });
}); 