export interface ApiClient {
  get<T>(endpoint: string, params?: Record<string, string>): Promise<T>
  post<T>(endpoint: string, data?: unknown): Promise<T>
  stream(endpoint: string, data?: unknown): AsyncGenerator<string>
}

export function createMockApiClient(): ApiClient {
  return {
    async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
      const query = params ? '?' + new URLSearchParams(params).toString() : ''
      const res = await fetch(`/api${endpoint}${query}`)
      if (!res.ok) throw new Error(`API error: ${res.status}`)
      return res.json()
    },

    async post<T>(endpoint: string, data?: unknown): Promise<T> {
      const res = await fetch(`/api${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data ? JSON.stringify(data) : undefined,
      })
      if (!res.ok) throw new Error(`API error: ${res.status}`)
      return res.json()
    },

    async *stream(endpoint: string, data?: unknown): AsyncGenerator<string> {
      const res = await fetch(`/api${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data ? JSON.stringify(data) : undefined,
      })
      if (!res.ok) throw new Error(`Stream error: ${res.status}`)
      
      const reader = res.body?.getReader()
      if (!reader) throw new Error('No response body')
      
      const decoder = new TextDecoder()
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        yield decoder.decode(value, { stream: true })
      }
    },
  }
}