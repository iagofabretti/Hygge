    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-logo">
                    <img src="<?php echo get_template_directory_uri(); ?>/Logos/hy.gge-logo (2).png" alt="Hy.gge Urban Salon">
                </div>
                <div class="footer-divider"></div>
                <p class="footer-copyright">&copy; <?php echo date('Y'); ?> Hy.gge Urban Salon. Todos os direitos reservados.</p>
            </div>
        </div>
    </footer>

    <!-- Lightbox -->
    <div class="lightbox" id="lightbox">
        <button class="lightbox-close" aria-label="Fechar">
            <i class="fas fa-times"></i>
        </button>
        <button class="lightbox-prev" aria-label="Anterior">
            <i class="fas fa-chevron-left"></i>
        </button>
        <button class="lightbox-next" aria-label="Próximo">
            <i class="fas fa-chevron-right"></i>
        </button>
        <div class="lightbox-content">
            <img src="" alt="Imagem ampliada" id="lightbox-img">
        </div>
    </div>

    <!-- Back to Top Button -->
    <button class="back-to-top" id="back-to-top" aria-label="Voltar ao topo">
        <i class="fas fa-chevron-up"></i>
    </button>

    <?php wp_footer(); ?>
</body>
</html>
