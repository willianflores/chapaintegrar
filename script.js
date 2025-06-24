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
        
        // Verificar se é mobile para ajustar posicionamento
        const isMobile = window.innerWidth <= 768;
        
        counterElement.style.cssText = `
            position: fixed;
            ${isMobile ? 'bottom: 80px;' : 'bottom: 20px;'}
            left: 20px;
            background: rgba(52, 152, 219, 0.9);
            color: white;
            padding: ${isMobile ? '8px 12px;' : '10px 15px;'}
            border-radius: 25px;
            font-size: ${isMobile ? '0.8em;' : '0.9em;'}
            z-index: 1000;
            backdrop-filter: blur(10px);
            max-width: ${isMobile ? '150px;' : 'none;'}
            text-align: center;
        `;
        
        // Simular contador de visitantes
        let visitors = Math.floor(Math.random() * 450) + 50;
        counterElement.innerHTML = `👥 ${visitors} visualizações`;
        
        document.body.appendChild(counterElement);
        
        // Listener para redimensionamento da tela
        window.addEventListener('resize', () => {
            const isMobileNow = window.innerWidth <= 768;
            counterElement.style.bottom = isMobileNow ? '80px' : '20px';
            counterElement.style.padding = isMobileNow ? '8px 12px' : '10px 15px';
            counterElement.style.fontSize = isMobileNow ? '0.8em' : '0.9em';
            counterElement.style.maxWidth = isMobileNow ? '150px' : 'none';
        });
        
        // Atualizar contador periodicamente
        setInterval(() => {
            visitors += Math.floor(Math.random() * 5) + 1;
            counterElement.innerHTML = `👥 ${visitors} visualizações`;
        }, 30000); // Atualizar a cada 30 segundos
    }
    
    // Função para criar menu mobile moderno
    function setupMobileNav() {
        // Botão flutuante para abrir o menu
        const menuButton = document.createElement('button');
        menuButton.className = 'mobile-nav-button';
        menuButton.innerHTML = '📋';
        menuButton.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #27ae60, #2ecc71);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 1.2em;
            cursor: pointer;
            z-index: 1001;
            box-shadow: 0 4px 20px rgba(39, 174, 96, 0.4);
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        // Overlay do menu
        const menuOverlay = document.createElement('div');
        menuOverlay.className = 'mobile-nav-overlay';
        menuOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            z-index: 1002;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            backdrop-filter: blur(5px);
        `;
        
        // Menu drawer
        const menuDrawer = document.createElement('div');
        menuDrawer.className = 'mobile-nav-drawer';
        menuDrawer.style.cssText = `
            position: fixed;
            top: 0;
            right: -300px;
            width: 280px;
            height: 100%;
            background: linear-gradient(135deg, #ffffff, #f8f9fa);
            z-index: 1003;
            transition: right 0.3s ease;
            box-shadow: -5px 0 20px rgba(0, 0, 0, 0.2);
            overflow-y: auto;
        `;
        
        // Cabeçalho do menu
        const menuHeader = document.createElement('div');
        menuHeader.style.cssText = `
            background: linear-gradient(135deg, #27ae60, #2ecc71);
            color: white;
            padding: 20px;
            text-align: center;
            position: relative;
        `;
        menuHeader.innerHTML = `
            <h3 style="margin: 0; font-size: 1.2em;">📋 Índice</h3>
            <button class="close-menu" style="
                position: absolute;
                top: 15px;
                right: 15px;
                background: none;
                border: none;
                color: white;
                font-size: 1.5em;
                cursor: pointer;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background 0.2s ease;
            ">×</button>
        `;
        
        // Lista de navegação
        const navList = document.createElement('div');
        navList.style.cssText = `
            padding: 20px 0;
        `;
        
        const sections = [
            { id: 'hero-section', label: '🏠 Início' },
            { id: 'candidates-section', label: '👥 Candidatos' },
            { id: 'principles-section', label: '🎯 Princípios' },
            { id: 'graduation-section', label: '🎓 Graduação' },
            { id: 'postgrad-section', label: '📚 Pós-Grad' },
            { id: 'research-section', label: '🔬 Pesquisa' },
            { id: 'extension-section', label: '🤝 Extensão' },
            { id: 'management-section', label: '⚙️ Gestão' },
            { id: 'public-proposals-section', label: '📋 Categorias' },
            { id: 'downloads-section', label: '📥 Downloads' },
            { id: 'contact-section', label: '📞 Contato' }
        ];
        
        sections.forEach((section, index) => {
            const navItem = document.createElement('a');
            navItem.href = `#${section.id}`;
            navItem.textContent = section.label;
            navItem.style.cssText = `
                display: block;
                padding: 15px 25px;
                color: #2c3e50;
                text-decoration: none;
                border-bottom: 1px solid #ecf0f1;
                transition: all 0.3s ease;
                font-size: 1em;
                position: relative;
            `;
            
            // Animação de entrada escalonada
            navItem.style.animationDelay = `${index * 50}ms`;
            
            navItem.addEventListener('click', (e) => {
                e.preventDefault();
                closeMobileMenu();
                
                // Scroll para a seção
                setTimeout(() => {
                    const targetElement = document.getElementById(section.id);
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    } else {
                        // Fallbacks específicos
                        if (section.id === 'hero-section') {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        } else if (section.id === 'contact-section') {
                            const footer = document.querySelector('footer');
                            if (footer) footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        } else if (section.id === 'downloads-section') {
                            const downloadsSection = document.querySelector('.downloads-section');
                            if (downloadsSection) downloadsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }
                }, 300);
            });
            
            // Efeitos hover
            navItem.addEventListener('touchstart', () => {
                navItem.style.background = '#27ae60';
                navItem.style.color = 'white';
                navItem.style.paddingLeft = '35px';
            });
            
            navItem.addEventListener('touchend', () => {
                setTimeout(() => {
                    navItem.style.background = 'transparent';
                    navItem.style.color = '#2c3e50';
                    navItem.style.paddingLeft = '25px';
                }, 200);
            });
            
            navList.appendChild(navItem);
        });
        
        // Montar o menu
        menuDrawer.appendChild(menuHeader);
        menuDrawer.appendChild(navList);
        
        // Funções de controle
        function openMobileMenu() {
            menuOverlay.style.opacity = '1';
            menuOverlay.style.visibility = 'visible';
            menuDrawer.style.right = '0';
            menuButton.style.transform = 'rotate(180deg)';
            document.body.style.overflow = 'hidden';
        }
        
        function closeMobileMenu() {
            menuOverlay.style.opacity = '0';
            menuOverlay.style.visibility = 'hidden';
            menuDrawer.style.right = '-300px';
            menuButton.style.transform = 'rotate(0deg)';
            document.body.style.overflow = 'auto';
        }
        
        // Event listeners
        menuButton.addEventListener('click', openMobileMenu);
        menuOverlay.addEventListener('click', closeMobileMenu);
        menuHeader.querySelector('.close-menu').addEventListener('click', closeMobileMenu);
        
        // Adicionar elementos ao DOM
        document.body.appendChild(menuButton);
        document.body.appendChild(menuOverlay);
        document.body.appendChild(menuDrawer);
        
        // Listener para redimensionamento
        window.addEventListener('resize', () => {
            const isMobileNow = window.innerWidth <= 768;
            if (!isMobileNow) {
                // Remover menu mobile e criar desktop
                menuButton.remove();
                menuOverlay.remove();
                menuDrawer.remove();
                document.body.style.overflow = 'auto';
                setupQuickNav();
            }
        });
    }
    
    // Função para adicionar menu de navegação rápida
    function setupQuickNav() {
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // Criar menu mobile moderno
            setupMobileNav();
            return;
        }
        
        const quickNav = document.createElement('nav');
        quickNav.className = 'quick-nav';
        quickNav.id = 'quickNav';
        
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
            { id: 'hero-section', label: '🏠 Início' },
            { id: 'candidates-section', label: '👥 Candidatos' },
            { id: 'principles-section', label: '🎯 Princípios' },
            { id: 'graduation-section', label: '🎓 Graduação' },
            { id: 'postgrad-section', label: '📚 Pós-Grad' },
            { id: 'research-section', label: '🔬 Pesquisa' },
            { id: 'extension-section', label: '🤝 Extensão' },
            { id: 'management-section', label: '⚙️ Gestão' },
            { id: 'public-proposals-section', label: '📋 Categorias' },
            { id: 'downloads-section', label: '📥 Downloads' },
            { id: 'contact-section', label: '📞 Contato' }
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
                white-space: nowrap;
            `;
            
            link.addEventListener('mouseenter', () => {
                link.style.background = '#27ae60';
                link.style.color = 'white';
                link.style.transform = 'scale(1.05)';
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.background = 'transparent';
                link.style.color = '#2c3e50';
                link.style.transform = 'scale(1)';
            });
            
            link.addEventListener('click', (e) => {
                e.preventDefault();
                console.log(`Clicou em: ${section.label} (${section.id})`);
                
                // Buscar o elemento diretamente
                const targetElement = document.getElementById(section.id);
                console.log(`Elemento encontrado:`, targetElement);
                
                if (targetElement) {
                    console.log(`Fazendo scroll para:`, targetElement);
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                } else {
                    console.log(`Elemento ${section.id} não encontrado, tentando fallback...`);
                    // Fallback simples para casos específicos
                    if (section.id === 'hero-section') {
                        console.log('Fazendo scroll para o topo');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else if (section.id === 'contact-section') {
                        const footer = document.querySelector('footer');
                        console.log('Footer encontrado:', footer);
                        if (footer) {
                            footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    } else if (section.id === 'downloads-section') {
                        const downloadsSection = document.querySelector('.downloads-section');
                        console.log('Seção Downloads encontrada:', downloadsSection);
                        if (downloadsSection) {
                            downloadsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }
                }
            });
            
            quickNav.appendChild(link);
        });
        
        document.body.appendChild(quickNav);
        
        // Listener para redimensionamento da tela - remover menu se ficar mobile
        window.addEventListener('resize', () => {
            const isMobileNow = window.innerWidth <= 768;
            const currentNav = document.getElementById('quickNav');
            
            if (isMobileNow && currentNav) {
                currentNav.remove();
                setupMobileNav();
            } else if (!isMobileNow && !currentNav) {
                // Remover elementos mobile se existirem
                const mobileButton = document.querySelector('.mobile-nav-button');
                const mobileOverlay = document.querySelector('.mobile-nav-overlay');
                const mobileDrawer = document.querySelector('.mobile-nav-drawer');
                
                if (mobileButton) mobileButton.remove();
                if (mobileOverlay) mobileOverlay.remove();
                if (mobileDrawer) mobileDrawer.remove();
                
                setupQuickNav();
            }
        });
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
        
        // Verificar se é mobile para ajustar posicionamento
        const isMobile = window.innerWidth <= 768;
        
        shareButton.style.cssText = `
            position: fixed;
            ${isMobile ? 'bottom: 80px;' : 'bottom: 20px;'}
            right: 20px;
            background: linear-gradient(135deg, #27ae60, #229954);
            color: white;
            border: none;
            border-radius: 25px;
            padding: ${isMobile ? '10px 16px;' : '12px 20px;'}
            font-size: ${isMobile ? '0.9em;' : '1em;'}
            cursor: pointer;
            z-index: 1000;
            box-shadow: 0 4px 15px rgba(39, 174, 96, 0.3);
            transition: all 0.3s ease;
            max-width: ${isMobile ? '120px;' : 'none;'}
        `;
        
        shareButton.addEventListener('click', () => {
            if (navigator.share) {
                navigator.share({
                    title: 'Chapa Integrar - CMULTI UFAC 2025-2029',
                    text: 'Conheça as propostas da Chapa Integrar para o CMULTI UFAC. Gestão participativa e transparente!',
                    url: window.location.href
                });
            } else {
                // Fallback para navegadores que não suportam Web Share API
                const url = encodeURIComponent(window.location.href);
                const text = encodeURIComponent('Conheça as propostas da Chapa Integrar para o CMULTI UFAC. Gestão participativa e transparente!');
                window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
            }
        });
        
        document.body.appendChild(shareButton);
        
        // Listener para redimensionamento da tela
        window.addEventListener('resize', () => {
            const isMobileNow = window.innerWidth <= 768;
            shareButton.style.bottom = isMobileNow ? '80px' : '20px';
            shareButton.style.padding = isMobileNow ? '10px 16px' : '12px 20px';
            shareButton.style.fontSize = isMobileNow ? '0.9em' : '1em';
            shareButton.style.maxWidth = isMobileNow ? '120px' : 'none';
        });
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
        
        // Elementos principais carregados
        
        // Mostrar notificação de boas-vindas
        setTimeout(() => {
            showNotification('Bem-vindo à página da Chapa Integrar! Conheça nossas propostas para o CMULTI 2025-2029.', 'success');
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