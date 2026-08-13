export function traduzirErroFirebase(codigo) {
  const mensagens = {
    "auth/invalid-credential": "E-mail ou senha incorretos.",
    "auth/user-not-found": "E-mail ou senha incorretos.",
    "auth/wrong-password": "E-mail ou senha incorretos.",
    "auth/email-already-in-use": "Esse e-mail já está cadastrado.",
    "auth/invalid-email": "E-mail inválido.",
    "auth/weak-password": "A senha precisa ter pelo menos 6 caracteres.",
    "auth/too-many-requests": "Muitas tentativas. Tente novamente em instantes.",
  }

  return mensagens[codigo] || "Algo deu errado. Tente novamente."
}