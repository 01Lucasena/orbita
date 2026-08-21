export function validarSenha(senha) {
  let pontos = 0

  if (senha.length >= 8) pontos++
  if (/[a-z]/.test(senha)) pontos++
  if (/[A-Z]/.test(senha)) pontos++
  if (/[0-9]/.test(senha)) pontos++
  if (/[^A-Za-z0-9]/.test(senha)) pontos++

  if (pontos <= 2) return { pontos, rotulo: "Intensidade da senha: Fraca", cor: "#d9644f" }
  if (pontos <= 4) return { pontos, rotulo: "Intensidade da senha: Média", cor: "#d9a544" }
  return { pontos, rotulo: "Intensidade da senha: Forte", cor: "#4fa88f" }
}