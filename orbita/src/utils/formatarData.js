export function formatarTempoRelativo(timestamp) {
  if (!timestamp) return ''

  const data = timestamp.toDate()
  const agora = new Date()
  const diffMs = agora - data
  const diffMin = Math.floor(diffMs / 60000)
  const diffHoras = Math.floor(diffMin / 60)
  const diffDias = Math.floor(diffHoras / 24)

  if (diffMin < 1) return 'agora'
  if (diffMin < 60) return `há ${diffMin} min`
  if (diffHoras < 24) return `há ${diffHoras}h`
  if (diffDias < 7) return `há ${diffDias}d`

  return data.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
}