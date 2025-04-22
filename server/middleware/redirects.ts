// server/middleware/redirects.ts
import redirects from '~/data/redirects.json'
import { defineEventHandler, getRequestPath, sendRedirect, getRequestHeaders } from 'h3'
import { useRuntimeConfig } from '#imports'

interface Redirect {
  source: string
  target: string
  code: number
  active: boolean
  domain?: string // Optional domain property for domain-specific redirects
}

export default defineEventHandler((event) => {
  const path = getRequestPath(event)
  const headers = getRequestHeaders(event)
  const host = headers.host || ''
  const config = useRuntimeConfig()
  const primaryDomain = config.public.site.primaryDomain

  // Find matching redirect - try domain-specific redirect first, then check path
  const redirect = redirects.find((r: Redirect) => {
    if (!r.active) return false

    // If redirect has a domain property, check if it matches the request host
    if (r.domain && !host.includes(r.domain)) {
      return false
    }

    // Try exact match first
    // Normalize paths for comparison by removing trailing slashes
    const normalizedSource = r.source.endsWith('/') ? r.source.slice(0, -1) : r.source
    const normalizedPath = path.endsWith('/') ? path.slice(0, -1) : path

    if (normalizedSource === normalizedPath ||
        r.source === path ||
        normalizedSource === path ||
        r.source === normalizedPath) {
      return true
    }

    try {
      // Only consider as regex if it's an actual regex pattern (has ^ or $ or other regex indicators)
      // Not just any string wrapped in slashes
      if (r.source.startsWith('/') && r.source.length > 2 && r.source.endsWith('/') &&
          (r.source.includes('^') || r.source.includes('$') || r.source.includes('.*') ||
           r.source.includes('[') || r.source.includes('\\') || r.source.includes('?'))) {
        const pattern = r.source.slice(1, -1) // Remove slashes to get regex pattern
        const regex = new RegExp(pattern)
        return regex.test(path)
      }
    } catch (e: Error | unknown) {
      console.error(`Invalid regex pattern in redirect: ${r.source}`)
      return false
    }

    return false
  })

  if (redirect) {
    let targetUrl = redirect.target

    // If the source was a regex pattern, replace capture groups in target
    if (redirect.source.startsWith('/') && redirect.source.length > 2 && redirect.source.endsWith('/') &&
        (redirect.source.includes('^') || redirect.source.includes('$') || redirect.source.includes('.*') ||
         redirect.source.includes('[') || redirect.source.includes('\\') || redirect.source.includes('?'))) {
      try {
        const pattern = redirect.source.slice(1, -1)
        const regex = new RegExp(pattern)
        const matches = path.match(regex)
        if (matches) {
          // Replace $1, $2, etc. in target with captured groups
          targetUrl = matches.reduce((url, match, index) => {
            return url.replace(`$${index}`, match)
          }, targetUrl)
        }
      } catch (e: Error | unknown) {
        console.error(`Error processing regex redirect: ${e instanceof Error ? e.message : 'Unknown error'}`)
      }
    }

    return sendRedirect(event, targetUrl, redirect.code)
  }

  // Handle www to non-www redirects
  if (host.startsWith(`www.${primaryDomain}`)) {
    const newHost = host.replace(`www.${primaryDomain}`, primaryDomain)
    return sendRedirect(event, `https://${newHost}${path}`, 301)
  }

  // Handle alternate domain redirections
  const alternateDomainsStr = process.env.NUXT_ALTERNATE_DOMAINS || ''
  const alternateDomains = alternateDomainsStr.split(',').map(d => d.trim()).filter(Boolean)

  for (const altDomain of alternateDomains) {
    if (host.includes(altDomain) && !host.includes(`store.${altDomain}`)) {
      // Remove www if present
      if (host.startsWith('www.')) {
        return sendRedirect(event, `https://${primaryDomain}${path}`, 301)
      }
      return sendRedirect(event, `https://${primaryDomain}${path}`, 301)
    }
  }
})
