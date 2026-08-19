# Órbita

Rede social em miniatura — feed, perfis, curtidas, comentários, seguidores e
notificações em tempo real — construída como projeto de portfólio frontend.

Órbita parte da ideia de pessoas gravitando ao redor de conteúdo, com uma
estética de mapa astronômico antigo: não um "app espacial" genérico, mas um
lugar onde cada perfil orbita ao redor de quem segue.

## Funcionalidades

**Autenticação**
- Login e cadastro com e-mail/senha
- Login com Google (`signInWithRedirect`)
- Recuperação de senha por e-mail
- Medidor de força de senha e campo de senha com opção de revelar
- reCAPTCHA no cadastro
- Sessão persistente entre recarregamentos, rotas protegidas

**Feed**
- Criação de posts em tempo real (`onSnapshot`)
- Curtidas com contador atômico (`increment`) e toggle
- Comentários por post, com contador próprio
- Exclusão de post pelo autor
- Timestamp relativo ("há 2h", "agora")

**Perfil**
- Visualização pública (`/perfil/:uid`) com foto, capa, bio e posts do usuário
- Edição inline (nome, bio, foto e capa) direto na própria tela de perfil
- Sistema de seguidores/seguindo com contadores

**Notificações**
- Notificação em tempo real para curtida, comentário e novo seguidor
- Contador de não lidas, marcar uma ou todas como lidas
- Link direto para o post ou perfil relacionado

**Interface**
- Tema claro/escuro, persistido e escopado à área logada
- Identidade visual própria (paleta, tipografia, logo animada)
- Upload de imagens via Cloudinary (avatar e capa)

## Identidade visual

| Token | Valor | Uso |
|---|---|---|
| `ink` | `#14141F` | Fundo (tema escuro) |
| `surface` | `#1F2039` | Cards |
| `gold` | `#D9A544` | Ações, links, destaque |
| `teal` | `#4FA88F` | Sucesso, envio |
| `star` | `#EDEAE0` | Texto primário (tema escuro) |
| `dust` | `#8B889C` | Texto secundário |

Tipografia: **Fraunces** (display, títulos), **Inter** (corpo),
**IBM Plex Mono** (timestamps e dados).

## Stack

- React + Vite
- CSS Modules (sem framework de utilitários)
- React Router
- Firebase Authentication
- Cloud Firestore (posts, comentários, curtidas, seguidores, notificações)
- Cloudinary (upload de imagens, unsigned preset)
- lucide-react e react-icons

## Rodando o projeto

1. Crie um projeto no [console do Firebase](https://console.firebase.google.com)
   e ative **Authentication** (e-mail/senha e Google) e **Firestore**.
2. Crie uma conta no [Cloudinary](https://cloudinary.com) e um upload preset
   **unsigned** (Settings → Upload → Upload presets).
3. Copie `.env.example` para `.env` e preencha:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_RECAPTCHA_SITE_KEY=
VITE_CLOUDINARY_CLOUD_NAME=
VITE_CLOUDINARY_UPLOAD_PRESET=
```

4. Instale as dependências e rode:

```bash
npm install
npm run dev
```

5. Alguns hooks (`usePostsByUser`, `useNotifications`) exigem índices
   compostos no Firestore. Ao testar essas telas, o console do navegador
   mostra um link direto para criar o índice necessário.

## Estrutura

```
src/
├── firebase/       # inicialização do Firebase
├── context/        # AuthContext, ThemeContext
├── hooks/          # usePosts, useComments, useLike, useFollow,
│                   # useNotifications, useUserProfile, useClickOutside...
├── pages/          # telas da aplicação (uma pasta por rota)
├── components/     # componentes reutilizáveis (PostCard, Avatar, Navbar...)
└── utils/          # validações, upload, notificações, formatação
```

## Modelagem de dados (Firestore)

```
users/{uid}                          → perfil (nome, bio, foto, capa, contadores)
posts/{postId}                       → posts (dados do autor desnormalizados)
posts/{postId}/comments/{commentId}  → comentários (subcoleção)
likes/{userId_postId}                → curtidas (ID composto evita duplicidade)
follows/{followerId_followingId}     → relação de seguir (ID composto)
notifications/{id}                   → notificações (userId, type, fromUser...)
```

Nomes e fotos de autor são salvos diretamente em posts/comentários/notificações
(desnormalização) para evitar uma consulta extra por item ao renderizar listas.
Isso significa que posts antigos não refletem retroativamente uma troca de foto
de perfil — comportamento intencional, mesmo usado por redes sociais reais.

## Decisões e limitações conhecidas

- **Login com Google em `localhost`** pode falhar silenciosamente dependendo
  das políticas de cookies de terceiros do navegador. Tende a funcionar
  normalmente em produção, com domínio próprio e HTTPS.
- **Upload de imagem** usa Cloudinary em vez do Firebase Storage, que passou
  a exigir o plano pago (Blaze) para ativação em novos projetos a partir de
  2026.
- **Exclusão de post** não remove em cascata os comentários e curtidas
  relacionados (ficam órfãos no banco). Aceitável para o escopo atual;
  limpeza em cascata exigiria Cloud Functions.

## Roadmap

- [x] Autenticação completa (e-mail/senha, Google, recuperação de senha)
- [x] Feed com posts, curtidas e comentários em tempo real
- [x] Perfil com edição, seguidores e posts do usuário
- [x] Upload de avatar e capa
- [x] Notificações em tempo real
- [x] Tema claro/escuro
- [ ] Mensagens diretas
- [ ] Regras de segurança do Firestore para produção
- [ ] Deploy
