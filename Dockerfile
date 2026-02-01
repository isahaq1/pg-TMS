# ----------------------
# Build Stage
# ----------------------
    FROM node:20-alpine AS builder

    WORKDIR /app
    
    # Copy package files
    COPY package.json package-lock.json* yarn.lock* ./
    
    # Install dependencies
    RUN npm install --legacy-peer-deps || npm install
    
    # Copy source code
    COPY . .
    
    # Build the application (standalone mode)
    RUN npm run build
    
    # ----------------------
    # Production Stage
    # ----------------------
    FROM node:20-alpine AS runner
    
    WORKDIR /app
    
    ENV NODE_ENV=production
    ENV NEXT_TELEMETRY_DISABLED=1
    ENV PORT=3000
    ENV HOSTNAME="0.0.0.0"
    
    # Create non-root user
    RUN addgroup --system --gid 1001 nodejs
    RUN adduser --system --uid 1001 nextjs
    
    # Copy built Next.js app
    COPY --from=builder /app/public ./public
    COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
    COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
    
    # Use non-root user
    USER nextjs
    
    # Expose port
    EXPOSE 3000
    
    # Start the app
    CMD ["node", "server.js"]
    