# Cristão Fit — site estático servido por Nginx
# Build/deploy: EasyPanel (modo Dockerfile). Contexto = raiz do repo.
FROM nginx:1.27-alpine

# Remove a config default e instala a nossa
RUN rm /etc/nginx/conf.d/default.conf
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY docker/security-headers.conf /etc/nginx/snippets/security-headers.conf

# Copia apenas o conteúdo do site (nada de docs/.git)
COPY index.html /usr/share/nginx/html/index.html
COPY assets     /usr/share/nginx/html/assets

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/healthz >/dev/null 2>&1 || exit 1

# A imagem base já roda: nginx -g 'daemon off;'
